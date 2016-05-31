var eslintConfig = {
	extends: 'eslint:recommended',
	envs: [
		'node',
		'es6'
	],
	globals: {
	},
	rules: {
		'camelcase': 2,
		'comma-spacing': [2, {'before': false, 'after': true}],
		'comma-style': [2, 'last'],
		'computed-property-spacing': [2, 'never'],
		'eol-last': 2,
		'indent': [2, 'tab'],
		'key-spacing': [2, {'beforeColon': false, 'afterColon': true}],
		'keyword-spacing': 2,
		'linebreak-style': [2, 'unix'],
		'max-len': [2, {'code': 120, 'comments': 180, 'ignoreUrls': true}],
		'no-alert': 2,
		'no-console': 1,
		'no-spaced-func': 2,
		'no-trailing-spaces': [2, { 'skipBlankLines': true }],
		'no-unused-vars': 1,
		'no-whitespace-before-property': 2,
		'quotes': [2, 'single'],
		'semi': [2, 'always'],
		'semi-spacing': [2, { 'before': false, 'after': true }],
		'space-before-blocks': [2, 'always']
	}
};

var config = {
	lint: {
		js: {
			path: [
				'gulpfile.js',
				'gulp/config.js',
				'gulp/task/**/*.js',
				'src/**/*.js'
			]
		}
	},
	eslint: eslintConfig
};

module.exports = config;
