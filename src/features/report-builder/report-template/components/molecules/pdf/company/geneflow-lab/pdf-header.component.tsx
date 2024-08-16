import React from 'react';
import { PdfHeader, PdfView, PdfImage, PdfMedium, PdfSmall } from '@components';
import { logos } from '@/library/assets';
import { getBarCode } from '@/core-utils';

interface GeneflowLabHeaderProps {
  data?: any;
}

export const GeneflowLabHeader = ({ data }: GeneflowLabHeaderProps) => {
  return (
    <>
      <PdfHeader
        p={0}
        bg='white'
        fixed
        style={{ marginLeft: 4, marginBottom: 4 }}
      >
        <PdfImage
          src={logos.geneflowHeader}
          style={{
            width: '100%',
          }}
        />
      </PdfHeader>
      {data?.labId && (
        <PdfImage
          src={getBarCode(data?.labId)}
          style={{
            position: 'absolute',
            right: 36,
            bottom: -4,
            height: 40,
          }}
        />
      )}
    </>
  );
};

interface GeneflowLabHeaderBillingProps {
  data?: any;
}

export const GeneflowLabHeaderBilling = ({
  data,
}: GeneflowLabHeaderBillingProps) => {
  return (
    <>
      <PdfHeader
        p={0}
        bg='white'
        fixed
        style={{ marginLeft: 4, marginTop: 2, marginBottom: 4 }}
      >
        <PdfImage
          src={logos.geneflowHeaderBilling}
          style={{
            width: '100%',
          }}
        />
      </PdfHeader>
      {data?.labId && (
        <PdfImage
          src={getBarCode(data?.labId)}
          style={{
            position: 'absolute',
            right: 28,
            bottom: -20,
            height: 40,
          }}
        />
      )}
    </>
  );
};
