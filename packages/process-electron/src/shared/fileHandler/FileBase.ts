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
  fieldName: string; // ex: ledger/icon (it can be used as directory or group file in another file system)
  fileName: string; // the file name that creted
  size: number; // in bytes
  extension: string;

  // content: ArrayBuffer;

  // maybe it's better to use callback for grabing file
  getFile : ()=> Promise<ArrayBuffer>
}

/**
 * NOTE: for performance when finding file, maybe it's better to use timestamp as file name
 * rather than uid?
 * 
 * i don't know. but for now, i'll use the uid as the file name
 */
export abstract class FileBase<TProps extends FileProps> extends Entity<TProps>{
  
  get fileName () : string { return this.props.fileName};

  get size () : number {return this.props.size};

  /**
   * @example
   * ```
   * "ledger/icon/12j3quw12we.png"
   * ```
   * that is how file id look like, it's will similar with how that file directory represent
   */
  get fileId () : string {return this.props.fieldName + "/" + this.props.fileName}

  get extension(): string {return this.props.extension};

  get getFile(): Promise<ArrayBuffer> {return this.props.getFile();}
}