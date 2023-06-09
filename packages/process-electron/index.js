const { app, BrowserWindow } = require('electron')
const {portDev} = require("@simple-money-manager/desktop-view");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    // width: 800,
    // height: 600
    frame: false
  })
  win.maximize();
  win.removeMenu();

  win.loadURL(`http://localhost:${portDev}/`);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

