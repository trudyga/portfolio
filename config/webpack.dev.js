/* eslint-disable */
const webpack = require('webpack');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin();

const definePlugin = new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(false),
});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    port: 8080,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [definePlugin, bundleAnalyzerPlugin],
});
