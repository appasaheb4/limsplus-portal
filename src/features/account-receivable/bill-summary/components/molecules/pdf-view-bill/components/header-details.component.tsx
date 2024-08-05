import React from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';
import { PdfView, PdfSmall } from '@components';
import dayjs from 'dayjs';

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
    border: 'transparent 1px solid #000000',
  },
  textCenter: {
    textAlign: 'center',
  },
});

interface HeaderDetailsProps {
  transactionHeader: any;
}

const HeaderDetails = ({ transactionHeader = {} }: HeaderDetailsProps) => {
  return (
    <PdfView
      flexDirection='row'
      mh={10}
      p={0}
      style={{ justifyContent: 'space-between', marginTop: '4px' }}
    >
      <PdfView style={{ height: '80px' }} mh={2} p={0}>
        <View style={[styles.table, styles.tableRow, styles.border]}>
          <View style={[styles.tableCol]}>
            {[
              'Bill No',
              'Client Code',
              'Client Name',
              'Billing Frequency',
            ]?.map((item, index) => (
              <View key={index} style={[styles.border, { height: '100%' }]}>
                <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
              </View>
            ))}
          </View>
          <View style={[styles.tableCol]}>
            {[
              transactionHeader?.billNo || '',
              transactionHeader?.corporateCode || '',
              transactionHeader?.corporateName || '',
              transactionHeader?.billingFrequency || '',
            ]?.map((item, index) => (
              <View key={index} style={[styles.border, { height: '100%' }]}>
                <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
              </View>
            ))}
          </View>
        </View>
      </PdfView>
      <PdfView style={{ height: '80px' }} mh={2} p={0}>
        <View style={[styles.table, styles.tableRow, styles.border]}>
          <View style={[styles.tableCol]}>
            {['Bill Date', 'Invoice No', 'Client Contact No', 'Bill Form']?.map(
              (item, index) => (
                <View key={index} style={[styles.border, { height: '100%' }]}>
                  <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
                </View>
              ),
            )}
          </View>
          <View style={[styles.tableCol]}>
            {[
              dayjs(transactionHeader.billDate || 0).format('DD-MM-YYYY'),
              transactionHeader?.invoiceAc || '',
              transactionHeader?.clientContactNo || '',
              dayjs(transactionHeader.billForm || 0).format('DD-MM-YYYY'),
            ]?.map((item, index) => (
              <View key={index} style={[styles.border, { height: '100%' }]}>
                <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
              </View>
            ))}
          </View>
        </View>
      </PdfView>
      <PdfView style={{ height: '80px' }} mh={2} p={0}>
        <View style={[styles.table, styles.tableRow, styles.border]}>
          <View style={[styles.tableCol]}>
            {['Account Type', 'Customer Grop.', 'Billing On', 'Bill To']?.map(
              (item, index) => (
                <View key={index} style={[styles.border, { height: '100%' }]}>
                  <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
                </View>
              ),
            )}
          </View>
          <View style={[styles.tableCol]}>
            {[
              transactionHeader?.accountType || '',
              transactionHeader?.customerGroup || '',
              transactionHeader?.billingOn || '',
              dayjs(transactionHeader.billTo || 0).format('DD-MM-YYYY') || '',
            ]?.map((item, index) => (
              <View key={index} style={[styles.border, { height: '100%' }]}>
                <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
              </View>
            ))}
          </View>
        </View>
      </PdfView>
    </PdfView>
  );
};

export default HeaderDetails;
