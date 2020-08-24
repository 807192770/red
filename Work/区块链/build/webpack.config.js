const webpack = require("webpack");
const utils = require("../utils/utils.js");
let entries = utils.getEntry('./src/*/*.js');

console.log("__________________ start");
console.log("entries :", entries);
console.log("__________________ end");

const WebpackConfig = {
  entry: entries,
  lintOnSave:false,
  devtool: 'cheap-module-eval-source-map',
  // outputDir:
  //   {
  //     path: __dirname + "/dist",
  //     filename: "[name].bundle.js",
  //   },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
      },
    ],
    externals: {"AMap": "AMap"}
},
  devServer: {
    contentBase: "../dist",
    historyApiFallback: true,
    inline: true,
  },
};

module.exports = WebpackConfig;
