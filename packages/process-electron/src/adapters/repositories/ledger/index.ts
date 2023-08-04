import { IFileService } from "shared/fileHandler/IFileService";
import { ICategoryModel } from "./category/ICategoryModel";
import { ILedgerModel } from "./ledger/ILedgerModel";
import { CategoryFile } from "domain/ledger/categoryFile";
import { CategoryRepository } from "./category/categoryRepository";
import { LedgerRepository } from "./ledger/ledgerRepository";
import { CategoryFileRepository } from "./categoryFile/categoryFIleRepository";








export function ledgerRepositoryFactory(
  model : 
  {
    categoryModel : ICategoryModel,
    ledgerModel   : ILedgerModel,
    fileService   : IFileService<CategoryFile>
  }
){
  const categoryRepository      = new CategoryRepository(model.categoryModel);
  const ledgerRepository        = new LedgerRepository(model.ledgerModel);
  const categoryFileRepository  = new CategoryFileRepository(model.fileService);

  return{
    categoryRepository,
    ledgerRepository,
    categoryFileRepository
  }
}