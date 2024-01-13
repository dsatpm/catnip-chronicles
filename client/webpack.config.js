const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


const wrkBox = require ('workbox-webpack-plugin');

const cssPlugin = require('mini-css-extract-plugin')

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/index.js',
      install: './src/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html'
      }),
      new WebpackPwaManifest({
        name: 'Catnip Chronicles',
        short_name: 'CAT',
        description: 'A fun cat-centric retro game',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        display: 'standalone',
        start_url: '/',
        publicPath: '/',

      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new cssPlugin({
        filename: './src/style.css'
      }),
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [cssPlugin.loader, 'css-loader'],
        },
      ],
    },
  };
};
