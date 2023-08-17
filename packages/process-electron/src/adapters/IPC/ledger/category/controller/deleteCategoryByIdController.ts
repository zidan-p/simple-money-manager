import { BaseIpcController, FailController, SuccessController } from "adapters/shared/base/BaseIpcController";
import { DeleteCategoryByIdRequestDto } from "../categoryContainer";
import { DeleteLedgerByIdUseCase } from "application/modules/ledger/useCases/ledger/deleteLedger/deleteLedgerByIdUseCase";
import { DeleteCategoryByIdUseCase } from "application/modules/ledger/useCases/category/deleteCategory/deleteCategoryByIdUseCase";
import { CategoryDto, CategoryMap } from "application/modules/ledger/dtos/CategoryDto";
import { DELETE_CATEGORY_BY_ID } from "../categoryChannelNames";
import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";






export interface DeleteCategoryByIdControllerDto {
  categoryId: string;
}



export class DeleteCategoryByIdController extends BaseIpcController{

  public readonly channelName = DELETE_CATEGORY_BY_ID;
  public readonly channelType = CHANNEL_TYPE.INVOKABLE;

  constructor(
    private useCase: DeleteCategoryByIdUseCase
  ){
    super();
  }

  async executeImpl(req: DeleteCategoryByIdControllerDto): Promise<SuccessController<CategoryDto> | FailController<CategoryDto> >{
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