export {};
import React, {useRef} from 'react';
import {
  PdfHeading,
  PdfRegular,
  PdfPageNumber,
  PdfHeader,
  PdfSubHeader,
  PdfView,
  PdfBorderView,
  PdfFooterView,
  PdfSmall,
  PdfTable,
  PdfMedium,
} from '@components';

interface FooterProps {
  data?: any;
}

export const Footer = ({data}: FooterProps) => {
  return (
    <PdfFooterView fixed bg='white' p={5}>
      <PdfSmall>
        <PdfRegular style={{color: '#A52728'}}>Red. Address:</PdfRegular> 1310,
        Behind SBI Bank, Badshahpur, Sohna Road, Sector 66, Gurugram, Haryana -
        122101,
      </PdfSmall>
      <PdfSmall>
        <PdfRegular style={{color: '#A52728'}}>Lab Address:</PdfRegular>Opp.
        Radha Krishna Mandir, Main Sohna Road, Badhshahpur, Sector 66, Gurugram,
        Haryana - 122101
      </PdfSmall>
      <PdfSmall>
        <PdfRegular style={{color: '#A52728'}}>Phone:</PdfRegular> +91
        9810063340, 9354212163{' '}
        <PdfRegular style={{color: '#A52728'}}>Email:</PdfRegular>{' '}
        info@aarvakdiagnosticcentre.com
      </PdfSmall>
      <PdfRegular style={{color: '#A52728'}}>
        www.aarvakdiagnosticcentre.com
      </PdfRegular>
    </PdfFooterView>
  );
};
