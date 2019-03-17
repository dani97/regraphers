var webpack = require('webpack');
var path = require('path');

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
                use: "css-loader"
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
    }

}