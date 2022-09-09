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
  PdfImage,
} from '@components';
import {decompressString} from '@/library/utils';

interface PdfTemp0001HeaderProps {
  data: any;
}

export const PdfTemp0001Header = ({data}: PdfTemp0001HeaderProps) => {
  const headerTitleCSS = useRef<any>({});
  const headerMainBoxCSS = useRef<any>({});
  const imageCSS = useRef<any>({});
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
  if (data.header?.logoCSS) {
    try {
      imageCSS.current = eval('({' + data.header?.logoCSS + '})');
    } catch (e) {
      imageCSS.current = {};
    }
  }

  return (
    <PdfHeader
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        ...headerMainBoxCSS.current,
      }}
      fixed
    >
      <PdfImage
        src={decompressString(data.header?.logoUrl || '')}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginHorizontal: 10,
          ...imageCSS.current,
        }}
      />
      <PdfHeading style={headerTitleCSS.current}>
        {data.header?.title || 'Title'}
      </PdfHeading>
    </PdfHeader>
  );
};
