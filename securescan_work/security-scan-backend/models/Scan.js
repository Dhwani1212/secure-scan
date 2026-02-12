const mongoose = require("mongoose");

/**
 * Scan Schema
 * -----------
 * IMPORTANT DESIGN RULE:
 * - results, findings, score, grade MUST be null until scan COMPLETES
 * - This avoids UI freeze, false completion, and progress bugs
 */

const ScanSchema = new mongoose.Schema({
  /* ======================
     Ownership
  ====================== */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  /* ======================
     Target Info
  ====================== */
  domain: {
    type: String,
    required: true,
    trim: true,
  },

mode: {
  type: String,
  enum: ["full", "web", "passive", "subdomain", "all"],
  default: "all",
},

queuedAt: {
  type: Date,
  default: Date.now,
},


  scanType: {
    type: String,
    default: "reconftw",
  },

  /* ======================
     Lifecycle Status
  ====================== */
  status: {
    type: String,
    enum: ["pending", "running", "completed", "failed", "stopped"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  startedAt: {
    type: Date,
    default: null,
  },

  completedAt: {
    type: Date,
    default: null,
  },

  /* ======================
     Runtime Control
  ====================== */
  pid: {
    type: Number,
    default: null,
  },
  
  pgid: {
  type: Number,
  default: null,
},


  logFile: {
    type: String,
    default: null,
  },

  outputPath: {
    type: String,
    default: null,
  },

  /* ======================
     Progress Tracking
  ====================== */
  currentModule: {
    type: String,
    default: null,
  },

  progressPct: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },

  /* ======================
     Results (ONLY after completion)
  ====================== */
  results: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },

  findings: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },

  score: {
    type: Number,
    default: null,
  },

  grade: {
    type: String,
    default: null,
  },

  /* ======================
     Error Handling
  ====================== */
  error: {
    type: String,
    default: null,
  },
});

/* ======================
   Indexes (optional but recommended)
====================== */
ScanSchema.index({ createdAt: -1 });
ScanSchema.index({ status: 1 });

module.exports = mongoose.model("Scan", ScanSchema);
