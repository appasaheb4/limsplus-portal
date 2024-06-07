import React, { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  MainPageHeading,
  AutoCompleteFilterMultiSelectSelectedTopDisplay,
  ModalPostalCode,
  Icons,
} from '@/library/components';
import { CorporateClient, DeliveryMode } from '../components';
import { dayjs, lookupItems, lookupValue } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import { CorporateClientsHoc } from '../hoc';
import { useStores } from '@/stores';
import { FormHelper } from '@/helper';
import { RouterFlow } from '@/flows';
import { resetCorporateClient } from '../startup';
import * as XLSX from 'xlsx';
import { toJS } from 'mobx';
import { MultiSelect } from '@/core-components';

const CorporateClients = CorporateClientsHoc(
  observer(() => {
    const {
      loginStore,
      labStore,
      corporateClientsStore,
      routerStore,
      loading,
      administrativeDivisions,
      salesTeamStore,
      masterPanelStore,
      interfaceManagerStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
      resetField,
    } = useForm();

    const [isPostalCode, setIsPostalCodeData] = useState(false);
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddView, setHideAddView] = useState<boolean>(true);
    const [interfaceManagerList, setInterfaceManagerList] = useState([]);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);
    const [isExistsRecord, setIsExistsRecord] = useState<boolean>(false);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          !hideAddView &&
          !corporateClientsStore.corporateClients?.postalCode &&
          event.key === 'F5'
        ) {
          event.preventDefault();
          setIsPostalCodeData(true);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideAddView]);

    useEffect(() => {
      // Default value initialization
      setValue(
        'corporateCode',
        corporateClientsStore.corporateClients?.corporateCode,
      );
      setValue(
        'corporateName',
        corporateClientsStore.corporateClients?.corporateName,
      );
      setValue('status', corporateClientsStore.corporateClients?.status);
      // setValue(
      //   'environment',
      //   corporateClientsStore.corporateClients?.environment,
      // );
      setValue('invoiceAc', corporateClientsStore.corporateClients?.invoiceAc);
      setValue('acType', corporateClientsStore.corporateClients?.acType);
      setValue('acClass', corporateClientsStore.corporateClients?.acClass);
      setValue('billingOn', corporateClientsStore.corporateClients?.billingOn);
      setValue(
        'billingFrequency',
        corporateClientsStore.corporateClients?.billingFrequency,
      );
      setValue(
        'customerGroup',
        corporateClientsStore.corporateClients?.customerGroup,
      );
      setValue('category', corporateClientsStore.corporateClients?.category);
      setValue(
        'postalCode',
        corporateClientsStore.corporateClients?.postalCode,
      );
      setValue('country', corporateClientsStore.corporateClients?.country);
      setValue('state', corporateClientsStore.corporateClients?.state);
      setValue('district', corporateClientsStore.corporateClients?.district);
      setValue('city', corporateClientsStore.corporateClients?.city);
      setValue('area', corporateClientsStore.corporateClients?.area);
      setValue(
        'isBalanceCheck',
        corporateClientsStore.corporateClients?.isBalanceCheck,
      );
      setValue(
        'reportPriority',
        corporateClientsStore.corporateClients?.reportPriority,
      );
      setValue(
        'deliveryMode',
        corporateClientsStore.corporateClients?.deliveryMode,
      );
      setValue(
        'dateExpire',
        corporateClientsStore.corporateClients?.dateExpire,
      );
      setValue('version', corporateClientsStore.corporateClients?.version);
      setValue(
        'dateCreation',
        corporateClientsStore.corporateClients?.dateCreation,
      );
      setValue(
        'dateActive',
        corporateClientsStore.corporateClients?.dateActive,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [corporateClientsStore.corporateClients]);

    const onSubmitCoporateClients = async () => {
      if (!isExistsRecord) {
        if (
          !corporateClientsStore.corporateClients?.existsVersionId &&
          !corporateClientsStore.corporateClients?.existsRecordId
        ) {
          corporateClientsStore.corporateClientsService
            .addCorporateClients({
              input: isImport
                ? { isImport, arrImportRecords }
                : {
                    isImport,
                    ...corporateClientsStore.corporateClients,
                    enteredBy: loginStore.login.userId,
                  },
            })
            .then(res => {
              if (res.createCorporateClient.success) {
                Toast.success({
                  message: `😊 ${res.createCorporateClient.message}`,
                });
                setIsImport(false);
                setArrImportRecords([]);
              }
            });
        } else if (
          corporateClientsStore.corporateClients?.existsVersionId &&
          !corporateClientsStore.corporateClients?.existsRecordId
        ) {
          corporateClientsStore.corporateClientsService
            .versionUpgradeCorporateClient({
              input: {
                ...corporateClientsStore.corporateClients,
                enteredBy: loginStore.login.userId,
                isImport: false,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.versionUpgradeCorporateClient.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradeCorporateClient.message}`,
                });
              }
            });
          setIsVersionUpgrade(false);
        } else if (
          !corporateClientsStore.corporateClients?.existsVersionId &&
          corporateClientsStore.corporateClients?.existsRecordId
        ) {
          const isExits = await checkExistsRecords();
          if (!isExits) {
            corporateClientsStore.corporateClientsService
              .duplicateCorporateClient({
                input: {
                  ...corporateClientsStore.corporateClients,
                  isImport: false,
                  enteredBy: loginStore.login.userId,
                  __typename: undefined,
                },
              })
              .then(res => {
                if (res.duplicateCorporateClient.success) {
                  Toast.success({
                    message: `😊 ${res.duplicateCorporateClient.message}`,
                  });
                }
              });
          } else {
            Toast.warning({
              message: '😔 Duplicate records available',
            });
          }
        }
        setHideAddView(true);
        reset();
        resetCorporateClient();
      } else {
        Toast.warning({
          message: '😔 Duplicate records available',
        });
      }
    };

    const getTemplateForImportList = (interfaceType: string) => {
      interfaceManagerStore.interfaceManagerService
        .findByFields({
          input: {
            filter: {
              interfaceType,
            },
          },
        })
        .then(res => {
          if (res.findByFieldsInterfaceManager.success) {
            setInterfaceManagerList(res.findByFieldsInterfaceManager.data);
          }
        });
    };

    const onUpdateSingleField = payload => {
      corporateClientsStore.corporateClientsService
        .updateSingleFiled({
          input: {
            ...payload,
          },
        })
        .then((res: any) => {
          if (global?.filter?.mode == 'pagination')
            corporateClientsStore.fetchCorporateClients(
              global?.filter?.page,
              global?.filter?.limit,
            );
          else if (global?.filter?.mode == 'filter')
            corporateClientsStore.corporateClientsService.filter({
              input: {
                type: global?.filter?.type,
                filter: global?.filter?.filter,
                page: global?.filter?.page,
                limit: global?.filter?.limit,
              },
            });
          else corporateClientsStore.fetchCorporateClients();
        });
    };

    const tableView = useMemo(
      () => (
        <CorporateClient
          data={corporateClientsStore.listCorporateClients || []}
          totalSize={corporateClientsStore.listCoporateClientsCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listLabs: labStore.listLabs,
            listAdministrativeDiv:
              administrativeDivisions.listAdministrativeDiv,
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
          onPageSizeChange={(page, limit) => {
            corporateClientsStore.fetchCorporateClients(page, limit);
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            corporateClientsStore.corporateClientsService.filter({
              input: { type, filter, page, limit },
            });
            global.filter = {
              mode: 'filter',
              type,
              page,
              filter,
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
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [corporateClientsStore.listCorporateClients],
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
            corporateCode: item['Client Code'],
            corporateName: item['Client Name'],
            invoiceAc: item['Invoice Ac'],
            acType: item['Ac Type'],
            acClass: item['Ac Class'],
            billingOn: item['Billing On'],
            billingFrequency: item['Billing Frequency'],
            customerGroup: item['Customer Group'],
            category: item?.Category,
            postalCode: item['Postal Code'],
            country: item?.Country,
            state: item?.State,
            district: item?.District,
            city: item?.City,
            area: item?.Area,
            address: item.Address,
            sbu: item.SBU,
            zone: item.Zone,
            creditLimit: item['Credit Limit'],
            consumedLimit: item['Consumed Limit'],
            salesTerritoRy: item['Sales Territory'],
            telephone: item.Telephone,
            mobileNo: item['Mobile No'],
            email: item.Email,
            reportPriority: item['Report Priority'],
            deliveryMode: undefined,
            confidential: item.Confidential === 'Yes' ? true : false,
            specificFormat: item['Specific Format'] === 'Yes' ? true : false,
            isEmployeeCode: item['Employee Code'] === 'Yes' ? true : false,
            isPredefinedPanel:
              item['Predefined Panel'] === 'Yes' ? true : false,
            isBalanceCheck: item['Balance Check'] === 'Yes' ? true : false,
            urgent: item.Urgent === 'Yes' ? true : false,
            templateForImport: item['Template For Import'],
            templateForExport: item['Template For Export'],
            panelList: undefined,
            info: item.Info,
            fyiLine: item['FYI Line'],
            workLine: item['Work line'],
            reportFormat: item['Report Format'] === 'Yes' ? true : false,
            dateCreation: new Date(),
            dateActive: new Date(),
            dateExpire: new Date(
              dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD hh:mm:ss'),
            ),
            version: 1,
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
      fields: any = corporateClientsStore.corporateClients,
      isSingleCheck = false,
    ) => {
      const requiredFields = ['corporateCode', 'corporateName', 'status'];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields }[item])) return item;
      });
      if (isEmpty && !isSingleCheck) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      return corporateClientsStore.corporateClientsService
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
          if (res.findByFieldsCorporateClient?.success) {
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
              show={hideAddView}
              onClick={() => setHideAddView(!hideAddView)}
            />
          )}
        </div>
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddView ? 'hidden' : 'shown')
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
                      <Form.Input
                        label='Client Code'
                        disabled={isVersionUpgrade}
                        placeholder={
                          errors.corporateCode
                            ? 'Please Enter Coporate Code'
                            : 'Coporate Code'
                        }
                        hasError={!!errors.corporateCode}
                        value={value}
                        onChange={corporateCode => {
                          onChange(corporateCode);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            corporateCode: corporateCode.toUpperCase(),
                          });
                        }}
                        onBlur={async corporateCode => {
                          if (
                            !corporateClientsStore.corporateClients
                              ?.existsVersionId
                          ) {
                            await checkExistsRecords(
                              {
                                corporateCode,
                              },
                              true,
                            );
                          }
                        }}
                      />
                    )}
                    name='corporateCode'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  {corporateClientsStore.checkExistsEnvCode && (
                    <span className='text-red-600 font-medium relative'>
                      Code already exits. Please use other code.
                    </span>
                  )}
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Client Name'
                        disabled={isVersionUpgrade}
                        placeholder={
                          errors.corporateName
                            ? 'Please Enter Coporate Name'
                            : 'Coporate Name'
                        }
                        hasError={!!errors.corporateName}
                        value={value}
                        onChange={corporateName => {
                          onChange(corporateName);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            corporateName: corporateName.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='corporateName'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Invoice Ac'
                        placeholder={
                          errors.invoiceAc
                            ? 'Please Enter Invoice AC'
                            : 'Invoice AC'
                        }
                        disabled={true}
                        hasError={!!errors.invoiceAc}
                        value={value.toString()}
                        onChange={invoiceAc => {
                          onChange(invoiceAc);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            invoiceAc: Number.parseInt(invoiceAc),
                          });
                        }}
                      />
                    )}
                    name='invoiceAc'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Ac Type'
                        hasError={!!errors.acType}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.acType ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const acType = e.target.value;
                            onChange(acType);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              acType,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(routerStore.lookupItems, 'AC_TYPE').map(
                            (item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='acType'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Ac Class'
                        hasError={!!errors.acClass}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.acClass ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const acClass = e.target.value;
                            onChange(acClass);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              acClass,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(routerStore.lookupItems, 'AC_CLASS').map(
                            (item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='acClass'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Billing on'
                        hasError={!!errors.billingOn}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.billingOn
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const billingOn = e.target.value;
                            onChange(billingOn);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              billingOn,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'BILLING_ON',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='billingOn'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Billing Frequency'
                        hasError={!!errors.billingFrequency}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.billingFrequency
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const billingFrequency = e.target.value;
                            onChange(billingFrequency);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              billingFrequency,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'BILLING_FREQUENCY',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='billingFrequency'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Customer Group'
                        hasError={!!errors.customerGroup}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.customerGroup
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const customerGroup = e.target.value;
                            onChange(customerGroup);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              customerGroup,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'CUSTOMER_GROUP',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='customerGroup'
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
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.category ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const category = e.target.value;
                            onChange(category);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              category,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(routerStore.lookupItems, 'CATEGORY').map(
                            (item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ),
                          )}
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
                      <Form.Input
                        label='Postal Code'
                        hasError={!!errors.postalCode}
                        placeholder='Search....'
                        value={value}
                        //disabled={true}
                        onChange={postalCode => {
                          onChange(postalCode);
                          if (postalCode?.length == 6) {
                            labStore.LabService?.getAddressDetailsByPincode(
                              postalCode,
                            );
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              postalCode,
                            });
                            setIsPostalCodeData(true);
                          }
                        }}
                      />
                    )}
                    name='postalCode'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Country'
                        hasError={!!errors.country}
                        placeholder='Country'
                        value={value}
                        disabled={true}
                        onChange={country => {
                          onChange(country);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            country: country?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='country'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='State'
                        hasError={!!errors.state}
                        placeholder='State'
                        value={value}
                        disabled={true}
                        onChange={state => {
                          onChange(state);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            state: state?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='state'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='District'
                        hasError={!!errors.district}
                        placeholder='District'
                        value={value}
                        disabled={true}
                        onChange={district => {
                          onChange(district);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            district: district?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='district'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='City'
                        hasError={!!errors.city}
                        placeholder='City'
                        value={value}
                        disabled={true}
                        onChange={city => {
                          onChange(city);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            city: city?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='city'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Area'
                        hasError={!!errors.area}
                        placeholder='Area'
                        value={value}
                        disabled={true}
                        onChange={area => {
                          onChange(area);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            area: area?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='area'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.MultilineInput
                        rows={2}
                        label='Address'
                        placeholder={
                          errors.address ? 'Please enter address' : 'Address'
                        }
                        hasError={!!errors.address}
                        value={value}
                        onChange={address => {
                          onChange(address);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            address,
                          });
                        }}
                      />
                    )}
                    name='address'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Credit Limit'
                        placeholder={
                          errors.creditLimit
                            ? 'Please enter credit limit'
                            : 'Credit Limit'
                        }
                        type='number'
                        hasError={!!errors.creditLimit}
                        value={value}
                        onChange={creditLimit => {
                          onChange(creditLimit);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            creditLimit: Number.parseFloat(creditLimit),
                          });
                        }}
                      />
                    )}
                    name='creditLimit'
                    rules={{
                      required: false,
                    }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Consumed Limit'
                        placeholder={
                          errors.consumedLimit
                            ? 'Please enter consumed limit'
                            : 'Consumed Limit'
                        }
                        type='number'
                        hasError={!!errors.consumedLimit}
                        value={value}
                        disabled={true}
                        onChange={consumedLimit => {
                          onChange(consumedLimit);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            consumedLimit: Number.parseFloat(consumedLimit),
                          });
                        }}
                      />
                    )}
                    name='consumedLimit'
                    rules={{
                      required: false,
                    }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='SBU'
                        placeholder={errors.sbu ? 'Please Enter sbu' : 'SBU'}
                        hasError={!!errors.sbu}
                        value={value}
                        onChange={sbu => {
                          onChange(sbu);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            sbu,
                          });
                        }}
                      />
                    )}
                    name='sbu'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Zone'
                        placeholder={errors.zone ? 'Please Enter Zone' : 'Zone'}
                        hasError={!!errors.zone}
                        value={value}
                        onChange={zone => {
                          onChange(zone);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            zone,
                          });
                        }}
                      />
                    )}
                    name='zone'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Sales Territory'
                        hasError={!!errors.salesTerritory}
                      >
                        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          loader={loading}
                          placeholder='Search by sales territory'
                          data={{
                            list: _.uniqBy(
                              salesTeamStore.listSalesTeam,
                              'salesTerritory',
                            ),
                            displayKey: ['salesTerritory'],
                          }}
                          hasError={!!errors.salesTerritory}
                          displayValue={value}
                          onFilter={(value: string) => {
                            salesTeamStore.salesTeamService.filterByFields({
                              input: {
                                filter: {
                                  fields: ['salesTerritory'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            });
                          }}
                          onSelect={item => {
                            onChange(item.salesTerritory);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              salesTerritoRy: item.salesTerritory,
                            });
                            salesTeamStore.updateSalesTeamList(
                              salesTeamStore.listSalesTeamCopy,
                            );
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='salesTerritory'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Telephone'
                        placeholder={
                          errors.telephone
                            ? 'Please Enter Telephone'
                            : 'Telephone'
                        }
                        hasError={!!errors.telephone}
                        value={value}
                        onChange={telephone => {
                          onChange(telephone);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            telephone,
                          });
                        }}
                        onBlur={telephone => {
                          if (telephone && telephone?.length === 10) {
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              telephone,
                            });
                          } else if (telephone) {
                            // Show an error message only if the input has a value (not empty)
                            Toast.error({
                              message:
                                'Telephone Number should be exactly 10 digits',
                            });
                          }
                        }}
                      />
                    )}
                    name='telephone'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Mobile No'
                        placeholder={
                          errors.mobileNo
                            ? 'Please Enter Mobile No'
                            : 'Mobile No'
                        }
                        type='number'
                        pattern={FormHelper.patterns.mobileNo}
                        hasError={!!errors.mobileNo}
                        value={value}
                        onChange={mobileNo => {
                          onChange(mobileNo);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            mobileNo,
                          });
                        }}
                        onBlur={mobileNo => {
                          if (mobileNo && mobileNo?.length === 10) {
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              mobileNo,
                            });
                          } else if (mobileNo) {
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
                        label='Email'
                        placeholder='Email'
                        type='number'
                        pattern={FormHelper.patterns.email}
                        hasError={!!errors.email}
                        value={value}
                        onChange={email => {
                          onChange(email);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            email,
                          });
                        }}
                      />
                    )}
                    name='email'
                    rules={{
                      required: false,
                      pattern: FormHelper.patterns.mobileNo,
                    }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Report To'
                        hasError={!!errors.reportTo}
                      >
                        <MultiSelect
                          options={lookupItems(
                            routerStore.lookupItems,
                            'REPORT_TO',
                          ).map(item => item.code)}
                          selectedItems={
                            corporateClientsStore.corporateClients.reportTo
                          }
                          onSelect={reportTo => {
                            console.log({ reportTo });

                            onChange(reportTo[0]);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              reportTo,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='reportTo'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Form.InputWrapper label='Report To Mobile Number'>
                    <Grid cols={3}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Input
                            placeholder='Name'
                            value={corporateClientsStore.reportToMobiles?.name}
                            onChange={name => {
                              onChange(name);
                              corporateClientsStore.updateReportToMobileFields({
                                ...corporateClientsStore.reportToMobiles,
                                name,
                              });
                            }}
                          />
                        )}
                        name='reportToMobileName'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Input
                            placeholder='Mobile Number'
                            value={
                              corporateClientsStore.reportToMobiles?.mobileNo
                            }
                            onChange={mobileNo => {
                              onChange(mobileNo);
                              corporateClientsStore.updateReportToMobileFields({
                                ...corporateClientsStore.reportToMobiles,
                                mobileNo,
                              });
                            }}
                          />
                        )}
                        name='reportToMobileNo'
                        rules={{ required: false }}
                        defaultValue=''
                      />

                      <div className='mt-2 flex flex-row justify-between'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          onClick={() => {
                            const name =
                              corporateClientsStore.reportToMobiles?.name;
                            const mobileNo =
                              corporateClientsStore.reportToMobiles?.mobileNo;
                            let reportToMobiles =
                              corporateClientsStore.corporateClients
                                ?.reportToMobiles || [];
                            if (name === undefined || mobileNo === undefined)
                              return alert(
                                'Please enter name and mobile number.',
                              );
                            if (mobileNo !== undefined) {
                              reportToMobiles !== undefined
                                ? reportToMobiles.push({
                                    name,
                                    mobileNo,
                                  })
                                : (reportToMobiles = [
                                    {
                                      name,
                                      mobileNo,
                                    },
                                  ]);
                              corporateClientsStore.updateCorporateClients({
                                ...corporateClientsStore.corporateClients,
                                reportToMobiles,
                              });
                              corporateClientsStore.updateReportToMobileFields({
                                name: '',
                                email: '',
                              });
                            }
                          }}
                        >
                          <Icons.EvaIcon icon='plus-circle-outline' />
                          {'Add'}
                        </Buttons.Button>
                      </div>
                      <div className='clearfix'></div>
                    </Grid>

                    <List space={2} direction='row' justify='center'>
                      <div>
                        {corporateClientsStore.corporateClients?.reportToMobiles?.map(
                          (item, index) => (
                            <div className='mb-2' key={index}>
                              <Buttons.Button
                                size='medium'
                                type='solid'
                                icon={Svg.Remove}
                                onClick={() => {
                                  const firstArr =
                                    corporateClientsStore.corporateClients?.reportToMobiles?.slice(
                                      0,
                                      index,
                                    ) || [];
                                  const secondArr =
                                    corporateClientsStore.corporateClients?.reportToMobiles?.slice(
                                      index + 1,
                                    ) || [];
                                  const finalArray = [
                                    ...firstArr,
                                    ...secondArr,
                                  ];
                                  corporateClientsStore.updateCorporateClients({
                                    ...corporateClientsStore.corporateClients,
                                    reportToMobiles: finalArray,
                                  });
                                }}
                              >
                                {`${item.name} - ${item.email}`}
                              </Buttons.Button>
                            </div>
                          ),
                        )}
                      </div>
                    </List>
                  </Form.InputWrapper>

                  <Form.InputWrapper label='Report To Email'>
                    <Grid cols={3}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Input
                            placeholder='Name'
                            value={corporateClientsStore.reportToEmails?.name}
                            onChange={name => {
                              onChange(name);
                              corporateClientsStore.updateReportToEmailFields({
                                ...corporateClientsStore.reportToEmails,
                                name,
                              });
                            }}
                          />
                        )}
                        name='reportToEmailName'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Input
                            placeholder='Email'
                            value={corporateClientsStore.reportToEmails?.email}
                            onChange={email => {
                              onChange(email);
                              corporateClientsStore.updateReportToEmailFields({
                                ...corporateClientsStore.reportToEmails,
                                email,
                              });
                            }}
                          />
                        )}
                        name='reportToEmail'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <div className='mt-2 flex flex-row justify-between'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          onClick={() => {
                            const name =
                              corporateClientsStore.reportToEmails?.name;
                            const email =
                              corporateClientsStore.reportToEmails?.email;
                            let reportToEmails =
                              corporateClientsStore.corporateClients
                                ?.reportToEmails || [];
                            if (name === undefined || email === undefined)
                              return alert('Please enter name and email.');
                            if (email !== undefined) {
                              reportToEmails !== undefined
                                ? reportToEmails.push({
                                    name,
                                    email,
                                  })
                                : (reportToEmails = [
                                    {
                                      name,
                                      email,
                                    },
                                  ]);
                              corporateClientsStore.updateCorporateClients({
                                ...corporateClientsStore.corporateClients,
                                reportToEmails,
                              });
                              corporateClientsStore.updateReportToEmailFields({
                                name: '',
                                email: '',
                              });
                            }
                          }}
                        >
                          <Icons.EvaIcon icon='plus-circle-outline' />
                          {'Add'}
                        </Buttons.Button>
                      </div>
                      <div className='clearfix'></div>
                    </Grid>

                    <List space={2} direction='row' justify='center'>
                      <div>
                        {corporateClientsStore.corporateClients?.reportToEmails?.map(
                          (item, index) => (
                            <div className='mb-2' key={index}>
                              <Buttons.Button
                                size='medium'
                                type='solid'
                                icon={Svg.Remove}
                                onClick={() => {
                                  const firstArr =
                                    corporateClientsStore.corporateClients?.reportToEmails?.slice(
                                      0,
                                      index,
                                    ) || [];
                                  const secondArr =
                                    corporateClientsStore.corporateClients?.reportToEmails?.slice(
                                      index + 1,
                                    ) || [];
                                  const finalArray = [
                                    ...firstArr,
                                    ...secondArr,
                                  ];
                                  corporateClientsStore.updateCorporateClients({
                                    ...corporateClientsStore.corporateClients,
                                    reportToEmails: finalArray,
                                  });
                                }}
                              >
                                {`${item.name} - ${item.email}`}
                              </Buttons.Button>
                            </div>
                          ),
                        )}
                      </div>
                    </List>
                  </Form.InputWrapper>

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Report Priority'
                        hasError={!!errors.reportPriority}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.reportPriority
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const reportPriority = e.target.value;
                            onChange(reportPriority);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              reportPriority,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'REPORT_PRIORITY',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='reportPriority'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Delivery Mode'
                        hasError={!!errors.deliveryMode}
                      >
                        <DeliveryMode
                          lookupField='DELIVERY_METHOD'
                          onSelect={deliveryMode => {
                            onChange(deliveryMode);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              deliveryMode,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='deliveryMode'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Template for Import'
                        hasError={!!errors.templateForImport}
                      >
                        <select
                          value={value}
                          onFocus={() =>
                            getTemplateForImportList('IMPORT_FILE')
                          }
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.templateForImport
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const templateForImport = e.target.value;
                            onChange(templateForImport);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              templateForImport,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {interfaceManagerList.map(
                            (item: any, index: number) => (
                              <option key={index} value={item.instrumentType}>
                                {item?.instrumentType +
                                  ' - ' +
                                  item?.instrumentName}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='templateForImport'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Template for Export'
                        hasError={!!errors.templateForExport}
                      >
                        <select
                          value={value}
                          onFocus={() =>
                            getTemplateForImportList('EXPORT_FILE')
                          }
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.templateForExport
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const templateForExport = e.target.value;
                            onChange(templateForExport);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              templateForExport,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {interfaceManagerList.map(
                            (item: any, index: number) => (
                              <option key={index} value={item.instrumentType}>
                                {item?.instrumentType +
                                  ' - ' +
                                  item?.instrumentName}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='templateForExport'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label='Panel List'
                        hasError={!!errors.panelList}
                      >
                        <AutoCompleteFilterMultiSelectSelectedTopDisplay
                          loader={false}
                          placeholder='Search by code'
                          dynamicCheck='panelCode'
                          disable={
                            !corporateClientsStore.corporateClients
                              ?.isPredefinedPanel
                          }
                          data={{
                            list:
                              masterPanelStore.listMasterPanel?.slice(0, 10) ||
                              [],
                            selected:
                              corporateClientsStore.selectedItems?.panelList,
                            displayKey: ['panelCode', 'panelName'],
                          }}
                          hasError={!!errors.panelList}
                          onUpdate={item => {
                            const panelList =
                              corporateClientsStore.selectedItems?.panelList;
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              panelList: _.map(panelList, o =>
                                _.pick(o, ['_id', 'panelCode', 'panelName']),
                              ),
                            });
                          }}
                          onFilter={(value: string) => {
                            masterPanelStore.masterPanelService.filterByFieldsSpecificPLab(
                              {
                                input: {
                                  filter: {
                                    lab: loginStore.login?.lab,
                                    fields: ['panelCode', 'panelName'],
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
                            let panelList =
                              corporateClientsStore.selectedItems?.panelList;
                            if (!item.selected) {
                              if (panelList && panelList.length > 0) {
                                panelList.push(item);
                              } else panelList = [item];
                            } else {
                              panelList = panelList?.filter(items => {
                                return items._id !== item._id;
                              });
                            }
                            corporateClientsStore.updateSelectedItems({
                              ...corporateClientsStore.selectedItems,
                              panelList,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='panelList'
                    rules={{
                      required:
                        corporateClientsStore.corporateClients
                          ?.isPredefinedPanel ?? false,
                    }}
                    defaultValue={masterPanelStore.listMasterPanel}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Info'
                        placeholder={errors.info ? 'Please Enter INFO' : 'INFO'}
                        hasError={!!errors.info}
                        value={value}
                        onChange={info => {
                          onChange(info);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            info,
                          });
                        }}
                      />
                    )}
                    name='info'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Grid cols={4}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Toggle
                          label='Confidential'
                          hasError={!!errors.confidential}
                          value={value}
                          onChange={confidential => {
                            onChange(confidential);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
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
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              urgent,
                            });
                          }}
                        />
                      )}
                      name='urgent'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Toggle
                          label='Predefined Panel'
                          hasError={!!errors.isPredefinedPanel}
                          value={value}
                          onChange={isPredefinedPanel => {
                            onChange(isPredefinedPanel);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              isPredefinedPanel,
                              priceList: [],
                            });
                            corporateClientsStore.updateSelectedItems({
                              ...corporateClientsStore.selectedItems,
                              panelList: [],
                            });
                            resetField('panelList');
                          }}
                        />
                      )}
                      name='isPredefinedPanel'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Toggle
                          label='Employee Code'
                          hasError={!!errors.isEmployeeCode}
                          value={value}
                          onChange={isEmployeeCode => {
                            onChange(isEmployeeCode);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              isEmployeeCode,
                            });
                          }}
                        />
                      )}
                      name='isEmployeeCode'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                  </Grid>
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='FYI Line'
                        placeholder={
                          errors.fyiLine ? 'Please Enter FyiLine' : 'FyiLine'
                        }
                        hasError={!!errors.fyiLine}
                        value={value}
                        onChange={fyiLine => {
                          onChange(fyiLine);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
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
                      <Form.Input
                        label='Work Line'
                        placeholder={
                          errors.workLine ? 'Plese Enter WorkLine' : 'WorkLine'
                        }
                        hasError={!!errors.workLine}
                        value={value}
                        onChange={workLine => {
                          onChange(workLine);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            workLine,
                          });
                        }}
                      />
                    )}
                    name='workLine'
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
                            ? 'Please Enter Date Creation '
                            : 'Created By'
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
                        hasError={!!errors.dateActive}
                        placeholder={
                          errors.dateActive
                            ? 'Please Enter Date Active'
                            : 'Date Active'
                        }
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
                        hasError={!!errors.dateExpire}
                        placeholder={
                          errors.dateExpire
                            ? 'Please Enter Date Expire'
                            : 'Date Expire'
                        }
                        value={value}
                        onChange={dateExpire => {
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
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
                    render={({ field: { onChange } }) => (
                      <Form.Input
                        label='Entered By'
                        hasError={!!errors.enteredBy}
                        placeholder={
                          errors.enteredBy
                            ? 'Please Enter Entered By'
                            : 'Entered By'
                        }
                        value={loginStore.login?.userId}
                        disabled={true}
                      />
                    )}
                    name='enteredBy'
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
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
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
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
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
                          disabled={
                            isVersionUpgrade
                              ? true
                              : loginStore.login &&
                                loginStore.login.role !== 'ADMINISTRATOR'
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
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              environment,
                            });
                            if (
                              !corporateClientsStore.corporateClients
                                ?.existsVersionId
                            ) {
                              corporateClientsStore.corporateClientsService
                                .checkExistsEnvCode({
                                  input: {
                                    code: corporateClientsStore.corporateClients
                                      ?.corporateCode,
                                    env: environment,
                                  },
                                })
                                .then(res => {
                                  if (
                                    res.checkCorporateClientExistsRecord.success
                                  ) {
                                    corporateClientsStore.updateExistsEnvCode(
                                      true,
                                    );
                                    Toast.error({
                                      message: `😔 ${res.checkCorporateClientExistsRecord.message}`,
                                    });
                                  } else
                                    corporateClientsStore.updateExistsEnvCode(
                                      false,
                                    );
                                });
                            }
                          }}
                        >
                          <option selected>
                            {loginStore.login &&
                            loginStore.login.role !== 'ADMINISTRATOR'
                              ? 'Select'
                              : corporateClientsStore.corporateClients
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
                    rules={{ required: true }}
                    defaultValue=''
                  /> */}
                  <Grid cols={4}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Toggle
                          label='Specific Format'
                          hasError={!!errors.specificFormat}
                          value={value}
                          onChange={specificFormat => {
                            onChange(specificFormat);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              specificFormat,
                            });
                          }}
                        />
                      )}
                      name='specificFormat'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Toggle
                          label='Balance Check'
                          hasError={!!errors.isBalanceCheck}
                          value={value}
                          onChange={isBalanceCheck => {
                            onChange(isBalanceCheck);
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              isBalanceCheck,
                            });
                          }}
                        />
                      )}
                      name='isBalanceCheck'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                  </Grid>
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
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitCoporateClients)}
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

          <ModalPostalCode
            postalCode={corporateClientsStore.corporateClients.postalCode}
            show={isPostalCode}
            data={
              corporateClientsStore.corporateClients.postalCode
                ? labStore?.addressDetails
                : [
                    {
                      Pincode: '',
                      Country: '',
                      State: '',
                      District: '',
                      Block: '',
                      Name: '',
                    },
                  ]
            }
            onSelectedRow={item => {
              corporateClientsStore.updateCorporateClients({
                ...corporateClientsStore.corporateClients,
                country: item?.Country?.toUpperCase(),
                state: item?.State?.toUpperCase(),
                district: item?.District?.toUpperCase(),
                city: item?.Block?.toUpperCase(),
                area: item?.Name?.toUpperCase(),
                postalCode: Number.parseInt(item.Pincode),
                zone: '',
                sbu: '',
              });
              setIsPostalCodeData(false);
            }}
            close={() => {
              corporateClientsStore.updateCorporateClients({
                ...corporateClientsStore.corporateClients,
                country: '',
                state: '',
                district: '',
                city: '',
                area: '',
                postalCode: Number(''),
              });
              setIsPostalCodeData(false);
            }}
          />
          <ModalConfirm
            {...modalConfirm}
            click={(action: string) => {
              setModalConfirm({ show: false });
              switch (action) {
                case 'Delete': {
                  corporateClientsStore.corporateClientsService
                    .deleteCorporateClients({ input: { id: modalConfirm.id } })
                    .then((res: any) => {
                      if (res.removeCorporateClient.success) {
                        Toast.success({
                          message: `😊 ${res.removeCorporateClient.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          corporateClientsStore.fetchCorporateClients(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          corporateClientsStore.corporateClientsService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else corporateClientsStore.fetchCorporateClients();
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
                  corporateClientsStore.corporateClientsService
                    .updateSingleFiled({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateCorporateClient.success) {
                        Toast.success({
                          message: `😊 ${res.updateCorporateClient.message}`,
                        });

                        if (global?.filter?.mode == 'pagination')
                          corporateClientsStore.fetchCorporateClients(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          corporateClientsStore.corporateClientsService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else corporateClientsStore.fetchCorporateClients();
                      }
                    });
                  break;
                }
                case 'versionUpgrade': {
                  corporateClientsStore.updateCorporateClients({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    isPredefinedPanel: false,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date())
                        .add(365, 'days')
                        .format('YYYY-MM-DD hh:mm:ss'),
                    ),
                  });
                  setIsVersionUpgrade(true);
                  setHideAddView(false);
                  corporateClientsStore.updateSelectedItems({
                    ...corporateClientsStore.selectedItems,
                    deliveryMode: modalConfirm.data?.deliveryMode,
                  });
                  break;
                }
                case 'duplicate': {
                  corporateClientsStore.updateCorporateClients({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: 1,
                    isPredefinedPanel: false,
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date())
                        .add(365, 'days')
                        .format('YYYY-MM-DD hh:mm:ss'),
                    ),
                  });

                  setHideAddView(false);
                  corporateClientsStore.updateSelectedItems({
                    ...corporateClientsStore.selectedItems,
                    deliveryMode: modalConfirm.data?.deliveryMode,
                  });
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

export default CorporateClients;
