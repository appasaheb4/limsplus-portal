import React, { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Table } from 'reactstrap';
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
  AutoCompleteFilterSingleSelect,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
} from '@/library/components';
import _ from 'lodash';
import { lookupItems, lookupValue } from '@/library/utils';
import { PackageMasterList, ServiceType } from '../components';
import { IconContext } from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';

import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { MasterPackageHOC } from '../hoc';
import { useStores } from '@/stores';

import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { resetMasterPackage } from '../startup';
import { SelectedItems } from '../models';
import * as XLSX from 'xlsx';
import { AutoCompleteCompanyList } from '@/core-components';
import MainPageHeadingComponents from '@/library/components/atoms/header/main.page.heading.components';

const grid = 8;
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'none',
  display: 'flex',
  //flexWrap:'none',
  padding: grid,
  overflow: 'auto',
});

const MasterPackage = MasterPackageHOC(
  observer(() => {
    const {
      loginStore,
      masterPackageStore,
      labStore,
      masterPanelStore,
      routerStore,
      loading,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(false);
    const [txtDisable, setTxtDisable] = useState(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);
    const [duplicateRecord, setDupliacteRecord] = useState<boolean>(false);

    useEffect(() => {
      setValue(
        'lab',
        masterPackageStore.masterPackage?.lab || loginStore.login.lab,
      );
      setValue('serviceType', masterPackageStore.masterPackage?.serviceType);
      setValue('status', masterPackageStore.masterPackage?.status);
      // setValue('environment', masterPackageStore.masterPackage?.environment);
      setValue('dateCreation', masterPackageStore.masterPackage?.dateCreation);
      setValue('dateExpire', masterPackageStore.masterPackage?.dateExpire);
      setValue('version', masterPackageStore.masterPackage?.version);
      setValue('dateActive', masterPackageStore.masterPackage?.dateActive);
      setValue(
        'printPanelName',
        masterPackageStore.masterPackage?.printPanelName,
      );
      setValue(
        'packageInterpretation',
        masterPackageStore.masterPackage?.packageInterpretation,
      );
      setValue(
        'panelInterpretation',
        masterPackageStore.masterPackage?.panelInterpretation,
      );
      setValue('panelCode', masterPackageStore.masterPackage?.panelCode);
      setValue('panelName', masterPackageStore.masterPackage?.panelName);
      setValue('packageCode', masterPackageStore.masterPackage?.packageCode);
      setValue('packageName', masterPackageStore.masterPackage?.packageName);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [masterPackageStore.masterPackage]);

    const onSubmitMasterPackage = async () => {
      if (!masterPackageStore.checkExitsLabEnvCode) {
        if (
          !masterPackageStore.masterPackage?.existsVersionId &&
          !masterPackageStore.masterPackage?.existsRecordId
        ) {
          masterPackageStore.masterPackageService
            .addPackageMaster({
              input: isImport
                ? { isImport, arrImportRecords }
                : {
                    isImport,
                    ...masterPackageStore.masterPackage,
                    enteredBy: loginStore.login.userId,
                  },
            })
            .then(res => {
              if (res.createPackageMaster.success) {
                Toast.success({
                  message: `😊 ${res.createPackageMaster.message}`,
                });
                setArrImportRecords([]);
                setIsImport(false);
              }
            });
        } else if (
          masterPackageStore.masterPackage?.existsVersionId &&
          !masterPackageStore.masterPackage?.existsRecordId
        ) {
          masterPackageStore.masterPackageService
            .versionUpgradePackageMaster({
              input: {
                ...masterPackageStore.masterPackage,
                enteredBy: loginStore.login.userId,
                isImport: false,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.versionUpgradePackageMaster.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradePackageMaster.message}`,
                });
              }
            });
          setIsVersionUpgrade(false);
        } else if (
          !masterPackageStore.masterPackage?.existsVersionId &&
          masterPackageStore.masterPackage?.existsRecordId
        ) {
          const isExits = await checkExistsRecords();
          if (!isExits) {
            masterPackageStore.masterPackageService
              .duplicatePackageMaster({
                input: {
                  ...masterPackageStore.masterPackage,
                  isImport: false,
                  enteredBy: loginStore.login.userId,
                  __typename: undefined,
                },
              })
              .then(res => {
                if (res.duplicatePackageMaster.success) {
                  Toast.success({
                    message: `😊 ${res.duplicatePackageMaster.message}`,
                  });
                }
              });
          }
        }
        setIsInputView(false);
        reset();
        resetMasterPackage();
        masterPackageStore.updateSelectedItems(new SelectedItems({}));
      } else {
        Toast.warning({
          message: '😔 Please enter diff code',
        });
      }
    };

    const onUpdateSingleField = payload => {
      masterPackageStore.masterPackageService
        .updateSingleFiled({
          input: {
            ...payload,
          },
        })
        .then((res: any) => {
          if (res.updatePackageMaster.success) {
            Toast.success({
              message: `😊 ${res.updatePackageMaster.message}`,
            });
            if (global?.filter?.mode == 'pagination')
              masterPackageStore.fetchPackageMaster(
                global?.filter?.page,
                global?.filter?.limit,
              );
            else if (global?.filter?.mode == 'filter')
              masterPackageStore.masterPackageService.filter({
                input: {
                  type: global?.filter?.type,
                  filter: global?.filter?.filter,
                  page: global?.filter?.page,
                  limit: global?.filter?.limit,
                },
              });
            else masterPackageStore.fetchPackageMaster();
          }
        });
    };

    const tableView = useMemo(
      () => (
        <PackageMasterList
          data={masterPackageStore.listMasterPackage || []}
          totalSize={masterPackageStore.listMasterPackageCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listLabs: labStore.listLabs,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Update',
          )}
          // isEditModify={false}
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
              body: 'Update items!',
            });
          }}
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'updateFileds',
              data: { fileds, id },
              title: 'Are you sure?',
              body: 'Update records',
            });
          }}
          onVersionUpgrade={item => {
            setModalConfirm({
              show: true,
              type: 'versionUpgrade',
              data: item,
              title: 'Are you sure?',
              body: 'Do you want to upgrade version for this record?',
            });
          }}
          onDuplicate={item => {
            setModalConfirm({
              show: true,
              type: 'duplicate',
              data: item,
              title: 'Are you sure?',
              body: 'Do you want to duplicate this record?',
            });
          }}
          onUpdateOrderSeq={orderSeq => {
            masterPackageStore.masterPackageService
              .updateOrderSeq({ input: { filter: { orderSeq } } })
              .then(res => {
                Toast.success({
                  message: `😊 ${res.updateRepOPackageMaster.message}`,
                });
                masterPackageStore.fetchPackageMaster();
              });
          }}
          onPageSizeChange={(page, limit) => {
            masterPackageStore.fetchPackageMaster(page, limit);
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            masterPackageStore.masterPackageService.filter({
              input: { type, filter, page, limit },
            });
            global.filter = { mode: 'filter', type, page, limit, filter };
          }}
          onApproval={async records => {
            const isExists = await checkExistsRecords(records);
            if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'Update',
                data: { value: 'A', dataField: 'status', id: records._id },
                title: 'Are you sure?',
                body: 'Update Master Package!',
              });
            }
          }}
          onSingleDirectUpdateField={(value, dataField, id) => {
            onUpdateSingleField({
              _id: id,
              [dataField]: value,
            });
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [masterPackageStore.listMasterPackage],
    );

    const handleOnDragEndResultOrder = (result: any) => {
      const items = Array.from(masterPackageStore.masterPackage?.reportOrder);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      masterPackageStore.updateMasterPackage({
        ...masterPackageStore.masterPackage,
        reportOrder: items,
      });
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
        const list = data?.map((item: any) => {
          return {
            lab: item?.Lab,
            packageCode: item['Package Code'],
            packageName: item['Package Name'],
            serviceType: item['Service Type'],
            panelName: item['Panel Code'],
            panelCode: item['Panel Name'],
            reportOrder: undefined,
            bill: item.Bill === 'Yes' ? true : false,
            printPackageName:
              item['Print Package Name'] === 'Yes' ? true : false,
            printPanelName: item['Print Panel Name'] === 'Yes' ? true : false,
            packageInterpretation:
              item['Package Interpretation'] === 'Yes' ? true : false,
            panelInterpretation:
              item['Panel Interpretation'] === 'Yes' ? true : false,
            enteredBy: loginStore.login?.userId,
            dateCreation: new Date(),
            dateActive: new Date(),
            dateExpire: new Date(
              dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD hh:mm:ss'),
            ),
            version: item.Version,
            environment: item.Environment,
            companyCode: item['Company Code'],
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = masterPackageStore.masterPackage,
      length = 0,
      status = 'A',
    ) => {
      const requiredFields = [
        'lab',
        'serviceType',
        'packageCode',
        'panelCode',
        'status',
        'environment',
      ];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields, status }[item])) return item;
      });
      if (isEmpty) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      return masterPackageStore.masterPackageService
        .findByFields({
          input: {
            filter: {
              ..._.pick({ ...fields, status }, requiredFields),
            },
          },
        })
        .then(res => {
          console.log({ res });

          if (
            res.findByFieldsPackageMaster?.success &&
            res.findByFieldsPackageMaster?.data?.length > length
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
        <MainPageHeadingComponents
          title={routerStore.selectedComponents?.title || ''}
          store={loginStore}
        />
        {RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          'Add',
        ) && (
          <Buttons.ButtonCircleAddRemove
            show={!isInputView}
            onClick={() => setIsInputView(!isInputView)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (!isInputView ? 'hidden' : 'shown')
            }
          >
            <ManualImportTabs
              isImport={isImport}
              onClick={flag => {
                setIsImport(flag);
              }}
            />
            {!isImport ? (
              <>
                <Grid cols={2}>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper label='Lab' hasError={!!errors.lab}>
                          <AutoCompleteFilterSingleSelect
                            placeholder='Search by name'
                            loader={loading}
                            disable={
                              duplicateRecord
                                ? false
                                : isVersionUpgrade
                                ? true
                                : loginStore.login &&
                                  loginStore.login.role !== 'SYSADMIN'
                                ? true
                                : false
                            }
                            data={{
                              list: labStore.listLabs,
                              displayKey: 'name',
                              findKey: 'name',
                            }}
                            displayValue={value}
                            hasError={!!errors.lab}
                            onFilter={(value: string) => {
                              labStore.LabService.filter({
                                input: {
                                  type: 'filter',
                                  filter: {
                                    name: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              });
                            }}
                            onSelect={item => {
                              onChange(item.name);
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                lab: item.code,
                              });
                              labStore.updateLabList(labStore.listLabsCopy);
                              if (
                                !masterPackageStore.masterPackage
                                  ?.existsVersionId
                              ) {
                                masterPackageStore.masterPackageService
                                  .checkExistsRecords({
                                    input: {
                                      lab: item.code,
                                      packageCode:
                                        masterPackageStore.masterPackage
                                          ?.packageCode,
                                      panelCode:
                                        masterPackageStore.masterPackage
                                          ?.panelCode,
                                      env: masterPackageStore.masterPackage
                                        ?.environment,
                                    },
                                  })
                                  .then(res => {
                                    if (
                                      res.checkPackageMasterExistsRecord.success
                                    ) {
                                      masterPackageStore.updateExistsLabEnvCode(
                                        true,
                                      );
                                      Toast.error({
                                        message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                      });
                                    } else
                                      masterPackageStore.updateExistsLabEnvCode(
                                        false,
                                      );
                                  });
                              }
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='lab'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Service Type'
                          hasError={!!errors.serviceType}
                        >
                          <ServiceType
                            value={value}
                            disable={isVersionUpgrade}
                            isError={!!errors.serviceType}
                            onUpdate={serviceItem => {
                              onChange(serviceItem.code);
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                serviceType: serviceItem.code,
                                packageName: undefined,
                                panelCode: [],
                                panelName: [],
                              });
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='serviceType'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Package Code'
                          hasError={!!errors.packageCode}
                        >
                          <select
                            value={value}
                            disabled={isVersionUpgrade}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.packageCode
                                ? 'border-red'
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const packageItem = JSON.parse(e.target.value);
                              onChange(packageItem.panelCode);
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                packageCode: packageItem.panelCode,
                                packageName: packageItem.panelName,
                              });
                              if (
                                !masterPackageStore.masterPackage
                                  ?.existsVersionId
                              ) {
                                masterPackageStore.masterPackageService
                                  .checkExistsRecords({
                                    input: {
                                      lab: masterPackageStore.masterPackage.lab,
                                      packageCode: packageItem.panelCode,
                                      panelCode:
                                        masterPackageStore.masterPackage
                                          ?.panelCode,
                                      env: masterPackageStore.masterPackage
                                        ?.environment,
                                    },
                                  })
                                  .then(res => {
                                    if (
                                      res.checkPackageMasterExistsRecord.success
                                    ) {
                                      masterPackageStore.updateExistsLabEnvCode(
                                        true,
                                      );
                                      Toast.error({
                                        message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                      });
                                    } else
                                      masterPackageStore.updateExistsLabEnvCode(
                                        false,
                                      );
                                  });
                              }
                            }}
                          >
                            <option selected>{value || 'Select'}</option>
                            {masterPanelStore.listMasterPanel
                              .filter(item => {
                                return (
                                  item.serviceType ===
                                    masterPackageStore.masterPackage
                                      ?.serviceType &&
                                  item.pLab ===
                                    masterPackageStore.masterPackage?.lab
                                );
                              })
                              ?.map((item: any, index: number) => (
                                <option
                                  key={index}
                                  value={JSON.stringify(item)}
                                >
                                  {`${item.panelName} - ${item.panelCode}`}
                                </option>
                              ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='packageCode'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    {masterPackageStore.checkExitsLabEnvCode && (
                      <span className='text-red-600 font-medium relative'>
                        Code already exits. Please use other code.
                      </span>
                    )}
                    <label className='hidden'>
                      {' '}
                      {`${masterPackageStore.masterPackage?.packageName}`}
                    </label>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          value={value}
                          label='Package Name'
                          placeholder='Package Name'
                          disabled={true}
                        />
                      )}
                      name='packageName'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Panel Code'
                          hasError={!!errors.panelCode}
                        >
                          <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                            loader={loading}
                            placeholder='Search by code or name'
                            hasError={!!errors.panelCode}
                            disable={isVersionUpgrade}
                            data={{
                              list:
                                masterPanelStore.listMasterPanel.filter(
                                  item => {
                                    return (
                                      item.serviceType ===
                                        (masterPackageStore.masterPackage
                                          ?.serviceType === 'K'
                                          ? 'N'
                                          : 'S') &&
                                      item.pLab ===
                                        masterPackageStore.masterPackage?.lab
                                    );
                                  },
                                ) || [],
                              selected:
                                masterPackageStore.selectedItems?.panelCode,
                              displayKey: ['panelCode', 'panelName'],
                            }}
                            onUpdate={item => {
                              const items =
                                masterPackageStore.selectedItems?.panelCode;
                              const panelCode: string[] = [];
                              const panelName: string[] = [];
                              const reportOrder: any[] = [];
                              items?.filter((item: any) => {
                                panelCode.push(item.panelCode);
                                panelName.push(item.panelName);
                                reportOrder.push({
                                  panelCode: item.panelCode,
                                  panelName: item.panelName,
                                  order: 1,
                                });
                              });
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                panelCode,
                                panelName,
                                reportOrder,
                              });
                              masterPanelStore.updatePanelMasterList(
                                masterPanelStore.listMasterPanelCopy,
                              );
                              if (
                                !masterPackageStore.masterPackage
                                  ?.existsVersionId
                              ) {
                                masterPackageStore.masterPackageService
                                  .checkExistsRecords({
                                    input: {
                                      lab: masterPackageStore.masterPackage.lab,
                                      packageCode:
                                        masterPackageStore.masterPackage
                                          ?.packageCode,
                                      panelCode,
                                      env: masterPackageStore.masterPackage
                                        ?.environment,
                                    },
                                  })
                                  .then(res => {
                                    if (
                                      res.checkPackageMasterExistsRecord.success
                                    ) {
                                      masterPackageStore.updateExistsLabEnvCode(
                                        true,
                                      );
                                      Toast.error({
                                        message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                      });
                                    } else
                                      masterPackageStore.updateExistsLabEnvCode(
                                        false,
                                      );
                                  });
                              }
                            }}
                            onFilter={(value: string) => {
                              masterPanelStore.masterPanelService.filterByFields(
                                {
                                  input: {
                                    filter: {
                                      fields: ['panelCode', 'panelName'],
                                      srText: value,
                                    },
                                    page: 0,
                                    limit: 10,
                                  },
                                },
                              );
                            }}
                            onSelect={item => {
                              onChange(new Date());
                              let panelCode =
                                masterPackageStore.selectedItems?.panelCode;
                              if (!item.selected) {
                                if (panelCode && panelCode.length > 0) {
                                  panelCode.push(item);
                                } else panelCode = [item];
                              } else {
                                panelCode = panelCode.filter(items => {
                                  return items._id !== item._id;
                                });
                              }
                              masterPackageStore.updateSelectedItems({
                                ...masterPackageStore.selectedItems,
                                panelCode,
                              });
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='panelCode'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Panel Name'
                          hasError={!!errors.panelName}
                        >
                          <select
                            value={value}
                            disabled={isVersionUpgrade ?? true}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.panelName
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                          >
                            <option selected>
                              {/* {masterPackageStore.masterPackage?.panelName?.join(
                                ',',
                              ) || 'Select'} */}
                              Select
                            </option>
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='panelName'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    {/* <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <AutoCompleteCompanyList
                          hasError={!!errors.companyCode}
                          onSelect={companyCode => {
                            onChange(companyCode);
                            masterPackageStore.updateMasterPackage({
                              ...masterPackageStore.masterPackage,
                              companyCode,
                            });
                          }}
                        />
                      )}
                      name='companyCode'
                      rules={{ required: true }}
                      defaultValue=''
                    /> */}
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
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                status,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'STATUS',
                            )?.map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='status'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Entered By'
                          placeholder={
                            errors.userId
                              ? 'Please Enter Entered By '
                              : 'Entered By'
                          }
                          hasError={!!errors.userId}
                          value={loginStore.login?.userId}
                          disabled={true}
                        />
                      )}
                      name='userId'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputDateTime
                          label='Date Creation'
                          placeholder={
                            errors.dateCreation
                              ? 'Please Enter DateCreation'
                              : 'Date Creation'
                          }
                          hasError={!!errors.dateCreation}
                          value={value}
                          disabled={true}
                        />
                      )}
                      name='dateCreation'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Grid cols={3}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Bill'
                            id='modeBill'
                            hasError={!!errors.bill}
                            value={value}
                            onChange={bill => {
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                bill,
                              });
                            }}
                          />
                        )}
                        name='bill'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Print Package Name'
                            id='printPackageName'
                            hasError={!!errors.printPackageName}
                            value={value}
                            onChange={printPackageName => {
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                printPackageName,
                              });
                            }}
                          />
                        )}
                        name='printPackageName'
                        rules={{ required: false }}
                        defaultValue=''
                      />

                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Print Panel Name'
                            id='printPanelName'
                            hasError={!!errors.printPanelName}
                            value={value}
                            onChange={printPanelName => {
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                printPanelName,
                              });
                            }}
                          />
                        )}
                        name='printPanelName'
                        rules={{ required: false }}
                        defaultValue=''
                      />

                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Print Panel Name'
                            id='printPanelName'
                            hasError={!!errors.printPanelName}
                            value={value}
                            onChange={printPanelName => {
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                printPanelName,
                              });
                            }}
                          />
                        )}
                        name='printPanelName'
                        rules={{ required: false }}
                        defaultValue=''
                      />

                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Package Interpretation'
                            hasError={!!errors.packageInterpretation}
                            value={value}
                            onChange={packageInterpretation => {
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                packageInterpretation,
                              });
                            }}
                          />
                        )}
                        name='packageInterpretation'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Panel Interpretation'
                            hasError={!!errors.panelInterpretation}
                            value={value}
                            onChange={panelInterpretation => {
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                panelInterpretation,
                              });
                            }}
                          />
                        )}
                        name='panelInterpretation'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                    </Grid>
                  </List>

                  <List direction='col' space={4} justify='stretch' fill>
                    <Form.InputWrapper label='Report Order'>
                      <Table striped bordered className='max-h-5' size='sm'>
                        <thead>
                          <tr className='text-xs'>
                            <th
                              className='text-white'
                              style={{ minWidth: 150 }}
                            >
                              Panel
                            </th>
                            <th
                              className='text-white flex flex-row gap-2 items-center'
                              style={{ minWidth: 150 }}
                            >
                              Order
                              <Buttons.ButtonIcon
                                icon={
                                  <IconContext.Provider
                                    value={{ color: '#ffffff' }}
                                  >
                                    <BsFillArrowUpCircleFill />
                                  </IconContext.Provider>
                                }
                                title=''
                                onClick={() => {
                                  let reportOrder =
                                    masterPackageStore.masterPackage
                                      .reportOrder;
                                  reportOrder = _.orderBy(
                                    reportOrder,
                                    'order',
                                    'asc',
                                  );
                                  masterPackageStore.updateMasterPackage({
                                    ...masterPackageStore.masterPackage,
                                    reportOrder,
                                  });
                                }}
                              />
                              <Buttons.ButtonIcon
                                icon={
                                  <IconContext.Provider
                                    value={{ color: '#ffffff' }}
                                  >
                                    <BsFillArrowDownCircleFill />
                                  </IconContext.Provider>
                                }
                                title=''
                                onClick={() => {
                                  let reportOrder =
                                    masterPackageStore.masterPackage
                                      .reportOrder;
                                  reportOrder = _.orderBy(
                                    reportOrder,
                                    'order',
                                    'desc',
                                  );
                                  masterPackageStore.updateMasterPackage({
                                    ...masterPackageStore.masterPackage,
                                    reportOrder,
                                  });
                                }}
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody className='text-xs'>
                          {masterPackageStore.masterPackage?.reportOrder
                            ?.length > 0 &&
                            masterPackageStore.masterPackage?.reportOrder?.map(
                              (item, index) => (
                                <tr
                                  onMouseEnter={() => {
                                    setTxtDisable(false);
                                  }}
                                  onMouseLeave={() => {
                                    setTxtDisable(true);
                                  }}
                                >
                                  <td>{`${index + 1}. ${
                                    item.panelName + ' - ' + item.panelCode
                                  }`}</td>
                                  <td style={{ width: 150 }}>
                                    {txtDisable ? (
                                      <span
                                        className={
                                          'leading-4 p-2  focus:outline-none focus:ring  block w-full shadow-sm sm:text-base  border-2 rounded-md'
                                        }
                                      >
                                        {item.order}
                                      </span>
                                    ) : (
                                      <Form.Input
                                        type='number'
                                        placeholder={item.order}
                                        onChange={order => {
                                          const reportOrder =
                                            masterPackageStore.masterPackage
                                              ?.reportOrder;
                                          reportOrder[index].order =
                                            Number.parseInt(order);
                                          masterPackageStore.updateMasterPackage(
                                            {
                                              ...masterPackageStore.masterPackage,
                                              reportOrder,
                                            },
                                          );
                                        }}
                                      />
                                    )}
                                  </td>
                                </tr>
                              ),
                            )}
                        </tbody>
                      </Table>
                    </Form.InputWrapper>

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputDateTime
                          label='Date Active'
                          placeholder={
                            errors.dateActive
                              ? 'Please Enter DateActiveFrom'
                              : 'Date Active'
                          }
                          hasError={!!errors.dateActive}
                          value={value}
                          disabled={true}
                        />
                      )}
                      name='dateActive'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputDateTime
                          label='Date Expiry'
                          placeholder={
                            errors.dateExpire
                              ? 'Please Enter Date Expire'
                              : 'Date Expire'
                          }
                          hasError={!!errors.dateExpire}
                          value={value}
                          onChange={dateExpire => {
                            onChange(dateExpire);
                            masterPackageStore.updateMasterPackage({
                              ...masterPackageStore.masterPackage,
                              dateExpire,
                            });
                          }}
                        />
                      )}
                      name='dateExpire'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Version'
                          placeholder={
                            errors.version ? 'Please Enter Version ' : 'Version'
                          }
                          hasError={!!errors.version}
                          value={value}
                          disabled={true}
                        />
                      )}
                      name='version'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    {/* <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Environment'
                          hasError={!!errors.environment}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.environment
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            disabled={
                              isVersionUpgrade
                                ? true
                                : loginStore.login &&
                                  loginStore.login.role !== 'SYSADMIN'
                                ? true
                                : false
                            }
                            onChange={e => {
                              const environment = e.target.value;
                              onChange(environment);
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                environment,
                              });
                              if (
                                !masterPackageStore.masterPackage
                                  ?.existsVersionId
                              ) {
                                masterPackageStore.masterPackageService
                                  .checkExistsRecords({
                                    input: {
                                      lab: masterPackageStore.masterPackage.lab,
                                      packageCode:
                                        masterPackageStore.masterPackage
                                          ?.packageCode,
                                      panelCode:
                                        masterPackageStore.masterPackage
                                          ?.panelCode,
                                      env: environment,
                                    },
                                  })
                                  .then(res => {
                                    if (
                                      res.checkPackageMasterExistsRecord.success
                                    ) {
                                      masterPackageStore.updateExistsLabEnvCode(
                                        true,
                                      );
                                      Toast.error({
                                        message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                      });
                                    } else
                                      masterPackageStore.updateExistsLabEnvCode(
                                        false,
                                      );
                                  });
                              }
                            }}
                          >
                            <option selected>
                              {loginStore.login &&
                              loginStore.login.role !== 'SYSADMIN'
                                ? 'Select'
                                : masterPackageStore.masterPackage
                                    ?.environment || 'Select'}
                            </option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'ENVIRONMENT',
                            )?.map((item: any, index: number) => (
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
                    /> */}
                  </List>
                </Grid>
              </>
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
                onClick={handleSubmit(onSubmitMasterPackage)}
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
            {tableView}
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              setModalConfirm({ show: false });
              switch (action) {
                case 'Delete': {
                  masterPackageStore.masterPackageService
                    .deletePackageMaster({ input: { id: modalConfirm.id } })
                    .then((res: any) => {
                      if (res.removePackageMaster.success) {
                        Toast.success({
                          message: `😊 ${res.removePackageMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          masterPackageStore.fetchPackageMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          masterPackageStore.masterPackageService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else masterPackageStore.fetchPackageMaster();
                      }
                    });
                  break;
                }
                case 'Update': {
                  onUpdateSingleField({
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  });

                  break;
                }
                case 'updateFileds': {
                  masterPackageStore.masterPackageService
                    .updateSingleFiled({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updatePackageMaster.success) {
                        Toast.success({
                          message: `😊 ${res.updatePackageMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          masterPackageStore.fetchPackageMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          masterPackageStore.masterPackageService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else masterPackageStore.fetchPackageMaster();
                      }
                    });
                  break;
                }
                case 'versionUpgrade': {
                  masterPackageStore.updateMasterPackage({
                    ...modalConfirm.data,
                    _id: undefined,
                    panelCode: [modalConfirm.data?.panelCode],
                    panelName: [modalConfirm.data?.panelName],
                    reportOrder: [
                      {
                        panelCode: modalConfirm.data?.panelCode,
                        panelName: modalConfirm.data?.panelName,
                        order: modalConfirm.data?.reportOrder,
                      },
                    ],
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date())
                        .add(365, 'days')
                        .format('YYYY-MM-DD hh:mm:ss'),
                    ),
                  });
                  setIsInputView(true);
                  setIsVersionUpgrade(false);
                  break;
                }
                case 'duplicate': {
                  masterPackageStore.updateMasterPackage({
                    ...modalConfirm.data,
                    _id: undefined,
                    panelCode: [modalConfirm.data?.panelCode],
                    panelName: [modalConfirm.data?.panelName],
                    reportOrder: [
                      {
                        panelCode: modalConfirm.data?.panelCode,
                        panelName: modalConfirm.data?.panelName,
                        order: modalConfirm.data?.reportOrder,
                      },
                    ],
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: 1,
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date())
                        .add(365, 'days')
                        .format('YYYY-MM-DD hh:mm:ss'),
                    ),
                  });
                  setIsInputView(true);
                  setDupliacteRecord(true);
                  masterPackageStore.updateSelectedItems({
                    ...masterPackageStore.selectedItems,
                    panelCode: [
                      {
                        panelCode: modalConfirm.data?.panelCode,
                        panelName: modalConfirm.data?.panelName,
                      },
                    ],
                  });
                  break;
                }
                // No default
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

export default MasterPackage;
