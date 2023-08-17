import { ImageExtensionTypes } from "shared/fileHandler/fileTypes/ImageFileType";
import { onClose, openFileDialog } from "./appAction";
import { CLOSE, OPEN_DIALOG_IMAGE_SELECTOR } from "./appActionNames";
import { CHANNEL_TYPE } from "adapters/IPC/type/channelType";


export type ActionProperties = {
  name: string,
  channelType: string,
  handler: (any) => any
}

export type ActionCollection = ActionProperties[];

type ExtractActionSignature<T extends (...args: any) => any> = 
  (...param : Parameters<T>) => ReturnType<T>

export const actions: Readonly<ActionCollection> = [
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
] as const;


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