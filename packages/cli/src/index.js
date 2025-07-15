#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')
const createProject = require('./project')
const createPage = require('./page')

// 定义当前版本
program.version(pkg.version)

// 定义使用方法
program.usage('<command>')

program
	.command('create')
	.description('创建项目')
	.alias('c')
	.action(() => {
		createProject()
	})

program
	.command('cp')
	.description('创建页面')
	.action(() => {
		createPage()
	})

program.parse(process.argv)

if (!program.args.length) {
	program.help()
}
