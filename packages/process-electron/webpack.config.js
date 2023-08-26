const path = require("node:path");
const nodeExternals = require('webpack-node-externals');



/** 
 * @type {import("webpack").Configuration} 
 * */
const config = {
  mode : "development",
  devtool : "source-map",
  entry: {
    electron: {
      import: "./src/index.ts",
      filename: "electron-bundle.js"
    },
    preload: {
      import : "./src/infra/preload/preloadScript.ts",
      filename: "preload-script.js"
    }
  },
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
      "sequelize-typescript": "sequelize-typescript",
      "uuid": "uuid",
      "electron": "electron",

      // these two didn't work well.
      // i must fix it
      // see: https://webpack.js.org/configuration/externals/#externalstypevar
      "sequelize": 'require("sequelize")',
      "sqlite3": 'require("sqlite3")',
    }
  ], 
  externalsType: 'var',
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
    filename: '[name]-electron-bundle.js', // overrrided in entry
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}

module.exports = config