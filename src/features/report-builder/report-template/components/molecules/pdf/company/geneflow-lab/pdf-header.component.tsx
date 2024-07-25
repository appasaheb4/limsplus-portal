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
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        bg='white'
        fixed
      >
        <PdfImage
          src={logos.geneflowLab}
          style={{
            width: '40%',
            height: 100,
          }}
        />
        <PdfImage
          src={logos.geneflowRightTop}
          style={{
            width: '60%',
            height: 140,
          }}
        />
      </PdfHeader>
      <PdfView style={{ marginLeft: 10, marginTop: -28 }} mh={0} p={0}>
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
      </PdfView>
    </>
  );
};
