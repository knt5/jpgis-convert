const fs = require('fs');
const readline = require('readline');

// Default output stream = stdout
let output = process.stdout;

// Default building type name to type ID map
const defaultTypeIds = {
	普通建物: 0,
	堅ろう建物: 1,
	普通無壁舎: 2,
	堅ろう無壁舎: 3,
};

module.exports = (filePaths, options, callback) => {
	if (!filePaths) {
		throw new Error('Missing filePaths');
	}

	if (options && options.output) {
		output = fs.createWriteStream(options.output);
	}

	// JSON head
	// (Not to use JSON.stringify() to process huge data with reading/writing stream)
	output.write(`{
"type":"FeatureCollection",
"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4612"}},
"features":[
`);

	convert(0, filePaths, options, callback);
};

function convert(index, filePaths, options, callback) {
	let count = 0;
	let ignoreTypes;
	let typeIds;

	if (options && options.ignoreTypes) {
		ignoreTypes = options.ignoreTypes;
	}

	if (options && options.typeIds) {
		typeIds = options.typeIds;
	} else {
		typeIds = defaultTypeIds;
	}

	const reader = createReader(filePaths[index]);

	reader.on('line', (line) => {
		const feature = getFeature(line);

		if (feature) {
			const typeName = feature.properties.type;
			if (!ignoreTypes || (ignoreTypes && !ignoreTypes.has(typeName))) {
				// Save type ID
				if (typeIds && typeIds[typeName] !== undefined) {
					feature.properties.type = typeIds[typeName];
				}

				// Write a feature JSON
				const json = JSON.stringify(feature);
				if (index !== 0 || (index === 0 && count !== 0)) {
					output.write(',\n');
				}
				output.write(json);

				count++;
			}
		}
	}).on('close', () => {
		if (index + 1 < filePaths.length) {
			// Next
			convert(index + 1, filePaths, options, callback);
		} else {
			// Finish
			output.write('\n]\n}\n', () => {
				if (callback) {
					callback();
				}
			});
		}
	});

	reader.resume();
}

function createReader(filePath) {
	return readline.createInterface({
		input: fs.ReadStream(filePath),
		output: null,
	});
}

const getFeature = (() => {
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

		return null;
	};
})();
