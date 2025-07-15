const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const util = require('./util')
const { proxyTable } = require('./config')

module.exports = merge(
	{
		mode: 'development',
		devtool: 'cheap-module-source-map',
		output: {
			publicPath: '/'
		},
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader', 'postcss-loader'],
					exclude: /node_modules/
				}
			]
		},
		devServer: {
			static: [
				{
					directory: util.resolve('../static'),
					publicPath: '/'
				}
			],
			open: ['/'],
			allowedHosts: ['localhost'],
			hot: true,
			compress: true,
			host: 'localhost',
			port: 8080,
			client: {
				overlay: false
			},
			proxy: proxyTable
		}
	},
	baseConfig
)
