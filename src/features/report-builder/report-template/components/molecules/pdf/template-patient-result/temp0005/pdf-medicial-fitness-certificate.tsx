import React from 'react';
import dayjs from 'dayjs';
import {
  PdfRegular,
  PdfMedium,
  PdfView,
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
          {`S.NO - ${data?.labId?.toString() || ''}`}
        </PdfSmall>
        <PdfMedium textAlign='center'>
          PERFORMA FOR MEDICIAL FITNESS CERTIFICATE FOR FOOD HANDLERS
        </PdfMedium>
        <PdfMedium textAlign='center'>{`(FOR THE YEAR...${dayjs().format(
          'YYYY',
        )})`}</PdfMedium>
        <PdfRegular textAlign='center'>
          (see Para No. 10.1.2, Part-II, Schedule-4 of FSS Regulation, 2011)
        </PdfRegular>
        <PdfRegular style={{marginTop: 20}}>
          {`It is certified that ${data?.name || ''} Age ${data?.age || ''} ${
            data?.ageUnit || ''
          }  Emp.Code ${
            data?.empCode || ''
          } is having employed with M/s Haldiram Ethnic Foods Private Limited, SPICE MALL coming in direct contact with food items has been carefully examined* by me on date ${
            data?.date || ''
          }.`}
        </PdfRegular>
        <PdfRegular style={{marginTop: 20}}>
          {
            'Based on the medical examination conducted, he/she is found free from any infectious or communicable diseases and then person is fit to work in the above mentioned food establishment.'
          }
        </PdfRegular>

        {/* <PdfRegular style={{marginTop: 30}}>
          {'Typhoid Vaccine Batch No.- 876876978A, Given on 22/04/2022.'}
        </PdfRegular>
        <PdfRegular>
          {'Hepatitis B Vaccine Batch No.- 8769879A, Given on 22/04/2022'}
        </PdfRegular> */}
        <PdfView alignItems='flex-end' mt={30}>
          <PdfMedium fontSize={14} fontFamily='Times-Bold'>
            Name and Signature with Seal
          </PdfMedium>
          <PdfRegular>{`of registered Medical Practitioner/
          Civil Surgeon`}</PdfRegular>
        </PdfView>
        <PdfView style={{marginTop: 40}}>
          <PdfRegular style={{textDecoration: 'underline'}}>
            Medical examination to be conducted:
          </PdfRegular>
          <PdfView mh={15}>
            <PdfRegular>1. Physical Examination</PdfRegular>
            <PdfRegular>2. Eye Test</PdfRegular>
            <PdfRegular>3. Skin examination</PdfRegular>
            <PdfRegular>
              4. Compliance with schedule of Vaccine to be inoculated against
              enteric group of diseases
            </PdfRegular>
            <PdfRegular>
              5. Any test required to confirm any communicable of infectious
              disease which the person
            </PdfRegular>
            <PdfRegular style={{marginLeft: 12}}>
              suspected to be suffering from on clinical examination.
            </PdfRegular>
          </PdfView>
        </PdfView>
      </PdfView>
    );
  },
);
