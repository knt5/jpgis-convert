module.exports = {
	extends: [
		'eslint-config-knt5-base',
	],
	env: {
		node: true,
		mocha: true,
	},
	globals: {
		convert: true,
		expect: true,
		removeFile: true,
	},
};
