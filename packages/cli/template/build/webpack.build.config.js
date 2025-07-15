const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const baseConfig = require('./webpack.base.config')
const { publicPath } = require('./config')

const plugins = [
	new MiniCssExtractPlugin({
		filename: 'asset/css/[contenthash].css'
	})
]
if (process.argv.slice(2).includes('--analyze')) {
	plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(
	{
		mode: 'production',
		output: {
			publicPath
		},
		optimization: {
			minimizer: [new CssMinimizerPlugin(), '...'],
			minimize: true
		},
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader
						},
						'css-loader',
						'postcss-loader'
					],
					exclude: /node_modules/
				}
			]
		},
		plugins
	},
	baseConfig
)
