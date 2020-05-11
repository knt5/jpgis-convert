# JPGIS GML converter

[![Build Status](https://travis-ci.org/knt5/jpgis-convert.svg?branch=master)](https://travis-ci.org/knt5/jpgis-convert)

![JPGIS GML converter](https://knt5.github.io/build/img/jpgis-convert.86527045.png)

[JPGIS GML](http://fgd.gsi.go.jp/download/) to GeoJSON converter for building peripheral lines (=BldA) for [node](https://nodejs.org/).

## Installation

```
npm i jpgis-convert
```

## Usage

### Example

```
const convert = require('jpgis-convert');
convert(['input1.xml', 'input2.xml'], {
	output: 'output.geojson'
});
```

### convert(files [, options [, callback]])

- files - ```Array``` of ```String``` of BldA.xml file path
- options:
	- ```output``` - ```String``` of an output file path. If you don't set it, ```convert()``` outputs to ```stdout```.
	- ```typeIds``` - ```Object``` of building type name to ID mapper. Default:
	```
	{
		'普通建物': 0,
		'堅ろう建物': 1,
		'普通無壁舎': 2,
		'堅ろう無壁舎': 3
	}
	```
	- ```ignoreTypes``` - Building type name ```Set``` to ignore.
- callback - The ```Function``` is called when ```convert()``` finished. It takes no arguments.

A full option example:

```
const convert = require('jpgis-convert');
convert(['input1.xml', 'input2.xml'], {
	output: 'output.geojson',
	typeIds: {
		'普通建物': 0,
		'堅ろう建物': 1
	},
	ignoreTypes: new Set(['普通無壁舎', '堅ろう無壁舎'])
}, () => console.log('finished'));
```

## Background and purpose

In May 2016, I found the tool [FGDV](http://fgd.gsi.go.jp/download/menu.php) of the government of Japan can't handle coordinates in ```<gml:interior>``` tags in ```<BldA>``` as individual ring. Coordinates in ```<gml:interior>``` and ```<gml:exterior>``` tags are merged to a ring. It converts JPGIS GML to broken shape files. [PSEA](http://psgsv2.gsi.go.jp/koukyou/public/sien/pindex.html) had a same problem. I needed a tool to convert JPGIS GML to right GeoJSON for [my project](https://knt5.github.io/demo/city-generator/).
