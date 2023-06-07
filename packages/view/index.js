const Webpack = require("webpack");
const {merge} = require("webpack-merge")
const WebpackDevServer = require('webpack-dev-server');
const path = require("path");
const devWebpack = require("./webpack/webpack.config")({env : "dev"});
const prodWebpack = require("./webpack/webpack.config")({env : "prod"});


const localOutDir = path.resolve("dist");

class ViewProcess{
    devConfig;
    prodConfig;
    apiDir

    /**
     * 
     * @param {string} apiDir a dorectory to attach api in view; default rest api
     */
    constructor(apiDir){
        this.devConfig = devWebpack;
        this.prodConfig = prodWebpack;
        this.apiDir = apiDir
    }

    /**
     * open bundle development with server
     * @param {object} objectParam object param
     * @param {number} objectParam.port port to server run
     * @param {boolean} objectParam.openInBrowser is bundle open in browser
     * 
     */
    runServerDev({port= 3005, openInBrowser = false} = {}){
        let compiler =  Webpack(merge(devWebpack, {plugins: [
            new Webpack.DefinePlugin({
                aDir : JSON.stringify(this.apiDir)
            })
        ]}));

        let devServerConfig = {...devWebpack.devServer, port: port, open: openInBrowser};
        const serverDev = new WebpackDevServer(compiler,devServerConfig);

        console.log("starting dev server");
        serverDev.start();
    }

    /**
     * 
     * @param {string} param an directory where the build will be placed 
     */
    runBuild({dir = ""}){
        if(dir === "")webpack(merge(prodConfig,{output:{path: localOutDir}}));
        else webpack(merge(prodConfig,{output:{path: dir}}))
    }
}

module.exports.ViewProcess = ViewProcess;