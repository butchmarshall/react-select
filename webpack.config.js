var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, '.');
var NPM_DIR = path.resolve(__dirname, './node_modules');

module.exports = {
	entry: [APP_DIR + '/src/index'],
	debug: true,
	devtool: "source-map",
	output: {
		library: ['PSLIB'],
		libraryTarget: 'umd',
		path: './dist',
		filename: 'source.js'
	},
	externals: {
		"react": {
			root: ["React"],
			commonjs2: "React",
			commonjs: "React",
			amd: "React",
		},
		"react-dom": {
			root: ["ReactDOM"],
			commonjs2: "ReactDOM",
			commonjs: "ReactDOM",
			amd: "ReactDOM",
		}
	},
	module : {
		rules: [
			{
			  test: /\.json$/,
			  use: 'json-loader'
			}
		],
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					"plugins": [
						"transform-class-properties",
						"transform-es3-member-expression-literals",
						"transform-es3-property-literals",
						"transform-runtime",
						"transform-decorators-legacy"
					],
					"presets": [
						"babel-preset-react",
						"babel-preset-es2015",
						"babel-preset-stage-0"
					]
				}
			}
		],
	},
	plugins: [
		
	]
};