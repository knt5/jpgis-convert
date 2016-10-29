const fs = require('fs');
require('helper');

const typeIds = {
	普通建物: 0,
	堅ろう建物: 1,
	普通無壁舎: 2,
	堅ろう無壁舎: 3,
};

describe('Standard files conversion', () => {
	it('Generate right data with standard settings', (done) => {
		const input = './test/data/input.xml';
		const output = './test/work/data.geojson';
		const expected = './test/data/expectedData.geojson';

		removeFile(output);

		convert([input], {
			output,
			typeIds,
		}, () => {
			expect(fs.readFileSync(output).toString())
				.to.equal(fs.readFileSync(expected).toString());
			done();
		});
	});

	it('Generate right data with customized typeIds', (done) => {
		const input = './test/data/input.xml';
		const output = './test/work/dataWithCustomizedTypeIds.geojson';
		const expected = './test/data/expectedDataWithCustomizedTypeIds.geojson';

		removeFile(output);

		convert([input], {
			output,
			typeIds: {
				普通建物: 5000,
				堅ろう建物: 8888,
			},
		}, () => {
			expect(fs.readFileSync(output).toString())
				.to.equal(fs.readFileSync(expected).toString());
			done();
		});
	});

	it('Generate right data without typeIds', (done) => {
		const input = './test/data/input.xml';
		const output = './test/work/dataWithoutTypeIds.geojson';
		const expected = './test/data/expectedData.geojson';

		removeFile(output);

		convert([input], {
			output,
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

		removeFile(output);

		convert([input], {
			output,
			typeIds,
			ignoreTypes: new Set([
				'普通建物',
				'普通無壁舎',
			]),
		}, () => {
			expect(fs.readFileSync(output).toString())
				.to.equal(fs.readFileSync(expected).toString());
			done();
		});
	});
});
