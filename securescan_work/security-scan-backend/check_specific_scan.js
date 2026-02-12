const mongoose = require('mongoose');
const Scan = require('./models/Scan');

async function checkScan() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/security-scan');
        const scans = await Scan.find();
        const targetSuffix = 'E05A14D44AF4'.toLowerCase();

        const scan = scans.find(s => s._id.toString().toLowerCase().endsWith(targetSuffix));

        if (scan) {
            console.log('SCAN_FOUND');
            console.log(JSON.stringify(scan, null, 2));
        } else {
            console.log('SCAN_NOT_FOUND');
            console.log('Searched suffix:', targetSuffix);
            console.log('Total scans in DB:', scans.length);
        }
    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        process.exit(0);
    }
}

checkScan();
