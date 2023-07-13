import { Entity } from "./Entity";



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
  name: string;
  size: number; // in bytes
  encoding: string;
  type: string;
  mimetype: 'image/png';
  extension: string;

  // content: ArrayBuffer;

  // maybe it's better to use callback for grabing file
  getFile : ()=> Promise<ArrayBuffer>
}


export abstract class File<TProps> extends Entity<TProps extends FileProps>{
  
}