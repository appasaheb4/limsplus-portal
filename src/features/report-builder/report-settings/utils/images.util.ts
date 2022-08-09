import Resizer from 'react-image-file-resizer';
export const resizeFile = file =>
  new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      50,
      50,
      'JPEG',
      50,
      0,
      uri => {
        resolve(uri);
      },
      'base64',
    );
  });
