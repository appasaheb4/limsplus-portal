import React from 'react';
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
  PdfTable,
} from '@components';
import {observer} from 'mobx-react';
import {PdfTemp0001} from '@/features/report-builder/report-settings/components';

interface PdfPatientReportProps {
  data: any;
}

export const PdfPatientReport = observer(({data}: PdfPatientReportProps) => {
  const {pageBranding, patientReports} = data;
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
    <PdfTemp0001
      data={pageBranding}
      children={
        <>
          {/* Address */}
          <PdfView fixed>
            <PdfRegular>{`${patientReports?.rLabCode || ''} - ${
              patientReports?.rLabName || ''
            }`}</PdfRegular>
            <PdfRegular>{`${patientReports?.rLabAddress || ''}`}</PdfRegular>
            <PdfRegular>{`${patientReports?.rLabCity || ''}`}</PdfRegular>
          </PdfView>

          {/* Patient Details */}
          <PdfBorderView mv={10} fixed>
            <PdfView mh={0} p={0} flexDirection='row'>
              <PdfGrid cols={3}>
                <PdfSmall fontSize={11}>{`Name: ${
                  patientReports?.title || ''
                } ${patientReports?.firstName || ''} ${
                  patientReports?.middleName || ''
                } ${patientReports?.lastName || ''}`}</PdfSmall>
                <PdfSmall>{`Lab No: ${patientReports?.labId || ''}`}</PdfSmall>
                <PdfSmall>{`A/c Status: ${
                  patientReports?.acStatus || ''
                }`}</PdfSmall>
                <PdfSmall>{`Age: ${patientReports?.age || ''} ${
                  patientReports?.ageUnits || ''
                }`}</PdfSmall>
              </PdfGrid>
              <PdfGrid cols={3}>
                <PdfSmall>{`Ref By: ${patientReports?.refBy || ''}`}</PdfSmall>
                <PdfSmall>{`Gender: ${patientReports?.sex || ''}`}</PdfSmall>
              </PdfGrid>
              <PdfGrid cols={3}>
                <PdfSmall>{`Collected: ${dayjs(
                  patientReports?.collectionDate,
                ).format('DD/MM/YYYY hh:mm:ss A')}`}</PdfSmall>
                <PdfSmall>{`Registration: ${dayjs(
                  patientReports?.registrationDate,
                ).format('DD/MM/YYYY hh:mm:ss A')}`}</PdfSmall>
                <PdfSmall>{`Reported: ${dayjs(
                  patientReports?.reportedDate,
                ).format('DD/MM/YYYY hh:mm:ss A')}`}</PdfSmall>
                <PdfSmall>{`Report Status: ${
                  patientReports?.reportStatus || ''
                }`}</PdfSmall>
              </PdfGrid>
            </PdfView>
          </PdfBorderView>

          {/* Table */}
          <PdfTable
            headerFixed
            fields={fields}
            data={_.map(patientReports?.patientResultList, o =>
              _.pick(o, ['testName', 'result', 'units', 'bioRefInterval']),
            )}
          />
        </>
      }
    />
  );
});
