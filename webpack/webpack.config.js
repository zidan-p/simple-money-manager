const {merge} = require("webpack-merge")
const commonConfig = require("./webpack.common");

// ! info, use dotenvwebpack to accessing env variabel in bundle <---

module.exports = (envVars) => {
    const {env} = envVars;
    const envConfig = require(`./webpack.${env}.js`)
    const config = merge(commonConfig, envConfig);
    return config;
}