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
  const mainBoxCSS = useRef<any>({});
  const titleCSS = useRef<any>({});
  const subTitleCSS = useRef<any>({});
  if (data.subHeader?.mainBoxCSS) {
    try {
      mainBoxCSS.current = eval('({' + data.subHeader?.mainBoxCSS + '})');
    } catch (e) {
      mainBoxCSS.current = {};
    }
  }
  if (data.subHeader?.titleCSS) {
    try {
      titleCSS.current = eval('({' + data.subHeader?.titleCSS + '})');
    } catch (e) {
      titleCSS.current = {};
    }
  }
  if (data.subHeader?.subTitle) {
    try {
      subTitleCSS.current = eval('({' + data.subHeader?.subTitle + '})');
    } catch (e) {
      subTitleCSS.current = {};
    }
  }

  return (
    <PdfSubHeader style={{...mainBoxCSS.current}} fixed>
      <PdfRegular style={{...titleCSS.current}}>
        {data.subHeader?.title || 'Title'}
      </PdfRegular>
      <PdfRegular style={{...subTitleCSS.current}}>{`Web: ${
        data.subHeader?.subTitle || 'web-url'
      }`}</PdfRegular>
    </PdfSubHeader>
  );
};
