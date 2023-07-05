import { IBaseRepo } from "application/shared/utils/baseIRepo";
import { Ledger } from "domain/ledger/ledger";
import { LedgerId } from "domain/ledger/ledgerId";


export interface ILedgerRepository extends IBaseRepo<Ledger> {
  findLedgerById(ledgerId: string | LedgerId): Promise<(Ledger | null)>
  findLedgersByIds(ledgerId: string | LedgerId): Promise<(Ledger[] | [])>


  
  /** 
   * the sequelize can return the deleted object.
   * so i utilize this feature from sequelize to return its object when deleted.
   * you can use this object as metadata for your app.
   */
  removeLedgerById(ledgerId: string | LedgerId): Promise<Ledger>
}

/**
 * ### NOTE: is to update Ledger must be using 'save' ?
 */

