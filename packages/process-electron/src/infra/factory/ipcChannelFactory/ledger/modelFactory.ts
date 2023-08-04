import { DatabaseSMM } from "infra/database";
import { CategoryModel } from "infra/model/ledger/categoryModel";
import { LedgerModel } from "infra/model/ledger/ledgerModel";
import { BaseFileProvider } from "infra/provider/fileProvider/BaseFileProvider";
import { CategoryFileProvider } from "infra/provider/ledger/CategoryFileProvider";




export function modelFactory(database: DatabaseSMM){
  const categoryFileProvider = new CategoryFileProvider(
    new BaseFileProvider("category/icon")
  );
  
  const categoryModel = new CategoryModel(
    database,
    categoryFileProvider
  )

  const ledgerModel = new LedgerModel(
    database,
    categoryModel
  )

  

}
