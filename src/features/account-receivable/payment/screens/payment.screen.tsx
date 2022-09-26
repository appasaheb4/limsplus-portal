import React, {useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
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
    console.log({payload});

    paymentStore.updatePayment({
      ...paymentStore.payment,
      pId: payload?.pId,
      labId: payload?.labId,
      rLab: payload?.rLab,
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
