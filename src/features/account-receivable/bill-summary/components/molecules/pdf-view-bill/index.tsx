import React, { useRef } from 'react';
import { Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import { PdfPageNumber, PdfView, PdfFooterView, PdfSmall } from '@components';
import { getHeaderAndFooterBilling } from '@/core-utils';
import dayjs from 'dayjs';
import { HeaderDetails, BillingList, AmountDetails } from './components';

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
  const { transactionHeader, billingList } = data || {};
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
          {isWithHeader && getHeaderAndFooterBilling(companyCode, {})?.header}
        </PdfView>
        {/* Header Details */}
        <HeaderDetails transactionHeader={transactionHeader} />
        <PdfSmall
          textAlign='center'
          fontFamily='IBMPlexSans'
          fontSize={14}
          style={{ marginTop: '4px' }}
        >{`Bill for the period ${dayjs(transactionHeader?.billForm).format(
          'DD-MM-YYYY',
        )} to ${dayjs(transactionHeader?.billTo)
          .add(-1, 'day')
          .format('DD-MM-YYYY')}`}</PdfSmall>

        {/* Billing List */}
        <BillingList list={billingList} />
        {/* Amount Details */}
        <AmountDetails transactionHeader={transactionHeader} />
        <PdfPageNumber style={{ textAlign: 'right' }} bottom={88} />
        <PdfFooterView fixed bg='transparent' style={{ height: 88 }} p={0}>
          {isWithHeader && getHeaderAndFooterBilling(companyCode, {})?.footer}
        </PdfFooterView>
      </Page>
    </>
  );
};
