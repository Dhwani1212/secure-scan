const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://127.0.0.1:27017/security-scan';

async function findScan() {
    try {
        await mongoose.connect(MONGODB_URI);
        const ScanSchema = new mongoose.Schema({}, { strict: false });
        const Scan = mongoose.model('Scan', ScanSchema);

        const scans = await Scan.find({ "results.subdomains": "r87.com" });
        console.log(`Found ${scans.length} scans containing r87.com:`);
        scans.forEach(s => {
            console.log(`ID: ${s._id}, Domain: ${s.domain}, Status: ${s.status}, CreatedAt: ${s.createdAt}`);
            console.log(`Subdomains Count: ${s.results?.subdomains?.length}`);
            console.log(`Subdomains sample: ${s.results?.subdomains?.slice(0, 10).join(', ')}`);
        });

        if (scans.length === 0) {
            console.log("No scans found with 'r87.com'. Checking partial matches...");
            const allScans = await Scan.find();
            allScans.forEach(s => {
                const results = s.results || {};
                const subs = results.subdomains || [];
                if (subs.some(sub => sub.includes('r87'))) {
                    console.log(`Partial match found in ID: ${s._id}`);
                }
            });
        }

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

findScan();
