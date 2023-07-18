import { BaseUseCase } from "application/shared/utils/baseIUseCase";
import { Category } from "domain/ledger/category";
import { FileBase } from "shared/fileHandler/FileBase";
import { Result } from "domain/shared/logic/Result";









interface CreateCategoryRequestDTO {
  name: string;
  description: string;
  iconId: string; // this will be file id if not file name
  // the file handling will be handle by middleware.
  // NOTE: here i am manually create the middleware for electron

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