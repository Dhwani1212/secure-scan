# 🧪 Scan Backend (Node.js)

This service handles automated security scanning using ReconFTW.
It manages scan lifecycle, background execution, result parsing, and scoring.

---

## 📁 Folder Structure

scan-backend/
├── controllers/ # API controllers
├── models/ # MongoDB schemas
├── routes/ # Express routes
├── services/ # Scan execution logic
├── server.js # Application entry point
├── package.json
├── .env.example
└── README.md

yaml
Copy code

---

## ⚙️ Requirements

- Node.js 18+
- MongoDB
- Linux environment (required for ReconFTW)
- Bash shell

> ⚠️ ReconFTW does NOT run on Windows.  
> Windows can be used only for API development and UI testing.

---

## 🚀 Setup Instructions

### 1️⃣ Install Dependencies

```bash
cd scan-backend
npm install