import { ledgerControllerIpcFactory } from "adapters/IPC/ledger";
import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";
import { ledgerRepositoryFactory } from "adapters/repositories/ledger";
import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { ipcMain } from "electron";
import { DatabaseSMM } from "infra/database";
import { ledgerModelFactory } from "infra/model/ledger";



export class AppChannelWrapper {
    
  private database: DatabaseSMM | undefined;
  public channels: BaseIpcController[] | [] = []

  constructor(){
    this.database = new DatabaseSMM();
  }
  
  async init(){
    await this.database.initDatabase();
    this.initChannel();
    await this.registerChannel();
  }

  initChannel(){
    if(this.database === null || this.database === undefined)
      return;
    const models = ledgerModelFactory(this.database);
    const repositories = ledgerRepositoryFactory(models);
    const controller = ledgerControllerIpcFactory(repositories);
    this.channels = controller;
  }

  registerChannel(){
    this.channels.forEach((channel: BaseIpcController) => {
      if(channel.channelType === CHANNEL_TYPE.INVOKABLE){
        this.handleInvokable(channel)
      }
    })
  }

  handleInvokable(channel: BaseIpcController){
    try {
      ipcMain.handle("APP:" + channel.channelName, (_event, ...arg)=>{
        return channel.executeImpl(arg);
      })
    } catch (error) {
      console.error(error);
    }
  }

}