import React, { useState } from 'react';
import { useUploadPrescriptionMutation } from '../slices/productsApiSlice';

const PrescriptionUploadScreen = ({ userId }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const [uploadPrescription, { isLoading, error }] = useUploadPrescriptionMutation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!image) return;

    try {
      const res = await uploadPrescription({ image, userId }).unwrap();
      console.log('Response:', res);

      setResult(res);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Prescription</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      {preview && <img src={preview} alt="Preview" className="mb-4 rounded shadow" />}

      <button
        onClick={handleUpload}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isLoading ? 'Uploading...' : 'Upload & Scan'}
      </button>

      {error && <p className="text-red-500 mt-2">Something went wrong!</p>}

      {result && (
  <div className="mt-4">
    <h3 className="font-semibold">Extracted Medicines:</h3>
    <ul className="list-disc ml-5 mt-2">
      {(result.medicineNames || []).map((name, i) => (
        <li key={i}>{name}</li>
      ))}
    </ul>
    <p className="mt-2 text-gray-700 text-sm">🧾 Raw Text: {result.cleanedText}</p>
  </div>
)}

    </div>
  );
};

export default PrescriptionUploadScreen;
