export {};
import React from 'react';
import { PdfFooterView, PdfImage } from '@components';
import { logos } from '@/library/assets';
import { getBarCode, getQRCode } from '@/core-utils';

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
      {data?.barCode && (
        <PdfImage
          src={getQRCode(data?.barCode)}
          style={{
            position: 'absolute',
            right: 10,
            bottom: 50,
            height: 40,
          }}
        />
      )}
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
