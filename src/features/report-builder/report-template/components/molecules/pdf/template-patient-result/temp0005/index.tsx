import React, {useRef} from 'react';
import {
  Page,
  Document,
  StyleSheet,
  Font,
  Text,
  PDFViewer,
} from '@react-pdf/renderer';
import {PdfSmall, PdfView} from '@components';
import {Header} from '../../common/aarvak-diagnostic-center/pdf-header.component';
import {Fotter} from '../../common/aarvak-diagnostic-center/pdf-fotter.component';
import {PdfMedicialFitnessCertificate} from './pdf-medicial-fitness-certificate';
import {PdfMedicalCheckup} from './pdf-medical-checkup';

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
  data: any;
  isWithHeaderFooter?: boolean;
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
  isWithHeaderFooter = true,
  width = '100%',
  height = '95%',
  documentTitle = 'Medical Report',
  isToolbar = false,
  isBackgroundImage = false,
  backgroundImage,
  mainBoxCSS,
  pageSize,
  children,
}: PdfTemp0005Props) => {
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
        <Header />
        <PdfMedicialFitnessCertificate data={data} />
        <PdfMedicalCheckup data={data} />
        <PdfSmall style={{left: 20, marginTop: 10}} fixed>
          {` Registration No.: ${data.labId}`}
        </PdfSmall>
        <Fotter />
      </Page>
    </>
  );
};
