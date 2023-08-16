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
    try {
      console.log(" :: starting initialize channel");
      
      if(this.database === null || this.database === undefined)
        return;
      const models = ledgerModelFactory(this.database);
      const repositories = ledgerRepositoryFactory(models);
  
      // TODO : separate between repo and interceptor
      const categoryFileInterceptor = repositories.categoryFileRepository;
      const interceptor = {categoryFileInterceptor};
  
      const controller = ledgerControllerIpcFactory(repositories, interceptor);
      this.channels = controller;

      console.log(" :: finish initialize channel");
    } catch (error) {
      console.log(" :( channel initial error");
      console.error(error);
    }
  }

  registerChannel(){
    try {
      
      console.log(" :: start registering channel");

      this.channels.forEach((channel: BaseIpcController) => {
        if(channel.channelType === CHANNEL_TYPE.INVOKABLE){
          this.handleInvokable(channel)
        }
      })

      console.log(" :: finish registering channel");
    } catch (error) {
      console.log(" :( channel registering error");
      console.error(error);
    }
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