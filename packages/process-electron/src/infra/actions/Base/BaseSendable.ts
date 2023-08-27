import { app, BrowserWindow, ipcMain } from "electron";


let win : BrowserWindow = null;




export class Sendable<T extends (...args:any) => any>{

  readonly handler : T;
  readonly name : string;

  constructor(name,handler: T){
    if(win === null)
      win = BrowserWindow.getFocusedWindow();

    this.handler = handler;
    this.name = name;
  }

  public register(){
    ipcMain.on(`SEND:${this.name}}`, this.handler)
  }
}