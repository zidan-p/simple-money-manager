const {ViewProcess} = require("@simple-money-manager/view");
const path = require("path");



const view1 = new ViewProcess(path.resolve("dist"));

view1.runServerDev({});
