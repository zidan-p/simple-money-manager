import { BrowserWindow, app, ipcMain } from "electron";
import electron from "electron";
import { actions } from "infra/actions";



export class AppWindowWrapper{
  private mainWindow!:  BrowserWindow;

  public init() {

    // core action, I think better placed here
    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);
    process.on('warning', e => console.warn(e.stack));
    this.registerAction();
  }

  private onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onActivate() {
    if (!this.mainWindow) {
      this.createWindow();
    }
  }

  private registerAction(){
    actions.forEach(action => {
      ipcMain.on( action.name, action.handler)
    })
  }

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      title: `Yet another Electron Application`,
      webPreferences: {
        nodeIntegration: false
      }
    });

    // this.mainWindow.webContents.openDevTools();
    this.mainWindow.loadFile('./../index.html');
  }
}