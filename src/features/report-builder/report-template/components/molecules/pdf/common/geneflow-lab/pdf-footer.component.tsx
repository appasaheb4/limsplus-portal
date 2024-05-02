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
      {/* <PdfSmall>
        <PdfRegular style={{color: '#A52728'}}>Red. Address:</PdfRegular> 1310,
        Behind SBI Bank, Badshahpur, Sohna Road, Sector 66, Gurugram, Haryana -
        122101,
      </PdfSmall>
      {/* <PdfSmall>
        <PdfRegular style={{color: '#A52728'}}>Lab Address:</PdfRegular>Opp.
        Radha Krishna Mandir, Main Sohna Road, Badhshahpur, Sector 66, Gurugram,
        Haryana - 122101
      </PdfSmall> */}
      {/* <PdfSmall>
        <PdfRegular style={{color: '#A52728'}}>Phone:</PdfRegular> +91
        9810063340, 9354212163{' '}
        <PdfRegular style={{color: '#A52728'}}>Email:</PdfRegular>{' '}
        info@aarvakdiagnosticcentre.com
      </PdfSmall>
      <PdfRegular style={{color: '#A52728'}}>
        www.aarvakdiagnosticcentre.com
      </PdfRegular> */}
      <PdfImage
        src={logos.genreflowBottom}
        style={{
          width: '100%',
          height: 100,
          marginHorizontal: 10,
        }}
      />
    </PdfFooterView>
  );
};
