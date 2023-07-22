import { BaseUseCase } from "application/shared/utils/baseIUseCase";
import { Category } from "domain/ledger/category";
import { FileBase } from "shared/fileHandler/FileBase";
import { Result } from "domain/shared/logic/Result";
import { ICategoryRepository } from "application/modules/ledger/providerContracts/ICategory.repository";
import { ICategoryFileRepository } from "application/modules/ledger/providerContracts/iCategoryFile.repository";
import { CategoryFile } from "domain/ledger/categoryFile";









export interface CreateCategoryRequestDTO {
  name: string;
  description: string;
  iconId: string; // this will be file id if not file name
  // the file handling will be handle by middleware.
  // NOTE: here i am manually create the middleware for electron

  // there are no ledgers, it must be create so it can be paired with category;
  // ledgers? : WatchedList<Ledger>;
}

export class CreateCategoryUseCase implements BaseUseCase<CreateCategoryRequestDTO, Result<Category>>{

  constructor(
    private readonly categoryRepo: ICategoryRepository,
    private readonly categoryFileRepo: ICategoryFileRepository
  ){}

  private async getCategoryFile(request: CreateCategoryRequestDTO): Promise<Result<CategoryFile>>{
    try {
      if(!this.categoryFileRepo.exists(request.iconId))
        return Result.fail<CategoryFile>("couldn't file with id = " + request.iconId + "in field " + this.categoryFileRepo.fieldName);
      
      return Result.ok<CategoryFile>(await this.categoryFileRepo.getFileById(request.iconId) as CategoryFile);
    } catch (error) {
      return Result.fail<CategoryFile>(error);
    }
  }

  public async execute(request: CreateCategoryRequestDTO):Promise<Result<Category>> {
    try {
      const categoryFileOrError = await this.getCategoryFile(request);

      if(categoryFileOrError.isFailure)
        return Result.fail<Category>(categoryFileOrError.errorValue);
      
      const categoryOrError = Category.create({
        description: request.description,
        name: request.name,
        icon: categoryFileOrError.getValue()
      })

      if(categoryOrError.isFailure)
        return Result.fail<Category>(categoryOrError.errorValue);
      
      this.categoryRepo.save(categoryOrError.getValue());
      return Result.ok<Category>(categoryOrError.getValue());

    } catch (error) {
      return Result.fail<Category>(error)
    }
  }
}