import { ILedgerRepository } from "application/modules/ledger/providerContracts/ILedger.repository";
import { BaseUseCase } from "application/shared/utils/baseIUseCase";
import { Ledger } from "domain/ledger/ledger";
import { Guard } from "domain/shared/logic/Guard";
import { Result } from "domain/shared/logic/Result";


interface FindLedgerByIdUseCaseDTO {
  ledgerId: string | number;
}



export class FindLedgerByIdUseCase implements BaseUseCase<FindLedgerByIdUseCaseDTO, Result<Ledger>>{
  constructor(
    private readonly ledgerRepo: ILedgerRepository
  ){}

  async execute(request: FindLedgerByIdUseCaseDTO): Promise<Result<Ledger>> {
    try {
      const categoryOrNull = await this.ledgerRepo.findLedgerById(request.ledgerId.toString());
      if(!Guard.againstNullOrUndefined(categoryOrNull, "category").succeeded)
        return Result.fail<Ledger>("can't find ledger with id = "+request.ledgerId);
      return Result.ok<Ledger>(categoryOrNull!);
    } catch (error) {
      console.log(error); 
      return Result.fail<Ledger>(error);
    }
  }
  
}