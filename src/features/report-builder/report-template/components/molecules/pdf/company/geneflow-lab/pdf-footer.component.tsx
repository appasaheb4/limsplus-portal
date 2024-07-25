export {};
import React from 'react';
import { PdfFooterView, PdfImage } from '@components';
import { logos } from '@/library/assets';

interface GeneflowLabFooterProps {
  data?: any;
}

export const GeneflowLabFooter = ({ data }: GeneflowLabFooterProps) => {
  return (
    <PdfFooterView fixed bg='#ffffff' p={0}>
      <PdfImage
        src={logos.genreflowBottom}
        style={{
          width: '100%',
        }}
      />
    </PdfFooterView>
  );
};
