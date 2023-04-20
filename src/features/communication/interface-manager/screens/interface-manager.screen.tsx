import React, {useState, useEffect} from 'react';
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
import {resetInterfaceManager} from '../startup';
const InterfaceManager = InterfaceManagerHoc(
  observer(() => {
    const {loginStore, interfaceManagerStore, routerStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();
    useEffect(() => {
      // Default value initialization
      setValue(
        'interfaceType',
        interfaceManagerStore.interfaceManager?.interfaceType,
      );
      setValue(
        'environment',
        interfaceManagerStore.interfaceManager?.environment,
      );
      setValue('protocol', interfaceManagerStore.interfaceManager?.protocol);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interfaceManagerStore.interfaceManager]);

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
              setHideAddInterfaceManager(true);
              reset();
              resetInterfaceManager();
              interfaceManagerStore.updateInterfaceManager({
                ...interfaceManagerStore.interfaceManager,
                fileds: [],
              });
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
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Interface Type'>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                          errors.interfaceType
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const interfaceType = e.target.value;
                          onChange(interfaceType);
                          interfaceManagerStore.updateInterfaceManager({
                            ...interfaceManagerStore.interfaceManager,
                            interfaceType,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'INTERFACE_TYPE',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='interfaceType'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Inst Type'
                      placeholder={
                        errors.instrumentType
                          ? 'Please Enter instrumentType'
                          : 'Instrument Type'
                      }
                      hasError={!!errors.instrumentType}
                      value={value}
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
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Inst Name'
                      placeholder={
                        errors.instrumentName
                          ? 'Please Enter InstrumentName'
                          : 'Instrument Name'
                      }
                      hasError={!!errors.instrumentName}
                      value={value}
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
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Protocol'>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                          errors.protocol ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const protocol = e.target.value;
                          onChange(protocol);
                          interfaceManagerStore.updateInterfaceManager({
                            ...interfaceManagerStore.interfaceManager,
                            protocol,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'PROTOCOL').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='protocol'
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
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          name='startBlock'
                          placeholder={
                            errors.startBlock
                              ? 'Please Enter BlockStart'
                              : 'Start Block'
                          }
                          hasError={!!errors.startBlock}
                          value={value}
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
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          name='endBlock'
                          placeholder={
                            errors.endBlock
                              ? 'Please Enter endBlock'
                              : 'End Block'
                          }
                          hasError={!!errors.endBlock}
                          value={value}
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
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          name='filed'
                          placeholder={
                            errors.filed ? 'Please Enter Filed' : 'Filed'
                          }
                          hasError={!!errors.filed}
                          value={value}
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
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          name='value'
                          placeholder={
                            errors.value ? 'Please Enter Value' : 'Value'
                          }
                          hasError={!!errors.value}
                          value={value}
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
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Environment'>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
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
                global.filter = {mode: 'pagination', page, limit};
              }}
              onFilter={(type, filter, page, limit) => {
                interfaceManagerStore.interfaceManagerService.filter({
                  input: {type, filter, page, limit},
                });
                global.filter = {mode: 'filter', type, filter, page, limit};
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={action => {
              if (action === 'Delete') {
                interfaceManagerStore.interfaceManagerService
                  .deleteInterfaceManager({input: {id: modalConfirm.id}})
                  .then((res: any) => {
                    setModalConfirm({show: false});
                    if (res.removeInterfaceManager.success) {
                      Toast.success({
                        message: `😊 ${res.removeInterfaceManager.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        interfaceManagerStore.fetchEncodeCharacter(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        interfaceManagerStore.interfaceManagerService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else interfaceManagerStore.fetchEncodeCharacter();
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
                    setModalConfirm({show: false});
                    if (res.updateInterfaceManager.success) {
                      Toast.success({
                        message: `😊 ${res.updateInterfaceManager.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        interfaceManagerStore.fetchEncodeCharacter(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        interfaceManagerStore.interfaceManagerService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else interfaceManagerStore.fetchEncodeCharacter();
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

export default InterfaceManager;
