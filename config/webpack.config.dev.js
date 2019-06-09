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
    path.resolve('examples/simple/SimpleApp.tsx'),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, '../examples/simple'),
    historyApiFallback: true,
    hot: true,
    port: 6020,
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
    new ForkTsCheckerWebpackPlugin()
     // new CompressionPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  externals: {
    // global app config object
    config: JSON.stringify({
        apiMode:"nomock", // mock
        apiUrl: 'http://localhost:6065',
        socketApiUrl: 'http://localhost:6065',
        socketApiMode: "nomock", // mock
    })
  }
}