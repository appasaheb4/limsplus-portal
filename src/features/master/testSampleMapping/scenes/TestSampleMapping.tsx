/* eslint-disable */
import React, {useState, useMemo} from 'react';
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
  AutoCompleteFilterSingleSelect,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Icons,
} from '@/library/components';
import {TestSampleMappingList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {TestSampleMappingHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';

const TestSampleMapping = TestSampleMappingHoc(
  observer(() => {
    const {
      loginStore,
      testMasterStore,
      sampleTypeStore,
      sampleContainerStore,
      testSampleMappingStore,
      routerStore,
      loading,
      departmentStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();
    setValue(
      'environment',
      testSampleMappingStore.testSampleMapping?.environment,
    );

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);
    const onSubmitTestSampleMapping = () => {
      if (!testSampleMappingStore.checkExitsTestSampleEnvCode) {
        testSampleMappingStore.testSampleMappingService
          .addTestSampleMapping({
            input: {...testSampleMappingStore.testSampleMapping},
          })
          .then(res => {
            if (res.createTestSampleMapping.success) {
              Toast.success({
                message: `😊 ${res.createTestSampleMapping.message}`,
              });
            }
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          });
      } else {
        Toast.warning({
          message: '😔 Please enter diff code!',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <TestSampleMappingList
          data={testSampleMappingStore.listTestSampleMapping || []}
          totalSize={testSampleMappingStore.listTestSampleMappingCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listTestMaster: testMasterStore.listTestMaster,
            listSampleType: sampleTypeStore.listSampleType,
            listSampleContainer: sampleContainerStore.listSampleContainer,
            departments: testSampleMappingStore.departments,
            updateLocalInput: testSampleMappingStore.updateLocalInput,
            localInput: testSampleMappingStore.localInput,
            updateSampleType: testSampleMappingStore.updateSampleType,
            testSampleMapping: testSampleMappingStore.testSampleMapping,
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
              body: `Delete selected items!`,
            });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'Update',
              data: {value, dataField, id},
              title: 'Are you sure?',
              body: `Update items!`,
            });
          }}
          onPageSizeChange={(page, limit) => {
            testSampleMappingStore.fetchSampleTypeList(page, limit);
          }}
          onFilter={(type, filter, page, limit) => {
            testSampleMappingStore.testSampleMappingService.filter({
              input: {type, filter, page, limit},
            });
          }}
        />
      ),
      [testSampleMappingStore.listTestSampleMapping],
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
              'p-2 rounded-lg shadow-xl ' + (hideAddLab ? 'shown' : 'shown')
            }
          >
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                {testMasterStore.listTestMaster && (
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Test Code'
                        hasError={errors.testCode}
                      >
                        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          loader={loading}
                          placeholder='Search by code or name'
                          displayValue={
                            testSampleMappingStore.testSampleMapping?.testCode
                              ? `${testSampleMappingStore.testSampleMapping?.testCode} - ${testSampleMappingStore.testSampleMapping?.testName}`
                              : ''
                          }
                          data={{
                            list: testMasterStore.listTestMaster,
                            displayKey: ['testCode', 'testName'],
                          }}
                          hasError={errors.testCode}
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
                            onChange(item.testCode);
                            testSampleMappingStore.updateSampleType({
                              ...testSampleMappingStore.testSampleMapping,
                              testCode: item.testCode,
                              testName: item.testName,
                            });
                            testMasterStore.updateTestMasterList(
                              testMasterStore.listTestMasterCopy,
                            );
                            testSampleMappingStore.testSampleMappingService
                              .checkExitsTestSampleEnvCode({
                                input: {
                                  testCode: item.testCode,
                                  env: testSampleMappingStore.testSampleMapping
                                    ?.environment,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkTestSampleMappingsExistsRecord
                                    .success
                                ) {
                                  testSampleMappingStore.updateExitsTestSampleEnvCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkTestSampleMappingsExistsRecord.message}`,
                                  });
                                } else
                                  testSampleMappingStore.updateExitsTestSampleEnvCode(
                                    false,
                                  );
                              });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='testCode'
                    rules={{required: true}}
                    defaultValue=''
                  />
                )}
                {testSampleMappingStore.checkExitsTestSampleEnvCode && (
                  <span className='text-red-600 font-medium relative'>
                    Test code or sample code already exits. Please use other
                    code.
                  </span>
                )}

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Sample Code'
                      hasError={errors.sampleCode}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or type'
                        data={{
                          list: sampleTypeStore.listSampleType,
                          displayKey: ['sampleCode', 'sampleType'],
                        }}
                        hasError={errors.sampleCode}
                        onFilter={(value: string) => {
                          sampleTypeStore.sampleTypeService.filterByFields({
                            input: {
                              filter: {
                                fields: ['sampleCode', 'sampleType'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item.sampleCode);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            sampleCode: item.sampleCode,
                            sampleType: item.sampleType,
                          });
                          sampleTypeStore.updateSampleTypeList(
                            sampleTypeStore.listSampleTypeCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='sampleCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                {sampleTypeStore.listSampleType && (
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Sample Group'
                        hasError={errors.sampleGroup}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          placeholder='Search by SampleGroup'
                          data={{
                            list: sampleTypeStore.listSampleType.filter(
                              item => item.sampleGroup,
                            ),
                            displayKey: 'sampleGroup',
                            findKey: 'sampleGroup',
                          }}
                          hasError={errors.sampleGroup}
                          onFilter={(value: string) => {
                            sampleTypeStore.sampleTypeService.filter({
                              input: {
                                type: 'filter',
                                filter: {
                                  sampleGroup: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            });
                          }}
                          onSelect={item => {
                            onChange(item.sampleGroup);
                            testSampleMappingStore.updateSampleType({
                              ...testSampleMappingStore.testSampleMapping,
                              sampleGroup: item.sampleGroup,
                            });
                            sampleTypeStore.updateSampleTypeList(
                              sampleTypeStore.listSampleTypeCopy,
                            );
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='sampleGroup'
                    rules={{required: false}}
                    defaultValue=''
                  />
                )}
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Coll Container'
                      hasError={errors.collContainerCode}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: sampleContainerStore.listSampleContainer,
                          displayKey: ['containerCode', 'containerName'],
                        }}
                        hasError={errors.collContainerCode}
                        onFilter={(value: string) => {
                          sampleContainerStore.sampleContainerService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ['containerCode', 'containerName'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item.containerCode);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            collContainerCode: item.containerCode,
                            collContainerName: item.containerName,
                          });
                          sampleContainerStore.updateSampleContainerList(
                            sampleContainerStore.listSampleContainerCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='collContainerCode'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Test Container'
                      hasError={errors.testContainerCode}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: sampleContainerStore.listSampleContainer,
                          displayKey: ['containerCode', 'containerName'],
                        }}
                        hasError={errors.name}
                        onFilter={(value: string) => {
                          sampleContainerStore.sampleContainerService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ['containerCode', 'containerName'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item.containerCode);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            testContainerCode: item.containerCode,
                            testContainerName: item.containerName,
                          });
                          sampleContainerStore.updateSampleContainerList(
                            sampleContainerStore.listSampleContainerCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='testContainerCode'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Min Draw Vol'
                      placeholder={
                        errors.minDrawVol
                          ? 'Please Enter minDrawVol'
                          : 'Min Draw Vol'
                      }
                      hasError={errors.minDrawVol}
                      value={
                        testSampleMappingStore.testSampleMapping?.minDrawVol
                      }
                      onChange={minDrawVol => {
                        onChange(minDrawVol);
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          minDrawVol,
                        });
                      }}
                    />
                  )}
                  name='minDrawVol'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Min Draw Vol Unit'
                      hasError={errors.minDrawVolUnit}
                    >
                      <select
                        value={
                          testSampleMappingStore.testSampleMapping
                            ?.minDrawVolUnit
                        }
                        className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                        onChange={e => {
                          const minDrawVolUnit = e.target.value as string;
                          onChange(minDrawVolUnit);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            minDrawVolUnit,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'MIN_DRAW_VOL_UNIT',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='minDrawVolUnit'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Min Test Vol'
                      placeholder={
                        errors.minTestVol
                          ? 'Please Enter minTestVol'
                          : 'Min Test Vol'
                      }
                      hasError={errors.minTestVol}
                      value={
                        testSampleMappingStore.testSampleMapping?.minTestVol
                      }
                      onChange={minTestVol => {
                        onChange(minTestVol);
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          minTestVol,
                        });
                      }}
                    />
                  )}
                  name='minTestVol'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Min Test Vol Unit'
                      hasError={errors.minTestVolUnit}
                    >
                      <select
                        value={
                          testSampleMappingStore.testSampleMapping
                            ?.minTestVolUnit
                        }
                        className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                        onChange={e => {
                          const minTestVolUnit = e.target.value as string;
                          onChange(minTestVolUnit);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            minTestVolUnit,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'MIN_TEST_VOL_UNIT',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='minTestVolUnit'
                  rules={{required: false}}
                  defaultValue=''
                />
                {testSampleMappingStore.testSampleMapping.sharedSample && (
                  <Form.InputWrapper label='Departments & Prefrence'>
                    <Grid cols={4}>
                      <div className='mt-1'>
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                              loader={loading}
                              placeholder='Search by code or name'
                              data={{
                                list: departmentStore.listDepartment,
                                displayKey: ['code', 'name'],
                              }}
                              displayValue={
                                testSampleMappingStore.departments?.code
                                  ? `${testSampleMappingStore.departments.code} - ${testSampleMappingStore.departments.name}`
                                  : ''
                              }
                              hasError={errors.name}
                              onFilter={(value: string) => {
                                departmentStore.DepartmentService.filterByFields(
                                  {
                                    input: {
                                      filter: {
                                        fields: ['code', 'name'],
                                        srText: value,
                                      },
                                      page: 0,
                                      limit: 10,
                                    },
                                  },
                                );
                              }}
                              onSelect={item => {
                                onChange(item.code);
                                testSampleMappingStore.updateDepartments({
                                  ...testSampleMappingStore.departments,
                                  code: item.code,
                                  name: item.name,
                                });
                              }}
                            />
                          )}
                          name='code'
                          rules={{required: false}}
                          defaultValue=''
                        />
                      </div>
                      <Controller
                        control={control}
                        render={({field: {onChange}}) => (
                          <Form.Input
                            placeholder='Prefrence'
                            type='number'
                            value={
                              testSampleMappingStore.departments?.prefrence ||
                              ''
                            }
                            onChange={prefrence => {
                              onChange(prefrence);
                              testSampleMappingStore.updateDepartments({
                                ...testSampleMappingStore.departments,
                                prefrence: parseFloat(prefrence),
                              });
                            }}
                          />
                        )}
                        name='prefrence'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange}}) => (
                          <Form.Input
                            placeholder='TAT IN MIN'
                            type='number'
                            value={
                              testSampleMappingStore.departments?.tatInMin || ''
                            }
                            onChange={tatInMin => {
                              onChange(tatInMin);
                              testSampleMappingStore.updateDepartments({
                                ...testSampleMappingStore.departments,
                                tatInMin: parseFloat(tatInMin),
                              });
                            }}
                          />
                        )}
                        name='value'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <div className='mt-1 flex flex-row justify-between'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          onClick={() => {
                            const code =
                              testSampleMappingStore.departments?.code;
                            const name =
                              testSampleMappingStore.departments?.name;
                            const prefrence =
                              testSampleMappingStore.departments?.prefrence;
                            const tatInMin =
                              testSampleMappingStore.departments?.tatInMin;
                            let departments =
                              testSampleMappingStore.testSampleMapping
                                ?.departments || [];
                            if (
                              code === undefined ||
                              prefrence === undefined ||
                              tatInMin === undefined
                            )
                              return alert('Please enter all values.');
                            if (code !== undefined) {
                              departments !== undefined
                                ? departments.push({
                                    code,
                                    name,
                                    prefrence,
                                    tatInMin,
                                  })
                                : (departments = [
                                    {
                                      code,
                                      name,
                                      prefrence,
                                      tatInMin,
                                    },
                                  ]);
                              testSampleMappingStore.updateSampleType({
                                ...testSampleMappingStore.testSampleMapping,
                                departments,
                              });
                              testSampleMappingStore.updateDepartments({
                                code: undefined,
                                name: undefined,
                                prefrence: undefined,
                                tatInMin: undefined,
                              });
                            }
                          }}
                        >
                          <Icons.EvaIcon icon='plus-circle-outline' />
                          {`Add`}
                        </Buttons.Button>
                      </div>
                      <div className='clearfix'></div>
                    </Grid>

                    <List space={2} direction='row' justify='center'>
                      <div>
                        {testSampleMappingStore.testSampleMapping?.departments?.map(
                          (item, index) => (
                            <div className='mb-2' key={index}>
                              <Buttons.Button
                                size='medium'
                                type='solid'
                                icon={Svg.Remove}
                                onClick={() => {
                                  const firstArr =
                                    testSampleMappingStore.testSampleMapping?.departments?.slice(
                                      0,
                                      index,
                                    ) || [];
                                  const secondArr =
                                    testSampleMappingStore.testSampleMapping?.departments?.slice(
                                      index + 1,
                                    ) || [];
                                  const finalArray = [
                                    ...firstArr,
                                    ...secondArr,
                                  ];
                                  testSampleMappingStore.updateSampleType({
                                    ...testSampleMappingStore.testSampleMapping,
                                    departments: finalArray,
                                  });
                                }}
                              >
                                {`Department: ${item.code} - ${item.name}`}
                                {` Prefrence: ${item.prefrence}`}
                                {` Tat In Min: ${item.tatInMin}`}
                              </Buttons.Button>
                            </div>
                          ),
                        )}
                      </div>
                    </List>
                  </Form.InputWrapper>
                )}
                <Grid cols={4}>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Shared Sample'
                        hasError={errors.sharedSample}
                        value={
                          testSampleMappingStore.testSampleMapping?.sharedSample
                        }
                        onChange={sharedSample => {
                          onChange(sharedSample);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            sharedSample,
                          });
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            departments: [],
                          });
                          testSampleMappingStore.updateDepartments({
                            code: undefined,
                            name: undefined,
                            prefrence: undefined,
                            tatInMin: undefined,
                          });
                        }}
                      />
                    )}
                    name='sharedSample'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Primary Container'
                        hasError={errors.primaryContainer}
                        value={
                          testSampleMappingStore.testSampleMapping
                            ?.primaryContainer
                        }
                        onChange={primaryContainer => {
                          onChange(primaryContainer);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            primaryContainer,
                          });
                        }}
                      />
                    )}
                    name='primaryContainer'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Unique Container'
                        hasError={errors.uniqueContainer}
                        value={
                          testSampleMappingStore.testSampleMapping
                            ?.uniqueContainer
                        }
                        onChange={uniqueContainer => {
                          onChange(uniqueContainer);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            uniqueContainer,
                          });
                        }}
                      />
                    )}
                    name='uniqueContainer'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Centrifue'
                        hasError={errors.centerIfuge}
                        value={
                          testSampleMappingStore.testSampleMapping?.centerIfuge
                        }
                        onChange={centerIfuge => {
                          onChange(centerIfuge);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            centerIfuge,
                          });
                        }}
                      />
                    )}
                    name='centerIfuge'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Condition'
                      placeholder={
                        errors.condition
                          ? 'Please Enter condition'
                          : 'Condition'
                      }
                      hasError={errors.condition}
                      value={
                        testSampleMappingStore.testSampleMapping?.condition
                      }
                      onChange={condition => {
                        onChange(condition);
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          condition,
                        });
                      }}
                    />
                  )}
                  name='condition'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Retention Period'
                      placeholder={
                        errors.repentionPeriod
                          ? 'Please Enter repentionPeriod'
                          : 'Retention Period'
                      }
                      hasError={errors.repentionPeriod}
                      value={
                        testSampleMappingStore.testSampleMapping
                          ?.repentionPeriod
                      }
                      onChange={repentionPeriod => {
                        onChange(repentionPeriod);
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          repentionPeriod,
                        });
                      }}
                    />
                  )}
                  name='repentionPeriod'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Repention Units'
                      hasError={errors.repentionUnits}
                    >
                      <select
                        value={
                          testSampleMappingStore.testSampleMapping
                            ?.repentionUnits
                        }
                        className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                        onChange={e => {
                          const repentionUnits = e.target.value as string;
                          onChange(repentionUnits);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            repentionUnits,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'RETENTION_UNITS',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='repentionUnits'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Label Inst'
                      placeholder={
                        errors.labelInst
                          ? 'Please Enter labelInst'
                          : 'Label Inst'
                      }
                      hasError={errors.labelInst}
                      value={
                        testSampleMappingStore.testSampleMapping?.labelInst
                      }
                      onChange={labelInst => {
                        onChange(labelInst);
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          labelInst,
                        });
                      }}
                    />
                  )}
                  name='labelInst'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Info'
                      placeholder={errors.info ? 'Please Enter info' : 'Info'}
                      hasError={errors.info}
                      value={testSampleMappingStore.testSampleMapping?.info}
                      onChange={info => {
                        onChange(info);
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          info,
                        });
                      }}
                    />
                  )}
                  name='info'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Environment'>
                      <select
                        value={
                          testSampleMappingStore.testSampleMapping?.environment
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
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            environment,
                          });
                          testSampleMappingStore.testSampleMappingService
                            .checkExitsTestSampleEnvCode({
                              input: {
                                testCode:
                                  testSampleMappingStore.testSampleMapping
                                    ?.testCode,
                                env: environment,
                              },
                            })
                            .then(res => {
                              if (
                                res.checkTestSampleMappingsExistsRecord.success
                              ) {
                                testSampleMappingStore.updateExitsTestSampleEnvCode(
                                  true,
                                );
                                Toast.error({
                                  message: `😔 ${res.checkTestSampleMappingsExistsRecord.message}`,
                                });
                              } else
                                testSampleMappingStore.updateExitsTestSampleEnvCode(
                                  false,
                                );
                            });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? `Select`
                            : testSampleMappingStore.testSampleMapping
                                ?.environment || `Select`}
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
                <Grid cols={4}>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Lab Specfic'
                        hasError={errors.labSpecfic}
                        value={
                          testSampleMappingStore.testSampleMapping?.labSpecfic
                        }
                        onChange={labSpecfic => {
                          onChange(labSpecfic);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            labSpecfic,
                          });
                        }}
                      />
                    )}
                    name='labSpecfic'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Department Specfic'
                        hasError={errors.departmentSpecfic}
                        value={
                          testSampleMappingStore.testSampleMapping
                            ?.departmentSpecfic
                        }
                        onChange={departmentSpecfic => {
                          onChange(departmentSpecfic);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            departmentSpecfic,
                          });
                        }}
                      />
                    )}
                    name='departmentSpecfic'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Aliquot'
                        hasError={errors.aliquot}
                        value={
                          testSampleMappingStore.testSampleMapping?.aliquot
                        }
                        onChange={aliquot => {
                          onChange(aliquot);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            aliquot,
                          });
                        }}
                      />
                    )}
                    name='aliquot'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Print Label'
                        hasError={errors.printLabels}
                        value={
                          testSampleMappingStore.testSampleMapping?.printLabels
                        }
                        onChange={printLabels => {
                          onChange(printLabels);
                          testSampleMappingStore.updateSampleType({
                            ...testSampleMappingStore.testSampleMapping,
                            printLabels,
                          });
                        }}
                      />
                    )}
                    name='printLabels'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>
            </Grid>
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitTestSampleMapping)}
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
              if (type === 'Delete') {
                testSampleMappingStore.testSampleMappingService
                  .deleteTestSampleMapping({input: {id: modalConfirm.id}})
                  .then((res: any) => {
                    if (res.removeTestSampleMapping.success) {
                      Toast.success({
                        message: `😊 ${res.removeTestSampleMapping.message}`,
                      });
                      setModalConfirm({show: false});
                      testSampleMappingStore.fetchSampleTypeList();
                    }
                  });
              } else if (type === 'Update') {
                testSampleMappingStore.testSampleMappingService
                  .updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  })
                  .then((res: any) => {
                    if (res.updateTestSampleMapping.success) {
                      Toast.success({
                        message: `😊 ${res.updateTestSampleMapping.message}`,
                      });
                      setModalConfirm({show: false});
                      testSampleMappingStore.fetchSampleTypeList();
                    }
                  });
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

export default TestSampleMapping;
