const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// List cached module
const VENDOR_LIBS = [
    'react',
    'react-dom',
    'axios',
];

// Config webpack dev server
const devServer = {
    port: 4000,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    overlay: true,
    stats: 'minimal',
    inline: true,
    compress: true,
    contentBase: '/'
};

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: '/node_modules/'
            },
            {
                use: [
                    'style-loader',
                    'css-loader'
                ],
                test: /\.css$/
            },
            {
                loader: 'file-loader',
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/
            }
        ]
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     '$': 'jquery',
        //     'jQuery': 'jquery',
        //     'window.$': 'jquery',
        //     'window.jQuery': 'jquery'
        // }), 
        // ucomment this if use jquery
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ],
    devServer
}