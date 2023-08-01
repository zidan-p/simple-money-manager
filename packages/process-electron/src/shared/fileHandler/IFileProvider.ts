import { FileDto } from "./FileDTO";





export interface IFileProvider<TFileDto extends FileDto> {
  // type TFileClass = FileBase<TFileClass>;

  getFileById(fileId: string): Promise<TFileDto | null>;
  getFilesByIds(fileIds: string[]): Promise<TFileDto[] | null >;

  removeFileById(fileId: string): Promise<TFileDto | null >;
  removeFilesByIds(fileIds: string[]): Promise<TFileDto[] | null >;

  exists(file: string): boolean;
  existsPromise(file: string): Promise<boolean>;

  // save when in controller
  save<TFileDto extends FileDto>(file: any): Promise<TFileDto>
}