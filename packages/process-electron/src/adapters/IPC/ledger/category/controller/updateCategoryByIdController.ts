import { BaseIpcController, FailController, SuccessController } from "adapters/shared/base/BaseIpcController";
import { UpdateCategoryByIdRequestDto, UpdateCategoryByIdUseCase } from "../categoryContainer";
import { IFileService } from "shared/fileHandler/IFileService";
import { CategoryFile } from "domain/ledger/categoryFile";
import { CategoryFileDto } from "application/modules/ledger/dtos/CategoryFileDto";
import { GuardBoolean } from "domain/shared/logic/GuardBoolean";
import { CategoryDto, CategoryMap } from "application/modules/ledger/dtos/CategoryDto";
import { UPDATE_CATEGORY_BY_ID } from "../categoryChannelNames";
import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";
import { ICategoryFileInterceptor } from "../interceptor/categoryFileInterceptor";





export interface UpdateCategoryByIdControllerDto {
  categoryId : string;
  description: string;
  name: string;
  categoryIcon : string;
}


export class UpdateCategoryByIdController extends BaseIpcController{

  public readonly channelName = UPDATE_CATEGORY_BY_ID;
  public readonly channelType = CHANNEL_TYPE.INVOKABLE;

  constructor(
    private fileAdapter : ICategoryFileInterceptor,
    private useCase: UpdateCategoryByIdUseCase
  ){
    super();
  }

  async executeImpl(request: UpdateCategoryByIdControllerDto): Promise<SuccessController<CategoryDto> | FailController<CategoryDto> > {
    try {
      let categoryFileDto : null | undefined | CategoryFileDto = undefined;

      if(GuardBoolean.has("iconId", request))
        categoryFileDto = await this.fileAdapter.save(request.categoryIcon);
      
      const dto: UpdateCategoryByIdRequestDto = {
        categoryId: request.categoryId,
        description: request.description,
        iconId: GuardBoolean.has("id",categoryFileDto) ? categoryFileDto.id() : undefined,
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