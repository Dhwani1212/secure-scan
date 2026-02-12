const axios = require('axios');

async function triggerReparse() {
    const scanId = '697426c0929b184038b45efa';
    const url = `http://localhost:3330/api/scans/reparse/${scanId}`;

    try {
        console.log(`Triggering reparse for ${scanId}...`);
        const response = await axios.get(url);
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

triggerReparse();
