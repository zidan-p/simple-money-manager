const path = require("path")




module.exports = {
  portDev: 3005,
  outPath: path.resolve(__dirname,"dist"),
  entry: path.resolve(__dirname, "src", "index.ts")
}