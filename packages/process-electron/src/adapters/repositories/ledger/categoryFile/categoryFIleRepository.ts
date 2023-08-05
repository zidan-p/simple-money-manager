import { CategoryFileDto, CategoryFileMap } from "application/modules/ledger/dtos/CategoryFileDto";
import { ICategoryFileRepository } from "application/modules/ledger/providerContracts/iCategoryFile.repository";
import { CategoryFile } from "domain/ledger/categoryFile";
import { Result } from "domain/shared/logic/Result";
import { FileDto } from "shared/fileHandler/FileDTO";
import { IFileProvider } from "shared/fileHandler/IFileProvider";
import { IFileService } from "shared/fileHandler/IFileService";



// it just another name for file services
export class CategoryFileRepository implements ICategoryFileRepository{

  constructor(
    private fileService : IFileProvider<CategoryFileDto>
  ){}

  public readonly fieldName = "category/icon";

  async getFileById(fileId: string): Promise<CategoryFile | null> {
    try {
      const founded = await this.fileService.getFileById(fileId);
      if(founded === null)
        return null;
      const builded =  CategoryFileMap.toDomain(founded);
      if(builded.isFailure)
        throw builded.errorValue();

      return builded.getValue();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getFilesByIds(fileIds: string[]): Promise<CategoryFile[] | null> {
    try {
      const founded = await this.fileService.getFilesByIds(fileIds);
      if(founded === null)
        return null;
      
      const builded = founded.map(found => CategoryFileMap.toDomain(found));
      const combinedResult = Result.combine(builded);
      if(combinedResult.isFailure)
        return null;

      return builded.map(build => build.getValue());
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async removeFileById(fileId: string): Promise<CategoryFile | null> {
    try {
      const founded = await this.fileService.removeFileById(fileId);
      if(founded === null)
        return null;
      const builded =  CategoryFileMap.toDomain(founded);
      if(builded.isFailure)
        throw builded.errorValue();

      return builded.getValue();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async removeFilesByIds(fileIds: string[]): Promise<CategoryFile[] | null> {
    try {
      const founded = await this.fileService.removeFilesByIds(fileIds);
      if(founded === null)
        return null;
      
      const builded = founded.map(found => CategoryFileMap.toDomain(found));
      const combinedResult = Result.combine(builded);
      if(combinedResult.isFailure)
        return null;

      return builded.map(build => build.getValue());
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  exists(file: string): boolean {
    try {
      return this.fileService.exists(file);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async existsPromise(file: string): Promise<boolean> {
    try {
      return await this.fileService.existsPromise(file)
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**@throws error */
  async save<TFileDto extends FileDto>(fileDir: any): Promise<TFileDto | null> {
    try {
      const result =  await this.fileService.save(fileDir);
      if(result === null)
        return null;
      return result as TFileDto;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}