const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://127.0.0.1:27017/security-scan';
const SCAN_ID = '697426c0929b184038b45efa';

async function checkSubdomains() {
    try {
        await mongoose.connect(MONGODB_URI);
        const ScanSchema = new mongoose.Schema({}, { strict: false });
        const Scan = mongoose.model('Scan', ScanSchema);

        const scan = await Scan.findById(SCAN_ID);
        if (scan) {
            const subdomains = scan.results?.subdomains || [];
            console.log(`Scan ID: ${scan._id}`);
            console.log(`Subdomains Count: ${subdomains.length}`);
            console.log(`Subdomains: ${subdomains.join(', ')}`);
        } else {
            console.log("Scan not found");
        }

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkSubdomains();
