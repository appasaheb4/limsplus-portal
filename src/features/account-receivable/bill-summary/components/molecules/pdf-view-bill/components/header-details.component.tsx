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
      style={{
        justifyContent: 'space-between',
        marginTop: '4px',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        paddingTop: '2px',
        paddingBottom: '2px',
      }}
    >
      <PdfView flexDirection='row' mh={2} p={0}>
        <View style={[styles.tableCol]}>
          {[
            'Bill No: ',
            'Client Code: ',
            'Client Name: ',
            'Billing Frequency: ',
          ]?.map((item, index) => (
            <View key={index}>
              <PdfSmall>{item}</PdfSmall>
            </View>
          ))}
        </View>
        <View style={[styles.tableCol]}>
          {[
            transactionHeader?.billNo || ' ',
            transactionHeader?.corporateCode || ' ',
            transactionHeader?.corporateName || ' ',
            transactionHeader?.billingFrequency || ' ',
          ]?.map((item, index) => (
            <View key={index}>
              <PdfSmall>{item}</PdfSmall>
            </View>
          ))}
        </View>
      </PdfView>
      <PdfView flexDirection='row' mh={2} p={0}>
        <View style={[styles.tableCol]}>
          {[
            'Bill Date: ',
            'Invoice No: ',
            'Client Contact No: ',
            'Bill Form: ',
          ]?.map((item, index) => (
            <View key={index}>
              <PdfSmall>{item}</PdfSmall>
            </View>
          ))}
        </View>
        <View style={[styles.tableCol]}>
          {[
            dayjs(transactionHeader.billDate || 0).format('DD-MM-YYYY') || ' ',
            transactionHeader?.invoiceAc || ' ',
            transactionHeader?.clientContactNo || ' ',
            dayjs(transactionHeader.billForm || 0).format('DD-MM-YYYY') || ' ',
          ]?.map((item, index) => (
            <View key={index}>
              <PdfSmall>{item}</PdfSmall>
            </View>
          ))}
        </View>
      </PdfView>
      <PdfView flexDirection='row' mh={2} p={0}>
        <View style={[styles.tableCol]}>
          {[
            'Account Type: ',
            'Customer Grop.: ',
            'Billing On: ',
            'Bill To: ',
          ]?.map((item, index) => (
            <View key={index}>
              <PdfSmall>{item}</PdfSmall>
            </View>
          ))}
        </View>
        <View style={[styles.tableCol]}>
          {[
            transactionHeader?.accountType || ' ',
            transactionHeader?.customerGroup || ' ',
            transactionHeader?.billingOn || ' ',
            dayjs(transactionHeader.billTo || 0)
              .add(-1, 'day')
              .format('DD-MM-YYYY') || ' ',
          ]?.map((item, index) => (
            <View key={index}>
              <PdfSmall>{item}</PdfSmall>
            </View>
          ))}
        </View>
      </PdfView>
    </PdfView>
  );
};

export default HeaderDetails;
