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









export function ledgerControllerIpcFactory(
  repository: {
    categoryRepository      : ICategoryRepository,
    ledgerRepository        : ILedgerRepository,
    categoryFileRepository  : ICategoryFileRepository,
  }
): BaseIpcController[]{
  return[
    new CreateCategoryController(
      repository.categoryFileRepository, 
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
      repository.categoryFileRepository,
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