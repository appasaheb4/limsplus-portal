import React, { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  AutoCompleteFilterSingleSelect,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Svg,
  ModalConfirm,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  MainPageHeading,
} from '@/library/components';
import { lookupItems, lookupValue } from '@/library/utils';
import { MasterAnalyteList } from '../components';
import { useForm, Controller } from 'react-hook-form';
import { MasterAnalyteHoc } from '../hoc';
import { useStores } from '@/stores';
import { FormHelper } from '@/helper';
import { InputResult } from '@/core-components';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { resetMasterAnalyte } from '../startup';
import * as XLSX from 'xlsx';
import _ from 'lodash';
import dayjs from 'dayjs';

const MasterAnalyte = MasterAnalyteHoc(
  observer(() => {
    const {
      loginStore,
      masterAnalyteStore,
      methodsStore,
      labStore,
      routerStore,
      loading,
      departmentStore,
      libraryStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
      clearErrors,
    } = useForm();

    useEffect(() => {
      // Default value initialization
      setValue('lab', loginStore.login.lab);
      setValue('analyteCode', masterAnalyteStore.masterAnalyte?.analyteCode);
      setValue('analyteName', masterAnalyteStore.masterAnalyte?.analyteName);
      // setValue('environment', masterAnalyteStore.masterAnalyte?.environment);
      setValue('status', masterAnalyteStore.masterAnalyte?.status);
      setValue('resultType', masterAnalyteStore.masterAnalyte?.resultType);
      setValue('reportable', masterAnalyteStore.masterAnalyte?.reportable);
      setValue('analyteType', masterAnalyteStore.masterAnalyte?.analyteType);
      setValue('usage', masterAnalyteStore.masterAnalyte?.usage);
      setValue('dateExpire', masterAnalyteStore.masterAnalyte?.dateExpire);
      setValue('version', masterAnalyteStore.masterAnalyte?.version);
      setValue('dateCreation', masterAnalyteStore.masterAnalyte?.dateCreation);
      setValue('dateActive', masterAnalyteStore.masterAnalyte?.dateActive);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [masterAnalyteStore.masterAnalyte]);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);
    const [modalDetailsDateRange, setModalDateRange] = useState<any>();
    const [isExistsRecord, setIsExistsRecord] = useState(false);

    const onSubmitMasterAnalyte = async () => {
      if (!isExistsRecord) {
        if (
          !masterAnalyteStore.masterAnalyte?.existsVersionId &&
          !masterAnalyteStore.masterAnalyte?.existsRecordId
        ) {
          masterAnalyteStore.masterAnalyteService
            .addAnalyteMaster({
              input: isImport
                ? {
                    isImport,
                    arrImportRecords,
                  }
                : {
                    isImport,
                    ...masterAnalyteStore.masterAnalyte,
                    enteredBy: loginStore.login.userId,
                  },
            })
            .then(res => {
              if (res.createAnalyteMaster.success) {
                Toast.success({
                  message: `😊 ${res.createAnalyteMaster.message}`,
                });
                setArrImportRecords([]);
                setIsImport(false);
              }
            });
        } else if (
          masterAnalyteStore.masterAnalyte?.existsVersionId &&
          !masterAnalyteStore.masterAnalyte?.existsRecordId
        ) {
          masterAnalyteStore.masterAnalyteService
            .versionUpgradeAnalyteMaster({
              input: {
                ...masterAnalyteStore.masterAnalyte,
                enteredBy: loginStore.login.userId,
                isImport: false,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.versionUpgradeAnalyteMaster.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradeAnalyteMaster.message}`,
                });
              }
            });
          setIsVersionUpgrade(false);
        } else if (
          !masterAnalyteStore.masterAnalyte?.existsVersionId &&
          masterAnalyteStore.masterAnalyte?.existsRecordId
        ) {
          const isExists = await checkExistsRecords();
          if (!isExists) {
            masterAnalyteStore.masterAnalyteService
              .duplicateAnalyteMaster({
                input: {
                  ...masterAnalyteStore.masterAnalyte,
                  isImport: false,
                  enteredBy: loginStore.login.userId,
                  __typename: undefined,
                },
              })
              .then(res => {
                if (res.duplicateAnalyteMaster.success) {
                  Toast.success({
                    message: `😊 ${res.duplicateAnalyteMaster.message}`,
                  });
                }
              });
          }
        }
        setIsInputView(false);
        reset();
        resetMasterAnalyte();
      } else {
        Toast.warning({
          message: '😔 Duplicate record found',
        });
      }
    };

    const onUpdateSingleField = payload => {
      masterAnalyteStore.masterAnalyteService
        .updateSingleFiled({
          input: {
            ...payload,
          },
        })
        .then((res: any) => {
          if (res.updateAnalyteMaster.success) {
            Toast.success({
              message: `😊 ${res.updateAnalyteMaster.message}`,
            });
            if (global?.filter?.mode == 'pagination')
              masterAnalyteStore.fetchAnalyteMaster(
                global?.filter?.page,
                global?.filter?.limit,
              );
            else if (global?.filter?.mode == 'filter')
              masterAnalyteStore.masterAnalyteService.filter({
                input: {
                  type: global?.filter?.type,
                  filter: global?.filter?.filter,
                  page: global?.filter?.page,
                  limit: global?.filter?.limit,
                },
              });
            else masterAnalyteStore.fetchAnalyteMaster();
          }
        });
    };

    const tableView = useMemo(
      () => (
        <MasterAnalyteList
          data={masterAnalyteStore.listMasterAnalyte || []}
          totalSize={masterAnalyteStore.listMasterAnalyteCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listLabs: labStore.listLabs,
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
            masterAnalyteStore.fetchAnalyteMaster(page, limit);
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            masterAnalyteStore.masterAnalyteService.filter({
              input: { type, filter, page, limit },
            });
            global.filter = { mode: 'filter', type, filter, page, limit };
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
                body: 'Update Master Analyte!',
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
      [masterAnalyteStore.listMasterAnalyte],
    );

    const defaultResult = useMemo(
      () => (
        <InputResult
          label='Default Result'
          row={{
            resultType: masterAnalyteStore.masterAnalyte?.resultType,
            picture: masterAnalyteStore.masterAnalyte?.picture,
            analyteCode: masterAnalyteStore.masterAnalyte?.analyteCode,
            pLab: masterAnalyteStore.masterAnalyte?.lab,
            departement: masterAnalyteStore.masterAnalyte?.departments,
          }}
          onSelect={item => {
            masterAnalyteStore.updateMasterAnalyte({
              ...masterAnalyteStore.masterAnalyte,
              defaultResult: item?.result || '',
              numeric: item?.numeric,
              alpha: item?.alpha,
              abnFlag: item?.abnFlag,
              critical: item?.critical,
            });
          }}
          onError={error => {
            Toast.error({
              message: `😊 ${error}`,
            });
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [masterAnalyteStore.masterAnalyte?.resultType],
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
        const data = XLSX.utils.sheet_to_json(ws, { raw: true });
        const list = data.map((item: any) => {
          return {
            lab: item?.Lab,
            analyteCode: item['Analyte Code'],
            analyteName: item['Analyte Name'],
            description: item?.Description,
            method: item.Method === 'Yes' ? true : false,
            analyteMethodCode: item['Analyte Method Code'],
            analyteMethodName: item['Analyte Method Name'],
            shortName: item['Short Name'],
            price: item.Price,
            bill: item.Bill === 'Yes' ? true : false,
            rangeSetOn: item['Range Set On'],
            reportable: item.Reportable === 'Yes' ? true : false,
            departments: item.Departments,
            resultType: item['Result Type'],
            defaultResult: item['Default Result'],
            calculationFlag: item['Calculation Flag'] === 'Yes' ? true : false,
            analyteType: item['Analyte Type'],
            units: item.Units,
            usage: item.Usage,
            picture: item.picture,
            repetition: item.Repetition === 'Yes' ? true : false,
            instantResult: item['Instant Result'] === 'Yes' ? true : false,
            calcyName: item['Calculation Name'],
            cptCode: item['CPT Code'],
            internalComments: item['Internal Comments'],
            externalComments: item['External Comments'],
            analyteBottomMarker: '',
            analyteRightMarker: item['Analyte Right Marker'],
            reagentCode: item['Reagent Code'],
            abnormalHighlighterCSS: item['Abnormal Highlighter CSS'],
            criticalHighlighterCSS: item['Critical Highlighter CSS'],
            enteredBy: loginStore.login?.userId,
            dateCreation: new Date(),
            dateActive: new Date(),
            dateExpire: new Date(
              dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
            ),
            version: 1,
            maxReportable: item['Max Reportable'],
            interpretation: item.Interpretation,
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
      fields: any = masterAnalyteStore.masterAnalyte,
      isSingleCheck = false,
    ) => {
      const requiredFields = ['lab', 'analyteCode', 'status'];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields }[item])) return item;
      });
      if (isEmpty && !isSingleCheck) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      return masterAnalyteStore.masterAnalyteService
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
          if (res.findByFieldsAnalyteMaster?.success) {
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
                        <Form.InputWrapper label='Lab' hasError={!!errors.lab}>
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
                            data={{
                              list: labStore.listLabs?.filter(
                                item => item.status == 'A',
                              ),
                              displayKey: 'name',
                              findKey: 'name',
                            }}
                            displayValue={masterAnalyteStore.masterAnalyte?.lab}
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
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                lab: item.code,
                              });
                              labStore.updateLabList(labStore.listLabsCopy);
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
                        <Form.Input
                          label='Analyte Code'
                          name='txtAnalyteCode'
                          hasError={!!errors.analyteCode}
                          disabled={isVersionUpgrade}
                          placeholder={
                            errors.analyteCode
                              ? 'Please Enter Analyte Code'
                              : 'Analyte Code'
                          }
                          value={value}
                          onChange={analyteCode => {
                            onChange(analyteCode);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
                              analyteCode: analyteCode.toUpperCase(),
                            });
                          }}
                          onBlur={analyteCode => {
                            if (
                              !masterAnalyteStore.masterAnalyte?.existsVersionId
                            ) {
                              checkExistsRecords(
                                {
                                  analyteCode,
                                },
                                true,
                              );

                              masterAnalyteStore.masterAnalyteService
                                .findByFields({
                                  input: { filter: { analyteCode } },
                                })
                                .then((res: any) => {
                                  if (res.findByFieldsAnalyteMaster.success) {
                                    masterAnalyteStore.updateMasterAnalyte({
                                      ...masterAnalyteStore.masterAnalyte,
                                      analyteName:
                                        res.findByFieldsAnalyteMaster.data
                                          ?.length > 0
                                          ? res.findByFieldsAnalyteMaster
                                              .data[0]?.analyteName
                                          : undefined,
                                    });
                                    masterAnalyteStore.updateMasterAnalyteActivity(
                                      {
                                        ...masterAnalyteStore.masterAnalyteActivity,
                                        disableAnalyteName: true,
                                      },
                                    );
                                  } else {
                                    masterAnalyteStore.updateMasterAnalyte({
                                      ...masterAnalyteStore.masterAnalyte,
                                      analyteName: '',
                                    });
                                    masterAnalyteStore.updateMasterAnalyteActivity(
                                      {
                                        ...masterAnalyteStore.masterAnalyteActivity,
                                        disableAnalyteName: false,
                                      },
                                    );
                                  }
                                });
                            }
                          }}
                        />
                      )}
                      name='analyteCode'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    {masterAnalyteStore.checkExitsLabEnvCode && (
                      <span className='text-red-600 font-medium relative'>
                        Code already exits. Please use other code.
                      </span>
                    )}
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Analyte Name'
                          name='txtAnalyteName'
                          placeholder='Analyte Name'
                          hasError={!!errors.analyteName}
                          value={value}
                          disabled={
                            masterAnalyteStore.masterAnalyteActivity
                              ?.disableAnalyteName
                          }
                          onChange={analyteName => {
                            onChange(analyteName);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
                              analyteName: analyteName.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='analyteName'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.MultilineInput
                          rows={3}
                          label='Description'
                          name='txtDescription'
                          placeholder={
                            errors.description
                              ? 'Please Enter Description '
                              : 'Description'
                          }
                          hasError={!!errors.description}
                          value={value}
                          onChange={description => {
                            onChange(description);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
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
                        <Form.InputWrapper
                          label='Analyte Method'
                          hasError={!!errors.analyteMethod}
                        >
                          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                            loader={loading}
                            placeholder='Search by code or name'
                            data={{
                              list: methodsStore.listMethods?.filter(
                                item => item.status == 'A',
                              ),
                              displayKey: ['methodsCode', 'methodsName'],
                            }}
                            disable={!masterAnalyteStore.masterAnalyte?.method}
                            displayValue={value}
                            hasError={!!errors.analyteMethod}
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
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                analyteMethodCode: item.methodsCode,
                                analyteMethodName: item.methodsName,
                              });
                              methodsStore.updateMethodsList(
                                methodsStore.listMethodsCopy,
                              );
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='analyteMethod'
                      rules={{
                        required: masterAnalyteStore.masterAnalyte?.method
                          ? true
                          : false,
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Short Name'
                          name='txtShortName'
                          placeholder={
                            errors.shortName
                              ? 'Please Enter Short Name'
                              : 'Short Name'
                          }
                          hasError={!!errors.shortName}
                          value={value}
                          onChange={shortName => {
                            onChange(shortName);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
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
                          name='txtPrice'
                          placeholder={
                            errors.price ? 'Please Enter Price' : 'Price'
                          }
                          type='number'
                          hasError={!!errors.price}
                          value={value}
                          onChange={price => {
                            onChange(price);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
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
                        <Form.InputWrapper label='Range Set On'>
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.rangeSetOn
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const rangeSetOn = e.target.value as string;
                              onChange(rangeSetOn);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                rangeSetOn,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'RANGE_SET_ON',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='rangeSetOn'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper label='Department'>
                          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                            loader={loading}
                            placeholder='Search by code or name'
                            hasError={!!errors.department}
                            data={{
                              list: departmentStore?.listDepartment.filter(
                                item =>
                                  item.lab ===
                                  masterAnalyteStore.masterAnalyte?.lab,
                              ),
                              displayKey: ['code', 'name'],
                            }}
                            displayValue={value}
                            onFilter={(value: string) => {
                              departmentStore.DepartmentService.filterByFields({
                                input: {
                                  filter: {
                                    fields: ['code', 'name'],
                                    srText: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              });
                            }}
                            onSelect={item => {
                              onChange(item.code);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                departments: item.code,
                              });
                              departmentStore.updateDepartmentList(
                                departmentStore.listDepartmentCopy,
                              );
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='department'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Result Type'
                          hasError={!!errors.resultType}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.resultType
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const resultType = e.target.value;
                              onChange(resultType);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                resultType,
                                picture:
                                  resultType !== 'V'
                                    ? undefined
                                    : masterAnalyteStore.masterAnalyte?.picture,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'RESULT_TYPE',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='resultType'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Picture'
                          id='optionPicture'
                          hasError={!!errors.picture}
                        >
                          <select
                            value={value}
                            disabled={
                              masterAnalyteStore.masterAnalyte?.resultType ===
                              'V'
                                ? false
                                : true
                            }
                            name='optionPicture'
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.picture
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const picture = e.target.value;
                              onChange(picture);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                picture: Number.parseInt(picture),
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {['0', '1', '2', '3', '4'].map(
                              (item: any, index: number) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ),
                            )}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='picture'
                      rules={{
                        required:
                          masterAnalyteStore.masterAnalyte?.resultType === 'V'
                            ? true
                            : false,
                      }}
                      defaultValue=''
                    />

                    <Grid cols={4}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Method'
                            id='modeMethod'
                            hasError={!!errors.method}
                            value={value}
                            onChange={method => {
                              onChange(method);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                method,
                                analyteCode: !method
                                  ? ''
                                  : masterAnalyteStore.masterAnalyte
                                      ?.analyteCode,
                                analyteName: !method
                                  ? ''
                                  : masterAnalyteStore.masterAnalyte
                                      ?.analyteName,
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
                            label='Bill'
                            id='modeBill'
                            hasError={!!errors.bill}
                            value={value}
                            onChange={bill => {
                              onChange(bill);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
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
                            label='Reportable'
                            id='modeDisplay'
                            hasError={!!errors.reportable}
                            value={value}
                            onChange={reportable => {
                              onChange(reportable);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                reportable,
                              });
                            }}
                          />
                        )}
                        name='reportable'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Calculation Flag'
                            id='modeCalculationFlag'
                            hasError={!!errors.calculationFlag}
                            value={value}
                            onChange={calculationFlag => {
                              onChange(calculationFlag);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                calculationFlag,
                                calcyName: !calculationFlag
                                  ? ''
                                  : masterAnalyteStore.masterAnalyte?.calcyName,
                              });
                            }}
                          />
                        )}
                        name='calculationFlag'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                    </Grid>
                  </List>

                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <>{defaultResult}</>
                      )}
                      name='defaultResult'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Analyte Type'
                          hasError={!!errors.analyteType}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.analyteType
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const analyteType = e.target.value;
                              onChange(analyteType);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                analyteType,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'ANALYTE_TYPE',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='analyteType'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Units'
                          hasError={!!errors.units}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.units ? 'border-red  ' : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const units = e.target.value as string;
                              onChange(units);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                units,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(routerStore.lookupItems, 'UNITS').map(
                              (item: any, index: number) => (
                                <option key={index} value={item.code}>
                                  {lookupValue(item)}
                                </option>
                              ),
                            )}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='units'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Usage'
                          hasError={!!errors.usage}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.usage ? 'border-red  ' : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const usage = e.target.value;
                              onChange(usage);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                usage,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(routerStore.lookupItems, 'USAGE').map(
                              (item: any, index: number) => (
                                <option key={index} value={item.code}>
                                  {lookupValue(item)}
                                </option>
                              ),
                            )}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='usage'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Calcy Name'
                          name='txtCalcyName'
                          placeholder={
                            errors.calcyName
                              ? 'Please Enter Calcy Name'
                              : 'Calcy Name'
                          }
                          disabled={
                            !masterAnalyteStore.masterAnalyte?.calculationFlag
                          }
                          hasError={!!errors.calcyName}
                          value={value}
                          onChange={calcyName => {
                            onChange(calcyName);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
                              calcyName: calcyName.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='calcyName'
                      rules={{
                        required: masterAnalyteStore.masterAnalyte
                          ?.calculationFlag
                          ? true
                          : false,
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='CPT Code'
                          name='txtCPTCode'
                          placeholder={
                            errors.cptCode
                              ? 'Please Enter CPT Code'
                              : 'CPT Code'
                          }
                          hasError={!!errors.cptCode}
                          value={value}
                          onChange={cptCode => {
                            onChange(cptCode);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
                              cptCode: cptCode.toUpperCase(),
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
                        <Form.MultilineInput
                          rows={2}
                          label='Internal Comments'
                          placeholder='Internal Comments'
                          hasError={!!errors.internalComments}
                          value={value}
                          onChange={internalComments => {
                            onChange(internalComments);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
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
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
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
                          label='Analyte Bottom Marker'
                          hasError={!!errors.analyteBottomMarker}
                        >
                          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                            loader={loading}
                            placeholder='Search by code or details'
                            data={{
                              list: libraryStore.listLibrary,
                              displayKey: ['code', 'details'],
                            }}
                            displayValue={value}
                            hasError={!!errors.analyteBottomMarker}
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
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                analyteBottomMarker: {
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
                      name='analyteBottomMarker'
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
                          label='Analyte Right Marker'
                          placeholder='Analyte Right Marker'
                          hasError={!!errors.analyteRightMarker}
                          value={value}
                          onChange={analyteRightMarker => {
                            onChange(analyteRightMarker);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
                              analyteRightMarker,
                            });
                          }}
                        />
                      )}
                      name='analyteRightMarker'
                      rules={{
                        required: false,
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Reagent Code'
                          placeholder='Reagent Code'
                          hasError={!!errors.reagentCode}
                          value={value}
                          onChange={reagentCode => {
                            onChange(reagentCode);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
                              reagentCode,
                            });
                          }}
                        />
                      )}
                      name='eqChannel'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Grid cols={3}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='InstantResult'
                            id='modeInstantResult'
                            hasError={!!errors.instantResult}
                            value={value}
                            onChange={instantResult => {
                              onChange(instantResult);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                instantResult,
                              });
                            }}
                          />
                        )}
                        name='instantResult'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Repitation'
                            id='modeRepitation'
                            hasError={!!errors.repetition}
                            value={value}
                            onChange={repetition => {
                              onChange(repetition);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                repetition,
                              });
                            }}
                          />
                        )}
                        name='repetition'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                    </Grid>
                  </List>
                  <List direction='col' space={4} justify='stretch' fill>
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
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
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
                      render={() => (
                        <Form.MultilineInput
                          label='Abnormal Highlighter CSS'
                          style={{
                            color: '#ffffff',
                            backgroundColor: '#000000',
                          }}
                          placeholder={
                            "Like fontSize: 12,backgroundColor:'#000000'"
                          }
                          // value={value}
                          onChange={abnormalHighlighterCSS => {
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
                              abnormalHighlighterCSS,
                            });
                          }}
                        />
                      )}
                      name='abnormalHighlighterCSS'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={() => (
                        <Form.MultilineInput
                          label='Critical Highlighter CSS'
                          style={{
                            color: '#ffffff',
                            backgroundColor: '#000000',
                          }}
                          placeholder={
                            "Like fontSize: 12,backgroundColor:'#000000'"
                          }
                          // value={value}
                          onChange={criticalHighlighterCSS => {
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
                              criticalHighlighterCSS,
                            });
                          }}
                        />
                      )}
                      name='criticalHighlighterCSS'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Entered By'
                          placeholder={
                            errors.userId
                              ? 'Please Enter Entered By'
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
                              ? 'Please Enter Date Creation'
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
                              ? 'Please Enter Date Active'
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
                              ? 'Please Enter schedule'
                              : 'Date Expire'
                          }
                          hasError={!!errors.dateExpire}
                          value={value}
                          minDate={new Date()}
                          onChange={dateExpire => {
                            onChange(dateExpire);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
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
                            errors.version ? 'Please Enter Version' : 'Version'
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
                        <Form.Input
                          label='Min Reportable'
                          placeholder='Min reportable'
                          hasError={!!errors.minReportable}
                          value={value}
                          onChange={minReportable => {
                            const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/);
                            if (regex.test(minReportable)) {
                              onChange(minReportable);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                minReportable,
                              });
                            } else {
                              Toast.warning({
                                message:
                                  '😔 Only > and < sign and numbers should be allowed',
                              });
                            }
                          }}
                        />
                      )}
                      name='minReportable'
                      rules={{
                        pattern: /^[0-9<>=\\-`.+,/"]*$/,
                        validate: value => FormHelper.isNumberAvailable(value),
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Max Reportable'
                          placeholder='Max reportable'
                          hasError={!!errors.maxReportable}
                          value={value}
                          onChange={maxReportable => {
                            const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/);
                            if (regex.test(maxReportable)) {
                              onChange(maxReportable);
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
                                maxReportable,
                              });
                            } else {
                              Toast.warning({
                                message:
                                  '😔 Only > and < sign and numbers should be allowed',
                              });
                            }
                          }}
                        />
                      )}
                      name='maxReportable'
                      rules={{
                        pattern: /^[0-9<>=\\-`.+,/"]*$/,
                        validate: value => FormHelper.isNumberAvailable(value),
                      }}
                      defaultValue=''
                    />
                    {/* <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <AutoCompleteCompanyList
                          hasError={!!errors.companyCode}
                          onSelect={companyCode => {
                            onChange(companyCode);
                            masterAnalyteStore.updateMasterAnalyte({
                              ...masterAnalyteStore.masterAnalyte,
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
                              masterAnalyteStore.updateMasterAnalyte({
                                ...masterAnalyteStore.masterAnalyte,
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
                      rules={{ required: true }}
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
                onClick={handleSubmit(onSubmitMasterAnalyte)}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size='medium'
                type='outline'
                icon={Svg.Remove}
                onClick={() => {
                  //rootStore.labStore.clear();
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
                  masterAnalyteStore.masterAnalyteService
                    .deleteAnalyteMaster({ input: { id: modalConfirm.id } })
                    .then(res => {
                      if (res.removeAnalyteMaster.success) {
                        Toast.success({
                          message: `😊 ${res.removeAnalyteMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          masterAnalyteStore.fetchAnalyteMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          masterAnalyteStore.masterAnalyteService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else masterAnalyteStore.fetchAnalyteMaster();
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
                  masterAnalyteStore.masterAnalyteService
                    .updateSingleFiled({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateAnalyteMaster.success) {
                        Toast.success({
                          message: `😊 ${res.updateAnalyteMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          masterAnalyteStore.fetchAnalyteMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          masterAnalyteStore.masterAnalyteService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else masterAnalyteStore.fetchAnalyteMaster();
                      }
                    });

                  break;
                }
                case 'versionUpgrade': {
                  masterAnalyteStore.updateMasterAnalyte({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    resultType: undefined, // input-result error coming
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
                  masterAnalyteStore.updateMasterAnalyte({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    resultType: undefined, // input-result error coming
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

export default MasterAnalyte;
