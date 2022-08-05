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
} from '@components';

interface PdfTemp0001FooterProps {
  data: any;
}

export const PdfTemp0001Footer = ({data}: PdfTemp0001FooterProps) => {
  const headerTitleCSS = useRef<any>({});
  const headerMainBoxCSS = useRef<any>({});
  if (data.header?.titleCSS) {
    try {
      headerTitleCSS.current = eval('({' + data.header?.titleCSS + '})');
    } catch (e) {
      headerTitleCSS.current = {};
    }
  }
  if (data.header?.mainBoxCSS) {
    try {
      headerMainBoxCSS.current = eval('({' + data.header?.mainBoxCSS + '})');
    } catch (e) {
      headerMainBoxCSS.current = {};
    }
  }

  return (
    <PdfFooterView fixed>
      <PdfSmall textAlign='center'>
        {' '}
        If test results are alarming or unexpected, client is advised to contact
        the Customer Care immediately for possible remedial action.
      </PdfSmall>
      <PdfSmall>
        <b>Tel</b>:+91 9818162255, <b>E-mail</b>: limsplus@gmail.com
      </PdfSmall>
    </PdfFooterView>
  );
};
