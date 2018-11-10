const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  module: {
    rules: [
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
            loader: 'file-loader?name=assets/images/[name].[ext]',
          },
        ],
      },
      {
        test: /\.svg$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'react-svg-loader',
          },
        ],
      },
      {
        test: /\.glsl$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [htmlPlugin],
};
