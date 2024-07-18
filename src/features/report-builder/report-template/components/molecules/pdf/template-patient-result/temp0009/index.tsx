import React, { useRef } from 'react';
import { Page, StyleSheet, Font } from '@react-pdf/renderer';
import { PdfPageNumber, PdfView, PdfFooterView } from '@components';
import {
  GeneflowLabHeader,
  GeneflowLabFooter,
  AarvakDiagnosticCenterHeader,
  AarvakDiagnosticCenterFooter,
} from '../../company';
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

interface PdfTemp0009Props {
  companyCode?: string;
  data?: any;
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

export const PdfTemp0009 = ({
  companyCode = 'GENEFLOW',
  data,
  isWithHeader = true,
  width = '100%',
  height = '90%',
  documentTitle = 'Aarvak Diagnostic Center Without',
  isToolbar = false,
  isBackgroundImage = false,
  backgroundImage,
  mainBoxCSS,
  pageSize,
  children,
}: PdfTemp0009Props) => {
  const { patientReports } = data;
  const boxCSS = useRef<any>(styles.page);
  if (mainBoxCSS) {
    try {
      boxCSS.current = eval('({' + mainBoxCSS + '})');
    } catch (e) {
      boxCSS.current = styles.page;
    }
  }

  const getCompanyWiseComp = (companyCode, details) => {
    switch (companyCode) {
      case 'GENEFLOW':
        return {
          header: <GeneflowLabHeader />,
          footer: <GeneflowLabFooter />,
        };
      case 'COMP0001':
        return {
          header: <AarvakDiagnosticCenterHeader />,
          footer: <AarvakDiagnosticCenterFooter />,
        };
      default:
        break;
    }
  };

  return (
    <>
      <Page size={pageSize} style={boxCSS.current}>
        <PdfView fixed mh={0} p={0}>
          {isWithHeader && getCompanyWiseComp(companyCode, {})?.header}
        </PdfView>
        <PdfPatientDetails data={patientReports} />
        <PdfResultList data={patientReports?.patientResultList} />
        <PdfPageNumber
          style={{ textAlign: 'center', right: '45%' }}
          bottom={100}
        />
        <PdfFooterView fixed bg='transparent' style={{ height: 90 }} p={0}>
          {isWithHeader && getCompanyWiseComp(companyCode, {})?.footer}
        </PdfFooterView>
      </Page>
    </>
  );
};
