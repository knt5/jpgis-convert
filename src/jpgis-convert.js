const fs = require('fs');
const readline = require('readline');

//=========================================================
// Convert JPGIS GML file to GeoJSON
var convert = (filePath, options) => {
	var count = 0;
	var output = process.stdout;
	
	var rl = readline.createInterface({
		input: fs.ReadStream(filePath),
		output: null
	});
	
	output.write('{\n');
	output.write('"type":"FeatureCollection",\n');
	output.write('"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4612"}},\n');
	output.write('"features":[\n');
	
	rl.on('line', (line) => {
		var feature = getFeature(line);
		
		if (feature) {
			let json = JSON.stringify(feature);
			
			if (count === 0) {
				output.write(json + '\n');
			} else {
				output.write(',' + '\n' + json);
			}
			
			count ++;
		}
		
	}).on('close', () => {
		output.write(']\n}\n');
	});
	
	rl.resume();
};

//=========================================================
// Get feature
var getFeature = (() => {
	var feature;
	var ring;
	var opened = false;
	var posListOpened = false;
	
	return (line) => {
		
		if (posListOpened) {
			if (line === '</gml:posList>') {
				posListOpened = false;
				feature.geometry.coordinates.push(ring);
				
			} else {
				let latLng = line.split(' ');
				let lat = parseFloat(latLng[0]);
				let lng = parseFloat(latLng[1]);
				ring.push([lng, lat]);
			}
			
		} else if (line.substr(0, 5) === '<BldA') {
			opened = true;
			feature = {
				type: 'Feature',
				properties: {
					id: line.split('"')[1]
				},
				geometry: {
					type: 'Polygon',
					coordinates: []
				}
			};
			
		} else if (line.substr(0, 6) === '</BldA') {
			opened = false;
			return feature;
			
		} else if (line.substr(0, 4) === '<fid') {
			if (opened) {
				feature.properties.fid = line.split('>')[1].split('<')[0];
			}
			
		} else if (line === '<gml:posList>') {
			if (opened) {
				posListOpened = true;
				ring = [];
			}
		}
	};
})();

//=========================================================
// Export
module.exports = convert;
