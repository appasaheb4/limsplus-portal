import React, {useEffect, useState} from 'react';
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
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
} from '@/library/components';
import {SampleTypeList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {SampleTypeHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetSampleType} from '../startup';
import * as XLSX from 'xlsx';
const SampleType = SampleTypeHoc(
  observer(() => {
    const {loginStore, sampleTypeStore, routerStore} = useStores();
    const {
      control,
      formState: {errors},
      handleSubmit,
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);

    useEffect(() => {
      // Default value initialization
      setValue('environment', sampleTypeStore.sampleType?.environment);
      setValue('status', sampleTypeStore.sampleType?.status);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sampleTypeStore.sampleType]);

    const onSubmitSampleType = () => {
      if (!sampleTypeStore.checkExitsEnvCode) {
        sampleTypeStore.sampleTypeService
          .addSampleType({
            input: isImport
              ? {isImport, arrImportRecords}
              : {isImport, ...sampleTypeStore.sampleType},
          })
          .then(res => {
            if (res.createSampleType.success) {
              Toast.success({
                message: `😊 ${res.createSampleType.message}`,
              });
              setHideAddLab(true);
              reset();
              resetSampleType();
            }
          });
      } else {
        Toast.warning({
          message: '😔Please enter diff code',
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
            sampleCode: item['Sample Code'],
            sampleType: item['Sample Type'],
            description: item.Descriptions,
            sampleGroup: item['Sample Group'],
            environment: item?.Environment,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };
    const checkExistsRecords = async (
      fields = sampleTypeStore.sampleType,
      length = 0,
      status = 'A',
    ) => {
      //Pass required Field in Array
      return sampleTypeStore.sampleTypeService
        .findByFields({
          input: {
            filter: {
              ..._.pick({...fields, status}, [
                'sampleCode',
                'sampleType',
                'status',
                'environment',
              ]),
            },
          },
        })
        .then(res => {
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
                        label='Sample Code'
                        hasError={!!errors.sampleCode}
                        placeholder={
                          errors.sampleCode
                            ? 'Please Enter Sample Code'
                            : 'Sample Code'
                        }
                        value={value}
                        onChange={sampleCode => {
                          onChange(sampleCode);
                          sampleTypeStore.updateSampleType({
                            ...sampleTypeStore.sampleType,
                            sampleCode: sampleCode.toUpperCase(),
                          });
                        }}
                        onBlur={code => {
                          sampleTypeStore.sampleTypeService
                            .checkExitsEnvCode({
                              input: {
                                code,
                                env: sampleTypeStore.sampleType?.environment,
                              },
                            })
                            .then(res => {
                              if (res.checkSampleTypeExistsRecord.success) {
                                sampleTypeStore.updateExitsEnvCode(true);
                                Toast.error({
                                  message: `😔 ${res.checkSampleTypeExistsRecord.message}`,
                                });
                              } else sampleTypeStore.updateExitsEnvCode(false);
                            });
                        }}
                      />
                    )}
                    name='sampleCode'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  {sampleTypeStore.checkExitsEnvCode && (
                    <span className='text-red-600 font-medium relative'>
                      Code already exits. Please use other code.
                    </span>
                  )}
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Sample Type'
                        hasError={!!errors.sampleType}
                        placeholder={
                          errors.sampleType
                            ? 'Please Enter Sample Type'
                            : 'Sample Type'
                        }
                        value={value}
                        onChange={sampleType => {
                          onChange(sampleType);
                          sampleTypeStore.updateSampleType({
                            ...sampleTypeStore.sampleType,
                            sampleType: sampleType.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='sampleType'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Sample Group'
                        placeholder={
                          errors.sampleGroup
                            ? 'Please Enter sampleGroup'
                            : 'Sample Group'
                        }
                        hasError={!!errors.sampleGroup}
                        value={value}
                        onChange={sampleGroup => {
                          onChange(sampleGroup);
                          sampleTypeStore.updateSampleType({
                            ...sampleTypeStore.sampleType,
                            sampleGroup: sampleGroup.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='sampleGroup'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.MultilineInput
                        rows={5}
                        label='Descriptions'
                        placeholder={
                          errors.descriptions
                            ? 'Please Enter descriptions'
                            : 'Descriptions'
                        }
                        hasError={!!errors.descriptions}
                        value={value}
                        onChange={descriptions => {
                          onChange(descriptions);
                          sampleTypeStore.updateSampleType({
                            ...sampleTypeStore.sampleType,
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
                            sampleTypeStore.updateSampleType({
                              ...sampleTypeStore.sampleType,
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
                            sampleTypeStore.updateSampleType({
                              ...sampleTypeStore.sampleType,
                              environment,
                            });
                            sampleTypeStore.sampleTypeService
                              .checkExitsEnvCode({
                                input: {
                                  code: sampleTypeStore.sampleType?.sampleCode,
                                  env: environment,
                                },
                              })
                              .then(res => {
                                if (res.checkSampleTypeExistsRecord.success) {
                                  sampleTypeStore.updateExitsEnvCode(true);
                                  Toast.error({
                                    message: `😔 ${res.checkSampleTypeExistsRecord.message}`,
                                  });
                                } else
                                  sampleTypeStore.updateExitsEnvCode(false);
                              });
                          }}
                        >
                          <option selected>
                            {loginStore.login &&
                            loginStore.login.role !== 'SYSADMIN'
                              ? 'Select'
                              : sampleTypeStore.sampleType?.environment ||
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
                onClick={handleSubmit(onSubmitSampleType)}
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
            <SampleTypeList
              data={sampleTypeStore.listSampleType || []}
              totalSize={sampleTypeStore.listSampleTypeCount}
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
                sampleTypeStore.fetchSampleTypeList(page, limit);
                global.filter = {mode: 'pagination', page, limit};
              }}
              onFilter={(type, filter, page, limit) => {
                sampleTypeStore.sampleTypeService.filter({
                  input: {type, filter, page, limit},
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
                // const isExists = await checkExistsRecords(records, 1);
                // if (!isExists) {
                setModalConfirm({
                  show: true,
                  type: 'Update',
                  data: {value: 'A', dataField: 'status', id: records._id},
                  title: 'Are you sure?',
                  body: 'Update deginisation!',
                });
                // }
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              switch (action) {
                case 'Delete': {
                  sampleTypeStore.sampleTypeService
                    .deleteSampleType({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeSampleType.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.removeSampleType.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          sampleTypeStore.fetchSampleTypeList(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          sampleTypeStore.sampleTypeService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else sampleTypeStore.fetchSampleTypeList();
                      }
                    });
                  break;
                }
                case 'Update': {
                  sampleTypeStore.sampleTypeService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateSampleType.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updateSampleType.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          sampleTypeStore.fetchSampleTypeList(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          sampleTypeStore.sampleTypeService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else sampleTypeStore.fetchSampleTypeList();
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

export default SampleType;
