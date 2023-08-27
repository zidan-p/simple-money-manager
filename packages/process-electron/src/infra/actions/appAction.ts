import { app, dialog, BrowserWindow } from "electron";
import { WATCH_IS_MAXIMIZE } from "./appActionNames";


let win : BrowserWindow = null;

function initBrowserWindow(){
  try {
    if(win === null)
      win = BrowserWindow.getFocusedWindow();
  } catch (error) {
    console.log(error);
  }
}

export function onClose(){
  app.quit();
}

export function maximize(){
  initBrowserWindow();
  win.maximize();
}

export function minimize(){
  initBrowserWindow();
  win.minimize();
}

export function unmaximize(){
  initBrowserWindow();
  if(!win.isMaximized) return;
  win.unmaximize();
}

// -------------------- event from main, -------------------

export type EventListenerHandlerElectron = 
  (callback: (...args:any[]) => any) => 
  (name: `ELECTRON:${any}`) => any

/**
 * 
 * @param callback it's just for typescript, in register actions it doesn't do meaningful just pass the empty function
 */
export function watchIsMaximize(callback: (...args:any[]) => any){
  initBrowserWindow();

  // register event
  return (name: `ELECTRON:${string}`) => {
    win.on("maximize", () => {
      win.webContents.send(
        name, 
        win.isMaximized() // the sent value
      );
    });
    win.on("unmaximize", () => {
      win.webContents.send(
        name, 
        win.isMaximized()
      );
    })
  }
}



// ------------------ invokable -----------------------

export function openFileDialog(filterFile: {name: string, extensions: string[]}){
  return (): string[] => {
    return dialog.showOpenDialogSync({
      properties: ['openFile', 'openDirectory'],
      filters: [{
        name: filterFile.name,
        extensions: filterFile.extensions
      }]
    })
  }
}