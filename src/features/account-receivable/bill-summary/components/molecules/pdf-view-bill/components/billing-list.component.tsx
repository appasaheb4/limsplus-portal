import React from 'react';
import { Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import {
  PdfPageNumber,
  PdfView,
  PdfFooterView,
  PdfMedium,
  PdfSmall,
} from '@components';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingBottom: '80pt',
  },
  table: {
    flexFlow: 1,
  },
  tableRow: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  tableCol: {
    flexDirection: 'column',
    textAlign: 'center',
  },
  border: {
    border: '1px solid #000000',
  },
  textCenter: {
    textAlign: 'center',
  },
});

const BillingList = () => {
  return (
    <PdfView mh={10} p={0} style={[styles.table]} mt={6}>
      {/* patient details */}
      <PdfView mh={0} p={0} style={styles.border}>
        <View style={[styles.tableRow]}>
          {[
            'S. No',
            'LabId',
            'Patient Name',
            'Age/Sex',
            'Doctor Code',
            'Doctor Name',
            'Registration Date',
            'Invoice Date',
            'Entered By',
          ]?.map((item, index) => (
            <View key={index} style={[styles.border, { width: '65px' }]}>
              <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
            </View>
          ))}
        </View>
        <View style={[styles.tableRow]}>
          {[
            1 || '',
            'labId' || '',
            'patientName' || '',
            'Age/Sex' || '',
            'Doctor Code' || '',
            'Doctor Name' || '',
            'Registration DAte' || '',
            'Invoice Date' || '',
            'Entered By' || '',
          ]?.map((item, index) => (
            <View
              key={index}
              style={[
                index == 0 ? styles.border : {},
                styles.border,
                { width: '65px' },
              ]}
            >
              <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
            </View>
          ))}
        </View>
      </PdfView>

      {/* Panel Details */}
      <PdfView mh={0} p={0} style={styles.border}>
        <View style={styles.tableRow}>
          {[
            '',
            'Panel Code',
            'Panel Name',
            'Gross Amount',
            'Net Amount',
            'Discount Amount',
            'Discount Per',
            'Misc. Charges',
            'Other Charges',
          ]?.map((item, index) => (
            <View
              key={index}
              style={[index !== 0 ? styles.border : {}, { width: '65px' }]}
            >
              <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
            </View>
          ))}
        </View>
        <View style={[styles.tableRow]}>
          {[
            '',
            'Panel Code',
            'Patient Name',
            'Gross Amount',
            'Net Amount',
            'Discount Amount',
            'Discount Per',
            'Misc. Charges',
            'Other Charges',
          ]?.map((item, index) => (
            <View
              key={index}
              style={[index !== 0 ? styles.border : {}, { width: '65px' }]}
            >
              <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
            </View>
          ))}
        </View>
      </PdfView>
      {/* Payment Details */}
      <PdfView mh={0} p={0} style={styles.border}>
        <View style={styles.tableRow}>
          {[
            '',
            'Action Date',
            'Payment Type',
            'Total Receivable',
            'Total Received',
            'Balance',
            'Mode Of Payment',
            'Payment Remark',
            'Status',
          ]?.map((item, index) => (
            <View
              key={index}
              style={[index !== 0 ? styles.border : {}, { width: '65px' }]}
            >
              <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
            </View>
          ))}
        </View>
        <View style={[styles.tableRow]}>
          {[
            '',
            'Action Date',
            'Payment Type',
            'Total Receivable',
            'Total Received',
            'Balance',
            'Mode Of Payment',
            'Payment Remark',
            'Status',
          ]?.map((item, index) => (
            <View
              key={index}
              style={[index !== 0 ? styles.border : {}, { width: '65px' }]}
            >
              <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
            </View>
          ))}
        </View>
      </PdfView>
    </PdfView>
  );
};

export default BillingList;
