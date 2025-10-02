import Tesseract from "tesseract.js";
import path from "path";
import fs from "fs";

/**
 * Extracts text from an uploaded bill image using Tesseract.js
 * @param {string} filePath - Path to the uploaded image
 * @returns {Promise<string>} Extracted text
 */
const extractTextFromImage = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("❌ File not found: " + filePath);
    }

    console.log(`📝 Running OCR on: ${filePath}`);

    const { data: { text } } = await Tesseract.recognize(
      filePath,
      "eng", // language pack (add "hin" for Hindi, etc.)
      {
        logger: (info) => console.log(info.status, info.progress),
      }
    );

    console.log("✅ OCR Extraction Done");
    return text;
  } catch (err) {
    console.error("❌ OCR failed:", err.message);
    throw err;
  }
};

export default extractTextFromImage;
