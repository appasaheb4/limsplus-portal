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
  AutoCompleteFilterSingleSelect,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Svg,
  ModalConfirm,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {MasterAnalyteList} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {MasterAnalyteHoc} from '../hoc';
import {useStores} from '@/stores';
import {FormHelper} from '@/helper';
import {InputResult} from '@/core-components';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetMasterAnalyte} from '../startup';

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
      interfaceManagerStore,
      libraryStore,
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
      clearErrors,
    } = useForm();

    setValue('lab', loginStore.login.lab);
    setValue('environment', masterAnalyteStore.masterAnalyte?.environment);
    setValue('status', masterAnalyteStore.masterAnalyte?.status);
    setValue('resultType', masterAnalyteStore.masterAnalyte?.resultType);
    setValue('reportable', masterAnalyteStore.masterAnalyte?.reportable);
    setValue('analyteType', masterAnalyteStore.masterAnalyte?.analyteType);
    setValue('usage', masterAnalyteStore.masterAnalyte?.usage);
    setValue('dateExpire', masterAnalyteStore.masterAnalyte?.dateExpire);
    setValue('version', masterAnalyteStore.masterAnalyte?.version);
    setValue('dateCreation', masterAnalyteStore.masterAnalyte?.dateCreation);
    setValue('dateActive', masterAnalyteStore.masterAnalyte?.dateActive);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(true);

    const onSubmitMasterAnalyte = () => {
      if (!masterAnalyteStore.checkExitsLabEnvCode) {
        if (
          !masterAnalyteStore.masterAnalyte?.existsVersionId &&
          !masterAnalyteStore.masterAnalyte?.existsRecordId
        ) {
          masterAnalyteStore.masterAnalyteService
            .addAnalyteMaster({
              input: {
                ...masterAnalyteStore.masterAnalyte,
                enteredBy: loginStore.login.userId,
              },
            })
            .then(res => {
              if (res.createAnalyteMaster.success) {
                Toast.success({
                  message: `😊 ${res.createAnalyteMaster.message}`,
                });
                setIsInputView(true);
                reset();
                resetMasterAnalyte();
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
        } else if (
          !masterAnalyteStore.masterAnalyte?.existsVersionId &&
          masterAnalyteStore.masterAnalyte?.existsRecordId
        ) {
          masterAnalyteStore.masterAnalyteService
            .duplicateAnalyteMaster({
              input: {
                ...masterAnalyteStore.masterAnalyte,
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
      } else {
        Toast.warning({
          message: '😔 Please enter diff code',
        });
      }
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
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
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
          onPageSizeChange={(page, limit) => {
            masterAnalyteStore.fetchAnalyteMaster(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            masterAnalyteStore.masterAnalyteService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {mode: 'filter', type, filter, page, limit};
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
                          if (
                            !masterAnalyteStore.masterAnalyte?.existsVersionId
                          ) {
                            masterAnalyteStore.masterAnalyteService
                              .checkExitsLabEnvCode({
                                input: {
                                  code: masterAnalyteStore.masterAnalyte
                                    ?.analyteCode,
                                  env: masterAnalyteStore.masterAnalyte
                                    ?.environment,
                                  lab: item.code,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkAnalyteMasterExistsRecord.success
                                ) {
                                  masterAnalyteStore.updateExistsLabEnvCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkAnalyteMasterExistsRecord.message}`,
                                  });
                                } else
                                  masterAnalyteStore.updateExistsLabEnvCode(
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
                    <Form.Input
                      label='Analyte Code'
                      name='txtAnalyteCode'
                      hasError={!!errors.analyteCode}
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
                      onBlur={code => {
                        if (
                          !masterAnalyteStore.masterAnalyte?.existsVersionId
                        ) {
                          masterAnalyteStore.masterAnalyteService
                            .checkExitsLabEnvCode({
                              input: {
                                code,
                                env: masterAnalyteStore.masterAnalyte
                                  ?.environment,
                                lab: masterAnalyteStore.masterAnalyte?.lab,
                              },
                            })
                            .then(res => {
                              if (res.checkAnalyteMasterExistsRecord.success) {
                                masterAnalyteStore.updateExistsLabEnvCode(true);
                                Toast.error({
                                  message: `😔 ${res.checkAnalyteMasterExistsRecord.message}`,
                                });
                              } else
                                masterAnalyteStore.updateExistsLabEnvCode(
                                  false,
                                );
                            });
                          masterAnalyteStore.masterAnalyteService
                            .findByFields({
                              input: {filter: {analyteCode: code}},
                            })
                            .then((res: any) => {
                              if (res.findByFieldsAnalyteMaster.success) {
                                masterAnalyteStore.updateMasterAnalyte({
                                  ...masterAnalyteStore.masterAnalyte,
                                  analyteName:
                                    res.findByFieldsAnalyteMaster.data?.length >
                                    0
                                      ? res.findByFieldsAnalyteMaster.data[0]
                                          ?.analyteName
                                      : undefined,
                                });
                                masterAnalyteStore.updateMasterAnalyteActivity({
                                  ...masterAnalyteStore.masterAnalyteActivity,
                                  disableAnalyteName: true,
                                });
                              } else {
                                masterAnalyteStore.updateMasterAnalyte({
                                  ...masterAnalyteStore.masterAnalyte,
                                  analyteName: '',
                                });
                                masterAnalyteStore.updateMasterAnalyteActivity({
                                  ...masterAnalyteStore.masterAnalyteActivity,
                                  disableAnalyteName: false,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                  name='analyteCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                {masterAnalyteStore.checkExitsLabEnvCode && (
                  <span className='text-red-600 font-medium relative'>
                    Code already exits. Please use other code.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
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
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Analyte Method'
                      hasError={!!errors.analyteMethod}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: methodsStore.listMethods,
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
                  render={({field: {onChange, value}}) => (
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Range Set On'>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.rangeSetOn
                            ? 'border-red-500  '
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
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Picture'
                      id='optionPicture'
                      hasError={!!errors.picture}
                    >
                      <select
                        value={value}
                        disabled={
                          masterAnalyteStore.masterAnalyte?.resultType === 'V'
                            ? false
                            : true
                        }
                        name='optionPicture'
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.picture
                            ? 'border-red-500  '
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
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Result Type'
                      hasError={!!errors.resultType}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.resultType
                            ? 'border-red-500  '
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
                  name=' resultType'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => <>{defaultResult}</>}
                  name='defaultResult'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Grid cols={4}>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
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
                              : masterAnalyteStore.masterAnalyte?.analyteCode,
                            analyteName: !method
                              ? ''
                              : masterAnalyteStore.masterAnalyte?.analyteName,
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
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
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
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
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
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Analyte Type'
                      hasError={!!errors.analyteType}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.analyteType
                            ? 'border-red-500  '
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Units' hasError={!!errors.units}>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.units ? 'border-red-500  ' : 'border-gray-300'
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Usage' hasError={!!errors.usage}>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.usage ? 'border-red-500  ' : 'border-gray-300'
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
                  rules={{required: false}}
                  defaultValue=''
                />

                {/* <Form.InputDate
                label="Schedule"
                name="txtSchedule"
                placeholder="Schedule"
                value={moment
                  .unix(masterAnalyteStore.masterAnalyte?.schedule || 0)
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  const formatDate = moment(schedule).format(
                    "YYYY-MM-DD HH:mm"
                  )
                  masterAnalyteStore.updateMasterAnalyte({
                    ...masterAnalyteStore.masterAnalyte,
                    schedule: moment(formatDate).unix(),
                  })
                }}
              />
              <Form.Input
                label="Tube Groups"
                name="txtTubeGroups"
                placeholder="Tube Groups"
                value={masterAnalyteStore.masterAnalyte?.tubeGroups}
                onChange={(tubeGroups) => {
                  masterAnalyteStore.updateMasterAnalyte({
                    ...masterAnalyteStore.masterAnalyte,
                    tubeGroups,
                  })
                }}
              /> */}

                {/* <Form.InputWrapper label="Workflow">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const workflow = e.target.value as string
                    masterAnalyteStore.updateMasterAnalyte({
                      ...masterAnalyteStore.masterAnalyte,
                      workflow,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "WORKFLOW"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                </select>
              </Form.InputWrapper>
              <Form.InputWrapper
                label="Sample Type"
                id="optionSampleType"
              >
                <select
                  name="optionSampleTypes"
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleType = e.target.value as string
                    masterAnalyteStore.updateMasterAnalyte({
                      ...masterAnalyteStore.masterAnalyte,
                      sampleType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["sampleType1"].map((item: any, index: number) => (
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
                    required: masterAnalyteStore.masterAnalyte?.calculationFlag
                      ? true
                      : false,
                  }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='CPT Code'
                      name='txtCPTCode'
                      placeholder={
                        errors.cptCode ? 'Please Enter CPT Code' : 'CPT Code'
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
                  rules={{required: false}}
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
                          errors.status ? 'border-red-500  ' : 'border-gray-300'
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
                  rules={{required: true}}
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
                  render={({field: {onChange, value}}) => (
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
                  render={({field: {onChange, value}}) => (
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
                  render={({field: {onChange, value}}) => (
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
                  render={({field: {onChange, value}}) => (
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
                  rules={{required: false}}
                  defaultValue=''
                />

                <Grid cols={3}>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
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
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
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
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={() => (
                    <Form.MultilineInput
                      label='Abnormal Highlighter CSS'
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={() => (
                    <Form.MultilineInput
                      label='Critical Highlighter CSS'
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Entered By'
                      placeholder={
                        errors.userId ? 'Please Enter Entered By' : 'Entered By'
                      }
                      hasError={!!errors.userId}
                      value={loginStore.login?.userId}
                      disabled={true}
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
                          ? 'Please Enter Date Creation'
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
                          ? 'Please Enter Date Active'
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
                          ? 'Please Enter schedule'
                          : 'Date Expire'
                      }
                      hasError={!!errors.dateExpire}
                      value={value}
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
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
                  render={({field: {onChange, value}}) => (
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
                  rules={{required: false}}
                  defaultValue={libraryStore.listLibrary}
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
                          masterAnalyteStore.updateMasterAnalyte({
                            ...masterAnalyteStore.masterAnalyte,
                            environment,
                          });
                          if (
                            !masterAnalyteStore.masterAnalyte?.existsVersionId
                          ) {
                            masterAnalyteStore.masterAnalyteService
                              .checkExitsLabEnvCode({
                                input: {
                                  code: masterAnalyteStore.masterAnalyte
                                    ?.analyteCode,
                                  env: environment,
                                  lab: masterAnalyteStore.masterAnalyte?.lab,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkAnalyteMasterExistsRecord.success
                                ) {
                                  masterAnalyteStore.updateExistsLabEnvCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkAnalyteMasterExistsRecord.message}`,
                                  });
                                } else
                                  masterAnalyteStore.updateExistsLabEnvCode(
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
                            : masterAnalyteStore.masterAnalyte?.environment ||
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
              </List>
            </Grid>
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
              setModalConfirm({show: false});
              switch (action) {
                case 'Delete': {
                  masterAnalyteStore.masterAnalyteService
                    .deleteAnalyteMaster({input: {id: modalConfirm.id}})
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
                  masterAnalyteStore.masterAnalyteService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
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
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActive: new Date(),
                  });
                  setValue('lab', modalConfirm.data.lab);
                  setValue('analyteCode', modalConfirm.data.analyteCode);
                  setValue('analyteName', modalConfirm.data.analyteName);
                  setValue('environment', modalConfirm.data.environment);
                  setValue('status', modalConfirm.data.status);

                  break;
                }
                case 'duplicate': {
                  masterAnalyteStore.updateMasterAnalyte({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: Number.parseInt(modalConfirm.data.version),
                    dateActive: new Date(),
                  });
                  setIsInputView(!isInputView);
                  setValue('lab', modalConfirm.data.lab);
                  setValue('analyteCode', modalConfirm.data.analyteCode);
                  setValue('analyteName', modalConfirm.data.analyteName);
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

export default MasterAnalyte;
