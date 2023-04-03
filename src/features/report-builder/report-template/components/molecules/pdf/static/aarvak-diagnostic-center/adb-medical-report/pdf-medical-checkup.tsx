import React from 'react';
import { StyleSheet} from '@react-pdf/renderer';
import {Style} from '@react-pdf/types';
import {} from '@storybook/addons';
import {
  PdfSmall,
  PdfBorderView,
  PdfView,
} from '@/library/components';

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
  data?: Array<any>;
}

export const PdfMedicalCheckup = ({
  headerFixed = false,
  data,
  style,
  headerStyle,
}: PdfMedicalCheckupProps) => {
  return (
    <>
      {/* S.No */}
      <PdfBorderView
        mv={0}
        bw={1}
        style={{flexDirection: 'row'}}
        isBreak={true}
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
          <PdfSmall>S.No :- 101</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '50%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>Medical Checkup</PdfSmall>
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
          <PdfSmall textAlign='center'>22/04/2022</PdfSmall>
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
      {/* Name */}
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
          <PdfSmall>Name</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '50%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>BIKASH HALDAR</PdfSmall>
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
          <PdfSmall textAlign='center'>Age/Sex</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
          }}
        >
          <PdfSmall textAlign='center'>18 YRS</PdfSmall>
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
            width: '50%',
            borderRightColor: 'gray',
            borderRightWidth: 1,
          }}
        >
          <PdfSmall textAlign='center'>87698798</PdfSmall>
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
          <PdfSmall textAlign='center'>Gender</PdfSmall>
        </PdfView>
        <PdfView
          mh={0}
          p={0}
          style={{
            width: '20%',
          }}
        >
          <PdfSmall textAlign='center'>MALE</PdfSmall>
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
          <PdfSmall textAlign='center'></PdfSmall>
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
          <PdfSmall textAlign='center'></PdfSmall>
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
          <PdfSmall textAlign='center'>NO ANY Complaints</PdfSmall>
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
          <PdfSmall textAlign='center'>NO</PdfSmall>
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
          <PdfSmall textAlign='center'>YES</PdfSmall>
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
          <PdfSmall textAlign='center'>Yes</PdfSmall>
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
          <PdfSmall textAlign='center'>NO</PdfSmall>
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
          <PdfSmall textAlign='center'>167 CMS</PdfSmall>
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
          <PdfSmall textAlign='center'>68 KGS</PdfSmall>
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
          <PdfSmall textAlign='center'>68/MIN</PdfSmall>
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
          <PdfSmall textAlign='center'>122/70 mmHg</PdfSmall>
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
          <PdfSmall textAlign='center'>NORMAL</PdfSmall>
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
          <PdfSmall textAlign='center'>NORMAL</PdfSmall>
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
          <PdfSmall textAlign='center'>NORMAL</PdfSmall>
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
          <PdfSmall textAlign='center'>NORMAL</PdfSmall>
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
          <PdfSmall textAlign='center'>NORMAL</PdfSmall>
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
          <PdfSmall textAlign='center'>NORMAL</PdfSmall>
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
          <PdfSmall textAlign='center'>NORMAL</PdfSmall>
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
          <PdfSmall textAlign='center'>REPORT ATTACH</PdfSmall>
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
          <PdfSmall textAlign='center'></PdfSmall>
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
          <PdfSmall textAlign='center'></PdfSmall>
        </PdfView>
      </PdfBorderView>
    </>
  );
};
