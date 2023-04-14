const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry : path.resolve(__dirname, "..", "./view/index.tsx"),
    resolve : {
        extensions : [".tsx", ".ts", ".jsx", ".js"]
    },
    module: {
        rules : [
            {
                test : /\.(ts|js)x?$/,
                exclude : "/mode_modules/",
                use : [
                    {loader : "babel-loader"}
                ]
            } 
        ]
    },
    output : {
        path : path.resolve(__dirname,"..","./build"),
        filename : "bundle.js"
    },
    devServer: {
        port : 3004
    },
    mode : "development",
    plugins : [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "./view/index.html")
        })
    ]
}
