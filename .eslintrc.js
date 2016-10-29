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
	env: {
		node: true,
		mocha: true,
	},
	globals: {
		convert: true,
		expect: true,
	},
	rules: {
		camelcase: 'error',
		'func-names': 'off',
		indent: ['error', 'tab'],
		'no-console': 'off',
		'no-plusplus': 'off',
		'no-tabs': 'off',
		'no-use-before-define': 'off',
	}
};
