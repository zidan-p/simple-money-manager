import { IBaseRepo } from "application/shared/utils/baseIRepo";
import { Category } from "domain/ledger/category";
import { CategoryId } from "domain/ledger/categoryId";

export interface ICategoryRepository extends Omit<IBaseRepo<Category>, "exists"> {
  findCategoryById(categoryId: string | CategoryId): Promise<Category | null>
  findCategoriesByIds(categoryId: string[] | CategoryId[]) : Promise<Category[]>

  /** 
   * @override get category from id
   * i don't know why the typescript still won't accept this
   */
  exists(categoryId: string | CategoryId) : Promise<Boolean>  

  removeCategoryById(categoryId: string | CategoryId) : Promise<Category | null>
  removeCategoryByIds(categoryId: string[] | CategoryId[]) : Promise<Category[]>
}