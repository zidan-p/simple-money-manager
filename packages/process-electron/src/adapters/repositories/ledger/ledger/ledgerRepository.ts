import { LedgerDto, LedgerMap } from "application/modules/ledger/dtos/LedgerDto";
import { ILedgerRepository } from "application/modules/ledger/providerContracts/ILedger.repository";
import { Ledger } from "domain/ledger/ledger";
import { LedgerId } from "domain/ledger/ledgerId";
import { Result } from "domain/shared/logic/Result";






export class LedgerRepository implements ILedgerRepository{

  constructor(
    // TODO: fix this type
    // NOTE: i want to make this model more similar to how sequelize model operate
    private readonly categoryModel: any 
  ){}

  parseLedgerId(ledgerId: string | LedgerId ): string{
    return ledgerId instanceof LedgerId ? ledgerId.id.toString() : ledgerId;
  }

  async findLedgerById(ledgerId: string | LedgerId): Promise<Ledger | null> {
    try {
      const founded : LedgerDto | null = await this.categoryModel.findById(
        this.parseLedgerId(ledgerId)
      );
      if(!founded) return null;

      const builded = LedgerMap.toDomain(founded);

      if(builded.isFailure)
        throw builded.errorValue;
      
      return builded.getValue();

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findLedgersByIds(ledgerId: string[] | LedgerId[]): Promise<Ledger[]> {
    try {
      const founded: LedgerDto[] | null = await this.categoryModel.findByIds(
        ledgerId.map(id => this.parseLedgerId(id))
      )
      if(!founded) return [];

      const builded = founded.map(found => LedgerMap.toDomain(found))

      const combinedResult = Result.combine(builded);
      if(combinedResult.isFailure)
        throw combinedResult.errorValue();
      
      return builded.map(build => build.getValue());
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async exists(ledgerId: string | LedgerId): Promise<boolean> {
    try {
      const founded: boolean = await this.categoryModel.exists(
        this.parseLedgerId(ledgerId)
      )
      return founded;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async removeLedgerById(ledgerId: string | LedgerId): Promise<Ledger | null> {
    try {
      const founded: LedgerDto | null = await this.categoryModel.removeById(
        this.parseLedgerId(ledgerId)
      )
      if(!founded) return null;

      const builded = LedgerMap.toDomain(founded);

      if(builded.isFailure)
        throw builded.errorValue();
      
      return builded.getValue();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async removeLedgerByIds(ledgerId: string[] | LedgerId[]): Promise<Ledger[]> {
    try {
      const founded: LedgerDto[] | null = await this.categoryModel.removeByIds(
        ledgerId.map(id => this.parseLedgerId(id))
      )
      if(!founded) return [];

      const builded = founded.map(found => LedgerMap.toDomain(found))

      const combinedResult = Result.combine(builded);
      if(combinedResult.isFailure)
        throw combinedResult.errorValue();
      
      return builded.map(build => build.getValue());
    } catch (error) {
      console.log(error);
      return [];
    }
  }


  async save(t: Ledger): Promise<Ledger> {
    try {
      const savedData = LedgerMap.toDTO(t);

      const categoryUpdated : LedgerDto = await this.categoryModel.save(savedData);
      return LedgerMap.toDomain(categoryUpdated).getValue();

    } catch (error) {
      return t;
    }
  }
  
}