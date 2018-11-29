/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const common = require("./webpack.common");

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin();

const definePlugin = new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(false)
});

const CONTENT_BASE = path.join(__dirname, "../");

const plugins = [definePlugin];
if (true) {
  plugins.push(bundleAnalyzerPlugin);
}

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    inline: true,
    port: 8080,
    contentBase: CONTENT_BASE,
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
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
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: plugins
});
