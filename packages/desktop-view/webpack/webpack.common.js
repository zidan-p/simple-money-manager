const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const project = require("../index");
// const postCssConfig = require("../postcss.config");

console.log(project);

module.exports = {
    entry : project.entry,
    resolve : {
        extensions : [".tsx", ".ts", ".jsx", ".js"],

        // # Warning
        // this is only wild card, find for another good solution
        alias : {
            "@s-m-n/view" : path.join(project.parentModule.contentPath, "/src")
        }
    },
    module: {
        rules : [
            {
                test : /\.(ts|js)x?$/,
                exclude : "/node_modules/",
                //testing aja
                use : 
                {
                    loader : require.resolve("babel-loader"),
                    options : {
                        presets: [
                            require.resolve("@babel/preset-env"),
                            [require.resolve("@babel/preset-react"),{"runtime": "automatic"}],
                            require.resolve("@babel/preset-typescript")
                        ]
                    }
                }
            },
            {
                test : /\.css$/,
                use : [
                    require.resolve("style-loader"), 
                    require.resolve("css-loader"), 
                    {loader: require.resolve("postcss-loader")}
                ]
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
                    loader: require.resolve('@svgr/webpack'),
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
        path : project.outPath,
        filename : "bundle.js"
    },
    plugins : [
        new HtmlWebpackPlugin({
            template: project.entryHtml
        })
    ]
}
