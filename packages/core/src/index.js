import util from './util'
import Event from './event'
import Store from './store'

// 公共组件
window.$bus = window.$bus || new Event()
window.$store = window.$store || new Store()
window.$util = window.$util || util

export default class VNode extends Event {
	$ele = undefined
	$bus = window.$bus
	$store = window.$store
	$util = window.$util
	$query = util.query2Obj(location.search) // 链接中提取的参数

	constructor(html, root, options = {}) {
		super()

		// 如果是一个Dom就进行简单封装
		if (html instanceof Element) {
			this.$ele = html
			return this
		}

		this.$ele = this.parseDOM(html)
		this.$emit('created')

		if (root) {
			const { replace, append } = options
			this.mount(root, replace, append)
		}
	}

	// 获取子节点
	getRef(ref) {
		const dom = this.getChild(`[ref=${ref}]`)
		if (!dom) {
			return
		}

		return new VNode(dom)
	}

	getChild(selector) {
		return this.$ele.querySelector(selector)
	}

	parseDOM(html) {
		return new DOMParser().parseFromString(html, 'text/html').body.firstChild
	}

	text(text) {
		if (text === undefined) {
			return this.$ele.innerText
		}

		this.$ele.innerText = text
	}

	html(html) {
		if (html === undefined) {
			return this.$ele.innerHTML
		}

		this.$ele.innerHTML = html
	}

	// 将元素挂在到父节点
	mount(root, replace = false, append = false) {
		if (!this.$ele) {
			console.error('当前节点为空')
			return
		}

		if (typeof root === 'string') {
			root = document.querySelector(root)
		} else if (root instanceof VNode) {
			root = root.$ele
		}

		if (!(root instanceof HTMLElement)) {
			console.error('根节点不是一个HTML元素')
			return
		}

		// 是否直接替换父节点
		if (replace) {
			root.replaceWith(this.$ele)
		} else if (append) {
			root.appendChild(this.$ele)
		} else {
			root.replaceChildren(this.$ele)
		}

		this.$emit('mounted')
	}

	unmount() {
		if (!this.$ele.parentElement) {
			console.error('没有挂载父节点')
			return
		}

		this.$ele.parentElement.removeChild(this.$ele)
		this.$emit('unmounted')
	}

	addClass(classNames) {
		if (classNames instanceof Array) {
			classNames.forEach(className => {
				this.$ele.classList.add(className)
			})
		} else {
			this.$ele.classList.add(classNames)
		}
	}

	removeClass(classNames) {
		if (classNames instanceof Array) {
			classNames.forEach(className => {
				this.$ele.classList.remove(className)
			})
		} else {
			this.$ele.classList.remove(classNames)
		}
	}

	style(key, value) {
		if (value === undefined) {
			return this.$ele.style[key]
		}

		this.$ele.style[key] = value
	}

	show() {
		this.$ele.style.display = ''
	}

	hide() {
		this.$ele.style.display = 'none'
	}

	// 原生事件
	on(evtName, callback) {
		this.$ele.addEventListener(evtName, callback)
	}

	off(evtName, callback) {
		this.$ele.removeEventListener(evtName, callback)
	}

	destroy() {
		this.unmount()
		this.$ele = undefined

		this.$emit('destroyed')
	}
}
