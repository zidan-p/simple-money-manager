import { ICategoryModel } from "adapters/repositories/ledger/category/ICategoryModel";
import { CategoryDto } from "application/modules/ledger/dtos/CategoryDto";
import { DatabaseSMM } from "infra/database";
import { Model, Sequelize } from "sequelize";
import { Category } from "infra/database/models/CategoryDB.model";

type CategoryBaseParam = {
  where: object,
  limit: number,
  offset: number
}


class CategoryModel implements ICategoryModel{

  constructor(
    private readonly sequelizeConnection: Sequelize
  ){}

  baseQuery({
    where = {},
    limit = 15,
    offset = 0
  }:CategoryBaseParam){
    return {
      where: where,
      limit: limit,
      offset: offset
    }
  }

  async findById(id: string): Promise<CategoryDto | null> {
    try {
      const result = await Category.findByPk(id);
      return {
        categoryId  : result?.id!,
        description : result?.description!,
        icon        : result?.icon!,
        name        : result?.name!
      }
    } catch (error) {
      
    }
  }
  findByIds(id: string[]): Promise<CategoryDto[] | null> {
    throw new Error("Method not implemented.");
  }
  exist(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  removeById(id: string): Promise<CategoryDto | null> {
    throw new Error("Method not implemented.");
  }
  removeByIds(id: string[]): Promise<CategoryDto[] | null> {
    throw new Error("Method not implemented.");
  }
  save(data: CategoryDto) {
    throw new Error("Method not implemented.");
  }

}