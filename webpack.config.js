'use strict';

const webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
    index: './source/pages/main/main.js',
    test: './source/test/test.js'
    },

    output: {
        path: __dirname + '/public',
        filename: '[name].js'
    },

    plugins: [
        new HtmlWebpackPlugin({template: 'source/pages/main/main.pug', filename: '../index.html', chunks: ['index']}),
        new HtmlWebpackPlugin({template: 'source/test/test.pug', filename: '../test.html', chunks: ['test']})
    ],

    module: {

        loaders: 
        [
        {
            test: /\.pug$/,
            loader: 'pug-loader'
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css-loader')
        },
        {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('css-loader!stylus-loader')
        },
        {
            test: /\.(svg|ttf|otf|eot|woff)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        },
        {
            test: /\.(ico|png)$/,
            loader: 'file-loader?name=images/[name].[ext]'
        }
        ]

    }
};