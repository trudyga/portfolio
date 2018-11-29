/* eslint-disable */
const webpack = require("webpack");
const merge = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common");
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin();
const compressionPlugin = new CompressionPlugin();

const definePlugin = new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  "process.env.NODE_ENV": '"production"'
});

const plugins = [definePlugin, compressionPlugin];
if (process.env.ANALYZE_BUNDLE) {
  plugins.push(bundleAnalyzerPlugin);
}

module.exports = merge(common, {
  mode: "production",
  devtool: "@cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              module: true,
              importLoaders: 1,
              localIndentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    definePlugin,
    compressionPlugin,
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  optimization: {
    minimize: true,
    sideEffects: true
  }
});
