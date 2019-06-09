const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    path.resolve('src/index.tsx'),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8030,
    compress: true
  },
  output: {
    filename: 'app-main.js',
    path: path.resolve(__dirname, 'dist'),
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
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin(),
    new BundleAnalyzerPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ],
  externals: {
    // global app config object
    config: JSON.stringify({
        apiMode:"mock", // mock
        apiUrl: 'http://localhost:9090',
        socketApiUrl: 'http://localhost:9090',
        socketApiMode: "mock", // mock
    })
  }
}