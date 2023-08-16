import fsAsync from "node:fs/promises"
import path from "node:path"
import { existsSync } from "node:fs";
import { FileDto } from "shared/fileHandler/FileDTO";
import { UniqueEntityID } from "domain/shared/base/UniqueEntityID";
import { IFileProvider } from "shared/fileHandler/IFileProvider";

export class BaseFileProvider implements IFileProvider<FileDto>{

  // # Override this
  public field = "";

  readonly store = path.resolve(__dirname + "/src/infra/database/storage");

  constructor(field: string){
    this.field = field;
  }
  
  async getFileById(fileId: string): Promise<FileDto | null> {
    try {
      const filePath = path.resolve(this.store, fileId);
      const fileExtension = path.extname(filePath);
      const fileName = path.basename(filePath);
      const size = (await fsAsync.stat(filePath)).size;
      const getFile = async () => {
        return await fsAsync.readFile(filePath);
      }
  
      return {
        extension : fileExtension,
        fieldName : this.field,
        fileName  : fileName,
        size      : size,
        getFile   : getFile
      }
    } catch (error) {
      return null;
    }
  }
  async getFilesByIds(fileIds: string[]): Promise<FileDto[] | null> {
    try {
      const dataIds : unknown = fileIds.map(async (fileId) => {
        const data = await this.getFileById(fileId)
        if(data === null)
          throw "data null"
        return data
      });

      return dataIds as FileDto[];
    } catch (error) {
      return null;
    }
  }
  async removeFileById(fileId: string): Promise<FileDto | null> {
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
  async removeFilesByIds(fileIds: string[]): Promise<FileDto[] | null> {
    try {
      const fileDtoList : FileDto[] = [];
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

  /** @param {file} string an absolute path that will be copied to this app storage */
  async save(fileDir: string): Promise<FileDto | null> {
    try {
      const fileName = new UniqueEntityID();
      const fileExtension = path.extname(fileDir);
      const dest = path.resolve(this.store, this.field, fileName.toString() + fileExtension);
      await fsAsync.copyFile(fileDir, dest);

      const size = (await fsAsync.stat(dest)).size;
      const getFile = async () => {
        return await fsAsync.readFile(dest);
      }
      return {
        extension : fileExtension,
        fieldName : this.field,
        fileName  : fileName.toString(),
        size      : size,
        getFile   : getFile
      }

    } catch (error) {
      return null;
    }
  }

  
}