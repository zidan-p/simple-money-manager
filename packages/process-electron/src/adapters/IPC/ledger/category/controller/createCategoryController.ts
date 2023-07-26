import { CategoryFileDto } from "application/modules/ledger/dtos/CategoryFileDto";
import { CategoryFile } from "domain/ledger/categoryFile";
import { IFileService } from "shared/fileHandler/IFileService";
import { CreateCategoryRequestDTO, CreateCategoryUseCase } from "../categoryContainer";
import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { CategoryMap } from "application/modules/ledger/dtos/CategoryDto";
import { CREATE_CATEGORY } from "../categoryChannelNames";



export class CreateCategoryController extends BaseIpcController{

  public readonly channelName = CREATE_CATEGORY;

  constructor(
    private fileAdapter: IFileService<CategoryFile>,
    private UseCase: CreateCategoryUseCase
  ){
    super();
  }

  async executeImpl(req: any): Promise<any>{
    try {
      // mmm, why should i return the file dto? 🤔
      // when i using this, the file is already saved somewhere in this project dir.
      // so, with this file adapter, it just how to get the file meta data to process here
      const categoryFileDto: CategoryFileDto  = await this.fileAdapter.save<CategoryFileDto>(req.categoryIcon);
  
      const dto: CreateCategoryRequestDTO = {
        description: req.description,
        name: req.name,
        iconId: req.iconId
      }

      const result = await this.UseCase.execute(dto);

      if(result.isFailure)
        return this.fail(result.errorValue());
      
      return this.ok(CategoryMap.toDTO(result.getValue()));


    } catch (error) {
      return this.fail(error);
    }
  }
}