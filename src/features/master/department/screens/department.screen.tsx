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
  AutoCompleteFilterSingleSelect,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  MainPageHeading,
} from '@/library/components';
import { DepartmentList, AutoCompleteAuthorizedSignatory } from '../components';
import { lookupItems, lookupValue } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import { DeginisationHoc } from '../hoc';
import { useStores } from '@/stores';

import { RouterFlow } from '@/flows';
import { FormHelper } from '@/helper';
import { resetDepartment } from '../startup';
import * as XLSX from 'xlsx';
import _ from 'lodash';
import { AutoCompleteCompanyList } from '@/core-components';
import { toJS } from 'mobx';

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
      formState: { errors },
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddDepartment, setHideAddDepartment] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);

    useEffect(() => {
      // Default value initialization
      setValue('lab', loginStore.login.lab);
      // setValue('environment', departmentStore.department?.environment);
      setValue('status', departmentStore.department?.status);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departmentStore.department]);

    const onSubmitDepartment = () => {
      if (!departmentStore.checkExitsCode) {
        departmentStore.DepartmentService.adddepartment({
          input: isImport
            ? { isImport, arrImportRecords }
            : {
                arrImportRecords,
                ...departmentStore.department,
              },
        }).then(res => {
          if (res.createDepartment.success) {
            Toast.success({
              message: `😊 ${res.createDepartment.message}`,
            });
          }
        });
        setHideAddDepartment(true);
        reset();
        resetDepartment();
        setArrImportRecords([]);
        setIsImport(false);
        setIsVersionUpgrade(false);
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
          onPageSizeChange={(page, limit) => {
            departmentStore.fetchListDepartment(page, limit);
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            departmentStore.DepartmentService.filter({
              input: { type, filter, page, limit },
            });
            global.filter = {
              mode: 'filter',
              page,
              filter,
              type,
              limit,
            };
          }}
          onApproval={async records => {
            const isExists = await checkExistsRecords(records);
            if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'Update',
                data: { value: 'A', dataField: 'status', id: records._id },
                title: 'Are you sure?',
                body: 'Do you want to approved records?',
              });
            }
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [departmentStore.listDepartment],
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
            lab: item.Lab,
            code: item?.Code?.toUpperCase(),
            name: item.Name?.toUpperCase(),
            shortName: item['Short Name']?.toUpperCase(),
            hod: item.HOD?.toUpperCase(),
            authorizedSignatory: undefined,
            reportOrder: item['Report Order'],
            mobileNo: item['Mobile No'],
            contactNo: item['Contact No'],
            autoRelease: item['Auto Release'] === 'Yes' ? true : false,
            requireReceveInLab:
              item['Require Receve In Lab'] === 'Yes' ? true : false,
            requireScainIn: item['Require Scain In'] === 'Yes' ? true : false,
            routingDept: item['Routing Dept'] === 'Yes' ? true : false,
            openingTime: item['Opening Time'],
            closingTime: item['Closing Time'],
            fyiLine: item['Fyi Line'],
            workLine: item['Work Line'],
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
      fields = departmentStore.department,
      length = 0,
      status = 'A',
    ) => {
      const requiredFields = [
        'lab',
        'code',
        'name',
        'name',
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
      return departmentStore.DepartmentService.findByFields({
        input: {
          filter: {
            ..._.pick({ ...fields, status }, requiredFields),
          },
        },
      }).then(res => {
        if (
          res.findByFieldsDepartments?.success &&
          res.findByFieldsDepartments?.data?.length > length
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
        <MainPageHeading
          title={routerStore.selectedComponents?.title || ''}
          store={loginStore}
        />
        <div
          className='flex justify-end'
          style={{ position: 'fixed', right: '17px' }}
        >
          {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
            <Buttons.ButtonCircleAddRemoveBottom
              show={hideAddDepartment}
              onClick={() => setHideAddDepartment(!hideAddDepartment)}
            />
          )}
        </div>
        <div className='mx-auto'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddDepartment ? 'hidden' : 'shown')
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
              <Grid cols={3}>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Lab'
                        id='lab'
                        hasError={!!errors.lab}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          placeholder='Search by name'
                          disable={
                            isVersionUpgrade
                              ? true
                              : loginStore.login &&
                                loginStore.login.role !== 'SYSADMIN'
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
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Code'
                        id='code'
                        disabled={isVersionUpgrade}
                        hasError={!!errors.labCode}
                        placeholder={
                          errors.labCode ? 'Please Enter Code' : 'Code'
                        }
                        value={value}
                        onChange={codeValue => {
                          const code = codeValue.toUpperCase();
                          onChange(code);
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            code,
                          });
                        }}
                        onBlur={code => {
                          onChange(code);
                          departmentStore.DepartmentService.checkExitsLabEnvCode(
                            {
                              input: {
                                code,
                                env: departmentStore.department?.environment,
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
                      />
                    )}
                    name='labCode'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  {departmentStore.checkExitsCode && (
                    <span className='text-red-600 font-medium relative'>
                      Code already exits. Please use other code.
                    </span>
                  )}

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Name'
                        name='name'
                        hasError={!!errors.labName}
                        placeholder={
                          errors.labName ? 'Please Enter Name' : 'Name'
                        }
                        value={value}
                        onChange={departmentName => {
                          const name = departmentName.toUpperCase();
                          onChange(name);
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            name,
                          });
                        }}
                      />
                    )}
                    name='labName'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Short Name'
                        placeholder={
                          errors.shortName
                            ? 'Please Enter Short Name'
                            : 'Short Name'
                        }
                        hasError={!!errors.shortName}
                        value={value}
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
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper label='HOD' hasError={!!errors.hod}>
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          placeholder='Search by name'
                          data={{
                            list: userStore.userList,
                            displayKey: 'fullName',
                            findKey: 'fullName',
                          }}
                          displayValue={value}
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
                            });
                            if (
                              !departmentStore.selectedItems
                                ?.authorizedSignatory ||
                              departmentStore.selectedItems?.authorizedSignatory
                                ?.length === 0
                            )
                              departmentStore.updateSelectedItems({
                                ...departmentStore.selectedItems,
                                authorizedSignatory: [item],
                              });
                            userStore.updateUserList(userStore.userListCopy);
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='hod'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Authorized Signatory'
                        hasError={!!errors.authorizedSignatory}
                      >
                        <AutoCompleteAuthorizedSignatory
                          hasError={!!errors.authorizedSignatory}
                          onSelect={authorizedSignatory => {
                            departmentStore.updateDepartment({
                              ...departmentStore.department,
                              authorizedSignatory,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='authorizedSignatory'
                    rules={{ required: false }}
                    defaultValue={
                      departmentStore.selectedItems.authorizedSignatory
                    }
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Report Order'
                        placeholder={
                          errors.reportOrder
                            ? 'Please enter report order'
                            : 'Report Order'
                        }
                        type='number'
                        hasError={!!errors.reportOrder}
                        value={value}
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
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Mobile No'
                        placeholder={
                          errors.mobileNo ? 'Please Enter MobileNo' : 'MobileNo'
                        }
                        type='number'
                        hasError={!!errors.mobileNo}
                        pattern={FormHelper.patterns.mobileNo}
                        maxLength={10}
                        value={value}
                        onChange={mobileNo => {
                          onChange(mobileNo);
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            mobileNo,
                          });
                        }}
                        onBlur={mobileNo => {
                          if (mobileNo && mobileNo?.length !== 10) {
                            Toast.error({
                              message:
                                'Mobile Number should be exactly 10 digits',
                            });
                          }
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
                    render={({ field: { onChange, value } }) => (
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
                        value={value}
                        maxLength={10}
                        onChange={contactNo => {
                          onChange(contactNo);
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            contactNo,
                          });
                        }}
                        onBlur={contactNo => {
                          if (contactNo && contactNo?.length !== 10) {
                            Toast.error({
                              message:
                                'Contact Number should be exactly 10 digits',
                            });
                          }
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
                    render={({ field: { onChange, value } }) => (
                      <Form.Clock
                        label='Opening Time'
                        hasError={!!errors.openingTime}
                        value={value}
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
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Clock
                        label='Closing Time'
                        hasError={!!errors.closingTime}
                        value={value}
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
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Grid cols={4}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Toggle
                          label='Auto Release'
                          hasError={!!errors.autoRelease}
                          value={value}
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
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Toggle
                          label='Require receving in Lab'
                          hasError={!!errors.requireReceveInLab}
                          value={value}
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Toggle
                          label='Require Scain In'
                          hasError={!!errors.requireScainIn}
                          value={value}
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
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Toggle
                          label='Routing Dept'
                          hasError={!!errors.routingDept}
                          value={value}
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
                        label='FYI line'
                        placeholder={
                          errors.fyiLine ? 'Please Enter fyiLine' : 'fyiLine'
                        }
                        hasError={!!errors.fyiLine}
                        value={value}
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
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.MultilineInput
                        rows={2}
                        label='Work line'
                        placeholder={
                          errors.workLine ? 'Please Enter workLine' : 'workLine'
                        }
                        hasError={!!errors.workLine}
                        value={value}
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
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
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
                  window.location.reload();
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <div className='p-2 rounded-lg shadow-xl '>{tableView}</div>
          <ModalConfirm
            {...modalConfirm}
            click={(action: string) => {
              setModalConfirm({ show: false });
              switch (action) {
                case 'Delete': {
                  departmentStore.DepartmentService.deletedepartment({
                    input: { id: modalConfirm.id },
                  }).then((res: any) => {
                    if (res.removeDepartment.success) {
                      Toast.success({
                        message: `😊 ${res.removeDepartment.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        departmentStore.fetchListDepartment(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        departmentStore.DepartmentService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.type,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else departmentStore.fetchListDepartment();
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
                      if (global?.filter?.mode == 'pagination')
                        departmentStore.fetchListDepartment(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        departmentStore.DepartmentService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.type,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else departmentStore.fetchListDepartment();
                    }
                  });
                  break;
                }
              }
            }}
            onClose={() => setModalConfirm({ show: false })}
          />
        </div>
      </>
    );
  }),
);

export default Department;
