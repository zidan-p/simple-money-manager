import {ledgerAPI} from "@simple-money-manager/process-electron/src/adapters/IPC/ledger/functionApis"

// let it be an `any` object first, i can't think how it look next
let _ServiceDependency: ledgerAPI = {} as ledgerAPI;


/**
 * in the future, when this object would has been injected.
 * the object maybe look like this
 * ```
 * // async function
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

export function provide(dependecy: object & ledgerAPI): string[]{
    _ServiceDependency = dependecy;
    return Object.keys(_ServiceDependency);
}

export function inject<T extends keyof ledgerAPI>(serviceDependecyName: T): typeof _ServiceDependency[T]{
    return _ServiceDependency[serviceDependecyName];
}