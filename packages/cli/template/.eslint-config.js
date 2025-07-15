module.exports = {
	env: {
		browser: true,
		node: false,
		es2021: true
	},
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: false
		}
	},
	overrides: [
		{
			files: ['*.js', '*.jsx'],
			parser: '@babel/eslint-parser',
			extends: ['standard', 'plugin:prettier/recommended', 'prettier/standard']
		}
	]
}
