var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var parentDir = path.join(__dirname, '../');

module.exports = {
	entry: [
		path.join(__dirname, '../index.js')
    ],
    module: {
		rules: [
            {
                test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
            },
            {
                test: /\.css$/, 
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                },
            }
		]
    },
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    },
    plugins: [
        // New plugin
        new HtmlWebpackPlugin({
          // injects bundle.js to our new index.html
          inject: true,
          // copys the content of the existing index.html to the new /build index.html
          template:  path.resolve('./index.html'),
        }),
    ]

}