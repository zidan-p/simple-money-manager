import { CategoryDto, CategoryMap } from "application/modules/ledger/dtos/CategoryDto";
import { ICategoryRepository } from "application/modules/ledger/providerContracts/ICategory.repository";
import { Category } from "domain/ledger/category";
import { CategoryId } from "domain/ledger/categoryId";
import { Result } from "domain/shared/logic/Result";
import { ICategoryModel } from "./ICategoryModel";






export class CategoryRepository implements ICategoryRepository{

  constructor(
    // TODO: fix this type
    // NOTE: i want to make this model more similar to how sequelize model operate
    private readonly categoryModel: ICategoryModel
  ){}

  parseCategoryId(categoryId: string | CategoryId ): string{
    return categoryId instanceof CategoryId ? categoryId.id.toString() : categoryId;
  }

  async findCategoryById(categoryId: string | CategoryId): Promise<Category | null> {
    try {
      const founded : CategoryDto | null = await this.categoryModel.findById(
        this.parseCategoryId(categoryId)
      );
      if(!founded) return null;

      const builded = CategoryMap.toDomain(founded);

      if(builded.isFailure)
        throw builded.errorValue;
      
      return builded.getValue();

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findCategoriesByIds(categoryId: string[] | CategoryId[]): Promise<Category[]> {
    try {
      const founded: CategoryDto[] | null = await this.categoryModel.findByIds(
        categoryId.map(id => this.parseCategoryId(id))
      )
      if(!founded) return [];

      const builded = founded.map(found => CategoryMap.toDomain(found))

      const combinedResult = Result.combine(builded);
      if(combinedResult.isFailure)
        throw combinedResult.errorValue();
      
      return builded.map(build => build.getValue());
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async exists(categoryId: string | CategoryId): Promise<Boolean> {
    try {
      const founded: boolean = await this.categoryModel.exist(
        this.parseCategoryId(categoryId)
      )
      return founded;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async removeCategoryById(categoryId: string | CategoryId): Promise<Category | null> {
    try {
      const founded: CategoryDto | null = await this.categoryModel.removeById(
        this.parseCategoryId(categoryId)
      )
      if(!founded) return null;

      const builded = CategoryMap.toDomain(founded);

      if(builded.isFailure)
        throw builded.errorValue();
      
      return builded.getValue();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async removeCategoryByIds(categoryId: string[] | CategoryId[]): Promise<Category[]> {
    try {
      const founded: CategoryDto[] | null = await this.categoryModel.removeByIds(
        categoryId.map(id => this.parseCategoryId(id))
      )
      if(!founded) return [];

      const builded = founded.map(found => CategoryMap.toDomain(found))

      const combinedResult = Result.combine(builded);
      if(combinedResult.isFailure)
        throw combinedResult.errorValue();
      
      return builded.map(build => build.getValue());
    } catch (error) {
      console.log(error);
      return [];
    }
  }


  async save(t: Category): Promise<Category> {
    try {
      const savedData = CategoryMap.toDTO(t);

      // NOTE: the save method doesn't save the related aggregate with this entity
      // so i will exclude the related data to external entity.
      // but because the save data didn't have to read the ledger value
      // i will allow it.

      const categoryUpdated : CategoryDto = await this.categoryModel.save(savedData);

      // WARNING: this is wild card hack. i forget to define return value as optional between Category and null
      return CategoryMap.toDomain(categoryUpdated).getValue();

    } catch (error) {
      return t;
    }
  }
  
}