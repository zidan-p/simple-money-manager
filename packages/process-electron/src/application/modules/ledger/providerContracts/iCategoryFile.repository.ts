import { CategoryFile } from "domain/ledger/categoryFile";
import { IFileService } from "shared/fileHandler/IFileService";






export interface ICategoryFileRepository extends IFileService<CategoryFile>{
  readonly fieldName: "category/icon";
};