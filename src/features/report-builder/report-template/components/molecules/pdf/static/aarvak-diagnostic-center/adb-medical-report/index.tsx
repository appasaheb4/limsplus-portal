import React, { useRef } from 'react';
import { Page, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PdfSmall } from '@components';
import {
  AarvakDiagnosticCenterHeader,
  AarvakDiagnosticCenterFooter,
} from '../../../company';
import { PdfMedicialFitnessCertificate } from './pdf-medicial-fitness-certificate';
import { PdfMedicalCheckup } from './pdf-medical-checkup';

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

interface ADCMedicalReportPdfProps {
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

export const ADCMedicalReportPdf = ({
  width = '100%',
  height = 300,
  documentTitle = 'Template Settings',
  isToolbar = false,
  isBackgroundImage = false,
  backgroundImage,
  mainBoxCSS,
  pageSize,
  children,
}: ADCMedicalReportPdfProps) => {
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
          <PdfMedicialFitnessCertificate />
          <PdfMedicalCheckup />
          <PdfSmall style={{ left: 20, marginTop: 10 }} fixed>
            Registration No.: 0887687987678
          </PdfSmall>
          <AarvakDiagnosticCenterFooter />
        </Page>
      </Document>
    </>
  );
};
