import { ICategoryRepository } from "application/modules/ledger/providerContracts/ICategory.repository";
import { ICategoryFileRepository } from "application/modules/ledger/providerContracts/iCategoryFile.repository";
import { BaseUseCase } from "application/shared/utils/baseIUseCase";
import { Changes, WithChanges } from "application/shared/utils/change";
import { Category } from "domain/ledger/category";
import { GuardBoolean } from "domain/shared/logic/GuardBoolean";
import { Result } from "domain/shared/logic/Result";






export interface UpdateCategoryByIdRequestDto {
  categoryId: string;
  name?: string;
  description?: string;
  iconId?: string;
}



export class UpdateCategoryByIdUseCase implements BaseUseCase<UpdateCategoryByIdRequestDto, Result<Category>>, WithChanges{
  public changes : Changes;
  constructor(
    private readonly categoryFileRepo: ICategoryFileRepository,
    private readonly categoryRepo: ICategoryRepository
  ){
    this.changes = new Changes();
  }

  async execute(request: UpdateCategoryByIdRequestDto): Promise<Result<Category>> {
    try {
      let categoryOrNull = await this.categoryRepo.findCategoryById(request.categoryId);
      if(categoryOrNull === null)
        return Result.fail("could find category with id = " + request.categoryId);
      
      if(GuardBoolean.has("name", request))
        this.changes.addChange(categoryOrNull.updateName(request.name!));

      if(GuardBoolean.has("description", request))
        this.changes.addChange(categoryOrNull.updateDescription(request.description!));

      if(GuardBoolean.has("iconId", request)){
        const fileOrNull = await this.categoryFileRepo.getFileById(request.iconId!);
        if(fileOrNull === null)
          return Result.fail<Category>("couldn't find file with id = " + request.iconId);
        this.changes.addChange(categoryOrNull.updateIcon(fileOrNull));
      }

      // save
      await this.categoryRepo.save(categoryOrNull);
      return Result.ok<Category>(categoryOrNull);
    } catch (error) {
      return Result.fail<Category>(error);
    }
  }
}