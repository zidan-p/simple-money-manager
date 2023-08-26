import type { PreloadType } from "@simple-money-manager/process-electron/src/infra/preload/preloadType";

// i don't know why it only can be typed using it
import {ledgerAPI} from "@simple-money-manager/process-electron/src/adapters/IPC/ledger/functionApis"
import {ActionApi} from "@simple-money-manager/process-electron/src/infra/actions/index";


// just let it run, i will be use all desktop api.
// if inthe future i want to change the layout to be viewed in web, i will think that time.
type ViewApi = ActionApi & ledgerAPI;

let _ServiceDependency: ViewApi = {} as ViewApi;
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

export function provide(dependecy: object & ViewApi): string[]{
  _ServiceDependency = dependecy;
  return Object.keys(_ServiceDependency);
}

export function inject<T extends keyof ViewApi>(serviceDependencyName: T): typeof _ServiceDependency[T]{
  if(_ServiceDependency === null || _ServiceDependency === undefined)
    return (()=>{console.error("Empty Dependency")}) as typeof _ServiceDependency[T];
  if(serviceDependencyName in _ServiceDependency)
    return _ServiceDependency[serviceDependencyName];

  return (()=>{console.error("Empty Dependency")}) as typeof _ServiceDependency[T];
}
