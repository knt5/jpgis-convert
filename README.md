# JPGIS GML converter

A [JPGIS GML](http://fgd.gsi.go.jp/download/) to GeoJSON converter. (Only for type BldA = Peripheral lines of buildings)

This is NOT a XML parser.

## Installation

```
npm install jpgis-convert  # Not yet
```

## Usage

```
const convert = require('jpgis-convert');

convert(files, options, callback);
```

- files - ```Array``` of strings of BldA.xml file paths
- options
	- output - ```String``` of an output file path. If you don't set, stdout will be output stream.
	- typeId - ```Object``` of type name to type ID mapper. Key is name, value is ID. BldA.xml has only names.
		- Example:
		```
		{
			'普通建物': 0,
			'堅ろう建物': 1,
			'普通無壁舎': 2,
			'堅ろう無壁舎': 3
		}
		```
	- ignoreTypes - ```Set``` of building type names to ignore like "普通建物".
- callback - ```Function``` to be called when process is finished.

## Example

## Background and purpose

In May 2016, I found [FGDV](http://fgd.gsi.go.jp/download/menu.php) can't handle coordinates in ```<gml:interior>``` tags in ```<BldA>``` as individual ring. Coordinates of ```<gml:interior>``` and ```<gml:exterior>``` tags are merged to a ring. The tool convert JPGIS GML to broken shape files or any formats. [PSEA](http://psgsv2.gsi.go.jp/koukyou/public/sien/pindex.html) had a same problem. I needed a tool to convert JPGIS GML (type BldA) to right GeoJSON for [my project](https://github.com/knt5/city-generator).
