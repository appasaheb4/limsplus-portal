import React, { useRef } from 'react';
import {
  Page,
  Document,
  StyleSheet,
  Font,
  Image,
  View,
} from '@react-pdf/renderer';
import { decompressString } from '@/library/utils';

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

interface PdfViewerProps {
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

export const PdfViewer = ({
  width = '100%',
  height = 300,
  documentTitle = 'Template Settings',
  isToolbar = false,
  isBackgroundImage = false,
  backgroundImage,
  mainBoxCSS,
  pageSize,
  children,
}: PdfViewerProps) => {
  //const [boxCSS, setBoxCSS] = useState<any>(mainBoxCSS);
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
      <Document title={documentTitle}>
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
                src={decompressString(backgroundImage || '')}
              />
            </View>
          )}
          {children}
        </Page>
      </Document>
    </>
  );
};
