'use strict';

const webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
    index: './source/pages/main/main.js',
    },

    output: {
        path: __dirname + '/public',
        filename: '[name].js'
    },

    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({template: 'source/pages/main/main.pug', filename: '../index.html', chunks: ['index']})
    ],

    module: {

        loaders: 
        [
        {
            test: /\.pug$/,
            loader: 'pug-loader'
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