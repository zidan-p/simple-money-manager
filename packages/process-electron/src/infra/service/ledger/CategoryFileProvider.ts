import { CategoryFile } from "domain/ledger/categoryFile";
import { FileDto } from "shared/fileHandler/FileDTO";
import { IFileService } from "shared/fileHandler/IFileService";
import { BaseFileProvider } from "../../provider/fileProvider/BaseFileProvider";
import { ICategoryModel } from "adapters/repositories/ledger/category/ICategoryModel";
import { ICategoryFileRepository } from "application/modules/ledger/providerContracts/iCategoryFile.repository";
import { IFileProvider } from "shared/fileHandler/IFileProvider";
import { CategoryFileDto } from "application/modules/ledger/dtos/CategoryFileDto";




export class CategoryFileService implements IFileProvider<CategoryFileDto>{

  
  constructor(
    private readonly fileProvider : BaseFileProvider
  ){}

  async getFileById(fileId: string): Promise<CategoryFileDto | null> {
    return await this.fileProvider.getFileById(fileId) as (CategoryFileDto | null);
  }
  async getFilesByIds(fileIds: string[]): Promise<CategoryFileDto[] | null> {
    return await this.fileProvider.getFilesByIds(fileIds) as (CategoryFileDto[] | null)
  }
  async removeFileById(fileId: string): Promise<CategoryFileDto | null> {
    return await this.fileProvider.removeFileById(fileId) as (CategoryFileDto | null)
  }
  async removeFilesByIds(fileIds: string[]): Promise<CategoryFileDto[] | null> {
    return await this.fileProvider.removeFilesByIds(fileIds) as (CategoryFileDto[] | null)
  }
  exists(file: string): boolean {
    return this.fileProvider.exists(file);
  }
  async existsPromise(file: string): Promise<boolean> {
    return await this.fileProvider.existsPromise(file);
  }
  async save(file: any): Promise<CategoryFileDto | null> {
    return await this.fileProvider.save(file) as (CategoryFileDto | null);
  }


}