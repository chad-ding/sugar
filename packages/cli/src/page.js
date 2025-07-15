const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')

const createPage = async () => {
	console.log(chalk.green('创建页面'))

	const pkgFile = path.join(process.cwd(), 'package.json')
	const pageDir = path.join(process.cwd(), './src/page/')
	if (!fs.existsSync(pkgFile)) {
		console.log(chalk.red('请在工程目录下执行命令'))
		return
	}

	if (!fs.existsSync(pageDir)) {
		console.log(chalk.red('page目录不存在'))
		return
	}

	const res = await inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'page name:',
			filter: projectName =>
				projectName
					.trim()
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/^[.]/, '')
					.replace(/[^a-z0-9-~]+/g, '-'),
			validate: projectName => {
				const isValid = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(projectName)
				if (!isValid) {
					return 'page name无效'
				}
				return true
			}
		}
	])

	if (fs.existsSync(path.join(pageDir, res.name))) {
		console.log(chalk.red('页面已存在'))
		return
	}

	const pageTemplate = path.join(__dirname, '../template/src/page/index')
	fs.cp(pageTemplate, path.join(pageDir, res.name), { recursive: true }, err => {
		if (err) {
			console.log(chalk.red('复制页面模板失败'))
		}
	})
}

module.exports = createPage
