import { app, dialog } from "electron";





export function onClose(){
  app.quit();
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