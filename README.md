# JPGIS GML converter

A converter from [JPGIS GML](http://fgd.gsi.go.jp/download/) file to GeoJSON (only for type BldA = Peripheral lines of buildings).

This is NOT a XML parser.

## Installation

```
npm install jpgis-convert  # Not yet
```

## Usage

```
var convert = require('jpgis-convert');

convert(files, options, callback);
```

- files - Array of BldA.xml file path strings
- options
	- output
	- typeId
	- ignoreTypes
- callback

## Background and purpose

In May 2016, I found [FGDV](http://fgd.gsi.go.jp/download/menu.php) can't handle coordinates in ```<gml:interior>``` tags in ```<BldA>``` as individual ring. Coordinates of ```<gml:interior>``` and ```<gml:exterior>``` tags are merged to a ring. The tool convert JPGIS GML to broken shape files or any formats. [PSEA](http://psgsv2.gsi.go.jp/koukyou/public/sien/pindex.html) had a same problem. I needed a tool to convert JPGIS GML (type BldA) to right GeoJSON for [my project](https://github.com/knt5/city-generator).
