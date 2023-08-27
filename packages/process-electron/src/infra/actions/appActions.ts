import { ImageExtensionTypes } from "shared/fileHandler/fileTypes/ImageFileType";
import { Invokeable } from "./Base/BaseInvokable";
import { maximize, minimize, onClose, openFileDialog, unmaximize } from "./appAction";
import { CLOSE, MAXIMIZE, MINIMIZE, OPEN_DIALOG_IMAGE_SELECTOR, UNMAXIMIZE, WATCH_IS_MAXIMIZE } from "./appActionNames";
import { Sendable } from "./Base/BaseSendable";
import { Retrievable, RetrievableType } from "./Base/BaseRetrievable";


// {
//   // event listener
//   name: WATCH_IS_MAXIMIZE,
//   channelType: CHANNEL_TYPE.RETRIEVEABLE,
//   handler: watchIsMaximize
// }

const invokableCollection: Invokeable<any>[] = [
  new Invokeable(
    OPEN_DIALOG_IMAGE_SELECTOR,
    openFileDialog({name: "images", extensions: [...ImageExtensionTypes]})
  )
]

const sendableCollection: Sendable<any>[] = [
  new Sendable(CLOSE,onClose),
  new Sendable(MAXIMIZE, maximize),
  new Sendable(MINIMIZE, minimize),
  new Sendable(UNMAXIMIZE, unmaximize)
]

const retrievableCOllection: Retrievable<any>[] = [
  new Retrievable(WATCH_IS_MAXIMIZE, (callback, win) => {
    win.on("maximize", () => {callback(win.isMaximized())});
    win.on("unmaximize", () => {callback(win.isMaximized())})
  })
]