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

interface PdfMedicialFitnessCertificateProps {
  data?: any;
}

export const PdfMedicialFitnessCertificate = observer(
  ({data}: PdfMedicialFitnessCertificateProps) => {
    return (
      <PdfView>
        <PdfSmall style={{alignSelf: 'flex-end', marginTop: -30}}>
          {'S.NO - 101'}
        </PdfSmall>
        <PdfMedium textAlign='center'>
          PERFORMA FOR MEDICIAL FITNESS CERTIFICATE FOR FOOD HANDLERS
        </PdfMedium>
        <PdfMedium textAlign='center'>(FOR THE YEAR...2022)</PdfMedium>
        <PdfRegular textAlign='center'>
          (see Para No. 10.1.2, Part-II, Schedule-4 of FSS Regulation, 2011)
        </PdfRegular>
      </PdfView>
    );
  },
);
