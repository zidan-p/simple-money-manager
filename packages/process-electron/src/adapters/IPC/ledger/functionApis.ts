import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { CreateCategoryController, CreateCategoryControllerDto } from "./category/controller/createCategoryController";
import { DeleteCategoryByIdController, DeleteCategoryByIdControllerDto } from "./category/controller/deleteCategoryByIdController";
import { FindCategoryByIdController, UpdateCategoryByIdController } from "./category";
import { CreateLedgerController } from "./ledger/controller/createLedgerController";
import { DeleteLedgerByIdController } from "./ledger/controller/deleteLedgerByIdController";
import { FindLedgerByIdController } from "./ledger/controller/findLedgerByIdController";
import { UpdateLedgerByIdController } from "./ledger/controller/updateLedgerByIdController";
import { CREATE_CATEGORY, DELETE_CATEGORY_BY_ID, GET_CATEGORY_BY_ID, UPDATE_CATEGORY_BY_ID } from "./category/categoryChannelNames";
import { CREATE_LEDGER, DELETE_LEDGER_BY_ID, GET_LEDGER_BY_ID, UPDATE_LEDGER_BY_ID } from "./ledger/ledgerChannelNames";


// it should be here? 


type ExtractController<C extends BaseIpcController> = 
  (...param : Parameters<C["executeImpl"]>) => ReturnType<C["executeImpl"]>;

export type ledgerAPI = {

  // category
  createCategory      : ExtractController<CreateCategoryController>;
  deleteCategoryById  : ExtractController<DeleteCategoryByIdController>;
  findCategoryById    : ExtractController<FindCategoryByIdController>;
  updateCategoryById  : ExtractController<UpdateCategoryByIdController>;

  // ledger
  createLedger        : ExtractController<CreateLedgerController>;
  deleteLedgerById    : ExtractController<DeleteLedgerByIdController>;
  findLedgerById      : ExtractController<FindLedgerByIdController>;
  updateLedgerById    : ExtractController<UpdateLedgerByIdController>;
}

export const ledgerApiName = {
  createCategory      : CREATE_CATEGORY,
  deleteCategoryById  : DELETE_CATEGORY_BY_ID,
  findCategoryById    : GET_CATEGORY_BY_ID,
  updateCategoryById  : UPDATE_CATEGORY_BY_ID,

  createLedger        : CREATE_LEDGER,
  deleteLedgerById    : DELETE_LEDGER_BY_ID,
  findLedgerById      : GET_LEDGER_BY_ID,
  updateLedgerById    : UPDATE_LEDGER_BY_ID,
}