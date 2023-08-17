


// TODO: fix it later
export type SuccessController<T> = T;
export type FailController<T> = T;


export abstract class BaseIpcController{
  
  abstract readonly channelName : string;
  abstract readonly channelType : string;

  abstract executeImpl(request: any): Promise<any>;

  // TODO: use this vvv
  // abstract executeImpl<TReturn>(request: any): Promise<SuccessController<TReturn> | FailController<TReturn>>;

  ok(value: any){
    return value as SuccessController<any>
  }

  // TODO: make convenient logging and return value
  fail(error: any){
    return error as FailController<any>;
  }
}

