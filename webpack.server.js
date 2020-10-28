const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  mode: "production",
  entry: {
    app: path.resolve(__dirname, "server.js"),
  },
  output: {
    path: path.resolve(__dirname),
    filename: "server-production.js",
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.serverjs$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
        exclude: /node_module/,
        resolve: {
          extensions: [".js"],
        },
      },
    ],
  },
};
