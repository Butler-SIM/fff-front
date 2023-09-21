/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const { NODE_ENV, API_MODE } = process.env;
const isProd = NODE_ENV === 'production';

const LIVE_URL = 'https://andn.co.kr';
const DEV_URL = 'http://13.209.252.255';
const LOCAL_URL = 'http://127.0.0.1:8000';

const getApiUrl = () => {
  switch (process.env.API_MODE) {
    case 'local':
      return LOCAL_URL;
    case 'dev':
      return DEV_URL;
    case 'live':
      return LIVE_URL;
    default:
      return LIVE_URL;
  }
};

const API_URL = getApiUrl();

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'eval-cheap-source-map',
  entry: { javascript: './src/index.tsx' },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      process: 'process/browser',
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@customTypes': path.resolve(__dirname, 'src/customTypes'),
    },
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[fullhash].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: false, // The code generator has deoptimised the styling of "test.js" as it exceeds the max of 500kb ( 불필요한 공백 문자 및 줄 종결자를 포함x )
          },
        },
      },
      {
        test: /\.(ts)x?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.(jpg|jpeg|webp|png|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      process: 'process/browser',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html', '**/.DS_Store'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(API_URL),
      API_MODE: JSON.stringify(API_MODE),
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
  ],

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    allowedHosts: 'auto',
  },
};
