// 数据请求host
const apiHost = {
	main: 'http://main.com.cn'
}

module.exports = {
	proxyTable: [
		{
			context: ['/api'],
			target: apiHost.main,
			secure: true,
			changeOrigin: true
		},
		{
			context: ['/mock'],
			target: 'http://localhost',
			secure: true,
			changeOrigin: true
		}
	],
	publicPath: '',
	apiHost
}
