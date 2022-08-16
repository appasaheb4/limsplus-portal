import React, {useState, useEffect, useMemo} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
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
} from '@/library/components';
import {DepartmentList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {DeginisationHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {FormHelper} from '@/helper';

export const Department = DeginisationHoc(
  observer(() => {
    const {
      loading,
      loginStore,
      labStore,
      userStore,
      departmentStore,
      routerStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();

    setValue('lab', loginStore.login.lab);
    setValue('environment', departmentStore.department?.environment);
    setValue('status', departmentStore.department?.status);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddDepartment, setHideAddDepartment] = useState<boolean>(true);

    useEffect(() => {
      reset();
    }, [labStore.listLabs, reset]);

    const onSubmitDepartment = () => {
      if (!departmentStore.checkExitsCode) {
        departmentStore.DepartmentService.adddepartment({
          input: {
            ...departmentStore.department,
          },
        }).then(res => {
          if (res.createDepartment.success) {
            Toast.success({
              message: `😊 ${res.createDepartment.message}`,
            });
          }
        });
        setTimeout(() => {
          // departmentStore.fetchListDepartment()
          window.location.reload();
        }, 2000);
      } else {
        Toast.warning({
          message: '😔 Please enter diff code!',
        });
      }
    };
    const tableView = useMemo(
      () => (
        <DepartmentList
          data={departmentStore.listDepartment || []}
          totalSize={departmentStore.listDepartmentCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listLabs: labStore.listLabs,
            userStore: userStore,
            userList: userStore.userList,
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
              body: 'Update department!',
            });
          }}
          onPageSizeChange={(page, limit) => {
            departmentStore.fetchListDepartment(page, limit);
          }}
          onFilter={(type, filter, page, limit) => {
            departmentStore.DepartmentService.filter({
              input: {type, filter, page, limit},
            });
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [departmentStore.listDepartment],
    );

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddDepartment}
            onClick={() => setHideAddDepartment(!hideAddDepartment)}
          />
        )}
        <div className='mx-auto'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddDepartment ? 'hidden' : 'shown')
            }
          >
            <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Lab'
                      id='lab'
                      hasError={!!errors.lab}
                    >
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        placeholder='Search by name'
                        disable={
                          loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? true
                            : false
                        }
                        displayValue={departmentStore.department?.lab}
                        data={{
                          list: labStore.listLabs,
                          displayKey: 'name',
                          findKey: 'name',
                        }}
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
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            lab: item.code,
                          });
                          labStore.updateLabList(labStore.listLabsCopy);
                          departmentStore.DepartmentService.checkExitsLabEnvCode(
                            {
                              input: {
                                code: departmentStore.department?.code,
                                env: departmentStore.department?.environment,
                                lab: item.code,
                              },
                            },
                          ).then(res => {
                            if (res.checkDepartmentExistsRecord.success) {
                              departmentStore.setExitsCode(true);
                              Toast.error({
                                message: `😔 ${res.checkDepartmentExistsRecord.message}`,
                              });
                            } else departmentStore.setExitsCode(false);
                          });
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
                    <Form.Input
                      label='Code'
                      id='code'
                      hasError={!!errors.labCode}
                      placeholder={
                        errors.labCode ? 'Please Enter Code' : 'Code'
                      }
                      value={departmentStore.department?.code}
                      onChange={code => {
                        onChange(code);
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          code: code.toUpperCase(),
                        });
                      }}
                      onBlur={code => {
                        onChange(code);
                        departmentStore.DepartmentService.checkExitsLabEnvCode({
                          input: {
                            code,
                            env: departmentStore.department?.environment,
                            lab: departmentStore.department?.lab,
                          },
                        }).then(res => {
                          if (res.checkDepartmentExistsRecord.success) {
                            departmentStore.setExitsCode(true);
                            Toast.error({
                              message: `😔 ${res.checkDepartmentExistsRecord.message}`,
                            });
                          } else departmentStore.setExitsCode(false);
                        });
                      }}
                    />
                  )}
                  name='labCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                {departmentStore.checkExitsCode && (
                  <span className='text-red-600 font-medium relative'>
                    Code already exits. Please use other code.
                  </span>
                )}

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Name'
                      name='name'
                      hasError={!!errors.labName}
                      placeholder={
                        errors.labName ? 'Please Enter Name' : 'Name'
                      }
                      value={departmentStore.department?.name}
                      onChange={name => {
                        onChange(name);
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          name: name.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='labName'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Short Name'
                      placeholder={
                        errors.shortName
                          ? 'Please Enter Short Name'
                          : 'Short Name'
                      }
                      hasError={!!errors.shortName}
                      value={departmentStore.department?.shortName}
                      onChange={shortName => {
                        onChange(shortName);
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          shortName: shortName.toUpperCase(),
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
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='HOD' hasError={!!errors.hod}>
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        placeholder='Search by name'
                        data={{
                          list: userStore.userList,
                          displayKey: 'fullName',
                          findKey: 'fullName',
                        }}
                        hasError={!!errors.fullName}
                        onFilter={(value: string) => {
                          userStore.UsersService.filter({
                            input: {
                              type: 'filter',
                              filter: {
                                fullName: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item.fullName);
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            hod: item.fullName.toUpperCase(),
                            hodUserId: item?.userId,
                          });

                          userStore.updateUserList(userStore.userListCopy);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='hod'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Report Order'
                      placeholder={
                        errors.reportOrder
                          ? 'Please enter report order'
                          : 'Report Order'
                      }
                      type='number'
                      hasError={!!errors.reportOrder}
                      value={departmentStore.department?.reportOrder}
                      onChange={reportOrder => {
                        onChange(reportOrder);
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          reportOrder: Number.parseFloat(reportOrder),
                        });
                      }}
                    />
                  )}
                  name='reportOrder'
                  rules={{
                    required: false,
                  }}
                  defaultValue=''
                />
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Mobile No'
                      placeholder={
                        errors.mobileNo ? 'Please Enter MobileNo' : 'MobileNo'
                      }
                      type='number'
                      hasError={!!errors.mobileNo}
                      pattern={FormHelper.patterns.mobileNo}
                      value={departmentStore.department?.mobileNo}
                      onChange={mobileNo => {
                        onChange(mobileNo);
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          mobileNo,
                        });
                      }}
                    />
                  )}
                  name='mobileNo'
                  rules={{
                    required: false,
                    pattern: FormHelper.patterns.mobileNo,
                  }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Contact No'
                      placeholder={
                        errors.contactNo
                          ? 'Please Enter contactNo'
                          : 'contactNo'
                      }
                      type='number'
                      pattern={FormHelper.patterns.mobileNo}
                      hasError={!!errors.contactNo}
                      value={departmentStore.department?.contactNo}
                      onChange={contactNo => {
                        onChange(contactNo);
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          contactNo,
                        });
                      }}
                    />
                  )}
                  name='contactNo'
                  rules={{
                    required: false,
                    pattern: FormHelper.patterns.mobileNo,
                  }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Clock
                      label='Opening Time'
                      hasError={!!errors.openingTime}
                      value={departmentStore.department?.openingTime}
                      onChange={openingTime => {
                        onChange(openingTime);
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          openingTime,
                        });
                      }}
                    />
                  )}
                  name='openingTime'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Clock
                      label='Closing Time'
                      hasError={!!errors.closingTime}
                      value={departmentStore.department?.closingTime}
                      onChange={closingTime => {
                        onChange(closingTime);
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          closingTime,
                        });
                      }}
                    />
                  )}
                  name='closingTime'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Grid cols={4}>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Auto Release'
                        hasError={!!errors.autoRelease}
                        value={departmentStore.department?.autoRelease}
                        onChange={autoRelease => {
                          onChange(autoRelease);
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            autoRelease,
                          });
                        }}
                      />
                    )}
                    name='autoRelease'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Require receving in Lab'
                        hasError={!!errors.requireReceveInLab}
                        value={departmentStore.department?.requireReceveInLab}
                        onChange={requireReceveInLab => {
                          onChange(requireReceveInLab);
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            requireReceveInLab,
                          });
                        }}
                      />
                    )}
                    name='requireReceveInLab'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Require Scain In'
                        hasError={!!errors.requireScainIn}
                        value={departmentStore.department?.requireScainIn}
                        onChange={requireScainIn => {
                          onChange(requireScainIn);
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            requireScainIn,
                          });
                        }}
                      />
                    )}
                    name='requireScainIn'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Routing Dept'
                        hasError={!!errors.routingDept}
                        value={departmentStore.department?.routingDept}
                        onChange={routingDept => {
                          onChange(routingDept);
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            routingDept,
                          });
                        }}
                      />
                    )}
                    name='routingDept'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      rows={2}
                      label='FYI line'
                      placeholder={
                        errors.fyiLine ? 'Please Enter fyiLine' : 'fyiLine'
                      }
                      hasError={!!errors.fyiLine}
                      value={departmentStore.department?.fyiLine}
                      onChange={fyiLine => {
                        onChange(fyiLine);
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          fyiLine,
                        });
                      }}
                    />
                  )}
                  name='fyiLine'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      rows={2}
                      label='Work line'
                      placeholder={
                        errors.workLine ? 'Please Enter workLine' : 'workLine'
                      }
                      hasError={!!errors.workLine}
                      value={departmentStore.department?.workLine}
                      onChange={workLine => {
                        onChange(workLine);
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          workLine,
                        });
                      }}
                    />
                  )}
                  name='workLine'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Status'
                      hasError={!!errors.status}
                    >
                      <select
                        value={departmentStore.department?.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? 'border-red-500  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const status = e.target.value;
                          onChange(status);
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
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
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Environment'>
                      <select
                        value={departmentStore.department?.environment}
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
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            environment,
                          });
                          departmentStore.DepartmentService.checkExitsLabEnvCode(
                            {
                              input: {
                                code: departmentStore.department?.code,
                                env: environment,
                                lab: departmentStore.department?.lab,
                              },
                            },
                          ).then(res => {
                            if (res.checkDepartmentExistsRecord.success) {
                              departmentStore.setExitsCode(true);
                              Toast.error({
                                message: `😔 ${res.checkDepartmentExistsRecord.message}`,
                              });
                            } else departmentStore.setExitsCode(false);
                          });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : departmentStore.department?.environment ||
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
                onClick={handleSubmit(onSubmitDepartment)}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size='medium'
                type='outline'
                icon={Svg.Remove}
                onClick={() => {
                  //rootStore.departmentStore.clear();
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
                  departmentStore.DepartmentService.deletedepartment({
                    input: {id: modalConfirm.id},
                  }).then((res: any) => {
                    if (res.removeDepartment.success) {
                      Toast.success({
                        message: `😊 ${res.removeDepartment.message}`,
                      });
                      setModalConfirm({show: false});
                      departmentStore.fetchListDepartment();
                    }
                  });
                  break;
                }

                case 'Update': {
                  departmentStore.DepartmentService.updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  }).then((res: any) => {
                    if (res.updateDepartment.success) {
                      Toast.success({
                        message: `😊 ${res.updateDepartment.message}`,
                      });
                      setModalConfirm({show: false});
                      departmentStore.fetchListDepartment();
                    }
                  });
                  break;
                }
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />
        </div>
      </>
    );
  }),
);

export default Department;
