import React, {useState} from 'react';
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
  PdfTable,
} from '@components';
import {observer} from 'mobx-react';

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

interface PdfPatientReportProps {
  data: any;
}

export const PdfPatientReport = observer(({data}: PdfPatientReportProps) => {
  console.log({data});

  const fields = [
    {
      title: 'Test Name',
      width: '40',
    },
    {
      title: 'Results',
      width: '20',
    },
    {
      title: 'Units',
      width: '20',
    },
    {
      title: 'Bio. Ref. Interval',
      width: '20',
    },
  ];

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Header */}
        <PdfHeader fixed>
          <PdfHeading> LimsPlus Solutions Private Limited</PdfHeading>
        </PdfHeader>
        <PdfSubHeader fixed>
          <PdfRegular>Regd. Office: Dr Lal Pathlabs Ltd.</PdfRegular>
          <PdfRegular>
            Web: www.limsplus.com CIN No: 9867987FDLKAJ987987
          </PdfRegular>
        </PdfSubHeader>

        {/* Address */}
        <PdfView fixed>
          <PdfRegular>{`${data?.rLabCode || ''} - ${
            data?.rLabName || ''
          }`}</PdfRegular>
          <PdfRegular>{`${data?.rLabAddress || ''}`}</PdfRegular>
          <PdfRegular>{`${data?.rLabCity || ''}`}</PdfRegular>
        </PdfView>

        {/* Patient Details */}
        <PdfBorderView mv={10} fixed>
          <PdfView mh={0} p={0} flexDirection='row'>
            <PdfGrid cols={3}>
              <PdfSmall fontSize={11}>{`Name: ${data?.title || ''} ${
                data?.firstName || ''
              } ${data?.middleName || ''} ${data?.lastName || ''}`}</PdfSmall>
              <PdfSmall>{`Lab No: ${data?.labId || ''}`}</PdfSmall>
              <PdfSmall>{`A/c Status: ${data?.acStatus || ''}`}</PdfSmall>
              <PdfSmall>{`Age: ${data?.age || ''} ${
                data?.ageUnits || ''
              }`}</PdfSmall>
            </PdfGrid>
            <PdfGrid cols={3}>
              <PdfSmall>{`Ref By: ${data?.refBy || ''}`}</PdfSmall>
              <PdfSmall>{`Gender: ${data?.sex || ''}`}</PdfSmall>
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

        {/* Table */}
        <PdfTable headerFixed fields={fields} data={data?.patientResultList} />
        {/* Page Number */}
        <PdfPageNumber />

        {/* Footer */}
        <PdfFooterView fixed>
          <PdfSmall textAlign='center'>
            {' '}
            If test results are alarming or unexpected, client is advised to
            contact the Customer Care immediately for possible remedial action.
          </PdfSmall>
          <PdfSmall>
            <b>Tel</b>:+91 9818162255, <b>E-mail</b>: limsplus@gmail.com
          </PdfSmall>
        </PdfFooterView>
      </Page>
    </Document>
  );
});
