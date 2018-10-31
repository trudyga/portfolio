const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const definePlugin = env =>
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(env.production),
  });

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin();

module.exports = env => ({
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
    publicPath: '/', // why, why ????
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  devServer: {
    inline: true,
    port: 8080,
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoaders: 1,
              localIndentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader?name=public/images/[name].[ext]',
          },
        ],
      },
      {
        test: /\.glsl$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [htmlPlugin, definePlugin(env), bundleAnalyzerPlugin],
});
