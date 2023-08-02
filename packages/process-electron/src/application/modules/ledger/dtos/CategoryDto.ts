import { Mapper } from "application/shared/utils/baseIMapper";
import { LedgerDto, LedgerMap } from "./LedgerDto";
import { Category } from "domain/ledger/category";
import { Result } from "domain/shared/logic/Result";
import { WatchedList, WatchedListDto, WatchedListProps } from "domain/shared/base/WacthedList";
import { Ledger } from "domain/ledger/ledger";
import { CategoryFileDto, CategoryFileMap } from "./CategoryFileDto";
import { UniqueEntityID } from "domain/shared/base/UniqueEntityID";
import { GuardBoolean } from "domain/shared/logic/GuardBoolean";




export type CategoryDto = {
  categoryId: number | string;
  name: string;
  description: string;
  icon: CategoryFileDto;
  ledgers? : WatchedListDto<LedgerDto>;
  // ledgers? : Ledger[];
}

/**
 * should i really use Result class to handle this?
 */
export class CategoryMap extends Mapper<Category>{
  public static toDomain(raw: CategoryDto): Result<Category>{

    let containerWatchedListLedger: WatchedListProps<Ledger> = {};
    if(!!raw.ledgers?.currentItems?.length){
      const ledgerListResults = raw.ledgers.currentItems.map(ledger => LedgerMap.toDomain(ledger))
      if(Result.combine(ledgerListResults).isFailure) return Result.fail<Category>
        ("fail to map ledgers");
      
      containerWatchedListLedger.currentItems = ledgerListResults.map(ledger => ledger.getValue());
    }

    if(!!raw.ledgers?.addedItems?.length){
      const ledgerListResults = raw.ledgers.addedItems.map(ledger => LedgerMap.toDomain(ledger))
      if(Result.combine(ledgerListResults).isFailure) return Result.fail<Category>
        ("fail to map ledgers");
      
      containerWatchedListLedger.addedItems = ledgerListResults.map(ledger => ledger.getValue());
    }

    if(!!raw.ledgers?.removedItems?.length){
      const ledgerListResults = raw.ledgers.removedItems.map(ledger => LedgerMap.toDomain(ledger))
      if(Result.combine(ledgerListResults).isFailure) return Result.fail<Category>
        ("fail to map ledgers");
      
      containerWatchedListLedger.removedItems = ledgerListResults.map(ledger => ledger.getValue());
    }

    const watchedListLedgers = new WatchedList<Ledger>(containerWatchedListLedger);
    

    const iconOrError = CategoryFileMap.toDomain(raw.icon);
    if(iconOrError.isFailure)
      return Result.fail<Category>(iconOrError.errorValue);


    const categoryOrError = Category.create({
      description: raw.description,
      icon: iconOrError.getValue(),
      name: raw.name,
      ledgers: watchedListLedgers
    }, new UniqueEntityID(raw.categoryId))

    if(categoryOrError.isFailure) console.log(categoryOrError.errorValue());

    return categoryOrError;
  }

  public static toDTO(category: Category): CategoryDto{

    const containerWactedListDto : WatchedListDto<LedgerDto>= {};
    if(!GuardBoolean.isNullOrUndefined(category.watchedLedgers)){
      const watched = category.watchedLedgers
      if(!GuardBoolean.isNullOrUndefined())
    }


    return{
      categoryId: category.categoryId.id.toString(),
      description: category.description,
      icon: category.icon,
      name: category.name,
      ledgers: category.ledgers.map(l => LedgerMap.toDTO(l))
    }
  }
}