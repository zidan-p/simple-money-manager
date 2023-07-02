import { Mapper } from "application/shared/utils/baseIMapper";
import { ILedgerDto, LedgerMap } from "./LedgerDTO";
import { Category } from "domain/ledger/category";
import { Result } from "domain/shared/logic/Result";
import { WatchedList } from "domain/shared/base/WacthedList";
import { Ledger } from "domain/ledger/ledger";




export type ICategoryDto = {
  categoryId: number | string;
  name: string;
  description: string;
  icon: string;
  ledgers? : ILedgerDto[] | [];
}

/**
 * should i really use Result class to handle this?
 */
export class CategoryMap extends Mapper<Category>{
  public static toDomain(raw: ICategoryDto): Result<Category>{

    let ledgersWatchedList;
    if(!!raw.ledgers?.length){
      const ledgerList = raw.ledgers?.map(ledger => LedgerMap.toDomain(ledger))
      if(Result.combine(ledgerList).isFailure) return Result.fail<Category>
        ("fail to map ledgers");
      ledgersWatchedList = new WatchedList<Ledger>(ledgerList.map(l => l.getValue()));
    }

    const categoryOrError = Category.create({
      description: raw.description,
      icon: raw.icon,
      name: raw.name,
      ledgers: ledgersWatchedList
    })

    if(categoryOrError.isFailure) console.log(categoryOrError.errorValue());

    return categoryOrError;
  }

  public static toDTO(category: Category): ICategoryDto{
    return{
      categoryId: category.categoryId.id.toString(),
      description: category.description,
      icon: category.icon,
      name: category.name,
      ledgers: category.ledgers.map(l => LedgerMap.toDTO(l))
    }
  }
}