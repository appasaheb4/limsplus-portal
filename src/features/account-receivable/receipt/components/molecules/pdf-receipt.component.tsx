import React from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import {
  PdfRegular,
  PdfView,
  PdfBorderView,
  PdfGrid,
  PdfSmall,
  PdfImage,
  PdfFooterView,
} from '@components';
import { PdfViewer } from '@/core-components';
import { PdfTransactionLineTable } from './pdf-table-transaction-line.component';
import { getAgeAndAgeUnit } from '@features/registration/patient-registration/utils';
import { calculateTimimg, numToWords } from '@/library/utils';
import { pascalCase } from '@/core-utils';
import { getHeaderAndFooterBilling } from '@/core-utils';
// import JsBarcode from 'jsbarcode';

interface PdfReceiptProps {
  companyCode?: string;
  data: any;
}

export const PdfReceipt = ({
  companyCode = 'GENEFLOW',
  data,
}: PdfReceiptProps) => {
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
      Number.parseFloat(payload?.miscellaneousCharges) +
      discountChargesAmount;
    return amountPayable;
  };

  // let canvas: any = '';
  // // For QR Code
  // // import QRCode from 'qrcode';
  // // canvas = document.createElement('canvas');
  // // QRCode.toCanvas(canvas, 'hello');
  // // const qr = canvas.toDataURL();
  // // For Barcode
  // canvas = document.createElement('canvas');
  // JsBarcode(canvas, labId, {
  //   lineColor: '#000',
  //   displayValue: true,
  //   height: 30,
  // });
  // const barcode = canvas.toDataURL();

  return (
    <PdfViewer
      pageSize='A4'
      children={
        <>
          <>
            <PdfView fixed mh={0} p={0}>
              {getHeaderAndFooterBilling(companyCode, { labId })?.header}
            </PdfView>
            <PdfView>
              <PdfView alignItems='center'>
                <PdfRegular
                  textAlign='center'
                  fontSize={10}
                  fontFamily='IBMPlexSans'
                >
                  Bill of Supply/Cash Receipt
                </PdfRegular>
                <PdfSmall
                  textAlign='center'
                  fontFamily='IBMPlexSans'
                  style={{ fontStyle: 'italic' }}
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
                    <PdfSmall>{`Patient ID: ${
                      patientDetails?.patientId || ''
                    }`}</PdfSmall>
                    <PdfSmall>{`Invoice No: ${
                      patientDetails?.invoiceNo || ''
                    }`}</PdfSmall>
                    <PdfSmall>{`Lab ID: ${
                      patientDetails?.labId || ''
                    }`}</PdfSmall>
                    <PdfSmall>{`Patient Name: ${
                      pascalCase(patientDetails?.patientName, true) || ''
                    }`}</PdfSmall>
                    <PdfSmall>{`Ref. By: ${patientDetails?.refBy}`}</PdfSmall>
                    <PdfSmall>{`Mode of Payment: ${
                      patientDetails?.modeOfPayment || ''
                    }`}</PdfSmall>
                  </PdfGrid>
                  <PdfGrid cols={2} bg='transparent'>
                    <PdfSmall>{`Registration Date: ${
                      patientDetails?.registrationDate
                        ? dayjs(patientDetails?.registrationDate).format(
                            'DD/MM/YYYY hh:mm:ss A',
                          )
                        : ''
                    }`}</PdfSmall>
                    <PdfSmall>{`Invoice Date: ${
                      patientDetails?.invoiceDate
                        ? dayjs(patientDetails?.invoiceDate).format(
                            'YYYY-MM-DD',
                          )
                        : ''
                    }`}</PdfSmall>
                    <PdfSmall>{`External Lab Id: ${
                      patientDetails?.externalLabId?.toString() || ''
                    }`}</PdfSmall>
                    <PdfSmall>{`Age & Sex: ${getAgeAndSex(
                      patientDetails?.ageAndSex,
                    )}`}</PdfSmall>
                    <PdfSmall>{`Client Name: ${
                      pascalCase(patientDetails?.corporateName, true) || ''
                    }`}</PdfSmall>
                    <PdfSmall>{`Payment Remark: ${
                      patientDetails?.paymentRemark || ''
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
                          'grossAmount',
                          'netAmount',
                          'discountAmount',
                        ]),
                      ) || []
                    }
                  />
                  <PdfView mh={0} p={0} mt={2} style={{}} alignItems='flex-end'>
                    <PdfSmall>
                      Total ₹: {getAmountPayable(transactionHeader) || '0'}
                    </PdfSmall>
                    {Number.parseInt(
                      transactionHeader?.miscellaneousCharges,
                    ) && (
                      <PdfSmall>
                        Misc Charges ₹:{' '}
                        {transactionHeader?.miscellaneousCharges || '0'}
                      </PdfSmall>
                    )}
                    {Number.parseInt(
                      transactionHeader?.discountCharges?.amount,
                    ) && (
                      <PdfSmall>
                        Other Charges ₹:{' '}
                        {typeof transactionHeader?.discountCharges?.amount ==
                        'number'
                          ? Number.parseFloat(
                              transactionHeader?.discountCharges?.amount,
                            )
                          : 0}
                      </PdfSmall>
                    )}
                    {Number.parseInt(transactionHeader?.receivedAmount) && (
                      <PdfSmall>
                        Paid Amount ₹:{' '}
                        {transactionHeader?.receivedAmount || '0'}
                      </PdfSmall>
                    )}
                    <PdfSmall fontFamily='IBMPlexSans'>
                      Balance ₹: {transactionHeader?.balance || '0'}
                    </PdfSmall>
                  </PdfView>

                  <PdfSmall>
                    Amount Paid in Words:{' '}
                    {numToWords(transactionHeader?.receivedAmount || 0)}
                  </PdfSmall>
                </PdfView>
              </PdfBorderView>
              <PdfView mh={0} p={0} alignItems='flex-start'>
                <PdfSmall textAlign='left'>
                  This is a computer generated receipt and does not require
                  signature/stamp
                </PdfSmall>
                <PdfSmall fontFamily='IBMPlexSans' style={{ marginTop: 4 }}>
                  {`*Final Report Delivery Date: ${dayjs(new Date()).format(
                    'YYYY-MM-DD',
                  )}. *Report Collection Time: ${
                    patientDetails?.openingTime || '06:00 am'
                  }  to ${patientDetails?.closingTime || '07:30 pm'}`}
                </PdfSmall>
              </PdfView>
            </PdfView>

            <PdfFooterView fixed bg='transparent' style={{ height: 88 }} p={0}>
              {getHeaderAndFooterBilling(companyCode, {})?.footer}
            </PdfFooterView>
          </>
        </>
      }
    />
  );
};
