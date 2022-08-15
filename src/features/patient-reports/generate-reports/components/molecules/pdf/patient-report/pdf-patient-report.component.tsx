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
} from '@components';
import {observer} from 'mobx-react';
import {PdfTemp0001} from '@/features/report-builder/report-settings/components';
import {PdfPatientResultList} from './pdf-patient-result-list.component';

interface PdfPatientReportProps {
  data: any;
}

export const PdfPatientReport = observer(({data}: PdfPatientReportProps) => {
  const {pageBranding, patientReports} = data;

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
              <PdfGrid cols={3} bg='transparent'>
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
              <PdfGrid cols={3} bg='transparent'>
                <PdfSmall>{`Ref By: ${patientReports?.refBy || ''}`}</PdfSmall>
                <PdfSmall>{`Gender: ${patientReports?.sex || ''}`}</PdfSmall>
              </PdfGrid>
              <PdfGrid cols={3} bg='transparent'>
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
          <PdfPatientResultList
            headerStyle={{backgroundColor: 'transparent'}}
            headerFixed
            data={patientReports?.patientResultList}
          />
        </>
      }
    />
  );
});
