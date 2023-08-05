






export abstract class BaseIpcController{
  
  abstract readonly channelName : string;
  abstract readonly channelType : string;
  abstract executeImpl(request: any): Promise<any>;

  ok(value: any){
    return value
  }

  // TODO: make convenient logging and return value
  fail(error: any){
    return error;
  }
}