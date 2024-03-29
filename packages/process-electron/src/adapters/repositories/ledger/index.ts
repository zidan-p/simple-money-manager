import { ICategoryModel } from "./category/ICategoryModel";
import { ILedgerModel } from "./ledger/ILedgerModel";
import { CategoryRepository } from "./category/categoryRepository";
import { LedgerRepository } from "./ledger/ledgerRepository";
import { CategoryFileRepository } from "./categoryFile/categoryFIleRepository";
import { IFileProvider } from "shared/fileHandler/IFileProvider";
import { CategoryFileDto } from "application/modules/ledger/dtos/CategoryFileDto";








export function ledgerRepositoryFactory(
  model : 
  {
    categoryModel         : ICategoryModel,
    ledgerModel           : ILedgerModel,
    categoryFileProvider  : IFileProvider<CategoryFileDto>
  }
){
  const categoryRepository      = new CategoryRepository(model.categoryModel);
  const ledgerRepository        = new LedgerRepository(model.ledgerModel);
  const categoryFileRepository  = new CategoryFileRepository(model.categoryFileProvider);

  return{
    categoryRepository,
    ledgerRepository,
    categoryFileRepository
  }
}