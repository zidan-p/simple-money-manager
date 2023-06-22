import { BrowserWindow, app } from "electron";
import { AppChannelWrapper } from "./appChannelWrapper";
import config from "../config";


export class AppProcessWrapper{
  private mainWindow!: BrowserWindow;
  private channelWrapper: AppChannelWrapper;

  constructor(channelWrapper: AppChannelWrapper){
    this.channelWrapper = channelWrapper;
  }

  public init() {
    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);

    this.registerIpcChannels("");
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

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      title: `Yet another Electron Application`,
      webPreferences: {
        nodeIntegration: false
      }
    });

    this.mainWindow.webContents.openDevTools();
    this.mainWindow.loadFile('../../index.html');
  }

  private registerIpcChannels(ipcChannels: any) {
    
  }

}