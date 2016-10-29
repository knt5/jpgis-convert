require('helper');
const crypto = require('crypto');

const typeId = {
	'普通建物': 0,
	'堅ろう建物': 1,
	'普通無壁舎': 2,
	'堅ろう無壁舎': 3
};

const dir =  '../city-generator/tools/data/gsi-tokyo/building-peripheral-line/FG-GML-533946-11-20151001/';
const input = [
		dir + 'FG-GML-533946-BldA-20151001-0001.xml',
		dir + 'FG-GML-533946-BldA-20151001-0002.xml'
];

describe('Convert huge files', () => {
	it('Convert with standard settings', function(done) {
		let output = './test/work/bigData.geojson';
		let expectedSize = 75674858;
		let expectedHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
		
		this.timeout(30 * 1000);
		
		convert(input, {
			output,
			typeId
		}, () => {
			const size = fs.statSync(output)['size'];
			const hash = crypto.createHash('sha256', fs.readFileSync(output).toString()).digest('hex');
			
			expect(hash).to.equal(expectedHash);
			expect(size).to.equal(expectedSize);
			
			done();
		});
	});
});
