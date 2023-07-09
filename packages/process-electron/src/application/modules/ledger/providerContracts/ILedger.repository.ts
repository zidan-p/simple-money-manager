import { IBaseRepo } from "application/shared/utils/baseIRepo";
import { Ledger } from "domain/ledger/ledger";
import { LedgerId } from "domain/ledger/ledgerId";

/**
 * note, i didn't use Result wrapper as return value for this.
 * because in repository, it's function are to make data handle abstraction for database.
 * so the Result wrapper is needed in use case hierarchy.
 */
export interface ILedgerRepository extends IBaseRepo<Ledger> {
  findLedgerById(ledgerId: string | LedgerId): Promise<(Ledger | null)>
  findLedgersByIds(ledgerId: string[] | LedgerId[]): Promise<(Ledger[] | [])>

  /**
   * @override get ledger from id
   */
  exists(ledgerId: string | LedgerId) : Promise<boolean> 

  
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

