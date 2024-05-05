import React, { useRef } from 'react';
import { Page, StyleSheet, Font } from '@react-pdf/renderer';
import { PdfPageNumber, PdfView, PdfFooterView } from '@components';
import { Header } from '../../common/geneflow-lab/pdf-header.component';
import { Footer } from '../../common/geneflow-lab/pdf-footer.component';
import { PdfPatientDetails } from './pdf-patient-details.component';
import { PdfSmall } from '@/library/components';
import Html from 'react-pdf-html';

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

interface PdfTemp0010Props {
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

export const PdfTemp0010 = ({
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
}: PdfTemp0010Props) => {
  const { patientReports } = data;
  const boxCSS = useRef<any>(styles.page);
  if (mainBoxCSS) {
    try {
      boxCSS.current = eval('({' + mainBoxCSS + '})');
    } catch (e) {
      boxCSS.current = styles.page;
    }
  }

  console.log({ result: patientReports?.patientResultList });

  return (
    <>
      <Page size={pageSize} style={boxCSS.current}>
        <PdfView fixed mh={0} p={0}>
          {isWithHeader && <Header />}
        </PdfView>
        <PdfPatientDetails data={patientReports} />
        <PdfSmall
          style={{
            padding: 10,
            color: '#000000',
          }}
        >
          <Html>hi</Html>
        </PdfSmall>
        <PdfPageNumber
          style={{ textAlign: 'center', right: '45%' }}
          bottom={100}
        />
        <PdfFooterView fixed bg='transparent' style={{ height: 90 }} p={0}>
          {isWithHeader && <Footer />}
        </PdfFooterView>
      </Page>
    </>
  );
};
