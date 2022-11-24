import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
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

interface PdfPatientDetailsProps {
  data?: any;
}

export const PdfPatientDetails = observer(
  ({data: patientReports}: PdfPatientDetailsProps) => {
    return (
      <PdfBorderView mv={10} fixed>
        <PdfView mh={10} p={0} flexDirection='row'>
          <PdfGrid cols={3} bg='transparent'>
            <PdfSmall>{`Name: ${patientReports?.title || ''} ${
              patientReports?.firstName || ''
            } ${patientReports?.middleName || ''} ${
              patientReports?.lastName || ''
            }`}</PdfSmall>
            <PdfSmall>{'Ref. By: '}</PdfSmall>
            <PdfSmall>{'Ref Lab: '}</PdfSmall>
          </PdfGrid>
          <PdfGrid cols={3} bg='transparent'>
            <PdfSmall>{'Sr No: '}</PdfSmall>
            <PdfSmall>{`Age: ${patientReports?.age || ''} ${
              patientReports?.ageUnits || ''
            }`}</PdfSmall>
            <PdfSmall>{`Gender: ${patientReports?.sex || ''}`}</PdfSmall>
          </PdfGrid>
          <PdfGrid cols={3} bg='transparent'>
            <PdfSmall>{'Patient Id: '}</PdfSmall>
            <PdfSmall fontSize={9}>{`Samp. Collected: ${dayjs(
              patientReports?.collectionDate,
            ).format('DD/MM/YYYY hh:mm:ss A')}`}</PdfSmall>
            <PdfSmall fontSize={9}>{`Reported: ${dayjs(
              patientReports?.reportedDate,
            ).format('DD/MM/YYYY hh:mm:ss A')}`}</PdfSmall>
          </PdfGrid>
        </PdfView>
      </PdfBorderView>
    );
  },
);
