




// the boolean return value type

export class GuardBoolean {

  /**
   * 
   * @param propName has this property
   * @param object in this obeject
   * @returns {boolean}
   */
  public static has(propName: string, object: object): boolean{
    if(object === undefined || object === null ) return false;
    if(object[propName as keyof object] === undefined || object[propName as keyof object] === null)
      return false;
    return true
  }

  public static include<T>(arrayValue: T, array: readonly T[]): boolean{
    if(array === undefined || array === null || !Array.isArray(array)) return false;
    return array.includes(arrayValue);
  }
}