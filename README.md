# JPGIS GML converter

A converter from [JPGIS GML](http://fgd.gsi.go.jp/download/) to GeoJSON (only for type BldA = Peripheral lines of buildings).

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

- files - Array of strings of BldA.xml file path
- options
	- output - An output file path. If ```output``` is not set, stdout is used.
	- typeId - An object whose key is building type name in BldA.xml and value is id number. It's used for TypeName-to-TypeID conversion table. If ```typeId``` is not set, ```feature.properties.type``` in output GeoJSON will be gone. And if this conversion table is not perfect (= BldA.xml has unknown type name), ```feature.properties.type``` of such buildings will be gone, too. You don't need to be afraid, BldA.xml has only 4 types (in 2016 at least). They are "普通建物", "堅ろう建物", "普通無壁舎", "堅ろう無壁舎".
	- ignoreTypes - A ```Set``` that has building type names in BldA.xml like "普通建物".
- callback

## Background and purpose

In May 2016, I found [FGDV](http://fgd.gsi.go.jp/download/menu.php) can't handle coordinates in ```<gml:interior>``` tags in ```<BldA>``` as individual ring. Coordinates of ```<gml:interior>``` and ```<gml:exterior>``` tags are merged to a ring. The tool convert JPGIS GML to broken shape files or any formats. [PSEA](http://psgsv2.gsi.go.jp/koukyou/public/sien/pindex.html) had a same problem. I needed a tool to convert JPGIS GML (type BldA) to right GeoJSON for [my project](https://github.com/knt5/city-generator).
