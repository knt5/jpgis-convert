require('helper');

const typeId = {
	'普通建物': 0,
	'堅ろう建物': 1,
	'普通無壁舎': 2,
	'堅ろう無壁舎': 3
};

describe('Standard files conversion', () => {
	it('Generate right data with standard settings', (done) => {
		const input = './test/data/input.xml';
		const output = './test/work/data.geojson';
		const expected = './test/data/expectedData.geojson';
		
		convert([input], {
			output,
			typeId
		}, () => {
			expect(fs.readFileSync(output).toString())
				.to.equal(fs.readFileSync(expected).toString());
			done();
		});
	});
	
	it('Generate right data with ignoreTypes setting', (done) => {
		const input = './test/data/input.xml';
		const output = './test/work/dataWithIgnoreTypes.geojson';
		const expected = './test/data/expectedDataWithIgnoreTypes.geojson';
		
		convert([input], {
			output,
			typeId,
			ignoreTypes: new Set([
				'普通建物',
				'普通無壁舎'
			])
		}, () => {
			expect(fs.readFileSync(output).toString())
				.to.equal(fs.readFileSync(expected).toString());
			done();
		});
	});
});
