export {};
import React from 'react';
import { PdfFooterView, PdfImage } from '@components';
import { logos } from '@/library/assets';

interface GeneflowLabFooterProps {
  data?: any;
}

export const GeneflowLabFooter = ({ data }: GeneflowLabFooterProps) => {
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
