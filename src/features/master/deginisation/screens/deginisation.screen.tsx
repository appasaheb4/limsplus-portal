import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
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
  ManualImportTabs,
  ImportFile,
  StaticInputTable,
} from '@/library/components';
import { DeginisationList } from '../components';
import { lookupItems, lookupValue } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import { DeginisationHoc } from '../hoc';
import { useStores } from '@/stores';
import * as XLSX from 'xlsx';

import { RouterFlow } from '@/flows';
import { resetDesignation } from '../startup';

const Deginisation = DeginisationHoc(
  observer(() => {
    const { loginStore, deginisationStore, routerStore } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddDeginisation, setHideAddDeginisation] =
      useState<boolean>(false);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);

    useEffect(() => {
      // Default value initialization
      setValue('environment', deginisationStore.deginisation?.environment);
      setValue('status', deginisationStore.deginisation?.status);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deginisationStore.deginisation]);

    const onSubmitDesginiation = () => {
      if (!deginisationStore.checkExitsCode) {
        deginisationStore.DeginisationService.addDeginisation({
          input: isImport
            ? { isImport, arrImportRecords }
            : { isImport, ...deginisationStore.deginisation },
        }).then(res => {
          if (res.createDesignation.success) {
            setArrImportRecords([]);
            Toast.success({
              message: `😊 ${res.createDesignation.message}`,
            });
            setHideAddDeginisation(true);
            reset();
            resetDesignation();
            setIsImport(false);
          } else {
            Toast.error({ message: '😔 Please try again' });
          }
        });
      } else {
        Toast.warning({
          message: '😔 Please enter diff code',
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
            code: item?.Code?.toUpperCase(),
            description: item?.Description?.toUpperCase(),
            environment: item?.Environment,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = deginisationStore.deginisation,
      length = 0,
      status = 'A',
    ) => {
      const requiredFields = ['code', 'status', 'environment'];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields, status }[item])) return item;
      });
      if (isEmpty) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      //Pass required Field in Array
      return deginisationStore.DeginisationService.findByFields({
        input: {
          filter: {
            ..._.pick({ ...fields, status }, requiredFields),
          },
        },
      }).then(res => {
        if (
          res.findByFieldsDesignation?.success &&
          res.findByFieldsDesignation.data?.length > length
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
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddDeginisation}
            onClick={() => setHideAddDeginisation(!hideAddDeginisation)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddDeginisation ? 'hidden' : 'shown')
            }
          >
            <ManualImportTabs
              isImport={isImport}
              onClick={flag => {
                setIsImport(flag);
              }}
            />
            {!isImport ? (
              <div className='mx-auto'>
                <Grid cols={2}>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Code'
                          id='code'
                          placeholder={
                            errors.code ? 'Please Enter Code' : 'Code'
                          }
                          hasError={!!errors.code}
                          value={value}
                          onChange={code => {
                            onChange(code);
                            deginisationStore.updateDescription({
                              ...deginisationStore.deginisation,
                              code: code.toUpperCase(),
                            });
                          }}
                          onBlur={code => {
                            deginisationStore.DeginisationService.checkExitsEnvCode(
                              {
                                input: {
                                  code,
                                  env: deginisationStore.deginisation
                                    ?.environment,
                                },
                              },
                            ).then(res => {
                              if (res.checkDesignationsExistsRecord.success) {
                                deginisationStore.setExitsCode(true);
                                Toast.error({
                                  message: `😔 ${res.checkDesignationsExistsRecord.message}`,
                                });
                              } else deginisationStore.setExitsCode(false);
                            });
                          }}
                        />
                      )}
                      name='code'
                      rules={{ required: true }}
                      defaultValue=''
                    />

                    {deginisationStore.checkExitsCode && (
                      <span className='text-red-600 font-medium relative'>
                        Code already exits. Please use other code.
                      </span>
                    )}

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Description'
                          name='description'
                          placeholder={
                            errors.description
                              ? 'Please Enter Description'
                              : 'Description'
                          }
                          hasError={!!errors.description}
                          value={value}
                          onChange={description => {
                            onChange(description);
                            deginisationStore.updateDescription({
                              ...deginisationStore.deginisation,
                              description: description.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='description'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                  </List>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                              deginisationStore.updateDescription({
                                ...deginisationStore.deginisation,
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper label='Environment'>
                          <select
                            value={value}
                            disabled={
                              loginStore.login &&
                              loginStore.login.role !== 'SYSADMIN'
                                ? true
                                : false
                            }
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.environment
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const environment = e.target.value;
                              onChange(environment);
                              deginisationStore.updateDescription({
                                ...deginisationStore.deginisation,
                                environment,
                              });
                              deginisationStore.DeginisationService.checkExitsEnvCode(
                                {
                                  input: {
                                    code: deginisationStore.deginisation?.code,
                                    env: environment,
                                  },
                                },
                              ).then(res => {
                                if (res.checkDesignationsExistsRecord.success) {
                                  deginisationStore.setExitsCode(true);
                                  Toast.error({
                                    message: `😔 ${res.checkDesignationsExistsRecord.message}`,
                                  });
                                } else deginisationStore.setExitsCode(false);
                              });
                            }}
                          >
                            <option selected>
                              {loginStore.login &&
                              loginStore.login.role !== 'SYSADMIN'
                                ? 'Select'
                                : deginisationStore.deginisation?.environment ||
                                  'Select'}
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
                      rules={{ required: true }}
                      defaultValue=''
                    />
                  </List>
                </Grid>
              </div>
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
                onClick={handleSubmit(onSubmitDesginiation)}
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
            <DeginisationList
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
                  data: { value, dataField, id },
                  title: 'Are you sure?',
                  body: 'Update deginisation!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                deginisationStore.fetchListDeginisation(page, limit);
                global.filter = { mode: 'pagination', page, limit };
              }}
              onFilter={(type, filter, page, limit) => {
                deginisationStore.DeginisationService.filter({
                  input: { type, filter, page, limit },
                });
                global.filter = {
                  mode: 'filter',
                  type,
                  filter,
                  page,
                  limit,
                };
              }}
              onApproval={async records => {
                const isExists = await checkExistsRecords(records);
                if (!isExists) {
                  setModalConfirm({
                    show: true,
                    type: 'Update',
                    data: { value: 'A', dataField: 'status', id: records._id },
                    title: 'Are you sure?',
                    body: 'Update deginisation!',
                  });
                }
              }}
            />
          </div>

          <ModalConfirm
            {...modalConfirm}
            click={(action: string) => {
              switch (action) {
                case 'Delete': {
                  deginisationStore.DeginisationService.deleteDeginisation({
                    input: { id: modalConfirm.id },
                  }).then((res: any) => {
                    setModalConfirm({ show: false });
                    if (res.removeDesignation.success) {
                      Toast.success({
                        message: `😊 ${res.removeDesignation.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        deginisationStore.fetchListDeginisation(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        deginisationStore.DeginisationService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else deginisationStore.fetchListDeginisation();
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
                    setModalConfirm({ show: false });
                    if (res.updateDesignation.success) {
                      Toast.success({
                        message: `😊 ${res.updateDesignation.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        deginisationStore.fetchListDeginisation(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        deginisationStore.DeginisationService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else deginisationStore.fetchListDeginisation();
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

export default Deginisation;
