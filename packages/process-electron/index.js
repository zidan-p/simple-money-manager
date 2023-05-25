const { app, BrowserWindow } = require('electron')
const {LOCAL_PORT} = require("@simple-money-manager/desktop-api");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.removeMenu();

  win.loadURL(`http://localhost:${LOCAL_PORT}/`);
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

