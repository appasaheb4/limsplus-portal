import React, { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
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
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  MainPageHeading,
} from '@/library/components';
import {
  SalesTeamList,
  SalesHierarchyTable,
  TargetsTable,
} from '../components';
import { dayjs, lookupItems, lookupValue } from '@/library/utils';
import _ from 'lodash';
import * as Utils from '../util';
import { SalesTeamHoc } from '../hoc';
import { useForm, Controller } from 'react-hook-form';
import { useStores } from '@/stores';
import { AutoCompleteFilterSingleSelectEmpolyeCode } from '../components';
import { RouterFlow } from '@/flows';
import { resetSalesTeam } from '../startup';
import * as XLSX from 'xlsx';
import { toJS } from 'mobx';

export const SalesTeam = SalesTeamHoc(
  observer(() => {
    const {
      loginStore,
      userStore,
      salesTeamStore,
      administrativeDivisions,
      routerStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddSection, setHideAddSection] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);

    useEffect(() => {
      // Default value initialization
      setValue('salesTerritory', salesTeamStore.salesTeam?.salesTerritory);
      setValue('description', salesTeamStore.salesTeam?.description);
      setValue('empCode', salesTeamStore.salesTeam?.empCode);
      setValue('employeeName', salesTeamStore.salesTeam?.empName);
      setValue('targets', salesTeamStore.salesTeam?.targets);
      // setValue('environment', salesTeamStore.salesTeam?.environment);
      setValue('status', salesTeamStore.salesTeam?.status);
      setValue('dateExpire', salesTeamStore.salesTeam?.dateExpire);
      setValue('version', salesTeamStore.salesTeam?.version);
      setValue('dateCreation', salesTeamStore.salesTeam?.dateCreation);
      setValue('dateActive', salesTeamStore.salesTeam?.dateActive);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [salesTeamStore.salesTeam]);

    const onSubmitSalesTeam = async () => {
      if (!salesTeamStore.checkExistsRecord) {
        if (!_.isEmpty(salesTeamStore.salesTeam.existsRecordId)) {
          const isExists = await checkExistsRecords();
          if (isExists) {
            return;
          }
        }
        salesTeamStore.salesTeamService
          .addSalesTeam({
            input: isImport
              ? { isImport, arrImportRecords }
              : {
                  isImport,
                  ...salesTeamStore.salesTeam,
                  enteredBy:
                    salesTeamStore.salesTeam?.enteredBy ||
                    loginStore.login.userId,
                  __typename: undefined,
                },
          })
          .then(res => {
            if (res.createSalesTeam.success) {
              Toast.success({
                message: `😊 ${res.createSalesTeam.message}`,
              });
              setHideAddSection(true);
              reset();
              resetSalesTeam();
              setArrImportRecords([]);
              setIsImport(false);
              setIsVersionUpgrade(false);
            }
          });
      } else {
        Toast.warning({
          message: '😔 Please use diff emp code',
        });
      }
    };

    const onUpdateSingleField = payload => {
      salesTeamStore.salesTeamService
        .updateSingleFiled({
          input: {
            ...payload,
          },
        })
        .then((res: any) => {
          if (res.updateSalesTeam.success) {
            Toast.success({
              message: `😊 ${res.updateSalesTeam.message}`,
            });
            if (global?.filter?.mode == 'pagination')
              salesTeamStore.fetchSalesTeam(
                global?.filter?.page,
                global?.filter?.limit,
              );
            else if (global?.filter?.mode == 'filter')
              salesTeamStore.salesTeamService.filter({
                input: {
                  type: global?.filter?.type,
                  filter: global?.filter?.filter,
                  page: global?.filter?.page,
                  limit: global?.filter?.limit,
                },
              });
            else salesTeamStore.fetchSalesTeam();
          }
        });
    };

    const tableView = useMemo(
      () => (
        <SalesTeamList
          data={salesTeamStore.listSalesTeam || []}
          totalSize={salesTeamStore.listSalesTeamCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listAdministrativeDiv:
              administrativeDivisions.listAdministrativeDiv,
            userList: userStore.userList,
            userStore: userStore,
            filterUsersItems: Utils.filterUsersItems,
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
              body: 'Update Section!',
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
            salesTeamStore.fetchSalesTeam(page, limit);
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            salesTeamStore.salesTeamService.filter({
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
                body: 'Do you want to update this record?',
              });
            }
          }}
          onSingleDirectUpdateField={(value, dataField, id) => {
            onUpdateSingleField({
              _id: id,
              [dataField]: value,
            });
          }}
          isHideAddSection={hideAddSection}
          setHideAddSection={setHideAddSection}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [salesTeamStore.listSalesTeam, hideAddSection],
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
            salesTerritory: item['Sales Territory'],
            description: item.Description,
            empCode: item['Employee Code'],
            empName: item['Employee Name'],
            salesHierarchy: undefined,
            targets: undefined,
            dateCreation: new Date(),
            dateActive: new Date(),
            dateExpire: new Date(
              dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD hh:mm:ss'),
            ),
            version: item.Version,
            enteredBy: loginStore.login.userId,
            environment: item?.Environment,
            companyCode: item['Company Code'],
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = salesTeamStore.salesTeam,
      length = 0,
      status = 'A',
    ) => {
      const requiredFields = [
        'salesTerritory',
        'empCode',
        // 'targets',
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
      //Pass required Field in Array
      return salesTeamStore.salesTeamService
        .findByFields({
          input: {
            filter: {
              ..._.pick({ ...fields, status }, requiredFields),
            },
          },
        })
        .then(res => {
          if (
            res.findByFieldsSalesTeams?.success &&
            res.findByFieldsSalesTeams.data?.length > length
          ) {
            //setIsExistsRecord(true);
            Toast.error({
              message: '😔 Already some record exists.',
            });
            return true;
          } else return false;
        });
    };

    const setHierarchyAndTarget = item => {
      if (_.isEmpty(item?.fullName)) item.fullName = item?.empName;
      if (_.isEmpty(item.deginisation)) item.deginisation = item?.description;
      salesTeamStore.salesTeamService
        .getSalesHierarchyList({
          input: {
            empCode: item?.empCode,
            fullName: item?.fullName,
            reportingTo: item?.reportingTo,
            deginisation: item?.deginisation,
          },
        })
        .then((salesHieRes: any) => {
          if (!salesHieRes.getSalesHierarchyList.success)
            return alert(salesHieRes.getSalesHierarchyList.message);
          let targets;
          if (
            salesTeamStore.salesTeam.existsRecordId ||
            salesTeamStore.salesTeam.existsVersionId
          )
            targets = salesTeamStore.salesTeam.targets;
          else
            targets = [
              {
                id: 1,
              },
            ];
          salesTeamStore.updateSalesTeam({
            ...salesTeamStore.salesTeam,
            salesHierarchy: salesHieRes.getSalesHierarchyList.list,
            targets,
          });
        });
      salesTeamStore.updateExistsRecord(false);
    };

    return (
      <>
        <MainPageHeading
          title={routerStore.selectedComponents?.title || ''}
          store={loginStore}
        />

        <div className=' mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddSection ? 'hidden' : 'shown')
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
              <Grid cols={2}>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Sales Territory'
                        placeholder='Sales Territory'
                        disabled={isVersionUpgrade}
                        hasError={!!errors.salesTerritory}
                        value={value}
                        onChange={salesTerritory => {
                          onChange(salesTerritory);
                          salesTeamStore.updateSalesTeam({
                            ...salesTeamStore.salesTeam,
                            salesTerritory: salesTerritory.toUpperCase(),
                          });
                        }}
                        onBlur={salesTerritory => {
                          salesTeamStore.salesTeamService
                            .findByFields({
                              input: { filter: { salesTerritory } },
                            })
                            .then(res => {
                              if (res.findByFieldsSalesTeams.success) {
                                salesTeamStore.updateExistsRecord(true);
                                Toast.warning({
                                  message: `😔 ${res.findByFieldsSalesTeams.message}`,
                                });
                              } else salesTeamStore.updateExistsRecord(false);
                            });
                        }}
                      />
                    )}
                    name='salesTerritory'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.MultilineInput
                        label='Description'
                        placeholder='Description'
                        disabled={isVersionUpgrade}
                        value={value}
                        onChange={descriptionValue => {
                          const description = descriptionValue.toUpperCase();
                          onChange(description);
                          salesTeamStore.updateSalesTeam({
                            ...salesTeamStore.salesTeam,
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
                        label='Employee code'
                        hasError={!!errors.empCode}
                      >
                        <AutoCompleteFilterSingleSelectEmpolyeCode
                          hasError={!!errors.empCode}
                          displayValue={value}
                          // disable={}
                          onSelect={item => {
                            onChange(item.empCode);
                            setValue('empName', item.fullName);
                            salesTeamStore.updateSalesTeam({
                              ...salesTeamStore.salesTeam,
                              empCode: item.empCode,
                              reportingTo: item.reportingTo,
                              empName: item.fullName,
                            });
                            salesTeamStore.salesTeamService
                              .checkExistsEnvCode({
                                input: {
                                  code: item.empCode,
                                  env: salesTeamStore.salesTeam?.environment,
                                },
                              })
                              .then(res => {
                                if (res.checkSalesTeamsExistsRecord.success) {
                                  salesTeamStore.updateExistsRecord(true);
                                  Toast.error({
                                    message: `😔 ${res.checkSalesTeamsExistsRecord.message}`,
                                  });
                                } else {
                                  setHierarchyAndTarget(item);
                                }
                              });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='empCode'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={() => (
                      <Form.Input
                        label='Employee Name'
                        placeholder={
                          errors.empName
                            ? 'Please Enter EmployeeName'
                            : 'Employee Name'
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.empName ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        hasError={!!errors.empName}
                        disabled={true}
                        value={salesTeamStore.salesTeam?.empName}
                      />
                    )}
                    name='employeeName'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={() => (
                      <Form.InputWrapper
                        label='Sales Hierarchy'
                        hasError={!!errors.salesHierarchy}
                      >
                        <SalesHierarchyTable
                          list={salesTeamStore.salesTeam.salesHierarchy}
                        />
                      </Form.InputWrapper>
                    )}
                    name='salesHierarchy'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Targets'
                        hasError={!!errors.targets}
                      >
                        <TargetsTable
                          hasError={!!errors.targets}
                          onSelectItem={item => {
                            onChange(item);
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='targets'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={() => (
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
                        onChange={dateExpire => {
                          onChange(dateExpire);
                          salesTeamStore.updateSalesTeam({
                            ...salesTeamStore.salesTeam,
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
                  {/* <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <AutoCompleteCompanyList
                        hasError={!!errors.companyCode}
                        onSelect={companyCode => {
                          onChange(companyCode);
                          salesTeamStore.updateSalesTeam({
                            ...salesTeamStore.salesTeam,
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
                            salesTeamStore.updateSalesTeam({
                              ...salesTeamStore.salesTeam,
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
                  {/* <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper label='Environment'>
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
                            salesTeamStore.updateSalesTeam({
                              ...salesTeamStore.salesTeam,
                              environment,
                            });
                            salesTeamStore.salesTeamService
                              .checkExistsEnvCode({
                                input: {
                                  code: salesTeamStore.salesTeam?.empCode,
                                  env: environment,
                                },
                              })
                              .then(res => {
                                if (res.checkSalesTeamsExistsRecord.success) {
                                  salesTeamStore.updateExistsRecord(true);
                                  Toast.error({
                                    message: `😔 ${res.checkSalesTeamsExistsRecord.message}`,
                                  });
                                } else salesTeamStore.updateExistsRecord(false);
                              });
                          }}
                        >
                          <option selected>
                            {loginStore.login &&
                            loginStore.login.role !== 'SYSADMIN'
                              ? 'Select'
                              : salesTeamStore.salesTeam?.environment ||
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
                    rules={{ required: true }}
                    defaultValue=''
                  /> */}
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
            {salesTeamStore.checkExistsRecord && (
              <span className='text-red-600 font-medium'>
                Already exists records. Please enter correct info.
              </span>
            )}
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitSalesTeam)}
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
          <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
            {tableView}
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              setModalConfirm({ show: false });
              switch (action) {
                case 'Delete': {
                  salesTeamStore.salesTeamService
                    .deleteSalesTeam({ input: { id: modalConfirm.id } })
                    .then((res: any) => {
                      if (res.removeSalesTeam.success) {
                        Toast.success({
                          message: `😊 ${res.removeSalesTeam.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          salesTeamStore.fetchSalesTeam(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          salesTeamStore.salesTeamService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else salesTeamStore.fetchSalesTeam();
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
                case 'versionUpgrade': {
                  salesTeamStore.updateSalesTeam({
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
                  setHideAddSection(!hideAddSection);
                  setIsVersionUpgrade(true);
                  setHierarchyAndTarget(modalConfirm.data);
                  break;
                }
                case 'duplicate': {
                  salesTeamStore.updateSalesTeam({
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
                  setHideAddSection(!hideAddSection);
                  setHierarchyAndTarget(modalConfirm.data);
                  break;
                }
                // No default
              }
            }}
            onClose={() => setModalConfirm({ show: false })}
          />
        </div>
      </>
    );
  }),
);
export default SalesTeam;
