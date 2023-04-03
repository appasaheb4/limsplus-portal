import React from 'react';
import {StyleSheet} from '@react-pdf/renderer';
import {Style} from '@react-pdf/types';
import {} from '@storybook/addons';
import {PdfSmall, PdfBorderView, PdfView} from '@/library/components';

const styles = StyleSheet.create({
  table: {
    marginHorizontal: 10,
    flexFlow: 1,
  },
  tableRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  tableCellHeader: {
    margin: 2,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    margin: 2,
    fontSize: 12,
  },
  textCenter: {
    textAlign: 'center',
  },
});

interface PdfMedicalCheckupProps {
  style?: Style;
  headerStyle?: Style;
  headerFixed?: boolean;
  data?: any;
}

export const PdfMedicalCheckup = ({
  headerFixed = false,
  data,
  style,
  headerStyle,
}: PdfMedicalCheckupProps) => {
  const {medicalCheckup, physicalExamination} = data;

  return (
    <>
      {/* S.No */}
      <PdfBorderView mv={0} bw={1} style={{flexDirection: 'row'}}>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '70%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall>Medical Checkup</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '10%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>Date</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            medicalCheckup?.date || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Company/Address */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>Company/Address</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`M/S Haldiram Ethnic Foods Private Limited 
          (SPICE MALL)`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* EMP. CODE */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>EMP. CODE</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            medicalCheckup?.empCode || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Job Description */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>Job Description</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '30%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>{`${
            medicalCheckup?.jobDescription || ''
          }`}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '30%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>Department</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            medicalCheckup?.department || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Present Complaints */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>Present Complaints</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            medicalCheckup?.presentComplaint || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Past History */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>Past History</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            medicalCheckup?.pastHistory || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Smoking */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>Smoking</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '10%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>{`${
            medicalCheckup?.smoking || ''
          }`}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '40%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'></PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>Alcohol</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '10%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            medicalCheckup?.alcohol || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Other Relevant Information */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>{`Other Relevant 
          Information`}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            medicalCheckup?.otherRelInfo || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Physical Examination */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '100%',
          }}
        >
          <PdfSmall textAlign='center'>{'Physical Examination'}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Height */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>Height</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '10%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.height || ''
          }`}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '10%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>Weight</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '10%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.weight || ''
          }`}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '10%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>Pulse</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '10%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.pulse || ''
          }`}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '10%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>BP</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.bp || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Skin */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>Skin</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.skin || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Respiratory System */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>{`Respiratory
          System`}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.respiratorySystem || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Cardiovascular */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>{'Cardiovascular'}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.cardIovascular || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Nervous System */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>{'Nervous System'}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.nervousSystem || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* G.I.System */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>{'G.I.System'}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.gISystem || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Vision */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>{'Vision'}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.vision || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Hearing */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>{'Hearing'}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.hearing || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Blood Test */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>{'Blood Test'}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.bloodTest || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Final Observation */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>{'Final Observation'}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.finalObservation || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>

      {/* Final Observation */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row', borderTopWidth: 0}}
      >
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
            paddingLeft: 5,
          }}
        >
          <PdfSmall>{`Signature of
          Medical Examiner`}</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '80%',
          }}
        >
          <PdfSmall textAlign='center'>{`${
            physicalExamination?.signOfMedicalExaminer || ''
          }`}</PdfSmall>
        </PdfView>
      </PdfBorderView>
    </>
  );
};
