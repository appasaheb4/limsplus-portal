import React, { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  AutoCompleteFilterSingleSelect,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  MainPageHeading,
  AutoCompleteFilterMultiKeySingleSelect,
} from '@/library/components';
import { dayjs, lookupItems, lookupValue } from '@/library/utils';
import { TestMasterList } from '../components';
import { useForm, Controller } from 'react-hook-form';
import { AutoCompleteFilterSingleSelectDepartment } from '../components';
import { TestMasterHOC } from '../hoc';
import { useStores } from '@/stores';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { resetTestMaster } from '../startup';
import * as XLSX from 'xlsx';
import _ from 'lodash';

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
      formState: { errors },
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);
    const [isExistsRecord, setIsExistsRecord] = useState(false);

    useEffect(() => {
      // Default value initialization
      setValue('rLab', loginStore.login.lab);
      setValue('pLab', testMasterStore.testMaster?.pLab);
      setValue('status', testMasterStore.testMaster?.status);
      setValue('department', testMasterStore.testMaster?.department);
      setValue('testCode', testMasterStore.testMaster?.testCode);
      setValue('testName', testMasterStore.testMaster?.testName);
      // setValue('environment', testMasterStore.testMaster?.environment);
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testMasterStore.testMaster]);

    const onSubmitTestMaster = async () => {
      if (!isExistsRecord) {
        if (
          !testMasterStore.testMaster?.existsVersionId &&
          !testMasterStore.testMaster?.existsRecordId
        ) {
          testMasterStore.testMasterService
            .addTestMaster({
              input: isImport
                ? { isImport, arrImportRecords }
                : {
                    isImport,
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
                setArrImportRecords([]);
                setIsImport(false);
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
                isImport: false,
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
          setIsVersionUpgrade(false);
        } else if (
          !testMasterStore.testMaster?.existsVersionId &&
          testMasterStore.testMaster?.existsRecordId
        ) {
          const isExits = await checkExistsRecords();
          if (!isExits) {
            testMasterStore.testMasterService
              .duplicateTestMaster({
                input: {
                  ...testMasterStore.testMaster,
                  isImport: false,
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
        }
        setIsInputView(false);
        reset();
        resetTestMaster();
      } else {
        Toast.warning({
          message: '😔 Duplicate record found',
        });
      }
    };

    const onUpdateSingleField = payload => {
      testMasterStore.testMasterService
        .updateFileds({
          input: {
            ...payload,
          },
        })
        .then((res: any) => {
          if (res.updateTestMaster.success) {
            Toast.success({
              message: `😊 ${res.updateTestMaster.message}`,
            });
            if (global?.filter?.mode == 'pagination')
              testMasterStore.fetchTestMaster(
                global?.filter?.page,
                global?.filter?.limit,
              );
            else if (global?.filter?.mode == 'filter')
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
              type: 'UpdateFileds',
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
            testMasterStore.fetchTestMaster(page, limit);
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            testMasterStore.testMasterService.filter({
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
                body: 'Update Test Master!',
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
      [testMasterStore.listTestMaster],
    );

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
        const data: Array<any> = XLSX.utils.sheet_to_json(ws, { raw: true });
        const list = data.map((item: any, index: number) => {
          return {
            rLab: item?.RLab,
            pLab: item.PLab,
            department: item.Department,
            section: undefined,
            testCode: item['Test Code'],
            testName: item['Test Name'],
            description: item.Description,
            method: item.Method === 'Yes' ? true : false,
            shortName: item['Short Name'],
            price: item.Price,
            bill: item.Bill === 'Yes' ? true : false,
            schedule: item.Schedule,
            validationLevel: item['Validation Level'],
            processing: item.Processing,
            sampleRunOn: item['Sample Run On'],
            workflow: item.Workflow,
            disease: item.Disease,
            category: item.Category,
            testType: item['Test Type'],
            workflowCode: item['Workflow Code'],
            cptCode: item['CPT Code'],
            autoFinish: item['Auto Submit'] === 'Yes' ? true : false,
            holdOOS: item['Hold OOS'] === 'Yes' ? true : false,
            confidential: item.Confidential === 'Yes' ? true : false,
            urgent: item.Urgent === 'Yes' ? true : false,
            testMethodCode: item['Test Method Code'],
            testMethodName: item['Test Method Name'],
            accredited: item.Accredited === 'Yes' ? true : false,
            abnFlag: item['Abn Flag'] === 'Yes' ? true : false,
            cretical: item.Cretical === 'Yes' ? true : false,
            repitation: item.Repitation === 'Yes' ? true : false,
            printLabel: item['Print Label'] === 'Yes' ? true : false,
            cumulative: item.Cumulative === 'Yes' ? true : false,
            labelInstruction: item['Label Instruction'],
            qcHold: item['QC Hold'] === 'Yes' ? true : false,
            deltaHold: item['Delta Hold'] === 'Yes' ? true : false,
            prefix: item.Prefix,
            sufix: item.Sufix,
            speicalInstructions: item['Speical Instructions'],
            allowPartial: item['Allow Partial'] === 'Yes' ? true : false,
            internalComments: item['Internal Comments'],
            externalComments: item['External Comments'],
            testBottomMarker: undefined,
            testRightMarker: item['Test Right Marker'],
            enteredBy: loginStore.login?.userId,
            dateCreation: new Date(),
            dateActive: new Date(),
            dateExpire: new Date(
              dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD hh:mm:ss'),
            ),
            interpretation: item.Interpretation,
            testResultDate: item['Test Result Date'],
            version: Number.parseInt(item?.Version || 1),
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
      fields: any = testMasterStore.testMaster,
      isSingleCheck = false,
    ) => {
      const requiredFields = [
        'rLab',
        'pLab',
        'department',
        'departmentName', // report for required
        'testCode',
        'testName',
        'status',
      ];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields }[item])) return item;
      });
      if (isEmpty && !isSingleCheck) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      return testMasterStore.testMasterService
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
          if (res.findByFieldsTestMaster?.success) {
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
              show={isInputView}
              onClick={() => setIsInputView(!isInputView)}
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
                <Grid cols={3}>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='RLab'
                          hasError={!!errors.rLab}
                        >
                          <select
                            value={value}
                            disabled={
                              isVersionUpgrade
                                ? true
                                : loginStore.login &&
                                  loginStore.login.role !== 'ADMINISTRATOR'
                                ? true
                                : false
                            }
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.rLab ? 'border-red' : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const rLab = e.target.value as string;
                              onChange(rLab);
                              testMasterStore.updateTestMaster({
                                ...testMasterStore.testMaster,
                                rLab,
                              });
                            }}
                          >
                            <option>Select</option>
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
                      rules={{ required: true }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='PLab'
                          hasError={!!errors.pLab}
                        >
                          <AutoCompleteFilterSingleSelect
                            loader={loading}
                            placeholder='Search by name'
                            disable={
                              isVersionUpgrade
                                ? true
                                : loginStore.login &&
                                  loginStore.login.role !== 'ADMINISTRATOR'
                                ? true
                                : false
                            }
                            displayValue={value}
                            data={{
                              list: labStore.listLabs?.filter(
                                item => item.status == 'A',
                              ),
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
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label={'Department'}
                          hasError={!!errors.department}
                        >
                          <AutoCompleteFilterSingleSelectDepartment
                            lab={testMasterStore.testMaster?.pLab}
                            hasError={!!errors.department}
                            displayValue={value}
                            disable={isVersionUpgrade}
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
                              testMasterStore.findSectionListByDeptCode(
                                item.code,
                              );
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='department'
                      rules={{ required: true }}
                      defaultValue=''
                    />

                    {testMasterStore.sectionListByDeptCode && (
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.InputWrapper
                            label='Section'
                            hasError={!!errors.section}
                          >
                            <select
                              value={value}
                              disabled={isVersionUpgrade}
                              className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                errors.section
                                  ? 'border-red  '
                                  : 'border-gray-300'
                              } rounded-md`}
                              onChange={e => {
                                const section = JSON.parse(
                                  e.target.value,
                                ) as any;

                                onChange(section);
                                testMasterStore.updateTestMaster({
                                  ...testMasterStore.testMaster,
                                  section,
                                });
                              }}
                            >
                              <option>Select</option>
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
                        rules={{ required: false }}
                        defaultValue=''
                      />
                    )}
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Test Code'
                          disabled={isVersionUpgrade}
                          placeholder={
                            errors.testCode
                              ? 'Please Enter testCode'
                              : 'Test Code'
                          }
                          hasError={!!errors.testCode}
                          value={value}
                          onChange={testCode => {
                            onChange(testCode);
                            testMasterStore.updateTestMaster({
                              ...testMasterStore.testMaster,
                              testCode: testCode?.toUpperCase(),
                            });
                          }}
                          onBlur={testCode => {
                            if (!testMasterStore.testMaster?.existsVersionId) {
                              checkExistsRecords(
                                {
                                  testCode: testCode?.toUpperCase(),
                                },
                                true,
                              );

                              testMasterStore.testMasterService
                                .findByFields({
                                  input: { filter: { testCode } },
                                })
                                .then((res: any) => {
                                  if (res.findByFieldsTestMaster.success) {
                                    testMasterStore.updateTestMaster({
                                      ...testMasterStore.testMaster,
                                      testName:
                                        res.findByFieldsTestMaster.data
                                          ?.length > 0
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
                          label='Test  Name'
                          placeholder={
                            errors.testName
                              ? 'Please Enter testName'
                              : 'Test Name'
                          }
                          hasError={!!errors.testName}
                          disabled={isVersionUpgrade}
                          value={value}
                          onChange={testName => {
                            onChange(testName);
                            testMasterStore.updateTestMaster({
                              ...testMasterStore.testMaster,
                              testName: testName?.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='testName'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Schedule'
                          hasError={!!errors.schedule}
                        >
                          <AutoCompleteFilterMultiKeySingleSelect
                            loader={loading}
                            placeholder='Search by code'
                            data={{
                              list: deliveryScheduleStore.listDeliverySchedule,
                              displayKey: ['schCode', 'schName'],
                              findKey: 'schCode',
                            }}
                            displayValue={value}
                            hasError={!!errors.schCode}
                            onFilter={(value: string) => {
                              deliveryScheduleStore.deliveryScheduleService.filter(
                                {
                                  input: {
                                    type: 'filter',
                                    filter: {
                                      schCode: value,
                                    },
                                    page: 0,
                                    limit: 10,
                                  },
                                },
                              );
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Validation Level'
                          hasError={!!errors.validationLevel}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.validationLevel
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const validationLevel: any = (e.target.value ||
                                0) as number;
                              onChange(validationLevel);
                              testMasterStore.updateTestMaster({
                                ...testMasterStore.testMaster,
                                validationLevel:
                                  Number.parseInt(validationLevel),
                              });
                            }}
                          >
                            <option>Select</option>
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Processing'
                          hasError={!!errors.processing}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.processing
                                ? 'border-red  '
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
                            <option>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'PROCESSING',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='processing'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Grid cols={5}>
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
                              testMasterStore.updateTestMaster({
                                ...testMasterStore.testMaster,
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
                            label='Auto Submit'
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
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
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
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
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
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
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
                        rules={{ required: false }}
                        defaultValue=''
                      />
                    </Grid>
                  </List>

                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Sample Run On'
                          hasError={!!errors.sampleRunOn}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.sampleRunOn
                                ? 'border-red  '
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
                            <option>Select</option>
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Workflow'
                          hasError={!!errors.workflow}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.workflow
                                ? 'border-red  '
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
                            <option>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'WORKFLOW',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='workflow'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                                speicalInstructions?.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='speicalInstructions'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                            <option>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'DISEASE',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='disease'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                            <option>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'CATEGORY',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='category'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Test Type'
                          hasError={!!errors.testType}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.testType
                                ? 'border-red  '
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
                            <option>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'TEST_TYPE',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='testType'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Workflow Code'
                          hasError={!!errors.workflowCode}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.workflowCode
                                ? 'border-red  '
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
                            <option>Select</option>
                            {['Workflow Code 1'].map(
                              (item: any, index: number) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ),
                            )}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='workflowCode'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                              cptCode: cptCode?.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='cptCode'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Prefix'
                          hasError={!!errors.prefix}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.prefix ? 'border-red  ' : 'border-gray-300'
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
                            <option>Select</option>
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
                      rules={{ required: false }}
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
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Sufix'
                          hasError={!!errors.sufix}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.sufix ? 'border-red  ' : 'border-gray-300'
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
                            <option>Select</option>
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
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Grid cols={5}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
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
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
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
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
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
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
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
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
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
                        rules={{ required: false }}
                        defaultValue=''
                      />
                    </Grid>
                  </List>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                      render={({ field: { onChange, value } }) => (
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
                      render={({ field: { onChange, value } }) => (
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
                      render={({ field: { onChange, value } }) => (
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
                              testMasterStore.updateTestMaster({
                                ...testMasterStore.testMaster,
                                status,
                              });
                            }}
                          >
                            <option>Select</option>
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
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                              ? 'Please Enter dateCreation'
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
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <List direction='row'>
                      <Grid cols={5}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
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
                                    : testMasterStore.testMaster
                                        ?.testMethodCode,
                                  testMethodName: !method
                                    ? ''
                                    : testMasterStore.testMaster
                                        ?.testMethodName,
                                });
                              }}
                            />
                          )}
                          name='method'
                          rules={{ required: false }}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
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
                          rules={{ required: false }}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
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
                          rules={{ required: false }}
                          defaultValue=''
                        />

                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
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
                          rules={{ required: false }}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
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
                          rules={{ required: false }}
                          defaultValue=''
                        />
                      </Grid>
                    </List>
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
              setModalConfirm({ show: false });
              switch (action) {
                case 'Delete': {
                  testMasterStore.testMasterService
                    .deleteTestMaster({ input: { id: modalConfirm.id } })
                    .then((res: any) => {
                      if (res.removeTestMaster.success) {
                        Toast.success({
                          message: `😊 ${res.removeTestMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          testMasterStore.fetchTestMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
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
                  onUpdateSingleField({
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
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
                        Toast.success({
                          message: `😊 ${res.updateTestMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          testMasterStore.fetchTestMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
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
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
                    ),
                  });
                  setIsInputView(true);
                  setIsVersionUpgrade(true);
                  break;
                }
                case 'duplicate': {
                  testMasterStore.updateTestMaster({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: 1,
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
                    ),
                  });
                  setIsInputView(true);
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

export default TestMater;
