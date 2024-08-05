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

interface AmountDetailsProps {
  transactionHeader: any;
}

const AmountDetails = ({ transactionHeader }: AmountDetailsProps) => {
  return (
    <PdfView
      mh={10}
      p={0}
      alignItems='flex-end'
      style={{ flex: 1, marginTop: '10px' }}
    >
      <PdfView mh={0} p={0} flexDirection='row'>
        <View style={[styles.tableCol]}>
          {[
            'Gross Amount',
            'Net Amount',
            'Misc Charges',
            'Other Charges',
            'Paid Amount',
            'Balance',
          ]?.map((item, index) => (
            <View key={index} style={[styles.border]}>
              <PdfSmall style={{ marginHorizontal: '12px', padding: '2px' }}>
                {item}
              </PdfSmall>
            </View>
          ))}
        </View>
        <View style={[styles.tableCol]}>
          {[
            transactionHeader?.grossAmount || '0',
            transactionHeader?.netAmount || '0',
            transactionHeader?.miscellaneousCharges || '0',
            transactionHeader?.allMiscCharges || '0',
            transactionHeader?.receivedAmount || '0',
            transactionHeader?.balance || '0',
          ]?.map((item, index) => (
            <View key={index} style={[styles.border]}>
              <PdfSmall style={{ marginHorizontal: '12px', padding: '2px' }}>
                {item}
              </PdfSmall>
            </View>
          ))}
        </View>
      </PdfView>
    </PdfView>
  );
};

export default AmountDetails;
