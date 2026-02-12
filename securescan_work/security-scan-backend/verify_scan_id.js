const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Scan = require("./models/Scan");

async function verifyScan() {
    const idSuffix = "D3BDBE3735B1".toLowerCase();

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB:", process.env.MONGODB_URI);

        const scans = await Scan.find({});
        const targetScan = scans.find(s => s._id.toString().toLowerCase().endsWith(idSuffix));

        if (!targetScan) {
            console.log(`\n[ERROR]: No scan found ending with ${idSuffix}`);
            process.exit(1);
        }

        console.log("\n[SCAN_EXAMINATION_LOG]");
        console.log("================================");
        console.log(`ID: ${targetScan._id}`);
        console.log(`Domain: ${targetScan.domain}`);
        console.log(`Status: ${targetScan.status}`);
        console.log(`Progress: ${targetScan.progressPct}%`);
        console.log(`Grade: ${targetScan.grade || "N/A"}`);
        console.log(`Score: ${targetScan.score || "N/A"}`);
        console.log(`Current Module: ${targetScan.currentModule || "NONE"}`);
        console.log(`Created At: ${targetScan.createdAt}`);
        console.log(`Completed At: ${targetScan.completedAt || "N/A"}`);
        console.log(`Error Log: ${targetScan.error || "NONE"}`);
        console.log("================================");

        if (targetScan.status === "completed") {
            const results = targetScan.results;
            const findings = targetScan.findings;
            console.log(`Results Object Exists: ${!!results}`);
            console.log(`Findings Count: ${Array.isArray(findings) ? findings.length : (findings ? 'Object' : 0)}`);
        }

        process.exit(0);
    } catch (err) {
        console.error("Verification failed:", err);
        process.exit(1);
    }
}

verifyScan();
