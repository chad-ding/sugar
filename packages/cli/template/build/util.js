const path = require('path')
const fs = require('fs')
const dateFormat = require('date-format')
const pkg = require('../package.json')

const buildEnv = process.env.BUILD_ENV

module.exports = {
	resolve(...dir) {
		return path.resolve(__dirname, ...dir)
	},
	getEntries() {
		const dir = path.resolve(__dirname, '../src/page')
		const files = fs.readdirSync(dir)

		const entry = Object.create(null)
		files.forEach(file => {
			const filePath = dir + '/' + file
			if (!fs.statSync(filePath).isDirectory()) {
				return
			}

			entry[file] = filePath + '/index.js'
		})

		return entry
	},
	getTemplate(key) {
		const pageJs =
			buildEnv === 'dev'
				? 'js/page.js'
				: key === 'index'
				? './_static/js/page.js'
				: '../_static/js/page.js'

		const favicon =
			buildEnv === 'dev'
				? 'image/favicon.ico'
				: key === 'index'
				? './_static/image/favicon.ico'
				: '../_static/image/favicon.ico'

		return `
			<!DOCTYPE html>
			<html lang="zh-CN">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${pkg.name}</title>
				<script src="${pageJs}"></script>
				<link rel="shortcut icon" href="${favicon}" type="image/x-icon">
			</head>

			<body></body>

			<script>
			console.info('********************************************');
			console.info('${pkg.name}');
			console.info('Build Env: ${buildEnv}');
			console.info('Build Date: ${dateFormat('yyyy-MM-dd hh:mm:ss', new Date())}');
			console.info('********************************************')
			</script>
			</html>
		`
	}
}
