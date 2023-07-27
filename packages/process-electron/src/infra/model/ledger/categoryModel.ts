import { ICategoryModel } from "adapters/repositories/ledger/category/ICategoryModel";
import { CategoryDto } from "application/modules/ledger/dtos/CategoryDto";
import { Model } from "sequelize";







class CategoryModel implements ICategoryModel{

  constructor(
    private readonly sequelizeCategoryModel: Model
  ){}

  baseQuery({
    where
  }){

  }

  async findById(id: string): Promise<CategoryDto | null> {
    try {
      const result = this.sequelizeCategoryModel.
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