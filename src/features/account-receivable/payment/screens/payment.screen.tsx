import React, {useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {Table} from 'reactstrap';
import {
  ModalConfirm,
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

const Payment = observer(() => {
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
  } = useForm();
  const [modalConfirm, setModalConfirm] = useState<any>();
  const [isInputView, setIsInputView] = useState<boolean>(true);

  const onSubmitPayment = () => {};

  const updatePayment = payload => {
    paymentStore.updatePayment({
      ...paymentStore.payment,
      pId: payload?.pId,
      labId: payload?.labId,
      rLab: payload?.rLab,
      invoiceAC: payload?.invoiceAC,
      customerName: payload?.customerName,
      customerGroup: payload?.customerGroup,
      acClass: payload?.acClass,
      acType: payload?.acType,
      discountCharges: payload?.discountCharges,
      invoiceDate: payload?.invoiceDate,
      grossAmount: payload?.grossAmount,
      netAmount: payload?.netAmount,
      discountAmount: payload?.discountAmount,
      discountPer: payload?.discountPer,
      miscellaneousCharges: payload?.miscellaneousCharges,
      allMiscCharges: payload?.allMiscCharges,
    });
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
                render={({field: {onChange}}) => (
                  <Form.InputWrapper label='PId' hasError={!!errors.pId}>
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      placeholder='Search by pId or customer name'
                      data={{
                        list: transactionDetailsStore.transactionHeaderList,
                        displayKey: ['pId', 'customerName'],
                      }}
                      disable={false}
                      displayValue={paymentStore.payment?.pId?.toString()}
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
                render={({field: {onChange}}) => (
                  <Form.InputWrapper label='Lab Id' hasError={!!errors.labId}>
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      placeholder='Search by labId or customer name'
                      data={{
                        list: transactionDetailsStore.transactionHeaderList,
                        displayKey: ['labId', 'customerName'],
                      }}
                      disable={false}
                      displayValue={paymentStore.payment?.labId?.toString()}
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
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='RLab'
                    placeholder={'RLab'}
                    hasError={!!errors.rLab}
                    disabled={true}
                    value={paymentStore.payment?.rLab}
                  />
                )}
                name='rLab'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.rLab}
              />

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Invoice AC'
                    placeholder={'Invoice AC'}
                    hasError={!!errors.invoiceAC}
                    disabled={true}
                    value={paymentStore.payment?.invoiceAC}
                  />
                )}
                name='invoiceAC'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.invoiceAC}
              />

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Customer Name'
                    placeholder={'Customer Name'}
                    hasError={!!errors.customerName}
                    disabled={true}
                    value={paymentStore.payment?.customerName}
                  />
                )}
                name='customerName'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.customerName}
              />
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Customer Group'
                    placeholder={'Customer Group'}
                    hasError={!!errors.customerGroup}
                    disabled={true}
                    value={paymentStore.payment?.customerGroup}
                  />
                )}
                name='customerGroup'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.customerGroup}
              />
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='AC Class'
                    placeholder={'AC Class'}
                    hasError={!!errors.acClass}
                    disabled={true}
                    value={paymentStore.payment?.acClass}
                  />
                )}
                name='acClass'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.acClass}
              />

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Ac Type'
                    placeholder={'Ac Type'}
                    hasError={!!errors.acType}
                    disabled={true}
                    value={paymentStore.payment?.acType}
                  />
                )}
                name='acType'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.acType}
              />
            </List>

            <List direction='col' space={4} justify='stretch' fill>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Discount Charges'
                    placeholder={'Discount Charges'}
                    hasError={!!errors.discountCharges}
                    disabled={true}
                    value={paymentStore.payment?.discountCharges}
                  />
                )}
                name='discountCharges'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.discountCharges}
              />

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Invoice Date'
                    placeholder={'Invoice Date'}
                    hasError={!!errors.invoiceDate}
                    disabled={true}
                    value={paymentStore.payment?.invoiceDate}
                  />
                )}
                name='invoiceDate'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.invoiceDate}
              />

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Gross Amount'
                    placeholder={'Gross Amount'}
                    hasError={!!errors.grossAmount}
                    disabled={true}
                    value={paymentStore.payment?.grossAmount}
                  />
                )}
                name='grossAmount'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.grossAmount}
              />

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Net Amount'
                    placeholder={'Net Amount'}
                    hasError={!!errors.netAmount}
                    disabled={true}
                    value={paymentStore.payment?.netAmount}
                  />
                )}
                name='netAmount'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.netAmount}
              />

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Discount Amount'
                    placeholder={'Discount Amount'}
                    hasError={!!errors.discountAmount}
                    disabled={true}
                    value={paymentStore.payment?.discountAmount}
                  />
                )}
                name='discountAmount'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.discountAmount}
              />

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Discount Per'
                    placeholder={'Discount Per'}
                    hasError={!!errors.discountPer}
                    disabled={true}
                    value={paymentStore.payment?.discountPer}
                  />
                )}
                name='discountPer'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.discountPer}
              />

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Discount Per'
                    placeholder={'Discount Per'}
                    hasError={!!errors.discountPer}
                    disabled={true}
                    value={paymentStore.payment?.discountPer}
                  />
                )}
                name='discountPer'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.discountPer}
              />

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Miscellaneous Charges'
                    placeholder={'Miscellaneous Charges'}
                    hasError={!!errors.miscellaneousCharges}
                    disabled={true}
                    value={paymentStore.payment?.miscellaneousCharges}
                  />
                )}
                name='miscellaneousCharges'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.miscellaneousCharges}
              />
            </List>
            <List direction='col' space={4} justify='stretch' fill>
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
                  {paymentStore.payment?.allMiscCharges?.map((item, index) => (
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
                  ))}
                </tbody>
              </Table>

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Amount Payable'
                    placeholder={'Amount Payable'}
                    hasError={!!errors.amountPayable}
                    disabled={true}
                    value={paymentStore.payment?.amountPayable}
                  />
                )}
                name='amountPayable'
                rules={{required: false}}
                defaultValue={paymentStore.payment?.amountPayable}
              />

              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.InputWrapper label='Mode of payment'>
                    <select
                      value={paymentStore.payment?.modeOfPayment}
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
          {/* <DeginisationList
            data={deginisationStore.listDeginisation || []}
            totalSize={deginisationStore.listDeginisationCount}
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
              deginisationStore.fetchListDeginisation(page, limit);
            }}
            onFilter={(type, filter, page, limit) => {
              deginisationStore.DeginisationService.filter({
                input: {type, filter, page, limit},
              });
            }}
          /> */}
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
});

export default Payment;
