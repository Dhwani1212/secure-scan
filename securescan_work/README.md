# 🛡️ SecureScan: Advanced Security Assessment Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**SecureScan** is a high-performance, full-stack cybersecurity dashboard designed for deep reconnaissance and vulnerability assessment. It combines a stunning "Cyber/Neon" aesthetic with powerful backend scanning capabilities.

---

## 🏗️ Architecture Overview

SecureScan is divided into two primary modules:

1.  **Frontend (`/new design of scanner/securescan`)**: A modern, interactive dashboard built with Next.js and React.
2.  **Backend (`/security-scan-backend`)**: A robust Node.js/Express API that manages scanning lifecycles, data processing, and report generation.

---

## ✨ Key Features

-   **Dynamic Dashboard**: Real-time risk analysis and security posture tracking.
-   **3D Visualization**: Interactive global threat mapping using Three.js.
-   **Automated Scanning**: Integrated OSINT and vulnerability discovery (powered by ReconFTW/Nuclei).
-   **Professional Reporting**: Automated PDF generation for assessment results.
-   **Secure Authentication**: JWT-based session management with encrypted credentials.
-   **Cyber Aesthetics**: Optimized for high-contrast, premium dark-mode visuals.

---

## 🛠️ Technical Stack & Dependencies

### Frontend (`securescan`)
*   **Framework**: Next.js 16 (App Router)
*   **Core**: React 19, TypeScript
*   **Styling**: Tailwind CSS 4, Framer Motion
*   **3D/Graphics**: `@react-three/fiber`, `@react-three/drei`, `three-globe`
*   **UX**: Lenis (Smooth Scrolling), Lucide Icons

### Backend (`security-scan-backend`)
*   **Engine**: Node.js, Express 5
*   **Database**: MongoDB (via Mongoose)
*   **Security**: JWT, BcryptJS
*   **Reports**: PDFKit, PDFKit-Table
*   **Tasks**: Node-based child process management for scanning tools

---

## � Getting Started

### 1. Prerequisites
- **Node.js** (v18.x or later)
- **MongoDB** (Local or Atlas instance)
- **Git** (For version control)

### 2. Backend Setup
```bash
# Navigate to backend directory
cd security-scan-backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file based on .env.example
# REQUIRED: MONGODB_URI, JWT_SECRET, PORT
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd "new design of scanner/securescan"

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 💻 Running the Application

| Action | Commands (from respective root) |
| :--- | :--- |
| **Start Backend (Dev)** | `npm run dev` (uses nodemon) |
| **Start Backend (Prod)** | `npm run start` |
| **Start Frontend (Dev)** | `npm run dev` (on localhost:3000) |
| **Build Frontend** | `npm run build` |

---

## � Directory Layout

```text
securescan_work/
├── new design of scanner/
│   └── securescan/          # Next.js Source, Assets, Components
└── security-scan-backend/
    ├── controllers/         # API Request Handlers
    ├── models/              # MongoDB Data Schemas
    ├── routes/              # Express API Endpoints
    ├── services/            # Core Scanning & Logic
    └── server.js            # Entry Point
```

---

## ⚠️ Important Notes

-   **Scanner Compatibility**: The core scanning engine (ReconFTW) requires a **Linux-based environment** for full functionality. Windows is recommended primarily for UI and API development.
-   **Database**: Ensure your MongoDB connection string in `.env` is valid before starting the backend.
