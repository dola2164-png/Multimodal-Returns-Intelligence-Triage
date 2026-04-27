import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import 'dotenv/config';
import { SYSTEM_PROMPT } from "./prompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function runTest() {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-3-flash", 
        generationConfig: { responseMimeType: "application/json" }
      });

//   const imagePath = "./ydog.png";
const imagePath = "./dress.png";
  const imagePart = fileToGenerativePart(imagePath, "image/png"); // Make sure this says png, not jpeg!

//   const imagePart = fileToGenerativePart(imagePath, "image/jpeg");
  const customerReason = "I want to return this stroller. The box arrived completely crushed and I'm worried it's broken inside.";

  try {
    const result = await model.generateContent([
      SYSTEM_PROMPT, 
      imagePart, 
      `Customer Reason: ${customerReason}`
    ]);
    
    const jsonResponse = JSON.parse(result.response.text());
    console.dir(jsonResponse, { depth: null, colors: true });
  } catch (error) {
    console.error("Error:", error);
  }
}

runTest();