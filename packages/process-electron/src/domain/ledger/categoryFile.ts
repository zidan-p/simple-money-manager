import { UniqueEntityID } from "domain/shared/base/UniqueEntityID";
import { GuardBoolean } from "domain/shared/logic/GuardBoolean";
import { Result } from "domain/shared/logic/Result";
import { FileBase } from "shared/fileHandler/FileBase";
import { ImageExtensionType, ImageExtensionTypes } from "shared/fileHandler/fileTypes/ImageFileType";




// fieldname: 'image',
// originalname: 'Meta1.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'uploads/',
// filename: 'ed84692635f46d86c4be044f4acca667',
// path: 'uploads/ed84692635f46d86c4be044f4acca667',
// size: 25471


export interface CategoryFileProps {
  
  fieldName: "category/icon";
  fileName: string;
  size: number;
  extension: ImageExtensionType;
  getFile : ()=> Promise<ArrayBuffer>
}

export class CategoryFile extends FileBase<CategoryFileProps> {
  
  get fieldName(){return this.props.fieldName};

  get fileName(){return this.props.fieldName};

  get size(): number{ return this.props.size};

  get extension(): ImageExtensionType{ return this.props.extension}

  async fileObject(): Promise<ArrayBuffer> {
    const fileObject =  await this.props.getFile();
    return fileObject;
  }

  private constructor(props: CategoryFileProps, id?: UniqueEntityID){
    super(props, id);
  }

  public static create(props: CategoryFileProps, id?: UniqueEntityID): Result<CategoryFile>{
    // check if extension is match
    if(!GuardBoolean.include<string>(props.extension, ImageExtensionTypes))
      return Result.fail<CategoryFile>("the file extension didn't match");
    
    const categoryFile = new CategoryFile(props, id);

    return Result.ok<CategoryFile>(categoryFile);
  }

}