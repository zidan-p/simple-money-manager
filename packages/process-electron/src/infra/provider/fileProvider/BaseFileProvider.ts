import { CategoryFile } from "domain/ledger/categoryFile";
import { IFileService } from "shared/fileHandler/IFileService";
import fsAsync from "node:fs/promises"
import path from "node:path"
import { CategoryFileDto } from "application/modules/ledger/dtos/CategoryFileDto";
import { ImageExtensionType } from "shared/fileHandler/fileTypes/ImageFileType";
import { existsSync } from "node:fs";


export abstract class BaseFileProvider{

  // # Override this
  readonly field = "category/icon";

  readonly store = path.resolve(__dirname + "/src/infra/database/storage");
  
  async getFileById(fileId: string): Promise<CategoryFileDto | null> {
    try {
      const filePath = path.resolve(this.store, fileId);
      const fileExtension = path.extname(filePath);
      const fileName = path.basename(filePath);
      const size = (await fsAsync.stat(filePath)).size;
      const getFile = async () => {
        return await fsAsync.readFile(filePath);
      }
  
      return {
        extension : fileExtension as ImageExtensionType,
        fieldName : this.field,
        fileName  : fileName,
        size      : size,
        getFile   : getFile
      }
    } catch (error) {
      return null;
    }
  }
  async getFilesByIds(fileIds: string[]): Promise<CategoryFileDto[] | null> {
    try {
      const dataIds : unknown = fileIds.map(async (fileId) => {
        const data = await this.getFileById(fileId)
        if(data === null)
          throw "data null"
        return data
      });

      return dataIds as CategoryFileDto[];
    } catch (error) {
      return null;
    }
  }
  async removeFileById(fileId: string): Promise<CategoryFileDto | null> {
    try {
      const filePath = path.resolve(this.store, fileId);
      const fileDto = await this.getFileById(fileId);
      if(fileDto === null)
        throw "file doesn't found";
      await fsAsync.unlink(filePath);
      return fileDto;
    } catch (error) {
      return null;
    }
  }
  async removeFilesByIds(fileIds: string[]): Promise<CategoryFileDto[] | null> {
    try {
      const fileDtoList : CategoryFileDto[] = [];
      fileIds.forEach( async(fileId)=>{
        const result = await this.removeFileById(fileId);
        if(result === null)
          throw "file empty or error";
        fileDtoList.push(result);
      })
      return fileDtoList;
    } catch (error) {
      return null;
    }
  }
  exists(file: string): boolean {
    const filePath = path.resolve(this.store, file);
    return existsSync(filePath);
  }
  async existsPromise(file: string): Promise<boolean> {
    const filePath = path.resolve(this.store, file);
    // i don't know if node js doesn't have exist promise :(
    return existsSync(filePath);
  }
  async saveFromPath<TFileDto extends FileDto>(file: any): Promise<TFileDto> {
    
  }
  
}