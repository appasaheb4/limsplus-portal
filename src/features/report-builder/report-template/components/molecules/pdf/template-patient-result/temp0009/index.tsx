import React, { useRef } from 'react';
import { Page, StyleSheet, Font } from '@react-pdf/renderer';
import { PdfPageNumber, PdfView, PdfFooterView } from '@components';
import { getHeaderAndFooter } from '@/core-utils';
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

  return (
    <>
      <Page size={pageSize} style={boxCSS.current}>
        <PdfView fixed mh={0} p={0}>
          {isWithHeader &&
            getHeaderAndFooter(companyCode, { labId: patientReports?.labId })
              ?.header}
        </PdfView>
        <PdfPatientDetails data={patientReports} />
        <PdfResultList data={patientReports?.patientResultList} />
        <PdfPageNumber style={{ textAlign: 'right' }} bottom={88} />
        <PdfFooterView fixed bg='transparent' style={{ height: 88 }} p={0}>
          {isWithHeader &&
            getHeaderAndFooter(companyCode, {
              barCode: 'https://www.limsplus.co.in',
            })?.footer}
        </PdfFooterView>
      </Page>
    </>
  );
};
