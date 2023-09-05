import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Form,
  List,
  Grid,
  Svg,
  Toast,
  ModalConfirm,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
} from '@/library/components';
import {RoleList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {RolesHoc} from '../hoc';
import {useStores} from '@/stores';
import _ from 'lodash';
import {RouterFlow} from '@/flows';
import {resetRole} from '../startup';
import * as XLSX from 'xlsx';
const Role = RolesHoc(
  observer(() => {
    const {loginStore, roleStore, routerStore} = useStores();
    const {
      control,
      formState: {errors},
      handleSubmit,
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddRole, setHideAddRole] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);

    useEffect(() => {
      // Default value initialization
      setValue('status', roleStore.role?.status);
      setValue('environment', roleStore.role?.environment);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roleStore.role]);

    const onSubmitRoles = () => {
      if (!roleStore.checkExitsCode) {
        roleStore.RoleService.addrole({
          input: isImport
            ? {isImport, arrImportRecords}
            : {isImport, ...roleStore.role},
        }).then(res => {
          if (res.createRole.success) {
            Toast.success({
              message: `😊 ${res.createRole.message}`,
            });
          }
          setHideAddRole(true);
          reset();
          resetRole();
        });
      } else {
        Toast.warning({
          message: '😔 Please enter all information!',
        });
      }
    };
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
            code: item?.Code,
            description: item.Description,
            environment: item?.Environment,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = roleStore.role,
      length = 0,
      status = 'A',
    ) => {
      //Pass required Field in Array
      return roleStore.RoleService.findByFields({
        input: {
          filter: {
            ..._.pick({...fields, status}, [
              'code',
              'description',
              'environment',
              'status',
            ]),
          },
        },
      }).then(res => {
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

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddRole}
            onClick={() => setHideAddRole(!hideAddRole)}
          />
        )}
        <div className=' mx-auto  flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl overflow-auto ' +
              (hideAddRole ? 'hidden' : 'shown')
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
                      <Form.Input
                        label='Code'
                        id='code'
                        hasError={!!errors.code}
                        placeholder={
                          errors.code ? 'Please Enter Code ' : 'Code'
                        }
                        value={value}
                        onChange={code => {
                          onChange(code);
                          roleStore.updateRole({
                            ...roleStore.role,
                            code: code.toUpperCase(),
                          });
                        }}
                        onBlur={code => {
                          roleStore.RoleService.checkExitsEnvCode({
                            input: {
                              code,
                              env: roleStore.role?.environment,
                            },
                          }).then(res => {
                            if (res.checkRoleExistsEnvCode.success) {
                              roleStore.setExitsCode(true);
                              Toast.error({
                                message: `😔 ${res.checkRoleExistsEnvCode.message}`,
                              });
                            } else roleStore.setExitsCode(false);
                          });
                        }}
                      />
                    )}
                    name='code'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  {roleStore.checkExitsCode && (
                    <span className='text-red-600 font-medium relative'>
                      Code already exits. Please use other code.
                    </span>
                  )}
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Description'
                        name='description'
                        hasError={!!errors.description}
                        placeholder={
                          errors.description
                            ? 'Please Enter Description'
                            : 'Description'
                        }
                        value={value}
                        onChange={description => {
                          onChange(description);
                          roleStore.updateRole({
                            ...roleStore.role,
                            description: description.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='description'
                    rules={{required: true}}
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
                            roleStore.updateRole({
                              ...roleStore.role,
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
                            roleStore.updateRole({
                              ...roleStore.role,
                              environment,
                            });
                            roleStore.RoleService.checkExitsEnvCode({
                              input: {
                                code: roleStore.role?.code,
                                env: environment,
                              },
                            }).then(res => {
                              if (res.checkRoleExistsEnvCode.success) {
                                roleStore.setExitsCode(true);
                                Toast.error({
                                  message: `😔 ${res.checkRoleExistsEnvCode.message}`,
                                });
                              } else roleStore.setExitsCode(false);
                            });
                          }}
                        >
                          <option selected>
                            {loginStore.login &&
                            loginStore.login.role !== 'SYSADMIN'
                              ? 'Select'
                              : roleStore.role?.environment || 'Select'}
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
                onClick={handleSubmit(onSubmitRoles)}
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
          <div className='p-2 rounded-lg shadow-xl'>
            <RoleList
              data={roleStore.listRole || []}
              totalSize={roleStore.listRoleCount}
              extraData={{
                lookupItems: routerStore.lookupItems,
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
                  body: 'Update role!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                roleStore.fetchListRole(page, limit);
                global.filter = {mode: 'pagination', page, limit};
              }}
              onFilter={(type, filter, page, limit) => {
                roleStore.RoleService.filter({
                  input: {type, filter, page, limit},
                });
                global.filter = {mode: 'filter', type, filter, page, limit};
              }}
              onApproval={async records => {
                const isExists = await checkExistsRecords(records);
                if (!isExists) {
                  setModalConfirm({
                    show: true,
                    type: 'Update',
                    data: {value: 'A', dataField: 'status', id: records._id},
                    title: 'Are you sure?',
                    body: 'Update Role!',
                  });
                }
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              if (action === 'Delete') {
                roleStore.RoleService.deleterole({
                  input: {id: modalConfirm.id},
                }).then((res: any) => {
                  if (res.removeRole.success) {
                    setModalConfirm({show: false});
                    Toast.success({
                      message: `😊 ${res.removeRole.message}`,
                    });
                    if (global?.filter?.mode == 'pagination')
                      roleStore.fetchListRole(
                        global?.filter?.page,
                        global?.filter?.limit,
                      );
                    else if (global?.filter?.mode == 'filter')
                      roleStore.RoleService.filter({
                        input: {
                          type: global?.filter?.type,
                          filter: global?.filter?.filter,
                          page: global?.filter?.page,
                          limit: global?.filter?.limit,
                        },
                      });
                    else roleStore.fetchListRole();
                  }
                });
              } else if (action === 'Update') {
                roleStore.RoleService.updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                }).then((res: any) => {
                  setModalConfirm({show: false});
                  if (res.updateRole.success) {
                    Toast.success({
                      message: `😊 ${res.updateRole.message}`,
                    });
                    if (global?.filter?.mode == 'pagination')
                      roleStore.fetchListRole(
                        global?.filter?.page,
                        global?.filter?.limit,
                      );
                    else if (global?.filter?.mode == 'filter')
                      roleStore.RoleService.filter({
                        input: {
                          type: global?.filter?.type,
                          filter: global?.filter?.filter,
                          page: global?.filter?.page,
                          limit: global?.filter?.limit,
                        },
                      });
                    else roleStore.fetchListRole();
                  }
                });
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />
        </div>
      </>
    );
  }),
);

export default Role;
