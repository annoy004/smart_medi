import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export const extractMedicineNames = async (cleanedText) => {
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
Extract and correct **medicine names only** from the following text.
Output them as a **JSON array** only.

Text:
${cleanedText}
                `.trim(),
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error('Error:', data);
    throw new Error(`Gemini API error: ${data.error?.message}`);
  }

  const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  try {
    // Extract array from messy output if necessary
    const match = outputText.match(/\[.*?\]/s);
    return JSON.parse(match ? match[0] : outputText);
  } catch (err) {
    throw new Error('Output is not valid JSON:\n' + outputText);
  }
};
