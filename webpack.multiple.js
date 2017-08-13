const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        p1: "./src/page1.js",
        p2: "./src/page2.js",
        p3: "./src/page3.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].entry.chunk.js"
    },
    module: {
        rules: [{
            test: /(\.scss|\.css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        outputStyle: 'compressed'
                    }
                }]
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
        new webpack.optimize.CommonsChunkPlugin("commons")
    ]
};