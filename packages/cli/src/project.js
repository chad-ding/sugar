const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const logo = require('./logo')

const writeFile = async (file, content) => {
	const exists = await fs.pathExists(file)

	exists ? fs.writeFileSync(file, content) : fs.appendFileSync(file, content)
}

// 输入参数
let promptConfig
// 目标文件父地址
const targetParentDir = process.cwd()
// 目标文件地址
let targetDir = ''

const ceateQuestions = [
	{
		type: 'input',
		name: 'name',
		message: 'package name:',
		filter: projectName =>
			projectName
				.trim()
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/^[._]/, '')
				.replace(/[^a-z0-9-~]+/g, '-'),
		validate: projectName => {
			const isValid = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
				projectName
			)
			if (!isValid) {
				return '项目名无效'
			}
			return true
		}
	},
	{
		type: 'input',
		name: 'description',
		message: 'package description:',
		filter: description => description.trim(),
		validate: description => {
			if (!description && !description.length) {
				return '项目描述不能为空'
			}
			return true
		}
	},
	{
		type: 'input',
		name: 'author',
		message: 'author'
	}
]

async function cloneTemplate(promptConfig) {
	const templateDir = path.join(__dirname, '../template')
	const ignoreFiles = ['node_modules', 'dist', 'package-lock.json']

	return new Promise((resolve, reject) => {
		fs.readdir(templateDir, (error, files) => {
			if (error) {
				console.log(chalk.red('读取目录文件失败'))
				reject(error)

				return
			}

			// 复制模板文件
			files.forEach(file => {
				if (ignoreFiles.includes(file)) {
					return
				}

				fs.cpSync(
					templateDir + '/' + file,
					targetDir + '/' + file,
					{ recursive: true },
					err => {
						if (err) {
							console.log(chalk.red('复制模板文件失败: ', err))
							reject(err)
						}
					}
				)
			})

			// 修改readme文件中的项目名称
			const readmeFile = path.join(targetDir, 'README.md')
			let readme = fs.readFileSync(readmeFile, 'utf8')
			readme = readme.replace('# sketch', `# ${promptConfig.name}`)
			writeFile(readmeFile, readme)

			// 修改package.json中的项目名称
			const pkgFile = path.join(targetDir, 'package.json')
			const pkg = require(pkgFile)
			pkg.name = promptConfig.name
			pkg.description = promptConfig.description
			pkg.author = promptConfig.author || ''

			writeFile(pkgFile, JSON.stringify(pkg, null, 4))

			resolve(true)
		})
	})
}

async function createProject() {
	const commonRes = await inquirer.prompt(ceateQuestions)

	targetDir = path.join(targetParentDir, commonRes.name)
	const exists = await fs.pathExists(targetDir)
	if (exists) {
		console.log(chalk.red(`项目 "${targetDir}" 已存在!!!`))
		return
	}

	try {
		promptConfig = { ...commonRes }
		await cloneTemplate(promptConfig)

		console.log(chalk.green('\r\n创建项目成功'))
		console.log(chalk.green(logo))
	} catch (e) {
		console.log(chalk.red('创建项目失败: ', e.message))
	}
}

module.exports = createProject
