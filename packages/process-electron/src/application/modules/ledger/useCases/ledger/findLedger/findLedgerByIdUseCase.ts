import { BaseUseCase } from "application/shared/utils/baseIUseCase";
import { Ledger } from "domain/ledger/ledger";
import { Result } from "domain/shared/logic/Result";


interface FindLedgerByIdUseCaseDTO {
  ledgerId: string | number;
}



export class FindLedgerByIdUseCase implements BaseUseCase<FindLedgerByIdUseCase, Result<Ledger>>{
  constructor(
  ){}
  async execute(request: FindLedgerByIdUseCase): Result<Ledger> {
    try {
      const categoryOrError = 
    } catch (error) {
      
    }
  }
}