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
  const mainBoxCSS = useRef<any>({});
  const titleCSS = useRef<any>({});
  const subTitleCSS = useRef<any>({});
  if (data.footer?.mainBoxCSS) {
    try {
      mainBoxCSS.current = eval('({' + data.footer?.mainBoxCSS + '})');
    } catch (e) {
      mainBoxCSS.current = {};
    }
  }
  if (data.footer?.titleCSS) {
    try {
      titleCSS.current = eval('({' + data.footer?.titleCSS + '})');
    } catch (e) {
      titleCSS.current = {};
    }
  }
  if (data.footer?.subTitleCSS) {
    try {
      subTitleCSS.current = eval('({' + data.footer?.subTitleCSS + '})');
    } catch (e) {
      subTitleCSS.current = {};
    }
  }

  return (
    <PdfFooterView fixed style={{...mainBoxCSS.current}}>
      <PdfSmall style={{textAlign: 'center', ...titleCSS.current}}>
        {data.footer?.title || 'Title'}
      </PdfSmall>
      <PdfSmall style={{...subTitleCSS.current}}>{`${
        data.footer?.subTitle || 'Tel: 1234'
      }`}</PdfSmall>
    </PdfFooterView>
  );
};
