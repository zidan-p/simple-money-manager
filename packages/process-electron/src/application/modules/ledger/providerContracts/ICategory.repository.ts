import { IBaseRepo } from "application/shared/utils/baseIRepo";
import { Category } from "domain/ledger/category";
import { CategoryId } from "domain/ledger/categoryId";

export interface ICategoryRepository extends IBaseRepo<Category>{
  findCatgoryById(categoryId: string | CategoryId): Promise<Category>
  findCategoriesByIds(categoryId: string[] | CategoryId[]) : Promise<Category[]>

  removeCategoryByIds(categoryId: string[] | CategoryId[]) : Promise<Category>
}