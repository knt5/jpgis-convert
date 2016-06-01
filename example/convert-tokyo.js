const convert = require('../src/jpgis-convert');

const dir = '../data/gsi-tokyo/building-peripheral-line/FG-GML-533946-11-20151001/';

//convert(dir + 'FG-GML-533946-BldA-20151001-0001.xml');
convert([
	dir + 'FG-GML-533946-BldA-20151001-0001.xml',
	dir + 'FG-GML-533946-BldA-20151001-0002.xml',
	dir + 'FG-GML-533946-BldA-20151001-0003.xml',
	dir + 'FG-GML-533946-BldA-20151001-0004.xml'
]);
