import { ledgerControllerIpcFactory } from "adapters/IPC/ledger";
import { ledgerRepositoryFactory } from "adapters/repositories/ledger";
import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { DatabaseSMM } from "infra/database";
import { ledgerModelFactory } from "infra/model/ledger";



export class AppChannelWrapper {
    
  private database: DatabaseSMM | undefined;
  private channels: BaseIpcController[] | [] = []

  constructor(){
    this.database = new DatabaseSMM();
    this.initChannel();
  }

  initChannel(){
    if(this.database === null || this.database === undefined)
      return;
    const models = ledgerModelFactory(this.database);
    const repositories = ledgerRepositoryFactory(models)
  }

}