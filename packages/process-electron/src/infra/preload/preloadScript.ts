import { CREATE_CATEGORY, DELETE_CATEGORY_BY_ID, GET_CATEGORY_BY_ID, UPDATE_CATEGORY_BY_ID } from "adapters/IPC/ledger/category/categoryChannelNames";
import { ledgerAPI, ledgerApiName } from "adapters/IPC/ledger/functionApis";
import { CREATE_LEDGER, DELETE_LEDGER_BY_ID, GET_LEDGER_BY_ID, UPDATE_LEDGER_BY_ID } from "adapters/IPC/ledger/ledger/ledgerChannelNames";
import { contextBridge, ipcRenderer } from "electron";
import { ActionApi, actionsMeta } from "infra/actions";

const style = 
`
  color: blue;
  font-weight: bold;
`
console.log("%creading preload script.....", style);

// maybe next time put the renderer api to the controller?
// i mean these controller name must be all called here, it's redundant
const ledgerChannel: ledgerAPI = {
  createCategory      : (...param) => ipcRenderer.invoke("APP:" + CREATE_CATEGORY, param),
  findCategoryById    : (...param) => ipcRenderer.invoke("APP:" + GET_CATEGORY_BY_ID, param),
  deleteCategoryById  : (...param) => ipcRenderer.invoke("APP:" + DELETE_CATEGORY_BY_ID, param),
  updateCategoryById  : (...param) => ipcRenderer.invoke("APP:" + UPDATE_CATEGORY_BY_ID, param),
  createLedger        : (...param) => ipcRenderer.invoke("APP:" + CREATE_LEDGER, param),
  deleteLedgerById    : (...param) => ipcRenderer.invoke("APP:" + DELETE_LEDGER_BY_ID, param),
  findLedgerById      : (...param) => ipcRenderer.invoke("APP:" + GET_LEDGER_BY_ID, param),
  updateLedgerById    : (...param) => ipcRenderer.invoke("APP:" + UPDATE_LEDGER_BY_ID, param)
}


const actionChannel: ActionApi = {

  // all invokeable event must be prefixed witj "ELECTRON:"
  openDialogImageSelector: () => ipcRenderer.invoke("ELECTRON:" + actionsMeta.openDialogImageSelector.name),

  // all retievable event emiter should prefixed with "RENDERER" 
  watchIsMaximize: (callback: (...arg: any) => any) => {
    ipcRenderer.on("RENDERER"+actionsMeta.watchIsMaximize.name, callback)
  },

  close: () => ipcRenderer.send(actionsMeta.close.name),
  maximaze: () => ipcRenderer.send(actionsMeta.maximaze.name),
  minimize: () => ipcRenderer.send(actionsMeta.minimize.name),
  unmaximize: () => ipcRenderer.send(actionsMeta.unmaximize.name),
}

const rootHandler = {
  ...ledgerChannel,
  ...actionChannel
}

contextBridge.exposeInMainWorld("Electron", {
  ...rootHandler
})

export {rootHandler};

console.log("%cfinish read preload script....", style);