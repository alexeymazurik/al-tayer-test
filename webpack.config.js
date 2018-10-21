const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  context: path.resolve(__dirname, 'src'),
  devServer: {
    contentBase: path.resolve(__dirname, 'public/assets'),
    stats: 'errors-only',
    historyApiFallback: true,
    open: true,
    port: 8081,
    compress: true
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [{
      test: /\.(jpg|png|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './assets/'
          }
        }]
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
};