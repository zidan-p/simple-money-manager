import { CategoryFileDto } from "application/modules/ledger/dtos/CategoryFileDto";
import { IFileProvider } from "shared/fileHandler/IFileProvider";
import { IFileService } from "shared/fileHandler/IFileService";








export interface ICategoryFileInterceptor extends IFileProvider<CategoryFileDto>{};