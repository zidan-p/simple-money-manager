import { LedgerDto } from "application/modules/ledger/dtos/LedgerDto";
import { ICategoryRepository } from "application/modules/ledger/providerContracts/ICategory.repository";
import { ILedgerRepository } from "application/modules/ledger/providerContracts/ILedger.repository";
import { BaseUseCase } from "application/shared/utils/baseIUseCase";
import { Category } from "domain/ledger/category";
import { Ledger } from "domain/ledger/ledger";
import { Guard } from "domain/shared/logic/Guard";
import { Result } from "domain/shared/logic/Result";
import { TextUtil } from "utils/TextUtil";
import { CategoryId } from "domain/ledger/categoryId";
import { UniqueEntityID } from "domain/shared/base/UniqueEntityID";
import { CategoryDto } from "application/modules/ledger/dtos/CategoryDto";

interface CreateLedgerUseCaseRequestDTO {
  // ledgerId: number | string; 
  amount: number;
  type: "income" | "expense";
  description: string;
  categoryId: string | number;
  date?: string | undefined;

  //i think better don't do this, the categiry must be present when creating ledger
  // category: CategoryDto | string ; 
}


/**
 * ?? Question.
 * Should the use case have its own DTO?
 */
export class CreateLedgerUseCase implements BaseUseCase<CreateLedgerUseCaseRequestDTO, Result<Ledger>>{

  constructor(
    private readonly ledgerRepo: ILedgerRepository,
    private readonly categoryRepo: ICategoryRepository
  ){}

  /**
   * NOTE: why i don't separate this method to another , service or utilities?
   * that because this method receive the specific argument, in this case useCase DTO.
   * so even tough i separate this method, i'm sure i will create the similar of this method
   * in this useCase.
   * 
   * in method below, it just method to get Category. but it can be expand when the dto change.
   * for example, not only the category id, the request also carries the category name and another category properties.
   * when i encounter case like this, it shouldn't be hard to expand. just add another if statement for checking id.
   * if id is absent, then create the category based on those argument.
   */
  private async getCategory(request: CreateLedgerUseCaseRequestDTO): Promise<Result<Category>>{
    const categoryId = request.categoryId.toString();
    const isIdValid = TextUtil.isUUID(categoryId);
    
    if(!isIdValid) return Result.fail<Category>("invalid id");
    const category = await this.categoryRepo.findCatgoryById(categoryId);
    
    if(Guard.againstNullOrUndefined(category, "category").succeeded) 
      return Result.fail<Category>("couldn't find category by id = " + categoryId);
    
    return Result.ok<Category>(category!);

  }

  public async execute(request: CreateLedgerUseCaseRequestDTO): Promise<Result<Ledger>> {
    // let category;
    try {
      const categoryOrError = await this.getCategory(request);
      if(categoryOrError.isFailure) return Result.fail<Ledger>(categoryOrError.error);

      const category = categoryOrError.getValue();
      const {categoryId,date, ...data} = request;

      const ledgerOrError = await Ledger.create({
        ...data,
        category: category,
        date: date ? new Date(date) : undefined,
        // categoryId: CategoryId.create(new UniqueEntityID(categoryId))
      })

      if(ledgerOrError.isFailure) return Result.fail<Ledger>(ledgerOrError.error);

      const ledger = ledgerOrError.getValue();

      await this.ledgerRepo.save(ledger);

      return Result.ok<Ledger>(ledger);
    } catch (error) {
      console.log(error);
      return Result.fail<Ledger>(error);
    }
  }
}