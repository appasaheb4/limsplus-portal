import React, {useState, useMemo, useEffect} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  List,
  Grid,
  Svg,
  Toast,
  ModalConfirm,
  Form,
  ModalChangePasswordByAdmin,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {UserList} from '../components';
import dayjs from 'dayjs';
import {FormHelper} from '@/helper';

import {useForm, Controller} from 'react-hook-form';
import {UsersHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetUser} from '../startup';
import {SelectedItems} from '../models';

export const Users = UsersHoc(
  observer(() => {
    const {
      loginStore,
      routerStore,
      userStore,
      labStore,
      deginisationStore,
      departmentStore,
      corporateClientsStore,
      registrationLocationsStore,
      roleStore,
      loading,
    } = useStores();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddUser, setHideAddUser] = useState<boolean>(true);
    const [modalChangePasswordByadmin, setModalChangePasswordByAdmin] =
      useState<any>();

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      resetField,
      reset,
    } = useForm();

    useEffect(() => {
      // Default value initialization
      setValue('status', userStore.user?.status);
      setValue('environment', userStore.user?.environment);
      setValue('userGroup', userStore.user?.userGroup);
      setValue('userModule', userStore.user?.userModule);
      setValue('dateCreation', userStore.user?.dateCreation);
      setValue('dateActive', userStore.user?.dateActive);
      setValue('exipreDate', userStore.user?.exipreDate);
      setValue('dateOfBirth', userStore.user?.dateOfBirth);
      setValue('marriageAnniversary', userStore.user?.marriageAnniversary);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStore.user]);

    const onSubmitUser = (data: any) => {
      if (!userStore.checkExitsUserId && !userStore.checkExistsEmpCode) {
        userStore &&
          userStore.UsersService.addUser({
            input: {
              ...userStore.user,
              createdBy: userStore.user?.createdBy || loginStore.login.userId,
              __typename: undefined,
              __v: undefined,
            },
          }).then((res: any) => {
            if (res.createUser.success) {
              Toast.success({
                message: `😊 ${res.createUser.message}`,
              });
              setHideAddUser(true);
              reset();
              resetUser();
              userStore.updateSelectedItems(new SelectedItems({}));
            } else {
              Toast.error({
                message: `😔 ${res.createUser.message}`,
              });
            }
          });
      } else {
        Toast.warning({
          message: '😔 Please enter userid or emp code!',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <UserList
          data={(userStore && userStore.userList) || []}
          totalSize={userStore && userStore.userListCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listLabs: labStore.listLabs,
            listDeginisation: deginisationStore.listDeginisation,
            listDepartment: departmentStore.listDepartment,
            listRole: roleStore.listRole,
            userStore,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Edit/Modify',
          )}
          role={loginStore.login?.role}
          onDelete={selectedUser => setModalConfirm(selectedUser)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Delete selected items!',
            });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'update',
              data: {value, dataField, id},
              title: 'Are you sure?',
              body: 'Update user!',
            });
          }}
          onUpdateFields={(fields: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'updateFields',
              data: {fields, id},
              title: 'Are you sure?',
              body: 'Update items!',
            });
          }}
          onUpdateImage={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateImage',
              data: {value, dataField, id},
              title: 'Are you sure?',
              body: 'UpdateImage!',
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
          onChangePassword={(id: string, userId: string, email: string) => {
            setModalChangePasswordByAdmin({
              show: true,
              type: 'changePassword',
              data: {id, userId, email},
              title: 'Are You Sure?',
              body: 'UpdatePassword!',
            });
          }}
          onPageSizeChange={(page, limit) => {
            userStore.loadUser(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            userStore.UsersService.filter({
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
      [userStore.userList],
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
            show={hideAddUser}
            onClick={status => setHideAddUser(!hideAddUser)}
          />
        )}
        <div className=' mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddUser ? 'hidden' : 'shown')
            }
          >
            <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      hasError={!!errors.defaultLab}
                      label='Default Lab'
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: labStore.listLabs,
                          displayKey: ['code', 'name'],
                        }}
                        displayValue={value}
                        hasError={!!errors.defaultLab}
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
                          onChange(item?.name);
                          userStore.updateUser({
                            ...userStore.user,
                            defaultLab: item.code,
                            defaultDepartment: '',
                          });
                          const lab: any = labStore.listLabs.filter(
                            e => e.code == item.code,
                          );
                          setValue('labs', lab);
                          resetField('defaultDepartment');
                          userStore.updateUser({
                            ...userStore.user,
                            lab,
                          });
                          userStore.updateSelectedItems({
                            ...userStore.selectedItems,
                            labs: lab,
                          });
                          departmentStore.DepartmentService.findByFields({
                            input: {filter: {lab: _.map(lab, 'code')}},
                          }).then(res => {
                            if (!res.findByFieldsDepartments.success)
                              return Toast.error({
                                message:
                                  '😔 Technical issue, Please try again !',
                              });
                            departmentStore.updateDepartmentList(
                              res.findByFieldsDepartments.data,
                            );
                          });
                          labStore.updateLabList(labStore.listLabsCopy);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='defaultLab'
                  rules={{required: true}}
                  defaultValue={userStore.user?.defaultLab || ''}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      hasError={!!errors.defaultDepartment}
                      label='Default Department'
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: departmentStore.listDepartment.filter(
                            item => item.lab === userStore.user?.defaultLab,
                          ),
                          displayKey: ['code', 'name'],
                        }}
                        displayValue={value}
                        hasError={!!errors.defaultDepartment}
                        onFilter={(value: string) => {
                          departmentStore.DepartmentService.filter({
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
                          onChange(item?.name);
                          userStore.updateUser({
                            ...userStore.user,
                            defaultDepartment: item.code,
                          });
                          const department: any =
                            departmentStore.listDepartment.filter(
                              e => e.code == item.code,
                            );
                          setValue('department', department);
                          userStore.updateUser({
                            ...userStore.user,
                            department,
                          });
                          userStore.updateSelectedItems({
                            ...userStore.selectedItems,
                            department,
                          });
                          labStore.updateLabList(labStore.listLabsCopy);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='defaultDepartment'
                  rules={{required: true}}
                  defaultValue={userStore.user?.defaultDepartment || ''}
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='User Group'
                      hasError={!!errors.userGroup}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.userGroup ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const userGroup = e.target.value;
                          onChange(userGroup);
                          userStore.updateUser({
                            ...userStore.user,
                            userGroup,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'USER_GROUP').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='userGroup'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='User Module'
                      hasError={!!errors.userModule}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.userModule ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const userModule = e.target.value;
                          onChange(userModule);
                          userStore.updateUser({
                            ...userStore.user,
                            userModule,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'USER_MODULE',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='userModule'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='User Id'
                      placeholder={
                        errors.userId ? 'Please enter userId' : 'UserId'
                      }
                      hasError={!!errors.userId}
                      value={value}
                      onChange={userId => {
                        onChange(userId);
                        userStore.updateUser({
                          ...userStore.user,
                          userId: userId.toUpperCase(),
                        });
                      }}
                      onBlur={userId => {
                        if (userId) {
                          userStore.UsersService.serviceUser
                            .checkExitsUserId(userId)
                            .then(res => {
                              if (res.checkUserExitsUserId.success)
                                userStore.setExitsUserId(true);
                              else userStore.setExitsUserId(false);
                            });
                        }
                      }}
                    />
                  )}
                  name='userId'
                  rules={{required: true}}
                  defaultValue=''
                />
                {userStore && userStore.checkExitsUserId && (
                  <span className='text-red-600 font-medium relative'>
                    UserId already exits. Please use other userid.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Full Name'
                      placeholder={
                        errors.fullName ? 'Please enter full name' : 'Full Name'
                      }
                      hasError={!!errors.fullName}
                      value={value}
                      onChange={fullName => {
                        onChange(fullName);
                        userStore.updateUser({
                          ...userStore.user,
                          fullName: fullName.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='fullName'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Emp Code'
                      placeholder={
                        errors.empCode ? 'Please enter emp code' : 'Emp Code'
                      }
                      hasError={!!errors.empCode}
                      value={value}
                      onChange={empCode => {
                        onChange(empCode);
                        userStore.updateUser({
                          ...userStore.user,
                          empCode: empCode.toUpperCase(),
                        });
                      }}
                      onBlur={empCode => {
                        if (empCode) {
                          userStore.UsersService.findUserByEmpCode(empCode)
                            .then(res => {
                              if (res.checkUserByEmpCode.success)
                                userStore.setExistsEmpCodeStatus(true);
                              else userStore.setExistsEmpCodeStatus(false);
                            })
                            .catch(error => {
                              userStore.setExistsEmpCodeStatus(false);
                            });
                        }
                      }}
                    />
                  )}
                  name='empCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                {userStore && userStore.checkExistsEmpCode && (
                  <span className='text-red-600 font-medium relative'>
                    Emp code already exits. Please use other emp code.
                  </span>
                )}

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      hasError={!!errors.reportingTo}
                      label='Reporting To'
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by emp code or full name'
                        data={{
                          list: userStore.userList,
                          displayKey: ['empCode', 'fullName'],
                        }}
                        displayValue={value}
                        hasError={!!errors.reportingTo}
                        onFilter={(value: string) => {
                          userStore.UsersService.filterByFields({
                            input: {
                              filter: {
                                fields: ['empCode', 'fullName'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item.empCode);
                          userStore.updateUser({
                            ...userStore.user,
                            reportingTo: item.empCode,
                          });
                          userStore.updateUserList(userStore.userListCopy);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='reportingTo'
                  rules={{required: false}}
                  defaultValue={userStore.user?.reportingTo}
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Designation'
                      hasError={!!errors.deginisation}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or description'
                        data={{
                          list: deginisationStore.listDeginisation,
                          displayKey: ['code', 'description'],
                        }}
                        displayValue={value}
                        hasError={!!errors.deginisation}
                        onFilter={(value: string) => {
                          deginisationStore.DeginisationService.filterByFields({
                            input: {
                              filter: {
                                fields: ['code', 'description'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item.code);
                          userStore.updateUser({
                            ...userStore.user,
                            deginisation: item.code,
                          });
                          deginisationStore.updateListDeginisation(
                            deginisationStore.listDeginisationCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='deginisation'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='User Degree'
                      placeholder={
                        errors.userDegree
                          ? 'Please enter user degree'
                          : 'User Degree'
                      }
                      hasError={!!errors.userDegree}
                      value={value}
                      onChange={userDegree => {
                        onChange(userDegree);
                        userStore.updateUser({
                          ...userStore.user,
                          userDegree: userDegree.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='userDegree'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Role' hasError={!!errors.role}>
                      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: roleStore.listRole,
                          selected: userStore.selectedItems?.roles,
                          displayKey: ['code', 'description'],
                        }}
                        hasError={!!errors.role}
                        onUpdate={item => {
                          const roles = userStore.selectedItems?.roles;
                          userStore.updateUser({
                            ...userStore.user,
                            role: roles,
                          });
                          roleStore.updateRoleList(roleStore.listRoleCopy);
                        }}
                        onFilter={(value: string) => {
                          roleStore.RoleService.filterByFields({
                            input: {
                              filter: {
                                fields: ['code', 'description'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(new Date());
                          let roles = userStore.selectedItems?.roles;
                          if (!item.selected) {
                            if (roles && roles.length > 0) {
                              roles.push(item);
                            } else roles = [item];
                          } else {
                            roles = roles.filter(items => {
                              return items._id !== item._id;
                            });
                          }
                          userStore.updateSelectedItems({
                            ...userStore.selectedItems,
                            roles,
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='role'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Password'
                      type='password'
                      placeholder={
                        errors.password ? 'Please enter password' : 'Password'
                      }
                      hasError={!!errors.password}
                      value={value}
                      onChange={password => {
                        onChange(password);
                        userStore.updateUser({
                          ...userStore.user,
                          password,
                        });
                      }}
                    />
                  )}
                  name='password'
                  rules={{
                    required: true,
                    pattern: FormHelper.patterns.password,
                  }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Assigned Lab'
                      hasError={!!errors.labs}
                    >
                      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: [
                            {
                              _id: 'selectAll',
                              code: '*',
                              name: '*',
                            },
                          ].concat(labStore.listLabs),
                          selected: userStore.selectedItems?.labs,
                          displayKey: ['code', 'name'],
                        }}
                        hasError={!!errors.labs}
                        onUpdate={item => {
                          const lab = userStore.selectedItems?.labs;
                          userStore.updateUser({
                            ...userStore.user,
                            lab,
                            department: [],
                          });
                          resetField('department');
                          if (lab.some(e => e.code !== '*')) {
                            departmentStore.DepartmentService.findByFields({
                              input: {filter: {lab: _.map(lab, 'code')}},
                            }).then(res => {
                              if (!res.findByFieldsDepartments.success)
                                return Toast.error({
                                  message:
                                    '😔 Technical issue, Please try again !',
                                });
                              departmentStore.updateDepartmentList(
                                res.findByFieldsDepartments.data,
                              );
                            });
                          }
                          labStore.updateLabList(labStore.listLabsCopy);
                        }}
                        onFilter={(value: string) => {
                          labStore.LabService.filterByFields({
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
                          onChange(new Date());
                          let labs = userStore.selectedItems?.labs;
                          if (
                            item.code === '*' ||
                            labs?.some(e => e.code === '*')
                          ) {
                            if (
                              !item.selected ||
                              labs?.some(e => e.code === '*')
                            ) {
                              labs = [];
                              labs.push(item);
                            } else {
                              labs = labs.filter(items => {
                                return items._id !== item._id;
                              });
                            }
                          } else {
                            if (!item.selected) {
                              if (labs && labs.length > 0) {
                                labs.push(item);
                              } else labs = [item];
                            } else {
                              labs = labs.filter(items => {
                                return items._id !== item._id;
                              });
                            }
                          }
                          userStore.updateSelectedItems({
                            ...userStore.selectedItems,
                            labs,
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='labs'
                  rules={{required: true}}
                  defaultValue={userStore.selectedItems?.labs}
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Assigned Department'
                      hasError={!!errors.department}
                    >
                      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: [
                            {
                              _id: 'selectAll',
                              code: '*',
                              name: '*',
                            },
                          ].concat(
                            userStore.user.lab?.length > 0
                              ? userStore.user.lab?.some(e => e.code !== '*')
                                ? departmentStore.listDepartment?.filter(o1 =>
                                    userStore.user?.lab?.some(
                                      o2 => o1.lab === o2.code,
                                    ),
                                  )
                                : departmentStore.listDepartment
                              : [],
                          ),
                          selected: userStore.selectedItems?.department,
                          displayKey: ['code', 'name'],
                        }}
                        hasError={!!errors.department}
                        onUpdate={item => {
                          const department =
                            userStore.selectedItems?.department;
                          userStore.updateUser({
                            ...userStore.user,
                            department,
                          });
                          departmentStore.updateDepartmentList(
                            departmentStore.listDepartmentCopy,
                          );
                        }}
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
                          onChange(new Date());
                          let department = userStore.selectedItems?.department;
                          if (
                            item.code === '*' ||
                            department?.some(e => e.code === '*')
                          ) {
                            if (
                              !item.selected ||
                              department?.some(e => e.code === '*')
                            ) {
                              department = [];
                              department.push(item);
                            } else {
                              department = department.filter(items => {
                                return items._id !== item._id;
                              });
                            }
                          } else {
                            if (!item.selected) {
                              if (department && department.length > 0) {
                                department.push(item);
                              } else department = [item];
                            } else {
                              department = department.filter(items => {
                                return items._id !== item._id;
                              });
                            }
                          }
                          userStore.updateSelectedItems({
                            ...userStore.selectedItems,
                            department,
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='department'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Assigned Corporate Client'
                      hasError={!!errors.corporateCode}
                    >
                      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: [
                            {
                              _id: 'selectAll',
                              corporateCode: '*',
                              corporateName: '*',
                            },
                          ].concat(
                            corporateClientsStore.listCorporateClients as any,
                          ),
                          selected: userStore.selectedItems?.corporateClient,
                          displayKey: ['corporateCode', 'corporateName'],
                        }}
                        hasError={!!errors.corporateCode}
                        onUpdate={item => {
                          const corporateClient =
                            userStore.selectedItems?.corporateClient;
                          userStore.updateUser({
                            ...userStore.user,
                            corporateClient,
                          });
                          corporateClientsStore.updateCorporateClientsList(
                            corporateClientsStore.listCorporateClientsCopy,
                          );
                        }}
                        onFilter={(value: string) => {
                          corporateClientsStore.corporateClientsService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ['corporateCode', 'corporateName'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(new Date());
                          let corporateClient =
                            userStore.selectedItems?.corporateClient;
                          if (
                            item.corporateCode === '*' ||
                            corporateClient?.some(e => e.corporateCode === '*')
                          ) {
                            if (
                              !item.selected ||
                              corporateClient?.some(
                                e => e.corporateCode === '*',
                              )
                            ) {
                              corporateClient = [];
                              corporateClient.push(item);
                            } else {
                              corporateClient = corporateClient.filter(
                                items => {
                                  return items._id !== item._id;
                                },
                              );
                            }
                          } else {
                            if (!item.selected) {
                              if (
                                corporateClient &&
                                corporateClient.length > 0
                              ) {
                                corporateClient.push(item);
                              } else corporateClient = [item];
                            } else {
                              corporateClient = corporateClient.filter(
                                items => {
                                  return items._id !== item._id;
                                },
                              );
                            }
                          }
                          userStore.updateSelectedItems({
                            ...userStore.selectedItems,
                            corporateClient,
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='corporateCode'
                  rules={{required: false}}
                  defaultValue={corporateClientsStore.listCorporateClients}
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Assigned Registration Location'
                      hasError={!!errors.locationCode}
                    >
                      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: [
                            {
                              _id: 'selectAll',
                              locationCode: '*',
                              locationName: '*',
                            },
                          ].concat(
                            registrationLocationsStore.listRegistrationLocations as any,
                          ),
                          selected:
                            userStore.selectedItems?.registrationLocation,
                          displayKey: ['locationCode', 'locationName'],
                        }}
                        hasError={!!errors.locationCode}
                        onUpdate={item => {
                          const registrationLocation =
                            userStore.selectedItems?.registrationLocation;
                          userStore.updateUser({
                            ...userStore.user,
                            registrationLocation,
                          });
                          registrationLocationsStore.updateRegistrationLocationsList(
                            registrationLocationsStore.listRegistrationLocationsCopy,
                          );
                        }}
                        onFilter={(value: string) => {
                          registrationLocationsStore.registrationLocationsService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ['locationCode', 'locationName'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(new Date());
                          let registrationLocation =
                            userStore.selectedItems?.registrationLocation;
                          if (
                            item.locationCode === '*' ||
                            registrationLocation?.some(
                              e => e.locationCode === '*',
                            )
                          ) {
                            if (
                              !item.selected ||
                              registrationLocation?.some(
                                e => e.locationCode === '*',
                              )
                            ) {
                              registrationLocation = [];
                              registrationLocation.push(item);
                            } else {
                              registrationLocation =
                                registrationLocation.filter(items => {
                                  return items._id !== item._id;
                                });
                            }
                          } else {
                            if (!item.selected) {
                              if (
                                registrationLocation &&
                                registrationLocation.length > 0
                              ) {
                                registrationLocation.push(item);
                              } else registrationLocation = [item];
                            } else {
                              registrationLocation =
                                registrationLocation.filter(items => {
                                  return items._id !== item._id;
                                });
                            }
                          }
                          userStore.updateSelectedItems({
                            ...userStore.selectedItems,
                            registrationLocation,
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='locationCode'
                  rules={{required: false}}
                  defaultValue={
                    registrationLocationsStore.listRegistrationLocations
                  }
                />
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Mobile No'
                      placeholder={
                        errors.mobileNo ? 'Please enter mobile no' : 'Mobile No'
                      }
                      pattern={FormHelper.patterns.mobileNo}
                      type='number'
                      hasError={!!errors.mobileNo}
                      value={value}
                      onChange={mobileNo => {
                        onChange(mobileNo);
                        userStore.updateUser({
                          ...userStore.user,
                          mobileNo,
                        });
                      }}
                    />
                  )}
                  name='mobileNo'
                  rules={{
                    required: true,
                    pattern: FormHelper.patterns.mobileNo,
                  }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Contact No'
                      type='number'
                      placeholder={
                        errors.contactNo
                          ? 'Please enter contact no'
                          : 'Contact No'
                      }
                      pattern={FormHelper.patterns.mobileNo}
                      hasError={!!errors.contactNo}
                      value={value}
                      onChange={contactNo => {
                        onChange(contactNo);
                        userStore.updateUser({
                          ...userStore.user,
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
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      type='mail'
                      label='Email'
                      placeholder={
                        errors.email ? 'Please enter email' : 'Email'
                      }
                      hasError={!!errors.email}
                      value={value}
                      onChange={email => {
                        onChange(email);
                        userStore.updateUser({
                          ...userStore.user,
                          email,
                        });
                      }}
                    />
                  )}
                  name='email'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputFile
                      label='Signature'
                      placeholder='File'
                      value={value ? value.fileName : ''}
                      onChange={async e => {
                        const signature = e.target.files[0];
                        onChange(signature);
                        userStore.updateUser({
                          ...userStore.user,
                          signature,
                        });
                      }}
                    />
                  )}
                  name='signature'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputFile
                      label='Picture'
                      placeholder='File'
                      value={value ? value.fileName : ''}
                      onChange={e => {
                        const picture = e.target.files[0];
                        onChange(picture);
                        userStore.updateUser({
                          ...userStore.user,
                          picture,
                        });
                      }}
                    />
                  )}
                  name='picture'
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
                            ? 'border-red'
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const validationLevel = e.target.value;
                          onChange(validationLevel);
                          userStore.updateUser({
                            ...userStore.user,
                            validationLevel: Number.parseInt(validationLevel),
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any) => (
                          <option key={item.description} value={item}>
                            {item}
                          </option>
                        ))}
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
                    <Form.InputDateTime
                      label='Birth date'
                      hasError={!!errors.dateOfBirth}
                      value={value}
                      onChange={dateOfBirth => {
                        onChange(dateOfBirth);
                        userStore.updateUser({
                          ...userStore.user,
                          dateOfBirth,
                        });
                      }}
                    />
                  )}
                  name='dateOfBirth'
                  rules={{required: true}}
                  defaultValue={userStore && userStore.user.dateOfBirth}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputDateTime
                      label='Marriage Anniversary'
                      hasError={!!errors.marriageAnniversary}
                      value={value}
                      onChange={marriageAnniversary => {
                        onChange(marriageAnniversary);
                        userStore.updateUser({
                          ...userStore.user,
                          marriageAnniversary,
                        });
                      }}
                    />
                  )}
                  name='marriageAnniversary'
                  rules={{required: true}}
                  defaultValue={userStore && userStore.user.marriageAnniversary}
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputDateTime
                      label='Exipre Date'
                      hasError={!!errors.exipreDate}
                      value={value}
                      onChange={exipreDate => {
                        onChange(exipreDate);
                        userStore.updateUser({
                          ...userStore.user,
                          exipreDate,
                        });
                      }}
                    />
                  )}
                  name='exipreDate'
                  rules={{required: true}}
                  defaultValue={userStore && userStore.user.exipreDate}
                />
                <List space={4} direction='row'>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        type='number'
                        label='Exipre Days'
                        placeholder={
                          errors.expireDays
                            ? 'Please enter exipre days'
                            : 'Exipre Days'
                        }
                        hasError={!!errors.expireDays}
                        value={value}
                        onChange={expireDays => {
                          onChange(expireDays);
                          userStore.updateUser({
                            ...userStore.user,
                            expireDays: Number.parseInt(expireDays),
                          });
                        }}
                      />
                    )}
                    name='expireDays'
                    rules={{required: false}}
                    defaultValue={userStore && userStore.user.expireDays}
                  />
                  <div className='mt-3'>
                    <Buttons.Button
                      size='medium'
                      type='solid'
                      onClick={() => {
                        const date = new Date(
                          dayjs(userStore && userStore.user.exipreDate)
                            .add(userStore && userStore.user.expireDays, 'days')
                            .format('YYYY-MM-DD HH:mm'),
                        );
                        userStore.updateUser({
                          ...userStore.user,
                          exipreDate: date,
                        });
                      }}
                    >
                      Apply Days
                    </Buttons.Button>
                  </div>
                </List>
                <div className='flex flex-row gap-4'>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Toggle
                        label='Confidential'
                        value={value}
                        onChange={confidential => {
                          onChange(confidential);
                          userStore.updateUser({
                            ...userStore.user,
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
                        label='Confirguration'
                        value={value}
                        onChange={confirguration => {
                          onChange(confirguration);
                          userStore.updateUser({
                            ...userStore.user,
                            confirguration,
                          });
                        }}
                      />
                    )}
                    name='confirguration'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </div>
                <Form.InputWrapper
                  label='Access Permission'
                  hasError={!!errors.environment}
                  style={{fontWeight: 'bold'}}
                >
                  <div className='flex flex-row gap-4'>
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='Mobile'
                          value={value}
                          onChange={mobile => {
                            onChange(mobile);
                            userStore.updateUser({
                              ...userStore.user,
                              systemInfo: {
                                ...userStore.user.systemInfo,
                                accessInfo: {
                                  ...userStore.user.systemInfo.accessInfo,
                                  mobile,
                                },
                              },
                            });
                          }}
                        />
                      )}
                      name='confirguration'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='Desktop'
                          value={value}
                          onChange={desktop => {
                            onChange(desktop);
                            userStore.updateUser({
                              ...userStore.user,
                              systemInfo: {
                                ...userStore.user.systemInfo,
                                accessInfo: {
                                  ...userStore.user.systemInfo.accessInfo,
                                  desktop,
                                },
                              },
                            });
                          }}
                        />
                      )}
                      name='confirguration'
                      rules={{required: false}}
                      defaultValue=''
                    />
                  </div>
                </Form.InputWrapper>
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputDateTime
                      label='Date Creation'
                      disabled={true}
                      value={value}
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
                      disabled={true}
                      value={value}
                    />
                  )}
                  name='dateActive'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Created By'
                      disabled={true}
                      placeholder={
                        errors.createdBy
                          ? 'Please enter created by'
                          : 'Created By'
                      }
                      hasError={!!errors.createdBy}
                      value={
                        userStore.user?.createdBy || loginStore.login?.userId
                      }
                    />
                  )}
                  name='createdBy'
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
                          userStore.updateUser({
                            ...userStore.user,
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
                      label='Version'
                      placeholder={
                        errors.version ? 'Please Enter Version' : 'Version'
                      }
                      hasError={!!errors.version}
                      value={userStore.user?.version}
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
                      label='Environment'
                      hasError={!!errors.environment}
                    >
                      <select
                        value={value}
                        disabled={
                          loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? true
                            : false
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const environment = e.target.value;
                          onChange(environment);
                          userStore.updateUser({
                            ...userStore.user,
                            environment,
                          });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : (userStore && userStore.user?.environment) ||
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
                onClick={handleSubmit(onSubmitUser)}
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
              setModalConfirm({show: false});
              switch (action) {
                case 'delete': {
                  userStore &&
                    userStore.UsersService.deleteUser({
                      input: {id: modalConfirm.id},
                    }).then((res: any) => {
                      if (res.removeUser.success) {
                        Toast.success({
                          message: `😊 ${res.removeUser.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          userStore.UsersService.userList(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          userStore.UsersService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else userStore.UsersService.userList();
                        // setTimeout(() => {
                        //   userStore.UsersService.userList();
                        // }, 2000);
                      }
                    });

                  break;
                }
                case 'update': {
                  userStore &&
                    userStore.UsersService.updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    }).then((res: any) => {
                      if (res.updateUser.success) {
                        Toast.success({
                          message: `😊 ${res.updateUser.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          userStore.loadUser(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          userStore.UsersService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else userStore.loadUser();
                      }
                    });
                  break;
                }
                case 'updateFields': {
                  userStore.UsersService.updateSingleFiled({
                    input: {
                      ...modalConfirm.data.fields,
                      _id: modalConfirm.data.id,
                    },
                  }).then((res: any) => {
                    setModalConfirm({show: false});
                    if (res.updateUser.success) {
                      Toast.success({
                        message: `😊 ${res.updateUser.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        userStore.loadUser(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        userStore.UsersService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else userStore.loadUser();
                      // setTimeout(() => {
                      //   window.location.reload();
                      // }, 2000);
                    }
                  });

                  break;
                }
                case 'versionUpgrade': {
                  userStore.updateUser({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActive: new Date(),
                  });
                  userStore.updateSelectedItems({
                    ...userStore.selectedItems,
                    roles: modalConfirm.data?.role,
                    labs: modalConfirm.data?.lab,
                    department: modalConfirm.data?.department,
                  });
                  setHideAddUser(!hideAddUser);
                  setValue('defaultLab', modalConfirm.data?.defaultLab);
                  setValue(
                    'defaultDepartment',
                    modalConfirm.data?.defaultDepartment,
                  );
                  setValue('role', modalConfirm.data?.role);
                  setValue('labs', modalConfirm.data?.lab);
                  setValue('department', modalConfirm.data?.department);
                  setValue('userId', modalConfirm.data?.userId);
                  setValue('fullName', modalConfirm.data?.fullName);
                  setValue('empCode', modalConfirm.data?.empCode);
                  setValue('reportingTo', modalConfirm.data?.reportingTo);
                  setValue('deginisation', modalConfirm.data?.deginisation);
                  setValue('mobileNo', modalConfirm.data?.mobileNo);
                  setValue('email', modalConfirm.data?.email);
                  setValue('status', modalConfirm.data?.status);
                  setValue('environment', modalConfirm.data?.environment);
                  setValue('userGroup', modalConfirm.data?.userGroup);

                  break;
                }
                case 'duplicate': {
                  userStore.updateUser({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: Number.parseInt(modalConfirm.data.version),
                    dateActive: new Date(),
                  });
                  userStore.updateSelectedItems({
                    ...userStore.selectedItems,
                    roles: modalConfirm.data?.role,
                    labs: modalConfirm.data?.lab,
                    department: modalConfirm.data?.department,
                  });
                  setHideAddUser(!hideAddUser);
                  setValue('defaultLab', modalConfirm.data?.defaultLab);
                  setValue(
                    'defaultDepartment',
                    modalConfirm.data?.defaultDepartment,
                  );
                  setValue('role', modalConfirm.data?.role);
                  setValue('labs', modalConfirm.data?.lab);
                  setValue('department', modalConfirm.data?.department);
                  setValue('userId', modalConfirm.data?.userId);
                  setValue('fullName', modalConfirm.data?.fullName);
                  setValue('empCode', modalConfirm.data?.empCode);
                  setValue('reportingTo', modalConfirm.data?.reportingTo);
                  setValue('deginisation', modalConfirm.data?.deginisation);
                  setValue('mobileNo', modalConfirm.data?.mobileNo);
                  setValue('email', modalConfirm.data?.email);
                  setValue('status', modalConfirm.data?.status);
                  setValue('environment', modalConfirm.data?.environment);
                  setValue('userGroup', modalConfirm.data?.userGroup);

                  break;
                }
                default: {
                  userStore &&
                    userStore.UsersService.uploadImage({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    }).then((res: any) => {
                      if (res.updateUserImages.success) {
                        Toast.success({
                          message: `😊 ${res.updateUserImages.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          userStore.loadUser(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          userStore.UsersService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else userStore.loadUser();
                        // setTimeout(() => {
                        //   window.location.reload();
                        // }, 1000);
                      }
                    });
                }
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />

          <ModalChangePasswordByAdmin
            {...modalChangePasswordByadmin}
            onClick={() => {
              const exipreDate = new Date(
                dayjs(new Date()).add(30, 'days').format('YYYY-MM-DD HH:mm'),
              );
              const body = {
                userId: modalChangePasswordByadmin.data.userId,
                password: userStore.changePassword?.confirmPassword,
                email: modalChangePasswordByadmin.data.email,
                exipreDate: exipreDate,
              };
              userStore &&
                userStore.UsersService.changepasswordByAdmin({
                  input: {...body},
                }).then(res => {
                  if (res.userChnagePasswordByAdmin.success) {
                    setModalChangePasswordByAdmin({show: false});
                    Toast.success({
                      message: `😊 ${res.userChnagePasswordByAdmin.message}`,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  } else {
                    Toast.error({
                      message: `😔 ${res.userChnagePasswordByAdmin.message}`,
                    });
                  }
                });
            }}
            onClose={() => {
              setModalChangePasswordByAdmin({show: false});
            }}
          />
        </div>
      </>
    );
  }),
);

export default Users;
