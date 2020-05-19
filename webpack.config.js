const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js",
  },
};
