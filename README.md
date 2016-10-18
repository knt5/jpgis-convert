# jpgis-convert

[JPGIS GML](http://fgd.gsi.go.jp/download/) to GeoJSON converter for [node](https://nodejs.org/).

It works for the type-BldA JPGIS GML that is peripheral lines of buildings.

It's NOT a XML parser.

## Installation

```
npm install --save jpgis-convert  # Not yet
```

## Usage

```
const convert = require('jpgis-convert');
convert(files, options, callback);
```

- files - ```Array``` of BldA.xml file path strings or ```String``` of the path.
- options - ```Object``` of the following keys and values
	- output - ```String``` of an output file path. If you don't set, stdout is used.
	- typeId - ```Object``` of type name to type ID mapper. BldA.xml has only names. Example:
	```
	{
		'普通建物': 0,
		'堅ろう建物': 1,
		'普通無壁舎': 2,
		'堅ろう無壁舎': 3
	}
	```
	- ignoreTypes - ```Set``` of building type names to ignore like "普通建物".
- callback - ```Function``` to be called when the process finished.

## Example

```
const convert = require('jpgis-convert');

convert([
	'path/to/FG-GML-533935-BldA-20160401-0001.xml',
	'path/to/FG-GML-533935-BldA-20160401-0002.xml'
], {
	output: 'output.geojson',
	typeId: {
		'普通建物': 0,
		'堅ろう建物': 1,
		'普通無壁舎': 2,
		'堅ろう無壁舎': 3
	},
	ignoreTypes: new Set(['普通無壁舎'])
}, () => console.log('finished'));
```

## Background and purpose

In May 2016, I found [FGDV](http://fgd.gsi.go.jp/download/menu.php) can't handle coordinates in ```<gml:interior>``` tags in ```<BldA>``` as individual ring. Coordinates of ```<gml:interior>``` and ```<gml:exterior>``` tags are merged to a ring. The tool convert JPGIS GML to broken shape files or any formats. [PSEA](http://psgsv2.gsi.go.jp/koukyou/public/sien/pindex.html) had a same problem. I needed a tool to convert JPGIS GML (type BldA) to right GeoJSON for my project "[City Generator](https://github.com/knt5/city-generator)".
