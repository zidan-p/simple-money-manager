import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { FindLedgerByIdUseCase, FindLedgerByIdUseCaseDTO } from "../ledgerContainer";
import { LedgerMap } from "application/modules/ledger/dtos/LedgerDto";













export class FindLedgerByIdController extends BaseIpcController{
  constructor(
    private useCase: FindLedgerByIdUseCase
  ){super()}

  async executeImpl(request: any): Promise<any> {
    try {
      const dto: FindLedgerByIdUseCaseDTO = {
        ledgerId: request.ledgerId
      }

      const result = await this.useCase.execute(dto);

      if (result.isFailure)
        return this.fail(result.errorValue());

      return this.ok(LedgerMap.toDTO(result.getValue()));
    } catch (error) {
      return this.fail(error);
    }
    
  }
  
}