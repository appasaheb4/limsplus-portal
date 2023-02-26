import React, {useRef} from 'react';
import {
  Page,
  Document,
  StyleSheet,
  Font,
  Text,
  PDFViewer,
} from '@react-pdf/renderer';
import {PdfSmall, PdfView, PdfFooterView} from '@components';
import {Header} from '../../common/aarvak-diagnostic-center/pdf-header.component';
import {Footer} from '../../common/aarvak-diagnostic-center/pdf-footer.component';
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

export const PdfTemp0005 = ({
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
        <PdfView style={{height: 100}} fixed mh={0} p={0}>
          {isWithHeader && <Header />}
        </PdfView>
        <PdfMedicialFitnessCertificate data={data?.patientReports} />
        <PdfMedicalCheckup data={data?.patientReports} />
        <PdfSmall style={{left: 20, marginTop: 5}} fixed>
          {` Registration No.: ${
            data?.patientReports?.labId?.toString() || ''
          }`}
        </PdfSmall>
        <PdfView style={{height: 20, marginTop: -5}} fixed mh={0} p={0}>
          <Text
            style={{
              fontWeight: 'normal',
              fontSize: 10,
              fontFamily: 'arimaRegular',
              lineHeight: 0,
              textAlign: 'center',
            }}
            render={({pageNumber, totalPages}) =>
              pageNumber == totalPages &&
              ' ---------------------- End of report ----------------------'
            }
          />
        </PdfView>
        <PdfFooterView fixed bg='transparent' style={{height: 90}} p={0}>
          {isWithHeader && <Footer />}
        </PdfFooterView>
      </Page>
    </>
  );
};
