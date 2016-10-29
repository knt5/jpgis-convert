const convert = require('./old-stable-jpgis-convert');

const typeId = {
	普通建物: 0,
	堅ろう建物: 1,
	普通無壁舎: 2,
	堅ろう無壁舎: 3,
};

const input = [
	'../data/input.xml',
];

const options = [
	{
		output: 'expectedData.geojson',
		typeId,
	},
	{
		output: 'expectedDataWithIgnoreTypes.geojson',
		typeId,
		ignoreTypes: new Set([
			'普通建物',
			'普通無壁舎',
		]),
	},
];

let i = 0;
generate();

function generate() {
	convert(input, options[i], () => {
		i++;
		if (i < options.length) {
			generate();
		}
	});
}
