import { ImageExtensionTypes } from "shared/fileHandler/fileTypes/ImageFileType";
import { maximize, minimize, onClose, openFileDialog, unmaximize, watchIsMaximize } from "./appAction";
import { CLOSE, MAXIMIZE, MINIMIZE, OPEN_DIALOG_IMAGE_SELECTOR, UNMAXIMIZE, WATCH_IS_MAXIMIZE } from "./appActionNames";
import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";


export type ActionProperties<THandler> = {
  readonly name: string;
  readonly channelType: string;
  readonly handler: THandler;
}

// export type ActionCollection<T> = any[] extends ActionProperties[];
export type ActionCollection<T> = T extends readonly [infer TObject]
  ? TObject extends ActionProperties<infer THandler>
    ? ActionProperties<THandler> 
    : ActionProperties<(...args: any[]) => any>
  : never


type ExtractActionSignature<T extends (...args: any) => any> = 
  // it can be promise because it is accessed by rendered
  (...param : Parameters<T>) => ReturnType<T> | Promise<ReturnType<T>>

const asActionCollection = <T extends ActionCollection<any>[] >(
  // finally, my 6 hours .....
  x: [...({readonly [K in keyof T] : T[K]})]
) => {
  return x 
}


// where are the actions palced
export const actions = asActionCollection([
  {
    name: CLOSE,
    channelType: CHANNEL_TYPE.SENDABLE,
    handler: onClose
  },
  {
    name: OPEN_DIALOG_IMAGE_SELECTOR,
    channelType: CHANNEL_TYPE.INVOKABLE,
    handler: openFileDialog({name: "images", extensions: [...ImageExtensionTypes]})
  },
  {
    name: MAXIMIZE,
    channelType: CHANNEL_TYPE.SENDABLE,
    handler: maximize
  },
  {
    name: MINIMIZE,
    channelType: CHANNEL_TYPE.SENDABLE,
    handler: minimize
  },
  {
    name: UNMAXIMIZE,
    channelType: CHANNEL_TYPE.SENDABLE,
    handler: unmaximize
  },
  {
    // event listener
    name: WATCH_IS_MAXIMIZE,
    channelType: CHANNEL_TYPE.RETRIEVEABLE,
    handler: watchIsMaximize
  }
]);

// neat
export type ActionApi = {
  [K in typeof actions[number] as K["name"]] : ExtractActionSignature<K["handler"]>
}


type ActionMeta = {
  [K in typeof actions[number] as K["name"]] : {
    name : K["name"],
    channelType : K["channelType"]
  }
}




// what a big mess
const actionsMeta : ActionMeta = {} as ActionMeta ;

actions.forEach(action => {
  actionsMeta[action.name] = {
    // @ts-ignore
    name: action.name,
    // @ts-ignore
    channelType: action.channelType
  }
})

export {actionsMeta}

console.log(actionsMeta);