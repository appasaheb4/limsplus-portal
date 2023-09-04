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
import {lookupItems, lookupValue} from '@/library/utils';
import {SampleContainerList} from '../components';

import {useForm, Controller} from 'react-hook-form';
import {SampleContainerHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {resetSampleContainer} from '../startup';
import * as XLSX from 'xlsx';
import _ from 'lodash';
const SampleContainer = SampleContainerHoc(
  observer(() => {
    const {loginStore, sampleContainerStore, routerStore} = useStores();
    const {
      control,
      formState: {errors},
      handleSubmit,
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddBanner, setHideAddBanner] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);

    useEffect(() => {
      // Default value initialization
      setValue(
        'environment',
        sampleContainerStore.sampleContainer?.environment,
      );
      setValue('status', sampleContainerStore.sampleContainer?.status);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sampleContainerStore.sampleContainer]);
    const onSubmitSampleContainer = () => {
      if (!sampleContainerStore.checkExitsEnvCode) {
        sampleContainerStore.sampleContainerService
          .addSampleContainer({
            input: isImport
              ? {isImport, arrImportRecords}
              : {isImport, ...sampleContainerStore.sampleContainer},
          })
          .then(res => {
            if (res.createSampleContainer.success) {
              Toast.success({
                message: `😊 ${res.createSampleContainer.message}`,
              });
              setHideAddBanner(true);
              reset();
              resetSampleContainer();
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
        const wb = XLSX.read(bstr, {type: 'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {raw: true});
        const list = data.map((item: any) => {
          return {
            containerCode: item['Container Code'],
            containerName: item['Container Name'],
            description: item.Description,
            image: '',
            environment: item?.Environment,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = sampleContainerStore.sampleContainer,
      length = 0,
    ) => {
      //Pass required Field in Array
      return sampleContainerStore.sampleContainerService
        .findByFields({
          input: {
            filter: {
              ..._.pick(fields, [
                'containerCode',
                'containerName',
                'environment',
              ]),
            },
          },
        })
        .then(res => {
          if (
            res.findByFieldsSampleContainers?.success &&
            res.findByFieldsSampleContainers.data?.length > length
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
            show={hideAddBanner}
            onClick={() => setHideAddBanner(!hideAddBanner)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddBanner ? 'hidden' : 'shown')
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
                        label='Container Code'
                        hasError={!!errors.containerCode}
                        placeholder={
                          errors.containerCode
                            ? 'Please Enter Container Code '
                            : 'Conatiner Code'
                        }
                        value={value}
                        onChange={containerCode => {
                          onChange(containerCode);
                          sampleContainerStore.updateSampleContainer({
                            ...sampleContainerStore.sampleContainer,
                            containerCode: containerCode.toUpperCase(),
                          });
                        }}
                        onBlur={code => {
                          sampleContainerStore.sampleContainerService
                            .checkExitsEnvCode({
                              input: {
                                code,
                                env: sampleContainerStore.sampleContainer
                                  ?.environment,
                              },
                            })
                            .then(res => {
                              if (
                                res.checkSampleContainersExistsRecord.success
                              ) {
                                sampleContainerStore.updateExitsEnvCode(true);
                                Toast.error({
                                  message: `😔 ${res.checkSampleContainersExistsRecord.message}`,
                                });
                              } else
                                sampleContainerStore.updateExitsEnvCode(false);
                            });
                        }}
                      />
                    )}
                    name='containerCode'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  {sampleContainerStore.checkExitsEnvCode && (
                    <span className='text-red-600 font-medium relative'>
                      Code already exits. Please use other code.
                    </span>
                  )}
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Container Name'
                        hasError={!!errors.containerName}
                        placeholder={
                          errors.containerName
                            ? 'Please Enter Container Name'
                            : 'Container Name'
                        }
                        value={value}
                        onChange={containerName => {
                          onChange(containerName);
                          sampleContainerStore.updateSampleContainer({
                            ...sampleContainerStore.sampleContainer,
                            containerName: containerName.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='containerName'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputFile
                        label='Image'
                        placeholder={
                          errors.image ? 'Please Insert Image' : 'Image'
                        }
                        value={value ? value?.fileName : ''}
                        hasError={!!errors.image}
                        onChange={e => {
                          const image = e.target.files[0];
                          onChange(image);
                          sampleContainerStore.updateSampleContainer({
                            ...sampleContainerStore.sampleContainer,
                            image,
                          });
                        }}
                      />
                    )}
                    name='image'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.MultilineInput
                        rows={5}
                        label='Description'
                        hasError={!!errors.description}
                        placeholder={
                          errors.description
                            ? 'Please Enter Description'
                            : 'Description'
                        }
                        value={value}
                        onChange={description => {
                          onChange(description);
                          sampleContainerStore.updateSampleContainer({
                            ...sampleContainerStore.sampleContainer,
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
                            errors.status ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const status = e.target.value;
                            onChange(status);
                            sampleContainerStore.updateSampleContainer({
                              ...sampleContainerStore.sampleContainer,
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
                            sampleContainerStore.updateSampleContainer({
                              ...sampleContainerStore.sampleContainer,
                              environment,
                            });
                            sampleContainerStore.sampleContainerService
                              .checkExitsEnvCode({
                                input: {
                                  code: sampleContainerStore.sampleContainer
                                    ?.containerCode,
                                  env: environment,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkSampleContainersExistsRecord.success
                                ) {
                                  sampleContainerStore.updateExitsEnvCode(true);
                                  Toast.error({
                                    message: `😔 ${res.checkSampleContainersExistsRecord.message}`,
                                  });
                                } else
                                  sampleContainerStore.updateExitsEnvCode(
                                    false,
                                  );
                              });
                          }}
                        >
                          <option selected>
                            {loginStore.login &&
                            loginStore.login.role !== 'SYSADMIN'
                              ? 'Select'
                              : sampleContainerStore.sampleContainer
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
                onClick={handleSubmit(onSubmitSampleContainer)}
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
            <SampleContainerList
              data={sampleContainerStore.listSampleContainer || []}
              totalSize={sampleContainerStore.listSampleContainerCount}
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
                  body: 'Update item!',
                });
              }}
              onUpdateImage={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'UpdateImage',
                  data: {value, dataField, id},
                  title: 'Are you sure?',
                  body: 'Record update!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                sampleContainerStore.fetchListSampleContainer(page, limit);
                global.filter = {mode: 'pagination', page, limit};
              }}
              onFilter={(type, filter, page, limit) => {
                sampleContainerStore.sampleContainerService.filter({
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
            click={(action: string) => {
              if (action === 'Delete') {
                sampleContainerStore.sampleContainerService
                  .deleteSampleContainer({input: {id: modalConfirm.id}})
                  .then((res: any) => {
                    if (res.removeSampleContainer.success) {
                      setModalConfirm({show: false});
                      Toast.success({
                        message: `😊 ${res.removeSampleContainer.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        sampleContainerStore.fetchListSampleContainer(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        sampleContainerStore.sampleContainerService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else sampleContainerStore.fetchListSampleContainer();
                    }
                  });
              } else if (action === 'Update') {
                sampleContainerStore.sampleContainerService
                  .updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  })
                  .then((res: any) => {
                    if (res.updateSampleContainer.success) {
                      setModalConfirm({show: false});
                      Toast.success({
                        message: `😊 ${res.updateSampleContainer.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        sampleContainerStore.fetchListSampleContainer(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        sampleContainerStore.sampleContainerService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else sampleContainerStore.fetchListSampleContainer();
                    }
                  });
              } else {
                sampleContainerStore.sampleContainerService
                  .updateImage({
                    input: {
                      _id: modalConfirm.data.id,
                      image: modalConfirm.data.value,
                    },
                  })
                  .then((res: any) => {
                    if (res.updateSampleContainersImage.success) {
                      Toast.success({
                        message: `😊 ${res.updateSampleContainersImage.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        sampleContainerStore.fetchListSampleContainer(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        sampleContainerStore.sampleContainerService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else sampleContainerStore.fetchListSampleContainer();
                    }
                  });
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />
        </div>
      </>
    );
  }),
);

export default SampleContainer;
