import React from 'react';
import {
  PdfHeader,
  PdfView,
  PdfImage,
  PdfMedium,
} from '@components';
import {logos} from '@/library/assets';

interface HeaderProps {
  data?: any;
}

export const Header = ({data}: HeaderProps) => {
  return (
    <PdfHeader
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      bg='white'
      fixed
    >
      <PdfImage
        src={logos.aarvakDiagnosticCenter}
        style={{
          width: 100,
          height: 100,
          marginHorizontal: 10,
        }}
      />
      <PdfView mh={0} p={0}>
        <PdfMedium fontSize={14} style={{color: 'green'}}>
          Committed to provide
        </PdfMedium>
        <PdfMedium style={{marginTop: -4}}>
          <PdfMedium style={{color: '#A52728'}}>Best Diagnostic </PdfMedium>
          Services<PdfMedium style={{color: 'green'}}>+</PdfMedium>
        </PdfMedium>
      </PdfView>
    </PdfHeader>
  );
};
