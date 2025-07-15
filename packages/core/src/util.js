export default {
	getParams: (paramNames = [], url = location.href) => {
		if (!paramNames || !paramNames.length) {
			return
		}

		const res = []
		paramNames.forEach(item => {
			const matches = new RegExp(`[?&]${item}=([^&]+)`).exec(url)
			res.push(matches !== null ? matches[1] : undefined)
		})

		return res
	},
	query2Obj: query => {
		if (query === undefined || typeof query !== 'string') {
			return Object.create(null)
		}

		if (query.startsWith('?')) {
			query = query.slice(1)
		}

		const regExp = /([^=&]+)=([^&=]+)/g
		let res = regExp.exec(query)

		const params = Object.create(null)
		while (res !== null) {
			params[res[1]] = res[2]
			res = regExp.exec(query)
		}
		return params
	},
	obj2Query: obj => {
		if (!obj) {
			return ''
		}

		let result = ''
		for (const [key, value] of Object.entries(obj)) {
			result += `&${key}=${value}`
		}

		return result.slice(1)
	}
}
