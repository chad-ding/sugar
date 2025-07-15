export default {
	// 防抖
	debounce(fn, debTime = 300) {
		let timer = null
		return function (...args) {
			const _this = this

			if (timer) clearTimeout(timer)
			timer = setTimeout(function () {
				fn.apply(_this, args)
				timer = null
			}, debTime)
		}
	},
	// 限流
	throttle(fn, debTime = 300) {
		let timer = null
		return function (...args) {
			const _this = this
			if (timer) {
				return
			}
			timer = setTimeout(() => {
				fn.apply(_this, args)
				timer = null
			}, debTime)
		}
	},
	// 格式化日期时间
	formatDateTime(timeStamp, pattern = 'yyyy-mm-dd HH:MM:SS') {
		const TOKEN = /d{1,2}|m{1,2}|yy(?:yy)?|([HMS])\1?|[L]|"[^"]*"|'[^']*'/g

		const date = new Date(timeStamp)
		if (!(date instanceof Date)) throw TypeError('无效的日期')

		const d = date.getDate()
		const m = date.getMonth()
		const y = date.getFullYear()
		const H = date.getHours()
		const M = date.getMinutes()
		const S = date.getSeconds()
		const L = date.getMilliseconds()

		const formatPadStart = (num, len = 2, pad = '0') => {
			const str = num.toString()
			return str.padStart(len, pad)
		}

		const flags = {
			d,
			dd: formatPadStart(d),
			m: m + 1,
			mm: formatPadStart(m + 1),
			yy: String(y).slice(2), // 1987 取 87
			yyyy: y,
			H,
			HH: formatPadStart(H),
			M,
			MM: formatPadStart(M),
			S,
			SS: formatPadStart(S),
			L: formatPadStart(L, 3)
		}

		return pattern.replace(TOKEN, function (match) {
			if (match in flags) {
				return flags[match]
			}
			return match.slice(1, match.length - 1)
		})
	},
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
