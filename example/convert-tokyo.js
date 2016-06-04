const convert = require('jpgis-convert');

// Directory
//const dir = __dirname + '/../data/gsi-tokyo/building-peripheral-line/';

// Table of type name to id
const typeId = {
	'普通建物': 0,
	'堅ろう建物': 1,
	'普通無壁舎': 2,
	'堅ろう無壁舎': 3
};

const dir = __dirname + '/../data/gsi-tokyo/building-peripheral-line/FG-GML-533946-11-20151001/';

convert([
	dir + 'FG-GML-533946-BldA-20151001-0001.xml',
	dir + 'FG-GML-533946-BldA-20151001-0002.xml',
	dir + 'FG-GML-533946-BldA-20151001-0003.xml',
	dir + 'FG-GML-533946-BldA-20151001-0004.xml'
], {
	output: '533946.geojson',
	typeId: typeId
});
