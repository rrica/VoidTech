const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(baseConfig, {
	mode: 'production',
	plugins: [
		new CopyPlugin([
			{ 
				from: 'src/assets/Dave-talking.gif',
				to: 'assets/Dave-talking.gif'
			},
			{ 
				from: 'src/assets/Lisa-talking.gif',
				to: 'assets/Lisa-talking.gif'
			}	
		]),
	  ]
});