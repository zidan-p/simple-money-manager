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
  
  init(){
    this.initChannel();
    this.registerChannel();
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
    this.channels.forEach(channel => {
      if(channel.channelType === CHANNEL_TYPE.INVOKABLE){
        this.handleInvokable(channel)
      }
    })
  }

  handleInvokable(channel: BaseIpcController){
    ipcMain.handle("APP:" + channel.channelName, (event, ...arg)=>{
      return channel.executeImpl(arg);
    })
  }

}