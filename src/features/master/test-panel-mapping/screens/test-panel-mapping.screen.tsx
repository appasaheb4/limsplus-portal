import React, {useState, useMemo, useEffect} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {Table} from 'reactstrap';
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
import {lookupItems, lookupValue} from '@/library/utils';
import {TestPanelMappingList} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {AutoCompleteFilterSingleSelectPanelCode} from '../components';
import {IconContext} from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import {TestPanelMappingHoc} from '../hoc';
import {useStores} from '@/stores';
import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetTestPanelMapping} from '../startup';
import {SelectedItems} from '../models';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

const TestPanelMapping = TestPanelMappingHoc(
  observer(() => {
    const {
      loginStore,
      labStore,
      masterPanelStore,
      testMasterStore,
      testPanelMappingStore,
      routerStore,
      loading,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();

    useEffect(() => {
      // Default value initialization
      setValue('lab', loginStore.login.lab);
      setValue('status', testPanelMappingStore.testPanelMapping?.status);
      setValue(
        'environment',
        testPanelMappingStore.testPanelMapping?.environment,
      );
      setValue(
        'dateCreation',
        testPanelMappingStore.testPanelMapping?.dateCreation,
      );
      setValue(
        'dateExpire',
        testPanelMappingStore.testPanelMapping?.dateExpire,
      );
      setValue('version', testPanelMappingStore.testPanelMapping?.version);
      setValue(
        'dateActive',
        testPanelMappingStore.testPanelMapping?.dateActive,
      );

      setValue(
        'printPanelName',
        testPanelMappingStore.testPanelMapping?.printPanelName,
      );
      setValue(
        'printTestName',
        testPanelMappingStore.testPanelMapping?.printTestName,
      );
      setValue(
        'printAnalyteName',
        testPanelMappingStore.testPanelMapping?.printAnalyteName,
      );
      setValue(
        'analyteInterpretation',
        testPanelMappingStore.testPanelMapping?.analyteInterpretation,
      );
      setValue('testCode', testPanelMappingStore.testPanelMapping?.testCode);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testPanelMappingStore.testPanelMapping]);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(false);
    const [txtDisable, setTxtDisable] = useState(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [masterFlag, setMasgterFlag] = useState<any>([
      {
        title: 'PM',
        isSelected: false,
        icon: 'Icons.IconFa.FaSolarPanel',
      },
      {
        title: 'TM',
        isSelected: false,
      },
      {
        title: 'AM',
        isSelected: true,
      },
    ]);

    const onSubmitTestPanelMapping = () => {
      if (!testPanelMappingStore.checkExitsLabEnvCode) {
        if (
          !testPanelMappingStore.testPanelMapping?.existsVersionId &&
          !testPanelMappingStore.testPanelMapping?.existsRecordId
        ) {
          testPanelMappingStore.testPanelMappingService
            .addTestPanelMapping({
              input: isImport
                ? {isImport, arrImportRecords}
                : {
                    isImport,
                    ...testPanelMappingStore.testPanelMapping,
                    enteredBy: loginStore.login.userId,
                  },
            })
            .then(res => {
              if (res.createTestPanelMapping.success) {
                Toast.success({
                  message: `😊 ${res.createTestPanelMapping.message}`,
                });
                setIsInputView(true);
                reset();
                resetTestPanelMapping();
                testPanelMappingStore.updateSelectedItems(
                  new SelectedItems({}),
                );
              }
            });
        } else if (
          testPanelMappingStore.testPanelMapping?.existsVersionId &&
          !testPanelMappingStore.testPanelMapping?.existsRecordId
        ) {
          testPanelMappingStore.testPanelMappingService
            .versionUpgradeTestPanelMapping({
              input: {
                ...testPanelMappingStore.testPanelMapping,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.versionUpgradeTestPanelMappings.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradeTestPanelMappings.message}`,
                });
              }
            });
        } else if (
          !testPanelMappingStore.testPanelMapping?.existsVersionId &&
          testPanelMappingStore.testPanelMapping?.existsRecordId
        ) {
          testPanelMappingStore.testPanelMappingService
            .duplicateTestPanelMapping({
              input: {
                ...testPanelMappingStore.testPanelMapping,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.duplicateTestPanelMappings.success) {
                Toast.success({
                  message: `😊 ${res.duplicateTestPanelMappings.message}`,
                });
              }
            });
        }
      } else {
        Toast.warning({
          message: '😔 Please enter diff code',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <TestPanelMappingList
          data={testPanelMappingStore.listTestPanelMapping || []}
          totalSize={testPanelMappingStore.listTestPanelMappingCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listLabs: labStore.listLabs,
            listMasterPanel: masterPanelStore.listMasterPanel,
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
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'updateFileds',
              data: {fileds, id},
              title: 'Are you sure?',
              body: 'Update records',
            });
          }}
          onVersionUpgrade={item => {
            setModalConfirm({
              show: true,
              type: 'versionUpgrade',
              data: item,
              title: 'Are you version upgrade?',
              body: 'Version upgrade this record',
            });
          }}
          onDuplicate={item => {
            setModalConfirm({
              show: true,
              type: 'duplicate',
              data: item,
              title: 'Are you duplicate?',
              body: 'Duplicate this record',
            });
          }}
          onUpdateOrderSeq={orderSeq => {
            testPanelMappingStore.testPanelMappingService
              .updateOrderSeq({input: {filter: {orderSeq}}})
              .then(res => {
                Toast.success({
                  message: `😊 ${res.updateROTestPanelMapping.message}`,
                });
                testPanelMappingStore.fetchTestPanelMapping();
              });
          }}
          onPageSizeChange={(page, limit) => {
            testPanelMappingStore.fetchTestPanelMapping(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            testPanelMappingStore.testPanelMappingService.filter({
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
            const isExists = await checkExistsRecords(records);
            if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'Update',
                data: {value: 'A', dataField: 'status', id: records._id},
                title: 'Are you sure?',
                body: 'Update TestPanelMapping!',
              });
            }
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [testPanelMappingStore.listTestPanelMapping],
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
          const methodFlags = item['Method Flags'];
          const methodFlagPMValue = methodFlags?.includes('MethodFlag PM:Yes');
          const methodFlagTMValue = methodFlags?.includes('MethodFlag TM:Yes');
          const methodFlagAMValue = methodFlags?.includes('MethodFlag AM:Yes');
          return {
            lab: item?.Lab,
            panelCode: item['Panel Code'],
            testCode: [],
            testName: [],
            bill: item.Bill === 'Yes' ? true : false,
            printPanelName: item['Print Panel Name'] === 'Yes' ? true : false,
            printTestName: item['Print Test Name'] === 'Yes' ? true : false,
            printAnalyteName:
              item['Print Analyte Name'] === 'Yes' ? true : false,
            panelInterpretation:
              item['Panel Interpretation'] === 'Yes' ? true : false,
            testInterpretation:
              item['Test Interpretation'] === 'Yes' ? true : false,
            analyteInterpretation:
              item['Analyte Interpretation'] === 'Yes' ? true : false,
            panelMethod: methodFlagPMValue ? true : false,
            testMethod: methodFlagTMValue ? true : false,
            analyteMethod: methodFlagAMValue ? true : false,
            enteredBy: loginStore.login?.userId,
            dateCreation: new Date(),
            dateActive: new Date(),
            dateExpire: new Date(
              dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
            ),
            version: item.Version,
            environment: item.Environment,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = testPanelMappingStore.testPanelMapping,
      length = 0,
      status = 'A',
    ) => {
      return testPanelMappingStore.testPanelMappingService
        .findByFields({
          input: {
            filter: {
              ..._.pick({...fields, status}, [
                'panelCode',
                'testName',
                'status',
                'environment',
                'lab',
              ]),
            },
          },
        })
        .then(res => {
          if (
            res.findByFieldsTestPanelMappings?.success &&
            res.findByFieldsTestPanelMappings?.data?.length > length
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
            show={!isInputView}
            onClick={() => setIsInputView(!isInputView)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (isInputView ? 'shown' : 'hidden')
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
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper label='Lab' hasError={!!errors.lab}>
                          <AutoCompleteFilterSingleSelect
                            loader={loading}
                            placeholder='Search by name'
                            disable={
                              loginStore.login &&
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
                              console.log(item);
                              onChange(item.code);
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                lab: item.code,
                              });
                              if (
                                !testPanelMappingStore.testPanelMapping
                                  ?.existsVersionId
                              ) {
                                testPanelMappingStore.testPanelMappingService
                                  .checkExistsRecords({
                                    input: {
                                      lab: item.code,
                                      panelCode:
                                        testPanelMappingStore.testPanelMapping
                                          ?.panelCode,
                                      testCode:
                                        testPanelMappingStore.testPanelMapping
                                          ?.testCode,
                                      env: testPanelMappingStore
                                        .testPanelMapping?.environment,
                                    },
                                  })
                                  .then(res => {
                                    if (
                                      res.checkTestPanelMappingsExistsRecord
                                        .success
                                    ) {
                                      testPanelMappingStore.updateExistsLabEnvCode(
                                        true,
                                      );
                                      Toast.error({
                                        message: `😔 ${res.checkTestPanelMappingsExistsRecord.message}`,
                                      });
                                    } else
                                      testPanelMappingStore.updateExistsLabEnvCode(
                                        false,
                                      );
                                  });
                              }
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='lab'
                      rules={{required: true}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Panel Code'
                          hasError={!!errors.panelCode}
                        >
                          <AutoCompleteFilterSingleSelectPanelCode
                            hasError={!!errors.panelCode}
                            displayValue={value}
                            lab={testPanelMappingStore.testPanelMapping?.lab}
                            onSelect={item => {
                              onChange(item.panelName);
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                panelCode: item.panelCode,
                              });
                              masterPanelStore.updatePanelMasterList(
                                masterPanelStore.listMasterPanelCopy,
                              );
                              if (
                                !testPanelMappingStore.testPanelMapping
                                  ?.existsVersionId
                              ) {
                                testPanelMappingStore.testPanelMappingService
                                  .checkExistsRecords({
                                    input: {
                                      lab: testPanelMappingStore
                                        .testPanelMapping?.lab,
                                      panelCode: item.panelCode,
                                      testCode:
                                        testPanelMappingStore.testPanelMapping
                                          ?.testCode,
                                      env: testPanelMappingStore
                                        .testPanelMapping?.environment,
                                    },
                                  })
                                  .then(res => {
                                    if (
                                      res.checkTestPanelMappingsExistsRecord
                                        .success
                                    ) {
                                      testPanelMappingStore.updateExistsLabEnvCode(
                                        true,
                                      );
                                      Toast.error({
                                        message: `😔 ${res.checkTestPanelMappingsExistsRecord.message}`,
                                      });
                                    } else
                                      testPanelMappingStore.updateExistsLabEnvCode(
                                        false,
                                      );
                                  });
                              }
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='panelCode'
                      rules={{required: true}}
                      defaultValue=''
                    />
                    {testPanelMappingStore.checkExitsLabEnvCode && (
                      <span className='text-red-600 font-medium relative'>
                        Code already exits. Please use other code.
                      </span>
                    )}

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Test Code'
                          placeholder={
                            errors.testCode
                              ? 'Please Enter testCode'
                              : 'Test Code'
                          }
                          hasError={!!errors.testCode}
                          disabled={true}
                          value={value}
                          onChange={testCode => {
                            onChange(testCode);
                            testPanelMappingStore.updateTestPanelMapping({
                              ...testPanelMappingStore.testPanelMapping,
                              testCode,
                            });
                          }}
                        />
                      )}
                      name='testCode'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Test Name'
                          hasError={!!errors.testName}
                        >
                          <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                            loader={loading}
                            placeholder='Search by code or name'
                            data={{
                              list:
                                testMasterStore.listTestMaster.filter(
                                  item =>
                                    item.pLab ===
                                    testPanelMappingStore.testPanelMapping?.lab,
                                ) || [],
                              selected:
                                testPanelMappingStore.selectedItems?.testName,
                              displayKey: ['testCode', 'testName'],
                            }}
                            hasError={!!errors.testName}
                            onUpdate={item => {
                              const items =
                                testPanelMappingStore.selectedItems?.testName;
                              const testCode: string[] = [];
                              const testName: string[] = [];
                              const reportOrder: any[] = [];
                              items?.filter((item: any) => {
                                testCode.push(item.testCode);
                                testName.push(item.testName);
                                reportOrder.push({
                                  testCode: item.testCode,
                                  testName: item.testName,
                                  order: 1,
                                });
                              });
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                testName,
                                testCode,
                                reportOrder,
                              });
                              testMasterStore.updateTestMasterList(
                                testMasterStore.listTestMasterCopy,
                              );

                              if (
                                !testPanelMappingStore.testPanelMapping
                                  ?.existsVersionId
                              ) {
                                testPanelMappingStore.testPanelMappingService
                                  .checkExistsRecords({
                                    input: {
                                      lab: testPanelMappingStore
                                        .testPanelMapping?.lab,
                                      panelCode:
                                        testPanelMappingStore.testPanelMapping
                                          ?.panelCode,
                                      testCode,
                                      env: testPanelMappingStore
                                        .testPanelMapping?.environment,
                                    },
                                  })
                                  .then(res => {
                                    if (
                                      res.checkTestPanelMappingsExistsRecord
                                        .success
                                    ) {
                                      testPanelMappingStore.updateExistsLabEnvCode(
                                        true,
                                      );
                                      Toast.error({
                                        message: `😔 ${res.checkTestPanelMappingsExistsRecord.message}`,
                                      });
                                    } else
                                      testPanelMappingStore.updateExistsLabEnvCode(
                                        false,
                                      );
                                  });
                              }
                              setValue('testCode', testCode.join(','));
                            }}
                            onFilter={(value: string) => {
                              testMasterStore.testMasterService.filterByFields({
                                input: {
                                  filter: {
                                    fields: ['testCode', 'testName'],
                                    srText: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              });
                            }}
                            onSelect={item => {
                              onChange(new Date());
                              let testName =
                                testPanelMappingStore.selectedItems?.testName;
                              if (!item.selected) {
                                if (testName && testName.length > 0) {
                                  testName.push(item);
                                } else testName = [item];
                              } else {
                                testName = testName.filter(items => {
                                  return items._id !== item._id;
                                });
                              }
                              testPanelMappingStore.updateSelectedItems({
                                ...testPanelMappingStore.selectedItems,
                                testName,
                              });
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='testName'
                      rules={{required: true}}
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
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
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
                      rules={{required: true}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Entered By'
                          placeholder={
                            errors.userId ? 'Please Enter userId' : 'Entered By'
                          }
                          value={loginStore.login?.userId}
                          hasError={!!errors.userId}
                          disabled={true}
                          // onChange={(analyteCode) => {
                          //   masterAnalyteStore.updateMasterAnalyte({
                          //     ...masterAnalyteStore.masterAnalyte,
                          //     analyteCode,
                          //   })
                          // }}
                        />
                      )}
                      name='userId'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
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
                      rules={{required: false}}
                      defaultValue=''
                    />

                    <Grid cols={4}>
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Bill'
                            id='modeBill'
                            hasError={!!errors.bill}
                            value={value}
                            onChange={bill => {
                              onChange(bill);
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                bill,
                              });
                            }}
                          />
                        )}
                        name='bill'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Print Test Name'
                            hasError={!!errors.printTestName}
                            value={value}
                            onChange={printTestName => {
                              onChange(printTestName);
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                printTestName,
                              });
                            }}
                          />
                        )}
                        name='printTestName'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Print Analyte Name'
                            hasError={!!errors.printAnalyteName}
                            value={value}
                            onChange={printAnalyteName => {
                              onChange(printAnalyteName);
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                printAnalyteName,
                              });
                            }}
                          />
                        )}
                        name='printAnalyteName'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Print Panel Name'
                            hasError={!!errors.printPanelName}
                            value={value}
                            onChange={printPanelName => {
                              onChange(printPanelName);
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                printPanelName,
                              });
                            }}
                          />
                        )}
                        name='printPanelName'
                        rules={{required: false}}
                        defaultValue=''
                      />
                    </Grid>
                    <Form.InputWrapper
                      label='Method Flags'
                      hasError={!!errors.status}
                    >
                      <div className='inline-flex rounded-md' role='group'>
                        {masterFlag.map((item, index) => (
                          <button
                            type='button'
                            className={
                              'inline-flex items-center py-2 px-4 text-sm font-medium text-white ' +
                              (item.isSelected ? 'bg-green-800 ' : 'bg-red ') +
                              (index === 0 ? 'rounded-l-lg' : 'rounded-r-md') +
                              ' border border-gray-900'
                            }
                            onClick={() => {
                              const arrMasterFlag: any = masterFlag.filter(
                                e => {
                                  if (e.title === item.title) {
                                    e.isSelected = true;
                                  } else {
                                    e.isSelected = false;
                                  }
                                  return e;
                                },
                              );
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                panelMethod: arrMasterFlag.find(
                                  item => item.title === 'PM',
                                ).isSelected,
                                testMethod: arrMasterFlag.find(
                                  item => item.title === 'TM',
                                ).isSelected,
                                analyteMethod: arrMasterFlag.find(
                                  item => item.title === 'AM',
                                ).isSelected,
                              });
                              setMasgterFlag(arrMasterFlag);
                            }}
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    </Form.InputWrapper>

                    <Grid cols={3}>
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Panel Interpretation'
                            hasError={!!errors.panelInterpretation}
                            value={value}
                            onChange={panelInterpretation => {
                              onChange(panelInterpretation);
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                panelInterpretation,
                              });
                            }}
                          />
                        )}
                        name='panelInterpretation'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Test Interpretation'
                            hasError={!!errors.testInterpretation}
                            value={value}
                            onChange={testInterpretation => {
                              onChange(testInterpretation);
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                testInterpretation,
                              });
                            }}
                          />
                        )}
                        name='testInterpretation'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Analyte Interpretation'
                            hasError={!!errors.analyteInterpretation}
                            value={value}
                            onChange={analyteInterpretation => {
                              onChange(analyteInterpretation);
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                analyteInterpretation,
                              });
                            }}
                          />
                        )}
                        name='analyteInterpretation'
                        rules={{required: false}}
                        defaultValue=''
                      />
                    </Grid>
                  </List>

                  <List direction='col' space={4} justify='stretch' fill>
                    <Form.InputWrapper label='Report Order'>
                      <Table striped bordered className='max-h-5' size='sm'>
                        <thead>
                          <tr className='text-xs'>
                            <th className='text-white' style={{minWidth: 150}}>
                              Test
                            </th>
                            <th
                              className='text-white flex flex-row gap-2 items-center'
                              style={{minWidth: 150}}
                            >
                              Order
                              <Buttons.ButtonIcon
                                icon={
                                  <IconContext.Provider
                                    value={{color: '#ffffff'}}
                                  >
                                    <BsFillArrowUpCircleFill />
                                  </IconContext.Provider>
                                }
                                title=''
                                onClick={() => {
                                  let reportOrder =
                                    testPanelMappingStore.testPanelMapping
                                      .reportOrder;
                                  reportOrder = _.orderBy(
                                    reportOrder,
                                    'order',
                                    'asc',
                                  );
                                  testPanelMappingStore.updateTestPanelMapping({
                                    ...testPanelMappingStore.testPanelMapping,
                                    reportOrder,
                                  });
                                }}
                              />
                              <Buttons.ButtonIcon
                                icon={
                                  <IconContext.Provider
                                    value={{color: '#ffffff'}}
                                  >
                                    <BsFillArrowDownCircleFill />
                                  </IconContext.Provider>
                                }
                                title=''
                                onClick={() => {
                                  let reportOrder =
                                    testPanelMappingStore.testPanelMapping
                                      .reportOrder;
                                  reportOrder = _.orderBy(
                                    reportOrder,
                                    'order',
                                    'desc',
                                  );
                                  testPanelMappingStore.updateTestPanelMapping({
                                    ...testPanelMappingStore.testPanelMapping,
                                    reportOrder,
                                  });
                                }}
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody className='text-xs'>
                          {testPanelMappingStore.testPanelMapping
                            ?.reportOrder &&
                            testPanelMappingStore.testPanelMapping?.reportOrder.map(
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
                                    item.testName + ' - ' + item.testCode
                                  }`}</td>
                                  <td style={{width: 150}}>
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
                                            testPanelMappingStore
                                              .testPanelMapping?.reportOrder;
                                          reportOrder[index].order =
                                            Number.parseInt(order);
                                          testPanelMappingStore.updateTestPanelMapping(
                                            {
                                              ...testPanelMappingStore.testPanelMapping,
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
                      render={({field: {onChange, value}}) => (
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
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputDateTime
                          label='Date Expire'
                          placeholder={
                            errors.dateExpire
                              ? 'Please Enter dateExpire'
                              : 'Date Expire'
                          }
                          hasError={!!errors.dateExpire}
                          value={value}
                          onChange={dateExpire => {
                            onChange(dateExpire);
                            testPanelMappingStore.updateTestPanelMapping({
                              ...testPanelMappingStore.testPanelMapping,
                              dateExpire,
                            });
                          }}
                        />
                      )}
                      name='dateExpire'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Version'
                          placeholder={
                            errors.version ? 'Please Enter version' : 'Version'
                          }
                          hasError={!!errors.version}
                          value={value}
                          disabled={true}
                        />
                      )}
                      name='version'
                      rules={{required: false}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
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
                              loginStore.login &&
                              loginStore.login.role !== 'SYSADMIN'
                                ? true
                                : false
                            }
                            onChange={e => {
                              const environment = e.target.value;
                              onChange(environment);
                              testPanelMappingStore.updateTestPanelMapping({
                                ...testPanelMappingStore.testPanelMapping,
                                environment,
                              });
                              if (
                                !testPanelMappingStore.testPanelMapping
                                  ?.existsVersionId
                              ) {
                                testPanelMappingStore.testPanelMappingService
                                  .checkExistsRecords({
                                    input: {
                                      lab: testPanelMappingStore
                                        .testPanelMapping?.lab,
                                      panelCode:
                                        testPanelMappingStore.testPanelMapping
                                          ?.panelCode,
                                      testCode:
                                        testPanelMappingStore.testPanelMapping
                                          ?.testCode,
                                      env: environment,
                                    },
                                  })
                                  .then(res => {
                                    if (
                                      res.checkTestPanelMappingsExistsRecord
                                        .success
                                    ) {
                                      testPanelMappingStore.updateExistsLabEnvCode(
                                        true,
                                      );
                                      Toast.error({
                                        message: `😔 ${res.checkTestPanelMappingsExistsRecord.message}`,
                                      });
                                    } else
                                      testPanelMappingStore.updateExistsLabEnvCode(
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
                                : testPanelMappingStore.testPanelMapping
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
                    {/* <Grid cols={5}> */}

                    {/* </Grid> */}
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
                onClick={handleSubmit(onSubmitTestPanelMapping)}
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
              switch (action) {
                case 'Delete': {
                  testPanelMappingStore.testPanelMappingService
                    .deleteTestPanelMapping({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeTestPanelMapping.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.removeTestPanelMapping.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          testPanelMappingStore.fetchTestPanelMapping(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          testPanelMappingStore.testPanelMappingService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else testPanelMappingStore.fetchTestPanelMapping();
                      }
                    });

                  break;
                }
                case 'Update': {
                  testPanelMappingStore.testPanelMappingService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateTestPanelMapping.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updateTestPanelMapping.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          testPanelMappingStore.fetchTestPanelMapping(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          testPanelMappingStore.testPanelMappingService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else testPanelMappingStore.fetchTestPanelMapping();
                      }
                    });

                  break;
                }
                case 'updateFileds': {
                  testPanelMappingStore.testPanelMappingService
                    .updateSingleFiled({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateTestPanelMapping.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updateTestPanelMapping.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          testPanelMappingStore.fetchTestPanelMapping(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          testPanelMappingStore.testPanelMappingService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else testPanelMappingStore.fetchTestPanelMapping();
                      }
                    });

                  break;
                }
                case 'versionUpgrade': {
                  testPanelMappingStore.updateTestPanelMapping({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActiveFrom: new Date(),
                  });
                  setValue('lab', modalConfirm.data.lab);
                  setValue('panelCode', modalConfirm.data.panelCode);
                  setValue('testCode', modalConfirm.data.testCode);
                  setValue('testName', modalConfirm.data.testName);
                  setValue('environment', modalConfirm.data.environment);
                  setValue('status', modalConfirm.data.status);

                  break;
                }
                case 'duplicate': {
                  testPanelMappingStore.updateTestPanelMapping({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActiveFrom: new Date(),
                  });
                  setIsInputView(!isInputView);
                  setValue('lab', modalConfirm.data.lab);
                  setValue('panelCode', modalConfirm.data.panelCode);
                  setValue('testCode', modalConfirm.data.testCode);
                  setValue('testName', modalConfirm.data.testName);
                  setValue('environment', modalConfirm.data.environment);
                  setValue('status', modalConfirm.data.status);

                  break;
                }
                // No default
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

export default TestPanelMapping;
