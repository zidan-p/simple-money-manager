const { contextBridge } = require("electron/renderer")


console.log("membaca preload script")

contextBridge.exposeInMainWorld('versions', {
  close: () => console.log("seharusnya bisa untuk close"),
})