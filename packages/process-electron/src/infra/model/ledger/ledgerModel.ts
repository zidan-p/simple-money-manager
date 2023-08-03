import { ILedgerModel } from "adapters/repositories/ledger/ledger/ILedgerModel";
import { LedgerDto } from "application/modules/ledger/dtos/LedgerDto";







export class LedgerModel implements ILedgerModel{
  findById(id: string): Promise<LedgerDto | null> {
    throw new Error("Method not implemented.");
  }
  findByIds(id: string[]): Promise<LedgerDto[] | null> {
    throw new Error("Method not implemented.");
  }
  exist(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  removeById(id: string): Promise<LedgerDto | null> {
    throw new Error("Method not implemented.");
  }
  removeByIds(id: string[]): Promise<LedgerDto[] | null> {
    throw new Error("Method not implemented.");
  }
  save(data: LedgerDto) {
    throw new Error("Method not implemented.");
  }
  
}