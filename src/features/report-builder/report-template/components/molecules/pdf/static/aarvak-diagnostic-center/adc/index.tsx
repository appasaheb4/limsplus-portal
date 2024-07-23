import React, { useRef } from 'react';
import { Page, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PdfPageNumber } from '@components';
import {
  AarvakDiagnosticCenterHeader,
  AarvakDiagnosticCenterFooter,
} from '../../../company';
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

interface ADCPdfProps {
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

export const ADCPdf = ({
  width = '100%',
  height = 300,
  documentTitle = 'Template Settings',
  isToolbar = false,
  isBackgroundImage = false,
  backgroundImage,
  mainBoxCSS,
  pageSize,
  children,
}: ADCPdfProps) => {
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
          <AarvakDiagnosticCenterHeader />
          <PdfPatientDetails />
          <PdfResultList />
          <PdfPageNumber
            style={{ textAlign: 'center', right: '45%' }}
            bottom={77}
          />
          <AarvakDiagnosticCenterFooter />
        </Page>
      </Document>
    </>
  );
};
