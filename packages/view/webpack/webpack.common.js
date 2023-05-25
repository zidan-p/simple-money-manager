const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {DIST_ASSET_DIRECTORY} = require("./../project.config")

module.exports = {
    entry : path.resolve(__dirname, "..", "./src/index.tsx"),
    resolve : {
        extensions : [".tsx", ".ts", ".jsx", ".js"]
    },
    module: {
        rules : [
            {
                test : /\.(ts|js)x?$/,
                exclude : "/node_modules/",
                //testing aja
                use : [
                    {loader : "babel-loader"}
                ]
                // use : ["babel-loader"]
            },
            {
                test : /\.css$/,
                use : ["style-loader", "css-loader", "postcss-loader"]
            },
            //for file image
            {
                test : /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type : "asset/resource"
            },
            // svg to react component
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: [{
                    loader: '@svgr/webpack',
                    options: { 
                        icon: true
                    },
                }],
            },
            //for inline file (like svg ot web font)
            // {
            //     test : /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            //     type : "asset/inline"
            // },
        ]
    },
    output : {
        path : DIST_ASSET_DIRECTORY,
        filename : "bundle.js"
    },
    plugins : [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "./src/index.html")
        })
    ]
}
