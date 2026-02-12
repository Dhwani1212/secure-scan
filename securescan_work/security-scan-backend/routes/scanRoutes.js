const express = require("express");
const router = express.Router();

const scanController = require("../controllers/scanController");


/* ---------------------------
   SCAN ROUTES
----------------------------*/

// List all scans
router.get("/", scanController.getAllScans);

// Start a new scan
router.post("/start", scanController.startScan);

// Stop a running scan
router.post("/stop/:scanId", scanController.stopScan);



// Get scan status
router.get("/status/:scanId", scanController.getScanStatus);

// Get scan results
router.get("/results/:scanId", scanController.getScanResults);

// Restart scan
router.post("/restart/:scanId", scanController.restartScan);

// Recalculate score
router.post("/:scanId/recalculate-score", scanController.recalculateScore);

// Reparse scan
router.get("/reparse/:scanId", scanController.reparseScan);

// Export scan to ZIP
router.get("/export/:scanId", scanController.exportScan);

// Professional PDF Report
router.get("/report/:scanId", scanController.generateReport);

// Delete a scan (keep LAST)
router.delete("/:scanId", scanController.deleteScan);


module.exports = router;
