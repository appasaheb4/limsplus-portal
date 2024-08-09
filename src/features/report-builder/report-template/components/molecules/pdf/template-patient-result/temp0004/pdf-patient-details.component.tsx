import React from 'react';
import dayjs from 'dayjs';
import { PdfView, PdfBorderView, PdfGrid, PdfSmall } from '@components';
import { observer } from 'mobx-react';
import { getAgeUnits, getSex } from '@/core-utils';
import { pascalCase } from '@/core-utils';

interface PdfPatientDetailsProps {
  data?: any;
}

export const PdfPatientDetails = observer(
  ({ data: patientReports }: PdfPatientDetailsProps) => {
    return (
      <PdfBorderView mv={0} mh={10} fixed style={{ marginBottom: 6 }}>
        <PdfView mh={10} p={0} flexDirection='row'>
          <PdfGrid cols={3} bg='transparent'>
            <PdfSmall>{`Patient Name: ${pascalCase(
              patientReports?.name,
              true,
            )}`}</PdfSmall>
            <PdfSmall>{`Age: ${patientReports?.age || ''} ${
              getAgeUnits(patientReports?.ageUnits) || ''
            }`}</PdfSmall>
            <PdfSmall>{`Sex: ${getSex(patientReports?.sex) || ''}`}</PdfSmall>
          </PdfGrid>
          <PdfGrid cols={3} bg='transparent'>
            <PdfSmall>{`Lab Id: ${
              patientReports?.labId?.toString() || ''
            }`}</PdfSmall>
            <PdfSmall>{`Ref. By: ${patientReports?.refBy}`}</PdfSmall>
            <PdfSmall>{`Client Name: ${
              patientReports?.patientResult?.clientName || ''
            }`}</PdfSmall>
          </PdfGrid>
          <PdfGrid cols={3} bg='transparent'>
            <PdfSmall>{`External Lab Id: ${
              patientReports?.patientResult?.externalLabId?.toString() || ''
            }`}</PdfSmall>
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
