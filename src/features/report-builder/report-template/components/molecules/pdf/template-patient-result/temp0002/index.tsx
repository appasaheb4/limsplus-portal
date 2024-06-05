import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import {
  PdfRegular,
  PdfView,
  PdfBorderView,
  PdfGrid,
  PdfSmall,
} from '@components';
import { observer } from 'mobx-react';
import { PdfPBTemp0001 } from '../../page-branding/temp0001/temp0001.component';
import { PdfTPRTemp0002List } from './temp0002-list.component';

interface PdfTemp0002Props {
  data: any;
  isWithHeader?: boolean;
}

export const PdfTemp0002 = observer(
  ({ data, isWithHeader = true }: PdfTemp0002Props) => {
    const { pageBranding, patientReports } = data;
    const [testBottomMarker, setTestBottomMarker] = useState<Array<any>>();
    useEffect(() => {
      const arrDetails: any = [];
      patientReports?.patientResultList?.filter(item => {
        arrDetails.push(item?.testHeader?.testBottomMarker?.details);
      });
      setTestBottomMarker(_.compact(_.uniq(arrDetails)));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientReports]);

    return (
      <PdfPBTemp0001
        data={pageBranding}
        isWithHeader={isWithHeader}
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
                  <PdfSmall>{`Lab No: ${
                    patientReports?.labId || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`A/c Status: ${
                    patientReports?.acStatus || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`Age: ${patientReports?.age || ''} ${
                    patientReports?.ageUnits || ''
                  }`}</PdfSmall>
                </PdfGrid>
                <PdfGrid cols={3} bg='transparent'>
                  <PdfSmall>{`Ref By: ${
                    patientReports?.refBy || ''
                  }`}</PdfSmall>
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
            <PdfTPRTemp0002List
              headerStyle={{ backgroundColor: 'transparent' }}
              headerFixed
              data={patientReports?.patientResultList}
            />

            {/* End of Page */}
            <PdfView
              style={{
                position: 'absolute',
                bottom: 65,
                left: 5,
                fontSize: 12,
              }}
              fixed
            >
              {testBottomMarker?.map((item, i) => (
                <PdfSmall key={i}>{` ${item}`}</PdfSmall>
              ))}
              {patientReports?.templatePatientResultLabWise?.endOfPage?.map(
                (item, i) => (
                  <PdfSmall key={i}>{` ${item?.details}`}</PdfSmall>
                ),
              )}
            </PdfView>

            {/* End of Report */}
            <PdfView alignItems='center' style={{ marginTop: 15 }}>
              <PdfRegular fontSize={13}>
                ---------------------- End of report ----------------------
              </PdfRegular>
              <PdfBorderView
                style={{ width: '100%', minHeight: 15, marginTop: 20 }}
                mh={0}
                p={0}
              >
                <PdfRegular
                  style={{
                    textDecoration: 'underline',
                    textAlign: 'center',
                  }}
                  fontSize={10}
                >
                  IMPORTANT INSTRUCTIONS
                </PdfRegular>

                <PdfView flexDirection='row' style={{ marginTop: 10 }}>
                  {patientReports?.templatePatientResultLabWise?.endOfReport?.map(
                    (item, i) => (
                      <PdfSmall key={i}>{` * ${item?.details}`}</PdfSmall>
                    ),
                  )}
                </PdfView>
              </PdfBorderView>
            </PdfView>
          </>
        }
      />
    );
  },
);
