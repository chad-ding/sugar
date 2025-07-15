const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')

module.exports = {
	input: 'src/index.js',
	output: {
		file: 'bin/cli.js',
		format: 'cjs'
	},
	plugins: [resolve(), commonjs(), json()]
}
