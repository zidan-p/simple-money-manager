import { IBaseRepo } from "application/shared/utils/baseIRepo";
import { Category } from "domain/ledger/category";
import { CategoryId } from "domain/ledger/categoryId";

export interface ICategoryRepository extends Omit<IBaseRepo<Category>, "exists"> {
  findCatgoryById(categoryId: string | CategoryId): Promise<Category>
  findCategoriesByIds(categoryId: string[] | CategoryId[]) : Promise<Category[]>

  /** 
   * @override get category from id
   * i don't know why the typescript still won't accept this
   */
  exists(categoryId: string | CategoryId) : Promise<Boolean>  

  removeCategoryById(categoryId: string | CategoryId) : Promise<Category>
  removeCategoryByIds(categoryId: string[] | CategoryId[]) : Promise<Category>
}