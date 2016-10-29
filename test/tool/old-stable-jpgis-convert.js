const fs = require('fs');
const readline = require('readline');

// =========================================================
// Output stream
let output = process.stdout;

// =========================================================
/**
 * Convert JPGIS GML files to GeoJSON
 */
function convert(filePath, options, callback) {
	let filePaths;

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

	// Open output file
	if (options.output) {
		output = fs.createWriteStream(options.output);
	}

	// Output header
	output.write('{\n');
	output.write('"type":"FeatureCollection",\n');
	output.write('"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4612"}},\n');
	output.write('"features":[\n');

	// Generate and output features
	generateFeatures(filePaths, options, callback);
}

// =========================================================
/**
 * Generate features from multiple JPGIS GML files
 */
function generateFeatures(filePaths, options, callback) {
	let count = 0;
	let pathIndex = 0;
	let reader;
	let ignoreTypes;
	let typeId;
	if (options) {
		ignoreTypes = options.ignoreTypes;
		typeId = options.typeId;
	}

	function createReadline() {
		return readline.createInterface({
			input: fs.ReadStream(filePaths[pathIndex]),
			output: null,
		});
	}

	function registerReadLineHandler(rl) {
		rl.on('line', (line) => {
			const feature = getFeature(line);

			if (feature) {
				// Check options.ignoreTypes to ignore the feature or not
				if (!ignoreTypes || (ignoreTypes && !ignoreTypes.has(feature.properties.type))) {
					// Convert type name to id
					if (typeId !== undefined && typeId[feature.properties.type] !== undefined) {
						feature.properties.type = typeId[feature.properties.type];
					}

					// Convert to JSON string
					const json = JSON.stringify(feature);

					// Output JSON
					if (count === 0) {
						output.write(`${json}`);
					} else {
						output.write(`,\n${json}`);
					}

					// Increment count of outputted features
					count++;
				}
			}
		}).on('close', () => {
			// Next index of JPGIS GML file path
			pathIndex++;

			if (pathIndex >= filePaths.length) {
				output.write('\n]\n}\n', () => {
					if (callback) {
						callback();
					}
				});
			} else {
				reader = createReadline();
				registerReadLineHandler(reader);
				reader.resume();
			}
		});
	}

	reader = createReadline();
	registerReadLineHandler(reader);
	reader.resume();
}

// =========================================================
/**
 * Get feature
 */
let getFeature = (() => {
	let feature;
	let ring;
	let opened = false;
	let posListOpened = false;

	return (line) => {
		if (posListOpened) {
			if (line === '</gml:posList>') {
				posListOpened = false;
				feature.geometry.coordinates.push(ring);
			} else {
				const latLng = line.split(' ');
				const lat = parseFloat(latLng[0]);
				const lng = parseFloat(latLng[1]);
				ring.push([lng, lat]);
			}
		} else if (line.substr(0, 5) === '<BldA') {
			opened = true;
			feature = {
				type: 'Feature',
				properties: {
					id: line.split('"')[1],
				},
				geometry: {
					type: 'Polygon',
					coordinates: [],
				},
			};
		} else if (line.substr(0, 6) === '</BldA') {
			opened = false;
			return feature;
		} else if (line.substr(0, 4) === '<fid') {
			if (opened) {
				feature.properties.fid = line.split('>')[1].split('<')[0];
			}
		} else if (line.substr(0, 5) === '<type') {
			if (opened) {
				feature.properties.type = line.split('>')[1].split('<')[0];
			}
		} else if (line === '<gml:posList>') {
			if (opened) {
				posListOpened = true;
				ring = [];
			}
		}
		return undefined;
	};
})();

// =========================================================
// Export
module.exports = convert;
