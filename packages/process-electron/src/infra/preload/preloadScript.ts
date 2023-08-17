import { CREATE_CATEGORY, DELETE_CATEGORY_BY_ID, GET_CATEGORY_BY_ID, UPDATE_CATEGORY_BY_ID } from "adapters/IPC/ledger/category/categoryChannelNames";
import { ledgerAPI, ledgerApiName } from "adapters/IPC/ledger/functionApis";
import { CREATE_LEDGER, DELETE_LEDGER_BY_ID, GET_LEDGER_BY_ID, UPDATE_LEDGER_BY_ID } from "adapters/IPC/ledger/ledger/ledgerChannelNames";
import { contextBridge, ipcRenderer } from "electron";
import { ActionApi, actionsMeta } from "infra/actions";

// maybe next time bundle the renderer api to the controller?
// i mean these controller name must be all called here 
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
  close: () => ipcRenderer.send(actionsMeta.close.name),
  
  // I don't know why, but typescript doesn't infer the return type of callback function.
  // there are somethins that can handle that, but obviously that's is not me.
  openDialogImageSelector: () => ipcRenderer.invoke(actionsMeta.openDialogImageSelector.name) as Promise<string[]>
}

contextBridge.exposeInMainWorld("Electron", {
  ...ledgerChannel,
  ...actionChannel
})