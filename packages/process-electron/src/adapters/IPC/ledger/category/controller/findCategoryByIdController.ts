import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { FindCategoryByIdRequestDto, FindCategoryByIdUseCase } from "../categoryContainer";








export class FindCategoryByIdController extends BaseIpcController{

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