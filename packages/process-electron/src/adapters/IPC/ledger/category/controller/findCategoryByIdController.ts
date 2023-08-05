import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { FindCategoryByIdRequestDto, FindCategoryByIdUseCase } from "../categoryContainer";
import { GET_CATEGORY_BY_ID } from "../categoryChannelNames";
import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";








export class FindCategoryByIdController extends BaseIpcController{

  public readonly channelName = GET_CATEGORY_BY_ID;
  public readonly channelType = CHANNEL_TYPE.INVOKABLE;

  constructor(
    private useCase: FindCategoryByIdUseCase
  ){
    super()
  }

  async executeImpl(request: any): Promise<any> {
    try {
      const dto : FindCategoryByIdRequestDto = {
        categoryId: request.categoryId
      }

      const result = await this.useCase.execute(dto);

      if(result.isFailure)
        return this.fail(result.errorValue());
      
      return this.ok(result.getValue());
    } catch (error) {
      return this.fail(error);
    }
  }
  
}