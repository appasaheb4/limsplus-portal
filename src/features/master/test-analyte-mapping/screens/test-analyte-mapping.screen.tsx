import React, { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  AutoCompleteFilterSingleSelect,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  AutoCompleteFilterMultiSelectSelectedTopDisplay,
  MainPageHeading,
} from '@/library/components';
import { Table } from 'reactstrap';
import { lookupItems } from '@/library/utils';
import { TestAnalyteMappingList } from '../components';
import { useForm, Controller } from 'react-hook-form';
import { AutoCompleteFilterSingleSelectTestName } from '../components';
import { TestAnalyteMappingHoc } from '../hoc';
import { useStores } from '@/stores';
import { IconContext } from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { resetTestAnalyteMapping } from '../startup';
import { SelectedItems } from '../models';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

const TestAnalyteMapping = TestAnalyteMappingHoc(
  observer(() => {
    const {
      loginStore,
      testAnalyteMappingStore,
      labStore,
      masterAnalyteStore,
      routerStore,
      instResultMappingStore,
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
    const [isInputView, setInputView] = useState<boolean>(true);
    const [txtDisable, setTxtDisable] = useState(true);
    const [instResultMappingRecords, setInstResultMappingRecords] =
      useState<any>();
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);
    const [isDuplicateRecord, setIsDuplicateRecord] = useState<boolean>(false);
    const [isExistsRecord, setIsExistsRecord] = useState(false);

    useEffect(() => {
      // Default value initialization
      setValue('lab', loginStore.login.lab);
      setValue(
        'testCode',
        testAnalyteMappingStore.testAnalyteMapping?.testCode,
      );
      setValue(
        'testName',
        testAnalyteMappingStore.testAnalyteMapping?.testName,
      );
      setValue('status', testAnalyteMappingStore.testAnalyteMapping?.status);
      // setValue(
      //   'environment',
      //   testAnalyteMappingStore.testAnalyteMapping?.environment,
      // );
      setValue(
        'dateCreation',
        testAnalyteMappingStore.testAnalyteMapping?.dateCreation,
      );
      setValue(
        'dateActive',
        testAnalyteMappingStore.testAnalyteMapping?.dateActive,
      );
      setValue('version', testAnalyteMappingStore.testAnalyteMapping?.version);
      setValue(
        'dateExpire',
        testAnalyteMappingStore.testAnalyteMapping?.dateExpire,
      );
      setValue(
        'testMethod',
        testAnalyteMappingStore.testAnalyteMapping?.testMethod,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testAnalyteMappingStore.testAnalyteMapping]);

    const onSubmitTestAnalyteMapping = async () => {
      if (!isExistsRecord) {
        if (
          !testAnalyteMappingStore.testAnalyteMapping?.existsVersionId &&
          !testAnalyteMappingStore.testAnalyteMapping?.existsRecordId
        ) {
          testAnalyteMappingStore.testAnalyteMappingService
            .addTestAnalyteMapping({
              input: isImport
                ? { isImport, arrImportRecords }
                : {
                    isImport,
                    arrImportRecords,
                    ...testAnalyteMappingStore.testAnalyteMapping,
                    enteredBy: loginStore.login.userId,
                  },
            })
            .then(res => {
              if (res.createTestAnalyteMapping.success) {
                Toast.success({
                  message: `😊 ${res.createTestAnalyteMapping.message}`,
                });

                setArrImportRecords([]);
                setIsImport(false);
                testAnalyteMappingStore.updateTestAnalyteMapping({
                  ...testAnalyteMappingStore.testAnalyteMapping,
                  analyteName: [],
                });
              }
            });
        } else if (
          testAnalyteMappingStore.testAnalyteMapping?.existsVersionId &&
          !testAnalyteMappingStore.testAnalyteMapping?.existsRecordId
        ) {
          testAnalyteMappingStore.testAnalyteMappingService
            .versionUpgradeTestAnalyteMapping({
              input: {
                ...testAnalyteMappingStore.testAnalyteMapping,
                enteredBy: loginStore.login.userId,
                isImport: false,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.versionUpgradeTestAnalyteMappings.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradeTestAnalyteMappings.message}`,
                });
              }
            });
          setIsVersionUpgrade(false);
        } else if (
          !testAnalyteMappingStore.testAnalyteMapping?.existsVersionId &&
          testAnalyteMappingStore.testAnalyteMapping?.existsRecordId
        ) {
          const isExists = await checkExistsRecords();
          if (!isExists) {
            testAnalyteMappingStore.testAnalyteMappingService
              .duplicateTestAnalyteMapping({
                input: {
                  ...testAnalyteMappingStore.testAnalyteMapping,
                  isImport: false,
                  enteredBy: loginStore.login.userId,
                  __typename: undefined,
                },
              })
              .then(res => {
                if (res.duplicateTestAnalyteMappings.success) {
                  Toast.success({
                    message: `😊 ${res.duplicateTestAnalyteMappings.message}`,
                  });
                  setIsDuplicateRecord(false);
                }
              });
          }
        }
        setInputView(false);
        reset();
        resetTestAnalyteMapping();
        testAnalyteMappingStore.updateSelectedItems(new SelectedItems({}));
      } else {
        Toast.warning({
          message: '😔 Duplication record found',
        });
      }
    };

    const onUpdateSingleField = payload => {
      testAnalyteMappingStore.testAnalyteMappingService
        .updateSingleFiled({
          input: {
            ...payload,
          },
        })
        .then((res: any) => {
          if (res.updateTestAnalyteMapping.success) {
            Toast.success({
              message: `😊 ${res.updateTestAnalyteMapping.message}`,
            });
            if (global?.filter?.mode == 'pagination')
              testAnalyteMappingStore.fetchTestAnalyteMapping(
                global?.filter?.page,
                global?.filter?.limit,
              );
            else if (global?.filter?.mode == 'filter')
              testAnalyteMappingStore.testAnalyteMappingService.filter({
                input: {
                  type: global?.filter?.type,
                  filter: global?.filter?.filter,
                  page: global?.filter?.page,
                  limit: global?.filter?.limit,
                },
              });
            else testAnalyteMappingStore.fetchTestAnalyteMapping();
          }
        });
    };

    const tableView = useMemo(
      () => (
        <TestAnalyteMappingList
          data={testAnalyteMappingStore.listTestAnalyteMapping || []}
          totalSize={testAnalyteMappingStore.listTestAnalyteMappingCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listsLabs: labStore.listLabs,
            instResultMappingRecords,
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
          isVersionUpgrade={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Version Upgrade',
          )}
          isDuplicate={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Duplicate',
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
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'updateFileds',
              data: { fileds, id },
              title: 'Are you sure?',
              body: 'Do you want to update this record?',
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
          onPageSizeChange={(page, limit) => {
            testAnalyteMappingStore.fetchTestAnalyteMapping(page, limit);
            global.filter = { mode: 'pagination', page, limit };
          }}
          onUpdateOrderSeq={orderSeq => {
            testAnalyteMappingStore.testAnalyteMappingService
              .updateOrderSeq({ input: { filter: { orderSeq } } })
              .then(res => {
                Toast.success({
                  message: `😊 ${res.updateRROTestAnalyteMapping.message}`,
                });
                testAnalyteMappingStore.fetchTestAnalyteMapping();
              });
          }}
          onFilter={(type, filter, page, limit) => {
            testAnalyteMappingStore.testAnalyteMappingService.filter({
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
                body: 'Update Test Analyte Mapping!',
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
      [testAnalyteMappingStore.listTestAnalyteMapping],
    );

    const fetchSegmentMappingKeysValue = () => {
      instResultMappingStore.instResultMappingService
        .fetchKeysValue({
          input: { keys: ['instType', 'instId', 'assayCode'] },
        })
        .then(res => {
          if (res.fetchKeysValueInstResultMapping.success) {
            const values = res.fetchKeysValueInstResultMapping.result.map(
              ({ _id }) => _id,
            );
            setInstResultMappingRecords(values);
          } else {
            alert(res.fetchKeysValueInstResultMapping.message);
          }
        });
    };

    useEffect(() => {
      fetchSegmentMappingKeysValue();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            lab: item.Lab,
            testCode: item['Test Code'],
            testName: item['Test Name'],
            analyteCode: item['Analyte Code'],
            analyteName: item['Analyte Name'],
            variables: {
              calculationFlag:
                item['Calculation Flag'] === 'Yes' ? true : false,
              calculationFormula: item['Calculation Formula'],
              reportable: item.Reportable === 'Yes' ? true : false,
              defaultResult: item['Default Result'],
              instantResult: item['Instant Result'] === 'Yes' ? true : false,
            },
            bill: item.Bill === 'Yes' ? true : false,
            testMethod: item['Test Method'] === 'Yes' ? true : false,
            analyteMethod: item['Analyte Method'] === 'Yes' ? true : false,
            resultOrder: undefined,
            reportOrder: undefined,
            enteredBy: loginStore.login.userId,
            dateCreation: new Date(),
            dateActive: new Date(),
            dateExpire: new Date(
              dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
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
      fields: any = testAnalyteMappingStore.testAnalyteMapping,
      isSingleCheck = false,
    ) => {
      const requiredFields = ['lab', 'testName', 'analyteCode', 'status'];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields }[item])) return item;
      });
      if (isEmpty && !isSingleCheck) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      return testAnalyteMappingStore.testAnalyteMappingService
        .findByFileds({
          input: {
            filter: isSingleCheck
              ? { ...fields }
              : {
                  ..._.pick({ ...fields }, requiredFields),
                },
          },
        })
        .then(res => {
          if (res.findByFiledsTestAnalyteMappings?.success) {
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
          style={{ position: 'fixed', right: '17px' }}
        >
          {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
            <Buttons.ButtonCircleAddRemoveBottom
              show={isInputView}
              onClick={() => setInputView(!isInputView)}
            />
          )}
        </div>
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (isInputView ? 'hidden' : 'shown')
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
              <>
                <Grid cols={2}>
                  <List direction='col' space={4} justify='stretch' fill>
                    {labStore.listLabs && (
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.InputWrapper
                            label='Lab'
                            hasError={!!errors.lab}
                          >
                            <AutoCompleteFilterSingleSelect
                              loader={loading}
                              placeholder='Search by name'
                              disable={
                                isVersionUpgrade
                                  ? true
                                  : loginStore.login &&
                                    loginStore.login.role !== 'SYSADMIN'
                                  ? true
                                  : false
                              }
                              data={{
                                list: labStore.listLabs?.filter(
                                  item => item.status == 'A',
                                ),
                                displayKey: 'name',
                                findKey: 'name',
                              }}
                              displayValue={value}
                              hasError={!!errors.name}
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
                                testAnalyteMappingStore.updateTestAnalyteMapping(
                                  {
                                    ...testAnalyteMappingStore.testAnalyteMapping,
                                    lab: item.code,
                                  },
                                );
                                labStore.updateLabList(labStore.listLabsCopy);
                              }}
                            />
                          </Form.InputWrapper>
                        )}
                        name='lab'
                        rules={{ required: true }}
                        defaultValue=''
                      />
                    )}

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Test Code'
                          name='txtTestCode'
                          placeholder={
                            errors.testCode
                              ? 'Please Enter TestCode'
                              : 'Test Code'
                          }
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.testCode ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          hasError={!!errors.testCode}
                          disabled={true}
                          value={value}
                        />
                      )}
                      name='testCode'
                      rules={{ required: false }}
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
                        <Form.InputWrapper
                          label='Test Name'
                          hasError={!!errors.testName}
                        >
                          <AutoCompleteFilterSingleSelectTestName
                            displayValue={value}
                            lab={
                              testAnalyteMappingStore.testAnalyteMapping?.lab
                            }
                            isDisabled={isVersionUpgrade || isDuplicateRecord}
                            hasError={!!errors.testName}
                            onSelect={item => {
                              onChange(item.testName);
                              setValue('testCode', item.testCode);
                              testAnalyteMappingStore.updateTestAnalyteMapping({
                                ...testAnalyteMappingStore.testAnalyteMapping,
                                testName: item.testName,
                                testCode: item.testCode,
                              });
                              if (
                                !testAnalyteMappingStore.testAnalyteMapping
                                  ?.existsVersionId
                              ) {
                                checkExistsRecords(
                                  {
                                    lab: testAnalyteMappingStore
                                      .testAnalyteMapping?.lab,
                                    testCode: item.testCode,
                                    analyteCode:
                                      testAnalyteMappingStore.testAnalyteMapping
                                        ?.analyteCode,
                                  },
                                  true,
                                );
                              }
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='testName'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Analyte Code'
                          hasError={!!errors.analyteCode}
                        >
                          <AutoCompleteFilterMultiSelectSelectedTopDisplay
                            loader={loading}
                            placeholder='Search by code or name'
                            // disable={isVersionUpgrade}
                            dynamicCheck={'analyteCode'}
                            data={{
                              list:
                                _.uniqBy(
                                  masterAnalyteStore.listMasterAnalyte.filter(
                                    item =>
                                      item.lab ===
                                      testAnalyteMappingStore.testAnalyteMapping
                                        ?.lab,
                                  ),
                                  v =>
                                    [v.analyteName, v.analyteCode, v.lab].join(
                                      ',',
                                    ),
                                ) || [],
                              selected:
                                testAnalyteMappingStore.selectedItems
                                  ?.analyteCode,
                              displayKey: ['analyteCode', 'analyteName'],
                            }}
                            hasError={!!errors.analyteCode}
                            onUpdate={item => {
                              const items =
                                testAnalyteMappingStore.selectedItems
                                  ?.analyteCode;
                              const analyteCode: string[] = [];
                              const analyteName: string[] = [];
                              const resultOrder: any[] = [];
                              const reportOrder: any[] = [];
                              const variables: any[] = [];
                              items?.filter((item: any) => {
                                analyteCode.push(item.analyteCode);
                                analyteName.push(item.analyteName);
                                resultOrder.push({
                                  analyteCode: item.analyteCode,
                                  analyteName: item.analyteName,
                                  order: 1,
                                });
                                reportOrder.push({
                                  analyteCode: item.analyteCode,
                                  analyteName: item.analyteName,
                                  order: 1,
                                });
                                variables.push({
                                  analyteCode: item?.analyteCode,
                                  analyteName: item?.analyteName,
                                  calculationFlag: item?.calculationFlag,
                                  calculationFormula: item?.calcyName,
                                  reportable: item?.reportable,
                                  defaultResult: item?.defaultResult,
                                  numeric: item?.numeric,
                                  alpha: item?.alpha,
                                  abnFlag: item?.abnFlag,
                                  critical: item?.critical,
                                  instantResult: item?.instantResult,
                                });
                              });
                              testAnalyteMappingStore.updateTestAnalyteMapping({
                                ...testAnalyteMappingStore.testAnalyteMapping,
                                analyteName,
                                analyteCode,
                                resultOrder,
                                reportOrder,
                                variables,
                              });
                              masterAnalyteStore.updateMasterAnalyteList(
                                masterAnalyteStore.listMasterAnalyteCopy,
                              );

                              if (
                                !testAnalyteMappingStore.testAnalyteMapping
                                  ?.existsVersionId
                              ) {
                                checkExistsRecords(
                                  {
                                    lab: testAnalyteMappingStore
                                      .testAnalyteMapping?.lab,
                                    testCode:
                                      testAnalyteMappingStore.testAnalyteMapping
                                        ?.testCode,
                                    analyteCode,
                                  },
                                  true,
                                );
                              }
                            }}
                            onFilter={(value: string) => {
                              masterAnalyteStore.masterAnalyteService.filterByFields(
                                {
                                  input: {
                                    filter: {
                                      fields: ['analyteCode', 'analyteName'],
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
                              let analyteCode =
                                testAnalyteMappingStore.selectedItems
                                  ?.analyteCode;
                              if (!item.selected) {
                                if (analyteCode && analyteCode.length > 0) {
                                  analyteCode.push(item);
                                } else analyteCode = [item];
                              } else {
                                analyteCode = analyteCode.filter(items => {
                                  return items._id !== item._id;
                                });
                              }
                              console.log({ analyteCode });
                              testAnalyteMappingStore.updateSelectedItems({
                                ...testAnalyteMappingStore.selectedItems,
                                analyteCode,
                              });
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='analyteCode'
                      rules={{ required: true }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Analyte Name'
                          placeholder={
                            errors.analyteName
                              ? 'Please Enter AnalyteName'
                              : 'Analyte Name'
                          }
                          hasError={!!errors.analyteName}
                          disabled={true}
                          value={
                            typeof testAnalyteMappingStore.testAnalyteMapping
                              ?.analyteName !== 'string'
                              ? testAnalyteMappingStore.testAnalyteMapping?.analyteName?.join(
                                  ',',
                                )
                              : testAnalyteMappingStore.testAnalyteMapping
                                  ?.analyteName
                          }
                        />
                      )}
                      name='analyteName'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Form.InputWrapper label='Variable'>
                            <Table
                              striped
                              bordered
                              className='max-h-5'
                              size='sm'
                            >
                              <thead>
                                <tr className='text-xs'>
                                  <th
                                    className='text-white'
                                    style={{ minWidth: 150 }}
                                  >
                                    Analyte
                                  </th>
                                  <th
                                    className='text-white flex flex-row gap-2 items-center'
                                    style={{ minWidth: 150 }}
                                  >
                                    Variable
                                  </th>
                                </tr>
                              </thead>
                              <tbody className='text-xs'>
                                {testAnalyteMappingStore.testAnalyteMapping?.variables?.map(
                                  (item, index) => (
                                    <tr
                                      onMouseEnter={() => {
                                        setTxtDisable(false);
                                      }}
                                      onMouseLeave={() => {
                                        setTxtDisable(true);
                                      }}
                                      key={index}
                                    >
                                      <td>{`${index + 1}. ${
                                        item.analyteName +
                                        ' - ' +
                                        item.analyteCode
                                      }`}</td>
                                      <td style={{ width: 150, height: 40 }}>
                                        {txtDisable ? (
                                          <span
                                            className={
                                              'leading-4 p-2 h-auto  focus:outline-none focus:ring  block w-full shadow-sm sm:text-base  border-2 rounded-md'
                                            }
                                          >
                                            {item.variable}
                                          </span>
                                        ) : (
                                          <Form.Input
                                            type='number'
                                            placeholder={item.variable}
                                            onChange={variable => {
                                              const variables =
                                                testAnalyteMappingStore
                                                  .testAnalyteMapping
                                                  ?.variables;
                                              variables[index].variable =
                                                Number.parseInt(variable);
                                              testAnalyteMappingStore.updateTestAnalyteMapping(
                                                {
                                                  ...testAnalyteMappingStore.testAnalyteMapping,
                                                  variables,
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
                        </>
                      )}
                      name='variable'
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
                              testAnalyteMappingStore.updateTestAnalyteMapping({
                                ...testAnalyteMappingStore.testAnalyteMapping,
                                status,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(routerStore.lookupItems, 'STATUS').map(
                              (item: any, index: number) => (
                                <option key={index} value={item.code}>
                                  {`${item.value} - ${item.code}`}
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
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Entered By'
                          placeholder={
                            errors.userId ? 'Please Enter UserID' : 'Entered By'
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
                          value={value}
                          disabled={true}
                        />
                      )}
                      name='dateCreation'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputDateTime
                          label='Date Active'
                          hasError={!!errors.dateActive}
                          placeholder={
                            errors.dateActive
                              ? 'Please Enter dateActive'
                              : 'Date Active'
                          }
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
                              ? 'Please Enter dateExpire'
                              : 'Date Expire'
                          }
                          value={value}
                          onChange={dateExpire => {
                            onChange(dateExpire);
                            testAnalyteMappingStore.updateTestAnalyteMapping({
                              ...testAnalyteMappingStore.testAnalyteMapping,
                              dateExpire,
                            });
                          }}
                        />
                      )}
                      name='dateExpire'
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
                              onChange(bill);
                              testAnalyteMappingStore.updateTestAnalyteMapping({
                                ...testAnalyteMappingStore.testAnalyteMapping,
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
                            label='Test Method'
                            id='testMethod'
                            hasError={!!errors.testMethod}
                            value={value}
                            onChange={testMethod => {
                              onChange(testMethod);
                              testAnalyteMappingStore.updateTestAnalyteMapping({
                                ...testAnalyteMappingStore.testAnalyteMapping,
                                testMethod,
                              });
                            }}
                          />
                        )}
                        name='testMethod'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Analyte Method'
                            id='analyteMethod'
                            hasError={!!errors.analyteMethod}
                            value={value}
                            onChange={analyteMethod => {
                              onChange(analyteMethod);
                              testAnalyteMappingStore.updateTestAnalyteMapping({
                                ...testAnalyteMappingStore.testAnalyteMapping,
                                analyteMethod,
                              });
                            }}
                          />
                        )}
                        name='analyteMethod'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                    </Grid>
                  </List>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Form.InputWrapper label='Result Order'>
                      <Table striped bordered className='max-h-5' size='sm'>
                        <thead>
                          <tr className='text-xs'>
                            <th className='text-white' style={{ minWidth: 25 }}>
                              Analyte
                            </th>
                            <th
                              className='text-white flex flex-row gap-2 items-center'
                              style={{ minWidth: 10 }}
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
                                  let resultOrder =
                                    testAnalyteMappingStore.testAnalyteMapping
                                      .resultOrder;
                                  resultOrder = _.orderBy(
                                    resultOrder,
                                    'order',
                                    'asc',
                                  );
                                  testAnalyteMappingStore.updateTestAnalyteMapping(
                                    {
                                      ...testAnalyteMappingStore.testAnalyteMapping,
                                      resultOrder,
                                    },
                                  );
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
                                  let resultOrder =
                                    testAnalyteMappingStore.testAnalyteMapping
                                      .resultOrder;
                                  resultOrder = _.orderBy(
                                    resultOrder,
                                    'order',
                                    'desc',
                                  );
                                  testAnalyteMappingStore.updateTestAnalyteMapping(
                                    {
                                      ...testAnalyteMappingStore.testAnalyteMapping,
                                      resultOrder,
                                    },
                                  );
                                }}
                              />
                            </th>
                            <th className='text-white' style={{ minWidth: 25 }}>
                              Inst Type
                            </th>
                            <th className='text-white' style={{ minWidth: 25 }}>
                              Inst Id
                            </th>
                            <th className='text-white' style={{ minWidth: 25 }}>
                              Assay Code
                            </th>
                          </tr>
                        </thead>
                        <tbody className='text-xs'>
                          {testAnalyteMappingStore.testAnalyteMapping
                            ?.resultOrder &&
                            testAnalyteMappingStore.testAnalyteMapping?.resultOrder.map(
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
                                    item.analyteName + ' - ' + item.analyteCode
                                  }`}</td>
                                  <td style={{ width: 10 }}>
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
                                          const resultOrder =
                                            testAnalyteMappingStore
                                              .testAnalyteMapping?.resultOrder;
                                          resultOrder[index].order =
                                            Number.parseInt(order);
                                          testAnalyteMappingStore.updateTestAnalyteMapping(
                                            {
                                              ...testAnalyteMappingStore.testAnalyteMapping,
                                              resultOrder,
                                            },
                                          );
                                        }}
                                      />
                                    )}
                                  </td>
                                  <td>
                                    <select
                                      className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                                      onChange={e => {
                                        const instType = e.target.value;
                                        const resultOrder =
                                          testAnalyteMappingStore
                                            .testAnalyteMapping?.resultOrder;
                                        resultOrder[index].instType = instType;
                                        testAnalyteMappingStore.updateTestAnalyteMapping(
                                          {
                                            ...testAnalyteMappingStore.testAnalyteMapping,
                                            resultOrder,
                                          },
                                        );
                                      }}
                                    >
                                      <option selected>{'Select'}</option>
                                      {_.uniqBy(
                                        instResultMappingRecords,
                                        'instType',
                                      )?.map((item: any, index: number) => (
                                        <option
                                          key={index}
                                          value={item.instType}
                                        >
                                          {`${item.instType}`}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                  <td>
                                    <select
                                      className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                                      onChange={e => {
                                        const instId = e.target.value;
                                        const resultOrder =
                                          testAnalyteMappingStore
                                            .testAnalyteMapping?.resultOrder;
                                        resultOrder[index].instId = instId;
                                        testAnalyteMappingStore.updateTestAnalyteMapping(
                                          {
                                            ...testAnalyteMappingStore.testAnalyteMapping,
                                            resultOrder,
                                          },
                                        );
                                      }}
                                    >
                                      <option selected>{'Select'}</option>
                                      {_.uniqBy(
                                        instResultMappingRecords,
                                        'instId',
                                      )?.map((item: any, index: number) => (
                                        <option key={index} value={item.instId}>
                                          {`${item.instId}`}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                  <td>
                                    <select
                                      className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                                      onChange={e => {
                                        const assayCode = e.target.value;
                                        const resultOrder =
                                          testAnalyteMappingStore
                                            .testAnalyteMapping?.resultOrder;
                                        resultOrder[index].assayCode =
                                          assayCode;
                                        testAnalyteMappingStore.updateTestAnalyteMapping(
                                          {
                                            ...testAnalyteMappingStore.testAnalyteMapping,
                                            resultOrder,
                                          },
                                        );
                                      }}
                                    >
                                      <option selected>{'Select'}</option>
                                      {_.uniqBy(
                                        instResultMappingRecords,
                                        'assayCode',
                                      )?.map((item: any, index: number) => (
                                        <option
                                          key={index}
                                          value={item.assayCode}
                                        >
                                          {`${item.assayCode}`}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                </tr>
                              ),
                            )}
                        </tbody>
                      </Table>
                    </Form.InputWrapper>
                    <Form.InputWrapper label='Report Order'>
                      <Table striped bordered className='max-h-5' size='sm'>
                        <thead>
                          <tr className='text-xs'>
                            <th
                              className='text-white'
                              style={{ minWidth: 150 }}
                            >
                              Analyte
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
                                    testAnalyteMappingStore.testAnalyteMapping
                                      .reportOrder;
                                  reportOrder = _.orderBy(
                                    reportOrder,
                                    'order',
                                    'asc',
                                  );
                                  testAnalyteMappingStore.updateTestAnalyteMapping(
                                    {
                                      ...testAnalyteMappingStore.testAnalyteMapping,
                                      reportOrder,
                                    },
                                  );
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
                                    testAnalyteMappingStore.testAnalyteMapping
                                      .reportOrder;
                                  reportOrder = _.orderBy(
                                    reportOrder,
                                    'order',
                                    'desc',
                                  );
                                  testAnalyteMappingStore.updateTestAnalyteMapping(
                                    {
                                      ...testAnalyteMappingStore.testAnalyteMapping,
                                      reportOrder,
                                    },
                                  );
                                }}
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody className='text-xs'>
                          {testAnalyteMappingStore.testAnalyteMapping
                            ?.reportOrder &&
                            testAnalyteMappingStore.testAnalyteMapping?.reportOrder.map(
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
                                    item.analyteName + ' - ' + item.analyteCode
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
                                            testAnalyteMappingStore
                                              .testAnalyteMapping?.reportOrder;
                                          reportOrder[index].order =
                                            Number.parseInt(order);
                                          testAnalyteMappingStore.updateTestAnalyteMapping(
                                            {
                                              ...testAnalyteMappingStore.testAnalyteMapping,
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
                        <Form.Input
                          label='Version'
                          hasError={!!errors.version}
                          placeholder={
                            errors.version ? 'Please Enter Version' : 'Version'
                          }
                          value={value}
                          disabled={true}
                        />
                      )}
                      name='version'
                      rules={{ required: false }}
                      defaultValue=''
                    />
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
                onClick={handleSubmit(onSubmitTestAnalyteMapping)}
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
                  testAnalyteMappingStore.testAnalyteMappingService
                    .deleteTestAnalyteMapping({
                      input: { id: modalConfirm.id },
                    })
                    .then((res: any) => {
                      if (res.removeTestAnalyteMapping.success) {
                        Toast.success({
                          message: `😊 ${res.removeTestAnalyteMapping.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          testAnalyteMappingStore.fetchTestAnalyteMapping(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          testAnalyteMappingStore.testAnalyteMappingService.filter(
                            {
                              input: {
                                type: global?.filter?.type,
                                filter: global?.filter?.filter,
                                page: global?.filter?.page,
                                limit: global?.filter?.limit,
                              },
                            },
                          );
                        else testAnalyteMappingStore.fetchTestAnalyteMapping();
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
                  testAnalyteMappingStore.testAnalyteMappingService
                    .updateSingleFiled({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateTestAnalyteMapping.success) {
                        Toast.success({
                          message: `😊 ${res.updateTestAnalyteMapping.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          testAnalyteMappingStore.fetchTestAnalyteMapping(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          testAnalyteMappingStore.testAnalyteMappingService.filter(
                            {
                              input: {
                                type: global?.filter?.type,
                                filter: global?.filter?.filter,
                                page: global?.filter?.page,
                                limit: global?.filter?.limit,
                              },
                            },
                          );
                        else testAnalyteMappingStore.fetchTestAnalyteMapping();
                      }
                    });
                  break;
                }
                case 'versionUpgrade': {
                  setModalConfirm({ show: false });
                  testAnalyteMappingStore.updateTestAnalyteMapping({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    analyteCode: [modalConfirm.data?.analyteCode],
                    analyteName: [modalConfirm.data?.analyteName],
                    resultOrder: [
                      {
                        analyteCode: modalConfirm.data?.analyteCode,
                        analyteName: modalConfirm.data?.analyteName,
                        order: modalConfirm.data?.resultOrder,
                      },
                    ],
                    reportOrder: [
                      {
                        analyteCode: modalConfirm.data?.analyteCode,
                        analyteName: modalConfirm.data?.analyteName,
                        order: modalConfirm.data?.reportOrder,
                      },
                    ],
                    variables: [
                      {
                        analyteCode: modalConfirm.data?.analyteCode,
                        analyteName: modalConfirm.data?.analyteName,
                        calculationFlag: modalConfirm.data?.calculationFlag,
                        calculationFormula: modalConfirm.data?.calcyName,
                        reportable: modalConfirm.data?.reportable,
                        defaultResult: modalConfirm.data?.defaultResult,
                        numeric: modalConfirm.data?.numeric,
                        alpha: modalConfirm.data?.alpha,
                        abnFlag: modalConfirm.data?.abnFlag,
                        critical: modalConfirm.data?.critical,
                        instantResult: modalConfirm.data?.instantResult,
                      },
                    ],
                    variable: undefined,
                    calculationFlag: undefined,
                    calculationFormula: undefined,
                    reportable: undefined,
                    defaultResult: undefined,
                    numeric: undefined,
                    alpha: undefined,
                    abnFlag: undefined,
                    critical: undefined,
                    instantResult: undefined,
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
                    ),
                  });
                  setInputView(true);
                  setIsVersionUpgrade(true);
                  setValue('analyteCode', [modalConfirm.data?.analyteCode]);
                  testAnalyteMappingStore.updateSelectedItems({
                    ...testAnalyteMappingStore.selectedItems,
                    analyteCode: [
                      {
                        analyteCode: modalConfirm.data?.analyteCode,
                        analyteName: modalConfirm.data?.analyteName,
                      },
                    ],
                  });
                  break;
                }
                case 'duplicate': {
                  setModalConfirm({ show: false });
                  testAnalyteMappingStore.updateTestAnalyteMapping({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: 1,
                    analyteCode: [modalConfirm.data?.analyteCode],
                    analyteName: [modalConfirm.data?.analyteName],
                    resultOrder: [
                      {
                        analyteCode: modalConfirm.data?.analyteCode,
                        analyteName: modalConfirm.data?.analyteName,
                        order: modalConfirm.data?.resultOrder,
                      },
                    ],
                    reportOrder: [
                      {
                        analyteCode: modalConfirm.data?.analyteCode,
                        analyteName: modalConfirm.data?.analyteName,
                        order: modalConfirm.data?.reportOrder,
                      },
                    ],
                    variables: [
                      {
                        analyteCode: modalConfirm.data?.analyteCode,
                        analyteName: modalConfirm.data?.analyteName,
                        calculationFlag: modalConfirm.data?.calculationFlag,
                        calculationFormula: modalConfirm.data?.calcyName,
                        reportable: modalConfirm.data?.reportable,
                        defaultResult: modalConfirm.data?.defaultResult,
                        numeric: modalConfirm.data?.numeric,
                        alpha: modalConfirm.data?.alpha,
                        abnFlag: modalConfirm.data?.abnFlag,
                        critical: modalConfirm.data?.critical,
                        instantResult: modalConfirm.data?.instantResult,
                      },
                    ],
                    variable: undefined,
                    calculationFlag: undefined,
                    calculationFormula: undefined,
                    reportable: undefined,
                    defaultResult: undefined,
                    numeric: undefined,
                    alpha: undefined,
                    abnFlag: undefined,
                    critical: undefined,
                    instantResult: undefined,
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
                    ),
                  });
                  setInputView(true);
                  setIsDuplicateRecord(true);
                  setValue('analyteCode', [modalConfirm.data?.analyteCode]);
                  testAnalyteMappingStore.updateSelectedItems({
                    ...testAnalyteMappingStore.selectedItems,
                    analyteCode: [
                      {
                        analyteCode: modalConfirm.data?.analyteCode,
                        analyteName: modalConfirm.data?.analyteName,
                      },
                    ],
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
export default TestAnalyteMapping;
