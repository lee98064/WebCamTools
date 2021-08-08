const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports= {
    target: 'web',
    entry: ['@babel/polyfill', './src/index.js'],
    // mode: 'development',
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webcamtools.[hash].js',
        // libraryTarget: 'var',
        // library: 'WebCamTools'
    },
    // experiments:{
    //   topLevelAwait: true,
    // },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                }
              },
              {
                loader: 'postcss-loader'
              }
            ],
          },
          {
            test: /\.gif/,
            type: 'asset/resource'
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: { 
                presets: ['@babel/preset-env'],
              }
            }
          }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
          filename: 'index.[hash].css'
        }),
        new CleanWebpackPlugin(),
        // new CopyPlugin({
        //   patterns: [
        //     { from: "./static", to: "./static" },
        //   ],
        // }),
        new webpack.DefinePlugin({
          // Definitions...
          PRODUCTION: JSON.stringify(false),
        }),
        new CompressionPlugin()
    ],

    devtool: 'source-map'
    
}