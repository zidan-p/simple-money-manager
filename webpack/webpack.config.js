const {merge} = require("webpack-merge")
const commonConfig = require("./webpack.common");

// ! info, use dotenvwebpack to accessing env variabel in bundle <---

module.exports = (envVars) => {
    const {env} = envVars;
    console.log(envVars);
    let config;
    if(env == "dev"){
        const envConfig = require(`./webpack.dev.js`)
        console.log(envConfig);
        config = merge(commonConfig, envConfig);
    }else if (env == "prod"){
        const envConfig = require(`./webpack.prod.js`)
        config = merge(commonConfig, envConfig);
    }
    return config;
}