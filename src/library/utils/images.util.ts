import Resizer from 'react-image-file-resizer';
export const resizeFile = (
  file,
  maxWidth = 600,
  maxHeight = 600,
  quality = 100,
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
