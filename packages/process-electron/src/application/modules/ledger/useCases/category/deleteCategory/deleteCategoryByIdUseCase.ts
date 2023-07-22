import { ICategoryRepository } from "application/modules/ledger/providerContracts/ICategory.repository";
import { ICategoryFileRepository } from "application/modules/ledger/providerContracts/iCategoryFile.repository";
import { BaseUseCase } from "application/shared/utils/baseIUseCase";
import { Category } from "domain/ledger/category";
import { Result } from "domain/shared/logic/Result";








export interface DeleteCategoryByIdRequestDto {
  categoryId: string;
}


export class DeleteCategoryById implements BaseUseCase<DeleteCategoryByIdRequestDto, Result<Category>>{

  constructor(
    private readonly CategoryRepo: ICategoryRepository,
    private readonly CategoryFileRepo: ICategoryFileRepository
  ){}

  public async execute(request: DeleteCategoryByIdRequestDto ): Promise<Result<Category>> {
    try {
      if(!this.CategoryRepo.exists(request.categoryId))
        return Result.fail<Category>("Category doesn't exist");
      
      const categoryOrNull = await this.CategoryRepo.findCategoryById(request.categoryId.toString());
  
      if(categoryOrNull === null)
        return Result.fail<Category>("Couldn't find Category with id = " + request.categoryId);
      
      const categoryFile = categoryOrNull.props.icon;
      await this.CategoryFileRepo.removeFileById(categoryFile.fileId);
  
      await this.CategoryRepo.removeCategoryById(categoryOrNull.categoryId.id.toString());
  
      return Result.ok<Category>(categoryOrNull);
    } catch (error) {
      return Result.fail<Category>(error);   
    }
  }
}