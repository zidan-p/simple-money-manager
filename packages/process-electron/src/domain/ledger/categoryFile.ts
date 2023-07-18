import { FileBase } from "shared/fileHandler/FileBase";




// fieldname: 'image',
// originalname: 'Meta1.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'uploads/',
// filename: 'ed84692635f46d86c4be044f4acca667',
// path: 'uploads/ed84692635f46d86c4be044f4acca667',
// size: 25471


export interface CategoryFileProps {
  
  fileName: string;
  size: number;
  encoding: string;
  extension: string;
  getFile : ()=> Promise<ArrayBuffer>
}

export class CategoryFile extends FileBase<CategoryFileProps> {
  

}