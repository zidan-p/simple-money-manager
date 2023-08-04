import { ICategoryFileRepository } from "application/modules/ledger/providerContracts/iCategoryFile.repository";
import { CategoryFile } from "domain/ledger/categoryFile";
import { FileDto } from "shared/fileHandler/FileDTO";
import { IFileService } from "shared/fileHandler/IFileService";



// it just another name for file services
export class CategoryFileRepository implements ICategoryFileRepository{

  constructor(
    private fileService : IFileService<CategoryFile>
  ){}

  public readonly fieldName = "category/icon";

  getFileById(fileId: string): Promise<CategoryFile | null> {
    return this.fileService.getFileById(fileId);
  }
  getFilesByIds(fileIds: string[]): Promise<CategoryFile[] | null> {
    return this.fileService.getFilesByIds(fileIds);
  }
  removeFileById(fileId: string): Promise<CategoryFile | null> {
    return this.fileService.removeFileById(fileId);
  }
  removeFilesByIds(fileIds: string[]): Promise<CategoryFile[] | null> {
    return this.fileService.removeFilesByIds(fileIds);
  }
  exists(file: string): boolean {
    return this.fileService.exists(file);
  }
  async existsPromise(file: string): Promise<boolean> {
    return await this.fileService.existsPromise(file)
  }
  save<TFileDto extends FileDto>(file: any): Promise<TFileDto> {
    throw new Error("Method not implemented.");
  }

}