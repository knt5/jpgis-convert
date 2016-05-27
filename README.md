# JPGIS GML converter

[JPGIS GML](http://fgd.gsi.go.jp/download/) file to GeoJSON converter.

Only for type BldA, and this is not a XML parser.

## Background and purpose

In May 2016, I found [FGDV](http://fgd.gsi.go.jp/download/menu.php) can't handle coordinates in ```<gml:interior>``` tag in ```<BldA>``` as individual ring. Coordinates of ```<gml:interior>``` and ```<gml:exterior>``` tags are merged to a ring. The tool convert JPGIS GML to broken shape files or any formats. [PSEA](http://psgsv2.gsi.go.jp/koukyou/public/sien/pindex.html) had a same problem. I needed a tool to convert JPGIS GML (type BldA) to right GeoJSON for my project.
