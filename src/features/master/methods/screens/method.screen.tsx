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
import {MethodsList} from '../components';
import {lookupItems, lookupValue, toTitleCase} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {MethodsHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {resetMethod} from '../startup';

const Methods = MethodsHoc(
  observer(() => {
    const {loginStore, methodsStore, routerStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();
    setValue('status', methodsStore.methods?.status);
    setValue('environment', methodsStore.methods?.environment);
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddSection, setHideAddSection] = useState<boolean>(true);
    const onSubmitMethods = () => {
      if (!methodsStore.checkExitsEnvCode) {
        methodsStore.methodsService
          .addMethods({input: {...methodsStore.methods}})
          .then(res => {
            if (res.createMethod.success) {
              Toast.success({
                message: `😊 ${res.createMethod.message}`,
              });
              setHideAddSection(true);
              reset();
              resetMethod();
            }
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
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddSection}
            onClick={() => setHideAddSection(!hideAddSection)}
          />
        )}
        <div className=' mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddSection ? 'hidden' : 'shown')
            }
          >
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Method Code'
                      placeholder={
                        errors.methodsCode
                          ? 'Please Enter Method Code'
                          : 'Method Code'
                      }
                      hasError={!!errors.methodsCode}
                      value={value}
                      onChange={methodsCode => {
                        onChange(methodsCode);
                        methodsStore.updateMethods({
                          ...methodsStore.methods,
                          methodsCode: methodsCode.toUpperCase(),
                        });
                      }}
                      onBlur={code => {
                        methodsStore.methodsService
                          .checkExitsEnvCode({
                            input: {
                              code,
                              env: methodsStore.methods?.environment,
                            },
                          })
                          .then(res => {
                            if (res.checkMethodsExistsRecord.success) {
                              methodsStore.updateExitsEnvCode(true);
                              Toast.error({
                                message: `😔 ${res.checkMethodsExistsRecord.message}`,
                              });
                            } else methodsStore.updateExitsEnvCode(false);
                          });
                      }}
                    />
                  )}
                  name='methodsCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                {methodsStore.checkExitsEnvCode && (
                  <span className='text-red-600 font-medium relative'>
                    Code already exits. Please use other code.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Method Name'
                      placeholder={
                        errors.methodName
                          ? 'Please Enter Methods Name'
                          : 'Methods Name'
                      }
                      hasError={!!errors.methodName}
                      value={value}
                      onChange={methodsName => {
                        onChange(methodsName);
                        methodsStore.updateMethods({
                          ...methodsStore.methods,
                          methodsName: methodsName.toUpperCase(),
                          description: `(${toTitleCase(methodsName)})`,
                        });
                      }}
                    />
                  )}
                  name='methodName'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.MultilineInput
                      rows={4}
                      label='Description'
                      placeholder={
                        errors.description
                          ? 'Please enter description'
                          : 'Description'
                      }
                      hasError={!!errors.description}
                      value={value}
                      onChange={description => {
                        onChange(description);
                        methodsStore.updateMethods({
                          ...methodsStore.methods,
                          description,
                        });
                      }}
                    />
                  )}
                  name='description'
                  rules={{required: false}}
                  defaultValue=''
                />
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Status'
                      hasError={!!errors.status}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? 'border-red-500  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const status = e.target.value;
                          onChange(status);
                          methodsStore.updateMethods({
                            ...methodsStore.methods,
                            status,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'STATUS').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='status'
                  rules={{required: true}}
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
                          methodsStore.updateMethods({
                            ...methodsStore.methods,
                            environment,
                          });
                          methodsStore.methodsService
                            .checkExitsEnvCode({
                              input: {
                                code: methodsStore.methods?.methodsCode,
                                env: environment,
                              },
                            })
                            .then(res => {
                              if (res.checkMethodsExistsRecord.success) {
                                methodsStore.updateExitsEnvCode(true);
                                Toast.error({
                                  message: `😔 ${res.checkMethodsExistsRecord.message}`,
                                });
                              } else methodsStore.updateExitsEnvCode(false);
                            });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : methodsStore.methods?.environment || 'Select'}
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
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitMethods)}
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
            <MethodsList
              data={methodsStore.listMethods || []}
              totalSize={methodsStore.listMethodsCount}
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
                  body: 'Update Section!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                methodsStore.fetchMethods(page, limit);
                global.filter = {mode: 'pagination', page, limit};
              }}
              onFilter={(type, filter, page, limit) => {
                methodsStore.methodsService.filter({
                  input: {type, filter, page, limit},
                });
                global.filter = {mode: 'filter', type, page, limit, filter};
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              switch (action) {
                case 'Delete': {
                  methodsStore.methodsService
                    .deleteMethods({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeMethod.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.removeMethod.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          methodsStore.fetchMethods(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          methodsStore.methodsService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else methodsStore.fetchMethods();
                      }
                    });
                  break;
                }
                case 'Update': {
                  methodsStore.methodsService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateMethod.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updateMethod.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          methodsStore.fetchMethods(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          methodsStore.methodsService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else methodsStore.fetchMethods();
                      }
                    });
                  break;
                }
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />
        </div>
      </>
    );
  }),
);

export default Methods;
