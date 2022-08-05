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

interface PdfTemp0001SubHeaderProps {
  data: any;
}

export const PdfTemp0001SubHeader = ({data}: PdfTemp0001SubHeaderProps) => {
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
    <PdfSubHeader fixed>
      <PdfRegular>Regd. Office: Dr Lal Pathlabs Ltd.</PdfRegular>
      <PdfRegular>Web: www.limsplus.com CIN No: 9867987FDLKAJ987987</PdfRegular>
    </PdfSubHeader>
  );
};
