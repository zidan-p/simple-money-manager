const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {PORT_DEV} = require("./../project.config")

module.exports = {
    mode : "development",
    devtool : "cheap-module-source-map",
    devServer : {
        hot : true,
        open : true, // maybe for open in browser
        port : PORT_DEV
    },
    plugins : [
        new webpack.DefinePlugin({
            "process.env.name" : JSON.stringify("sedang malukan pengembangan")
        }),
        new ReactRefreshWebpackPlugin(),
    ]
}