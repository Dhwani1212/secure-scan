const reconftwService = require("../services/reconftwServices");
const Scan = require("../models/Scan");
const scoringService = require("../services/scoringServices");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const PDFTable = require("pdfkit-table");

// --- PDF Report Constants & Remediation Database ---
const VULN_DATABASE = {
  "ssl": { category: "Web Encryption", risk: "Data transmitted could be intercepted", fix: "Enable SSL/TLS with a valid certificate" },
  "tls": { category: "Web Encryption", risk: "Weak encryption may allow eavesdropping", fix: "Upgrade to TLS 1.2 or higher" },
  "https": { category: "Web Encryption", risk: "Unencrypted data transfer", fix: "Enforce HTTPS on all pages" },
  "certificate": { category: "Web Encryption", risk: "Users may distrust your site", fix: "Renew or fix SSL certificate" },
  "xss": { category: "Application Security", risk: "Attackers can inject malicious scripts", fix: "Sanitize all user inputs and use Content-Security-Policy" },
  "sql": { category: "Application Security", risk: "Database can be accessed or modified", fix: "Use parameterized queries and input validation" },
  "injection": { category: "Application Security", risk: "Attackers can execute malicious code", fix: "Validate and sanitize all inputs" },
  "outdated": { category: "Software Patching", risk: "Known vulnerabilities may be exploited", fix: "Update to the latest version" },
  "version": { category: "Software Patching", risk: "Old software has known security flaws", fix: "Keep all software updated" },
  "cve": { category: "Software Patching", risk: "Publicly known vulnerability", fix: "Apply security patches immediately" },
  "exposed": { category: "Breach Events", risk: "Sensitive data visible to attackers", fix: "Remove sensitive files and disable directory listing" },
  "secret": { category: "Breach Events", risk: "Active credentials or keys leaked", fix: "Revoke compromised secrets and update configuration" },
  "blacklist": { category: "System Reputation", risk: "Domain flagged as malicious or spam", fix: "Request removal from blacklists and audit system for compromise" },
  "reputation": { category: "System Reputation", risk: "Low security reputation may block users", fix: "Improve security posture and email delivery settings" },
  "spf": { category: "Email Security", risk: "Domain can be used for email spoofing", fix: "Set up correct SPF records" },
  "dkim": { category: "Email Security", risk: "Email authenticity cannot be verified", fix: "Implement DKIM signatures" },
  "dmarc": { category: "Email Security", risk: "Attackers can impersonate your domain via email", fix: "Enable DMARC with 'reject' or 'quarantine' policy" },
  "cloud": { category: "System Hosting", risk: "Hosting infrastructure misconfiguration", fix: "Audit cloud resource permissions and public access" },
  "bucket": { category: "System Hosting", risk: "Unprotected cloud storage exposed", fix: "Disable public access to cloud storage buckets" }
};

/* =========================================================
   START SCAN
========================================================= */
exports.startScan = async (req, res) => {
  try {
    const { domain, mode } = req.body;

    /* --------------------
       1. Validate domain
    -------------------- */
    if (!domain) {
      return res.status(400).json({
        success: false,
        message: "Domain is required"
      });
    }

    let cleanDomain = domain.trim().toLowerCase();

    // Remove protocol (http://, https://)
    cleanDomain = cleanDomain.replace(/^https?:\/\//i, '');

    // Remove trailing slash and any paths
    cleanDomain = cleanDomain.split('/')[0];

    // Remove port if present
    cleanDomain = cleanDomain.split(':')[0];

    const isDomain = /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(cleanDomain);
    const isIPv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(cleanDomain);

    if (!isDomain && !isIPv4) {
      return res.status(400).json({
        success: false,
        message: "Invalid target. Use domain or IPv4 address."
      });
    }

    /* --------------------
       2. Validate scan mode
    -------------------- */
    const allowedModes = ["passive", "subdomain", "web", "full"];

    if (!allowedModes.includes(mode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid scan mode"
      });
    }

    /* --------------------
       3. Create scan entry
    -------------------- */
    const newScan = new Scan({
      domain: cleanDomain,
      mode,                      // ✅ USE UI MODE
      status: "pending",
      progressPct: 0,
      currentModule: "Queued",
      createdAt: new Date()
    });

    await newScan.save();

    // Scans are now handled by scanQueueWorker.js
    // reconftwService.scanDomain() call removed from here

    return res.status(201).json({
      success: true,
      scanId: newScan._id,
      message: "Scan added to queue successfully"
    });

  } catch (err) {
    console.error("startScan error:", err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


/* =========================================================
   STOP SCAN  ✅ FIXED (AWAIT + SAFE)
========================================================= */
exports.stopScan = async (req, res) => {
  const scanId = req.params.scanId || req.body.scanId;

  if (!scanId) {
    return res.status(400).json({
      success: false,
      message: "scanId required"
    });
  }

  try {
    // 🔴 MUST await (this was broken before)
    const stopped = await reconftwService.stopScan(scanId);

    return res.json({
      success: stopped,
      message: stopped ? "Scan stopped." : "Scan not running."
    });

  } catch (err) {
    console.error("stopScan error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to stop scan"
    });
  }
};

/* =========================================================
   RESTART SCAN
========================================================= */
exports.restartScan = async (req, res) => {
  try {
    const { scanId } = req.params;

    const scan = await Scan.findById(scanId);
    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found"
      });
    }

    // 🛑 Stop if running
    try {
      await reconftwService.stopScan(scanId);
    } catch (e) {
      console.warn("Restart: no running process to stop");
    }

    // ♻ Reset scan state
    scan.status = "pending";
    scan.progressPct = 0;
    scan.currentModule = "Queued";
    scan.results = null;
    scan.score = null;
    scan.grade = null;
    scan.error = null;
    scan.startedAt = new Date();
    scan.completedAt = null;

    await scan.save();

    // Scans are now handled by scanQueueWorker.js
    // reconftwService.scanDomain() call removed from here

    return res.json({
      success: true,
      message: "Scan added to queue for restart",
      scanId: scan._id
    });

  } catch (err) {
    console.error("restartScan error:", err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



/* =========================================================
   GET SCAN STATUS
========================================================= */
exports.getScanStatus = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.scanId);

    if (!scan) {
      return res.status(404).json({
        message: "Scan not found"
      });
    }

    return res.json(scan);

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

/* =========================================================
   GET SCAN RESULTS
========================================================= */
exports.getScanResults = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.scanId);

    if (!scan) {
      return res.status(404).json({ message: "Scan not found" });
    }

    if (scan.status !== "completed") {
      return res.status(400).json({ message: "Scan not completed yet" });
    }

    // ✅ RETURN FULL SCAN OBJECT (CRITICAL)
    return res.json(scan);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/* =========================================================
   REPARSE OLD SCAN RESULTS
========================================================= */
exports.reparseScan = async (req, res) => {
  try {
    const { scanId } = req.params;

    const scan = await Scan.findById(scanId);
    if (!scan || !scan.outputPath) {
      return res.status(404).json({
        success: false,
        message: "Scan or outputPath not found"
      });
    }

    const results = await reconftwService.parseResultsFromPath(
      scan.outputPath,
      scan.domain
    );

    const score = scoringService.calculateScore(results);
    const grade = scoringService.getGrade(score);

    await Scan.findByIdAndUpdate(scanId, {
      results,
      score,
      grade,
      status: "completed",
      progressPct: 100
    });

    return res.json({
      success: true,
      message: "Results reparsed successfully",
      score,
      grade
    });

  } catch (err) {
    console.error("reparseScan error:", err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* =========================================================
   LIST ALL SCANS
========================================================= */
exports.getAllScans = async (req, res) => {
  try {
    const scans = await Scan.find().sort({ createdAt: -1 });
    return res.json(scans);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

/* =========================================================
   EXPORT SCAN RESULTS (ZIP)
========================================================= */
exports.exportScan = async (req, res) => {
  try {
    const { scanId } = req.params;
    const scan = await Scan.findById(scanId);

    if (!scan) {
      return res.status(404).json({ message: "Scan not found" });
    }

    if (scan.status !== "completed") {
      return res.status(400).json({ message: "Scan not completed or results not ready" });
    }

    const zipPath = await reconftwService.createExportZip(scanId, scan.domain);

    // Send file to client
    const fileName = `results_${scan.domain}_${scanId}.zip`;
    res.download(zipPath, fileName, (err) => {
      // Cleanup after send
      if (fs.existsSync(zipPath)) {
        try {
          fs.unlinkSync(zipPath);
        } catch (e) {
          console.warn("Failed to cleanup ZIP:", zipPath);
        }
      }

      if (err && !res.headersSent) {
        console.error("Export download error:", err);
      }
    });

  } catch (err) {
    console.error("exportScan error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to export scan data: " + err.message
    });
  }
};

/* =========================================================
   DELETE SCAN
========================================================= */
exports.deleteScan = async (req, res) => {
  try {
    await Scan.findByIdAndDelete(req.params.scanId);
    return res.json({
      success: true,
      message: "Scan deleted"
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
/* =========================================================
   DEBUG: RECALCULATE SCORE (NO RECON)
   (SAFE – does not run recon, DB only)
========================================================= */
exports.recalculateScore = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.scanId);

    if (!scan || !scan.results) {
      return res.status(404).json({
        success: false,
        message: "Scan or results not found"
      });
    }

    const score = scoringService.calculateScore(scan.results);
    const grade = scoringService.getGrade(score);

    scan.score = score;
    scan.grade = grade;
    await scan.save();

    return res.json({
      success: true,
      score,
      grade
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* =========================================================
   GENERATE PROFESSIONAL PDF REPORT
========================================================= */
exports.generateReport = async (req, res) => {
  const { scanId } = req.params;
  try {
    const scan = await Scan.findById(scanId);
    if (!scan) return res.status(404).send("Scan not found");

    const doc = new PDFDocument({ margin: 30, size: 'A4', bufferPages: true });
    const filename = `Security_Report_${scan.domain}_${Date.now()}.pdf`;

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    // --- Cover Page ---
    doc.rect(0, 0, 600, 850).fill('#f9fafb');
    doc.fillColor('#7c3aed').fontSize(36).text('Security Assessment', 50, 200, { weight: 'bold' });
    doc.fillColor('#111827').fontSize(24).text(`Target: ${scan.domain}`, 50, 250);
    doc.fontSize(14).text(`Date: ${new Date(scan.completedAt || scan.createdAt).toLocaleDateString()}`, 50, 280);

    doc.rect(50, 320, 200, 100).fill('#fff').stroke('#e5e7eb');
    doc.fillColor('#111827').fontSize(12).text('Security Health Score', 70, 340);
    doc.fontSize(48).fillColor('#7c3aed').text(`${scan.score || 0}`, 70, 360);
    doc.fontSize(16).fillColor('#9ca3af').text('/100', 130, 390);

    doc.addPage();

    // --- Executive Summary ---
    doc.fillColor('#111827').fontSize(20).text('Executive Summary', 50, 50);
    doc.fontSize(12).text(`This professional security assessment provides a deep dive into the security posture of ${scan.domain}. Our scanners analyzed various layers including DNS, Web Application, Network infrastructure, and Email security.`, 50, 80, { width: 500, lineGap: 4 });

    // --- Industry Ratings (The 9 Categories) ---
    doc.fontSize(16).text('Industry Ratings Breakdown', 50, 150);

    const findings = scan.findings || [];
    const results = scan.results || {};

    // Helper logic same as frontend
    const countHits = (keywords) => findings.filter(f => new RegExp(keywords.join('|'), 'i').test(f.title || f.raw)).length;

    const categories = [
      { label: "Software Patching", score: Math.max(0, 10 - countHits(['version', 'outdated', 'cve', 'patch']) * 2) },
      { label: "Application Security", score: Math.max(0, 10 - countHits(['sql', 'xss', 'injection', 'broken', 'auth', 'csrf', 'ssrf', 'rce', 'file']) * 1.5) },
      { label: "Web Encryption", score: Math.max(0, 10 - countHits(['ssl', 'tls', 'https', 'cert']) * 1.5) },
      { label: "Network Filtering", score: Math.max(0, 10 - (results.openPorts?.length || 0) * 0.5) },
      { label: "Breach Events", score: Math.max(0, 10 - countHits(['secret', 'key', 'leak', 'exposed', 'token', 'password', 'credential']) * 2.5) },
      { label: "System Reputation", score: Math.max(0, 10 - countHits(['blacklist', 'reputation', 'malicious', 'phishing']) * 3.0) },
      { label: "Email Security", score: Math.max(0, 10 - countHits(['spf', 'dkim', 'dmarc', 'email']) * 2.0) },
      { label: "DNS Security", score: Math.max(0, 10 - (results.subdomains?.length || 0) * 0.05) },
      { label: "System Hosting", score: Math.max(0, 10 - countHits(['cloud', 'bucket', 'aws', 'azure', 'gcp', 's3', 'storage', 'lambda', 'instance']) * 1.0) }
    ];

    const tableRows = categories.map(c => [
      c.label,
      c.score.toFixed(1) + "/10",
      c.score >= 9 ? 'A - Excellent' : c.score >= 8 ? 'B - Good' : c.score >= 6 ? 'C - Fair' : 'F - Weak'
    ]);

    // Simple manual table as pdfkit-table might be tricky to setup perfectly here
    doc.fillColor('#111827').fontSize(12).text('Category', 50, 180);
    doc.text('Score', 300, 180);
    doc.text('Rating', 400, 180);
    doc.moveTo(50, 195).lineTo(550, 195).stroke('#e5e7eb');

    tableRows.forEach((row, i) => {
      const y = 205 + (i * 25);
      doc.fontSize(10).fillColor('#4b5563').text(row[0], 50, y);
      doc.text(row[1], 300, y);
      doc.text(row[2], 400, y);
    });

    doc.addPage();

    // --- Detailed Findings & Remediation ---
    doc.fillColor('#111827').fontSize(20).text('Detailed Findings & Remediation', 50, 50);

    let yPos = 80;
    findings.forEach((f, i) => { // Showing all findings for full detail
      if (yPos > 700) { doc.addPage(); yPos = 50; }

      // Determine suggestion
      const lower = (f.title || f.raw || "").toLowerCase();
      let suggestion = "Monitor system logs and stay updated with latest security patches.";
      for (const [key, data] of Object.entries(VULN_DATABASE)) {
        if (lower.includes(key)) { suggestion = data.fix; break; }
      }

      doc.fontSize(10).fillColor('#111827').text(`${i + 1}. ${(f.title || "Vulnerability").slice(0, 80)}`, 50, yPos, { weight: 'bold' });
      doc.fontSize(9).fillColor('#ef4444').text(`Severity: ${(f.severity || "info").toUpperCase()}`, 50, yPos + 12);
      doc.fontSize(9).fillColor('#4b5563').text(`Remediation: ${suggestion}`, 50, yPos + 24, { width: 450 });
      yPos += 55;
    });

    // --- Footer ---
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.fontSize(8).fillColor('#9ca3af').text(`EliteScan Pro Internal Document | Confidential | Page ${i + 1} of ${pageCount}`, 50, 800, { align: 'center' });
    }

    doc.end();

  } catch (err) {
    console.error("Report generation error:", err);
    res.status(500).send("Error generating report");
  }
};
