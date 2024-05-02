import React, { useRef } from 'react';
import { Page, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PdfPageNumber } from '@components';
import { Header } from '../../common/geneflow-lab/pdf-header.component';
import { Footer } from '../../common/geneflow-lab/pdf-footer.component';
import { PdfPatientDetails } from './pdf-patient-details.component';
import { PdfResultList } from './pdf-result-list.component';

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

interface GeneflowLabProps {
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

export const GeneflowLab = ({
  width = '100%',
  height = 300,
  documentTitle = 'Template Settings',
  isToolbar = false,
  isBackgroundImage = false,
  backgroundImage,
  mainBoxCSS,
  pageSize,
  children,
}: GeneflowLabProps) => {
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
          <PdfPatientDetails />
          <PdfResultList />
          <PdfPageNumber
            style={{
              textAlign: 'center',
              right: '45%',
              zIndex: 4,
            }}
            bottom={100}
          />
          <Footer />
        </Page>
      </Document>
    </>
  );
};
