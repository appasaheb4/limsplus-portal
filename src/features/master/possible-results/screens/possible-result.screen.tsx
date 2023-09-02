import React, {useState, useMemo, useEffect} from 'react';
import {observer} from 'mobx-react';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Grid,
  List,
  Icons,
  Form,
  Svg,
  ModalConfirm,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {PossibleResultsList} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {AutoCompleteFilterSingleSelectAnalyteCode} from '../components';
import {PossibleResultHoc} from '../hoc';
import {useStores} from '@/stores';
import _ from 'lodash';
import {RouterFlow} from '@/flows';
import {resetPossibleResult} from '../startup';
import * as XLSX from 'xlsx';

export const PossibleResults = PossibleResultHoc(
  observer(() => {
    const {loginStore, possibleResultsStore, masterAnalyteStore, routerStore} =
      useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLookup, setHideAddLookup] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    useEffect(() => {
      // Default value initialization
      setValue(
        'environment',
        possibleResultsStore.possibleResults?.environment,
      );
      setValue('status', possibleResultsStore.possibleResults?.status);
      setValue('dateExpire', possibleResultsStore.possibleResults?.dateExpire);
      setValue('version', possibleResultsStore.possibleResults?.version);
      setValue(
        'dateCreation',
        possibleResultsStore.possibleResults?.dateCreation,
      );
      setValue('dateActive', possibleResultsStore.possibleResults?.dateActive);
      setValue(
        'analyteName',
        possibleResultsStore.possibleResults?.analyteName,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [possibleResultsStore.possibleResults]);

    const onSubmitPossibleResult = () => {
      if (!possibleResultsStore.checkExistsRecords) {
        possibleResultsStore.possibleResultsService
          .addPossibleResults({
            input: isImport
              ? {isImport, arrImportRecords}
              : {
                  isImport,
                  ...possibleResultsStore.possibleResults,
                  enteredBy:
                    possibleResultsStore.possibleResults.enteredBy ||
                    loginStore.login.userId,
                  __typename: undefined,
                },
          })
          .then(res => {
            if (res.createPossibleResult.success) {
              Toast.success({
                message: `😊 ${res.createPossibleResult.message}`,
              });
              setHideAddLookup(true);
              reset();
              resetPossibleResult();
            }
          });
      } else {
        Toast.warning({
          message: '😔 Please use diff code',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <PossibleResultsList
          data={possibleResultsStore.listPossibleResults || []}
          totalSize={possibleResultsStore.listPossibleResultsCount}
          extraData={{
            listMasterAnalyte: masterAnalyteStore.listMasterAnalyte,
            possibleResults: possibleResultsStore.possibleResults,
            lookupItems: routerStore.lookupItems,
            possibleResultsStore,
          }}
          updatePossibleResults={values => {
            possibleResultsStore.updatePossibleResults(values);
          }}
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            routerStore.userPermission,
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
              body: 'Update Lookup!',
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
            possibleResultsStore.fetchListPossibleResults(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            possibleResultsStore.possibleResultsService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {mode: 'filter', type, page, limit, filter};
          }}
          onApproval={async records => {
            const isExists = await checkExistsRecords(records, 1);
            if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'Update',
                data: {value: 'A', dataField: 'status', id: records._id},
                title: 'Are you sure?',
                body: 'Update deginisation!',
              });
            }
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [possibleResultsStore.listPossibleResults],
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
          return {
            analyteCode: item['Analyte Code'],
            analyteName: item['Analyte Name'],
            conclusionResult: [],
            defaultConclusion: '',
            dateCreation: item['Date Creation'],
            dateActive: item['Date Active'],
            dateExpire: item['Date Expire'],
            version: item.Version,
            enteredBy: loginStore.login.userId,
            environment: item?.Environment,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = possibleResultsStore.possibleResults,
      length = 0,
    ) => {
      //Pass required Field in Array
      return possibleResultsStore.possibleResultsService
        .findByFields({
          input: {
            filter: {
              ..._.pick(fields, ['analyteCode', 'environment', 'status']),
            },
          },
        })
        .then(res => {
          if (
            res.findByFieldsPossibleResult?.success &&
            res.findByFieldsPossibleResult.data?.length > length
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
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddLookup}
            onClick={() => setHideAddLookup(!hideAddLookup)}
          />
        )}
        <div className='mx-auto'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddLookup ? 'hidden' : 'shown')
            }
          >
            <ManualImportTabs
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
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper
                        label='Analyte Code'
                        hasError={!!errors.analyteCode}
                      >
                        <AutoCompleteFilterSingleSelectAnalyteCode
                          hasError={!!errors.analyteCode}
                          displayValue={value}
                          onSelect={item => {
                            onChange(item.analyteCode);
                            possibleResultsStore.updatePossibleResults({
                              ...possibleResultsStore.possibleResults,
                              analyteCode: item.analyteCode,
                              analyteName: item.analyteName,
                            });
                            masterAnalyteStore.updateMasterAnalyteList(
                              masterAnalyteStore.listMasterAnalyteCopy,
                            );
                            possibleResultsStore.possibleResultsService
                              .checkExistsEnvCode({
                                input: {
                                  code: item.analyteCode,
                                  env: possibleResultsStore.possibleResults
                                    ?.environment,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkPossibleResultExistsRecord.success
                                ) {
                                  possibleResultsStore.updateExistsRecords(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPossibleResultExistsRecord.message}`,
                                  });
                                } else
                                  possibleResultsStore.updateExistsRecords(
                                    false,
                                  );
                              });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='analyteCode'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  {possibleResultsStore.checkExistsRecords && (
                    <span className='text-red-600 font-medium relative'>
                      Code already exits. Please use other code.
                    </span>
                  )}
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        disabled={true}
                        label='Analyte Name'
                        placeholder={
                          errors.analyteName
                            ? 'Please Enter Analyte Name'
                            : 'Analyte Name'
                        }
                        hasError={!!errors.analyteName}
                        value={value}
                      />
                    )}
                    name='analyteName'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Form.InputWrapper label='Conclusion Value'>
                    <div className='flex flex-row gap-4'>
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Input
                            placeholder={
                              errors.result ? 'Please Enter Result' : 'Result'
                            }
                            hasError={!!errors.result}
                            value={value}
                            onChange={result => {
                              onChange(result);
                              possibleResultsStore.updatePossibleResults({
                                ...possibleResultsStore.possibleResults,
                                result,
                              });
                            }}
                          />
                        )}
                        name='result'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Input
                            placeholder={
                              errors.possibleValue
                                ? 'Please Enter Possible Value'
                                : 'Possible Value'
                            }
                            hasError={!!errors.possibleValue}
                            value={value}
                            onChange={possibleValue => {
                              onChange(possibleValue);
                              possibleResultsStore.updatePossibleResults({
                                ...possibleResultsStore.possibleResults,
                                possibleValue,
                              });
                            }}
                          />
                        )}
                        name='possibleValue'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='AbNormal'
                            hasError={!!errors.abNormal}
                            value={value}
                            onChange={abNormal => {
                              onChange(abNormal);
                              possibleResultsStore.updatePossibleResults({
                                ...possibleResultsStore.possibleResults,
                                abNormal,
                              });
                            }}
                          />
                        )}
                        name='abNormal'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            hasError={!!errors.critical}
                            label='Critical'
                            value={value}
                            onChange={critical => {
                              onChange(critical);
                              possibleResultsStore.updatePossibleResults({
                                ...possibleResultsStore.possibleResults,
                                critical,
                              });
                            }}
                          />
                        )}
                        name='critical'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <div className='mt-2'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          onClick={() => {
                            const result =
                              possibleResultsStore.possibleResults?.result;
                            const possibleValue =
                              possibleResultsStore.possibleResults
                                ?.possibleValue;
                            let conclusionResult =
                              possibleResultsStore.possibleResults
                                ?.conclusionResult || [];
                            if (
                              result === undefined ||
                              possibleValue === undefined
                            )
                              return alert('Please enter value and code.');
                            if (result !== undefined) {
                              conclusionResult !== undefined
                                ? conclusionResult.push({
                                    result,
                                    possibleValue,
                                    abNormal:
                                      possibleResultsStore.possibleResults
                                        .abNormal,
                                    critical:
                                      possibleResultsStore.possibleResults
                                        .critical,
                                  })
                                : (conclusionResult = [
                                    {
                                      result,
                                      possibleValue,
                                      abNormal:
                                        possibleResultsStore.possibleResults
                                          .abNormal,
                                      critical:
                                        possibleResultsStore.possibleResults
                                          .critical,
                                    },
                                  ]);
                              possibleResultsStore.updatePossibleResults({
                                ...possibleResultsStore.possibleResults,
                                conclusionResult,
                              });
                              possibleResultsStore.updatePossibleResults({
                                ...possibleResultsStore.possibleResults,
                                conclusionResult,
                                result: '',
                                possibleValue: '',
                                abNormal: false,
                                critical: false,
                              });
                              setValue('result', '');
                              setValue('possibleValue', '');
                              setValue('abNormal', false);
                              setValue('critical', false);
                            }
                          }}
                        >
                          <Icons.EvaIcon icon='plus-circle-outline' />
                          {'Add'}
                        </Buttons.Button>
                      </div>
                      <div className='clearfix'></div>
                    </div>
                    <List space={2} direction='row' justify='center'>
                      <div>
                        {possibleResultsStore.possibleResults?.conclusionResult?.map(
                          (item, index) => (
                            <div className='mb-2' key={index}>
                              <Buttons.Button
                                size='medium'
                                type='solid'
                                icon={Svg.Remove}
                                onClick={() => {
                                  const firstArr =
                                    possibleResultsStore.possibleResults?.conclusionResult?.slice(
                                      0,
                                      index,
                                    ) || [];
                                  const secondArr =
                                    possibleResultsStore.possibleResults?.conclusionResult?.slice(
                                      index + 1,
                                    ) || [];
                                  const finalArray = [
                                    ...firstArr,
                                    ...secondArr,
                                  ] as typeof possibleResultsStore.possibleResults.conclusionResult;
                                  possibleResultsStore.updatePossibleResults({
                                    ...possibleResultsStore.possibleResults,
                                    conclusionResult: finalArray,
                                  });
                                }}
                              >
                                {`Result: ${item.result}  
                              Possible Value: ${item.possibleValue}  
                              AbNormal: ${item.abNormal}  
                              Critical: ${item.critical}`}
                              </Buttons.Button>
                            </div>
                          ),
                        )}
                      </div>
                    </List>
                  </Form.InputWrapper>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper
                        hasError={!!errors.defaulItem}
                        label='Default Conclusion'
                      >
                        <select
                          // value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.defaultLab ? 'border-red' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            let defaultConclusion = JSON.parse(e.target.value);
                            defaultConclusion = {
                              result: defaultConclusion.result,
                              possibleValue: defaultConclusion.possibleValue,
                              abNormal: defaultConclusion.abNormal,
                              critical: defaultConclusion.critical,
                            };
                            onChange(defaultConclusion?.result);
                            possibleResultsStore.updatePossibleResults({
                              ...possibleResultsStore.possibleResults,
                              defaultConclusion,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {possibleResultsStore.possibleResults &&
                            possibleResultsStore.possibleResults
                              .conclusionResult &&
                            possibleResultsStore.possibleResults.conclusionResult.map(
                              (item: any, index: number) => (
                                <option
                                  key={item.name}
                                  value={JSON.stringify(item)}
                                >
                                  {`Result: ${item.result}  
                              Possible Value: ${item.possibleValue}  
                              AbNormal: ${item.abNormal}  
                              Critical: ${item.critical}`}
                                </option>
                              ),
                            )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='defaulItem'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper label='Environment'>
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
                            possibleResultsStore.updatePossibleResults({
                              ...possibleResultsStore.possibleResults,
                              environment,
                            });
                            possibleResultsStore.possibleResultsService
                              .checkExistsEnvCode({
                                input: {
                                  code: possibleResultsStore.possibleResults
                                    .analyteCode,
                                  env: environment,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkPossibleResultExistsRecord.success
                                ) {
                                  possibleResultsStore.updateExistsRecords(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkPossibleResultExistsRecord.message}`,
                                  });
                                } else
                                  possibleResultsStore.updateExistsRecords(
                                    false,
                                  );
                              });
                          }}
                        >
                          <option selected>
                            {loginStore.login &&
                            loginStore.login.role !== 'SYSADMIN'
                              ? 'Select'
                              : possibleResultsStore.possibleResults
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
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
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
                    rules={{required: false}}
                    defaultValue=''
                  />
                </List>

                <List direction='col' space={4} justify='stretch' fill>
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
                          possibleResultsStore.updatePossibleResults({
                            ...possibleResultsStore.possibleResults,
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
                            possibleResultsStore.updatePossibleResults({
                              ...possibleResultsStore.possibleResults,
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
                onClick={handleSubmit(onSubmitPossibleResult)}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size='medium'
                type='outline'
                icon={Svg.Remove}
                onClick={() => {
                  //rootStore.LookupStore.clear();
                  window.location.reload();
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
            {tableView}
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              switch (action) {
                case 'Delete': {
                  possibleResultsStore.possibleResultsService
                    .deletePossibleResults({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removePossibleResult.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.removePossibleResult.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          possibleResultsStore.fetchListPossibleResults(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          possibleResultsStore.possibleResultsService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else possibleResultsStore.fetchListPossibleResults();
                      }
                    });

                  break;
                }
                case 'Update': {
                  possibleResultsStore.possibleResultsService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updatePossibleResult.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updatePossibleResult.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          possibleResultsStore.fetchListPossibleResults(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          possibleResultsStore.possibleResultsService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else possibleResultsStore.fetchListPossibleResults();
                      }
                    });

                  break;
                }
                case 'versionUpgrade': {
                  possibleResultsStore.updatePossibleResults({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActive: new Date(),
                  });
                  setValue('analyteCode', modalConfirm.data.analyteCode);
                  setValue('environment', modalConfirm.data.environment);
                  setValue('status', modalConfirm.data.status);
                  setHideAddLookup(!hideAddLookup);
                  setModalConfirm({show: false});

                  break;
                }
                case 'duplicate': {
                  possibleResultsStore.updatePossibleResults({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: Number.parseInt(modalConfirm.data.version),
                    dateActive: new Date(),
                  });
                  setValue('analyteCode', modalConfirm.data.analyteCode);
                  setValue('environment', modalConfirm.data.environment);
                  setValue('status', modalConfirm.data.status);
                  setHideAddLookup(!hideAddLookup);
                  setModalConfirm({show: false});

                  break;
                }
                // No default
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />
        </div>
      </>
    );
  }),
);

export default PossibleResults;
