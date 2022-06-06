import React, {useState, useMemo} from 'react';
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
    } = useForm();

    setValue('lab', loginStore.login.lab);
    setValue('status', testPanelMappingStore.testPanelMapping?.status);
    setValue(
      'environment',
      testPanelMappingStore.testPanelMapping?.environment,
    );

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);
    const [txtDisable, setTxtDisable] = useState(true);

    const onSubmitTestPanelMapping = () => {
      if (!testPanelMappingStore.checkExitsLabEnvCode) {
        if (
          !testPanelMappingStore.testPanelMapping?.existsVersionId &&
          !testPanelMappingStore.testPanelMapping?.existsRecordId
        ) {
          testPanelMappingStore.testPanelMappingService
            .addTestPanelMapping({
              input: {
                ...testPanelMappingStore.testPanelMapping,
                enteredBy: loginStore.login.userId,
              },
            })
            .then(res => {
              if (res.createTestPanelMapping.success) {
                Toast.success({
                  message: `😊 ${res.createTestPanelMapping.message}`,
                });
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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
          }}
          onFilter={(type, filter, page, limit) => {
            testPanelMappingStore.testPanelMappingService.filter({
              input: {type, filter, page, limit},
            });
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [testPanelMappingStore.listTestPanelMapping],
    );

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
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Lab' hasError={errors.lab}>
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
                        displayValue={
                          testPanelMappingStore.testPanelMapping?.lab
                        }
                        hasError={errors.lab}
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
                                  env: testPanelMappingStore.testPanelMapping
                                    ?.environment,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkTestPanelMappingsExistsRecord.success
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
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Panel Code'
                      hasError={errors.panelCode}
                    >
                      <AutoCompleteFilterSingleSelectPanelCode
                        hasError={errors.panelCode}
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
                                  lab: testPanelMappingStore.testPanelMapping
                                    ?.lab,
                                  panelCode: item.panelCode,
                                  testCode:
                                    testPanelMappingStore.testPanelMapping
                                      ?.testCode,
                                  env: testPanelMappingStore.testPanelMapping
                                    ?.environment,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkTestPanelMappingsExistsRecord.success
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
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Test Code'
                      placeholder={
                        errors.testCode ? 'Please Enter testCode' : 'Test Code'
                      }
                      hasError={errors.testCode}
                      disabled={true}
                      value={testPanelMappingStore.testPanelMapping?.testCode}
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
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Test Name'
                      hasError={errors.testName}
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
                        hasError={errors.testName}
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
                                  lab: testPanelMappingStore.testPanelMapping
                                    ?.lab,
                                  panelCode:
                                    testPanelMappingStore.testPanelMapping
                                      ?.panelCode,
                                  testCode,
                                  env: testPanelMappingStore.testPanelMapping
                                    ?.environment,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkTestPanelMappingsExistsRecord.success
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
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Status' hasError={errors.status}>
                      <select
                        value={testPanelMappingStore.testPanelMapping?.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? 'border-red-500  ' : 'border-gray-300'
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
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Entered By'
                      placeholder={
                        errors.userId ? 'Please Enter userId' : 'Entered By'
                      }
                      value={loginStore.login?.userId}
                      hasError={errors.userId}
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
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Date Creation'
                      placeholder={
                        errors.dateCreation
                          ? 'Please Enter DateCreation'
                          : 'Date Creation'
                      }
                      hasError={errors.dateCreation}
                      value={
                        testPanelMappingStore.testPanelMapping?.dateCreation
                      }
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
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Bill'
                        id='modeBill'
                        hasError={errors.bill}
                        value={testPanelMappingStore.testPanelMapping?.bill}
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
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Print Test Name'
                        hasError={errors.printTestName}
                        value={
                          testPanelMappingStore.testPanelMapping?.printTestName
                        }
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
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Panel Method'
                        hasError={errors.panelMethod}
                        value={
                          testPanelMappingStore.testPanelMapping?.panelMethod
                        }
                        onChange={panelMethod => {
                          onChange(panelMethod);
                          testPanelMappingStore.updateTestPanelMapping({
                            ...testPanelMappingStore.testPanelMapping,
                            panelMethod,
                          });
                        }}
                      />
                    )}
                    name='panelMethod'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Test Method'
                        hasError={errors.testMethod}
                        value={
                          testPanelMappingStore.testPanelMapping?.testMethod
                        }
                        onChange={testMethod => {
                          onChange(testMethod);
                          testPanelMappingStore.updateTestPanelMapping({
                            ...testPanelMappingStore.testPanelMapping,
                            testMethod,
                          });
                        }}
                      />
                    )}
                    name='testMethod'
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
                              <IconContext.Provider value={{color: '#ffffff'}}>
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
                              <IconContext.Provider value={{color: '#ffffff'}}>
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
                      {testPanelMappingStore.testPanelMapping?.reportOrder &&
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
                                        testPanelMappingStore.testPanelMapping
                                          ?.reportOrder;
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
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Date Active'
                      placeholder={
                        errors.dateActive
                          ? 'Please Enter DateActiveFrom'
                          : 'Date Active'
                      }
                      hasError={errors.dateActive}
                      value={testPanelMappingStore.testPanelMapping?.dateActive}
                      disabled={true}
                    />
                  )}
                  name='dateActive'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Date Expire'
                      placeholder={
                        errors.dateExpire
                          ? 'Please Enter dateExpire'
                          : 'Date Expire'
                      }
                      hasError={errors.dateExpire}
                      value={testPanelMappingStore.testPanelMapping?.dateExpire}
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
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Version'
                      placeholder={
                        errors.version ? 'Please Enter version' : 'Version'
                      }
                      hasError={errors.version}
                      value={testPanelMappingStore.testPanelMapping?.version}
                      disabled={true}
                    />
                  )}
                  name='version'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Environment'
                      hasError={errors.environment}
                    >
                      <select
                        value={
                          testPanelMappingStore.testPanelMapping?.environment
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? 'border-red-500  '
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
                                  lab: testPanelMappingStore.testPanelMapping
                                    ?.lab,
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
                                  res.checkTestPanelMappingsExistsRecord.success
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
            click={(type?: string) => {
              switch (type) {
                case 'Delete': {
                  testPanelMappingStore.testPanelMappingService
                    .deleteTestPanelMapping({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeTestPanelMapping.success) {
                        Toast.success({
                          message: `😊 ${res.removeTestPanelMapping.message}`,
                        });
                        setModalConfirm({show: false});
                        testPanelMappingStore.fetchTestPanelMapping();
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
                        Toast.success({
                          message: `😊 ${res.updateTestPanelMapping.message}`,
                        });
                        setModalConfirm({show: false});
                        testPanelMappingStore.fetchTestPanelMapping();
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
                        Toast.success({
                          message: `😊 ${res.updateTestPanelMapping.message}`,
                        });
                        setModalConfirm({show: false});
                        testPanelMappingStore.fetchTestPanelMapping();
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
                  setHideAddLab(!hideAddLab);
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
