import { ImageExtensionTypes } from "shared/fileHandler/fileTypes/ImageFileType";
import { onClose, openFileDialog } from "./appAction";
import { CLOSE, OPEN_DIALOG_IMAGE_SELECTOR } from "./appActionNames";
import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";


export type ActionProperties<THandler> = {
  name: string;
  channelType: string;
  handler: THandler;
}

// export type ActionCollection<T> = any[] extends ActionProperties[];
export type ActionCollection<T> = T extends readonly [infer TObject]
  ? TObject extends ActionProperties<infer THandler>
  ? ActionProperties<THandler>
  : ActionProperties<(...args: any[]) => any>
  : never


type ExtractActionSignature<T extends (...args: any) => any> = 
  (...param : Parameters<T>) => ReturnType<T>

const asActionCollection = <T extends ActionCollection<any>[]>(x: T) => {
  return x 
}

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
  }
]);

const aqwer = actions[0]["handler"]
// export const actions : ActionCollection<typeof actions> = [
//   {
//     name: CLOSE,
//     channelType: CHANNEL_TYPE.SENDABLE,
//     handler: onClose
//   },
//   {
//     name: OPEN_DIALOG_IMAGE_SELECTOR,
//     channelType: CHANNEL_TYPE.INVOKABLE,
//     handler: openFileDialog({name: "images", extensions: [...ImageExtensionTypes]})
//   }
// ] as const;

///////////////////////////////////////
function createAThing<TData>(obj: object){
  console.log(obj);
}
createAThing({hello: " hali"})

type ASomethingType<TGeneric> = {
  data: TGeneric
}

const aThingGeneric: ASomethingType = {
  data: "hello"
}

const testFunction = <T>(x : T) =>{
  return x;
}

let assw = testFunction("string")

///////////////////////////////////////

const accrt = actions[0]["handler"];

const acct = [
  {
    name: CLOSE,
    channelType: CHANNEL_TYPE.SENDABLE,
    handler: onClose
  }
]

type qwer =   typeof acct[0]["handler"]

// what a mess
export type ActionApi = {
  close: ExtractActionSignature<typeof actions[0]["handler"]>,
  openDialogImageSelector: ExtractActionSignature<typeof actions[1]["handler"]>
}

// metadata for each action
export const actionsMeta = {
  close: {
    name: CLOSE,
    channelType: CHANNEL_TYPE.SENDABLE
  },
  openDialogImageSelector: {
    name: OPEN_DIALOG_IMAGE_SELECTOR,
    channelType: CHANNEL_TYPE.INVOKABLE
  }
}