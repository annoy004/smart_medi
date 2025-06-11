import { v2 as cloudinary } from 'cloudinary';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import fs from 'fs';
import { promisify } from 'util';
import dotenv from 'dotenv';
import { extractMedicineNames } from './geminiService.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const client = new ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_VISION_KEY_PATH || './backend/config/google-vision-key.json',
});

const writeFileAsync = promisify(fs.writeFile);
const unlinkFileAsync = promisify(fs.unlink);

export const uploadAndExtractMedicines = async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ message: 'No image provided' });
  }

  try {
    // 1. Upload image
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'prescriptions',
      resource_type: 'image',
    });

    const imageUrl = uploadResponse.secure_url;

    // 2. Write temp file
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const tempFilePath = './temp-prescription.jpg';
    await writeFileAsync(tempFilePath, base64Data, 'base64');

    // 3. OCR
    const [result] = await client.documentTextDetection(tempFilePath);
    await unlinkFileAsync(tempFilePath);

    const fullText = result.fullTextAnnotation?.text || '';
    const cleanedText = fullText.replace(/[^a-zA-Z0-9\s]/g, '').trim();

    // 4. Gemini Extraction
    const medicineNames = await extractMedicineNames(cleanedText);
    console.log(medicineNames);

    return res.json({
      medicineNames,
      cleanedText,
      imageUrl,
    });

  } catch (error) {
    console.error('Processing error:', error);
    return res.status(500).json({ message: 'Failed to process prescription' });
  }
};
