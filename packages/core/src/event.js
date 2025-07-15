export default class {
	__listeners__ = {}

	$emit(evtName, options) {
		if (!this.__listeners__.hasOwnProperty(evtName)) {
			return
		}

		this.__listeners__[evtName].forEach(callbacks => {
			callbacks(options)
		})
	}

	// 自定义事件
	$on(evtName, callback) {
		if (!this.__listeners__.hasOwnProperty(evtName)) {
			Object.defineProperty(this.__listeners__, evtName, {
				value: []
			})
		}

		this.__listeners__[evtName].push(callback)
	}

	$off(evtName, callback) {
		if (!this.__listeners__.hasOwnProperty(evtName)) {
			return
		}

		// 移除所有监听方法
		if (!callback) {
			this.__listeners__[evtName] = undefined
			return
		}

		const index = this.__listeners__[evtName].indexOf(callback)
		if (index !== -1) {
			this.__listeners__[evtName].splice(index, 1)
		}
	}
}
