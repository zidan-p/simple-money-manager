import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { UpdateCategoryByIdUseCase } from "../../category/categoryContainer";
import { UpdateLedgerByIdDTO, UpdateLedgerByIdUseCase } from "../ledgerContainer";
import { LedgerMap } from "application/modules/ledger/dtos/LedgerDto";
import { UPDATE_LEDGER_BY_ID } from "../ledgerChannelNames";















export class UpdateLedgerById extends BaseIpcController{

  public readonly channelName = UPDATE_LEDGER_BY_ID;

  constructor(
    private useCase: UpdateLedgerByIdUseCase
  ){super()}
  
  async executeImpl(request: any): Promise<any> {
    try {
      const dto: UpdateLedgerByIdDTO = {
        ledgerId: request.ledgerId,
        amount: request.amount,
        categoryId: request.categoryId,
        date: request.date,
        description: request.description,
        type: request.type
      }

      const result = await this.useCase.execute(dto);

      if(result.isFailure)
        return this.fail(result.errorValue());

      return this.ok(LedgerMap.toDTO(result.getValue()))
    } catch (error) {
      return this.fail(error)
    }
  }
  
}