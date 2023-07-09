




// the boolean return value type

export class GuardBoolean {

  /**
   * 
   * @param propName has this property
   * @param object in this obejecy
   * @returns {boolean}
   */
  public static has(propName: string, object: object): boolean{
    if(object === undefined || object === null ) return false;
    if(object[propName as keyof object] === undefined || object[propName as keyof object] === null)
      return false;
    return true
  }
}