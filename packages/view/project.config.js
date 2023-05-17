// import path from "path"
const path = require("path");
const {LOCAL_PORT} = require("@simple-money-manager/desktop-api");

module.exports = {
    DIST_ASSET_DIRECTORY : path.resolve(__dirname, "dist"),
    PORT_DEV : LOCAL_PORT || 3001,
    IS_OPEN_IN_BROWSER : true,
}



