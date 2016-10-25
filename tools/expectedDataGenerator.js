const convert = require('./old-stable-jpgis-convert');

const typeId = {
	'普通建物': 0,
	'堅ろう建物': 1,
	'普通無壁舎': 2,
	'堅ろう無壁舎': 3
};

const dir = '../../city-generator/tools/data/gsi-tokyo/building-peripheral-line/FG-GML-533946-11-20151001/';

convert([
	'../test/data/data.xml'
], {
	output: 'expected.geojson',
	typeId,
	ignoreTypes: new Set([
		'普通建物',
		'普通無壁舎'
	])
}, () => convert([
		dir + 'FG-GML-533946-BldA-20151001-0001.xml',
		dir + 'FG-GML-533946-BldA-20151001-0002.xml'
	], {
		output: 'expectedBigData.geojson',
		typeId
	}, () => console.log('finished'))
);
