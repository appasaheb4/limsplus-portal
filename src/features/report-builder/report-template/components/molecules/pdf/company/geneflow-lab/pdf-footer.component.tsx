export {};
import React from 'react';
import { PdfFooterView, PdfImage } from '@components';
import { logos } from '@/library/assets';

interface GeneflowLabFooterProps {
  data?: any;
}

export const GeneflowLabFooter = ({ data }: GeneflowLabFooterProps) => {
  return (
    <PdfFooterView fixed bg='#ffffff' left={2} right={2} p={0}>
      <PdfImage
        src={logos.geneflowFooter}
        style={{
          width: '100%',
        }}
      />
    </PdfFooterView>
  );
};

interface GeneflowLabFooterBillingProps {
  data?: any;
}

export const GeneflowLabFooterBilling = ({
  data,
}: GeneflowLabFooterBillingProps) => {
  return (
    <PdfFooterView fixed bg='#ffffff' left={2} right={2} p={0}>
      <PdfImage
        src={logos.geneflowFooterBilling}
        style={{
          width: '100%',
        }}
      />
    </PdfFooterView>
  );
};
