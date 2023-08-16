import { ICategoryRepository } from "application/modules/ledger/providerContracts/ICategory.repository";
import { ILedgerRepository } from "application/modules/ledger/providerContracts/ILedger.repository";
import { ICategoryFileRepository } from "application/modules/ledger/providerContracts/iCategoryFile.repository";
import { CreateCategoryController, DeleteCategoryByIdController, FindCategoryByIdController, UpdateCategoryByIdController } from "./category";
import { CreateCategoryUseCase, DeleteCategoryByIdUseCase, FindCategoryByIdUseCase, UpdateCategoryByIdUseCase } from "./category/categoryContainer";
import { CreateLedgerController } from "./ledger/controller/createLedgerController";
import { CreateLedgerUseCase, DeleteLedgerByIdUseCase, FindLedgerByIdUseCase, UpdateLedgerByIdUseCase } from "./ledger/ledgerContainer";
import { DeleteLedgerByIdController } from "./ledger/controller/deleteLedgerByIdController";
import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { FindLedgerByIdController } from "./ledger/controller/findLedgerByIdController";
import { UpdateLedgerByIdController } from "./ledger/controller/updateLedgerByIdController";
import { IFileService } from "shared/fileHandler/IFileService";
import { ICategoryFileInterceptor } from "./category/interceptor/categoryFileInterceptor";









export function ledgerControllerIpcFactory(
  repository: {
    categoryRepository      : ICategoryRepository,
    ledgerRepository        : ILedgerRepository,
    categoryFileRepository  : ICategoryFileRepository,
  },
  Interceptor : {
    categoryFileInterceptor         : ICategoryFileInterceptor
  }
): BaseIpcController[]{
  return[
    new CreateCategoryController(
      Interceptor.categoryFileInterceptor, 
      new CreateCategoryUseCase(
        repository.categoryRepository,
        repository.categoryFileRepository
      )
    ),
    new DeleteCategoryByIdController(
      new DeleteCategoryByIdUseCase(
        repository.categoryRepository,
        repository.categoryFileRepository
      )
    ),
    new FindCategoryByIdController(
      new FindCategoryByIdUseCase(
        repository.categoryRepository
      )
    ),
    new UpdateCategoryByIdController(
      Interceptor.categoryFileInterceptor,
      new UpdateCategoryByIdUseCase(
        repository.categoryFileRepository,
        repository.categoryRepository
      )
    ),
    new CreateLedgerController(
      new CreateLedgerUseCase(
        repository.ledgerRepository,
        repository.categoryRepository
      )
    ),
    new DeleteLedgerByIdController(
      new DeleteLedgerByIdUseCase(
        repository.ledgerRepository
      )
    ),
    new FindLedgerByIdController(
      new FindLedgerByIdUseCase(
        repository.ledgerRepository
      )
    ),
    new UpdateLedgerByIdController(
      new UpdateLedgerByIdUseCase(
        repository.ledgerRepository,
        repository.categoryRepository
      )
    )
  ]
}