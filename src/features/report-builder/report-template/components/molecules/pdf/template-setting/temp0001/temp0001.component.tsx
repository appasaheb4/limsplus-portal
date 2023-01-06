import React, {useState, useRef} from 'react';
import {
  Page,
  Text,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
  Image,
  View,
} from '@react-pdf/renderer';
import {decompressString} from '@/library/utils';

Font.register({
  family: 'arimaRegular',
  src: '../../../assets/fonts/arima/Arima-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingBottom: '80pt',
  },
});

interface PdfTSTemp0001Props {
  width?: string | number;
  height?: number;
  documentTitle?: string;
  isToolbar?: boolean;
  isBackgroundImage?: boolean;
  backgroundImage?: string;
  pageSize: any;
  mainBoxCSS?: any;
  children: React.ReactNode;
}

export const PdfTSTemp0001 = ({
  width = '100%',
  height = 300,
  documentTitle = 'Template Settings',
  isToolbar = false,
  isBackgroundImage = false,
  backgroundImage = '',
  mainBoxCSS = {},
  pageSize,
  children,
}: PdfTSTemp0001Props) => {
  const boxCSS = useRef<any>(styles.page);
  if (mainBoxCSS) {
    try {
      boxCSS.current = eval('({' + mainBoxCSS + '})');
    } catch (e) {
      boxCSS.current = styles.page;
    }
  }

  return (
    <>
      {isToolbar ? (
        <Page size={pageSize} style={boxCSS.current}>
          {isBackgroundImage && (
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
                src={backgroundImage}
              />
            </View>
          )}

          {children}
        </Page>
      ) : (
        <Page size={pageSize} style={boxCSS.current}>
          {isBackgroundImage && (
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
                src={{
                  uri: backgroundImage,
                  method: 'GET',
                  headers: {'Cache-Control': 'no-cache'},
                  body: '',
                }}
              />
            </View>
          )}
          {children}
        </Page>
      )}
    </>
  );
};
