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
import dayjs from 'dayjs';
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
  PdfSmall,
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

interface PdfPatientReportProps {
  data: any;
}

export const PdfPatientReport = observer(({data}: PdfPatientReportProps) => {
  console.log({data});

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
          <PdfRegular>{`${data?.rLabCode || ''} - ${
            data?.rLabName || ''
          }`}</PdfRegular>
          <PdfRegular>{`${data?.rLabAddress || ''}`}</PdfRegular>
          <PdfRegular>{`${data?.rLabCity || ''}`}</PdfRegular>
        </PdfView>

        <PdfBorderView mv={10}>
          <PdfView mh={0} p={0} flexDirection='row'>
            <PdfGrid cols={3}>
              <PdfRegular fontSize={11}>{`Name: ${data?.title || ''} ${
                data?.firstName || ''
              } ${data?.middleName || ''} ${data?.lastName || ''}`}</PdfRegular>
              <PdfRegular>{`Lab No: ${data?.labId || ''}`}</PdfRegular>
              <PdfRegular>{`A/c Status: ${data?.acStatus || ''}`}</PdfRegular>
              <PdfRegular>{`Age: ${data?.age || ''} ${
                data?.ageUnits || ''
              }`}</PdfRegular>
            </PdfGrid>
            <PdfGrid cols={3}>
              <PdfRegular>{`Ref By: ${data?.refBy || ''}`}</PdfRegular>
              <PdfRegular>{`Gender: ${data?.sex || ''}`}</PdfRegular>
            </PdfGrid>
            <PdfGrid cols={3}>
              <PdfSmall>{`Collected: ${dayjs(data?.collectionDate).format(
                'DD/MM/YYYY hh:mm:ss A',
              )}`}</PdfSmall>
              <PdfSmall>{`Registration: ${dayjs(data?.registrationDate).format(
                'DD/MM/YYYY hh:mm:ss A',
              )}`}</PdfSmall>
              <PdfSmall>{`Reported: ${dayjs(data?.reportedDate).format(
                'DD/MM/YYYY hh:mm:ss A',
              )}`}</PdfSmall>
              <PdfSmall>{`Report Status: ${
                data?.reportStatus || ''
              }`}</PdfSmall>
            </PdfGrid>
          </PdfView>
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
