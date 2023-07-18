import { Mapper } from "application/shared/utils/baseIMapper";
import { Category } from "domain/ledger/category";
import { CategoryId } from "domain/ledger/categoryId";
import { Ledger } from "domain/ledger/ledger";
import { UniqueEntityID } from "domain/shared/base/UniqueEntityID";
import { Result } from "domain/shared/logic/Result";
import { CategoryDto, CategoryMap } from "./CategoryDto";


/**
 * representation ledger json object from database.
 * configure it to make sure the api is suit
 */
export type LedgerDto = {
  ledgerId: number | string;
  amount: number;
  type: "income" | "expense";
  description: string;
  // categoryId: string | number;
  category: CategoryDto;
  date?: string; // date string iso
}

// are DTO same from json object that retrieved from database?
export class LedgerMap extends Mapper<Ledger>{
  /**
   * @param raw data maybe a json fron repository
   * @description
   * should i return the `Result` object?
   * it also can be dificult to handle error if the data doesn't match
   */
  public static toDomain(raw: LedgerDto): Result<Ledger> {

    const categoryOrError = CategoryMap.toDomain(raw.category);
    if(categoryOrError.isFailure)
      return Result.fail<Ledger>(categoryOrError.errorValue);

    const ledgerOrError =  Ledger.create({
      category: categoryOrError.getValue(),
      amount: raw.amount,
      date: raw.date? new Date(raw.date) : undefined,
      description: raw.description,
      type: raw.type
    // when id is present (string or number) it will be pass as `UniqueEntityID`
    // if not the let `Entity` create the id
    }, raw.ledgerId ? new UniqueEntityID(raw.ledgerId) : undefined) //<--

    if(ledgerOrError.isFailure) console.log(ledgerOrError.errorValue);
    return ledgerOrError;
  }

  public static toDTO(ledger: Ledger): LedgerDto{
    return {
      amount: ledger.amount,
      description: ledger.description,
      type: ledger.type,
      date: ledger.date.toISOString(),
      ledgerId: ledger.ledgerId.id.toString(),
      category: CategoryMap.toDTO(ledger.category)
    }
  }
}