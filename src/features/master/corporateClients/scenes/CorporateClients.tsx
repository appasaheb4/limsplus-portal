/* eslint-disable */
import React, {useState, useMemo} from 'react';
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
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
} from '@/library/components';
import {CorporateClient, PriceListTable} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';

import {useForm, Controller} from 'react-hook-form';
import {CorporateClientsHoc} from '../hoc';
import {useStores} from '@/stores';
import {FormHelper} from '@/helper';
import {RouterFlow} from '@/flows';

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
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();

    setValue('status', corporateClientsStore.corporateClients?.status);
    setValue(
      'environment',
      corporateClientsStore.corporateClients?.environment,
    );

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddSection, setHideAddSection] = useState<boolean>(true);
    const onSubmitCoporateClients = () => {
      if (!corporateClientsStore.checkExistsEnvCode) {
        if (
          !corporateClientsStore.corporateClients?.existsVersionId &&
          !corporateClientsStore.corporateClients?.existsRecordId
        ) {
          corporateClientsStore.corporateClientsService
            .addCorporateClients({
              input: {
                ...corporateClientsStore.corporateClients,
                enteredBy: loginStore.login.userId,
              },
            })
            .then(res => {
              if (res.createCorporateClient.success) {
                Toast.success({
                  message: `😊 ${res.createCorporateClient.message}`,
                });
                corporateClientsStore.fetchCorporateClients();
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
        } else if (
          !corporateClientsStore.corporateClients?.existsVersionId &&
          corporateClientsStore.corporateClients?.existsRecordId
        ) {
          corporateClientsStore.corporateClientsService
            .duplicateCorporateClient({
              input: {
                ...corporateClientsStore.corporateClients,
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
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        Toast.warning({
          message: `😔 Please enter diff code`,
        });
      }
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
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Edit/Modify',
          )}
          // isEditModify={false}
          onDelete={selectedItem => setModalConfirm(selectedItem)}
          onVersionUpgrade={item => {
            setModalConfirm({
              show: true,
              type: 'versionUpgrade',
              data: item,
              title: 'Are you version upgrade?',
              body: `Version upgrade this record`,
            });
          }}
          onDuplicate={item => {
            setModalConfirm({
              show: true,
              type: 'duplicate',
              data: item,
              title: 'Are you duplicate?',
              body: `Duplicate this record`,
            });
          }}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'Delete',
              id: rows,
              title: 'Are you sure?',
              body: `Delete selected items!`,
            });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'Update',
              data: {value, dataField, id},
              title: 'Are you sure?',
              body: `Update Section!`,
            });
          }}
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateFileds',
              data: {fileds, id},
              title: 'Are you sure?',
              body: `Update records!`,
            });
          }}
          onPageSizeChange={(page, limit) => {
            corporateClientsStore.fetchCorporateClients(page, limit);
          }}
          onFilter={(type, filter, page, limit) => {
            corporateClientsStore.corporateClientsService.filter({
              input: {type, filter, page, limit},
            });
          }}
        />
      ),
      [corporateClientsStore.listCorporateClients],
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
        <div className="mx-auto flex-wrap">
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddSection ? 'hidden' : 'shown')
            }
          >
            <Grid cols={3}>
              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="Client Code"
                      placeholder={
                        errors.corporateCode
                          ? 'Please Enter Coporate Code'
                          : 'Coporate Code'
                      }
                      hasError={errors.corporateCode}
                      value={
                        corporateClientsStore.corporateClients?.corporateCode
                      }
                      onChange={corporateCode => {
                        onChange(corporateCode);
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          corporateCode: corporateCode.toUpperCase(),
                        });
                      }}
                      onBlur={code => {
                        if (
                          !corporateClientsStore.corporateClients
                            ?.existsVersionId
                        ) {
                          corporateClientsStore.corporateClientsService
                            .checkExistsEnvCode({
                              input: {
                                code,
                                env: corporateClientsStore.corporateClients
                                  ?.environment,
                              },
                            })
                            .then(res => {
                              if (
                                res.checkCorporateClientExistsRecord.success
                              ) {
                                corporateClientsStore.updateExistsEnvCode(true);
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
                    />
                  )}
                  name="corporateCode"
                  rules={{required: true}}
                  defaultValue=""
                />
                {corporateClientsStore.checkExistsEnvCode && (
                  <span className="text-red-600 font-medium relative">
                    Code already exits. Please use other code.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="Client Name"
                      placeholder={
                        errors.corporateName
                          ? 'Please Enter Coporate Name'
                          : 'Coporate Name'
                      }
                      hasError={errors.corporateName}
                      value={
                        corporateClientsStore.corporateClients?.corporateName
                      }
                      onChange={corporateName => {
                        onChange(corporateName);
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          corporateName: corporateName.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name="corporateName"
                  rules={{required: true}}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="Invoice Ac"
                      placeholder={
                        errors.invoiceAc
                          ? 'Please Enter Invoice AC'
                          : 'Invoice AC'
                      }
                      disabled={true}
                      hasError={errors.invoiceAc}
                      value={corporateClientsStore.corporateClients?.invoiceAc}
                      onChange={invoiceAc => {
                        onChange(invoiceAc);
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          invoiceAc,
                        });
                      }}
                    />
                  )}
                  name="invoiceAc"
                  rules={{required: false}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label="Ac Type" hasError={errors.acType}>
                      <select
                        value={corporateClientsStore.corporateClients?.acType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.acType ? 'border-red-500  ' : 'border-gray-300'
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
                  name="acType"
                  rules={{required: false}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="Ac Class"
                      hasError={errors.acClass}
                    >
                      <select
                        value={corporateClientsStore.corporateClients?.acClass}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.acClass
                            ? 'border-red-500  '
                            : 'border-gray-300'
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
                  name="acClass"
                  rules={{required: false}}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="Billing on"
                      hasError={errors.billingOn}
                    >
                      <select
                        value={
                          corporateClientsStore.corporateClients?.billingOn
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.billingOn
                            ? 'border-red-500  '
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
                        {lookupItems(routerStore.lookupItems, 'BILLING_ON').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="billingOn"
                  rules={{required: false}}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="Billing Frequency"
                      hasError={errors.billingFrequency}
                    >
                      <select
                        value={
                          corporateClientsStore.corporateClients
                            ?.billingFrequency
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.billingFrequency
                            ? 'border-red-500  '
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
                  name="billingFrequency"
                  rules={{required: false}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="Customer Group"
                      hasError={errors.customerGroup}
                    >
                      <select
                        value={
                          corporateClientsStore.corporateClients?.customerGroup
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.customerGroup
                            ? 'border-red-500  '
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
                  name="customerGroup"
                  rules={{required: false}}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="Category"
                      hasError={errors.category}
                    >
                      <select
                        value={corporateClientsStore.corporateClients?.category}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.category
                            ? 'border-red-500  '
                            : 'border-gray-300'
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
                  name="category"
                  rules={{required: false}}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="Country"
                      id="country"
                      hasError={errors.country}
                    >
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        data={{
                          list: _.uniqBy(
                            administrativeDivisions.listAdministrativeDiv,
                            'country',
                          ),
                          displayKey: 'country',
                          findKey: 'country',
                        }}
                        hasError={errors.country}
                        onFilter={(value: string) => {
                          administrativeDivisions.administrativeDivisionsService.filter(
                            {
                              input: {
                                filter: {
                                  type: 'search',
                                  ['country']: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item.country);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            country: item.country.toUpperCase(),
                            state: '',
                            district: '',
                            city: '',
                            area: '',
                            postalCode: '',
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="country"
                  rules={{required: true}}
                  defaultValue={administrativeDivisions.listAdministrativeDiv}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="State"
                      id="state"
                      hasError={errors.state}
                    >
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        disable={
                          !corporateClientsStore.corporateClients?.country
                        }
                        data={{
                          list: _.uniqBy(
                            administrativeDivisions.listAdministrativeDiv.filter(
                              item =>
                                item.country ===
                                corporateClientsStore.corporateClients?.country,
                            ),
                            'state',
                          ),
                          displayKey: 'state',
                          findKey: 'state',
                        }}
                        displayValue={
                          corporateClientsStore.corporateClients?.state
                        }
                        hasError={errors.state}
                        onFilter={(value: string) => {
                          administrativeDivisions.administrativeDivisionsService.filter(
                            {
                              input: {
                                filter: {
                                  type: 'search',
                                  country:
                                    corporateClientsStore.corporateClients
                                      ?.country,
                                  state: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item.state);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            state: item.state.toUpperCase(),
                            district: '',
                            city: '',
                            area: '',
                            postalCode: '',
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="state"
                  rules={{required: false}}
                  defaultValue={corporateClientsStore.corporateClients.country}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="District"
                      id="district"
                      hasError={errors.district}
                    >
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        disable={!corporateClientsStore.corporateClients?.state}
                        data={{
                          list: _.uniqBy(
                            administrativeDivisions.listAdministrativeDiv.filter(
                              item =>
                                item.country ===
                                  corporateClientsStore.corporateClients
                                    ?.country &&
                                item.state ===
                                  corporateClientsStore.corporateClients?.state,
                            ),
                            'district',
                          ),
                          displayKey: 'district',
                          findKey: 'district',
                        }}
                        displayValue={
                          corporateClientsStore.corporateClients?.district
                        }
                        hasError={errors.district}
                        onFilter={(value: string) => {
                          administrativeDivisions.administrativeDivisionsService.filter(
                            {
                              input: {
                                filter: {
                                  type: 'search',
                                  country:
                                    corporateClientsStore.corporateClients
                                      ?.country,
                                  state:
                                    corporateClientsStore.corporateClients
                                      ?.state,
                                  district: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item.district);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            district: item.district.toUpperCase(),
                            city: '',
                            area: '',
                            postalCode: '',
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="district"
                  rules={{required: false}}
                  defaultValue={corporateClientsStore.corporateClients?.state}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="City"
                      id="city"
                      hasError={errors.city}
                    >
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        disable={
                          !corporateClientsStore.corporateClients.district
                        }
                        data={{
                          list: _.uniqBy(
                            administrativeDivisions.listAdministrativeDiv.filter(
                              item =>
                                item.country ===
                                  corporateClientsStore.corporateClients
                                    .country &&
                                item.state ===
                                  corporateClientsStore.corporateClients
                                    .state &&
                                item.district ===
                                  corporateClientsStore.corporateClients
                                    .district,
                            ),
                            'city',
                          ),
                          displayKey: 'city',
                          findKey: 'city',
                        }}
                        hasError={errors.city}
                        displayValue={
                          corporateClientsStore.corporateClients?.city
                        }
                        onFilter={(value: string) => {
                          administrativeDivisions.administrativeDivisionsService.filter(
                            {
                              input: {
                                filter: {
                                  type: 'search',
                                  country:
                                    corporateClientsStore.corporateClients
                                      ?.country,
                                  state:
                                    corporateClientsStore.corporateClients
                                      ?.state,
                                  district:
                                    corporateClientsStore.corporateClients
                                      ?.district,
                                  city: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item.city);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            city: item.city.toUpperCase(),
                            area: '',
                            postalCode: '',
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="city"
                  rules={{required: false}}
                  defaultValue={
                    corporateClientsStore.corporateClients?.district
                  }
                />
              </List>
              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="Area"
                      id="area"
                      hasError={errors.area}
                    >
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        disable={!corporateClientsStore.corporateClients?.city}
                        data={{
                          list: _.uniqBy(
                            administrativeDivisions.listAdministrativeDiv.filter(
                              item =>
                                item.country ===
                                  corporateClientsStore.corporateClients
                                    ?.country &&
                                item.state ===
                                  corporateClientsStore.corporateClients
                                    ?.state &&
                                item.district ===
                                  corporateClientsStore.corporateClients
                                    ?.district &&
                                item.city ===
                                  corporateClientsStore.corporateClients?.city,
                            ),
                            'area',
                          ),

                          displayKey: 'area',
                          findKey: 'area',
                        }}
                        displayValue={
                          corporateClientsStore.corporateClients?.area
                        }
                        hasError={errors.area}
                        onFilter={(value: string) => {
                          administrativeDivisions.administrativeDivisionsService.filter(
                            {
                              input: {
                                filter: {
                                  type: 'search',
                                  country:
                                    corporateClientsStore.corporateClients
                                      ?.country,
                                  state:
                                    corporateClientsStore.corporateClients
                                      ?.state,
                                  district:
                                    corporateClientsStore.corporateClients
                                      ?.district,
                                  city: corporateClientsStore.corporateClients
                                    ?.city,
                                  area: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item.city);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            area: item.area.toUpperCase(),
                            postalCode: '',
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="area "
                  rules={{required: false}}
                  defaultValue={corporateClientsStore.corporateClients?.city}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="Postal Code"
                      id="postalCode"
                      hasError={errors.postalCode}
                    >
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        disable={!corporateClientsStore.corporateClients?.area}
                        data={{
                          list: _.uniqBy(
                            administrativeDivisions.listAdministrativeDiv.filter(
                              item =>
                                item.country ===
                                  corporateClientsStore.corporateClients
                                    ?.country &&
                                item.state ===
                                  corporateClientsStore.corporateClients
                                    ?.state &&
                                item.district ===
                                  corporateClientsStore.corporateClients
                                    ?.district &&
                                item.city ===
                                  corporateClientsStore.corporateClients
                                    ?.city &&
                                item.area ===
                                  corporateClientsStore.corporateClients?.area,
                            ),
                            'postalCode',
                          ),
                          displayKey: 'postalCode',
                          findKey: 'postalCode',
                        }}
                        displayValue={
                          corporateClientsStore.corporateClients.postalCode?.toString() ||
                          ''
                        }
                        hasError={errors.postalCode}
                        onFilter={(value: string) => {
                          administrativeDivisions.administrativeDivisionsService.filter(
                            {
                              input: {
                                filter: {
                                  type: 'search',
                                  country:
                                    corporateClientsStore.corporateClients
                                      ?.country,
                                  state:
                                    corporateClientsStore.corporateClients
                                      ?.state,
                                  district:
                                    corporateClientsStore.corporateClients
                                      ?.district,
                                  city: corporateClientsStore.corporateClients
                                    ?.city,
                                  area: corporateClientsStore.corporateClients
                                    ?.area,
                                  postalCode: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item.postalCode);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            postalCode: parseInt(item.postalCode),
                            zone: item?.zone,
                            sbu: item?.sbu,
                          });
                          administrativeDivisions.updateAdministrativeDivList(
                            administrativeDivisions.listAdministrativeDivCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="postalCode"
                  rules={{required: false}}
                  defaultValue={corporateClientsStore.corporateClients?.area}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="SBU"
                      placeholder={errors.sbu ? 'Please Enter sbu' : 'SBU'}
                      hasError={errors.sbu}
                      value={corporateClientsStore.corporateClients?.sbu}
                      onChange={sbu => {
                        onChange(sbu);
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          sbu,
                        });
                      }}
                    />
                  )}
                  name="sbu"
                  rules={{required: false}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="Zone"
                      placeholder={errors.zone ? 'Please Enter Zone' : 'Zone'}
                      hasError={errors.zone}
                      value={corporateClientsStore.corporateClients?.zone}
                      onChange={zone => {
                        onChange(zone);
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          zone,
                        });
                      }}
                    />
                  )}
                  name="zone"
                  rules={{required: false}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="Sales Territory"
                      hasError={errors.salesTerritory}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder="Search by sales territory"
                        data={{
                          list: _.uniqBy(
                            salesTeamStore.listSalesTeam,
                            'salesTerritory',
                          ),
                          displayKey: ['salesTerritory'],
                        }}
                        hasError={errors.salesTerritory}
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
                  name="salesTerritory"
                  rules={{required: false}}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="Telephone"
                      placeholder={
                        errors.telephone
                          ? 'Please Enter Telephone'
                          : 'Telephone'
                      }
                      hasError={errors.telephone}
                      value={corporateClientsStore.corporateClients?.telephone}
                      onChange={telephone => {
                        onChange(telephone);
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          telephone,
                        });
                      }}
                    />
                  )}
                  name="telephone"
                  rules={{required: false}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="Mobile No"
                      placeholder={
                        errors.mobileNo ? 'Please Enter Mobile No' : 'Mobile No'
                      }
                      type="number"
                      pattern={FormHelper.patterns.mobileNo}
                      hasError={errors.mobileNo}
                      value={corporateClientsStore.corporateClients?.mobileNo}
                      onChange={mobileNo => {
                        onChange(mobileNo);
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          mobileNo,
                        });
                      }}
                    />
                  )}
                  name="mobileNo"
                  rules={{
                    required: false,
                    pattern: FormHelper.patterns.mobileNo,
                  }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="Email"
                      placeholder={
                        errors.email ? 'Please Enter Email' : 'Email'
                      }
                      hasError={errors.email}
                      value={corporateClientsStore.corporateClients?.email}
                      onChange={email => {
                        onChange(email);
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          email,
                        });
                      }}
                    />
                  )}
                  name="email"
                  rules={{required: false}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="Delivery Type"
                      hasError={errors.deliveryType}
                    >
                      <select
                        value={
                          corporateClientsStore.corporateClients?.deliveryType
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.deliveryType
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const deliveryType = e.target.value;
                          onChange(deliveryType);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            deliveryType,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'DELIVERY_TYPE',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="deliveryType"
                  rules={{required: false}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label="Delivery Method"
                      hasError={errors.deliveryMethod}
                    >
                      <select
                        value={
                          corporateClientsStore.corporateClients?.deliveryMethod
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.deliveryMethod
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const deliveryMethod = e.target.value;
                          onChange(deliveryMethod);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            deliveryMethod,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'DELIVERY_METHOD',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="deliveryMethod"
                  rules={{required: false}}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="Info"
                      placeholder={errors.info ? 'Please Enter INFO' : 'INFO'}
                      hasError={errors.info}
                      value={corporateClientsStore.corporateClients?.info}
                      onChange={info => {
                        onChange(info);
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          info,
                        });
                      }}
                    />
                  )}
                  name="info"
                  rules={{required: false}}
                  defaultValue=""
                />

                <Grid cols={5}>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label="Confidential"
                        hasError={errors.confidential}
                        value={
                          corporateClientsStore.corporateClients?.confidential
                        }
                        onChange={confidential => {
                          onChange(confidential);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            confidential,
                          });
                        }}
                      />
                    )}
                    name="confidential"
                    rules={{required: false}}
                    defaultValue=""
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label="Urgent"
                        hasError={errors.urgent}
                        value={corporateClientsStore.corporateClients?.urgent}
                        onChange={urgent => {
                          onChange(urgent);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            urgent,
                          });
                        }}
                      />
                    )}
                    name="urgent"
                    rules={{required: false}}
                    defaultValue=""
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label="Report Format"
                        hasError={errors.reportFormat}
                        value={
                          corporateClientsStore.corporateClients?.reportFormat
                        }
                        onChange={reportFormat => {
                          onChange(reportFormat);
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            reportFormat,
                          });
                        }}
                      />
                    )}
                    name="reportFormat"
                    rules={{required: false}}
                    defaultValue=""
                  />
                </Grid>
              </List>
              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="FYI Line"
                      placeholder={
                        errors.fyiLine ? 'Please Enter FyiLine' : 'FyiLine'
                      }
                      hasError={errors.fyiLine}
                      value={corporateClientsStore.corporateClients?.fyiLine}
                      onChange={fyiLine => {
                        onChange(fyiLine);
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          fyiLine,
                        });
                      }}
                    />
                  )}
                  name="fyiLine"
                  rules={{required: false}}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="Work Line"
                      placeholder={
                        errors.workLine ? 'Plese Enter WorkLine' : 'WorkLine'
                      }
                      hasError={errors.workLine}
                      value={corporateClientsStore.corporateClients?.workLine}
                      onChange={workLine => {
                        onChange(workLine);
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          workLine,
                        });
                      }}
                    />
                  )}
                  name="workLine"
                  rules={{required: false}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label="Date Creation"
                      placeholder={
                        errors.dateCreation
                          ? 'Please Enter Date Creation '
                          : 'Created By'
                      }
                      hasError={errors.dateCreation}
                      value={
                        corporateClientsStore.corporateClients?.dateCreation
                      }
                      disabled={true}
                    />
                  )}
                  name="dateCreation"
                  rules={{required: false}}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label="Date Active"
                      hasError={errors.dateActive}
                      placeholder={
                        errors.dateActive
                          ? 'Please Enter Date Active'
                          : 'Date Active'
                      }
                      value={corporateClientsStore.corporateClients?.dateActive}
                      disabled={true}
                    />
                  )}
                  name="dateActive"
                  rules={{required: false}}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label="Date Expire"
                      hasError={errors.dateExpire}
                      placeholder={
                        errors.dateExpire
                          ? 'Please Enter Date Expire'
                          : 'Date Expire'
                      }
                      value={corporateClientsStore.corporateClients?.dateExpire}
                      onChange={dateExpire => {
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          dateExpire,
                        });
                      }}
                    />
                  )}
                  name="dateExpire"
                  rules={{required: false}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="Version"
                      placeholder={
                        errors.version ? 'Please Enter Version' : 'Version'
                      }
                      hasError={errors.version}
                      value={corporateClientsStore.corporateClients?.version}
                      disabled={true}
                    />
                  )}
                  name="version"
                  rules={{required: false}}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label="Entered By"
                      hasError={errors.enteredBy}
                      placeholder={
                        errors.enteredBy
                          ? 'Please Enter Entered By'
                          : 'Entered By'
                      }
                      value={loginStore.login?.userId}
                      disabled={true}
                    />
                  )}
                  name="enteredBy"
                  rules={{required: false}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label="Status" hasError={errors.status}>
                      <select
                        value={
                          corporateClientsStore &&
                          corporateClientsStore.corporateClients?.status
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? 'border-red-500  ' : 'border-gray-300'
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
                  name="status"
                  rules={{required: true}}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label="Environment">
                      <select
                        value={
                          corporateClientsStore.corporateClients?.environment
                        }
                        disabled={
                          loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? true
                            : false
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? 'border-red-500  '
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
                          loginStore.login.role !== 'SYSADMIN'
                            ? `Select`
                            : corporateClientsStore.corporateClients
                                ?.environment || `Select`}
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
                  name="environment"
                  rules={{required: true}}
                  defaultValue=""
                />
              </List>
            </Grid>
            <br />
            <List direction="row" space={3} align="center">
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.InputWrapper
                    label="Price List"
                    hasError={errors.priceList}
                  >
                    <PriceListTable />
                  </Form.InputWrapper>
                )}
                name="priceList"
                rules={{required: false}}
                defaultValue=""
              />
            </List>
            <br />
            <List direction="row" space={3} align="center">
              <Buttons.Button
                size="medium"
                type="solid"
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitCoporateClients)}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size="medium"
                type="outline"
                icon={Svg.Remove}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <div className="p-2 rounded-lg shadow-xl overflow-auto">
            {tableView}
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === 'Delete') {
                corporateClientsStore.corporateClientsService
                  .deleteCorporateClients({input: {id: modalConfirm.id}})
                  .then((res: any) => {
                    if (res.removeCorporateClient.success) {
                      Toast.success({
                        message: `😊 ${res.removeCorporateClient.message}`,
                      });
                      setModalConfirm({show: false});
                      corporateClientsStore.fetchCorporateClients();
                    }
                  });
              } else if (type === 'Update') {
                corporateClientsStore.corporateClientsService
                  .updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  })
                  .then((res: any) => {
                    if (res.updateCorporateClient.success) {
                      Toast.success({
                        message: `😊 ${res.updateCorporateClient.message}`,
                      });
                      setModalConfirm({show: false});
                      corporateClientsStore.fetchCorporateClients();
                    }
                  });
              } else if (type === 'UpdateFileds') {
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
                      setModalConfirm({show: false});
                      corporateClientsStore.fetchCorporateClients();
                    }
                  });
              } else if (type === 'versionUpgrade') {
                corporateClientsStore.updateCorporateClients({
                  ...modalConfirm.data,
                  _id: undefined,
                  existsVersionId: modalConfirm.data._id,
                  existsRecordId: undefined,
                  version: parseInt(modalConfirm.data.version + 1),
                  dateActive: new Date(),
                });
                setValue('corporateCode', modalConfirm.data.corporateCode);
                setValue('corporateName', modalConfirm.data.corporateName);
                setValue('status', modalConfirm.data.status);
                setValue('environment', modalConfirm.data.environment);
                //clearErrors(["lab", "analyteCode", "analyteName", "environment"])
              } else if (type === 'duplicate') {
                corporateClientsStore.updateCorporateClients({
                  ...modalConfirm.data,
                  _id: undefined,
                  existsVersionId: undefined,
                  existsRecordId: modalConfirm.data._id,
                  version: parseInt(modalConfirm.data.version + 1),
                  dateActive: new Date(),
                });
                setHideAddSection(!hideAddSection);
                setValue('corporateCode', modalConfirm.data.corporateCode);
                setValue('corporateName', modalConfirm.data.corporateName);
                setValue('status', modalConfirm.data.status);
                setValue('environment', modalConfirm.data.environment);
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />
        </div>
      </>
    );
  }),
);

export default CorporateClients;
