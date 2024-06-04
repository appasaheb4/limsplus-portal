import React from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { PdfView, PdfBorderView, PdfGrid, PdfSmall } from '@components';
import { observer } from 'mobx-react';
import { getAgeUnits, getSex } from '@/core-utils';

interface PdfPatientDetailsProps {
  data?: any;
}

export const PdfPatientDetails = observer(
  ({ data: patientReports }: PdfPatientDetailsProps) => {
    return (
      <PdfBorderView mv={0} mh={10} fixed style={{ marginBottom: 6 }}>
        <PdfView mh={10} p={0} flexDirection='row'>
          <PdfGrid cols={3} bg='transparent'>
            <PdfSmall>{`Name: ${patientReports?.title || ''} ${
              patientReports?.firstName || ''
            } ${patientReports?.middleName || ''} ${
              patientReports?.lastName || ''
            }`}</PdfSmall>
            <PdfSmall>{`Ref. By: ${patientReports?.refBy}`}</PdfSmall>
            <PdfSmall>{`Ref Lab: ${patientReports?.refLab}`}</PdfSmall>
          </PdfGrid>
          <PdfGrid cols={3} bg='transparent'>
            <PdfSmall>{`Lab Id: ${patientReports?.labId?.toString()} ${
              !_.isEmpty(patientReports?.patientResult?.externalLabId)
                ? '/ ' +
                  patientReports?.patientResult?.externalLabId?.toString()
                : ''
            }`}</PdfSmall>
            <PdfSmall>{`Age: ${patientReports?.age || ''} ${
              getAgeUnits(patientReports?.ageUnits) || ''
            }`}</PdfSmall>
            <PdfSmall>{`Sex: ${getSex(patientReports?.sex) || ''}`}</PdfSmall>
          </PdfGrid>
          <PdfGrid cols={3} bg='transparent'>
            <PdfSmall>{`Patient Id: ${patientReports?.pId?.toString()}`}</PdfSmall>
            <PdfSmall fontSize={9}>{`Samp. Collected: ${dayjs(
              patientReports?.collectionDate,
            ).format('DD/MM/YYYY hh:mm:ss A')}`}</PdfSmall>
            <PdfSmall fontSize={9}>{`Reporting Date: ${dayjs(
              patientReports?.reportedDate,
            ).format('DD/MM/YYYY hh:mm:ss A')}`}</PdfSmall>
          </PdfGrid>
        </PdfView>
      </PdfBorderView>
    );
  },
);
