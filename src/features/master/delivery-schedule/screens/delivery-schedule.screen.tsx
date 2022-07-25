import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
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

const DeliverySchedule = DeliveryScheduleHoc(
  observer(() => {
    const {loginStore, deliveryScheduleStore, routerStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
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
            setTimeout(() => {
              window.location.reload();
            }, 2000);
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
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Sch Code'
                      placeholder={
                        errors.schCode ? 'Please Enter Sch Code' : 'Sch Code'
                      }
                      hasError={!!errors.schCode}
                      value={deliveryScheduleStore.deliverySchedule?.schCode}
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
                  render={({field: {onChange}}) => (
                    <Form.Clock
                      label='P Start Time'
                      hasError={!!errors.pStartTime}
                      value={deliveryScheduleStore.deliverySchedule?.pStartTime}
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
                  render={({field: {onChange}}) => (
                    <Form.Clock
                      label='P End Time'
                      hasError={!!errors.pEndTime}
                      value={deliveryScheduleStore.deliverySchedule?.pEndTime}
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
                  render={({field: {onChange}}) => (
                    <Form.Clock
                      label='Cutof Time'
                      hasError={!!errors.cutofTime}
                      value={deliveryScheduleStore.deliverySchedule?.cutofTime}
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
                  render={({field: {onChange}}) => (
                    <Form.Clock
                      label='Secound Cutof Time'
                      hasError={!!errors.secoundCutofTime}
                      value={
                        deliveryScheduleStore.deliverySchedule?.secoundCutofTime
                      }
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
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Processing Type'
                      hasError={!!errors.processingType}
                    >
                      <select
                        value={
                          deliveryScheduleStore.deliverySchedule?.processingType
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.processingType
                            ? 'border-red-500  '
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
                  render={({field: {onChange}}) => (
                    <ScheduleFrequency
                      type={
                        deliveryScheduleStore.deliverySchedule
                          ?.processingType || ''
                      }
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
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Report on'
                      placeholder={
                        errors.reportOn ? 'Please Enter ReportOn' : 'ReportOn'
                      }
                      hasError={!!errors.reportOn}
                      value={deliveryScheduleStore.deliverySchedule?.reportOn}
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
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Dynamic RT'
                      placeholder={
                        errors.dynamicRT
                          ? 'Please Enter DynamicRT '
                          : 'DynamicRT'
                      }
                      hasError={!!errors.dynamicRT}
                      value={deliveryScheduleStore.deliverySchedule?.dynamicRT}
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
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Dynamic TU'
                      hasError={!!errors.dynamicTU}
                    >
                      <select
                        value={
                          deliveryScheduleStore.deliverySchedule?.dynamicTU
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.dynamicTU
                            ? 'border-red-500  '
                            : 'border-gray-300'
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
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Fixed RT'
                      placeholder={
                        errors.fixedRT ? 'Please Enter fixedRT' : 'fixedRT'
                      }
                      hasError={!!errors.fixedRT}
                      value={deliveryScheduleStore.deliverySchedule?.fixedRT}
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
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Sch For DEPT'
                      placeholder={
                        errors.schForDept
                          ? 'Please Enter schForDept'
                          : 'schForDept'
                      }
                      hasError={!!errors.schForDept}
                      value={deliveryScheduleStore.deliverySchedule?.schForDept}
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
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Sch For PAT'
                      placeholder={
                        errors.schForPat
                          ? 'Please Enter schForPat'
                          : 'schForPat'
                      }
                      hasError={!!errors.schForPat}
                      value={deliveryScheduleStore.deliverySchedule?.schForPat}
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
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Environment'>
                      <select
                        value={
                          deliveryScheduleStore.deliverySchedule?.environment
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? 'border-red-500  '
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
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Sunday Processing'
                        hasError={!!errors.sundayProcessing}
                        value={
                          deliveryScheduleStore.deliverySchedule
                            ?.sundayProcessing
                        }
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
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Holiday Processing'
                        hasError={!!errors.holidayProcessing}
                        value={
                          deliveryScheduleStore.deliverySchedule
                            ?.holidayProcessing
                        }
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
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        hasError={!!errors.sundayReporting}
                        label='Sunday Reporting'
                        value={
                          deliveryScheduleStore.deliverySchedule
                            ?.sundayReporting
                        }
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
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Holiday Reporting'
                        hasError={!!errors.holidayReporting}
                        value={
                          deliveryScheduleStore.deliverySchedule
                            ?.holidayReporting
                        }
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
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='On Time'
                        hasError={!!errors.onTime}
                        value={deliveryScheduleStore.deliverySchedule?.onTime}
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
              }}
              onFilter={(type, filter, page, limit) => {
                deliveryScheduleStore.deliveryScheduleService.filter({
                  input: {type, filter, page, limit},
                });
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              switch (type) {
                case 'Delete': {
                  deliveryScheduleStore.deliveryScheduleService
                    .deleteDeliverySchdule({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeDeliverySchdule.success) {
                        Toast.success({
                          message: `😊 ${res.removeDeliverySchdule.message}`,
                        });
                        setModalConfirm({show: false});
                        deliveryScheduleStore.fetchDeliverySchedule();
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
                        Toast.success({
                          message: `😊 ${res.updateDeliverySchdule.message}`,
                        });
                        setModalConfirm({show: false});
                        deliveryScheduleStore.fetchDeliverySchedule();
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
