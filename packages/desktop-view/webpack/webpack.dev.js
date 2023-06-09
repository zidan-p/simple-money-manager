const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {portDev}  = require("./../index");

module.exports = {
    mode : "development",
    devtool : "cheap-module-source-map",
    devServer : {
        // hot : true,
        // open : IS_OPEN_IN_BROWSER, // maybe for open in browser
        port : portDev,
        watchFiles : ["./../src/**/*"]
    },
    plugins : [
        new webpack.DefinePlugin({
            "process.env.name" : JSON.stringify("sedang malukan pengembangan")
        }),
        new ReactRefreshWebpackPlugin(), 
        //store reacct states every code changes
    ]
}