import { app, BrowserWindow, ipcMain } from "electron";


let win : BrowserWindow = null;



export type RetrievableType = (callback: (...args: any) => any, win: BrowserWindow) => any;

export class Retrievable<T extends RetrievableType>{

  readonly callback : T;
  readonly name : string; 
  constructor(name:string, callback: T){
    if(win === null)
      win = BrowserWindow.getFocusedWindow();

    this.callback = callback;
    this.name = name;
  }

  public register(){
    this.callback(value => {
      win.webContents.send(`RENDERER:${this.name}}`, value)
    }, win);
    // this.callback((value) => {
    //   win.webContents.send(`RENDERER:${this.name}}`, value)
    // })
  }
}