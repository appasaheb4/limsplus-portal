import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import {
  Toast,
  Buttons,
  Grid,
  List,
  AutoCompleteFilterSingleSelect,
  Form,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
  Svg,
  StaticInputTable,
  ImportFile,
  ManualImportTabs,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';

import {EnvironmentSettingsList} from '../components';
import '@/library/assets/css/accordion.css';
import {useForm, Controller} from 'react-hook-form';
import {EnvironmentSettingsHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetEnvironmentSettings} from '../startup';
import _ from 'lodash';
import * as XLSX from 'xlsx';
interface EnvironmentSettingsProps {
  onModalConfirm?: (item: any) => void;
}

export const EnvironmentSettings = EnvironmentSettingsHoc(
  observer((props: EnvironmentSettingsProps) => {
    const {
      loading,
      environmentStore,
      userStore,
      labStore,
      loginStore,
      departmentStore,
      routerStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideInputView, setHideInputView] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    useEffect(() => {
      // Default value initialization
      setValue('environment', loginStore.login.environment);
      setValue('status', environmentStore.environmentSettings?.status);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login]);

    const onSubmitSessionManagement = () => {
      if (!environmentStore.checkExistsEnvSettingsRecord) {
        environmentStore.EnvironmentService.addEnvironment({
          input: isImport
            ? {isImport, arrImportRecords}
            : {
                isImport,
                ...environmentStore.environmentSettings,
                enteredBy: loginStore.login.userId,
                documentType: 'environmentSettings',
              },
        }).then(res => {
          if (res.createEnviroment.success) {
            Toast.success({
              message: `😊 ${res.createEnviroment.message}`,
            });
            setHideInputView(true);
            reset();
            resetEnvironmentSettings();
          }
        });
      }
    };

    const table = useMemo(
      () => (
        <EnvironmentSettingsList
          data={environmentStore.environmentSettingsList}
          totalSize={environmentStore.environmentSettingsListCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            selectedItems: environmentStore.selectedItems,
            user: errors.user,
            listLabs: labStore.listLabs,
            listDepartment: departmentStore.listDepartment,
            environmentVariableList: environmentStore.environmentVariableList,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Edit/Modify',
          )}
          onDelete={selectedUser =>
            props.onModalConfirm && props.onModalConfirm(selectedUser)
          }
          onSelectedRow={rows => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: 'delete',
                id: rows,
                title: 'Are you sure?',
                body: 'Delete selected items!',
              });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: 'update',
                data: {value, dataField, id},
                title: 'Are you sure?',
                body: 'Update recoard!',
              });
          }}
          onPageSizeChange={(page, limit) => {
            environmentStore.fetchEnvironment(
              {documentType: 'environmentSettings'},
              page,
              limit,
            );
            global.filter = {
              mode: 'pagination',
              page,
              limit,
              section: 'environmentSettings',
            };
          }}
          onFilter={(type, filter, page, limit) => {
            environmentStore.EnvironmentService.filter(
              {
                input: {type, filter, page, limit},
              },
              'environmentSettings',
            );
            global.filter = {
              mode: 'filter',
              type,
              filter,
              page,
              limit,
              section: 'environmentSettings',
            };
          }}
          onApproval={async records => {
            const isExists = await checkExistsRecords(records);
            if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'Update',
                data: {value: 'A', dataField: 'status', id: records._id},
                title: 'Are you sure?',
                body: 'Update Environment!',
              });
            }
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [environmentStore.environmentSettingsList],
    );

    const handleFileUpload = (file: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt: any) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type: 'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {raw: true});
        const list = data.map((item: any) => {
          return {
            lab: [],
            user: [],
            department: [],
            variable: item.Variable,
            value: item.Value,
            descriptions: item.Description,
            environment: item.Environment,
            // allLabs:item[],
            // allUsers:item[],
            // allDepartment:item[]
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = userStore.user,
      length = 0,
      status = 'A',
    ) => {
      return environmentStore.EnvironmentService.findByFields({
        input: {
          filter: {
            ..._.pick({...fields, status}, [
              'variable',
              'value',
              'environment',
              'status',
            ]),
          },
        },
      }).then(res => {
        if (
          res.findByFieldsUser?.success &&
          res.findByFieldsUser?.data?.length > length
        ) {
          //setIsExistsRecord(true);
          Toast.error({
            message: '😔 Already some record exists.',
          });
          return true;
        } else return false;
      });
    };

    return (
      <>
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemoveBottom
            style={{bottom: 40}}
            show={hideInputView}
            onClick={() => setHideInputView(!hideInputView)}
          />
        )}
        <div
          className={
            'p-2 rounded-lg shadow-xl ' + (hideInputView ? 'shown' : 'shown')
          }
        >
          <ManualImportTabs
            isImport={isImport}
            onClick={flag => {
              setIsImport(flag);
            }}
          />

          <div className='p-2 rounded-lg shadow-xl'>
            {!isImport ? (
              <Grid cols={2}>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <AutoCompleteFilterSingleSelect
                        displayValue={value}
                        loader={loading}
                        placeholder='Search by variable'
                        data={{
                          list: environmentStore.environmentVariableList.filter(
                            item => item.documentType === 'environmentVariable',
                          ),
                          displayKey: 'environmentVariable',
                        }}
                        hasError={!!errors.name}
                        onFilter={(value: string) => {
                          environmentStore.EnvironmentService.filter(
                            {
                              input: {
                                type: 'filter',
                                filter: {
                                  environmentVariable: value,
                                  documentType: 'environmentVariable',
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                            'environmentVariable',
                          ).then(res => {});
                        }}
                        onSelect={item => {
                          onChange(item.environmentVariable);
                          environmentStore.updateEnvironmentSettings({
                            ...environmentStore.environmentSettings,
                            variable: item.environmentVariable,
                            allLabs: item.allLabs,
                            allUsers: item.allUsers,
                            allDepartment: item.allDepartment,
                          });
                          environmentStore.updatePermision({
                            ...environmentStore.permission,
                            allLabs: item.allLabs || false,
                            allUsers: item.allUsers || false,
                            allDepartment: item.allDepartment || false,
                          });
                          environmentStore.updateEnvVariableList(
                            environmentStore.environmentVariableListCopy,
                          );
                          environmentStore.EnvironmentService.checkExistsRecord(
                            {
                              input: {
                                filter: {
                                  variable: item.environmentVariable,
                                  documentType: 'environmentSettings',
                                  environment:
                                    environmentStore.environmentSettings
                                      ?.environment,
                                },
                              },
                            },
                          ).then(res => {
                            if (res.checkExistsEnviromentRecord.success) {
                              environmentStore.updateExistsEnvSettingRecord(
                                true,
                              );
                              Toast.error({
                                message: `😔 ${res.checkExistsEnviromentRecord.message}`,
                              });
                            } else
                              environmentStore.updateExistsEnvSettingRecord(
                                false,
                              );
                          });
                        }}
                      />
                    )}
                    name='variable'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  {environmentStore.checkExistsEnvSettingsRecord && (
                    <span className='text-red-600 font-medium relative'>
                      Environment variable already exits. Please select other
                      variable.
                    </span>
                  )}
                  {(environmentStore.environmentSettings ||
                    (environmentStore.selectedItems &&
                      environmentStore.selectedItems?.labs &&
                      environmentStore.selectedItems?.labs.length > 0) ||
                    labStore.listLabs) && (
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Labs'
                          id='labs'
                          hasError={!!errors.lab}
                        >
                          <div className='flex flex-row gap-2 w-full'>
                            <Form.Toggle
                              label='All'
                              disabled={!environmentStore.permission?.allLabs}
                              value={value}
                              onChange={allLabs => {
                                environmentStore.updateEnvironmentSettings({
                                  ...environmentStore.environmentSettings,
                                  allLabs,
                                  lab: [],
                                });
                                environmentStore.updateSelectedItems({
                                  ...environmentStore.selectedItems,
                                  labs: [],
                                });
                              }}
                            />

                            <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                              loader={loading}
                              disable={
                                !environmentStore.environmentSettings.allLabs &&
                                !environmentStore.permission?.allLabs
                              }
                              placeholder='Search by code or name'
                              data={{
                                list: labStore.listLabs,
                                selected: environmentStore.selectedItems?.labs,
                                displayKey: ['code', 'name'],
                              }}
                              hasError={!!errors.labs}
                              onUpdate={item => {
                                const items =
                                  environmentStore.selectedItems?.labs;
                                onChange(items);
                                environmentStore.updateEnvironmentSettings({
                                  ...environmentStore.environmentSettings,
                                  lab: items,
                                });
                                labStore.updateLabList(labStore.listLabsCopy);
                              }}
                              onFilter={(value: string) => {
                                labStore.LabService.filterByFields({
                                  input: {
                                    filter: {
                                      fields: ['code', 'name'],
                                      srText: value,
                                    },
                                    page: 0,
                                    limit: 10,
                                  },
                                });
                              }}
                              onSelect={item => {
                                let labs = environmentStore.selectedItems?.labs;
                                if (!item.selected) {
                                  if (labs && labs.length > 0) {
                                    labs.push(item);
                                  } else labs = [item];
                                } else {
                                  labs = labs.filter(items => {
                                    return items._id !== item._id;
                                  });
                                }
                                environmentStore.updateSelectedItems({
                                  ...environmentStore.selectedItems,
                                  labs,
                                });
                              }}
                            />
                          </div>
                        </Form.InputWrapper>
                      )}
                      name='lab'
                      rules={{required: false}}
                      defaultValue=''
                    />
                  )}
                  {(environmentStore.environmentSettings ||
                    (environmentStore.selectedItems &&
                      environmentStore.selectedItems?.users &&
                      environmentStore.selectedItems?.users.length > 0) ||
                    userStore.userList) && (
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Users'
                          id='user'
                          hasError={!!errors.user}
                        >
                          <div className='flex flex-row gap-2 w-full'>
                            <Form.Toggle
                              label='All'
                              disabled={!environmentStore.permission?.allUsers}
                              value={value}
                              onChange={allUsers => {
                                environmentStore.updateEnvironmentSettings({
                                  ...environmentStore.environmentSettings,
                                  allUsers,
                                  user: [],
                                });
                                environmentStore.updateSelectedItems({
                                  ...environmentStore.selectedItems,
                                  users: [],
                                });
                              }}
                            />

                            <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                              loader={loading}
                              disable={
                                !environmentStore.environmentSettings
                                  .allUsers &&
                                !environmentStore.permission?.allUsers
                              }
                              placeholder='Search by userId or name...'
                              data={{
                                list: userStore.userList,
                                selected: environmentStore.selectedItems?.users,
                                displayKey: ['userId', 'fullName'],
                              }}
                              hasError={!!errors.user}
                              onUpdate={item => {
                                const items =
                                  environmentStore.selectedItems?.users;
                                onChange(items);
                                environmentStore.updateEnvironmentSettings({
                                  ...environmentStore.environmentSettings,
                                  user: items,
                                });
                                userStore.updateUserList(
                                  userStore.userListCopy,
                                );
                              }}
                              onFilter={(value: string) => {
                                userStore.UsersService.filterByFields({
                                  input: {
                                    filter: {
                                      fields: ['userId', 'fullName'],
                                      srText: value,
                                    },
                                    page: 0,
                                    limit: 10,
                                  },
                                });
                              }}
                              onSelect={item => {
                                let users =
                                  environmentStore.selectedItems?.users;
                                if (!item.selected) {
                                  if (users && users.length > 0) {
                                    users.push(item);
                                  } else users = [item];
                                } else {
                                  users = users.filter(items => {
                                    return items._id !== item._id;
                                  });
                                }
                                environmentStore.updateSelectedItems({
                                  ...environmentStore.selectedItems,
                                  users,
                                });
                              }}
                            />
                          </div>
                        </Form.InputWrapper>
                      )}
                      name='user'
                      rules={{required: false}}
                      defaultValue=''
                    />
                  )}
                  {((environmentStore.selectedItems &&
                    environmentStore.selectedItems?.department &&
                    environmentStore.selectedItems?.department.length > 0) ||
                    departmentStore.listDepartment) && (
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Department'
                          id='department'
                          hasError={!!errors.department}
                        >
                          <div className='flex flex-row gap-2 w-full'>
                            <Form.Toggle
                              label='All'
                              disabled={
                                !environmentStore.permission?.allDepartment
                              }
                              value={value}
                              onChange={allDepartment => {
                                environmentStore.updateEnvironmentSettings({
                                  ...environmentStore.environmentSettings,
                                  allDepartment,
                                  department: [],
                                });
                                environmentStore.updateSelectedItems({
                                  ...environmentStore.selectedItems,
                                  department: [],
                                });
                              }}
                            />
                            <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                              loader={loading}
                              disable={
                                !environmentStore.environmentSettings
                                  ?.allDepartment &&
                                !environmentStore.permission?.allDepartment
                              }
                              placeholder='Search by code or name'
                              data={{
                                list: departmentStore.listDepartment,
                                selected:
                                  environmentStore.selectedItems?.department,
                                displayKey: ['code', 'name'],
                              }}
                              hasError={!!errors.department}
                              onUpdate={item => {
                                const items =
                                  environmentStore.selectedItems?.department;
                                onChange(items);
                                environmentStore.updateEnvironmentSettings({
                                  ...environmentStore.environmentSettings,
                                  department: items,
                                });
                                departmentStore.updateDepartmentList(
                                  departmentStore.listDepartmentCopy,
                                );
                              }}
                              onFilter={(value: string) => {
                                departmentStore.DepartmentService.filterByFields(
                                  {
                                    input: {
                                      filter: {
                                        fields: ['code', 'name'],
                                        srText: value,
                                      },
                                      page: 0,
                                      limit: 10,
                                    },
                                  },
                                );
                              }}
                              onSelect={item => {
                                let department =
                                  environmentStore.selectedItems?.department;
                                if (!item.selected) {
                                  if (department && department.length > 0) {
                                    department.push(item);
                                  } else department = [item];
                                } else {
                                  department = department.filter(items => {
                                    return items._id !== item._id;
                                  });
                                }
                                environmentStore.updateSelectedItems({
                                  ...environmentStore.selectedItems,
                                  department,
                                });
                              }}
                            />
                          </div>
                        </Form.InputWrapper>
                      )}
                      name='department'
                      rules={{required: false}}
                      defaultValue=''
                    />
                  )}
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Value'
                        hasError={!!errors.value}
                        value={value}
                        placeholder={
                          errors.value ? 'Please Enter Value' : 'Value'
                        }
                        onChange={value => {
                          onChange(value);
                          environmentStore.updateEnvironmentSettings({
                            ...environmentStore.environmentSettings,
                            value: value.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='value'
                    rules={{required: true}}
                    defaultValue=''
                  />
                </List>
                <List direction='col' justify='stretch' fill space={4}>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.MultilineInput
                        rows={3}
                        label='Description'
                        name='lblDescription'
                        placeholder={
                          errors.descriptions
                            ? 'Please Enter descriptions'
                            : 'Description'
                        }
                        hasError={!!errors.descriptions}
                        value={value}
                        onChange={descriptions => {
                          onChange(descriptions);
                          environmentStore.updateEnvironmentSettings({
                            ...environmentStore.environmentSettings,
                            descriptions,
                          });
                        }}
                      />
                    )}
                    name='descriptions'
                    rules={{required: false}}
                    defaultValue=''
                  />
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
                            errors.status ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const status = e.target.value;
                            onChange(status);
                            environmentStore.updateEnvironmentSettings({
                              ...environmentStore.environmentSettings,
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
                            environmentStore.updateEnvironmentSettings({
                              ...environmentStore.environmentSettings,
                              environment,
                            });
                            environmentStore.EnvironmentService.checkExistsRecord(
                              {
                                input: {
                                  filter: {
                                    variable:
                                      environmentStore.environmentSettings
                                        .variable,
                                    documentType: 'environmentSettings',
                                    environment,
                                  },
                                },
                              },
                            ).then(res => {
                              if (res.checkExistsEnviromentRecord.success) {
                                environmentStore.updateExistsEnvSettingRecord(
                                  true,
                                );
                                Toast.error({
                                  message: `😔 ${res.checkExistsEnviromentRecord.message}`,
                                });
                              } else
                                environmentStore.updateExistsEnvSettingRecord(
                                  false,
                                );
                            });
                          }}
                        >
                          <option selected>
                            {loginStore.login &&
                            loginStore.login.role !== 'SYSADMIN'
                              ? 'Select'
                              : environmentStore.environmentSettings
                                  ?.environment || 'Select'}
                          </option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'ENVIRONMENT SETTING - ENVIRONMENT',
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
            ) : (
              <>
                {arrImportRecords?.length > 0 ? (
                  <StaticInputTable data={arrImportRecords} />
                ) : (
                  <ImportFile
                    onClick={file => {
                      handleFileUpload(file[0]);
                    }}
                  />
                )}
              </>
            )}
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitSessionManagement)}
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
        </div>

        <div
          className='p-2 rounded-lg shadow-xl overflow-scroll'
          style={{overflowX: 'scroll'}}
        >
          {table}
        </div>
      </>
    );
  }),
);
