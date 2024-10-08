import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  MainPageHeading,
} from '@/library/components';
import { MethodsList } from '../components';
import { lookupItems, lookupValue, toTitleCase } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import { MethodsHoc } from '../hoc';
import { useStores } from '@/stores';
import { RouterFlow } from '@/flows';
import { resetMethod } from '../startup';
import * as XLSX from 'xlsx';
import _ from 'lodash';
import { toJS } from 'mobx';

const Methods = MethodsHoc(
  observer(() => {
    const { loginStore, methodsStore, routerStore } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddSection, setHideAddSection] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);
    const [isExistsRecord, setIsExistsRecord] = useState(false);

    useEffect(() => {
      // Default value initialization
      setValue('status', methodsStore.methods?.status);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [methodsStore.methods]);

    const onSubmitMethods = () => {
      if (!isExistsRecord) {
        methodsStore.methodsService
          .addMethods({
            input: isImport
              ? { isImport, arrImportRecords }
              : { isImport, ...methodsStore.methods },
          })
          .then(res => {
            if (res.createMethod.success) {
              Toast.success({
                message: `😊 ${res.createMethod.message}`,
              });
              setHideAddSection(true);
              reset();
              resetMethod();
              setArrImportRecords([]);
              setIsImport(false);
              setIsVersionUpgrade(false);
            }
          });
      } else {
        Toast.warning({
          message: '😔 Duplicate record found',
        });
      }
    };

    const handleFileUpload = (file: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt: any) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { raw: true });
        const list = data.map((item: any) => {
          return {
            methodsCode: item['Methods Code']?.toUpperCase(),
            methodsName: item['Methods Name']?.toUpperCase(),
            description: item.Description,
            environment: item?.Environment,
            companyCode: item['Company Code'],
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields: any = methodsStore.methods,
      isSingleCheck = false,
    ) => {
      const requiredFields = ['methodsCode', 'methodsName', 'status'];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields }[item])) return item;
      });
      if (isEmpty && !isSingleCheck) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      return methodsStore.methodsService
        .findByFields({
          input: {
            filter: isSingleCheck
              ? { ...fields }
              : {
                  ..._.pick({ ...fields }, requiredFields),
                },
          },
        })
        .then(res => {
          if (res.findByFieldsMethod?.success) {
            setIsExistsRecord(true);
            Toast.error({
              message: '😔 Already some record exists.',
            });
            return true;
          } else {
            setIsExistsRecord(false);
            return false;
          }
        });
    };

    return (
      <>
        <MainPageHeading
          title={routerStore.selectedComponents?.title || ''}
          store={loginStore}
        />
        <div
          className='flex justify-end'
          style={{
            position: 'fixed',
            right: '30px',
            top: '135px',
            zIndex: 9999,
          }}
        >
          {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
            <Buttons.ButtonCircleAddRemoveBottom
              show={hideAddSection}
              onClick={() => setHideAddSection(!hideAddSection)}
            />
          )}
        </div>
        <div className=' mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddSection ? 'hidden' : 'shown')
            }
          >
            <ManualImportTabs
              isImportDisable={
                !RouterFlow.checkPermission(
                  toJS(routerStore.userPermission),
                  'Import',
                )
              }
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
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Method Code'
                        disabled={isVersionUpgrade}
                        placeholder={
                          errors.methodsCode
                            ? 'Please Enter Method Code'
                            : 'Method Code'
                        }
                        hasError={!!errors.methodsCode}
                        value={value}
                        onChange={methodsCodeValue => {
                          const methodsCode = methodsCodeValue?.toUpperCase();
                          onChange(methodsCode);
                          methodsStore.updateMethods({
                            ...methodsStore.methods,
                            methodsCode,
                          });
                        }}
                        onBlur={methodsCode => {
                          if (methodsCode) {
                            checkExistsRecords({ methodsCode }, true);
                          }
                        }}
                      />
                    )}
                    name='methodsCode'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  {isExistsRecord && (
                    <span className='text-red-600 font-medium relative'>
                      Code already exits. Please use other code.
                    </span>
                  )}
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Method Name'
                        disabled={isVersionUpgrade}
                        placeholder={
                          errors.methodName
                            ? 'Please Enter Methods Name'
                            : 'Methods Name'
                        }
                        hasError={!!errors.methodName}
                        value={value}
                        onChange={methodsNameValue => {
                          const methodsName = methodsNameValue?.toUpperCase();
                          onChange(methodsName);
                          methodsStore.updateMethods({
                            ...methodsStore.methods,
                            methodsName,
                            description: `(${toTitleCase(methodsName)})`,
                          });
                        }}
                      />
                    )}
                    name='methodName'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.MultilineInput
                        rows={3}
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
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Status'
                        hasError={!!errors.status}
                      >
                        <select
                          value={value}
                          disabled={isVersionUpgrade}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.status ? 'border-red  ' : 'border-gray-300'
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
                          <option>Select</option>
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
                    rules={{ required: true }}
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
              isView={RouterFlow.checkPermission(
                routerStore.userPermission,
                'View',
              )}
              isDelete={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Delete',
              )}
              isUpdate={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Update',
              )}
              isExport={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Export',
              )}
              onDelete={selectedItem => setModalConfirm(selectedItem)}
              onSelectedRow={rows => {
                setModalConfirm({
                  show: true,
                  type: 'Delete',
                  id: rows,
                  title: 'Are you sure?',
                  body: 'Do you want to delete selected record?',
                });
              }}
              onUpdateItem={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'Update',
                  data: { value, dataField, id },
                  title: 'Are you sure?',
                  body: 'Do you want to update this record?',
                });
              }}
              onPageSizeChange={(page, limit) => {
                methodsStore.fetchMethods(page, limit);
                global.filter = { mode: 'pagination', page, limit };
              }}
              onFilter={(type, filter, page, limit) => {
                methodsStore.methodsService.filter({
                  input: { type, filter, page, limit },
                });
                global.filter = { mode: 'filter', type, page, limit, filter };
              }}
              onApproval={async records => {
                const isExists = await checkExistsRecords({
                  ...records,
                  status: 'A',
                });
                if (!isExists) {
                  setModalConfirm({
                    show: true,
                    type: 'Update',
                    data: { value: 'A', dataField: 'status', id: records._id },
                    title: 'Are you sure?',
                    body: 'Do you want to update this record?',
                  });
                }
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              switch (action) {
                case 'Delete': {
                  methodsStore.methodsService
                    .deleteMethods({ input: { id: modalConfirm.id } })
                    .then((res: any) => {
                      if (res.removeMethod.success) {
                        setModalConfirm({ show: false });
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
                        setModalConfirm({ show: false });
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
            onClose={() => setModalConfirm({ show: false })}
          />
        </div>
      </>
    );
  }),
);

export default Methods;
