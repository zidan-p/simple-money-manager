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
      let ledger = await this.ledgerRepo.findLedgerById(request.ledgerId.toString());
      if(ledger === null)
        return Result.fail<Ledger>("can't fin ledger with id = " + request.ledgerId.toString());

      if(GuardBoolean.has("categoryId", request)){
        const categoryOrNull = await this.categoryRepo.findCatgoryById(request.categoryId?.toString()!);
        if(categoryOrNull === null)
          return Result.fail<Ledger>("can't find categiry with id = " + request.categoryId?.toString());
        this.changes.addChange(ledger.updateCategory(categoryOrNull!))
      }

      if(GuardBoolean.has("amount", request))
        this.changes.addChange( ledger.updateAmount(request.amount!) );

      if(GuardBoolean.has("type", request))
        this.changes.addChange(ledger.updateType(request.type!));

      if(GuardBoolean.has("description", request))
        this.changes.addChange(ledger.updateDescription(request.description!));

      if(this.changes.getCombinedChangesResult().isFailure){
        return Result.fail<Ledger>(this.changes.getCombinedChangesResult().error);
      }

      // save it
      await this.ledgerRepo.save(ledger);
      return Result.ok<Ledger>(ledger);
    } catch (error) {
      return Result.fail<Ledger>(error);
    }
  }
}