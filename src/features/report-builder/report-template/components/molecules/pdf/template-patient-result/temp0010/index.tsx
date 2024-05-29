import React, { useRef } from 'react';
import { Page, StyleSheet, Font, Document } from '@react-pdf/renderer';
import { PdfPageNumber, PdfView, PdfFooterView, PdfImage } from '@components';
import { Header } from '../../common/geneflow-lab/pdf-header.component';
import { Footer } from '../../common/geneflow-lab/pdf-footer.component';
import { PdfPatientDetails } from './pdf-patient-details.component';
import Html from 'react-pdf-html';

// Font.register({
//   family: 'arimaRegular',
//   src: '../../../assets/fonts/arima/Arima-Regular.ttf',
// });

Font.register({
  family: 'IBMPlexSans',
  fonts: [
    {
      src: '/assets/fonts/IBM_Plex_Sans/IBMPlexSans-Bold.ttf',
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    {
      src: '/assets/fonts/IBM_Plex_Sans/IBMPlexSans-Italic.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
});

// Font.register({
//   family: 'IBMPlexSansBold',
//   src: '/assets/fonts/IBM_Plex_Sans/IBMPlexSans-Bold.ttf',
//   fontWeight: 400,
// });

// Font.register({
//   family: 'IBMPlexSansBoldItalic',
//   src: '/assets/fonts/IBM_Plex_Sans/IBMPlexSans-Italic.ttf',
//   fontWeight: 400,
// });

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
  const html = content => `
  <html>
    <body>
        ${content}
    </body>
  </html>
  `;

  const stylesheet = {
    body: {
      fontSize: '8px',
    },
    p: {
      margin: 0,
      fontSize: '12px',
    },
    table: {
      border: '1px solid !important',
      marginTop: 4,
      marginBottom: 4,
    },
    td: {
      padding: 2,
    },
    strong: {
      fontFamily: 'IBMPlexSans',
      fontWeight: 'bold',
    },
    em: {
      fontFamily: 'IBMPlexSans',
      fontStyle: 'italic',
    },
    img: {
      width: 200,
      height: 200,
    },
    sup: {
      verticalAlign: 'super',
      fontSize: '8px',
    },
    sub: {
      verticalAlign: 'sub',
      fontSize: '8px',
    },
  };

  console.log({
    details: JSON.parse(patientReports?.patientResultList[0]?.result)?.result,
  });

  return (
    <>
      <Page size={pageSize} style={boxCSS.current}>
        <PdfView fixed mh={0} p={0}>
          {isWithHeader && <Header />}
        </PdfView>
        <PdfPatientDetails data={patientReports} />
        {patientReports?.patientResultList?.map((item, index) => (
          <>
            <Html stylesheet={stylesheet} key={index}>
              {html(JSON.parse(item.result).result)}
            </Html>
          </>
        ))}
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
