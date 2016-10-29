const fs = require('fs');

global.expect = require('chai').expect;
global.convert = require('../../');

global.removeFile = (path) => {
	try {
		fs.accessSync(path);
	} catch (e) {
		return;
	}

	fs.unlinkSync(path);
};
