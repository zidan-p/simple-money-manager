import { ICategoryRepository } from "application/modules/ledger/providerContracts/ICategory.repository";
import { ILedgerRepository } from "application/modules/ledger/providerContracts/ILedger.repository";
import { ICategoryFileRepository } from "application/modules/ledger/providerContracts/iCategoryFile.repository";
import { CreateCategoryController } from "./category";
import { CreateCategoryUseCase } from "./category/categoryContainer";









export function ledgerControllerIpcFactory(
  repository: {
    categoryRepository      : ICategoryRepository,
    ledgerRepository        : ILedgerRepository,
    categoryFileRepository  : ICategoryFileRepository,
  }
){
  return[
    new CreateCategoryController(repository.categoryFileRepository, new CreateCategoryUseCase())
  ]
}