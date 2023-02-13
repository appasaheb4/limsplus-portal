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
import {Image, View} from '@react-pdf/renderer';

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
      {data.footer?.backgroundImage && (
        <>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
            }}
            fixed={true}
          >
            <Image
              object-fit='fill'
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                objectFit: 'fill',
              }}
              source={{
                uri:
                  typeof data.footer?.backgroundImage == 'object'
                    ? data.footer?.backgroundImageBase64
                    : data.footer?.backgroundImage,
                method: 'GET',
                headers: {'Cache-Control': 'no-cache'},
                body: '',
              }}
            />
          </View>
        </>
      )}
      <PdfSmall style={{textAlign: 'center', ...titleCSS.current}}>
        {data.footer?.title || 'Title'}
      </PdfSmall>
      <PdfSmall style={{...subTitleCSS.current}}>{`${
        data.footer?.subTitle || 'Tel: 1234'
      }`}</PdfSmall>
    </PdfFooterView>
  );
};
