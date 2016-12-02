module.exports = {
    loaders: [
        {
            test: /\.es6\.js$/,
            loader: "babel-loader",
            query: {
                presets: ['es2015']
            }
        }
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ],
        rules: [
            {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]
    },
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: './dist'
    }
}