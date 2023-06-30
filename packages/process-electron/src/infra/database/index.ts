import { Sequelize, ModelStatic, Model } from "sequelize";
import * as path from "node:path";
import categoryInit from "./models/CategoryDB.model";
import ledgerInit from "./models/LedgerDB.model";


// # TODO:
// - automate it with fs
// - use correct ES5 syntax
const modelInit: ((s: Sequelize) => ModelStatic<any>)[] = [
  categoryInit, ledgerInit
];

/**
 * is it correct? i just curently learning about clean code. it is alright if i
 * use a single database as a base. maybe next time i will 
 */
export class DatabaseSMM {
  sequelize!: Sequelize;

  constructor() {
    this.inititalizeDatabase();
    this.initializeModel();
    this.syncDatabase();
  }

  async syncDatabase(){
    this.sequelize.sync({alter:true});
    console.log("database connected");
  }

  inititalizeDatabase() {
    console.log("starting db")
    // # change this to depends on config
    this.sequelize = new Sequelize({
      dialect: "sqlite",
      //NOTE: if you can, change this to more apropriate import resolving;
      // or maybe move it to config file for this database configfile
      storage: "./src/infra/database/storages/db/smm.sqlite"
    })
  }

  initializeModel(){
    for(const modelInitial of modelInit){
      modelInitial(this.sequelize);
    }
  }
}
