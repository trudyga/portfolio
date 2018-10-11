const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const definePlugin = env =>
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(env.production),
  });

module.exports = env => ({
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
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
        test: /\.(png|jpg|gif)$/i,
        exclude: /node_modules/,
        include: path.join(__dirname, 'public'),
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
  plugins: [htmlPlugin, definePlugin(env)],
});
