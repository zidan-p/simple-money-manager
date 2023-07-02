import { Mapper } from "application/shared/utils/baseIMapper";
import { CategoryId } from "domain/ledger/categoryId";
import { Ledger } from "domain/ledger/ledger";
import { UniqueEntityID } from "domain/shared/base/UniqueEntityID";
import { Result } from "domain/shared/logic/Result";


/**
 * representation ledger json object from database.
 * configure it to make sure the api is suit
 */
export type ILedgerDto = {
  ledgerId: number | string;
  amount: number;
  type: "income" | "expense";
  description: string;
  categoryId: string | number;
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
  public static toDomain(raw: ILedgerDto): Result<Ledger> {
    const ledgerOrError =  Ledger.create({
      categoryId: CategoryId.create(new UniqueEntityID(raw.categoryId)),
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

  public static toDTO(ledger: Ledger): ILedgerDto{
    return {
      amount: ledger.amount,
      description: ledger.description,
      type: ledger.type,
      date: ledger.date.toISOString(),
      ledgerId: ledger.ledgerId.id.toString(),
      categoryId: ledger.categoryId.id.toString()
    }
  }
}