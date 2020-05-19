const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/client/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "/build"),
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
    ],
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
      }),
    ],
  },
};
