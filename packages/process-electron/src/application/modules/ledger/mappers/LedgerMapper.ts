import { Mapper } from "application/shared/utils/baseIMapper";
import { CategoryId } from "domain/ledger/categoryId";
import { Ledger } from "domain/ledger/ledger";





export class LedgerMap extends Mapper<Ledger>{
  public static toDomain(raw: object): Ledger {
    const ledgerOrError = new Ledger.create({
      categoryId: CategoryId.create(raw.a)
    })
  }
}