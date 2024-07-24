import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Font, Page, View } from '@react-pdf/renderer';
import { Document, pdfjs, Page as PdfPage } from 'react-pdf';
import {
  PdfPageNumber,
  PdfView,
  PdfFooterView,
  PdfImage,
  PdfSmall,
} from '@components';
import {
  GeneflowLabHeader,
  GeneflowLabFooter,
  AarvakDiagnosticCenterHeader,
  AarvakDiagnosticCenterFooter,
} from '../../company';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
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

interface PdfTemp0008Props {
  companyCode?: string;
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

export const PdfTemp0008 = ({
  companyCode = 'GENEFLOW',
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
}: PdfTemp0008Props) => {
  const { patientReports } = data;
  const [pageNumber, setPageNumber] = useState();

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
          {getCompanyWiseComp(companyCode, {})?.header}
        </PdfView>
        <PdfPatientDetails data={patientReports} />
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 90,
            alignItems: 'center',
          }}
        >
          {JSON.parse(patientReports?.patientResultList[0]?.result)?.result && (
            <PdfImage
              src={
                JSON.parse(patientReports?.patientResultList[0]?.result)?.result
              }
              style={{
                height: 'auto',
                maxWidth: 560,
              }}
            />
          )}
        </View>
        <PdfPageNumber
          style={{ textAlign: 'center', right: '45%' }}
          bottom={88}
        />
        <PdfFooterView fixed bg='transparent' height={90} p={0}>
          {getCompanyWiseComp(companyCode, {})?.footer}
        </PdfFooterView>
      </Page>
    </>
  );
};
