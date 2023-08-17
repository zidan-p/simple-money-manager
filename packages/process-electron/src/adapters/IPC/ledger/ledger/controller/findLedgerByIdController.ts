import { BaseIpcController, FailController, SuccessController } from "adapters/shared/base/BaseIpcController";
import { FindLedgerByIdUseCase, FindLedgerByIdUseCaseDTO } from "../ledgerContainer";
import { LedgerMap } from "application/modules/ledger/dtos/LedgerDto";
import { GET_LEDGER_BY_ID } from "../ledgerChannelNames";
import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";
import { CategoryDto } from "application/modules/ledger/dtos/CategoryDto";





export interface FindCategoryByIdControllerDto {
  ledgerId : number | string;
}







export class FindLedgerByIdController extends BaseIpcController{

  public readonly channelName = GET_LEDGER_BY_ID;
  public readonly channelType = CHANNEL_TYPE.INVOKABLE;

  constructor(
    private useCase: FindLedgerByIdUseCase
  ){super()}

  async executeImpl(request: FindCategoryByIdControllerDto): Promise<SuccessController<CategoryDto> | FailController<CategoryDto>> {
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