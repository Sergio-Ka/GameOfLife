const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  entry: {
    index: './source/index.js',
    test: './source/test/test.js',
  },

  output: {
    path: `${__dirname}/public`,
    filename: '[name].js',
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({ template: 'source/index.pug', filename: 'index.html', chunks: ['index'] }),
    new HtmlWebpackPlugin({ template: 'source/test/test.pug', filename: 'test.html', chunks: ['test'] }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
  ],

  module: {

    loaders: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css-loader!stylus-loader'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader'),
      },
      {
        test: /\.(svg|ttf|otf|eot|woff)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.(ico|png)$/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
    ],
  },

  devServer: {
    host: 'localhost',
    port: '8080',
    contentBase: `${__dirname}/public`,
  },

};

if (NODE_ENV === 'production') {
  module.exports.plugins.push(new MinifyPlugin(/* minifyOpts, pluginOpts */));
}
