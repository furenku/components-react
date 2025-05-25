import { ApiImage, Breakpoint, ImageSize } from "../types/media";

export const pickImageSize = (img: 
  ApiImage, bp: Breakpoint): ImageSize | undefined => {
      
  if( ! img.sizes || ! img.sizes[bp] ) return
      
  return img.sizes[bp];

};
