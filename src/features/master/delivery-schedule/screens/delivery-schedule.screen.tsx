import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {DeliverySchduleList} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {ScheduleFrequency} from '../components';
import {DeliveryScheduleHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetDeliverySchedule} from '../startup';

const DeliverySchedule = DeliveryScheduleHoc(
  observer(() => {
    const {loginStore, deliveryScheduleStore, routerStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();

    setValue(
      'environment',
      deliveryScheduleStore.deliverySchedule?.environment,
    );

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);

    const onSubmitDeliverySchedule = () => {
      if (!deliveryScheduleStore.checkExistsEnvCode) {
        deliveryScheduleStore.deliveryScheduleService
          .addDeliverySchdule({
            input: {...deliveryScheduleStore.deliverySchedule},
          })
          .then(res => {
            if (res.createDeliverySchdule.success)
              Toast.success({
                message: `😊 ${res.createDeliverySchdule.message}`,
              });
            setHideAddLab(true);
            reset();
            resetDeliverySchedule();
          });
      } else {
        Toast.warning({
          message: '😔 Please enter diff code',
        });
      }
    };

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          'Add',
        ) && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddLab}
            onClick={() => setHideAddLab(!hideAddLab)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddLab ? 'hidden' : 'shown')
            }
          >
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Sch Code'
                      placeholder={
                        errors.schCode ? 'Please Enter Sch Code' : 'Sch Code'
                      }
                      hasError={!!errors.schCode}
                      value={value}
                      onChange={schCode => {
                        onChange(schCode);
                        deliveryScheduleStore.updateDeliverySchedule({
                          ...deliveryScheduleStore.deliverySchedule,
                          schCode,
                        });
                      }}
                      onBlur={code => {
                        deliveryScheduleStore.deliveryScheduleService
                          .checkExistsEnvCode({
                            input: {
                              code,
                              env: deliveryScheduleStore.deliverySchedule
                                ?.environment,
                            },
                          })
                          .then(res => {
                            if (res.checkDeliverySchdulesExistsRecord.success) {
                              deliveryScheduleStore.updateExistsEnvCode(true);
                              Toast.error({
                                message: `😔 ${res.checkDeliverySchdulesExistsRecord.message}`,
                              });
                            } else
                              deliveryScheduleStore.updateExistsEnvCode(false);
                          });
                      }}
                    />
                  )}
                  name='schCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                {deliveryScheduleStore.checkExistsEnvCode && (
                  <span className='text-red-600 font-medium relative'>
                    Code already exits. Please use other code.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Clock
                      label='P Start Time'
                      hasError={!!errors.pStartTime}
                      value={value}
                      onChange={pStartTime => {
                        onChange(pStartTime);
                        deliveryScheduleStore.updateDeliverySchedule({
                          ...deliveryScheduleStore.deliverySchedule,
                          pStartTime,
                        });
                      }}
                    />
                  )}
                  name='pStartTime'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Clock
                      label='P End Time'
                      hasError={!!errors.pEndTime}
                      value={value}
                      onChange={pEndTime => {
                        onChange(pEndTime);
                        deliveryScheduleStore.updateDeliverySchedule({
                          ...deliveryScheduleStore.deliverySchedule,
                          pEndTime,
                        });
                      }}
                    />
                  )}
                  name='pEndTime'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Clock
                      label='Cutof Time'
                      hasError={!!errors.cutofTime}
                      value={value}
                      onChange={cutofTime => {
                        onChange(cutofTime);
                        deliveryScheduleStore.updateDeliverySchedule({
                          ...deliveryScheduleStore.deliverySchedule,
                          cutofTime,
                        });
                      }}
                    />
                  )}
                  name='cutofTime'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Clock
                      label='Secound Cutof Time'
                      hasError={!!errors.secoundCutofTime}
                      value={value}
                      onChange={secoundCutofTime => {
                        onChange(secoundCutofTime);
                        deliveryScheduleStore.updateDeliverySchedule({
                          ...deliveryScheduleStore.deliverySchedule,
                          secoundCutofTime,
                        });
                      }}
                    />
                  )}
                  name='secoundCutofTime'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Processing Type'
                      hasError={!!errors.processingType}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.processingType
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const processingType = e.target.value as string;
                          onChange(processingType);

                          deliveryScheduleStore.updateDeliverySchedule({
                            ...deliveryScheduleStore.deliverySchedule,
                            processingType,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'PROCESSING_TYPE',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='processingType'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <ScheduleFrequency
                      type={value || ''}
                      onChnage={schFrequency => {
                        onChange(schFrequency);
                        deliveryScheduleStore.updateDeliverySchedule({
                          ...deliveryScheduleStore.deliverySchedule,
                          schFrequency,
                        });
                      }}
                    />
                  )}
                  name='schFrequency'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Report on'
                      placeholder={
                        errors.reportOn ? 'Please Enter ReportOn' : 'ReportOn'
                      }
                      hasError={!!errors.reportOn}
                      value={value}
                      onChange={reportOn => {
                        onChange(reportOn);
                        deliveryScheduleStore.updateDeliverySchedule({
                          ...deliveryScheduleStore.deliverySchedule,
                          reportOn,
                        });
                      }}
                    />
                  )}
                  name='reportOn'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Dynamic RT'
                      placeholder={
                        errors.dynamicRT
                          ? 'Please Enter DynamicRT '
                          : 'DynamicRT'
                      }
                      hasError={!!errors.dynamicRT}
                      value={value}
                      onChange={dynamicRT => {
                        onChange(dynamicRT);
                        deliveryScheduleStore.updateDeliverySchedule({
                          ...deliveryScheduleStore.deliverySchedule,
                          dynamicRT,
                        });
                      }}
                    />
                  )}
                  name='dynamicRT'
                  rules={{required: false}}
                  defaultValue=''
                />
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Dynamic TU'
                      hasError={!!errors.dynamicTU}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.dynamicTU ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const dynamicTU = e.target.value;
                          onChange(dynamicTU);
                          deliveryScheduleStore.updateDeliverySchedule({
                            ...deliveryScheduleStore.deliverySchedule,
                            dynamicTU,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'DYNAMIC_TU').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='dynamicTU'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Fixed RT'
                      placeholder={
                        errors.fixedRT ? 'Please Enter fixedRT' : 'fixedRT'
                      }
                      hasError={!!errors.fixedRT}
                      value={value}
                      onChange={fixedRT => {
                        onChange(fixedRT);
                        deliveryScheduleStore.updateDeliverySchedule({
                          ...deliveryScheduleStore.deliverySchedule,
                          fixedRT,
                        });
                      }}
                    />
                  )}
                  name='fixedRT'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Sch For DEPT'
                      placeholder={
                        errors.schForDept
                          ? 'Please Enter schForDept'
                          : 'schForDept'
                      }
                      hasError={!!errors.schForDept}
                      value={value}
                      onChange={schForDept => {
                        onChange(schForDept);
                        deliveryScheduleStore.updateDeliverySchedule({
                          ...deliveryScheduleStore.deliverySchedule,
                          schForDept,
                        });
                      }}
                    />
                  )}
                  name='schForDept'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Sch For PAT'
                      placeholder={
                        errors.schForPat
                          ? 'Please Enter schForPat'
                          : 'schForPat'
                      }
                      hasError={!!errors.schForPat}
                      value={value}
                      onChange={schForPat => {
                        onChange(schForPat);
                        deliveryScheduleStore.updateDeliverySchedule({
                          ...deliveryScheduleStore.deliverySchedule,
                          schForPat,
                        });
                      }}
                    />
                  )}
                  name='schForPat'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Environment'>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        disabled={
                          loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? true
                            : false
                        }
                        onChange={e => {
                          const environment = e.target.value;
                          onChange(environment);
                          deliveryScheduleStore.updateDeliverySchedule({
                            ...deliveryScheduleStore.deliverySchedule,
                            environment,
                          });
                          deliveryScheduleStore.deliveryScheduleService
                            .checkExistsEnvCode({
                              input: {
                                code: deliveryScheduleStore.deliverySchedule
                                  ?.schCode,
                                env: environment,
                              },
                            })
                            .then(res => {
                              if (
                                res.checkDeliverySchdulesExistsRecord.success
                              ) {
                                deliveryScheduleStore.updateExistsEnvCode(true);
                                Toast.error({
                                  message: `😔 ${res.checkDeliverySchdulesExistsRecord.message}`,
                                });
                              } else
                                deliveryScheduleStore.updateExistsEnvCode(
                                  false,
                                );
                            });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : deliveryScheduleStore.deliverySchedule
                                ?.environment || 'Select'}
                        </option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'ENVIRONMENT',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='environment'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Grid cols={5}>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Sunday Processing'
                        hasError={!!errors.sundayProcessing}
                        value={value}
                        onChange={sundayProcessing => {
                          onChange(sundayProcessing);
                          deliveryScheduleStore.updateDeliverySchedule({
                            ...deliveryScheduleStore.deliverySchedule,
                            sundayProcessing,
                          });
                        }}
                      />
                    )}
                    name='sundayProcessing'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Holiday Processing'
                        hasError={!!errors.holidayProcessing}
                        value={value}
                        onChange={holidayProcessing => {
                          onChange(holidayProcessing);
                          deliveryScheduleStore.updateDeliverySchedule({
                            ...deliveryScheduleStore.deliverySchedule,
                            holidayProcessing,
                          });
                        }}
                      />
                    )}
                    name='holidayProcessing'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        hasError={!!errors.sundayReporting}
                        label='Sunday Reporting'
                        value={value}
                        onChange={sundayReporting => {
                          onChange(sundayReporting);
                          deliveryScheduleStore.updateDeliverySchedule({
                            ...deliveryScheduleStore.deliverySchedule,
                            sundayReporting,
                          });
                        }}
                      />
                    )}
                    name='sundayReporting'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Holiday Reporting'
                        hasError={!!errors.holidayReporting}
                        value={value}
                        onChange={holidayReporting => {
                          onChange(holidayReporting);
                          deliveryScheduleStore.updateDeliverySchedule({
                            ...deliveryScheduleStore.deliverySchedule,
                            holidayReporting,
                          });
                        }}
                      />
                    )}
                    name='holidayReporting'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='On Time'
                        hasError={!!errors.onTime}
                        value={value}
                        onChange={onTime => {
                          onChange(onTime);
                          deliveryScheduleStore.updateDeliverySchedule({
                            ...deliveryScheduleStore.deliverySchedule,
                            onTime,
                          });
                        }}
                      />
                    )}
                    name='onTime'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>
            </Grid>
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitDeliverySchedule)}
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
          <div className='p-2 rounded-lg shadow-xl overflow-auto'>
            <DeliverySchduleList
              data={deliveryScheduleStore.listDeliverySchedule || []}
              totalSize={deliveryScheduleStore.listDeliveryScheduleCount}
              extraData={{
                lookupItems: routerStore.lookupItems,
              }}
              isDelete={RouterFlow.checkPermission(
                toJS(routerStore.userPermission),
                'Delete',
              )}
              isEditModify={RouterFlow.checkPermission(
                toJS(routerStore.userPermission),
                'Edit/Modify',
              )}
              // isEditModify={false}
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
                  body: 'Update items!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                deliveryScheduleStore.fetchDeliverySchedule(page, limit);
                global.filter = {mode: 'pagination', page, limit};
              }}
              onFilter={(type, filter, page, limit) => {
                deliveryScheduleStore.deliveryScheduleService.filter({
                  input: {type, filter, page, limit},
                });
                global.filter = {
                  mode: 'filter',
                  type,
                  page,
                  filter,
                  limit,
                };
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              switch (action) {
                case 'Delete': {
                  deliveryScheduleStore.deliveryScheduleService
                    .deleteDeliverySchdule({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      setModalConfirm({show: false});
                      if (res.removeDeliverySchdule.success) {
                        Toast.success({
                          message: `😊 ${res.removeDeliverySchdule.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          deliveryScheduleStore.fetchDeliverySchedule(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          deliveryScheduleStore.deliveryScheduleService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else deliveryScheduleStore.fetchDeliverySchedule();
                      }
                    });
                  break;
                }

                case 'Update': {
                  deliveryScheduleStore.deliveryScheduleService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateDeliverySchdule.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updateDeliverySchdule.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          deliveryScheduleStore.fetchDeliverySchedule(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          deliveryScheduleStore.deliveryScheduleService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else deliveryScheduleStore.fetchDeliverySchedule();
                      }
                    });
                  break;
                }
              }
            }}
            onClose={() => {
              setModalConfirm({show: false});
            }}
          />
        </div>
      </>
    );
  }),
);

export default DeliverySchedule;
