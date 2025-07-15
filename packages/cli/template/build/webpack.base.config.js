const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const postHtml = require('posthtml')
const postHtmlInlineSvg = require('posthtml-inline-svg')

const util = require('./util')
const { apiHost, publicPath } = require('./config')

const entry = util.getEntries()
const HtmlPliginList = Object.keys(entry).map(key => {
	const filename = key === 'index' ? 'index.html' : key + '/index.html'

	return new HtmlWebpackPlugin({
		filename,
		publicPath,
		templateContent: util.getTemplate(key),
		inject: true,
		minify: {
			removeComments: true,
			collapseWhitespace: true
		},
		chunks: [key]
	})
})

const buildEnv = process.env.BUILD_ENV

module.exports = {
	entry,
	output: {
		path: util.resolve('../dist'),
		filename: 'asset/js/[contenthash].js',
		chunkFilename: 'asset/js/[contenthash].js'
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 3 * 1024 // 小于3K的图片直接打包成base64
					}
				},
				generator: {
					filename: 'asset/image/[contenthash][ext][query]' // 打包后会放到img文件夹下  hash缓存
				}
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
				include: [util.resolve('../src')],
				options: {
					esModule: false,
					preprocessor: async (content, loaderContext) => {
						try {
							let matched = false
							content = content.replace(
								/src="~@\/asset\/image\/([^.]+)\.svg"/gm,
								function (pattern, group) {
									matched = true
									return (
										'src="' +
										path.join(
											process.cwd(),
											'src/asset/image/' + group + '.svg"'
										)
									)
								}
							)

							if (!matched) {
								return content
							}

							const res = await postHtml(
								postHtmlInlineSvg({
									cwd: loaderContext.context,
									tag: 'icon',
									attr: 'src'
								})
							).process(content)

							return res.html
						} catch (error) {
							loaderContext.emitError(error)
							return content
						}
					}
				}
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				},
				include: [util.resolve('../src'), util.resolve('../node_modules/axios')]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.css', '.html'],
		alias: {
			'@': util.resolve('../src')
		}
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'static', to: '_static' }]
		}),
		new webpack.DefinePlugin({
			'process.env': {
				apiHost,
				buildEnv: `"${buildEnv}"`
			}
		}),
		new CleanWebpackPlugin(),
		...HtmlPliginList
	]
}
