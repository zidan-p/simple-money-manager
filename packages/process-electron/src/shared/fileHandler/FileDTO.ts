




export type FileDto = {
  fieldName: string; // ex: ledger/icon (it can be used as directory or group file in another file system)
  fileName: string; // the file name that creted
  size: number; // in bytes
  extension: string;
  // content: ArrayBuffer;

  // from fieldname/filename ex "ledger/icon/21JNJ29NJSJWNJEWE"
  id?: () => string;

  // maybe it's better to use callback for grabing file
  getFile : ()=> Promise<Buffer>
} 