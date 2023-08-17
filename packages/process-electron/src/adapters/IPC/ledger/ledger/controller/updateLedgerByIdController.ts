import { BaseIpcController, FailController, SuccessController } from "adapters/shared/base/BaseIpcController";
import { UpdateCategoryByIdUseCase } from "../../category/categoryContainer";
import { UpdateLedgerByIdDTO, UpdateLedgerByIdUseCase } from "../ledgerContainer";
import { LedgerMap } from "application/modules/ledger/dtos/LedgerDto";
import { UPDATE_LEDGER_BY_ID } from "../ledgerChannelNames";
import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";
import { CategoryDto } from "application/modules/ledger/dtos/CategoryDto";


export interface UpdateCategoryByIdControllerDto{
  ledgerId: string | number;
  amount: number;
  categoryId: string | number;
  date: string;
  description: string;
  type: "income" | "expense";
}

export class UpdateLedgerByIdController extends BaseIpcController{

  public readonly channelName = UPDATE_LEDGER_BY_ID;
  public readonly channelType = CHANNEL_TYPE.INVOKABLE;

  constructor(
    private useCase: UpdateLedgerByIdUseCase
  ){super()}
  
  async executeImpl(request: UpdateCategoryByIdControllerDto): Promise<SuccessController<CategoryDto> | FailController<CategoryDto>> {
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