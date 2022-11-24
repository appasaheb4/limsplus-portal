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

export const PdfPatientDetails = observer(({data}: PdfPatientDetailsProps) => {
  return (
    <PdfBorderView mv={10} fixed>
      <PdfView mh={10} p={0} flexDirection='row'>
        <PdfGrid cols={3} bg='transparent'>
          <PdfSmall fontSize={11}>{'Name: MR. NITESH AHLAWAT'}</PdfSmall>
          <PdfSmall>{'Ref. By: Dr.MEENAKSHI SHUKLA'}</PdfSmall>
          <PdfSmall>{'Ref Lab: '}</PdfSmall>
        </PdfGrid>
        <PdfGrid cols={3} bg='transparent'>
          <PdfSmall>{'Sr No: 5'}</PdfSmall>
          <PdfSmall>{'Age: 27 Yrs'}</PdfSmall>
          <PdfSmall>{'Sex: Female'}</PdfSmall>
        </PdfGrid>
        <PdfGrid cols={3} bg='transparent'>
          <PdfSmall>{'Patient Id: 869876987'}</PdfSmall>
          <PdfSmall>{`Samp. Collected: ${dayjs().format(
            'DD/MM/YYYY',
          )}`}</PdfSmall>
          <PdfSmall>{`Reporting Date: ${dayjs().format(
            'DD/MM/YYYY hh:mm:ss A',
          )}`}</PdfSmall>
        </PdfGrid>
      </PdfView>
    </PdfBorderView>
  );
});
