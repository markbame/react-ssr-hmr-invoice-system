const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
      		{
							test: /\.js$/,
							loader: 'babel-loader',
							exclude: /node_modules/
					},
					{
              test: /\.less$/,
              loader: "style-loader!css-loader!less-loader"
          },
          {
              test: /\.scss/,
              loader: "style-loader!css-loader!sass-loader"
          },
					{
						test: /\.css$/, use: ExtractTextPlugin.extract({
							fallback: "style-loader",
							use: {
								loader: "css-loader",
								options: {
									sourceMap: true
								}
							},
							publicPath: "../"
						})
					},
    ]
  },
	plugins: [
		new HtmlWebpackPlugin({
			title:'Abenyu',
		  template: './server/index.html',
		  filename: 'index.html',
		  inject: 'body'
		}),
		new ExtractTextPlugin({
			filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
			disable: false,
			allChunks: true
		}),
	]
}
