import express from "express";
import cors from "cors";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';
import { SYSTEM_PROMPT } from "./prompt.js";

const app = express();
app.use(cors()); // Allow frontend to communicate
app.use(express.json());

// Set up Multer to keep the uploaded image in memory (no need to save to disk!)
const upload = multer({ storage: multer.memoryStorage() });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// THIS MATCHES YOUR FRONTEND FETCH URL
app.post("/api/triage", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image provided");
    }
    if (!req.body.customerReason) {
      return res.status(400).send("No return reason provided");
    }

    console.log("Analyzing return request...");

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      generationConfig: { responseMimeType: "application/json" }
    });

    // Convert the uploaded file buffer directly into Gemini's format
    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype
      }
    };

    // Call Gemini
    const result = await model.generateContent([
      SYSTEM_PROMPT,
      imagePart,
      `Customer Reason: ${req.body.customerReason}`
    ]);

    const jsonResponse = JSON.parse(result.response.text());
    
    // Send the JSON back to the React frontend
    res.json(jsonResponse);

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).send("Failed to process image.");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Mumzworld AI Backend running on http://localhost:${PORT}`);
});