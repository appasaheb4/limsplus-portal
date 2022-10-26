import Resizer from 'react-image-file-resizer';
export const resizeFile = (
  file,
  maxWidth = 50,
  maxHeight = 50,
  quality = 50,
  rotation = 0,
) =>
  new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'JPEG',
      quality,
      rotation,
      uri => {
        resolve(uri);
      },
      'base64',
    );
  });
