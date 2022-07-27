import React, {useEffect} from 'react';
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import {
  PdfHeading,
  PdfRegular,
  PdfMedium,
  PdfPageNumber,
  PdfHeader,
  PdfSubHeader,
  PdfView,
  PdfBorderView,
  PdfFooterView,
  PdfGrid,
} from '@components';
import {observer} from 'mobx-react';

Font.register({
  family: 'arimaRegular',
  src: '../../../assets/fonts/arima/Arima-Regular.ttf',
});
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
});

export const PDFSampleDemo = observer(() => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Header */}
        <PdfHeader>
          <PdfHeading> LimsPlus Solutions Private Limited</PdfHeading>
        </PdfHeader>
        <PdfSubHeader>
          <PdfRegular>Regd. Office: Dr Lal Pathlabs Ltd.</PdfRegular>
          <PdfRegular>
            Web: www.limsplus.com CIN No: 9867987FDLKAJ987987
          </PdfRegular>
        </PdfSubHeader>
        {/* Address */}
        <PdfView>
          <PdfRegular>S - 59 - LPL - TILAK NAGAR</PdfRegular>
          <PdfRegular>4B/13, NEAR METRO PILLAR NO.494, TILAK N</PdfRegular>
          <PdfRegular>AGAR, NEW DELHI - 110018</PdfRegular>
          <PdfRegular>DELHI</PdfRegular>
        </PdfView>

        <PdfBorderView>
          <PdfRegular>Name: MR. Appasaheb Lakade</PdfRegular>
          <PdfRegular>Name: MR. Appasaheb Lakade</PdfRegular>
          <PdfRegular>Name: MR. Appasaheb Lakade</PdfRegular>
          <PdfRegular>Name: MR. Appasaheb Lakade</PdfRegular>
          <PdfRegular>Name: MR. Appasaheb Lakade</PdfRegular>
        </PdfBorderView>

        {/* Page Number */}
        <PdfPageNumber />
        <PdfFooterView>
          <PdfMedium textAlign='center'>
            {' '}
            If test results are alarming or unexpected, client is advised to
            contact the Customer Care immediately for possible remedial action.
          </PdfMedium>
          <PdfMedium>
            <b>Tel</b>:+91 9818162255, <b>E-mail</b>: limsplus@gmail.com
          </PdfMedium>
        </PdfFooterView>
      </Page>
    </Document>
  );
});
