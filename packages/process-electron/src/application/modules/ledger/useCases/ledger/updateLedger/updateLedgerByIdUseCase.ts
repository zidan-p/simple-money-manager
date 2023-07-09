import { ICategoryRepository } from "application/modules/ledger/providerContracts/ICategory.repository";
import { ILedgerRepository } from "application/modules/ledger/providerContracts/ILedger.repository";
import { BaseUseCase } from "application/shared/utils/baseIUseCase";
import { Changes, WithChanges } from "application/shared/utils/change";
import { Ledger } from "domain/ledger/ledger";
import { GuardBoolean } from "domain/shared/logic/GuardBoolean";
import { Result } from "domain/shared/logic/Result";






interface UpdateLedgerByIdDTO {
  // ini yg penting
  ledgerId: number | string; 

  // theese are optional
  categoryId?: string | number;
  amount?: number;
  type?: "income" | "expense";
  description?: string;
  date?: string | undefined;
}


class UpdateLedgerByIdUseCase implements BaseUseCase<UpdateLedgerByIdDTO, Result<Ledger>>, WithChanges{
  public changes: Changes;
  constructor(
    private readonly ledgerRepo: ILedgerRepository,
    private readonly categoryRepo: ICategoryRepository,
  ){
    this.changes = new Changes();
  }


  async execute(request: UpdateLedgerByIdDTO): Promise<Result<Ledger>> {
    try {
      let isLedgerPresent = await this.ledgerRepo.exists(request.ledgerId.toString());

      if(!isLedgerPresent) return Result.fail<Ledger>("can't find ledger with id = " + request.ledgerId);

      let ledger = await this.ledgerRepo.findLedgerById(request.ledgerId.toString()) as Ledger;

      if(GuardBoolean.has("amount", request))
        this.changes.addChange( ledger.updateAmount(request.amount!) );

      if(GuardBoolean.has("type", request))
        this.changes.addChange(ledger.updateType(request.type!));

      if(GuardBoolean.has("description", request))
        this.changes.addChange(ledger.updateDescription(request.description!));

      if(GuardBoolean.has("category"))
      
    } catch (error) {
      
    }
  }
}