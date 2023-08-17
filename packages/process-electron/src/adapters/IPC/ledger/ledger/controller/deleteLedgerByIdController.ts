import { BaseIpcController } from "adapters/shared/base/BaseIpcController";
import { DeleteLedgerByIdUseCase, DeleteLedgerByIdUseCaseDTO } from "../ledgerContainer";
import { DeleteCategoryByIdRequestDto } from "../../category/categoryContainer";
import { LedgerMap } from "application/modules/ledger/dtos/LedgerDto";
import { DELETE_LEDGER_BY_ID } from "../ledgerChannelNames";
import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";



export interface DeleteCategoryByIdControllerDto {
  ledgerId: string | number;
}


export class DeleteLedgerByIdController extends BaseIpcController{

  public readonly channelName = DELETE_LEDGER_BY_ID;
  public readonly channelType = CHANNEL_TYPE.INVOKABLE;

  constructor(
    private useCase: DeleteLedgerByIdUseCase
  ){
    super();
  }

  async executeImpl(request: DeleteCategoryByIdControllerDto): Promise<any> {
    try {
      const dto: DeleteLedgerByIdUseCaseDTO = {
        ledgerId: request.ledgerId
      }

      const result = await this.useCase.execute(dto);

      if(result.isFailure)
        return this.fail(result.errorValue());
      
      return this.ok(LedgerMap.toDTO(result.getValue()));
    } catch (error) {
      return this.fail((error));
    }
  }

}