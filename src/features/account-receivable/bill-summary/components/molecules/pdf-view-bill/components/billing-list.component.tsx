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
          <PdfView mh={0} p={0}>
            <View style={[styles.tableRow]}>
              {[
                { title: 'S. No', value: index + 1, width: '10%' },
                { title: 'LabId', value: item?.labId || '', width: '20%' },
                {
                  title: 'Patient Name',
                  value: item.patientVisit?.patientName || '',
                  width: '40%',
                },
                {
                  title: 'Age/Sex',
                  value:
                    `${item.patientVisit?.age} ${item.patientVisit?.ageUnits}/${item.patientVisit?.sex}` ||
                    '',
                  width: '10%',
                },
                {
                  title: 'Registration Date',
                  value:
                    dayjs(item.patientVisit?.registrationDate).format(
                      'DD-MM-YYYY',
                    ) || '',
                  width: '20%',
                },
              ]?.map((e, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'column', width: e.width }}
                >
                  <PdfSmall
                    fontFamily='IBMPlexSans'
                    fontSize={12}
                    style={{
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      paddingVertical: '4px',
                    }}
                  >
                    {e?.title}
                  </PdfSmall>
                  <PdfSmall fontSize={12}>{e?.value}</PdfSmall>
                </View>
              ))}
            </View>
          </PdfView>

          {/* Panel Details */}
          <PdfView mh={0} p={0}>
            {/* <View style={styles.tableRow}>
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
            </View> */}
            {item.transactionList?.map((tran, i) => (
              <View style={[{ marginLeft: '60px' }]}>
                <View style={[styles.tableRow]}>
                  <PdfSmall fontSize={12}>SNo: {i + 1}</PdfSmall>
                  <PdfSmall fontSize={12}>
                    {' '}
                    Panel Code: {tran?.panelCode}
                  </PdfSmall>
                  <PdfSmall fontSize={12}>
                    {' '}
                    Panel Name: {tran?.panelName}
                  </PdfSmall>

                  {/* {[
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
                ))} */}
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'column', width: '16.65%' }}>
                    <PdfSmall fontFamily='IBMPlexSans' fontSize={12}>
                      {' '}
                      Gross Amount
                    </PdfSmall>
                    <PdfSmall fontSize={12}>{tran?.grossAmount}</PdfSmall>
                  </View>
                  <View style={{ flexDirection: 'column', width: '16.65%' }}>
                    <PdfSmall fontFamily='IBMPlexSans' fontSize={12}>
                      {' '}
                      Net Amount
                    </PdfSmall>
                    <PdfSmall fontSize={12}>{tran?.netAmount}</PdfSmall>
                  </View>
                  <View style={{ flexDirection: 'column', width: '16.65%' }}>
                    <PdfSmall fontFamily='IBMPlexSans' fontSize={12}>
                      {' '}
                      Discount Amt.
                    </PdfSmall>
                    <PdfSmall fontSize={12}>{tran?.discountAmount}</PdfSmall>
                  </View>
                  <View style={{ flexDirection: 'column', width: '16.65%' }}>
                    <PdfSmall fontFamily='IBMPlexSans' fontSize={12}>
                      {' '}
                      Discount%
                    </PdfSmall>
                    <PdfSmall fontSize={12}>{tran?.discountPer}</PdfSmall>
                  </View>
                  <View style={{ flexDirection: 'column', width: '16.65%' }}>
                    <PdfSmall fontFamily='IBMPlexSans' fontSize={12}>
                      Misc. Charges
                    </PdfSmall>
                    <PdfSmall fontSize={12}>
                      {tran?.miscellaneousCharges}
                    </PdfSmall>
                  </View>
                  <View style={{ flexDirection: 'column', width: '16.65%' }}>
                    <PdfSmall fontFamily='IBMPlexSans' fontSize={12}>
                      {' '}
                      Other Charges
                    </PdfSmall>
                    <PdfSmall fontSize={12}>-</PdfSmall>
                  </View>
                </View>
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
                  dayjs(pt?.actionDate).format('DD-MM-YYYY') || '',
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
