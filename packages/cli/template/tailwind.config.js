module.exports = {
	content: ['./src/**/*.{html,js}'],
	darkMode: ['variant', '.dark &'], // 深色模式
	corePlugins: {
		preflight: false,
		backdropOpacity: false,
		backgroundOpacity: false,
		borderOpacity: false,
		divideOpacity: false,
		ringOpacity: false,
		textOpacity: false
	},
	theme: {
		colors: {
			white: '#ffffff',
			black: '#000000',
			primary: {
				DEFAULT: 'rgb(64, 158, 255)'
			}
		},
		spacing: {
			0: 0
		},
		fontSize: {
			0: 0
		}
	}
}
