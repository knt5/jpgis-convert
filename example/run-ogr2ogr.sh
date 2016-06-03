#!/bin/bash

name=533946

mkdir shape

ogr2ogr \
	-where 'OGR_GEOM_AREA > 0.0000000025' \
	-lco ENCODING=UTF-8 \
	-s_srs EPSG:4612 \
	-t_srs EPSG:4326 \
	-f 'ESRI Shapefile' \
	-simplify 0.000005 \
	"shape/$name".shp \
	"$name".geojson