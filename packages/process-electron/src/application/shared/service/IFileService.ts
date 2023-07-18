import { FileBase, FileProps } from "domain/shared/base/FileBase";





export interface IFileService<T extends FileProps> {
  getFileById(fileId: string): Promise<FileBase<T>[]>;
  getFilesByIds(fileIds: string[]): Promise<FileBase<T>>;
  getFileByName(fileName: string): Promise<FileBase<T>>;

  removeFileById(fileId: string): Promise<FileBase<T>>;
  removeFilesByIds(fileIds: string[]): Promise<FileBase<T>[]>;
  removeFileByFileName(fileName: string): Promise<FileBase<T>>;

  exists(file: FileBase<T>): boolean;
}