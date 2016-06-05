#!/bin/bash

dir="cities"

mkdir "$dir"

#----------------------------------------------------------
# Generate city
function generate() {
	src=$1
	name=$2
	bounds=$3
	
	# Generate GeoJSON
	ogr2ogr \
		-lco ENCODING=UTF-8 \
		-s_srs EPSG:4612 \
		-t_srs EPSG:4612 \
		-f 'GeoJSON' \
		-spat $bounds \
		"$dir/$name".geojson \
		"simplified/$src".shp
	
	# Crop DSM
	
	# Crop DEM
	
}

#----------------------------------------------------------
# 533946

# Tokyo station
generate "533946" "tokyo" "139.76070 35.67466 139.77250 35.68854"

# Asakusa
generate "533946" "asakusa" "139.79531 35.70900 139.80209 35.71507"

# Tokyo sky tree
generate "533946" "tokyo-sky-tree" "139.80809 35.70418 139.81405 35.71232"

# Ueno
generate "533946" "ueno" "139.77095 35.71063 139.77996 35.72001"

# Tokyo dome
generate "533946" "tokyo-dome" "139.75002 35.70237 139.75844 35.70825"

# Tokyo university
generate "533946" "tokyo-university" "139.75974 35.70775 139.76753 35.71721"

#----------------------------------------------------------
# 533936

# Odaiba
generate "533936" "odaiba" "139.77082 35.61536 139.80103 35.63645"

#----------------------------------------------------------
# 533945

# Shinjuku
generate "533945" "shinjuku" "139.69067 35.68422 139.70301 35.69331"
