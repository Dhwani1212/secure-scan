const mongoose = require('mongoose');
require('dotenv').config();
const Scan = require('./models/Scan');

async function check() {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/security-scan');
    const scan = await Scan.findById('697426c0929b184038b45efa');
    if (!scan) {
        console.log('Scan not found');
    } else {
        console.log('Scan ID:', scan._id);
        console.log('Domain:', scan.domain);
        console.log('Findings Count:', scan.findings ? scan.findings.length : 0);
    }
    await mongoose.disconnect();
}

check();
