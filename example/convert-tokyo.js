const convert = require('jpgis-convert');

const dir = __dirname + '/../data/gsi-tokyo/building-peripheral-line/FG-GML-533946-11-20151001/';

convert([
	dir + 'FG-GML-533946-BldA-20151001-0001.xml',
	dir + 'FG-GML-533946-BldA-20151001-0002.xml',
	dir + 'FG-GML-533946-BldA-20151001-0003.xml',
	dir + 'FG-GML-533946-BldA-20151001-0004.xml'
], {
	//ignoreTypes: new Set([
	//	'普通無壁舎'
	//]),
	typeId: {
		'普通建物': 0,
		'堅ろう建物': 1,
		'普通無壁舎': 2,
		'堅ろう無壁舎': 3
	}
});
