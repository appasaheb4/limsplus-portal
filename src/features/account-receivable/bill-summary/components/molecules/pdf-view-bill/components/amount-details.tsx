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
            { title: 'Gross Amount ₹', value: transactionHeader?.grossAmount },
            { title: 'Net Amount ₹', value: transactionHeader?.netAmount },
            {
              title: 'Misc Charges ₹',
              value: transactionHeader?.miscellaneousCharges,
            },
            {
              title: 'Other Charges ₹',
              value: transactionHeader?.allMiscCharges,
            },
            {
              title: 'Paid Amount ₹',
              value: transactionHeader?.receivedAmount,
            },
            { title: 'Balance ₹', value: transactionHeader?.balance },
          ]?.map((item, index) => (
            <>
              {Number.parseInt(item?.value) && (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    borderBottom: '1px solid #000000',
                  }}
                >
                  <PdfSmall
                    style={{
                      padding: '2px',
                      width: '100px',
                    }}
                    fontSize={12}
                  >
                    {item?.title}
                  </PdfSmall>
                  <PdfSmall
                    style={{
                      padding: '2px',
                      width: '60px',
                    }}
                    fontSize={12}
                  >
                    {`: ${item?.value}`}
                  </PdfSmall>
                </View>
              )}
            </>
          ))}
        </View>
        {/* <View style={[styles.tableCol]}>
          {[
            transactionHeader?.grossAmount || '0',
            transactionHeader?.netAmount || '0',
            transactionHeader?.miscellaneousCharges || '0',
            transactionHeader?.allMiscCharges || '0',
            transactionHeader?.receivedAmount || '0',
            transactionHeader?.balance || '0',
          ]?.map((item, index) => (
            <View key={index} style={{ borderBottom: '1px solid #000000' }}>
             
            </View>
          ))}
        </View> */}
      </PdfView>
    </PdfView>
  );
};

export default AmountDetails;
