import { CreateCategoryController } from "adapters/IPC/ledger/category";
import { CreateCategoryUseCase } from "adapters/IPC/ledger/category/categoryContainer";





export default [
  new CreateCategoryController(
    "asd",
    new CreateCategoryUseCase()
  )
]


