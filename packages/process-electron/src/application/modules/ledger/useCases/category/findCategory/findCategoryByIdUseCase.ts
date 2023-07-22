import { ICategoryRepository } from "application/modules/ledger/providerContracts/ICategory.repository";
import { BaseUseCase } from "application/shared/utils/baseIUseCase";
import { Category } from "domain/ledger/category";
import { CategoryId } from "domain/ledger/categoryId";
import { Result } from "domain/shared/logic/Result";






export interface FindCategoryByIdRequestDto {
  categoryId: string;
}


export class FindCategoryByIdUseCase implements BaseUseCase<FindCategoryByIdRequestDto, Result<Category>>{

  constructor(
    private readonly CategoryRepo: ICategoryRepository
  ){}

  async execute(request: FindCategoryByIdRequestDto): Promise<Result<Category>> {
    try {
      const categoryOrNull = await this.CategoryRepo.findCategoryById(request.categoryId);
      if(categoryOrNull === null)
        return Result.fail<Category>("couldn't find category with id = " + request.categoryId);
      return Result.ok<Category>(categoryOrNull);
    } catch (error) {
      return Result.fail<Category>(error);
    }
  }
}