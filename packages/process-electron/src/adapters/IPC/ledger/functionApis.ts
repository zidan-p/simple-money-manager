import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { CreateCategoryController, CreateCategoryControllerDto } from "./category/controller/createCategoryController";
import { DeleteCategoryByIdController, DeleteCategoryByIdControllerDto } from "./category/controller/deleteCategoryByIdController";
import { FindCategoryByIdController, UpdateCategoryByIdController } from "./category";
import { CreateLedgerController } from "./ledger/controller/createLedgerController";
import { DeleteLedgerByIdController } from "./ledger/controller/deleteLedgerByIdController";
import { FindLedgerByIdController } from "./ledger/controller/findLedgerByIdController";
import { UpdateLedgerByIdController } from "./ledger/controller/updateLedgerByIdController";


// it should be here? 


type ExtractController<C extends BaseIpcController> = 
  (param : Parameters<C["executeImpl"]>) => ReturnType<C["executeImpl"]>;

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