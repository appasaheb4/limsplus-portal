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
  Icons,
} from '@/library/components';
import {InterfaceManagerList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {InterfaceManagerHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
export const InterfaceManager = InterfaceManagerHoc(
  observer(() => {
    const {loginStore, interfaceManagerStore, routerStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();

    setValue(
      'environment',
      interfaceManagerStore.interfaceManager?.environment,
    );

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddInterfaceManager, setHideAddInterfaceManager] =
      useState<boolean>(true);

    const onSubmitInterfaceManager = () => {
      if (
        interfaceManagerStore.interfaceManager &&
        interfaceManagerStore.interfaceManager.fileds &&
        interfaceManagerStore.interfaceManager.fileds?.length > 0
      ) {
        interfaceManagerStore.interfaceManagerService
          .addInterfaceManager({
            input: {...interfaceManagerStore.interfaceManager},
          })
          .then(res => {
            if (res.createInterfaceManager.success) {
              Toast.success({
                message: `😊 ${res.createInterfaceManager.message}`,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          });
      } else {
        Toast.warning({
          message: '😔 Please enter filed and value!',
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
            show={hideAddInterfaceManager}
            onClick={status =>
              setHideAddInterfaceManager(!hideAddInterfaceManager)
            }
          />
        )}
        <div className=' mx-auto  flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddInterfaceManager ? 'hidden' : 'shown')
            }
          >
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Interface Type'
                      name='interfaceType'
                      placeholder={
                        errors.interfaceType
                          ? 'Please Enter InterFace Type'
                          : 'Interface Type'
                      }
                      hasError={!!errors.interfaceType}
                      value={
                        interfaceManagerStore.interfaceManager?.interfaceType
                      }
                      onChange={interfaceType => {
                        onChange(interfaceType);
                        interfaceManagerStore.updateInterfaceManager({
                          ...interfaceManagerStore.interfaceManager,
                          interfaceType,
                        });
                      }}
                    />
                  )}
                  name='interfaceType'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Instrument Type'
                      name='instrumentType'
                      placeholder={
                        errors.instrumentType
                          ? 'Please Enter instrumentType'
                          : 'Instrument Type'
                      }
                      hasError={!!errors.instrumentType}
                      value={
                        interfaceManagerStore.interfaceManager?.instrumentType
                      }
                      onChange={instrumentType => {
                        onChange(instrumentType);
                        interfaceManagerStore.updateInterfaceManager({
                          ...interfaceManagerStore.interfaceManager,
                          instrumentType,
                        });
                      }}
                    />
                  )}
                  name='instrumentType'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Instrument Name'
                      name='instrumentName'
                      placeholder={
                        errors.instrumentName
                          ? 'Please Enter InstrumentName'
                          : 'Instrument Name'
                      }
                      hasError={!!errors.instrumentName}
                      value={
                        interfaceManagerStore.interfaceManager?.instrumentName
                      }
                      onChange={instrumentName => {
                        onChange(instrumentName);
                        interfaceManagerStore.updateInterfaceManager({
                          ...interfaceManagerStore.interfaceManager,
                          instrumentName,
                        });
                      }}
                    />
                  )}
                  name='instrumentName'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Data Flow From'
                      name='dataFlowFrom'
                      placeholder={
                        errors.dataFlowFrom
                          ? 'Please Enter DataFlowFrom'
                          : 'Data Flow From'
                      }
                      hasError={!!errors.dataFlowFrom}
                      value={
                        interfaceManagerStore.interfaceManager?.dataFlowFrom
                      }
                      onChange={dataFlowFrom => {
                        onChange(dataFlowFrom);
                        interfaceManagerStore.updateInterfaceManager({
                          ...interfaceManagerStore.interfaceManager,
                          dataFlowFrom,
                        });
                      }}
                    />
                  )}
                  name='dataFlowFrom'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Communication Protocol'
                      name='communicationProtocal'
                      placeholder={
                        errors.communicationProtocal
                          ? 'Please Enter communicationProtocal'
                          : 'Communication Protocal'
                      }
                      hasError={!!errors.communicationProtocal}
                      value={
                        interfaceManagerStore.interfaceManager
                          ?.communicationProtocol
                      }
                      onChange={communicationProtocol => {
                        onChange(communicationProtocol);
                        interfaceManagerStore.updateInterfaceManager({
                          ...interfaceManagerStore.interfaceManager,
                          communicationProtocol,
                        });
                      }}
                    />
                  )}
                  name='communicationProtocal'
                  rules={{required: false}}
                  defaultValue=''
                />

                <div className='clearfix' />
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Form.InputWrapper label='Block' id='block'>
                  <Grid cols={2}>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Input
                          name='startBlock'
                          placeholder={
                            errors.startBlock
                              ? 'Please Enter BlockStart'
                              : 'Start Block'
                          }
                          hasError={!!errors.startBlock}
                          value={
                            interfaceManagerStore.interfaceManager?.blockStart
                          }
                          onChange={blockStart => {
                            onChange(blockStart);
                            interfaceManagerStore.updateInterfaceManager({
                              ...interfaceManagerStore.interfaceManager,
                              blockStart,
                            });
                          }}
                        />
                      )}
                      name='startBlock'
                      rules={{required: true}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Input
                          name='endBlock'
                          placeholder={
                            errors.endBlock
                              ? 'Please Enter endBlock'
                              : 'End Block'
                          }
                          hasError={!!errors.endBlock}
                          value={
                            interfaceManagerStore.interfaceManager?.blockEnd
                          }
                          onChange={blockEnd => {
                            onChange(blockEnd);
                            interfaceManagerStore.updateInterfaceManager({
                              ...interfaceManagerStore.interfaceManager,
                              blockEnd,
                            });
                          }}
                        />
                      )}
                      name='endBlock'
                      rules={{required: true}}
                      defaultValue=''
                    />
                  </Grid>
                </Form.InputWrapper>

                <Form.InputWrapper label='Filed' id='filed'>
                  <Grid cols={3}>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Input
                          name='filed'
                          placeholder={
                            errors.filed ? 'Please Enter Filed' : 'Filed'
                          }
                          hasError={!!errors.filed}
                          value={interfaceManagerStore.interfaceManager?.filed}
                          onChange={filed => {
                            onChange(filed);
                            interfaceManagerStore.updateInterfaceManager({
                              ...interfaceManagerStore.interfaceManager,
                              filed,
                            });
                          }}
                        />
                      )}
                      name='filed'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Input
                          name='value'
                          placeholder={
                            errors.value ? 'Please Enter Value' : 'Value'
                          }
                          hasError={!!errors.value}
                          value={interfaceManagerStore.interfaceManager?.value}
                          onChange={value => {
                            onChange(value);
                            interfaceManagerStore.updateInterfaceManager({
                              ...interfaceManagerStore.interfaceManager,
                              value,
                            });
                          }}
                        />
                      )}
                      name='value'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <div className='mt-2'>
                      <Buttons.Button
                        size='medium'
                        type='solid'
                        onClick={() => {
                          const filed =
                            interfaceManagerStore.interfaceManager?.filed;
                          const value =
                            interfaceManagerStore.interfaceManager?.value;
                          let fileds =
                            interfaceManagerStore.interfaceManager?.fileds ||
                            [];
                          if (filed === undefined)
                            return alert('Please enter filed and value.');
                          if (filed !== undefined) {
                            fileds !== undefined
                              ? fileds.push({
                                  filed,
                                  value,
                                })
                              : (fileds = [
                                  {
                                    filed,
                                    value,
                                  },
                                ]);
                            interfaceManagerStore.updateInterfaceManager({
                              ...interfaceManagerStore.interfaceManager,
                              fileds,
                            });
                            interfaceManagerStore.updateInterfaceManager({
                              ...interfaceManagerStore.interfaceManager,
                              filed: '',
                              value: '',
                            });
                          }
                        }}
                      >
                        <Icons.EvaIcon icon='plus-circle-outline' />
                        {'Add'}
                      </Buttons.Button>
                    </div>
                    <div className='clearfix'></div>
                  </Grid>
                  <List space={2} direction='row' justify='center'>
                    <div>
                      {interfaceManagerStore.interfaceManager?.fileds?.map(
                        (item, index) => (
                          <div className='mb-2'>
                            <Buttons.Button
                              key={index}
                              size='medium'
                              type='solid'
                              icon={Svg.Remove}
                              onClick={() => {
                                const firstArr =
                                  interfaceManagerStore.interfaceManager?.fileds?.slice(
                                    0,
                                    index,
                                  ) || [];
                                const secondArr =
                                  interfaceManagerStore.interfaceManager?.fileds?.slice(
                                    index + 1,
                                  ) || [];
                                const newArrSubCategory = [
                                  ...firstArr,
                                  ...secondArr,
                                ];
                                interfaceManagerStore.updateInterfaceManager({
                                  ...interfaceManagerStore.interfaceManager,
                                  fileds: newArrSubCategory,
                                });
                              }}
                            >
                              {`${item.filed} - ${item.value}`}
                            </Buttons.Button>
                          </div>
                        ),
                      )}
                    </div>
                  </List>
                </Form.InputWrapper>

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Environment'>
                      <select
                        value={
                          interfaceManagerStore.interfaceManager?.environment
                        }
                        className={`leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
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
                          interfaceManagerStore.updateInterfaceManager({
                            ...interfaceManagerStore.interfaceManager,
                            environment,
                          });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : interfaceManagerStore.interfaceManager
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
              </List>
            </Grid>

            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitInterfaceManager)}
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
              <div className='clearfix' />
            </List>
          </div>
          <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
            <InterfaceManagerList
              data={interfaceManagerStore.listInterfaceManager || []}
              totalSize={interfaceManagerStore.listInterfaceManagerCount}
              extraData={{
                lookupItems: routerStore.lookupItems,
                updateInterfaceManager:
                  interfaceManagerStore.updateInterfaceManager,
                interfaceManager: interfaceManagerStore.interfaceManager,
              }}
              isDelete={RouterFlow.checkPermission(
                toJS(routerStore.userPermission),
                'Delete',
              )}
              isEditModify={RouterFlow.checkPermission(
                toJS(routerStore.userPermission),
                'Edit/Modify',
              )}
              onDelete={selectedUser => setModalConfirm(selectedUser)}
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
                  body: 'Update interface manager!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                interfaceManagerStore.fetchEncodeCharacter(page, limit);
              }}
              onFilter={(type, filter, page, limit) => {
                interfaceManagerStore.interfaceManagerService.filter({
                  input: {type, filter, page, limit},
                });
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={type => {
              if (type === 'Delete') {
                interfaceManagerStore.interfaceManagerService
                  .deleteInterfaceManager({input: {id: modalConfirm.id}})
                  .then((res: any) => {
                    if (res.removeInterfaceManager.success) {
                      Toast.success({
                        message: `😊 ${res.removeInterfaceManager.message}`,
                      });
                      setModalConfirm({show: false});
                      interfaceManagerStore.fetchEncodeCharacter();
                    }
                  });
              } else {
                interfaceManagerStore.interfaceManagerService
                  .interfaceManagerUpdateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  })
                  .then(res => {
                    if (res.updateInterfaceManager.success) {
                      Toast.success({
                        message: `😊 ${res.updateInterfaceManager.message}`,
                      });
                      interfaceManagerStore.fetchEncodeCharacter();
                    }
                  });
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
