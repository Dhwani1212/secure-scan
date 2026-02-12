const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/security-scan';
const SCAN_ID = '697426c0929b184038b45efa';

const fs = require('fs');

async function checkScan() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const ScanSchema = new mongoose.Schema({}, { strict: false });
        const Scan = mongoose.model('Scan', ScanSchema);

        const scan = await Scan.findById(SCAN_ID);
        if (!scan) {
            fs.writeFileSync('scan_data.json', JSON.stringify({ error: 'SCAN_NOT_FOUND' }, null, 2));
        } else {
            fs.writeFileSync('scan_data.json', JSON.stringify(scan.toObject ? scan.toObject() : scan, null, 2));
        }
        console.log('Data saved to scan_data.json');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

checkScan();
