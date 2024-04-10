import React, { useEffect, useState } from 'react';
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
import { SampleTypeList } from '../components';
import { lookupItems, lookupValue } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import { SampleTypeHoc } from '../hoc';
import { useStores } from '@/stores';
import _ from 'lodash';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { resetSampleType } from '../startup';
import * as XLSX from 'xlsx';

const SampleType = SampleTypeHoc(
  observer(() => {
    const { loginStore, sampleTypeStore, routerStore } = useStores();
    const {
      control,
      formState: { errors },
      handleSubmit,
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);
    const [isExistsRecord, setIsExistsRecord] = useState(false);

    useEffect(() => {
      // Default value initialization
      setValue('status', sampleTypeStore.sampleType?.status);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sampleTypeStore.sampleType]);

    const onSubmitSampleType = () => {
      if (!isExistsRecord) {
        sampleTypeStore.sampleTypeService
          .addSampleType({
            input: isImport
              ? { isImport, arrImportRecords }
              : { isImport, ...sampleTypeStore.sampleType },
          })
          .then(res => {
            if (res.createSampleType.success) {
              Toast.success({
                message: `😊 ${res.createSampleType.message}`,
              });
              setHideAddLab(true);
              reset();
              resetSampleType();
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
            sampleCode: item['Sample Code']?.toUpperCase(),
            sampleType: item['Sample Type']?.toUpperCase(),
            descriptions: item.Descriptions,
            sampleGroup: item['Sample Group']?.toUpperCase(),
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
      fields: any = sampleTypeStore.sampleType,
      isSingleCheck = false,
    ) => {
      const requiredFields = ['sampleCode', 'sampleType', 'status'];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields }[item])) return item;
      });
      if (isEmpty && !isSingleCheck) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      return sampleTypeStore.sampleTypeService
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
          if (res.findByFieldsSampleTypes?.success) {
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
              show={hideAddLab}
              onClick={() => setHideAddLab(!hideAddLab)}
            />
          )}
        </div>

        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddLab ? 'hidden' : 'shown')
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
                        label='Sample Code'
                        hasError={!!errors.sampleCode}
                        disabled={isVersionUpgrade}
                        placeholder={
                          errors.sampleCode
                            ? 'Please Enter Sample Code'
                            : 'Sample Code'
                        }
                        value={value}
                        onChange={sampleCodeValue => {
                          const sampleCode = sampleCodeValue.toUpperCase();
                          onChange(sampleCode);
                          sampleTypeStore.updateSampleType({
                            ...sampleTypeStore.sampleType,
                            sampleCode,
                          });
                        }}
                        onBlur={sampleCode => {
                          if (sampleCode) {
                            checkExistsRecords({ sampleCode }, true);
                          }
                        }}
                      />
                    )}
                    name='sampleCode'
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
                        label='Sample Type'
                        hasError={!!errors.sampleType}
                        placeholder={
                          errors.sampleType
                            ? 'Please Enter Sample Type'
                            : 'Sample Type'
                        }
                        value={value}
                        onChange={sampleTypeValue => {
                          const sampleType = sampleTypeValue.toUpperCase();
                          onChange(sampleType);
                          sampleTypeStore.updateSampleType({
                            ...sampleTypeStore.sampleType,
                            sampleType,
                          });
                        }}
                      />
                    )}
                    name='sampleType'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
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
                    rules={{ required: false }}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
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
                    rules={{ required: false }}
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
                sampleTypeStore.fetchSampleTypeList(page, limit);
                global.filter = { mode: 'pagination', page, limit };
              }}
              onFilter={(type, filter, page, limit) => {
                sampleTypeStore.sampleTypeService.filter({
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
                  sampleTypeStore.sampleTypeService
                    .deleteSampleType({ input: { id: modalConfirm.id } })
                    .then((res: any) => {
                      if (res.removeSampleType.success) {
                        setModalConfirm({ show: false });
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
                        setModalConfirm({ show: false });
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
              setModalConfirm({ show: false });
            }}
          />
        </div>
      </>
    );
  }),
);

export default SampleType;
