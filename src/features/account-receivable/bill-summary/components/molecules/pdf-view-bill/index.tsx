import React, { useRef } from 'react';
import { Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import {
  PdfPageNumber,
  PdfView,
  PdfFooterView,
  PdfMedium,
  PdfSmall,
} from '@components';
import { getHeaderAndFooter } from '@/core-utils';
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

interface PdfViewBillProps {
  companyCode?: string;
  data?: any;
  isWithHeader?: boolean;
  width?: string | number;
  height?: number | string;
  documentTitle?: string;
  isToolbar?: boolean;
  isBackgroundImage?: boolean;
  backgroundImage?: string;
  pageSize?: any;
  mainBoxCSS?: any;
  children?: React.ReactNode;
}

export const PdfViewBill = ({
  companyCode = 'GENEFLOW',
  data,
  isWithHeader = true,
  mainBoxCSS,
  pageSize,
}: PdfViewBillProps) => {
  const { transactionHeader } = data || {};
  const boxCSS = useRef<any>(styles.page);
  if (mainBoxCSS) {
    try {
      boxCSS.current = eval('({' + mainBoxCSS + '})');
    } catch (e) {
      boxCSS.current = styles.page;
    }
  }

  return (
    <>
      <Page size={pageSize} style={boxCSS.current}>
        <PdfView fixed mh={0} p={0}>
          {isWithHeader && getHeaderAndFooter(companyCode, {})?.header}
        </PdfView>
        <PdfSmall
          textAlign='center'
          fontFamily='IBMPlexSans'
        >{`Bill for the period ${dayjs(transactionHeader?.billForm).format(
          'DD-MM-YYYY',
        )} to ${dayjs(transactionHeader?.billTo)
          .add(-1, 'day')
          .format('DD-MM-YYYY')}`}</PdfSmall>

        {/* table */}
        <PdfView
          flexDirection='row'
          mh={10}
          p={0}
          style={{ justifyContent: 'space-between', marginTop: '4px' }}
        >
          <PdfView style={{ height: '80px' }} mh={2} p={0}>
            <View style={[styles.table, styles.tableRow]}>
              <View style={[styles.tableCol, styles.border]}>
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
              <View style={[styles.tableCol, styles.border]}>
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
            <View style={[styles.table, styles.tableRow]}>
              <View style={[styles.tableCol, styles.border]}>
                {[
                  'Bill Date',
                  'Invoice No',
                  'Client Contact No',
                  'Bill Form',
                ]?.map((item, index) => (
                  <View key={index} style={[styles.border, { height: '100%' }]}>
                    <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
                  </View>
                ))}
              </View>
              <View style={[styles.tableCol, styles.border]}>
                {[
                  transactionHeader?.invoiceAc || '',
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
            <View style={[styles.table, styles.tableRow]}>
              <View style={[styles.tableCol, styles.border]}>
                {[
                  'Account Type',
                  'Customer Grop.',
                  'Billing On',
                  'Bill To',
                ]?.map((item, index) => (
                  <View key={index} style={[styles.border, { height: '100%' }]}>
                    <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
                  </View>
                ))}
              </View>
              <View style={[styles.tableCol, styles.border]}>
                {[
                  transactionHeader?.invoiceAc || '',
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
        </PdfView>

        <PdfPageNumber style={{ textAlign: 'right' }} bottom={88} />
        <PdfFooterView fixed bg='transparent' style={{ height: 88 }} p={0}>
          {isWithHeader && getHeaderAndFooter(companyCode, {})?.footer}
        </PdfFooterView>
      </Page>
    </>
  );
};
