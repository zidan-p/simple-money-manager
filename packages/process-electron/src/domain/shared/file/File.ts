import { Entity } from "../base/Entity";



export interface FileProps {
  name: string;
  size: number; // in bytes
  type: string;
  extension: string;

  // content: ArrayBuffer;

  // maybe it's better to use callback for grabing file
  getFile : ()=> Promise<ArrayBuffer>
}


export abstract class File<TProps> extends Entity<TProps>{

}