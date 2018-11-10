/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin();

const definePlugin = new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(false),
});

const CONTENT_BASE = path.join(__dirname, '../');

const plugins = [definePlugin];
if (true) {
  plugins.push(bundleAnalyzerPlugin);
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    port: 8080,
    contentBase: CONTENT_BASE,
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader'],
    }],
  },
  plugins: plugins,
});
