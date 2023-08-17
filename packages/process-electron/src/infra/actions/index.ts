import { ImageExtensionTypes } from "shared/fileHandler/fileTypes/ImageFileType";
import { onClose, openFileDialog } from "./appAction";
import { CLOSE, OPEN_DIALOG_IMAGE_SELECTOR } from "./appActionNames";


type ActionProperties = {
  name: string,
  handler: (any) => any
}[]

export const actions: ActionProperties = [
  {
    name: CLOSE,
    handler: onClose
  },
  {
    name: OPEN_DIALOG_IMAGE_SELECTOR,
    handler: openFileDialog({name: "images", extensions: [...ImageExtensionTypes]})
  }
]