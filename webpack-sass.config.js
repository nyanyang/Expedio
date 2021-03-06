const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var WebpackNotifierPlugin = require('webpack-notifier');


const folderPath = 'dist/src/css';

module.exports = {
    entry: './resources/scss/app.scss',
    output: {
        path: path.resolve(__dirname, folderPath),
        filename: 'sass.js',
        chunkFilename: '[name].js',

    },
    module: {
        rules: [

            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'font/'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options : {
                    }
                },
                'css-loader',
                'postcss-loader',
                'sass-loader'
                ]

            }
        ],
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js'
        }
    },

    plugins: [

        new MiniCssExtractPlugin({
            filename: 'main.css',
            chunkFilename: '[id].css'
        }),

        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, 'resources/assets'), to: path.resolve(__dirname, 'dist/src/assets') }
        ]),

        new WebpackNotifierPlugin({
            title: 'Expedio SASS - Built!',
            alwaysNotify: true
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true
                        }
                    }],
                },
            })
        ]
    }
};