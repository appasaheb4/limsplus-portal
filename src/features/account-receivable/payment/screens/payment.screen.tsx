import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Table } from 'reactstrap';
import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  MainPageHeading,
} from '@/library/components';
import { useForm, Controller } from 'react-hook-form';
import { RouterFlow } from '@/flows';
import { lookupItems, lookupValue } from '@/library/utils';
import { useStores } from '@/stores';
import { PaymentList } from '../components';
import { PaymentHoc } from '../hoc';
import { resetPayment } from '../startup';
import { Payment as Model } from '../models';
import { PdfReceipt } from '../../receipt/components';
import { pdf } from '@react-pdf/renderer';
import { ModalConfirm } from 'react-restyle-components';

interface PaymentProps {
  details?: any;
  isFullAccess?: boolean;
  onSubmit?: (details: any) => void;
}

const Payment = PaymentHoc(
  observer(({ details = {}, isFullAccess = true, onSubmit }: PaymentProps) => {
    const {
      loading,
      routerStore,
      loginStore,
      paymentStore,
      receiptStore,
      transactionDetailsStore,
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      clearErrors,
      setError,
      reset,
    } = useForm();
    const receivedAmountRef = useRef<any>(null);
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(true);
    const [totalReceivedAmount, setTotalReceivedAmount] = useState<number>(0);
    const [modalConfirmForSMS, setModalConfirmForSMS] = useState<any>({});
    const [arrLookupItems, setArrLookupItems] = useState<any>();
    useEffect(() => {
      // Default value initialization
      setValue('modeOfPayment', paymentStore.payment?.modeOfPayment);
      setValue('invoiceAc', paymentStore.payment?.invoiceAC);
      setValue('rLab', paymentStore.payment?.rLab);
      setValue('customerName', paymentStore.payment?.customerName);
      setValue('customerGroup', paymentStore.payment?.customerGroup);
      setValue('acClass', paymentStore.payment?.acClass);
      setValue('acType', paymentStore.payment?.acType);
      setValue('otherCharges', paymentStore.payment?.discountCharges || '');
      setValue('invoiceDate', paymentStore.payment?.invoiceDate);
      setValue('grossAmount', paymentStore.payment?.grossAmount);
      setValue('netAmount', paymentStore.payment?.netAmount);
      setValue('discountAmount', paymentStore.payment?.discountAmount);
      setValue('discountPer', paymentStore.payment?.discountPer);
      setValue(
        'miscellaneousCharges',
        paymentStore.payment?.miscellaneousCharges,
      );
      setValue('amountPayable', paymentStore.payment?.amountPayable);
      setValue('status', paymentStore.payment?.status);
      setValue('balance', paymentStore.payment?.balance);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentStore.payment]);

    useEffect(() => {
      if (!isFullAccess) {
        (async function () {
          try {
            // fetch payment details
            transactionDetailsStore.transactionDetailsService
              .findByFieldsTransactionHeader({
                input: {
                  filter: {
                    labId: Number.parseInt(details?.labId),
                  },
                },
              })
              .then(res => {
                if (res.findByFieldsTransactionHeader?.success) {
                  updatePayment(res.findByFieldsTransactionHeader?.data[0]);
                } else {
                  Toast.error({
                    message: 'Exists records not found in payment',
                  });
                }
              });
            //lookup value fetch
            await RouterFlow.getLookupValues(
              '/account-receivable/payment',
            ).then(async res => {
              setArrLookupItems(res);
            });
          } catch (e) {
            console.error(e);
          }
        })();
      }
      if (receivedAmountRef.current) {
        receivedAmountRef.current.focus();
      }
      paymentStore.updatePayment({
        ...paymentStore.payment,
        enteredBy: loginStore.login?.userId,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login?.userId, paymentStore, isFullAccess, details?.labId]);

    const onSubmitPayment = () => {
      paymentStore.paymentService
        .create({
          input: {
            ...paymentStore.payment,
          },
        })
        .then(res => {
          if (res.createPayment.success) {
            Toast.success({
              message: `😊 ${res.createPayment.message}`,
            });
            setIsInputView(true);
            reset();
            resetPayment();
            setTotalReceivedAmount(0);
            onSubmit && onSubmit(res?.createPayment);
            setModalConfirmForSMS({
              visible: true,
              title: 'Are you sure send sms',
              message: 'Receipt link sending to patient manager mobile number',
              details: {
                headerId: res.createPayment?.result?.tranRes?.headerId,
              },
            });
            paymentStore.updatePayment(new Model({}));
          }
        });
    };

    const getAmountPayable = payload => {
      const discountChargesAmount: number =
        typeof payload.discountCharges?.amount == 'number'
          ? Number.parseFloat(payload?.discountCharges?.amount)
          : 0;
      const amountPayable =
        Number.parseFloat(payload?.netAmount) +
        Number.parseFloat(payload?.miscellaneousCharges) +
        discountChargesAmount -
        Number.parseFloat(payload?.receivedAmount);

      return amountPayable;
    };

    const updatePayment = (payload: any) => {
      paymentStore.updatePayment({
        ...paymentStore.payment,
        pId: Number.parseInt(payload?.pId),
        labId: Number.parseInt(payload?.labId),
        rLab: payload?.rLab,
        invoiceAC: Number.parseInt(payload?.invoiceAc),
        customerName: payload?.customerName,
        customerGroup: payload?.customerGroup,
        acClass: payload?.acClass,
        acType: payload?.accountType,
        discountCharges: `${payload.discountCharges?.code || ''} - ${
          payload.discountCharges?.amount?.toString() || ''
        }`,
        invoiceDate: payload?.invoiceDate,
        grossAmount: Number.parseFloat(payload?.grossAmount),
        netAmount: Number.parseFloat(payload?.netAmount),
        discountAmount: Number.parseFloat(payload?.discountAmount),
        discountPer: Number.parseFloat(payload?.discountPer),
        miscellaneousCharges: Number.parseFloat(payload?.miscellaneousCharges),
        allMiscCharges: payload?.allMiscCharges,
        amountPayable: getAmountPayable(payload),
        patientOrderId: payload?.patientOrderId,
        transactionHeaderId: payload?._id,
        visitId: payload?.visitId,
      });
      setTotalReceivedAmount(Number.parseFloat(payload?.receivedAmount));
      setValue('pId', payload?.pId);
      setValue('labId', payload?.labId);
      clearErrors('pId');
      clearErrors('labId');
    };

    const sharePdfLink = async data => {
      console.log({ data });
      const doc = <PdfReceipt data={data} />;
      const asPdf = pdf(doc);
      asPdf.updateContainer(doc);
      const blob: any = await asPdf.toBlob();
      blob.name = 'Payment-Receipt.pdf';
      // upload pdf file
      receiptStore.receiptService
        .paymentReceiptUpload({ input: { file: blob } })
        .then(res => {
          if (res.paymentReceiptUpload.success) {
            const path = res.paymentReceiptUpload?.receiptPath;
            if (_.isEmpty(data?.patientDetails?.mobileNo))
              Toast.error({
                message: '😌 Patient mobile number not found!',
              });
            else
              receiptStore.receiptService
                .sendSMS({
                  input: {
                    filter: {
                      mobileNo: [data?.patientDetails?.mobileNo],
                      sender: '',
                      message: `Your payment receipt link: ${path}`,
                    },
                  },
                } as any)
                .then(res => {
                  if (res.sendMessageService.success) {
                    Toast.success({
                      message: '😊 SMS send successfully',
                    });
                  }
                });
          }
        });
    };

    return (
      <>
        {isFullAccess && (
          <MainPageHeading
            title={routerStore.selectedComponents?.title || ''}
            store={loginStore}
          />
        )}
        {isFullAccess && (
          <div
            className='flex justify-end'
            style={{
              position: 'fixed',
              right: '30px',
              top: '135px',
              zIndex: 9999,
            }}
          >
            {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
              <Buttons.ButtonCircleAddRemoveBottom
                show={isInputView}
                onClick={() => setIsInputView(!isInputView)}
              />
            )}
          </div>
        )}
        <div className='flex flex-col w-full'>
          <div
            className={
              'flex flex-col w-full p-2 rounded-lg shadow-xl ' +
              (isFullAccess ? (isInputView ? 'hidden' : 'shown') : 'shown')
            }
          >
            <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.InputWrapper label='PId' hasError={!!errors.pId}>
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by pId or customer name'
                        data={{
                          list:
                            transactionDetailsStore.transactionHeaderList.filter(
                              item => {
                                if (item?.balance !== 0) return item;
                              },
                            ) || [],
                          displayKey: ['pId', 'customerName'],
                        }}
                        disable={paymentStore.payment?.pId ? true : false}
                        displayValue={value?.toString()}
                        hasError={!!errors.pId}
                        onFilter={(value: string) => {
                          transactionDetailsStore.transactionDetailsService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ['pId', 'customerName'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item.pId);
                          updatePayment(item);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='pId'
                  rules={{
                    required: true,
                  }}
                  defaultValue={
                    transactionDetailsStore.transactionHeaderList?.length
                  }
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.InputWrapper label='Lab Id' hasError={!!errors.labId}>
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by labId or customer name'
                        data={{
                          list:
                            transactionDetailsStore.transactionHeaderList.filter(
                              item => {
                                if (item?.balance !== 0) return item;
                              },
                            ) || [],
                          displayKey: ['labId', 'customerName'],
                        }}
                        disable={paymentStore.payment?.labId ? true : false}
                        displayValue={value?.toString()}
                        hasError={!!errors.labId}
                        onFilter={(value: string) => {
                          transactionDetailsStore.transactionDetailsService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ['labId', 'customerName'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item.pId);
                          updatePayment(item);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='labId'
                  rules={{
                    required: true,
                  }}
                  defaultValue={
                    transactionDetailsStore.transactionHeaderList?.length
                  }
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='RLab'
                      placeholder={'RLab'}
                      hasError={!!errors.rLab}
                      disabled={true}
                      value={value || ''}
                    />
                  )}
                  name='rLab'
                  rules={{ required: false }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Invoice AC'
                      placeholder={'Invoice AC'}
                      hasError={!!errors.invoiceAC}
                      disabled={true}
                      value={paymentStore.payment?.invoiceAC?.toString() || ''}
                    />
                  )}
                  name='invoiceAC'
                  rules={{ required: false }}
                  defaultValue={paymentStore.payment?.invoiceAC}
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Customer Name'
                      placeholder={'Customer Name'}
                      hasError={!!errors.customerName}
                      disabled={true}
                      value={value || ''}
                    />
                  )}
                  name='customerName'
                  rules={{ required: false }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Customer Group'
                      placeholder={'Customer Group'}
                      hasError={!!errors.customerGroup}
                      disabled={true}
                      value={value || ''}
                    />
                  )}
                  name='customerGroup'
                  rules={{ required: false }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='AC Class'
                      placeholder={'AC Class'}
                      hasError={!!errors.acClass}
                      disabled={true}
                      value={value || ''}
                    />
                  )}
                  name='acClass'
                  rules={{ required: false }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Ac Type'
                      placeholder={'Ac Type'}
                      hasError={!!errors.acType}
                      disabled={true}
                      value={value || ''}
                    />
                  )}
                  name='acType'
                  rules={{ required: false }}
                  defaultValue=''
                />
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Other Charges'
                      placeholder={'Other Charges'}
                      hasError={!!errors.discountCharges}
                      disabled={true}
                      value={value || ''}
                    />
                  )}
                  name='discountCharges'
                  rules={{ required: false }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Invoice Date'
                      placeholder={'Invoice Date'}
                      hasError={!!errors.invoiceDate}
                      disabled={true}
                      value={value || ''}
                    />
                  )}
                  name='invoiceDate'
                  rules={{ required: false }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Gross Amount'
                      placeholder={'Gross Amount'}
                      hasError={!!errors.grossAmount}
                      disabled={true}
                      value={value?.toString() || ''}
                    />
                  )}
                  name='grossAmount'
                  rules={{ required: false }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Net Amount'
                      placeholder={'Net Amount'}
                      hasError={!!errors.netAmount}
                      disabled={true}
                      value={value?.toString() || ''}
                    />
                  )}
                  name='netAmount'
                  rules={{ required: false }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Discount Amount'
                      placeholder={'Discount Amount'}
                      hasError={!!errors.discountAmount}
                      disabled={true}
                      value={value?.toString() || ''}
                    />
                  )}
                  name='discountAmount'
                  rules={{ required: false }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Discount Per'
                      placeholder={'Discount Per'}
                      hasError={!!errors.discountPer}
                      disabled={true}
                      value={value?.toString() || ''}
                    />
                  )}
                  name='discountPer'
                  rules={{ required: false }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Miscellaneous Charges'
                      placeholder={'Miscellaneous Charges'}
                      hasError={!!errors.miscellaneousCharges}
                      disabled={true}
                      value={value?.toString() || ''}
                    />
                  )}
                  name='miscellaneousCharges'
                  rules={{ required: false }}
                  defaultValue=''
                />
                <Table striped bordered>
                  <thead>
                    <tr className='p-0 text-xs'>
                      <th className='text-white sticky left-0 z-10'>
                        MISC CHARGES
                      </th>
                      <th className='text-white'>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className='text-xs'>
                    {paymentStore.payment?.allMiscCharges?.map(
                      (item, index) => (
                        <tr key={item.code}>
                          <td className='sticky left-0'>
                            {item?.value + ' - ' + item?.code}
                          </td>
                          <td className='sticky left-0'>
                            <Form.Input
                              style={{ height: 30 }}
                              label=''
                              type='number'
                              placeholder='Amount'
                              value={item.amount}
                              disabled={true}
                            />
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </Table>
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Amount Payable'
                      placeholder={'Amount Payable'}
                      hasError={!!errors.amountPayable}
                      disabled={true}
                      value={value?.toString() || ''}
                    />
                  )}
                  name='amountPayable'
                  rules={{ required: false }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      inputRef={receivedAmountRef}
                      label='Received Amount'
                      placeholder={'Received Amount'}
                      type='number'
                      hasError={!!errors.receivedAmount}
                      value={value}
                      onChange={receivedAmount => {
                        if (
                          paymentStore.payment?.amountPayable -
                            Number.parseFloat(receivedAmount) <
                          0
                        ) {
                          alert('Please enter correct amount!');
                          setError('receivedAmount', { type: 'onBlur' });
                        } else if (receivedAmount == '') {
                          paymentStore.updatePayment({
                            ...paymentStore.payment,
                            receivedAmount,
                          });
                          setError('receivedAmount', { type: 'onBlur' });
                        } else {
                          onChange(receivedAmount);
                          paymentStore.updatePayment({
                            ...paymentStore.payment,
                            receivedAmount: Number.parseFloat(receivedAmount),
                            balance:
                              paymentStore.payment?.amountPayable -
                              Number.parseFloat(receivedAmount),
                            totalReceivedAmount:
                              totalReceivedAmount +
                              Number.parseFloat(receivedAmount),
                            status:
                              paymentStore.payment?.amountPayable -
                                Number.parseFloat(receivedAmount) ===
                              0
                                ? 'Complete'
                                : 'Partial',
                          });
                          clearErrors('receivedAmount');
                        }
                      }}
                    />
                  )}
                  name='receivedAmount'
                  rules={{ required: true }}
                  defaultValue={paymentStore.payment?.receivedAmount}
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Balance'
                      placeholder={'Balance'}
                      type='number'
                      hasError={!!errors.balance}
                      value={value?.toString() || ''}
                    />
                  )}
                  name='balance'
                  rules={{ required: false }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.InputWrapper label='Mode of payment'>
                      <select
                        value={value || ''}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.modeOfPayment
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const modeOfPayment = e.target.value;
                          onChange(modeOfPayment);
                          paymentStore.updatePayment({
                            ...paymentStore.payment,
                            modeOfPayment: modeOfPayment,
                          });
                        }}
                      >
                        <option>{'Select'}</option>
                        {lookupItems(
                          isFullAccess
                            ? routerStore.lookupItems
                            : arrLookupItems,
                          'MODE_OF_PAYMENT',
                        )?.map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='modeOfPayment'
                  rules={{ required: true }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.MultilineInput
                      label='Payment Remark'
                      placeholder='Payment Remark'
                      hasError={!!errors.paymentRemark}
                      value={value || ''}
                      onChange={paymentRemark => {
                        onChange(paymentRemark);
                        paymentStore.updatePayment({
                          ...paymentStore.payment,
                          paymentRemark,
                        });
                      }}
                    />
                  )}
                  name='paymentRemark'
                  rules={{ required: false }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Status'
                      placeholder={'Status'}
                      hasError={!!errors.status}
                      value={value || ''}
                      disabled={true}
                    />
                  )}
                  name='status'
                  rules={{ required: false }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Entered By'
                      placeholder={'Entered By'}
                      hasError={!!errors.status}
                      value={paymentStore.payment?.enteredBy || ''}
                      disabled={true}
                    />
                  )}
                  name='enteredBy'
                  rules={{ required: false }}
                  defaultValue={paymentStore.payment?.enteredBy}
                />
              </List>
            </Grid>
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitPayment)}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size='medium'
                type='outline'
                icon={Svg.Remove}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          {isFullAccess && (
            <div className='p-2 rounded-lg shadow-xl'>
              <PaymentList
                data={paymentStore.paymentList || []}
                totalSize={paymentStore.paymentListCount}
                extraData={{
                  lookupItems: routerStore.lookupItems,
                }}
                isView={RouterFlow.checkPermission(
                  routerStore.userPermission,
                  'View',
                )}
                isDelete={RouterFlow.checkPermission(
                  routerStore.userPermission,
                  'Delete',
                )}
                isUpdate={RouterFlow.checkPermission(
                  routerStore.userPermission,
                  'Update',
                )}
                isExport={RouterFlow.checkPermission(
                  routerStore.userPermission,
                  'Export',
                )}
                onDelete={selectedItem => setModalConfirm(selectedItem)}
                onSelectedRow={rows => {
                  setModalConfirm({
                    show: true,
                    type: 'Delete',
                    id: rows,
                    title: 'Are you sure?',
                    body: 'Do you want to delete selected record?',
                  });
                }}
                onUpdateItem={(value: any, dataField: string, id: string) => {
                  setModalConfirm({
                    show: true,
                    type: 'Update',
                    data: { value, dataField, id },
                    title: 'Are you sure?',
                    body: 'Update deginisation!',
                  });
                }}
                // onUpdateFileds={(fileds: any, id: string) => {
                //   setModalConfirm({
                //     show: true,
                //     type: 'UpdateFileds',
                //     data: { fileds, id },
                //     title: 'Are you sure?',
                //     body: 'Do you want to update this record?',
                //   });
                // }}
                onPageSizeChange={(page, limit) => {
                  paymentStore.paymentService.listPayment(page, limit);
                }}
                onFilter={(type, filter, page, limit) => {
                  paymentStore.paymentService.filter({
                    input: { type, filter, page, limit },
                  });
                }}
              />
            </div>
          )}
        </div>
        <ModalConfirm
          {...modalConfirmForSMS}
          onClick={() => {
            receiptStore.receiptService
              .generatePaymentReceipt({
                input: { headerId: modalConfirmForSMS?.details?.headerId },
              })
              .then(async res => {
                if (res.generatePaymentReceipt?.success) {
                  console.log({ res });
                  sharePdfLink(res.generatePaymentReceipt?.receiptData);
                } else
                  Toast.error({
                    message: `😔 ${res.generatePaymentReceipt.message}`,
                  });
              });
            setModalConfirmForSMS({ visible: false });
          }}
          onClose={() => {
            setModalConfirmForSMS({ visible: false });
          }}
        />
      </>
    );
  }),
);

export default Payment;
