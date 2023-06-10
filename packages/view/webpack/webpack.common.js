const path = require("path");

// # wildcard hack to maake sure an alias always highlighted
module.exports = {
    entry : project.entry,
    resolve : {
        extensions : [".tsx", ".ts", ".jsx", ".js"],
        alias : { 
            // "@simple-money-manager/view/*" : path.join(__dirname, "/src")
            "@s" : path.join(__dirname, "/src")
        }
    }
}
