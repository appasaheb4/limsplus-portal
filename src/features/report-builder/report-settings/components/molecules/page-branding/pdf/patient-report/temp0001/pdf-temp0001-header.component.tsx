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

interface PdfTemp0001HeaderProps {
  data: any;
}

export const PdfTemp0001Header = ({data}: PdfTemp0001HeaderProps) => {
  console.log({image: data.header?.logo});

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
        source={data.header?.logoLocalPath}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginHorizontal: 10,
          ...imageCSS.current,
        }}
      />
      <PdfHeading style={headerTitleCSS.current}>
        {data.header?.title || 'Lims Plus'}
      </PdfHeading>
    </PdfHeader>
  );
};
