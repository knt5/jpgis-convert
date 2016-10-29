const convert = require('./old-stable-jpgis-convert');

const typeId = {
	'普通建物': 0,
	'堅ろう建物': 1,
	'普通無壁舎': 2,
	'堅ろう無壁舎': 3
};

const input = [
	'../data/input.xml'
];

let options = [
	{
		output: 'expectedData.geojson',
		typeId
	},
	{
		output: 'expectedDataWithIgnoreTypes.geojson',
		typeId,
		ignoreTypes: new Set([
			'普通建物',
			'普通無壁舎'
		])
	},
];

let i = 0;

convert(input, options[i], () => ++i < options.length ? convert(input, options[i]) : 0);
