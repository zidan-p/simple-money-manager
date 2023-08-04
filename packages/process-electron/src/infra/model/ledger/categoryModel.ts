import { ICategoryModel } from "adapters/repositories/ledger/category/ICategoryModel";
import { CategoryDto } from "application/modules/ledger/dtos/CategoryDto";
import { DatabaseSMM } from "infra/database";
import { FindOptions, Model, Op, Sequelize, WhereOptions } from "sequelize";
import { Category } from "infra/database/models/CategoryDB.model";
import { CategoryFileProvider } from "infra/provider/ledger/CategoryFileProvider";
import { Guard } from "domain/shared/logic/Guard";
import { GuardBoolean } from "domain/shared/logic/GuardBoolean";
import { LedgerModel } from "./ledgerModel";
import { LedgerDto } from "application/modules/ledger/dtos/LedgerDto";

type CategoryBaseParam = {
  where: object,
  limit: number,
  offset: number
}

export class CategoryModel implements ICategoryModel{

  constructor(
    private readonly database: DatabaseSMM,
    private readonly categoryFileProvider: CategoryFileProvider
  ){}

  baseQuery(
    {where,limit,offset} : 
    CategoryBaseParam = 
    {where : {}, limit : 15, offset : 0}
    ): any{
    return {
      where: where as WhereOptions,
      limit: limit,
      offset: offset
    }
  }

  async findById(id: string): Promise<CategoryDto | null> {
    try {
      const result = await this.database.models.Category.findByPk(id);
      if(result === null) return null;

      const iconOrNull = await this.categoryFileProvider.getFileById(result?.icon!);
      if(iconOrNull === null) throw new Error
        (`icon with id = ${result?.icon!} not found for catgoryid = ${id}`);

      return {
        categoryId  : result?.id!,
        description : result?.description!,
        icon        : iconOrNull,
        name        : result?.name!
      }
    } catch (error) {
      console.error(error);
      return null
    }
  } 
  async findByIds(ids: string[]): Promise<CategoryDto[] | null> {
    try {

      const baseQuery = this.baseQuery();
      baseQuery.where[Op.or] = ids.map(id => ({id}));

      const result = await this.database.models.Category.findAll(baseQuery);
      const pendingResult = result.map(async (res) => {
        const categoryFileDto = await this.categoryFileProvider.getFileById(res.icon);
        if(categoryFileDto === null)
          throw new Error(`icon with id = ${res.icon} not found for catgoryid = ${res.id}`);
        
        return {
          categoryId  : res.id!,
          description : res.description!,
          icon        : categoryFileDto,
          name        : res.name!
        }
      });

      const parsedResult = await Promise.all(pendingResult);
      return parsedResult;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async exist(id: string): Promise<boolean> {
    try {
      const result = await this.database.models.Category.findByPk(id);
      return result !== null;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async removeById(id: string): Promise<CategoryDto | null> {
    try {
      const categoryInstance = await this.database.models.Category.findByPk(id);
      if(categoryInstance === null) return null;

      const iconOrNull = await this.categoryFileProvider.getFileById(categoryInstance?.icon!);
      if(iconOrNull === null) throw new Error
        (`icon with id = ${categoryInstance?.icon!} not found for catgoryid = ${id}`);
      
      await this.categoryFileProvider.removeFileById(categoryInstance?.icon!);

      const categoryDto = {
        categoryId  : categoryInstance?.id!,
        description : categoryInstance?.description!,
        icon        : iconOrNull,
        name        : categoryInstance?.name!
      }

      await categoryInstance.destroy();
      return categoryDto;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async removeByIds(ids: string[]): Promise<CategoryDto[] | null> {
    try {

      const baseQuery = this.baseQuery();
      baseQuery.where[Op.or] = ids.map(id => ({id}));

      const result = await this.database.models.Category.findAll(baseQuery);
      const pendingResult= result.map(async (res) => {
        const categoryFileDto = await this.categoryFileProvider.getFileById(res.icon);
        if(categoryFileDto === null)
          throw new Error(`icon with id = ${res.icon} not found for catgoryid = ${res.id}`);

        await this.categoryFileProvider.removeFileById(res.icon);
        return {
          categoryId  : res.id!,
          description : res.description!,
          icon        : categoryFileDto,
          name        : res.name!
        }
      });

      const parsedResult = await Promise.all(pendingResult);

      await this.database.models.Category.destroy(baseQuery);
      // let the service or use case that handle file removal
      
      return parsedResult;      
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * 
   * Damn, i,, just, sigh...
   * i don't know how to do it. to cross depent between ledger and category.
   * at first i think it will be a great idea if when category model can access some ldeger model method vice versa.
   * so i build entiry model without knowing depends each other.
   * now it i realize it imposible, how can the factory look like if you imagine. it's so ridiculous.
   * 
   * so here i am. hopelessly do the dirty work as long it can build 
   * @param data 
   * @returns 
   */
  async saveLedger(data: LedgerDto) {
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

  /** @throws {Error} */
  async save(data: CategoryDto) {
    const categoryInstance = await this.database.models.Category.findByPk(data.categoryId);
    if(categoryInstance === null){
      const category = this.database.models.Category.build({
        id: data.categoryId.toString(),
        description: data.description,
        // note it just the file name, not the id, the id can be got by using domain
        icon    : data.icon.fieldName + "/" + data.icon.fileName, 
        name    : data.name
      })
    
      await category.save();
      return;
    }

    categoryInstance.description = data.description;
    categoryInstance.icon = data.icon.fieldName + "/" + data.icon.fileName;
    categoryInstance.name = data.name;

    await categoryInstance.save();

    // handle if there are association with ledger that edited
    if(!GuardBoolean.isNullOrUndefined(data.ledgers)){
      // i assume if there are any ledger
      // NOTE: if the ledger is new, it will created in database
      // but if it already present, it just change its category
      if(!GuardBoolean.isNullOrUndefined(data.ledgers.addedItems))
        data.ledgers.addedItems.forEach(async (l) => await this.saveLedger(l));
      
      // WARNING!!: it will delete ledger from database
      if(!GuardBoolean.isNullOrUndefined(data.ledgers.removedItems)){
        const baseQuery = this.baseQuery();
        baseQuery.where[Op.or] = data.ledgers.removedItems.map(l => l.ledgerId);

        await this.database.models.Ledger.destroy(baseQuery);
      }
    }
  }

}