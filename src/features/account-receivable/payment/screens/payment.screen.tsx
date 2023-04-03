import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Table} from 'reactstrap';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {lookupItems, lookupValue} from '@/library/utils';
import {useStores} from '@/stores';
import {PaymentList} from '../components';
import {PaymentHoc} from '../hoc';
import {resetPayment} from '../startup';
import {Payment as Model} from '../models';

const Payment = PaymentHoc(
  observer(() => {
    const {
      loading,
      routerStore,
      loginStore,
      paymentStore,
      transactionDetailsStore,
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      clearErrors,
      setError,
      reset,
    } = useForm();
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(false);
    const [totalReceivedAmount, setTotalReceivedAmount] = useState<number>(0);

    setValue('modeOfPayment', paymentStore.payment?.modeOfPayment);
    setValue('invoiceAc', paymentStore.payment?.invoiceAC);
    setValue('rLab', paymentStore.payment?.rLab);
    setValue('customerName', paymentStore.payment?.customerName);
    setValue('customerGroup', paymentStore.payment?.customerGroup);
    setValue('acClass', paymentStore.payment?.acClass);
    setValue('acType', paymentStore.payment?.acType);
    setValue('otherCharges', paymentStore.payment?.discountCharges);
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

    useEffect(() => {
      paymentStore.updatePayment({
        ...paymentStore.payment,
        enteredBy: loginStore.login?.userId,
      });
    }, [loginStore.login?.userId, paymentStore]);

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
        invoiceAC: Number.parseInt(payload?.invoiceAC),
        customerName: payload?.customerName,
        customerGroup: payload?.customerGroup,
        acClass: payload?.acClass,
        acType: payload?.accountType,
        discountCharges: `${
          payload.discountCharges?.code
        } - ${payload.discountCharges?.amount?.toString()}`,
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

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemove
            show={!isInputView}
            onClick={() => setIsInputView(!isInputView)}
          />
        )}
        <div className=' mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (isInputView ? 'shown' : 'hidden')
            }
          >
            <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
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
                        disable={false}
                        displayValue={value?.toString()}
                        hasError={!!errors.pId}
                        onFilter={(value: string) => {
                          // methodsStore.methodsService.filterByFields({
                          //   input: {
                          //     filter: {
                          //       fields: ['pId', 'customerName'],
                          //       srText: value,
                          //     },
                          //     page: 0,
                          //     limit: 10,
                          //   },
                          // });
                        }}
                        onSelect={item => {
                          onChange(item.pId);
                          updatePayment(item);
                          // methodsStore.updateMethodsList(
                          //   methodsStore.listMethodsCopy,
                          // );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='pId'
                  rules={{
                    required: true,
                  }}
                  defaultValue={
                    transactionDetailsStore?.transactionHeaderList ||
                    paymentStore.payment?.pId
                  }
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
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
                        disable={false}
                        displayValue={value?.toString()}
                        hasError={!!errors.labId}
                        onFilter={(value: string) => {
                          // methodsStore.methodsService.filterByFields({
                          //   input: {
                          //     filter: {
                          //       fields: ['pId', 'customerName'],
                          //       srText: value,
                          //     },
                          //     page: 0,
                          //     limit: 10,
                          //   },
                          // });
                        }}
                        onSelect={item => {
                          onChange(item.pId);
                          updatePayment(item);
                          // methodsStore.updateMethodsList(
                          //   methodsStore.listMethodsCopy,
                          // );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='labId'
                  rules={{
                    required: true,
                  }}
                  defaultValue={
                    transactionDetailsStore?.transactionHeaderList ||
                    paymentStore.payment?.labId
                  }
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='RLab'
                      placeholder={'RLab'}
                      hasError={!!errors.rLab}
                      disabled={true}
                      value={value}
                    />
                  )}
                  name='rLab'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Invoice AC'
                      placeholder={'Invoice AC'}
                      hasError={!!errors.invoiceAC}
                      disabled={true}
                      value={value}
                    />
                  )}
                  name='invoiceAC'
                  rules={{required: false}}
                  defaultValue={paymentStore.payment?.invoiceAC}
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Customer Name'
                      placeholder={'Customer Name'}
                      hasError={!!errors.customerName}
                      disabled={true}
                      value={value}
                    />
                  )}
                  name='customerName'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Customer Group'
                      placeholder={'Customer Group'}
                      hasError={!!errors.customerGroup}
                      disabled={true}
                      value={value}
                    />
                  )}
                  name='customerGroup'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='AC Class'
                      placeholder={'AC Class'}
                      hasError={!!errors.acClass}
                      disabled={true}
                      value={value}
                    />
                  )}
                  name='acClass'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Ac Type'
                      placeholder={'Ac Type'}
                      hasError={!!errors.acType}
                      disabled={true}
                      value={value}
                    />
                  )}
                  name='acType'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Other Charges'
                      placeholder={'Other Charges'}
                      hasError={!!errors.discountCharges}
                      disabled={true}
                      value={value}
                    />
                  )}
                  name='discountCharges'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Invoice Date'
                      placeholder={'Invoice Date'}
                      hasError={!!errors.invoiceDate}
                      disabled={true}
                      value={value}
                    />
                  )}
                  name='invoiceDate'
                  rules={{required: false}}
                  defaultValue=''
                />
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Gross Amount'
                      placeholder={'Gross Amount'}
                      hasError={!!errors.grossAmount}
                      disabled={true}
                      value={value?.toString()}
                    />
                  )}
                  name='grossAmount'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Net Amount'
                      placeholder={'Net Amount'}
                      hasError={!!errors.netAmount}
                      disabled={true}
                      value={value?.toString()}
                    />
                  )}
                  name='netAmount'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Discount Amount'
                      placeholder={'Discount Amount'}
                      hasError={!!errors.discountAmount}
                      disabled={true}
                      value={value?.toString()}
                    />
                  )}
                  name='discountAmount'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Discount Per'
                      placeholder={'Discount Per'}
                      hasError={!!errors.discountPer}
                      disabled={true}
                      value={value?.toString()}
                    />
                  )}
                  name='discountPer'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Miscellaneous Charges'
                      placeholder={'Miscellaneous Charges'}
                      hasError={!!errors.miscellaneousCharges}
                      disabled={true}
                      value={value?.toString()}
                    />
                  )}
                  name='miscellaneousCharges'
                  rules={{required: false}}
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
                              style={{height: 30}}
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
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Mode of payment'>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.modeOfPayment
                            ? 'border-red-500  '
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
                        <option selected>{'Select'}</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'MODE_OF_PAYMENT',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='modeOfPayment'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.MultilineInput
                      label='Payment Remark'
                      placeholder='Payment Remark'
                      hasError={!!errors.paymentRemark}
                      value={value}
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
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Amount Payable'
                      placeholder={'Amount Payable'}
                      hasError={!!errors.amountPayable}
                      disabled={true}
                      value={value?.toString()}
                    />
                  )}
                  name='amountPayable'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Received Amount'
                      placeholder={'Received Amount'}
                      type='number'
                      hasError={!!errors.receivedAmount}
                      // value={value}
                      onChange={receivedAmount => {
                        if (
                          paymentStore.payment?.amountPayable -
                            Number.parseFloat(receivedAmount) <
                          0
                        ) {
                          alert('Please enter correct amount!');
                          setError('receivedAmount', {type: 'onBlur'});
                        } else if (receivedAmount == '') {
                          paymentStore.updatePayment({
                            ...paymentStore.payment,
                            receivedAmount,
                          });
                          setError('receivedAmount', {type: 'onBlur'});
                        } else {
                          onChange(Number.parseFloat(receivedAmount));
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
                  rules={{required: true}}
                  defaultValue={paymentStore.payment?.receivedAmount}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Balance'
                      placeholder={'Balance'}
                      type='number'
                      hasError={!!errors.balance}
                      value={value?.toString()}
                    />
                  )}
                  name='balance'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Status'
                      placeholder={'Status'}
                      hasError={!!errors.status}
                      value={value}
                      disabled={true}
                    />
                  )}
                  name='status'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Entered By'
                      placeholder={'Entered By'}
                      hasError={!!errors.status}
                      value={paymentStore.payment?.enteredBy}
                      disabled={true}
                    />
                  )}
                  name='enteredBy'
                  rules={{required: false}}
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
          <div className='p-2 rounded-lg shadow-xl'>
            <PaymentList
              data={paymentStore.paymentList || []}
              totalSize={paymentStore.paymentListCount}
              extraData={{
                lookupItems: routerStore.lookupItems,
              }}
              isDelete={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Delete',
              )}
              isEditModify={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Edit/Modify',
              )}
              onDelete={selectedItem => setModalConfirm(selectedItem)}
              onSelectedRow={rows => {
                setModalConfirm({
                  show: true,
                  type: 'Delete',
                  id: rows,
                  title: 'Are you sure?',
                  body: 'Delete selected items!',
                });
              }}
              onUpdateItem={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'Update',
                  data: {value, dataField, id},
                  title: 'Are you sure?',
                  body: 'Update deginisation!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                // deginisationStore.fetchListDeginisation(page, limit);
              }}
              onFilter={(type, filter, page, limit) => {
                // deginisationStore.DeginisationService.filter({
                //   input: {type, filter, page, limit},
                // });
              }}
            />
          </div>
          {/* <ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            switch (type) {
              case 'Delete': {
                deginisationStore.DeginisationService.deleteDeginisation({
                  input: {id: modalConfirm.id},
                }).then((res: any) => {
                  if (res.removeDesignation.success) {
                    Toast.success({
                      message: `😊 ${res.removeDesignation.message}`,
                    });
                    setModalConfirm({show: false});
                    deginisationStore.fetchListDeginisation();
                  }
                });
                break;
              }

              case 'Update': {
                deginisationStore.DeginisationService.updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                }).then((res: any) => {
                  if (res.updateDesignation.success) {
                    Toast.success({
                      message: `😊 ${res.updateDesignation.message}`,
                    });
                    setModalConfirm({show: false});
                    deginisationStore.fetchListDeginisation();
                  }
                });
                break;
              }
            }
          }}
          onClose={() => setModalConfirm({show: false})}
        /> */}
        </div>
      </>
    );
  }),
);

export default Payment;
