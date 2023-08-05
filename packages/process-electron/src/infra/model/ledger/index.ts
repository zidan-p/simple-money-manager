import { DatabaseSMM } from "infra/database";
import { BaseFileProvider } from "infra/provider/fileProvider/BaseFileProvider";
import { CategoryFileProvider } from "infra/provider/ledger/CategoryFileProvider";
import { CategoryModel } from "./categoryModel";
import { LedgerModel } from "./ledgerModel";



export function ledgerModelFactory(database: DatabaseSMM){
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

  return {
    categoryFileProvider,
    categoryModel,
    ledgerModel
  }
}