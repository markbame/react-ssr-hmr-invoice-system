const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	name: 'client',
	devtool: 'eval',
	entry: [
    './client/index.js'
  ],
	devServer: {
		historyApiFallback: true,
	  inline: true,
	  port: 3000,
	  hot: true
	},
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
		publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
	plugins: [
		new HtmlWebpackPlugin({
			title:'Abenyu',
		  template: './server/index.html',
		  filename: 'index.html',
		  inject: 'body'
		})
	]
}
