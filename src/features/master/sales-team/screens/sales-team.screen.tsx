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
  Icons,
} from '@/library/components';
import {SalesTeamList, SalesHierarchyTable, TargetsTable} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';

import * as Utils from '../util';
import {SalesTeamHoc} from '../hoc';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectEmpolyeCode} from '../components';
import {RouterFlow} from '@/flows';
import {resetSalesTeam} from '../startup';

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
      formState: {errors},
      setValue,
      reset,
    } = useForm();

    setValue('environment', salesTeamStore.salesTeam?.environment);
    setValue('status', salesTeamStore.salesTeam?.status);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddSection, setHideAddSection] = useState<boolean>(true);

    const onSubmitSalesTeam = () => {
      if (!salesTeamStore.checkExistsRecord) {
        salesTeamStore.salesTeamService
          .addSalesTeam({
            input: {
              ...salesTeamStore.salesTeam,
              enteredBy:
                salesTeamStore.salesTeam?.enteredBy || loginStore.login.userId,
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
            }
          });
      } else {
        Toast.warning({
          message: '😔 Please use diff emp code',
        });
      }
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
              body: 'Update Section!',
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
            salesTeamStore.fetchSalesTeam(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            salesTeamStore.salesTeamService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {mode: 'filter', type, page, limit, filter};
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [salesTeamStore.listSalesTeam],
    );

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddSection}
            onClick={() => setHideAddSection(!hideAddSection)}
          />
        )}
        <div className=' mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddSection ? 'hidden' : 'shown')
            }
          >
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Sales Territory'
                      placeholder='Sales Territory'
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
                          .findByFields({input: {filter: {salesTerritory}}})
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
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.MultilineInput
                      label='Description'
                      placeholder='Description'
                      value={value}
                      onChange={description => {
                        onChange(description);
                        salesTeamStore.updateSalesTeam({
                          ...salesTeamStore.salesTeam,
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
                      label='Employee code'
                      hasError={!!errors.empCode}
                    >
                      <AutoCompleteFilterSingleSelectEmpolyeCode
                        hasError={!!errors.empCode}
                        displayValue={svalue}
                        onSelect={item => {
                          onChange(item.empCode);
                          setValue('empName', item.fullName);
                          salesTeamStore.updateSalesTeam({
                            ...salesTeamStore.salesTeam,
                            empCode: item.empCode,
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
                                salesTeamStore.salesTeamService
                                  .getSalesHierarchyList({
                                    input: {
                                      empCode: item.empCode,
                                      fullName: item.fullName,
                                      reportingTo: item.reportingTo,
                                      deginisation: item.deginisation,
                                    },
                                  })
                                  .then((salesHieRes: any) => {
                                    if (
                                      !salesHieRes.getSalesHierarchyList.success
                                    )
                                      return alert(
                                        salesHieRes.getSalesHierarchyList
                                          .message,
                                      );
                                    salesTeamStore.updateSalesTeam({
                                      ...salesTeamStore.salesTeam,
                                      salesHierarchy:
                                        salesHieRes.getSalesHierarchyList.list,
                                      targets: [
                                        {
                                          id: 1,
                                        },
                                      ],
                                    });
                                  });
                                salesTeamStore.updateExistsRecord(false);
                              }
                            });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='empCode'
                  rules={{required: true}}
                  defaultValue={userStore.userList}
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
                        errors.empName ? 'border-red-500  ' : 'border-gray-300'
                      } rounded-md`}
                      hasError={!!errors.empName}
                      disabled={true}
                      value={salesTeamStore.salesTeam?.empName}
                    />
                  )}
                  name='employeeName'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={() => (
                    <Form.InputWrapper
                      label='Sales Hierarchy'
                      hasError={!!errors.salesHierarchy}
                    >
                      {/* {!salesTeamStore.salesTeam?.salesHierarchy && (
                        <Buttons.Button
                          size="small"
                          type="outline"
                          onClick={() => {
                            salesTeamStore.updateSalesTeam({
                              ...salesTeamStore.salesTeam,
                              salesHierarchy: [
                                {
                                  id: 1,
                                },
                              ],
                            });
                          }}
                        >
                          <Icons.EvaIcon
                            icon="plus-circle-outline"
                            color="#000"
                          />
                        </Buttons.Button>
                      )}
                      {salesTeamStore.salesTeam?.salesHierarchy?.length > 0 && ( */}
                      <SalesHierarchyTable
                        list={salesTeamStore.salesTeam.salesHierarchy}
                      />
                      {/* )} */}
                    </Form.InputWrapper>
                  )}
                  name='salesHierarchy'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
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
                  rules={{required: true}}
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
                      value={salesTeamStore.salesTeam?.dateCreation}
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
                      value={salesTeamStore.salesTeam?.dateActive}
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
                        errors.schedule
                          ? 'Please Enter schedule'
                          : 'Date Expire'
                      }
                      hasError={!!errors.schedule}
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
                  name='schedule'
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
                      value={salesTeamStore.salesTeam?.version}
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
                        value={salesTeamStore.salesTeam?.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? 'border-red-500  ' : 'border-gray-300'
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
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Environment'>
                      <select
                        value={salesTeamStore.salesTeam?.environment}
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
                            : salesTeamStore.salesTeam?.environment || 'Select'}
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
              switch (action) {
                case 'Delete': {
                  salesTeamStore.salesTeamService
                    .deleteSalesTeam({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeSalesTeam.success) {
                        setModalConfirm({show: false});
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
                  salesTeamStore.salesTeamService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateSalesTeam.success) {
                        setModalConfirm({show: false});
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

                  break;
                }
                case 'versionUpgrade': {
                  salesTeamStore.updateSalesTeam({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActive: new Date(),
                  });
                  setValue('environment', modalConfirm.data.environment);
                  setValue('status', modalConfirm.data.status);
                  setHideAddSection(!hideAddSection);
                  setModalConfirm({show: false});

                  break;
                }
                case 'duplicate': {
                  salesTeamStore.updateSalesTeam({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: Number.parseInt(modalConfirm.data.version),
                    dateActive: new Date(),
                  });
                  setValue('environment', modalConfirm.data.environment);
                  setValue('status', modalConfirm.data.status);
                  setHideAddSection(!hideAddSection);
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
export default SalesTeam;
