import React, { useRef } from 'react';
import { Page, StyleSheet, Font, Text } from '@react-pdf/renderer';
import { PdfSmall, PdfView, PdfFooterView } from '@components';
import {
  AarvakDiagnosticCenterHeader,
  AarvakDiagnosticCenterFooter,
} from '../../company';
import { PdfMedicalCheckup } from './pdf-medical-checkup';
import { PdfPatientDetails } from './pdf-patient-details.component';

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

interface PdfTemp0006Props {
  data: any;
  isWithHeader?: boolean;
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

export const PdfTemp0006 = ({
  data,
  isWithHeader = true,
  width = '100%',
  height = '95%',
  documentTitle = 'Medical Report',
  isToolbar = false,
  isBackgroundImage = false,
  backgroundImage,
  mainBoxCSS,
  pageSize,
  children,
}: PdfTemp0006Props) => {
  const { patientReports } = data;

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
      <Page size={pageSize} style={boxCSS.current}>
        <PdfView style={{ height: 100 }} mh={0} p={0}>
          {isWithHeader && <AarvakDiagnosticCenterHeader />}
        </PdfView>
        <PdfPatientDetails data={patientReports} />
        <PdfMedicalCheckup data={data?.patientReports} />
        <PdfSmall style={{ left: 20, marginTop: 5 }}>
          {` Registration No.: ${
            data?.patientReports?.labId?.toString() || ''
          }`}
        </PdfSmall>
        <PdfView style={{ height: 20, marginTop: -5 }} mh={0} p={0}>
          <Text
            style={{
              fontWeight: 'normal',
              fontSize: 10,
              fontFamily: 'arimaRegular',
              lineHeight: 0,
              textAlign: 'center',
            }}
            render={({ pageNumber, totalPages }) =>
              pageNumber == totalPages &&
              ' ---------------------- End of report ----------------------'
            }
          />
        </PdfView>
        <PdfFooterView fixed bg='transparent' style={{ height: 90 }} p={0}>
          {isWithHeader && <AarvakDiagnosticCenterFooter />}
        </PdfFooterView>
      </Page>
    </>
  );
};
