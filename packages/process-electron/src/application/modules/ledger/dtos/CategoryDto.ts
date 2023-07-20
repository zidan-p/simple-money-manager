import { Mapper } from "application/shared/utils/baseIMapper";
import { LedgerDto, LedgerMap } from "./LedgerDto";
import { Category } from "domain/ledger/category";
import { Result } from "domain/shared/logic/Result";
import { WatchedList } from "domain/shared/base/WacthedList";
import { Ledger } from "domain/ledger/ledger";
import { CategoryFileDto, CategoryFileMap } from "./CategoryFileDto";




export type CategoryDto = {
  categoryId: number | string;
  name: string;
  description: string;
  icon: CategoryFileDto;
  ledgers? : LedgerDto[] | [];
}

/**
 * should i really use Result class to handle this?
 */
export class CategoryMap extends Mapper<Category>{
  public static toDomain(raw: CategoryDto): Result<Category>{

    let ledgersWatchedList;
    if(!!raw.ledgers?.length){
      const ledgerList = raw.ledgers?.map(ledger => LedgerMap.toDomain(ledger))
      if(Result.combine(ledgerList).isFailure) return Result.fail<Category>
        ("fail to map ledgers");
      ledgersWatchedList = new WatchedList<Ledger>(ledgerList.map(l => l.getValue()));
    }

    const iconOrError = CategoryFileMap.toDomain(raw.icon);
    if(iconOrError.isFailure)
      return Result.fail<Category>(iconOrError.errorValue);


    const categoryOrError = Category.create({
      description: raw.description,
      icon: iconOrError.getValue(),
      name: raw.name,
      ledgers: ledgersWatchedList
    })

    if(categoryOrError.isFailure) console.log(categoryOrError.errorValue());

    return categoryOrError;
  }

  public static toDTO(category: Category): CategoryDto{
    return{
      categoryId: category.categoryId.id.toString(),
      description: category.description,
      icon: category.icon,
      name: category.name,
      ledgers: category.ledgers.map(l => LedgerMap.toDTO(l))
    }
  }
}