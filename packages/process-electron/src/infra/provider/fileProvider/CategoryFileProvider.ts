import { CategoryFile } from "domain/ledger/categoryFile";
import { FileDto } from "shared/fileHandler/FileDTO";
import { IFileService } from "shared/fileHandler/IFileService";
import { BaseFileProvider } from "./BaseFileProvider";




export class CategoryFileProvider extends BaseFileProvider{
  /** @override field */
  public field = "category/icon"
}