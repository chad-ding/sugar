import Event from './event'

const prefix = 'Store_'

export default class extends Event {
	$store = Object.create(null)

	$observe(key, callback) {
		this.$on(`${prefix}${key}`, callback)
	}

	$commit(key, data) {
		this.$store[key] = data

		this.$emit(`${prefix}${key}`, data)
	}
}
