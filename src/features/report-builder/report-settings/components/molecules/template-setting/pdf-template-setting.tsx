import React, {useState, useRef} from 'react';
import {
  Page,
  Text,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from '@react-pdf/renderer';
import {use} from 'i18next';

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

interface PdfTemplateSettingProps {
  width?: string | number;
  height?: number;
  documentTitle?: string;
  isToolbar?: boolean;
  pageSize: any;
  mainBoxCSS?: any;
  children: React.ReactNode;
}

export const PdfTemplateSetting = ({
  width = '100%',
  height = 300,
  documentTitle = 'Template Settings',
  isToolbar = false,
  mainBoxCSS,
  pageSize,
  children,
}: PdfTemplateSettingProps) => {
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
      {isToolbar ? (
        <PDFViewer style={{width, height}} showToolbar={isToolbar}>
          <Document title={documentTitle}>
            <Page size={pageSize} style={boxCSS.current}>
              {children}
            </Page>
          </Document>
        </PDFViewer>
      ) : (
        <div>
          <PDFViewer style={{width, height}} showToolbar={isToolbar}>
            <Document title={documentTitle}>
              <Page size={pageSize} style={boxCSS.current}>
                {children}
              </Page>
            </Document>
          </PDFViewer>
        </div>
      )}
    </>
  );
};
