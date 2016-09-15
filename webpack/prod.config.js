const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: [
    'babel-polyfill',
    'bootstrap-loader',
    './src/index',
  ],

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    webpackIsomorphicToolsPlugin,
  ],
};
