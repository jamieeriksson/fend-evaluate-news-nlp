const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/client/main.js",
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
  ],
};
