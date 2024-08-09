import React from 'react';
import { PdfHeader, PdfView, PdfImage, PdfMedium, PdfSmall } from '@components';
import { logos } from '@/library/assets';

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
      {/* <PdfView style={{ marginLeft: 10, marginTop: -28 }} mh={0} p={0}>
        <PdfMedium
          fontSize={14}
          style={{ fontWeight: 'bold' }}
          fontFamily='Times-Bold'
        >
          Dr. Sachin Jain
        </PdfMedium>
        <PdfSmall>MD (Pathology)</PdfSmall>
        <PdfSmall style={{ marginTop: -4 }}>
          Post doctoral fellowship, Molecular Hematology, CMC Vellore.
        </PdfSmall>
        <PdfSmall style={{ marginTop: -4 }}>
          Fellow University of Salamanca, Spain
        </PdfSmall>
      </PdfView> */}
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
    </>
  );
};
