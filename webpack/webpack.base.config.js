const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html"
		}),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: 'file-loader'
			},
		],
	},
};