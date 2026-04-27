# 🌟 Multimodal Returns Intelligence Triage

**Track A — AI Engineering Intern Submission by Sayani Adak**

An intelligent, fully bilingual (English & Arabic) returns triage application built for Mumzworld. This platform leverages the Gemini API to automatically analyze customer return requests—combining multimodal image reasoning with strict business logic to approve, reject, or escalate returns in real-time.


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

## 🛠️ Tech Stack & Tooling
* **Frontend:** React.js, Tailwind CSS (Custom bilingual layout)
* **Backend:** Node.js, Express.js, Multer (In-memory file handling)
* **AI Engine:** Google Gemini API (`gemini-3-flash-preview`)
* **AI Tooling Used:** I utilized Cursor (with Claude 3.5 Sonnet) as an AI pair-programming assistant to accelerate UI component styling and React boilerplate setup. I manually engineered the Node.js backend logic, the Multer in-memory buffers, and the strict Gemini System Prompt to ensure precise JSON outputs and business rule adherence.

---

## 📊 Evaluation (Evals)
To prove the AI goes beyond "vibes" and handles real-world e-commerce scenarios, I tested the system prompt against 10 distinct edge cases. 

**Grading Rubric:** * Pass = Correct Action + Accurate Reasoning + Native Bilingual Translation. 
* Fail = Hallucination, incorrect action, or missing uncertainty flag.

| Test Case | Uploaded Image | Customer Text Reason | Expected Action | AI Result | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Standard Refund** | Unopened Stroller | "Changed my mind, still in box." | `Refund` | `Refund` (95% Conf) | ✅ Pass |
| **2. Carrier Damage** | Crushed Stroller Box | "The box arrived completely crushed." | `Exchange` | `Exchange` (88% Conf) | ✅ Pass |
| **3. Hygiene Policy** | Used/Opened Baby Bottle | "Baby didn't like the nipple shape." | `Reject` | `Reject` (98% Conf - Flagged hygiene rule) | ✅ Pass |
| **4. Fraud Mismatch** | Photo of a Dress | "The stroller is broken." | `Escalate` | `Escalate` (35% Conf - Flagged text/image mismatch) | ✅ Pass |
| **5. Unrelated Image** | Photo of a Dog | "Doesn't fit." | `Escalate` | `Escalate` (20% Conf - Flagged unrelated item) | ✅ Pass |
| **6. Wear & Tear** | Heavily scuffed shoes | "Worn for a week, too small." | `Reject` | `Reject` (90% Conf - Flagged usage policy) | ✅ Pass |
| **7. Missing Item** | Empty open box | "The item was missing inside." | `Escalate` | `Escalate` (60% Conf - Requires human review) | ✅ Pass |
| **8. Missing Parts** | Stroller missing a wheel | "It didn't come with the front wheel." | `Exchange` | `Exchange` (85% Conf - Flagged defect) | ✅ Pass |
| **9. Stock Photo** | Perfect stock image from website | "It arrived broken." | `Escalate` | `Escalate` (40% Conf - Flagged stock photo fraud) | ✅ Pass |
| **10. Blurry Image** | Completely out-of-focus blur | "Broken." | `Escalate` | `Escalate` (30% Conf - Flagged unreadable image) | ✅ Pass |

---

## ⚖️ Architecture & Tradeoffs

**1. Problem Selection:** I chose Returns Triage because it is a highly quantifiable business problem. Solving it saves thousands of CX hours and directly impacts the company's bottom line by catching return fraud early. 

**2. Build vs. Buy (API vs. Custom Model):** I deliberately chose to use a foundational API (Gemini) rather than training a custom vision model (like ResNet or YOLO) from scratch. In an enterprise environment, training custom multimodal models requires massive labeled datasets and expensive cloud GPU compute. By leveraging the Gemini API, I drastically reduced "time-to-market" and was able to focus my engineering hours on what actually matters: building strict business guardrails, uncertainty handling, and a flawless user experience.

**3. Handling Uncertainty:** LLMs are prone to hallucinating confident answers when confused. To mitigate this, I engineered the system prompt to explicitly default to `Escalate to Human` and drop the `confidence_score` below `0.50` anytime the image contradicts the text (e.g., Test Case 4) or the image is unreadable (e.g., Test Case 10).

**4. What I Cut & What's Next:** Given the ~5 hour time constraint, I cut database persistence (MongoDB) to focus entirely on the AI pipeline and the UI. If I were to continue building this, the next step would be implementing a PostgreSQL or MongoDB database to save the triage JSON payloads, enabling an Operations Dashboard for managers to track "Automated Rejection Rates" vs. "Human Escalations."

---

## 💻 Getting Started (Local Setup)

Want to run the triage engine locally? Follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/dola2164-png/Multimodal-Returns-Intelligence-Triage.git](https://github.com/dola2164-png/Multimodal-Returns-Intelligence-Triage.git)
cd Multimodal-Returns-Intelligence-Triage


Set up the Backend
Bash
# Navigate to the root directory
npm install express cors multer @google/generative-ai dotenv

# Create a .env file and add your Gemini API Key
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Start the Express server
node index.js
The backend will start running on http://localhost:3000

3. Set up the Frontend
Bash
# Open a new terminal instance and navigate to your React frontend folder
npm install

# Start the Vite development server
npm run dev
