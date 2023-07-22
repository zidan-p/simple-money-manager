import { FileBase, FileProps } from "shared/fileHandler/FileBase";
import { FileDto } from "./FileDTO";
import { Result } from "domain/shared/logic/Result";




/**
 * because it's an interface for external service.
 * so there will be no Result wrapper as return value.
 * it better to use try catch to handle external .
 */
export interface IFileService<TFileClass extends FileBase<any>> {
  // type TFileClass = FileBase<TFileClass>;

  getFileById(fileId: string): Promise<TFileClass | null>;
  getFilesByIds(fileIds: string[]): Promise<TFileClass[] | null >;

  removeFileById(fileId: string): Promise<TFileClass | null >;
  removeFilesByIds(fileIds: string[]): Promise<TFileClass[] | null >;

  exists(file: string): boolean;
  existsPromise(file: string): Promise<boolean>;

  // save when in controller
  save<TFileDto extends FileDto>(file: any): Promise<TFileDto>
}