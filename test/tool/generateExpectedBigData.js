const convert = require('./old-stable-jpgis-convert');

const dir = '../../../city-generator/tools/data/gsi-tokyo/building-peripheral-line/FG-GML-533946-11-20151001/';

const typeId = {
	普通建物: 0,
	堅ろう建物: 1,
	普通無壁舎: 2,
	堅ろう無壁舎: 3,
};

const input = [
	`${dir}FG-GML-533946-BldA-20151001-0001.xml`,
	`${dir}FG-GML-533946-BldA-20151001-0002.xml`,
];

const options = [
	{
		output: 'expectedBigData.geojson',
		typeId,
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
