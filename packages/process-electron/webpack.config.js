const path = require("node:path");
const nodeExternals = require('webpack-node-externals');



/** 
 * @type {import("webpack").Configuration} 
 * */
const config = {
  mode : "development",
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [
    // in order to ignore all modules in node_modules folder
    nodeExternals(),

    // my hack. apparently nodeExternals doesn't work in my project.
    // so wheter i want or not, i must manually define all external dependecy
    {
      "sequelize": "sequelize",
      "sequelize-typescript": "sequelize-typescript",
      "uuid": "uuid",
      "electron": "electron",
      "sqlite3": "sqlite3",
    }
  ], 
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "adapters" : path.resolve(__dirname, "./src/adapters"),
      "application" : path.resolve(__dirname, "./src/application"),
      "domain" : path.resolve(__dirname, "./src/domain"),
      "infra" : path.resolve(__dirname, "./src/infra"),
      "shared" : path.resolve(__dirname, "./src/shared"),
      "utils" : path.resolve(__dirname, "./src/utils"),
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}

module.exports = config