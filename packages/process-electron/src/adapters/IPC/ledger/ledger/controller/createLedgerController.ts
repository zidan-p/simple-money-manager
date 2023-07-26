import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { CreateLedgerUseCase, CreateLedgerUseCaseRequestDTO } from "../ledgerContainer";
import { LedgerMap } from "application/modules/ledger/dtos/LedgerDto";
import { CREATE_LEDGER } from "../ledgerChannelNames";







export class CreateLedgerController extends BaseIpcController{

  public readonly channelName = CREATE_LEDGER;

  constructor(
    private useCase: CreateLedgerUseCase
  ){
    super();
  }

  async executeImpl(request: any): Promise<any> {
    try {
      const dto : CreateLedgerUseCaseRequestDTO = {
        amount: request.amount,
        categoryId: request.categoryId,
        description: request.description,
        type: request.type,
        date: request.date
      }

      const result = await this.useCase.execute(dto);

      if(result.isFailure)
        return this.fail(result.errorValue());
      
      return this.ok(LedgerMap.toDTO(result.getValue()));
    } catch (error) {
      return this.fail(error);
    }

  }

}