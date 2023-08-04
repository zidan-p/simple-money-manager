import { ILedgerModel } from "adapters/repositories/ledger/ledger/ILedgerModel";
import { LedgerDto } from "application/modules/ledger/dtos/LedgerDto";
import { DatabaseSMM } from "infra/database";
import { Category } from "infra/database/models/CategoryDB.model";
import { Op, WhereOptions } from "sequelize";
import { CategoryModel } from "./categoryModel";


type LedgerBaseParam = {
  where: object,
  limit: number,
  offset: number
}




export class LedgerModel implements ILedgerModel{
  constructor(
    private readonly database: DatabaseSMM,
    private readonly categoryModel: CategoryModel
  ){}

  baseQuery(
    {where,limit,offset} : 
    LedgerBaseParam = 
    {where : {}, limit : 15, offset : 0}
    ): any{
    return {
      where: where as WhereOptions,
      limit: limit,
      offset: offset
    }
  }

  async findById(id: string): Promise<LedgerDto | null> {
    try {
      const result = await this.database.models.Ledger.findByPk(id);
      if(result === null) throw new Error("Couldn't find Ledgerid = " + id);

      // i want the file, so i think i just have to get the file
      const resultCategory = await this.categoryModel.findById(result.id);
      if(resultCategory === null) throw new Error("Category not found from ledgerId = " + id);
      

      return{
        amount      : result.amount,
        description : result.description,
        ledgerId    : result.id,
        type        : result.type,
        date        : result.date.toISOString(),
        category    : resultCategory
      }
    } catch (error) {
      console.error(error);
      return null
    }
  } 
  async findByIds(ids: string[]): Promise<LedgerDto[] | null> {
    try {

      const baseQuery = this.baseQuery();
      baseQuery.where[Op.or] = ids.map(id => ({id}));

      const result = await this.database.models.Ledger.findAll(baseQuery);
      const pendingResult : Promise<LedgerDto>[] = result.map(async (res) => {
        const resultCategory = await this.categoryModel.findById(res.id);
        if(resultCategory === null) throw new Error("Category not found from ledgerId = " + res.id);

        return {
          amount      : res.amount,
          description : res.description,
          ledgerId    : res.id,
          type        : res.type,
          date        : res.date.toISOString(),
          category    : resultCategory
        }
      });

      const parsedResult =await Promise.all(pendingResult);
      return parsedResult;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async exist(id: string): Promise<boolean> {
    try {
      const result = await this.database.models.Ledger.findByPk(id);
      return result !== null;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async removeById(id: string): Promise<LedgerDto | null> {
    try {
      const ledgerInstance = await this.database.models.Ledger.findByPk(id);
      if(ledgerInstance === null) return null;

      const resultCategory = await this.categoryModel.findById(ledgerInstance.id);
      // if(resultCategory === null) // it doesn't matter when the ledger doesn;t have category, just delete it

      const ledgerDto : LedgerDto = {
        amount      : ledgerInstance.amount,
        description : ledgerInstance.description,
        ledgerId    : ledgerInstance.id,
        type        : ledgerInstance.type,
        date        : ledgerInstance.date.toISOString(),
        category    : resultCategory! // don't affraid if it's null
      }

      await ledgerInstance.destroy();
      return ledgerDto;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async removeByIds(ids: string[]): Promise<LedgerDto[] | null> {
    try {

      const baseQuery = this.baseQuery();
      baseQuery.where[Op.or] = ids.map(id => ({id}));

      const result = await this.database.models.Ledger.findAll(baseQuery);
      const pendingResult: Promise<LedgerDto>[]= result.map(async (res) => {

        // i forgot, it doesn't matter if the ledger doesn't have category
        const resultCategory = await this.categoryModel.findById(res.id);
        // if(resultCategory === null) throw new Error("Category not found from ledgerId = " + res.id);

        return {
          amount      : res.amount,
          description : res.description,
          ledgerId    : res.id,
          type        : res.type,
          date        : res.date.toISOString(),
          category    : resultCategory!
        }
      });

      const parsedResult = await Promise.all(pendingResult);

      await this.database.models.Ledger.destroy(baseQuery);
      // let the service or use case that handle file removal
      
      return parsedResult;      
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /** @throws {Error} */
  async save(data: LedgerDto) {
    const ledgerInstance = await this.database.models.Ledger.findByPk(data.ledgerId);
    if(ledgerInstance === null){
      const ledger = this.database.models.Ledger.build({
        amount      : data.amount,
        description : data.description,
        id          : data.ledgerId.toString(),
        type        : data.type,
        date        : data.date ? new Date(data.date) : new Date(),
        categoryId  : data.category.categoryId.toString()
      })
    
      await ledger.save();
      return;
    }

    ledgerInstance.amount       = data.amount;
    ledgerInstance.description  = data.description;
    ledgerInstance.type         = data.type;
    ledgerInstance.date         = data.date ? new Date(data.date) : new Date();
    ledgerInstance.categoryId   = data.category.categoryId.toString();

    await ledgerInstance.save();
    return;
  }

}