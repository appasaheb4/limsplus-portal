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
import {Header} from './pdf-header.component';
import {Fotter} from './pdf-fotter.component';

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

interface AarvakDiagnosticCenterPdfProps {
  width?: string | number;
  height?: number;
  documentTitle?: string;
  isToolbar?: boolean;
  isBackgroundImage?: boolean;
  backgroundImage?: string;
  pageSize?: any;
  mainBoxCSS?: any;
  children?: React.ReactNode;
}

export const AarvakDiagnosticCenterPdf = ({
  width = '100%',
  height = 300,
  documentTitle = 'Template Settings',
  isToolbar = false,
  isBackgroundImage = false,
  backgroundImage,
  mainBoxCSS,
  pageSize,
  children,
}: AarvakDiagnosticCenterPdfProps) => {
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
          <Header />
          <Fotter />
        </Page>
      </Document>
    </>
  );
};
