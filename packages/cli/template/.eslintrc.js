module.exports = {
	root: true,
	ignorePatterns: ['static/**/*'],
	extends: ['./.eslint-config.js'],
	rules: {
		'no-new': 'off',
		'no-new-func': 'off',
		'no-prototype-builtins': 'off'
	}
}
