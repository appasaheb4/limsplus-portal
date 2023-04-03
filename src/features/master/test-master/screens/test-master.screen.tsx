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
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {TestMasterList} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {AutoCompleteFilterSingleSelectDepartment} from '../components';

import {TestMasterHOC} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetTestMaster} from '../startup';

const TestMater = TestMasterHOC(
  observer(() => {
    const {
      loginStore,
      testMasterStore,
      labStore,
      departmentStore,
      deliveryScheduleStore,
      routerStore,
      loading,
      methodsStore,
      libraryStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();

    setValue('rLab', loginStore.login.lab);
    setValue('status', testMasterStore.testMaster?.status);
    setValue('environment', testMasterStore.testMaster?.environment);
    setValue('validationLevel', testMasterStore.testMaster?.validationLevel);
    setValue('processing', testMasterStore.testMaster?.processing);
    setValue('workflow', testMasterStore.testMaster?.workflow);
    setValue('disease', testMasterStore.testMaster?.disease);
    setValue('category', testMasterStore.testMaster?.category);
    setValue('testType', testMasterStore.testMaster?.testType);
    setValue('prefix', testMasterStore.testMaster?.prefix);
    setValue('sufix', testMasterStore.testMaster?.sufix);
    setValue('dateCreation', testMasterStore.testMaster?.dateCreation);
    setValue('dateExpire', testMasterStore.testMaster?.dateExpire);
    setValue('version', testMasterStore.testMaster?.version);
    setValue('dateActive', testMasterStore.testMaster?.dateActive);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(true);
    const onSubmitTestMaster = () => {
      if (!testMasterStore.checkExitsLabEnvCode) {
        if (
          !testMasterStore.testMaster?.existsVersionId &&
          !testMasterStore.testMaster?.existsRecordId
        ) {
          testMasterStore.testMasterService
            .addTestMaster({
              input: {
                ...testMasterStore.testMaster,
                enteredBy: loginStore.login.userId,
                disableTestName: undefined,
              },
            })
            .then(res => {
              if (res.createTestMaster.success) {
                Toast.success({
                  message: `😊 ${res.createTestMaster.message}`,
                });
              }
            });
        } else if (
          testMasterStore.testMaster?.existsVersionId &&
          !testMasterStore.testMaster?.existsRecordId
        ) {
          testMasterStore.testMasterService
            .versionUpgradeTestMaster({
              input: {
                ...testMasterStore.testMaster,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
                disableTestName: undefined,
              },
            })
            .then(res => {
              if (res.versionUpgradeTestMaster.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradeTestMaster.message}`,
                });
              }
            });
        } else if (
          !testMasterStore.testMaster?.existsVersionId &&
          testMasterStore.testMaster?.existsRecordId
        ) {
          testMasterStore.testMasterService
            .duplicateTestMaster({
              input: {
                ...testMasterStore.testMaster,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
                disableTestName: undefined,
              },
            })
            .then(res => {
              if (res.duplicateTestMaster.success) {
                Toast.success({
                  message: `😊 ${res.duplicateTestMaster.message}`,
                });
              }
            });
        }
        setIsInputView(true);
        reset();
        resetTestMaster();
      } else {
        Toast.warning({
          message: '😔 Please enter diff code',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <TestMasterList
          data={testMasterStore.listTestMaster || []}
          totalSize={testMasterStore.listTestMasterCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            labList: loginStore.login?.labList,
            listLabs: labStore.listLabs,
            listDepartment: departmentStore.listDepartment,
            sectionListByDeptCode: testMasterStore.sectionListByDeptCode,
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
              type: 'UpdateFileds',
              data: {fileds, id},
              title: 'Are you sure?',
              body: 'Update records!',
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
          onPageSizeChange={(page, limit) => {
            testMasterStore.fetchTestMaster(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            testMasterStore.testMasterService.filter({
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
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [testMasterStore.listTestMaster],
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
            show={isInputView}
            onClick={() => setIsInputView(!isInputView)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (isInputView ? 'hidden' : 'shown')
            }
          >
            <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='RLab' hasError={!!errors.rLab}>
                      <select
                        value={value}
                        disabled={
                          loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? true
                            : false
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.rLab ? 'border-red-500' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const rLab = e.target.value as string;
                          onChange(rLab);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            rLab,
                          });
                          if (!testMasterStore.testMaster?.existsVersionId) {
                            testMasterStore.testMasterService
                              .checkExitsLabEnvCode({
                                input: {
                                  code: testMasterStore.testMaster?.testCode,
                                  env: testMasterStore.testMaster?.environment,
                                  lab: rLab,
                                },
                              })
                              .then(res => {
                                if (res.checkTestMasterExistsRecord.success) {
                                  testMasterStore.updateExistsLabEnvCode(true);
                                  Toast.error({
                                    message: `😔 ${res.checkTestMasterExistsRecord.message}`,
                                  });
                                } else
                                  testMasterStore.updateExistsLabEnvCode(false);
                              });
                          }
                        }}
                      >
                        <option selected>Select</option>
                        {loginStore.login?.labList &&
                          loginStore.login?.labList.map(
                            (item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {item.name}
                              </option>
                            ),
                          )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='rLab'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='PLab' hasError={!!errors.pLab}>
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        placeholder='Search by name'
                        disable={
                          loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? true
                            : false
                        }
                        displayValue={value}
                        data={{
                          list: labStore.listLabs,
                          displayKey: 'name',
                          findKey: 'name',
                        }}
                        hasError={!!errors.pLab}
                        onFilter={(value: string) => {
                          labStore.LabService.filter({
                            input: {
                              type: 'search',
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
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            pLab: item.code,
                          });
                          labStore.updateLabList(labStore.listLabsCopy);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='pLab'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label={'Department'}
                      hasError={!!errors.department}
                    >
                      <AutoCompleteFilterSingleSelectDepartment
                        lab={testMasterStore.testMaster?.pLab}
                        hasError={!!errors.department}
                        onSelect={item => {
                          onChange(item.name);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            department: item?.code,
                            departmentName: item?.name,
                            departmentReportOrder: item?.reportOrder,
                            departmentHOD: item?.authorizedSignatory,
                          });
                          departmentStore.updateDepartmentList(
                            departmentStore.listDepartmentCopy,
                          );
                          testMasterStore.findSectionListByDeptCode(item.code);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='department'
                  rules={{required: true}}
                  defaultValue=''
                />

                {testMasterStore.sectionListByDeptCode && (
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper
                        label='Section'
                        hasError={!!errors.section}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.section
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const section = JSON.parse(e.target.value) as any;

                            onChange(section);
                            testMasterStore.updateTestMaster({
                              ...testMasterStore.testMaster,
                              section,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {testMasterStore.sectionListByDeptCode &&
                            testMasterStore.sectionListByDeptCode.map(
                              (item: any, index: number) => (
                                <option
                                  key={index}
                                  value={JSON.stringify(item)}
                                >
                                  {`${item.code} -${item.name}`}
                                </option>
                              ),
                            )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='section'
                    rules={{required: false}}
                    defaultValue=''
                  />
                )}
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Test Code'
                      placeholder={
                        errors.testCode ? 'Please Enter testCode' : 'Test Code'
                      }
                      hasError={!!errors.testCode}
                      value={value}
                      onChange={testCode => {
                        onChange(testCode);
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          testCode: testCode.toUpperCase(),
                        });
                      }}
                      onBlur={code => {
                        if (!testMasterStore.testMaster?.existsVersionId) {
                          testMasterStore.testMasterService
                            .checkExitsLabEnvCode({
                              input: {
                                code,
                                env: testMasterStore.testMaster?.environment,
                                lab: testMasterStore.testMaster?.rLab,
                              },
                            })
                            .then(res => {
                              if (res.checkTestMasterExistsRecord.success) {
                                testMasterStore.updateExistsLabEnvCode(true);
                                Toast.error({
                                  message: `😔 ${res.checkTestMasterExistsRecord.message}`,
                                });
                              } else
                                testMasterStore.updateExistsLabEnvCode(false);
                            });
                          testMasterStore.testMasterService
                            .findByFields({input: {filter: {testCode: code}}})
                            .then((res: any) => {
                              if (res.findByFieldsTestMaster.success) {
                                testMasterStore.updateTestMaster({
                                  ...testMasterStore.testMaster,
                                  testName:
                                    res.findByFieldsTestMaster.data?.length > 0
                                      ? res.findByFieldsTestMaster.data[0]
                                          .testName
                                      : undefined,
                                  disableTestName: true,
                                });
                              } else {
                                testMasterStore.updateTestMaster({
                                  ...testMasterStore.testMaster,
                                  testName: '',
                                  disableTestName: false,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                  name='testCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                {testMasterStore.checkExitsLabEnvCode && (
                  <span className='text-red-600 font-medium relative'>
                    Code already exits. Please use other code.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Test  Name'
                      placeholder={
                        errors.testName ? 'Please Enter testName' : 'Test Name'
                      }
                      hasError={!!errors.testName}
                      disabled={testMasterStore.testMaster?.disableTestName}
                      value={value}
                      onChange={testName => {
                        onChange(testName);
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          testName: testName.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='testName'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.MultilineInput
                      rows={3}
                      label='Description'
                      placeholder={
                        errors.description
                          ? 'Please Enter description'
                          : 'Description'
                      }
                      hasError={!!errors.description}
                      value={value}
                      onChange={description => {
                        onChange(description);
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          description,
                        });
                      }}
                    />
                  )}
                  name='description'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Short Name'
                      placeholder={
                        errors.shortName
                          ? 'Please Enter shortName'
                          : 'Short Name'
                      }
                      hasError={!!errors.shortName}
                      value={value}
                      onChange={shortName => {
                        onChange(shortName);
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          shortName: shortName,
                        });
                      }}
                    />
                  )}
                  name='shortName'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Price'
                      placeholder={
                        errors.price ? 'Please Enter price' : 'Price'
                      }
                      type='number'
                      hasError={!!errors.price}
                      value={value}
                      onChange={price => {
                        onChange(price);
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          price: Number.parseFloat(price),
                        });
                      }}
                    />
                  )}
                  name='price'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Schedule'
                      hasError={!!errors.schedule}
                    >
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        placeholder='Search by code'
                        data={{
                          list: deliveryScheduleStore.listDeliverySchedule,
                          displayKey: 'schCode',
                          findKey: 'schCode',
                        }}
                        displayValue={value}
                        hasError={!!errors.schCode}
                        onFilter={(value: string) => {
                          deliveryScheduleStore.deliveryScheduleService.filter({
                            input: {
                              type: 'filter',
                              filter: {
                                schCode: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item.schCode);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            schedule: item.schCode,
                          });
                          deliveryScheduleStore.updateDeliveryScheduleList(
                            deliveryScheduleStore.listDeliveryScheduleCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='schedule'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Validation Level'
                      hasError={!!errors.validationLevel}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.validationLevel
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const validationLevel: any = (e.target.value ||
                            0) as number;
                          onChange(validationLevel);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            validationLevel: Number.parseInt(validationLevel),
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                          (item: any, index: number) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='validationLevel'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Processing'
                      hasError={!!errors.processing}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.processing
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const processing = e.target.value;
                          onChange(processing);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            processing,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'PROCESSING').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='processing'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Test Method'
                      hasError={!!errors.testMethod}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: methodsStore.listMethods,
                          displayKey: ['methodsCode', 'methodsName'],
                        }}
                        displayValue={value}
                        hasError={!!errors.testMethod}
                        onFilter={(value: string) => {
                          methodsStore.methodsService.filterByFields({
                            input: {
                              filter: {
                                fields: ['methodsCode', 'methodsName'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item.methodsCode);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            testMethodCode: item.methodsCode,
                            testMethodName: item.methodsName,
                          });
                          methodsStore.updateMethodsList(
                            methodsStore.listMethodsCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='testMethod'
                  rules={{required: false}}
                  defaultValue=''
                />

                {/* <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.Input
                    label="Panel Method"
                    placeholder={
                      errors.panelMethod
                        ? "Please Enter panelMethod"
                        : "Panel Method"
                    }
                    hasError={!!errors.panelMethod}
                    value={testMasterStore.testMaster?.panelMethod}
                    onChange={(panelMethod) => {
                      onChange(panelMethod)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        panelMethod,
                      })
                    }}
                  />
                )}
                name="panelMethod"
                rules={{ required: false }}
                defaultValue=""
              /> */}
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Sample Run On'
                      hasError={!!errors.sampleRunOn}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.sampleRunOn
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const sampleRunOn = e.target.value as
                            | 'LABID'
                            | 'SAMPLEID';
                          onChange(sampleRunOn);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            sampleRunOn,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {['LABID', 'SAMPLEID'].map(
                          (item: any, index: number) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='sampleRunOn'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Workflow'
                      hasError={!!errors.workflow}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.workflow
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const workflow = e.target.value as string;
                          onChange(workflow);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            workflow,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'WORKFLOW').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='workflow'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Grid cols={5}>
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
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
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
                        label='AutoFinish'
                        id='modeAutoFinish'
                        hasError={!!errors.autoFinish}
                        value={value}
                        onChange={autoFinish => {
                          onChange(autoFinish);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            autoFinish,
                          });
                        }}
                      />
                    )}
                    name='autoFinish'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Hold OOS'
                        id='modeHoldOOS'
                        hasError={!!errors.holdOOS}
                        value={value}
                        onChange={holdOOS => {
                          onChange(holdOOS);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            holdOOS,
                          });
                        }}
                      />
                    )}
                    name='holdOOS'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Confidential'
                        hasError={!!errors.confidential}
                        value={value}
                        onChange={confidential => {
                          onChange(confidential);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            confidential,
                          });
                        }}
                      />
                    )}
                    name='confidential'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Urgent'
                        hasError={!!errors.urgent}
                        value={value}
                        onChange={urgent => {
                          onChange(urgent);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            urgent,
                          });
                        }}
                      />
                    )}
                    name='urgent'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                {/* <Form.Input
                label="Report Group"
                placeholder="Report Group"
                value={testMasterStore.testMaster?.reportGroup}
                onChange={(reportGroup) => {
                  testMasterStore.updateTestMaster({
                    ...testMasterStore.testMaster,
                    reportGroup,
                  })
                }}
              /> */}

                {/* <Form.Input
                label="Tube Groups"
                placeholder="Tube Groups"
                value={testMasterStore.testMaster?.tubeGroup}
                onChange={(tubeGroup) => {
                  testMasterStore.updateTestMaster({
                    ...testMasterStore.testMaster,
                    tubeGroup,
                  })
                }}
              />
              <Form.Input
                label="Label Instruction"
                placeholder="Label Instruction"
                value={testMasterStore.testMaster?.labelInstruction}
                onChange={(labelInstruction) => {
                  testMasterStore.updateTestMaster({
                    ...testMasterStore.testMaster,
                    labelInstruction,
                  })
                }}
              /> */}

                {/* <Form.Input
                label="Sample Type"
                placeholder="Sample Type"
                value={testMasterStore.testMaster?.sampleType}
                onChange={(sampleType) => {
                  testMasterStore.updateTestMaster({
                    ...testMasterStore.testMaster,
                    sampleType,
                  })
                }}
              /> */}
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Speical Instruction'
                      hasError={!!errors.speicalInstructions}
                      placeholder={
                        errors.speicalInstructions
                          ? 'Please Enter speicalInstructions'
                          : 'Speical Instrcution'
                      }
                      value={value}
                      onChange={speicalInstructions => {
                        onChange(speicalInstructions);
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          speicalInstructions:
                            speicalInstructions.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='speicalInstructions'
                  rules={{required: false}}
                  defaultValue=''
                />
                {/* <Form.Input
                label="Disease"
                placeholder="Disease"
                value={testMasterStore.testMaster?.disease}
                onChange={(disease) => {
                  testMasterStore.updateTestMaster({
                    ...testMasterStore.testMaster,
                    disease,
                  })
                }}
              /> */}
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Disease'
                      hasError={!!errors.disease}
                    >
                      <select
                        value={value}
                        className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                        onChange={e => {
                          const disease = e.target.value as string;
                          onChange(disease);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            disease,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'DISEASE').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='disease'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Category'
                      hasError={!!errors.category}
                    >
                      <select
                        value={value}
                        className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                        onChange={e => {
                          const category = e.target.value as string;
                          onChange(category);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            category,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'CATEGORY').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='category'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Test Type'
                      hasError={!!errors.testType}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.testType
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const testType = e.target.value as string;
                          onChange(testType);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            testType,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'TEST_TYPE').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='testType'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Workflow Code'
                      hasError={!!errors.workflowCode}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.workflowCode
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const workflowCode = e.target.value as string;
                          onChange(workflowCode);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            workflowCode,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {['Workflow Code 1'].map((item: any, index: number) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='workflowCode'
                  rules={{required: false}}
                  defaultValue=''
                />
                {/* <Form.InputWrapper label="Worklist Code">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const worklistCode = e.target.value as string
                    testMasterStore.updateTestMaster({
                      ...testMasterStore.testMaster,
                      worklistCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Worklist Code 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Form.InputWrapper> */}
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='CPT Code'
                      placeholder={
                        errors.cptCode ? 'Please Enter cptCode' : 'CPT Code'
                      }
                      hasError={!!errors.cptCode}
                      value={value}
                      onChange={cptCode => {
                        onChange(cptCode);
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          cptCode: cptCode.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='cptCode'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Prefix'
                      hasError={!!errors.prefix}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.prefix ? 'border-red-500  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const prefix = e.target.value;
                          onChange(prefix);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            prefix,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'PREFIX').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='prefix'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Form.Input
                  label='Label Instruction'
                  placeholder='Label Instruction'
                  value={testMasterStore.testMaster?.labelInstruction}
                  onChange={labelInstruction => {
                    testMasterStore.updateTestMaster({
                      ...testMasterStore.testMaster,
                      labelInstruction,
                    });
                  }}
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Sufix' hasError={!!errors.sufix}>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.sufix ? 'border-red-500  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const sufix = e.target.value;
                          onChange(sufix);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            sufix,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'SUFIX').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='sufix'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.MultilineInput
                      rows={2}
                      label='Internal Comments'
                      placeholder='Internal Comments'
                      hasError={!!errors.internalComments}
                      value={value}
                      onChange={internalComments => {
                        onChange(internalComments);
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          internalComments,
                        });
                      }}
                    />
                  )}
                  name='internalComments'
                  rules={{
                    required: false,
                  }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.MultilineInput
                      rows={2}
                      label='External Comments'
                      placeholder='External Comments'
                      hasError={!!errors.externalComments}
                      value={value}
                      onChange={externalComments => {
                        onChange(externalComments);
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          externalComments,
                        });
                      }}
                    />
                  )}
                  name='externalComments'
                  rules={{
                    required: false,
                  }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Test Bottom Marker'
                      hasError={!!errors.panelBottomMarker}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or details'
                        data={{
                          list: libraryStore.listLibrary,
                          displayKey: ['code', 'details'],
                        }}
                        displayValue={value}
                        hasError={!!errors.panelBottomMarker}
                        onFilter={(value: string) => {
                          libraryStore.libraryService.filterByFields({
                            input: {
                              filter: {
                                fields: ['code', 'details'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item.details);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            testBottomMarker: {
                              code: item?.code,
                              details: item?.details,
                            },
                          });
                          libraryStore.updateLibraryList(
                            libraryStore.listLibraryCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='panelBottomMarker'
                  rules={{
                    required: false,
                  }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.MultilineInput
                      rows={2}
                      label='Test Right Marker'
                      placeholder='Panel Right Marker'
                      hasError={!!errors.panelRightMarker}
                      value={value}
                      onChange={testRightMarker => {
                        onChange(testRightMarker);
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          testRightMarker,
                        });
                      }}
                    />
                  )}
                  name='panelRightMarker'
                  rules={{
                    required: false,
                  }}
                  defaultValue=''
                />
                <Grid cols={5}>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Accredited'
                        hasError={!!errors.accredited}
                        value={value}
                        onChange={accredited => {
                          onChange(accredited);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            accredited,
                          });
                        }}
                      />
                    )}
                    name='accredited'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Abn Flag'
                        hasError={!!errors.abnFlag}
                        value={value}
                        onChange={abnFlag => {
                          onChange(abnFlag);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            abnFlag,
                          });
                        }}
                      />
                    )}
                    name='abnFlag'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Cretical'
                        hasError={!!errors.cretical}
                        value={value}
                        onChange={cretical => {
                          onChange(cretical);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            cretical,
                          });
                        }}
                      />
                    )}
                    name='cretical'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Repetition'
                        hasError={!!errors.repitation}
                        value={value}
                        onChange={repitation => {
                          onChange(repitation);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            repitation,
                          });
                        }}
                      />
                    )}
                    name='repitation'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Print Label'
                        hasError={!!errors.printLabel}
                        value={value}
                        onChange={printLabel => {
                          onChange(printLabel);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            printLabel,
                          });
                        }}
                      />
                    )}
                    name='printLabel'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                {/* <Form.InputWrapper label="Collection Container">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const collectionContainer = e.target.value
                    testMasterStore.updateTestMaster({
                      ...testMasterStore.testMaster,
                      collectionContainer,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Collection Container 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Form.InputWrapper> */}
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
                          errors.status ? 'border-red-500  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const status = e.target.value;
                          onChange(status);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
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
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Entered By'
                      placeholder={
                        errors.dateCreation
                          ? 'Please Enter dateCreation'
                          : 'Entered By'
                      }
                      hasError={!!errors.dateCreation}
                      value={loginStore.login?.userId}
                      disabled={true}
                    />
                  )}
                  name='dateCreation'
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
                          ? 'Please Enter dateCreation'
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
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputDateTime
                      label='Date Active'
                      placeholder={
                        errors.dateActive
                          ? 'Please Enter dateActive'
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
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
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
                    <Form.InputWrapper label='Interpretation'>
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code'
                        hasError={!!errors.interpretation}
                        data={{
                          list: libraryStore.listLibrary.filter(
                            item => item.libraryType === 'I',
                          ),
                          displayKey: ['code'],
                        }}
                        displayValue={value}
                        onFilter={(value: string) => {
                          libraryStore.libraryService.filterByFields({
                            input: {
                              filter: {
                                fields: ['code'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item.code);
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            interpretation: item.code,
                          });
                          libraryStore.updateLibraryList(
                            libraryStore.listLibraryCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='interpretation'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputDateTime
                      label='Test Result Date'
                      placeholder='Date'
                      hasError={!!errors.testResultDate}
                      disabled={true}
                      value={value}
                      onChange={testResultDate => {
                        onChange(testResultDate);
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          testResultDate,
                        });
                      }}
                    />
                  )}
                  name='testResultDate'
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
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            environment,
                          });
                          if (!testMasterStore.testMaster?.existsVersionId) {
                            testMasterStore.testMasterService
                              .checkExitsLabEnvCode({
                                input: {
                                  code: testMasterStore.testMaster?.testCode,
                                  env: environment,
                                  lab: testMasterStore.testMaster?.rLab,
                                },
                              })
                              .then(res => {
                                if (res.checkTestMasterExistsRecord.success) {
                                  testMasterStore.updateExistsLabEnvCode(true);
                                  Toast.error({
                                    message: `😔 ${res.checkTestMasterExistsRecord.message}`,
                                  });
                                } else
                                  testMasterStore.updateExistsLabEnvCode(false);
                              });
                          }
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : testMasterStore.testMaster?.environment ||
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
                <List direction='row'>
                  <Grid cols={4}>
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='Method'
                          hasError={!!errors.method}
                          value={value}
                          onChange={method => {
                            onChange(method);
                            testMasterStore.updateTestMaster({
                              ...testMasterStore.testMaster,
                              method,
                              testMethodCode: !method
                                ? ''
                                : testMasterStore.testMaster?.testMethodCode,
                              testMethodName: !method
                                ? ''
                                : testMasterStore.testMaster?.testMethodName,
                            });
                          }}
                        />
                      )}
                      name='method'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='Cumulative'
                          hasError={!!errors.cumulative}
                          value={value}
                          onChange={cumulative => {
                            onChange(cumulative);
                            testMasterStore.updateTestMaster({
                              ...testMasterStore.testMaster,
                              cumulative,
                            });
                          }}
                        />
                      )}
                      name='cumulative'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='QC Hold'
                          hasError={!!errors.qcHold}
                          value={value}
                          onChange={qcHold => {
                            onChange(qcHold);
                            testMasterStore.updateTestMaster({
                              ...testMasterStore.testMaster,
                              qcHold,
                            });
                          }}
                        />
                      )}
                      name='qcHold'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='OOS Hold'
                          hasError={!!errors.oosHold}
                          value={value}
                          onChange={oosHold => {
                            onChange(oosHold);
                            testMasterStore.updateTestMaster({
                              ...testMasterStore.testMaster,
                              oosHold,
                            });
                          }}
                        />
                      )}
                      name=' oosHold'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='Delta Hold'
                          hasError={!!errors.deltaHold}
                          value={value}
                          onChange={deltaHold => {
                            onChange(deltaHold);
                            testMasterStore.updateTestMaster({
                              ...testMasterStore.testMaster,
                              deltaHold,
                            });
                          }}
                        />
                      )}
                      name='deltaHold'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='Allow Partial'
                          hasError={!!errors.allowPartial}
                          value={value}
                          onChange={allowPartial => {
                            onChange(allowPartial);
                            testMasterStore.updateTestMaster({
                              ...testMasterStore.testMaster,
                              allowPartial,
                            });
                          }}
                        />
                      )}
                      name='allowPartial'
                      rules={{required: false}}
                      defaultValue=''
                    />
                  </Grid>
                </List>
                {/* </Grid> */}
              </List>
            </Grid>
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitTestMaster)}
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
                  testMasterStore.testMasterService
                    .deleteTestMaster({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeTestMaster.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.removeTestMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          testMasterStore.fetchTestMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global.filter.mode == 'filter')
                          testMasterStore.testMasterService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else testMasterStore.fetchTestMaster();
                      }
                    });

                  break;
                }
                case 'Update': {
                  testMasterStore.testMasterService
                    .updateFileds({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateTestMaster.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updateTestMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          testMasterStore.fetchTestMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global.filter.mode == 'filter')
                          testMasterStore.testMasterService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else testMasterStore.fetchTestMaster();
                      }
                    });

                  break;
                }
                case 'UpdateFileds': {
                  testMasterStore.testMasterService
                    .updateFileds({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateTestMaster.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updateTestMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          testMasterStore.fetchTestMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global.filter.mode == 'filter')
                          testMasterStore.testMasterService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else testMasterStore.fetchTestMaster();
                      }
                    });

                  break;
                }
                case 'versionUpgrade': {
                  testMasterStore.updateTestMaster({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActiveFrom: new Date(),
                  });
                  setValue('rLab', modalConfirm.data.rLab);
                  setValue('pLab', modalConfirm.data.pLab);
                  setValue('department', modalConfirm.data.department);
                  setValue('testCode', modalConfirm.data.testCode);
                  setValue('testName', modalConfirm.data.testName);
                  setValue('department', modalConfirm.data.department);
                  setValue('environment', modalConfirm.data.environment);
                  setValue('status', modalConfirm.data.status);

                  break;
                }
                case 'duplicate': {
                  testMasterStore.updateTestMaster({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActiveFrom: new Date(),
                  });
                  setIsInputView(!isInputView);
                  setValue('rLab', modalConfirm.data.rLab);
                  setValue('pLab', modalConfirm.data.pLab);
                  setValue('department', modalConfirm.data.department);
                  setValue('testCode', modalConfirm.data.testCode);
                  setValue('testName', modalConfirm.data.testName);
                  setValue('department', modalConfirm.data.department);
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

export default TestMater;
