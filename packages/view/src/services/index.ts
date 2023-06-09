
// let it be an `any` object first, i can't think how it look next
let _ServiceDependency = {};

/**
 * in ther future, when this object would has been injected.
 * the object maybe look like this
 * ```
 * _ServiceDependency = {
 *      getSomething: (id) => {
 *          //..blablabla
 *          return "hello"
 *      }
 * }
 * ```
 * 
 * you can get those function with `inject` function
 */

export function provide(dependecy: object): string[]{
    _ServiceDependency = dependecy;
    return Object.keys(_ServiceDependency);
}

export function inject(serviceDependecyName: string): any{
    return _ServiceDependency[serviceDependecyName as keyof typeof _ServiceDependency];
}