export {};
import React from 'react';
import { PdfFooterView, PdfImage } from '@components';
import { logos } from '@/library/assets';

interface FooterProps {
  data?: any;
}

export const Footer = ({ data }: FooterProps) => {
  return (
    <PdfFooterView fixed bg='white'>
      <PdfImage
        src={logos.genreflowBottom}
        style={{
          width: '100%',
          height: 80,
          marginHorizontal: 10,
        }}
      />
    </PdfFooterView>
  );
};
