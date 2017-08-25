
const path = require('path');

let dfPath = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    common: path.resolve(__dirname, '../src/common'),
    components: path.resolve(__dirname, '../src/components'),
    layout: path.resolve(__dirname, '../src/layout'),
    view: path.resolve(__dirname, '../src/view'),
    root: path.resolve(__dirname, '../'),
    semantic: path.resolve(__dirname, '../semantic'),
}

let dfConfig = {
    entry: [
        './src/app.js'
    ],

    output: {
        path: path.resolve(__dirname, '../dist/assets'),
        filename: '[name].js',
        publicPath: '/assets/'
    },

    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: ['url-loader?limit=8192'],
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/font-woff']
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/octet-stream']
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: ['file-loader']
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=image/svg+xml']
            }
        ]
    }
}

module.exports = {
    dfPath,
    dfConfig
};
