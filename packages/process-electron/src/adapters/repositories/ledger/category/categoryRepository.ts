import { ICategoryRepository } from "application/modules/ledger/providerContracts/ICategory.repository";
import { Category } from "domain/ledger/category";
import { CategoryId } from "domain/ledger/categoryId";






export class CategoryRepository implements ICategoryRepository{

  constructor(
    // TODO: fix this type
    // NOTE: i want to make this model more similar to how sequelize model operate
    private readonly categoryModel: any 
  ){}

  async findCategoryById(categoryId: string | CategoryId): Promise<Category | null> {
    try {
      const founded = this.categoryModel.findById(
        categoryId instanceof CategoryId ? categoryId.id.toString() : categoryId
      );

      if(!founded) return null;
      
        
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  findCategoriesByIds(categoryId: string[] | CategoryId[]): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }
  exists(categoryId: string | CategoryId): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  removeCategoryById(categoryId: string | CategoryId): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  removeCategoryByIds(categoryId: string[] | CategoryId[]): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  save(t: Category): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  
}