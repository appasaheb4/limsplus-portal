import React from 'react';
import { Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import {
  PdfPageNumber,
  PdfView,
  PdfFooterView,
  PdfMedium,
  PdfSmall,
} from '@components';
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
    border: '1px solid #000000',
  },
  textCenter: {
    textAlign: 'center',
  },
});

interface BillingListProps {
  list: Array<any>;
  transactionHeader: any;
}

const BillingList = ({
  list = [],
  transactionHeader = {},
}: BillingListProps) => {
  console.log({ list });

  return (
    <>
      {list.map((item, index) => (
        <PdfView mh={10} p={0} style={[styles.table]} mt={6} key={index}>
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
                  <PdfSmall style={{ padding: '2px' }} fontFamily='IBMPlexSans'>
                    {item}
                  </PdfSmall>
                </View>
              ))}
            </View>
            <View style={[styles.tableRow]}>
              {[
                index + 1 || '',
                item?.labId || '',
                item.patientVisit?.patientName || '',
                `${item.patientVisit?.age} ${item.patientVisit?.ageUnits}/${item.patientVisit?.sex}` ||
                  '',
                item.patientVisit?.doctorId || '',
                item.patientVisit?.doctorName || '',
                dayjs(item.patientVisit?.registrationDate).format(
                  'DD-MM-YYYY',
                ) || '',
                dayjs(item?.invoiceDate).format('DD-MM-YYYY') || '',
                item?.enteredBy || '',
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
                  <PdfSmall style={{ padding: '2px' }} fontFamily='IBMPlexSans'>
                    {item}
                  </PdfSmall>
                </View>
              ))}
            </View>
            {item.transactionList?.map(tran => (
              <View style={[styles.tableRow]}>
                {[
                  '',
                  tran?.panelCode,
                  tran?.panelName,
                  tran?.grossAmount,
                  tran?.netAmount,
                  tran?.discountAmount,
                  tran?.discountPer,
                  tran?.miscellaneousCharges,
                  '', // not pickup other charges in transaction line we need update backend side
                ]?.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      index !== 0 ? styles.border : {},
                      { width: '65px' },
                    ]}
                  >
                    <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
                  </View>
                ))}
              </View>
            ))}
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
                  <PdfSmall style={{ padding: '2px' }} fontFamily='IBMPlexSans'>
                    {item}
                  </PdfSmall>
                </View>
              ))}
            </View>
            {item.paymentDetails?.map(pt => (
              <View style={[styles.tableRow]}>
                {[
                  '',
                  'Action Date',
                  pt?.acType,
                  pt?.amountPayable,
                  pt?.totalReceivedAmount,
                  pt?.balance,
                  pt?.modeOfPayment,
                  pt?.paymentRemark,
                  pt?.status,
                ]?.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      index !== 0 ? styles.border : {},
                      { width: '65px' },
                    ]}
                  >
                    <PdfSmall style={{ padding: '2px' }}>{item}</PdfSmall>
                  </View>
                ))}
              </View>
            ))}
          </PdfView>
        </PdfView>
      ))}
    </>
  );
};

export default BillingList;
