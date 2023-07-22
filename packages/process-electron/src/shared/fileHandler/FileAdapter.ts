import { FileBase, FileProps } from "./FileBase";





interface IFileAdapter{
  save<TFile extends FileProps>(): FileBase<TFile>;
  get<TFile extends FileProps>(args: any) :TFile;
}