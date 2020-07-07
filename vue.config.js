module.exports = {
	transpileDependencies: ['vuetify'],
	productionSourceMap: false,
	devServer: {
		port: 3000,
		proxy: {
			'^/api': {
				target: 'http://localhost:3001',
				ws: true,
			},
			'^/uploads': {
				target: 'http://localhost:3001',
				ws: true,
			},
		},
	},
	lintOnSave: false,
};
