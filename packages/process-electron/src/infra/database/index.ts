import { Sequelize, ModelStatic, Model } from "sequelize";


/**
 * is it correct? i just curently learning about clean code. it is alright if i 
 * store the Model to the database properties? 
 */
class DatabaseSMM {
    Category! : ModelStatic<Model>
    Ledger! : ModelStatic<Model>
    sequelize: any

    constructor(){

    }
}