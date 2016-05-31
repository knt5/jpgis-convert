const fs = require('fs');
const readline = require('readline');

var convert = (filePath, options) => {
	
	var rl = readline.createInterface({
		input: fs.ReadStream(filePath),
		output: null
	});
	
	rl.on('line', (line) => {
		
		if (line.substr(0, 5) === '<BldA') {
			
			console.log('***' + line + '***');
			
			
		}
		
		
		
		
		
		
	});
	
	rl.resume();
};

module.exports = convert;
