import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import {
  PdfHeading,
  PdfRegular,
  PdfMedium,
  PdfPageNumber,
  PdfHeader,
  PdfSubHeader,
  PdfView,
  PdfBorderView,
  PdfFooterView,
  PdfGrid,
  PdfSmall,
  PdfImage,
} from '@components';
import {PdfReceiptViewer} from './pdf-receipt-viewer.component';
import {PdfTransactionLineTable} from './pdf-table-transaction-line.component';
import {getAgeAndAgeUnit} from '@features/registration/utils';
import {calculateTimimg, numToWords} from '@/library/utils';
interface PdfReceiptProps {
  data: any;
}

const headerGridSpace = 120;
export const PdfReceipt = ({data}: PdfReceiptProps) => {
  const {
    labId,
    headerDetails,
    patientDetails,
    transactionLine,
    transactionHeader,
  } = data || {};

  const getAgeAndSex = value => {
    const age = calculateTimimg(
      Math.abs(dayjs(value?.split('-')[0]).diff(new Date(), 'days')),
    );
    return (
      getAgeAndAgeUnit(age).age +
      '(' +
      getAgeAndAgeUnit(age).ageUnit +
      ')' +
      ' - ' +
      value?.split('-')[1]
    );
  };

  const getAmountPayable = payload => {
    const discountChargesAmount: number =
      typeof payload?.discountCharges?.amount == 'number'
        ? Number.parseFloat(payload?.discountCharges?.amount)
        : 0;
    const amountPayable =
      Number.parseFloat(payload?.netAmount) +
      Number.parseFloat(payload?.miscellaneousCharges) -
      discountChargesAmount;
    return amountPayable;
  };
  return (
    <PdfReceiptViewer
      pageSize='A4'
      height={window.outerHeight}
      children={
        <>
          <PdfView mt={20}>
            <PdfImage style={{width: 150, height: 40}} />

            <PdfView mh={0} p={0}>
              <PdfView mt={4} mh={0} p={0} flexDirection='row'>
                <PdfSmall style={{width: headerGridSpace}}>
                  {'Regd. Office:'}
                </PdfSmall>
                <PdfSmall>
                  {' '}
                  {`${headerDetails?.registeredOffice || ''}`}{' '}
                </PdfSmall>
              </PdfView>
              <PdfView mh={0} p={0} flexDirection='row'>
                <PdfSmall style={{width: headerGridSpace}}>
                  {'Customer Care:'}
                </PdfSmall>
                <PdfSmall> {`${headerDetails?.customerCare || ''}`} </PdfSmall>
              </PdfView>
              <PdfView mh={0} p={0} flexDirection='row'>
                <PdfSmall style={{width: headerGridSpace}}>{'Email:'}</PdfSmall>
                <PdfSmall> {`${headerDetails?.email || ''}`} </PdfSmall>
              </PdfView>
              <PdfView mh={0} p={0} flexDirection='row'>
                <PdfSmall style={{width: headerGridSpace}}>
                  {'Registration Location:'}
                </PdfSmall>
                <PdfSmall>{`${
                  headerDetails?.registrationLocations || ''
                }`}</PdfSmall>
              </PdfView>
              <PdfView mh={0} p={0} flexDirection='row'>
                <PdfSmall style={{width: headerGridSpace}}>{'Phone:'}</PdfSmall>
                <PdfSmall> {`${headerDetails?.phone || ''}`} </PdfSmall>
              </PdfView>
              <PdfView mh={0} p={0} flexDirection='row'>
                <PdfSmall style={{width: headerGridSpace}}>{'Web:'}</PdfSmall>
                <PdfSmall> {`${headerDetails?.web || ''}`} </PdfSmall>
              </PdfView>
            </PdfView>

            <PdfView>
              <PdfRegular textAlign='right' fontFamily='Times-Bold'>
                {labId}
              </PdfRegular>
              <PdfRegular
                textAlign='center'
                fontSize={10}
                fontFamily='Times-Bold'
              >
                Bill of Supply/Cash Receipt
              </PdfRegular>
              <PdfSmall
                textAlign='center'
                fontFamily='Times-Italic'
                style={{textDecoration: 'underline'}}
              >
                Please bring this receipt for report collections
              </PdfSmall>
            </PdfView>

            <PdfBorderView mh={0} mv={0} bw={1}>
              <PdfView
                mh={0}
                p={0}
                flexDirection='row'
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  marginBottom: 4,
                  paddingBottom: 4,
                }}
              >
                <PdfGrid cols={2} bg='transparent'>
                  <PdfSmall>{`Invoice No: ${
                    patientDetails?.invoiceNo || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`Patient Name: ${
                    patientDetails?.patientName || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`Lab ID: ${
                    patientDetails?.labId || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`Patient ID: ${
                    patientDetails?.patientId || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`Age & Sex: ${getAgeAndSex(
                    patientDetails?.ageAndSex,
                  )}`}</PdfSmall>
                  <PdfSmall>{`Contact Number: ${
                    patientDetails?.mobileNo || ''
                  }`}</PdfSmall>
                </PdfGrid>
                <PdfGrid cols={2} bg='transparent'>
                  <PdfSmall>{`GST No: ${
                    patientDetails?.gstNo || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`Lab Code / CC Code: ${
                    patientDetails?.ccCode || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`Date & Time: ${dayjs(
                    patientDetails?.dateAndTime,
                  ).format('YYYY-MM-DD')}`}</PdfSmall>
                  <PdfSmall>{`Mode of Payment: ${
                    patientDetails?.modeOfPayment || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`SAC Code: ${
                    patientDetails?.sacCode || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`CIN No: ${
                    patientDetails?.cinNo || ''
                  }`}</PdfSmall>
                </PdfGrid>
              </PdfView>
              <PdfView mh={0} p={0} flexDirection='row'>
                <PdfGrid cols={2} bg='transparent'>
                  <PdfSmall>{`Patient Employee Code: ${
                    patientDetails?.patientEmployeeCode || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`Card No: ${
                    patientDetails?.cardNo || ''
                  }`}</PdfSmall>
                </PdfGrid>
                <PdfGrid cols={2} bg='transparent'>
                  <PdfSmall>{`Reference Doctor: ${
                    patientDetails?.refDoctor || ''
                  }`}</PdfSmall>
                  <PdfSmall>{`Corporate Code: ${
                    patientDetails?.corporateCode || ''
                  }`}</PdfSmall>
                </PdfGrid>
              </PdfView>
              <PdfView mh={0} p={0} mt={4}>
                <PdfTransactionLineTable
                  data={
                    _.map(transactionLine, o =>
                      _.pick(o, [
                        'lineId',
                        'panelCode',
                        'panelName',
                        'netAmount',
                      ]),
                    ) || []
                  }
                />
                <PdfView mh={0} p={0} mt={2} style={{}} alignItems='flex-end'>
                  <PdfSmall>
                    Total: {getAmountPayable(transactionHeader)}
                  </PdfSmall>
                  <PdfSmall>
                    Misc Charges: {transactionHeader?.miscellaneousCharges}
                  </PdfSmall>
                  <PdfSmall>
                    Other Charges:{' '}
                    {typeof transactionHeader?.discountCharges?.amount ==
                    'number'
                      ? Number.parseFloat(
                          transactionHeader?.discountCharges?.amount,
                        )
                      : 0}
                  </PdfSmall>
                  <PdfSmall>
                    Paid Amount: {transactionHeader?.receivedAmount}
                  </PdfSmall>
                  <PdfSmall fontFamily='Times-Bold'>
                    Balance: {transactionHeader?.balance}
                  </PdfSmall>
                </PdfView>
                <PdfSmall>
                  Amount Paid in Words:{' '}
                  {numToWords(transactionHeader?.receivedAmount || 0)}
                </PdfSmall>
              </PdfView>
            </PdfBorderView>
            <PdfSmall>
              This is a computer generated receipt and does not require
              signature/stamp
            </PdfSmall>
            <PdfSmall fontFamily='Times-Bold' style={{marginTop: 4}}>
              {`*Final Report Delivery Date: ${dayjs(new Date()).format(
                'YYYY-MM-DD',
              )}. *Report Collection Time: 6:00 AM to 7:30 PM`}
            </PdfSmall>

            <PdfBorderView mh={0} mv={4} bw={1}>
              <PdfSmall>
                * In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content. Lorem ipsum
                may be used as a placeholder before final copy is available.
              </PdfSmall>
            </PdfBorderView>
          </PdfView>
        </>
      }
    />
  );
};
