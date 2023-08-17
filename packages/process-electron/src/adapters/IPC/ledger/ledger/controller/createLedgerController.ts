import { BaseIpcController, FailController, SuccessController } from "adapters/shared/base/BaseIpcController";
import { CreateLedgerUseCase, CreateLedgerUseCaseRequestDTO } from "../ledgerContainer";
import { LedgerMap } from "application/modules/ledger/dtos/LedgerDto";
import { CREATE_LEDGER } from "../ledgerChannelNames";
import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";
import { CategoryDto } from "application/modules/ledger/dtos/CategoryDto";



export interface CreateLedgerControllerDto 
  extends CreateLedgerUseCaseRequestDTO {}



export class CreateLedgerController extends BaseIpcController{

  public readonly channelName = CREATE_LEDGER;
  public readonly channelType = CHANNEL_TYPE.INVOKABLE;

  constructor(
    private useCase: CreateLedgerUseCase
  ){
    super();
  }

  async executeImpl(request: CreateLedgerControllerDto): Promise<SuccessController<CategoryDto> | FailController<CategoryDto> > {
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