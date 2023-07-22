import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { UpdateCategoryByIdRequestDto, UpdateCategoryByIdUseCase } from "../categoryContainer";
import { IFileService } from "shared/fileHandler/IFileService";
import { CategoryFile } from "domain/ledger/categoryFile";
import { CategoryFileDto } from "application/modules/ledger/dtos/CategoryFileDto";
import { GuardBoolean } from "domain/shared/logic/GuardBoolean";
import { CategoryMap } from "application/modules/ledger/dtos/CategoryDto";











export class UpdateCategoryByIdController extends BaseIpcController{

  constructor(
    private useCase: UpdateCategoryByIdUseCase,
    private fileAdapter : IFileService<CategoryFile>
  ){
    super();
  }

  async executeImpl(request: any): Promise<any> {
    try {
      let categoryFileDto : undefined | CategoryFileDto = undefined;

      if(GuardBoolean.has("iconId", request))
        categoryFileDto = await this.fileAdapter.save<CategoryFileDto>(request.iconId);
      
      const dto: UpdateCategoryByIdRequestDto = {
        categoryId: request.categoryId,
        description: request.description,
        iconId: request.iconId,
        name: request.name
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