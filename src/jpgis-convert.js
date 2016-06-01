const fs = require('fs');
const readline = require('readline');

//=========================================================
var output = process.stdout;

//=========================================================
/**
 * Convert JPGIS GML files to GeoJSON
 */
var convert = (filePath) => {
	var filePaths;
	
	// Make filePaths
	if (typeof filePath === 'string') {
		filePaths = [filePath];
	} else if (typeof filePath === 'object' && filePath instanceof Array) {
		filePaths = filePath;
	}
	
	// Throw Error
	if (!filePaths) {
		throw new TypeError('1st argument must be string or array');
	}
	
	// Output header
	output.write('{\n');
	output.write('"type":"FeatureCollection",\n');
	output.write('"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4612"}},\n');
	output.write('"features":[\n');
	
	// Generate and output features
	generateFeatures(filePaths);
	
};

//=========================================================
/**
 * Generate features from multiple JPGIS GML files
 */
function generateFeatures(filePaths) {
	var count = 0;
	var pathIndex = 0;
	var rl;
	
	function createReadline() {
		return readline.createInterface({
			input: fs.ReadStream(filePaths[pathIndex]),
			output: null
		});
	}
	
	function registerReadLineHandler(rl) {
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
			pathIndex ++;
			
			if (pathIndex >= filePaths.length) {
				output.write(']\n}\n');
			} else {
				rl = createReadline();
				registerReadLineHandler(rl);
				rl.resume();
			}
		});
	}
	
	rl = createReadline();
	registerReadLineHandler(rl);
	rl.resume();
}

//=========================================================
/**
 * Get feature
 */
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
