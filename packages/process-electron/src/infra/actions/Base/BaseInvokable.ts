import { app, BrowserWindow, ipcMain } from "electron";


let win : BrowserWindow = null;




export class Invokeable<T extends (...args:any) => any>{

  readonly handler : T;
  readonly name : string; 
  constructor(name:string, handler: T){
    if(win === null)
      win = BrowserWindow.getFocusedWindow();

    this.handler = handler;
    this.name = name;
  }

  public register(){
    ipcMain.handle(`ELECTRON:${this.name}`, this.handler);
  }
}