const path = require("path");




module.exports = {
  portDev: 3005,
  outPath: path.resolve(__dirname,"dist"),
  entry: path.resolve(__dirname, "src", "index.tsx"),
  entryHtml: path.resolve(__dirname, "src", "index.html"),
  parentModule:{
    // contentPath: path.dirname(require.resolve("@simple-money-manager/view")) + "src/**/*.{html,js,jsx,tsx}"
    contentPath: path.dirname(require.resolve("@simple-money-manager/view"))
  }
}


const desktopViewServer = () => {};