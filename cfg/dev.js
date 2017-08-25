const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {dfPath, dfConfig } = require('./default.js');

let config = Object.assign(dfConfig, {

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({ //webpack帮我们根据需求使用情况自动引入功能
            $: 'jquery',
            jQuery: 'jquery',
            React: 'react',
            ReactDOM: 'react-dom',
            PT: 'prop-types'
        })
    ],

    resolve: {
        modules: [
            'node_modules',
            dfPath.src,
            dfPath.common,
            dfPath.components,
            dfPath.layout,
            dfPath.view,
            dfPath.root
        ]
    },
    devtool: 'cheap-module-eval-source-map'

});


config.module.rules.push(
    // {
    //     test: /\.js$/,
    //     use: ['eslint-loader'],
    //     enforce: 'pre',
    //     include:[
    //         dfPath.src
    //     ]
    // },
    {
        test: /\.js$/,
        use: ['babel-loader'],
        include:[
            dfPath.src,
            // dfPath.semantic
        ]
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    module: true,
                    localIdentName: '[local]--[hash:base64:6]'
                }
            },
            {
                loader: 'sass-loader'
            }
        ]
    }
);

module.exports = config;
