import { Sequelize, ModelStatic, Model } from "sequelize";
import * as path from "node:path";
import categoryInit from "./models/CategoryDB.model";
import ledgerInit from "./models/LedgerDB.model";
import sqlite3 from "sqlite3";
import { associateModel } from "./setup/associateModel";

// # TODO:
// - automate it with fs
// - use correct ES5 syntax
// - export from it import file from...., why i just redefine its Name, whyyy
const modelInit = {
  Category : categoryInit, 
  Ledger : ledgerInit
};


type Writeable<T> = { -readonly [P in keyof T]: T[P] };

type ModelCollectionType = { -readonly [ K in keyof typeof modelInit] : ReturnType<typeof modelInit[K]>}

/**
 * is it correct? i just curently learning about clean code. it is alright if i
 * use a single database as a base. maybe next time i will 
 */
export class DatabaseSMM {
  sequelize!: Sequelize;
  public models: ModelCollectionType = {} as ModelCollectionType

  constructor() {}

  async initDatabase(){
    try {
      console.log("starting db")
      await this.inititalizeDatabase();
      await this.initializeModel();
      await this.associateModelDatabase();
      await this.syncDatabase();
      console.log("database connected");
    } catch (error) {
      console.error(error);
    }
  }

  async syncDatabase(){
    try {
      await this.sequelize.sync({alter:true});
    } catch (error) {
      console.log("warnign in asycn database ------")
      console.log(error);
    }
  }

  async inititalizeDatabase() {

    // # change this to depends on config
    this.sequelize = new Sequelize({
      dialect: "sqlite",

      // i think it will make sqlite work
      dialectModule : sqlite3,

      //NOTE: if you can, change this to more apropriate import resolving;
      // or maybe move it to config file for this database configfile
      storage: "./src/infra/database/storages/db/smm.sqlite"
    })
  }

  async initializeModel(){

    // # TODO:
    // - use propper way to handle this 😤

    // # UPDATE
    // - typescript unable to handle for in loop to lookup the key type
    // - so i will use other way to loop instead  

    // for(const modelInitial in modelInit){
    //   this.models[modelInitial] = modelInit[modelInitial](this.sequelize);
    // }
    for(const [key, val] of Object.entries(modelInit)){
      // ugh, it's just....
      this.models[key as keyof typeof modelInit] = val(this.sequelize) as any;
    }
  }

  async associateModelDatabase(){
    associateModel(this);
  }
}
