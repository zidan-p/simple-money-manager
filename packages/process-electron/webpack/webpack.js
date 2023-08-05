const path = require('path')
const setup = require("./../index");

module.exports = {
  // may be it's read from this file
  entry: { main: setup.entry },
  mode: "development",
  output: {
    path: setup.outPath,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
    preferRelative: true
  }
}