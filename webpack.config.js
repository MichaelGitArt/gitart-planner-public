module.exports = {
	resolve: {
		alias: {
			'@': require('path').resolve(__dirname, 'src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							prependData: '@import "@/scss/variables.scss";',
						},
					},
				],
			},
		],
	},
};
