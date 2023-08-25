import { app, dialog, BrowserWindow } from "electron";




export function onClose(){
  app.quit();
}

export function maximize(){
  const win = BrowserWindow.getFocusedWindow();
  if(win === null) return;
  win.maximize();
}

export function minimize(){
  const win = BrowserWindow.getFocusedWindow();
  if(win === null) return;
  win.minimize();
}

export function unmaximize(){
  const win = BrowserWindow.getFocusedWindow();
  if(win === null) return;
  if(!win.isMaximized) return;
  win.unmaximize();
}

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