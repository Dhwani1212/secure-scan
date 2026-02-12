const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const scanRoutes = require("./routes/scanRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const authRoutes = require("./routes/authRoutes");
const Scan = require("./models/Scan"); // 🔴 REQUIRED for startup safety
const { runQueueWorker } = require("./services/scanQueueWorker");
const app = express();
const PORT = process.env.PORT || 3330;

/* --------------------
   MIDDLEWARE
---------------------*/

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ← ADD THIS LINE

/* --------------------
   ROUTES
---------------------*/

app.get("/api", (req, res) => {
  res.json({ status: "API OK" });
});


app.use("/api/auth", authRoutes);
app.use("/api/scans", scanRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/assessments", assessmentRoutes);

/* --------------------
   DATABASE
---------------------*/

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/security-scan"
)
  .then(async () => {
    console.log("✅ MongoDB connected");

    // 🔴 SAFETY: reset half-running scans
    await Scan.updateMany(
      { status: "running" },
      {
        $set: {
          status: "failed",
          error: "Server restarted during scan",
          completedAt: new Date(),
          currentModule: null
        }
      }
    );

    console.log("ℹ️ Running scans reset after restart");

    // 🟢 START SCAN QUEUE WORKER (ONE TIME)
    runQueueWorker();
    console.log("🟢 Scan queue worker started");
  })

  .catch(err => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });


/* --------------------
   START SERVER
---------------------*/

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
