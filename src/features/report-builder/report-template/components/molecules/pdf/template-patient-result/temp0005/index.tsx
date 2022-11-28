import React, {useRef} from 'react';
import {Page, Document, StyleSheet, Font, PDFViewer} from '@react-pdf/renderer';
import {PdfPageNumber, PdfView} from '@components';
import {Header} from '../../common/aarvak-diagnostic-center/pdf-header.component';
import {Fotter} from '../../common/aarvak-diagnostic-center/pdf-fotter.component';
import {PdfPatientDetails} from './pdf-patient-details.component';
import {PdfResultList} from './pdf-result-list.component';

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

interface PdfTemp0005Props {
  data?: any;
  width?: string | number;
  height?: number | string;
  documentTitle?: string;
  isToolbar?: boolean;
  isBackgroundImage?: boolean;
  backgroundImage?: string;
  pageSize?: any;
  mainBoxCSS?: any;
  children?: React.ReactNode;
}

export const PdfTemp0005 = ({
  data,
  width = '100%',
  height = '90%',
  documentTitle = 'Aarvak Diagnostic Center Without Header Footer',
  isToolbar = true,
  isBackgroundImage = false,
  backgroundImage,
  mainBoxCSS,
  pageSize,
  children,
}: PdfTemp0005Props) => {
  const {patientReports} = data;

  return (
    <>
      <PDFViewer style={{width, height}} showToolbar={isToolbar}>
        <Document title={documentTitle}>
          <Page size={pageSize} style={{marginVertical: 100}}>
            <PdfPatientDetails data={patientReports} />
            <PdfResultList data={patientReports?.patientResultList} />
            <PdfPageNumber
              style={{
                position: 'absolute',
                textAlign: 'center',
                right: '45%',
              }}
              bottom={0}
            />
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};
