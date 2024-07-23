export {};
import React from 'react';
import { PdfRegular, PdfFooterView, PdfSmall } from '@components';

interface AarvakDiagnosticCenterFooterProps {
  data?: any;
}

export const AarvakDiagnosticCenterFooter = ({
  data,
}: AarvakDiagnosticCenterFooterProps) => {
  return (
    <PdfFooterView fixed bg='white' p={5}>
      <PdfSmall>
        <PdfRegular style={{ color: '#A52728' }}>Red. Address:</PdfRegular>{' '}
        1310, Behind SBI Bank, Badshahpur, Sohna Road, Sector 66, Gurugram,
        Haryana - 122101,
      </PdfSmall>
      {/* <PdfSmall>
        <PdfRegular style={{color: '#A52728'}}>Lab Address:</PdfRegular>Opp.
        Radha Krishna Mandir, Main Sohna Road, Badhshahpur, Sector 66, Gurugram,
        Haryana - 122101
      </PdfSmall> */}
      <PdfSmall>
        <PdfRegular style={{ color: '#A52728' }}>Phone:</PdfRegular> +91
        9810063340, 9354212163{' '}
        <PdfRegular style={{ color: '#A52728' }}>Email:</PdfRegular>{' '}
        info@aarvakdiagnosticcentre.com
      </PdfSmall>
      <PdfRegular style={{ color: '#A52728' }}>
        www.aarvakdiagnosticcentre.com
      </PdfRegular>
    </PdfFooterView>
  );
};
