const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [
    path.resolve('src/index.tsx'),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    filename: 'app-main.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist',
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  plugins: [
    new CompressionPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ],
  externals: {
    // global app config object
    config: JSON.stringify({
        apiMode:"nomock", // mock , nomock
        apiUrl: 'http://localhost:9090',
        socketApiUrl: 'http://localhost:9090',
        socketApiMode: "nomock", // mock
    })
  }
}