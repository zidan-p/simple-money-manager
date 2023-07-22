import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { DeleteCategoryByIdRequestDto } from "../categoryContainer";
import { DeleteLedgerByIdUseCase } from "application/modules/ledger/useCases/ledger/deleteLedger/deleteLedgerByIdUseCase";
import { DeleteCategoryByIdUseCase } from "application/modules/ledger/useCases/category/deleteCategory/deleteCategoryByIdUseCase";
import { CategoryMap } from "application/modules/ledger/dtos/CategoryDto";










export class DeleteCategoryByIdController extends BaseIpcController{

  constructor(
    private useCase: DeleteCategoryByIdUseCase
  ){
    super();
  }

  async executeImpl(req: any): Promise<any>{
    try {
      const dto : DeleteCategoryByIdRequestDto = {
        categoryId: req.categoryId
      }
      const result = await this.useCase.execute(dto);
      if(result.isFailure)
        return this.fail(result.errorValue());
      
      return this.ok(CategoryMap.toDTO(result.getValue()));
    } catch (error) {
      return this.fail(error);
    }
  }
}