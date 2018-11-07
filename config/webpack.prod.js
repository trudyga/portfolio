/* eslint-disable */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const definePlugin = new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
});

module.exports = merge(common, {
  mode: 'production',
  plugins: [definePlugin],
});
