import VNode from '@sugar/core'
import template from './template.html'

import '@/asset/style/_reset.css'

class Page extends VNode {
	constructor() {
		super(template, document.body)
		this.boot()
	}

	boot() {
		console.info('初始化页面')
	}
}

new Page()
