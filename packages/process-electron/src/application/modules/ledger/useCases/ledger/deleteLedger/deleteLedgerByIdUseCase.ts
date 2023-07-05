import { ILedgerRepository } from "application/modules/ledger/providerContracts/ILedger.repository";
import { BaseUseCase } from "application/shared/utils/baseIUseCase";
import { Ledger } from "domain/ledger/ledger";
import { Result } from "domain/shared/logic/Result";





interface DeleteLedgerByIdUseCaseDTO {
  ledgerId: string | number;
}


export class DeleteLedgerByIdUseCase implements BaseUseCase<DeleteLedgerByIdUseCaseDTO, Result<Ledger>>{
  constructor(
    private readonly ledgerRepo: ILedgerRepository
  ){}

  async execute(request: DeleteLedgerByIdUseCaseDTO): Promise<Result<Ledger>> {
    try {
      const ledgerOrNull = await this.ledgerRepo.findLedgerById(request.ledgerId.toString());
      if(ledgerOrNull === null) return Result.fail<Ledger>("can't find ledger with id = " + request.ledgerId);
      
      // TODO: make this efficient
      // it will make another object creating for deleted ledger.
      // decide to make use return void as remove method or still using this method
      await this.ledgerRepo.removeLedgerById(ledgerOrNull.ledgerId.id.toString());
      return Result.ok<Ledger>(ledgerOrNull);
    } catch (error) {
      console.log(error);
      return Result.fail<Ledger>(error);
    }
  }
}