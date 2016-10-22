const convert = require('./old-stable-jpgis-convert');

convert([
	'../test/data/data.xml'
], {
	output: 'expected.geojson',
	typeId: {
		'普通建物': 0,
		'堅ろう建物': 1,
		'普通無壁舎': 2,
		'堅ろう無壁舎': 3
	},
	ignoreTypes: new Set([
		'普通建物',
		'普通無壁舎'
	])
}, () => console.log('finished'));
