const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var environment = process.env.NODE_ENV || 'development';
console.log('Build in : ' + environment);

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['jquery', 'lodash', 'bootstrap']
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'app.bundle.js',
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.(woff|woff2|eot|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 30000,
                    name: "[name].[ext]",
                    outputPath: '../fonts/'
                }
            }]
        }, {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: "[name].[ext]",
                    outputPath: '../images/'
                }
            }, {
                loader: 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
                options: {
                    mozjpeg: {
                        progressive: true,
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    optipng: {
                        optimizationLevel: 4,
                    },
                    pngquant: {
                        quality: '75-90',
                        speed: 3,
                    },
                }
            }]
        }, {
            test: /(\.scss|\.css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader', // inject CSS to page, creates style nodes from JS strings
                use: [{
                    loader: 'css-loader', options: { // translates CSS into CommonJS modules
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader', options: { // Run post css actions
                        sourceMap: true, // 'inline'
                        plugins: [ // post css plugins, can be exported to postcss.config.js
                            require('precss')(),
                            require('autoprefixer')(),
                        ]
                    }
                }, {
                    loader: 'sass-loader', options: { // compiles SASS to CSS
                        outputStyle: 'expanded', // nested, expanded, compact, compressed
                        sourceMap: true
                    }
                }]
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            {from: 'src/json/', to: '../json/'},
            {from: 'src/images/', to: '../images/'},
        ]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            optipng: {
                optimizationLevel: 7,
            },
            pngquant: {
                quality: '65-90',
                speed: 4,
            },
            gifsicle: {
                optimizationLevel: 3,
            },
            svgo: {
                plugins: [{
                    removeViewBox: false,
                    removeEmptyAttrs: true,
                }],
            },
            jpegtran: {
                progressive: true,
            },
            plugins: [
                imageminMozjpeg({
                    quality: 65,
                    progressive: true,
                }),
            ],
        }),
        new ExtractTextPlugin({
            filename: "../css/app.css"
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 15
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",  // (the commons chunk name
            filename: "vendor.bundle.js", // (the filename of the commons chunk)
            minChunks: Infinity, // (with more entries, this ensures that no other module goes into the vendor chunk)
            // minChunks: 3, // (Modules must be shared between 3 entries)
            // chunks: ["pageA", "pageB"], // (Only use these entries)
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'lodash'
        })
    ]
};