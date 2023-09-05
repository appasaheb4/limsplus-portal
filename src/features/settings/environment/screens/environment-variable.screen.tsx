import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';

import {EnvironmentVariableList} from '../components';
import '@/library/assets/css/accordion.css';
import {useForm, Controller} from 'react-hook-form';

import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetEnvironmentVariable} from '../startup';
import _ from 'lodash';
import * as XLSX from 'xlsx';
interface EnvironmentVariableProps {
  onModalConfirm?: (item: any) => void;
}

export const EnvironmentVariable = observer(
  (props: EnvironmentVariableProps) => {
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();
    const {loginStore, environmentStore, routerStore} = useStores();
    const [hideInputView, setHideInputView] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [modalConfirm, setModalConfirm] = useState<any>();

    const onSubmitEnvironmentVariable = () => {
      if (!environmentStore.checkExistsEnvVariable) {
        environmentStore.EnvironmentService.addEnvironment({
          input: isImport
            ? {isImport, arrImportRecords}
            : {
                isImport,
                ...environmentStore.environmentVariable,
                enteredBy: loginStore.login.userId,
                documentType: 'environmentVariable',
              },
        }).then(res => {
          if (res.createEnviroment.success) {
            Toast.success({
              message: `😊 ${res.createEnviroment.message}`,
            });
            setHideInputView(true);
            reset();
            resetEnvironmentVariable();
          }
        });
      } else {
        Toast.warning({
          message: '😔 Please enter diff variable',
        });
      }
    };

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
            environmentVariable: item['Environment Variable'],
            category: item.Category,
            description: item.Description,
            enteredBy: loginStore.login?.userId,
            allLabs: item['All Labs'] === 'Yes' ? true : false,
            allUsers: item['All Users'] === 'Yes' ? true : false,
            allDepartment: item['All Department'] === 'Yes' ? true : false,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = environmentStore.environmentVariable,
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
            'p-1 rounded-lg shadow-xl ' + (hideInputView ? 'hidden' : 'shown')
          }
        >
          <div className='p-1 rounded-lg shadow-xl'>
            <ManualImportTabs
              isImport={isImport}
              onClick={flag => {
                setIsImport(flag);
              }}
            />
            {!isImport ? (
              <Grid cols={2}>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Environment Variables'
                        name='txtEnvironmentVariable'
                        value={value}
                        hasError={!!errors.environmentVariable}
                        placeholder={
                          errors.environmentVariable
                            ? 'Please Enter Environment Variable'
                            : 'Environment Variable'
                        }
                        onChange={environmentVariable => {
                          onChange(environmentVariable);
                          environmentStore.updatEnvironmentVariable({
                            ...environmentStore.environmentVariable,
                            environmentVariable:
                              environmentVariable.toUpperCase(),
                          });
                        }}
                        onBlur={environmentVariable => {
                          if (environmentVariable)
                            environmentStore.EnvironmentService.checkExistsRecord(
                              {
                                input: {
                                  filter: {
                                    environmentVariable,
                                    documentType: 'environmentVariable',
                                  },
                                },
                              },
                            ).then(res => {
                              if (res.checkExistsEnviromentRecord.success) {
                                environmentStore.updateExistsEnvVariable(true);
                                Toast.error({
                                  message: `😔 ${res.checkExistsEnviromentRecord.message}`,
                                });
                              } else
                                environmentStore.updateExistsEnvVariable(false);
                            });
                        }}
                      />
                    )}
                    name='environmentVariable'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  {environmentStore.checkExistsEnvVariable && (
                    <span className='text-red-600 font-medium relative'>
                      Environment variable already exits. Please use other
                      variable.
                    </span>
                  )}
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper
                        label='Category'
                        hasError={!!errors.category}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.category ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const category = e.target.value as string;
                            onChange(category);
                            environmentStore.updatEnvironmentVariable({
                              ...environmentStore.environmentVariable,
                              category,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'ENVIRONMENT_VARIABLES_CATEGORY',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='category'
                    rules={{required: true}}
                    defaultValue=''
                  />
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
                          environmentStore.updatEnvironmentVariable({
                            ...environmentStore.environmentVariable,
                            descriptions,
                          });
                        }}
                      />
                    )}
                    name='descriptions'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Entered By'
                        placeholder={
                          errors.userId
                            ? 'Please Enter Entered By'
                            : 'Entered By'
                        }
                        hasError={!!errors.userId}
                        value={loginStore.login?.userId}
                        disabled={true}
                      />
                    )}
                    name='userId'
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
                            environmentStore.updatEnvironmentVariable({
                              ...environmentStore.environmentVariable,
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
                  <Form.InputWrapper label='Scope'>
                    <Grid cols={4}>
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Lab'
                            hasError={!!errors.lab}
                            value={value}
                            onChange={allLabs => {
                              onChange(allLabs);
                              environmentStore.updatEnvironmentVariable({
                                ...environmentStore.environmentVariable,
                                allLabs,
                              });
                            }}
                          />
                        )}
                        name='lab'
                        rules={{required: false}}
                        defaultValue=''
                      />

                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='User'
                            value={value}
                            onChange={allUsers => {
                              onChange(allUsers);
                              environmentStore.updatEnvironmentVariable({
                                ...environmentStore.environmentVariable,
                                allUsers,
                              });
                            }}
                          />
                        )}
                        name='user'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Departmetn'
                            value={value}
                            onChange={allDepartment => {
                              onChange(allDepartment);
                              environmentStore.updatEnvironmentVariable({
                                ...environmentStore.environmentVariable,
                                allDepartment,
                              });
                            }}
                          />
                        )}
                        name='department'
                        rules={{required: false}}
                        defaultValue=''
                      />
                    </Grid>
                  </Form.InputWrapper>
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
                onClick={handleSubmit(onSubmitEnvironmentVariable)}
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
          className='p-1 rounded-lg shadow-xl overflow-scroll'
          style={{overflowX: 'scroll'}}
        >
          <EnvironmentVariableList
            data={environmentStore.environmentVariableList}
            totalSize={environmentStore.environmentVariableListCount}
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
                {documentType: 'environmentVariable'},
                page,
                limit,
              );
              global.filter = {
                mode: 'pagination',
                page,
                limit,
                section: 'environmentVariable',
              };
            }}
            onFilter={(type, filter, page, limit) => {
              environmentStore.EnvironmentService.filter(
                {
                  input: {type, filter, page, limit},
                },
                'environmentVariable',
              );
              global.filter = {
                mode: 'filter',
                type,
                filter,
                page,
                limit,
                section: 'environmentVariable',
              };
            }}
            onApproval={async records => {
              // const isExists = await checkExistsRecords(records);
              // if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'Update',
                data: {value: 'A', dataField: 'status', id: records._id},
                title: 'Are you sure?',
                body: 'Update User!',
              });
              // }
            }}
          />
        </div>
      </>
    );
  },
);
