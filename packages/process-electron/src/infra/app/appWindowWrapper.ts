import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";
import { BrowserWindow, app, ipcMain } from "electron";
import { ActionProperties, actions } from "infra/actions";
import path from "node:path";



export class AppWindowWrapper{
  private mainWindow!:  BrowserWindow;

  public init() {

    // core action, I think better placed here
    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);
    this.registerAction();

    process.on('warning', e => console.warn(e.stack));
    process.on("uncaughtException", e => console.error(e));
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

      switch(action.channelType){
        case CHANNEL_TYPE.INVOKABLE:
          this.handleInvokable(action);
          break;
        case CHANNEL_TYPE.SENDABLE:
          this.handleSendable(action);
          break;
      }

    })
  }

  private handleInvokable<Thandler>(action: ActionProperties<Thandler>){
    ipcMain.handle("ELECTRON:" + action.name, (_event, ...arg)=>{
      return action.handler;
    })
  }

  private handleSendable<Thandler>(action: ActionProperties<Thandler>){
    ipcMain.on( action.name, action.handler as () => void)
  }

  private createWindow() {

    console.log(__dirname); // magic... (when it's called here, the app can read the dir) 

    this.mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      title: `Yet another Electron Application`,
      webPreferences: {
        nodeIntegration: false,
        // preload: path.resolve(__dirname,"/dist/infra/preload/preloadScript.js")

        // 📝 NOTE : use webpack
        // preload: path.resolve(__dirname,"/dist/preload-script.js")
        preload: path.resolve("dist/preload-script.js")
      }
    });

    // this.mainWindow.webContents.openDevTools();
    // this.mainWindow.loadFile('./../index.html');
    this.mainWindow.loadURL("http://localhost:3005")
  }
}