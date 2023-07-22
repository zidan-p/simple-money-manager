






export abstract class BaseIpcController{

  ok(value: any){
    return value
  }

  // TODO: make convenient logging and return value
  fail(error: any){
    return error;
  }
}