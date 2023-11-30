const path = require('path');

module.exports = {
  entry: "./lib/minesweeper.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  devServer: {
    publicPath: '/dist/'
  },
  devtool: "sourcemap"
};
