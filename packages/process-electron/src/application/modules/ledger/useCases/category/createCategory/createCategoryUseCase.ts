import { BaseUseCase } from "application/shared/utils/baseIUseCase";
import { Category } from "domain/ledger/category";
import { Result } from "domain/shared/logic/Result";









interface CreateCategoryRequestDTO {
  name: string;
  description: string;
  icon: string;

  // there are no ledgers, it must be create so it can be paired with category;
  // ledgers? : WatchedList<Ledger>;
}

class CreateCategoryUseCase implements BaseUseCase<CreateCategoryRequestDTO, Result<Category>>{

  public async execute(request: CreateCategoryRequestDTO):Promise<Result<Category>> {
    try {
      


    } catch (error) {
      return Result.fail<Category>("can't create this category")
    }
  }
}