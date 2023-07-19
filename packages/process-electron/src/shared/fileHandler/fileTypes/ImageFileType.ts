


/**
 *  browser suported image file type
 */
export const ImageExtensionTypes = [
  "jpg" , "jpeg" , "jfif" , "pjpeg" , "pjp" ,
"png" , "svg" , "webp" , "gif"
] as const;

export type ImageExtensionType = typeof ImageExtensionTypes[number];