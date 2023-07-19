import { FileBase, FileProps } from "shared/fileHandler/FileBase";





export interface IFileService<TFileClass extends FileBase<any>> {
  // type TFileClass = FileBase<TFileClass>;

  getFileById(fileId: string): Promise<TFileClass>;
  getFilesByIds(fileIds: string[]): Promise<TFileClass[]>;
  // getFileByName(fileName: string): Promise<T<TFileClass>>;

  removeFileById(fileId: string): Promise<TFileClass>;
  removeFilesByIds(fileIds: string[]): Promise<TFileClass[]>;
  // removeFileByFileName(fileName: string): Promise<T<TFileClass>>;

  exists(file: string): boolean;
  existsPromise(file: string): Promise<boolean>;
}