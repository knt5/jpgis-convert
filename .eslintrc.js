module.exports = {
	extends: [
		'eslint-config-airbnb-base/rules/best-practices',
		'eslint-config-airbnb-base/rules/best-practices',
		'eslint-config-airbnb-base/rules/errors',
		'eslint-config-airbnb-base/rules/node',
		'eslint-config-airbnb-base/rules/style',
		'eslint-config-airbnb-base/rules/variables',
		'eslint-config-airbnb-base/rules/es6',
		// no "rules/imports"
	],
	rules: {
		'camelcase': 'error',
		'indent': ['error', 'tab'],
		'no-tabs': 'off',
		'no-use-before-define': 'off',
		'no-plusplus': 'off',
		/*
		'comma-spacing': [2, {'before': false, 'after': true}],
		'comma-style': [2, 'last'],
		'computed-property-spacing': [2, 'never'],
		'eol-last': 2,
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
		*/
	}
};
