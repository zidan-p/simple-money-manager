import { Entity } from "../../domain/shared/base/Entity";



// i forget where i get this, maybe from multer or bus whatever 🤔
// interface file
// fieldname: 'image',
// originalname: 'Meta1.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'uploads/',
// filename: 'ed84692635f46d86c4be044f4acca667',
// path: 'uploads/ed84692635f46d86c4be044f4acca667',
// size: 25471


export interface FileProps {
  fileName: string;
  size: number; // in bytes
  extension: string;

  // content: ArrayBuffer;

  // maybe it's better to use callback for grabing file
  getFile : ()=> Promise<ArrayBuffer>
}


export abstract class FileBase<TProps extends FileProps> extends Entity<TProps>{
  
  get fileName () : string { return this.props.fileName};

  get size () : number {return this.props.size};

  get extension(): string {return this.props.extension};

  get getFile(): Promise<ArrayBuffer> {return this.props.getFile();}
}