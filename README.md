# 🌟 Mumzworld AI Returns Triage Portal

**Track A — AI Engineering Intern Submission by Sayani Adak**

An intelligent, fully bilingual (English & Arabic) returns triage application built for Mumzworld. This platform leverages the Gemini API to automatically analyze customer return requests—combining multimodal image reasoning with strict business logic to approve, reject, or escalate returns in real-time.

---

### 🎥 3-Minute Loom Walkthrough
👉 **[Watch the Live Demo & Architecture Walkthrough Here]** *(Insert your Loom link here!)*

---

## 🎯 The Problem Worth Solving
Processing e-commerce returns requires massive manual overhead. Customer service agents spend countless hours matching customer text claims ("The stroller arrived broken") against uploaded photos to verify legitimacy, check for hygiene compliance, and prevent fraud. 

## 🚀 The Solution
I built a full-stack MERN application that acts as a first-line triage engine. By using **Gemini 3 Flash**, the system instantly sorts returns into specific action buckets (`Refund`, `Exchange`, `Reject`, `Escalate`) based on strict visual and textual rules. 

### Key Product Features:
* **🧠 Multimodal Reasoning:** Analyzes both the uploaded product image and the customer's free-text reason simultaneously.
* **🛡️ Uncertainty Handling (Fraud Prevention):** If the image contradicts the text (e.g., photo is a dress, text says "stroller"), the system forces a low confidence score and automatically flags the request as **Escalate to Human**.
* **🌍 Native Bilingual UI:** A custom-built React interface offering seamless English and Arabic experiences, reflecting Mumzworld's actual Middle Eastern user base.
* **⚙️ Production-Ready JSON:** Outputs strict, machine-readable JSON containing the suggested action, confidence score, internal reasoning, and localized customer responses.

---

## 🛠️ Tech Stack
* **Frontend:** React.js, Tailwind CSS (Custom bilingual components)
* **Backend:** Node.js, Express.js, Multer (In-memory file handling)
* **AI Engine:** Google Gemini API (`gemini-3-flash-preview`)

---

## 📂 Deliverable Documentation
To fulfill the evaluation rigor and architecture requirements of the brief, please review the following documents in this repository:

1. **[`EVALS.md`](./EVALS.md):** Systematic testing of 10 visual/textual edge cases (including hygiene violations and image mismatches) proving the AI's reasoning capabilities.
2. **[`TRADEOFFS.md`](./TRADEOFFS.md):** My engineering documentation explaining the "Build vs. Buy" API decision, model selection, and prompt engineering constraints.

---

## 💻 Getting Started (Local Setup)

Want to run the triage engine locally? Follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/mumzworld-returns-ai.git](https://github.com/yourusername/mumzworld-returns-ai.git)
cd mumzworld-returns-ai
