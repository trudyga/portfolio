/* eslint-disable */
const webpack = require('webpack');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

const common = require('./webpack.common');
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin();
const compressionPlugin = new CompressionPlugin();

const definePlugin = new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  'process.env.NODE_ENV': '"production"'
});

module.exports = merge(common, {
  mode: 'production',
  devtool: '@cheap-module-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }],
  },
  plugins: [definePlugin, compressionPlugin, bundleAnalyzerPlugin],
  optimization: {
    minimize: true,
    sideEffects: true,
  }
});
