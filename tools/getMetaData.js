const fs = require('fs');
const crypto = require('crypto');

// File name
const name = 'expectedBigData.geojson';

// Get size and hash
const size = fs.statSync(name)['size'];
const hash = crypto.createHmac('sha256', fs.readFileSync(name).toString())
	.digest('hex');

// Output
console.log(size);
console.log(hash);
