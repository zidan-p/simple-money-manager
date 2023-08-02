import { Mapper } from "application/shared/utils/baseIMapper";
import { CategoryFile, CategoryFileProps } from "domain/ledger/categoryFile";
import { UniqueEntityID } from "domain/shared/base/UniqueEntityID";
import { Result } from "domain/shared/logic/Result";
import { FileDto } from "shared/fileHandler/FileDTO";



// i still don't know what to extends
export type CategoryFileDto =  FileDto & CategoryFileProps;


export class CategoryFileMap extends Mapper<CategoryFileDto>{

  public static toDomain(raw: CategoryFileDto): Result<CategoryFile>{
    const categoryFileOrError = CategoryFile.create(
      raw,
      new UniqueEntityID(raw.fieldName + "/" + raw.fileName)
    );
    if(categoryFileOrError.isFailure)
      return Result.fail<CategoryFile>(categoryFileOrError.errorValue());
    
    return Result.ok<CategoryFile>(categoryFileOrError.getValue());
  }

  public static toDTO(categoryFile: CategoryFile): CategoryFileDto{
    return{
      extension : categoryFile.extension,
      fieldName : categoryFile.fieldName,
      fileName  : categoryFile.fileName,
      size      : categoryFile.size,
      getFile   : categoryFile.getFile
    }
  }
}