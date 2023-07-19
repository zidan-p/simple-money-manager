import { FileBase, FileProps } from "shared/fileHandler/FileBase";





export interface IFileService<TFileClass extends FileBase<any>> {
  // type TFileClass = FileBase<TFileClass>;

  getFileById(fileId: string): Promise<TFileClass | null>;
  getFilesByIds(fileIds: string[]): Promise<TFileClass[] | null >;

  removeFileById(fileId: string): Promise<TFileClass | null >;
  removeFilesByIds(fileIds: string[]): Promise<TFileClass[] | null >;

  exists(file: string): boolean;
  existsPromise(file: string): Promise<boolean>;
}