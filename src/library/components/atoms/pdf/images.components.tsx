import React from 'react';
import { Image } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

interface PdfImageProps {
  src?: string | any;
  style?: Style | Style[];
  fixed?: boolean;
}

export const PdfImage = ({
  src = 'https://picsum.photos/200/300',
  style,
}: PdfImageProps) => {
  return (
    <>
      <Image
        style={{
          ...style,
        }}
        src={src}
      />
    </>
  );
};
