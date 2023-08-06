const path = require('path')
const setup = require("./../index");
const nodeExternals = require('webpack-node-externals');

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
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              [
                "@babel/preset-typescript", 
                {allowDeclareFields: true}
              ],
            ],
          },
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
    alias: {
      adapters : path.resolve("src/adapters/"),
      application : path.resolve("src/application/"),
      domain : path.resolve("src/domain/"),
      infra : path.resolve("src/infra/"),
      shared : path.resolve("src/shared/"),
      utils : path.resolve("src/utils/")
    }
  },

  // make suru it doesn't bundle node_modules.
  // i want this app to only bundle the code
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [
    nodeExternals(), // in order to ignore all modules in node_modules folder
    ...["pg", "tedious", "pg-hstore"] // dunno, wild hack to fix `Can't resolve 'pg-hstore'`
  ]
}