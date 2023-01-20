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
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
} from '@/library/components';
import {RegistrationLocationsList} from '../components';
import {AutoCompleteFilterDeliveryMode} from '@/core-components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {
  AutoCompleteFilterSingleSelectCorparateCode,
  PriceListTable,
} from '../components';
import {RegistrationLocationHoc} from '../hoc';
import {useStores} from '@/stores';
import {RouterFlow} from '@/flows';
import {FormHelper} from '@/helper';

const RegistrationLocation = RegistrationLocationHoc(
  observer(() => {
    const {
      loginStore,
      registrationLocationsStore,
      labStore,
      routerStore,
      loading,
      administrativeDivisions,
      corporateClientsStore,
      salesTeamStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();

    setValue(
      'status',
      registrationLocationsStore.registrationLocations?.status,
    );
    setValue(
      'environment',
      registrationLocationsStore.registrationLocations?.environment,
    );
    setValue(
      'acClass',
      registrationLocationsStore.registrationLocations?.acClass,
    );
    setValue(
      'accountType',
      registrationLocationsStore.registrationLocations?.accountType,
    );

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddSection, setHideAddSection] = useState<boolean>(true);

    const onSubmitRegistrationLocation = () => {
      if (!registrationLocationsStore.checkExitsLabEnvCode) {
        if (
          !registrationLocationsStore.registrationLocations?.existsVersionId &&
          !registrationLocationsStore.registrationLocations?.existsRecordId
        ) {
          registrationLocationsStore.registrationLocationsService
            .addRegistrationLocations({
              input: {
                ...registrationLocationsStore.registrationLocations,
                enteredBy: loginStore.login.userId,
              },
            })
            .then(res => {
              if (res.createRegistrationLocation.success) {
                Toast.success({
                  message: `😊 ${res.createRegistrationLocation.message}`,
                });
              }
            });
        } else if (
          registrationLocationsStore.registrationLocations?.existsVersionId &&
          !registrationLocationsStore.registrationLocations?.existsRecordId
        ) {
          registrationLocationsStore.registrationLocationsService
            .versionUpgradeRegistrationLocations({
              input: {
                ...registrationLocationsStore.registrationLocations,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.versionUpgradeRegistrationLocation.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradeRegistrationLocation.message}`,
                });
              }
            });
        } else if (
          !registrationLocationsStore.registrationLocations?.existsVersionId &&
          registrationLocationsStore.registrationLocations?.existsRecordId
        ) {
          registrationLocationsStore.registrationLocationsService
            .duplicateRegistrationLocations({
              input: {
                ...registrationLocationsStore.registrationLocations,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.duplicateRegistrationLocation.success) {
                Toast.success({
                  message: `😊 ${res.duplicateRegistrationLocation.message}`,
                });
              }
            });
        }
        setTimeout(() => {
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
        <RegistrationLocationsList
          data={registrationLocationsStore.listRegistrationLocations || []}
          totalSize={registrationLocationsStore.listRegistrationLocationsCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            labList: loginStore.login?.labList,
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
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateFileds',
              data: {fileds, id},
              title: 'Are you sure?',
              body: 'Update records!',
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
            registrationLocationsStore.fetchRegistrationLocations(page, limit);
          }}
          onFilter={(type, filter, page, limit) => {
            registrationLocationsStore.registrationLocationsService.filter({
              input: {type, filter, page, limit},
            });
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [registrationLocationsStore.listRegistrationLocations],
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
            <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Lab' hasError={!!errors.lab}>
                      <select
                        value={
                          registrationLocationsStore.registrationLocations?.lab
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.lab ? 'border-red-500  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const lab = e.target.value;
                          onChange(lab);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              lab,
                            },
                          );
                          if (
                            !registrationLocationsStore.registrationLocations
                              ?.existsVersionId
                          ) {
                            registrationLocationsStore.registrationLocationsService
                              .checkExitsLabEnvCode({
                                input: {
                                  code: registrationLocationsStore
                                    .registrationLocations?.locationCode,
                                  env: registrationLocationsStore
                                    .registrationLocations?.environment,
                                  lab,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkRegistrationLocationExistsRecord
                                    .success
                                ) {
                                  registrationLocationsStore.updateExistsLabEnvCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkRegistrationLocationExistsRecord.message}`,
                                  });
                                } else {
                                  registrationLocationsStore.updateExistsLabEnvCode(
                                    false,
                                  );
                                  labStore.LabService.findByFields({
                                    input: {
                                      filter: {code: lab},
                                    },
                                  }).then(res => {
                                    registrationLocationsStore.updateRegistrationLocations(
                                      {
                                        ...registrationLocationsStore.registrationLocations,
                                        priceList:
                                          res.findByFieldsLabs.data.length > 0
                                            ? res.findByFieldsLabs.data
                                                ?.length > 0
                                              ? res.findByFieldsLabs.data[0]
                                                  ?.priceList
                                              : undefined
                                            : registrationLocationsStore
                                                .registrationLocations
                                                .priceList,
                                      },
                                    );
                                  });
                                }
                              });
                          }
                        }}
                      >
                        <option selected>Select</option>
                        {loginStore.login?.labList?.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {`${item.code} - ${item.name}`}
                            </option>
                          ),
                        )}
                      </select>
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
                      label='Location Code'
                      hasError={!!errors.locationCode}
                      placeholder={
                        errors.locationCode
                          ? 'Please Enter Location Code'
                          : 'Loaction Code'
                      }
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.locationCode
                      }
                      onChange={locationCode => {
                        onChange(locationCode);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          locationCode: locationCode.toUpperCase(),
                        });
                      }}
                      onBlur={code => {
                        if (
                          !registrationLocationsStore.registrationLocations
                            ?.existsVersionId
                        ) {
                          registrationLocationsStore.registrationLocationsService
                            .checkExitsLabEnvCode({
                              input: {
                                code,
                                env: registrationLocationsStore
                                  .registrationLocations?.environment,
                                lab: registrationLocationsStore
                                  .registrationLocations?.lab,
                              },
                            })
                            .then(res => {
                              if (
                                res.checkRegistrationLocationExistsRecord
                                  .success
                              ) {
                                registrationLocationsStore.updateExistsLabEnvCode(
                                  true,
                                );
                                Toast.error({
                                  message: `😔 ${res.checkRegistrationLocationExistsRecord.message}`,
                                });
                              } else
                                registrationLocationsStore.updateExistsLabEnvCode(
                                  false,
                                );
                            });
                        }
                      }}
                    />
                  )}
                  name='locationCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                {registrationLocationsStore.checkExitsLabEnvCode && (
                  <span className='text-red-600 font-medium relative'>
                    Code already exits. Please use other code.
                  </span>
                )}

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Location Name'
                      hasError={!!errors.locationName}
                      placeholder={
                        errors.locationName
                          ? 'Please Enter Loaction Name'
                          : 'Loaction Name'
                      }
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.locationName
                      }
                      onChange={locationName => {
                        onChange(locationName);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          locationName: locationName.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='locationName'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Client Code'
                      hasError={!!errors.corporateCode}
                    >
                      <AutoCompleteFilterSingleSelectCorparateCode
                        onSelect={item => {
                          onChange(item.corporateCode);
                          console.log({item});

                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              corporateCode: item.corporateCode,
                              invoiceAc: Number.parseInt(item?.invoiceAc),
                              acClass: item.acClass,
                              accountType: item.acType,
                              customerGroup: item.customerGroup,
                            },
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='corporateCode'
                  rules={{required: false}}
                  defaultValue=''
                />
                <label className='hidden'>
                  {registrationLocationsStore.registrationLocations?.invoiceAc?.toString()}
                </label>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Invoice Ac'
                      hasError={!!errors.invoiceAc}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by invoiceAc'
                        data={{
                          list: corporateClientsStore.listCorporateClients,
                          displayKey: ['invoiceAc'],
                        }}
                        displayValue={registrationLocationsStore.registrationLocations?.invoiceAc?.toString()}
                        hasError={!!errors.invoiceAc}
                        onFilter={(value: string) => {
                          corporateClientsStore.corporateClientsService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ['invoiceAc'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item.invoiceAc);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              invoiceAc: Number.parseInt(item.invoiceAc),
                            },
                          );
                          corporateClientsStore.updateCorporateClientsList(
                            corporateClientsStore.listCorporateClientsCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='invoiceAc'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='AC Class'
                      hasError={!!errors.acClass}
                    >
                      <select
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.acClass
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.acClass
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const acClass = e.target.value;
                          onChange(acClass);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              acClass,
                            },
                          );
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
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Account Type'
                      hasError={!!errors.accountType}
                    >
                      <select
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.accountType
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.accountType
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const accountType = e.target.value;
                          onChange(accountType);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              accountType,
                            },
                          );
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
                  name='accountType'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Customer Group'
                      hasError={!!errors.customerGroup}
                    >
                      <select
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.customerGroup
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.customerGroup
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const customerGroup = e.target.value;
                          onChange(customerGroup);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              customerGroup,
                            },
                          );
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Method Coln'
                      hasError={!!errors.methodColn}
                    >
                      <select
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.methodColn
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.methodColn
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const methodColn = e.target.value;
                          onChange(methodColn);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              methodColn,
                            },
                          );
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'METHOD_COLN',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='methodColn'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Category'
                      hasError={!!errors.category}
                    >
                      <select
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.category
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.category
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const category = e.target.value;
                          onChange(category);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              category,
                            },
                          );
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
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Postal Code'
                      id='postalCode'
                      hasError={!!errors.postalCode}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        data={{
                          list: labStore.addressDetails,
                          displayKey: [
                            'Name',
                            'Block',
                            'District',
                            'State',
                            'Country',
                            'Pincode',
                          ],
                        }}
                        hasError={!!errors.postalCode}
                        displayValue={
                          registrationLocationsStore.registrationLocations?.postalCode?.toString() ||
                          ''
                        }
                        onFilter={(value: string) => {
                          if (value?.length == 6) {
                            labStore.LabService?.getAddressDetailsByPincode(
                              value,
                            );
                          }
                        }}
                        onSelect={item => {
                          onChange(item.Pincode);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              country: item?.Country?.toUpperCase(),
                              state: item?.State?.toUpperCase(),
                              district: item?.District?.toUpperCase(),
                              city: item?.Block?.toUpperCase(),
                              area: item?.Name?.toUpperCase(),
                              postalCode: Number.parseInt(item.Pincode),
                              zone: '',
                              sbu: '',
                            },
                          );
                          labStore.updateAddressDetails([]);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='postalCode'
                  rules={{required: false}}
                  defaultValue={
                    registrationLocationsStore.registrationLocations
                  }
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Country'
                      hasError={!!errors.country}
                      placeholder='Country'
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.country
                      }
                      //disabled={true}
                      onChange={country => {
                        onChange(country);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          country: country?.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='country'
                  rules={{required: false}}
                  defaultValue={administrativeDivisions.listAdministrativeDiv}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='State'
                      hasError={!!errors.state}
                      placeholder='State'
                      value={
                        registrationLocationsStore.registrationLocations?.state
                      }
                      //disabled={true}
                      onChange={state => {
                        onChange(state);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          state: state?.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='state'
                  rules={{required: false}}
                  defaultValue={
                    registrationLocationsStore.registrationLocations
                  }
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='District'
                      hasError={!!errors.district}
                      placeholder='District'
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.district
                      }
                      //disabled={true}
                      onChange={district => {
                        onChange(district);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          district: district?.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='district'
                  rules={{required: false}}
                  defaultValue={
                    registrationLocationsStore.registrationLocations
                  }
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='City'
                      hasError={!!errors.city}
                      placeholder='City'
                      value={
                        registrationLocationsStore.registrationLocations?.city
                      }
                      // disabled={true}
                      onChange={city => {
                        onChange(city);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          city: city?.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='city'
                  rules={{required: false}}
                  defaultValue={
                    registrationLocationsStore.registrationLocations
                  }
                />
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Area'
                      hasError={!!errors.area}
                      placeholder='Area'
                      value={
                        registrationLocationsStore.registrationLocations?.area
                      }
                      //disabled={true}
                      onChange={area => {
                        onChange(area);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          area: area?.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='area'
                  rules={{required: false}}
                  defaultValue={
                    registrationLocationsStore.registrationLocations
                  }
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      rows={2}
                      label='Address'
                      placeholder={
                        errors.address ? 'Please enter address' : 'Address'
                      }
                      hasError={!!errors.address}
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.address
                      }
                      onChange={address => {
                        onChange(address);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          address,
                        });
                      }}
                    />
                  )}
                  name='address'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='SBU'
                      placeholder={errors.sbu ? 'Please Enter sbu' : 'SBU'}
                      hasError={!!errors.sbu}
                      value={
                        registrationLocationsStore.registrationLocations?.sbu
                      }
                      onChange={sbu => {
                        onChange(sbu);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          sbu,
                        });
                      }}
                    />
                  )}
                  name='sbu'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Zone'
                      placeholder={errors.zone ? 'Please Enter zone' : 'Zone'}
                      hasError={!!errors.zone}
                      value={
                        registrationLocationsStore.registrationLocations?.zone
                      }
                      onChange={zone => {
                        onChange(zone);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          zone,
                        });
                      }}
                    />
                  )}
                  name='zone'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Sales Territory'
                      hasError={!!errors.salesTerritoRy}
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
                        hasError={!!errors.salesTerritoRy}
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
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              salesTerritoRy: item.salesTerritory,
                            },
                          );
                          salesTeamStore.updateSalesTeamList(
                            salesTeamStore.listSalesTeamCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='salesTerritoRy'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Telephone'
                      placeholder={
                        errors.telephone
                          ? 'Please Enter telephone'
                          : 'Telephone'
                      }
                      type='number'
                      hasError={!!errors.telephone}
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.telephone
                      }
                      pattern={FormHelper.patterns.mobileNo}
                      onChange={telephone => {
                        onChange(telephone);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          telephone,
                        });
                      }}
                    />
                  )}
                  name='telephone'
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
                      label='Mobile No'
                      placeholder={
                        errors.mobileNo ? 'Please Enter mobileNo' : 'Mobile No'
                      }
                      hasError={!!errors.mobileNo}
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.mobileNo
                      }
                      pattern={FormHelper.patterns.mobileNo}
                      type='number'
                      onChange={mobileNo => {
                        onChange(mobileNo);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                      label='Email'
                      placeholder={
                        errors.email ? 'Please Enter email' : 'Email'
                      }
                      hasError={!!errors.email}
                      value={
                        registrationLocationsStore.registrationLocations?.email
                      }
                      onChange={email => {
                        onChange(email);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          email,
                        });
                      }}
                    />
                  )}
                  name='email'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Report Priority'
                      hasError={!!errors.reportPriority}
                    >
                      <select
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.reportPriority
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.reportPriority
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const reportPriority = e.target.value;
                          onChange(reportPriority);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              reportPriority,
                            },
                          );
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Delivery Mode'
                      hasError={!!errors.panelCode}
                    >
                      <AutoCompleteFilterDeliveryMode
                        onSelect={deliveryMode => {
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              deliveryMode,
                            },
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='deliveryMode'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Route'
                      placeholder={
                        errors.route ? 'Please Enter route' : 'Route'
                      }
                      hasError={!!errors.route}
                      value={
                        registrationLocationsStore.registrationLocations?.route
                      }
                      onChange={route => {
                        onChange(route);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          route,
                        });
                      }}
                    />
                  )}
                  name='route'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Clock
                      label='Opening Time'
                      hasError={!!errors.openingTime}
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.openingTime
                      }
                      onChange={openingTime => {
                        onChange(openingTime);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.closingTime
                      }
                      onChange={closingTime => {
                        onChange(closingTime);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                        label='Confidential'
                        hasError={!!errors.confidential}
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.confidential
                        }
                        onChange={confidential => {
                          onChange(confidential);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              confidential,
                            },
                          );
                        }}
                      />
                    )}
                    name='confidential'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Print Primary Barcod'
                        hasError={!!errors.isPrintPrimaryBarcod}
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.isPrintPrimaryBarcod
                        }
                        onChange={isPrintPrimaryBarcod => {
                          onChange(isPrintPrimaryBarcod);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              isPrintPrimaryBarcod,
                            },
                          );
                        }}
                      />
                    )}
                    name='isPrintPrimaryBarcod'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Print Secondary Barcode'
                        hasError={!!errors.isPrintSecondaryBarcode}
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.isPrintSecondaryBarcode
                        }
                        onChange={isPrintSecondaryBarcode => {
                          onChange(isPrintSecondaryBarcode);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              isPrintSecondaryBarcode,
                            },
                          );
                        }}
                      />
                    )}
                    name='isPrintSecondaryBarcode'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Info'
                      placeholder={errors.info ? 'Please Enter info' : 'Info'}
                      hasError={!!errors.info}
                      value={
                        registrationLocationsStore.registrationLocations?.info
                      }
                      onChange={info => {
                        onChange(info);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          info,
                        });
                      }}
                    />
                  )}
                  name='info'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='FYI Line'
                      placeholder={
                        errors.fyiLine ? 'Please Enter fyiLine' : 'FYI Line'
                      }
                      hasError={!!errors.fyiLine}
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.fyiLine
                      }
                      onChange={fyiLine => {
                        onChange(fyiLine);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                    <Form.Input
                      label='Work Line'
                      placeholder={
                        errors.workLine ? 'Please Enter workLine' : 'Work Line'
                      }
                      hasError={!!errors.workLine}
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.workLine
                      }
                      onChange={workLine => {
                        onChange(workLine);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                    <Form.Input
                      label='GST No'
                      placeholder='GST No'
                      hasError={!!errors.gstNo}
                      value={
                        registrationLocationsStore.registrationLocations?.gstNo
                      }
                      onChange={gstNo => {
                        onChange(gstNo);
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          gstNo,
                        });
                      }}
                    />
                  )}
                  name='gstNo'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Date Creation'
                      placeholder={
                        errors.dateCreation
                          ? 'Please Enter Date Creation'
                          : 'Date Creation'
                      }
                      hasError={!!errors.dateCreation}
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.dateCreation
                      }
                      disabled={true}
                    />
                  )}
                  name='dateCreation'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Date Active'
                      placeholder={
                        errors.dateActive
                          ? 'Please enter date Active'
                          : 'Date Active'
                      }
                      hasError={!!errors.dateActive}
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.dateActive
                      }
                      disabled={true}
                    />
                  )}
                  name='dateActive'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Date Expire'
                      placeholder='Date Expire'
                      hasError={!!errors.dateActiveTo}
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.dateExpire
                      }
                      onChange={dateExpire => {
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          dateExpire,
                        });
                      }}
                    />
                  )}
                  name='dateActiveTo'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Version'
                      placeholder='Version'
                      hasError={!!errors.version}
                      value={
                        registrationLocationsStore.registrationLocations
                          ?.version
                      }
                      disabled={true}
                    />
                  )}
                  name='version'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Entered By'
                      placeholder='Entered By'
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
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Status'
                      hasError={!!errors.status}
                    >
                      <select
                        value={
                          registrationLocationsStore &&
                          registrationLocationsStore.registrationLocations
                            ?.status
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? 'border-red-500  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const status = e.target.value;
                          onChange(status);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              status,
                            },
                          );
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
                    <Form.InputWrapper
                      label='Environment'
                      hasError={!!errors.environment}
                    >
                      <select
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.environment
                        }
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
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              environment,
                            },
                          );
                          if (
                            !registrationLocationsStore.registrationLocations
                              ?.existsVersionId
                          ) {
                            registrationLocationsStore.registrationLocationsService
                              .checkExitsLabEnvCode({
                                input: {
                                  code: registrationLocationsStore
                                    .registrationLocations?.locationCode,
                                  env: environment,
                                  lab: registrationLocationsStore
                                    .registrationLocations?.lab,
                                },
                              })
                              .then(res => {
                                if (
                                  res.checkRegistrationLocationExistsRecord
                                    .success
                                ) {
                                  registrationLocationsStore.updateExistsLabEnvCode(
                                    true,
                                  );
                                  Toast.error({
                                    message: `😔 ${res.checkRegistrationLocationExistsRecord.message}`,
                                  });
                                } else
                                  registrationLocationsStore.updateExistsLabEnvCode(
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
                            : registrationLocationsStore.registrationLocations
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

                <Grid cols={4}>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Print Label'
                        hasError={!!errors.printLabel}
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.printLabel
                        }
                        onChange={printLabel => {
                          onChange(printLabel);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              printLabel,
                            },
                          );
                        }}
                      />
                    )}
                    name='printLabel'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Never Bill'
                        hasError={!!errors.neverBill}
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.neverBill
                        }
                        onChange={neverBill => {
                          onChange(neverBill);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              neverBill,
                            },
                          );
                        }}
                      />
                    )}
                    name='neverBill'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Urgent'
                        hasError={!!errors.urgent}
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.urgent
                        }
                        onChange={urgent => {
                          onChange(urgent);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              urgent,
                            },
                          );
                        }}
                      />
                    )}
                    name='urgent'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Report Format'
                        hasError={!!errors.reportFormat}
                        value={
                          registrationLocationsStore.registrationLocations
                            ?.reportFormat
                        }
                        onChange={reportFormat => {
                          onChange(reportFormat);
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              reportFormat,
                            },
                          );
                        }}
                      />
                    )}
                    name='reportFormat'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>
            </Grid>
            <div className='mt-2' />
            <List direction='row' space={3} align='center'>
              <div className='overflow-auto'>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Price List'
                      hasError={!!errors.priceList}
                    >
                      <PriceListTable />
                    </Form.InputWrapper>
                  )}
                  name='priceList'
                  rules={{required: false}}
                  defaultValue=''
                />
              </div>
            </List>
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitRegistrationLocation)}
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
          <ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              switch (type) {
                case 'Delete': {
                  registrationLocationsStore.registrationLocationsService
                    .deleteRegistrationLocations({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeRegistrationLocation.success) {
                        Toast.success({
                          message: `😊 ${res.removeRegistrationLocation.message}`,
                        });
                        setModalConfirm({show: false});
                        registrationLocationsStore.fetchRegistrationLocations();
                      }
                    });

                  break;
                }
                case 'Update': {
                  registrationLocationsStore.registrationLocationsService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateRegistrationLocation.success) {
                        Toast.success({
                          message: `😊 ${res.updateRegistrationLocation.message}`,
                        });
                        setModalConfirm({show: false});
                        registrationLocationsStore.fetchRegistrationLocations();
                      }
                    });

                  break;
                }
                case 'UpdateFileds': {
                  registrationLocationsStore.registrationLocationsService
                    .updateSingleFiled({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateRegistrationLocation.success) {
                        Toast.success({
                          message: `😊 ${res.updateRegistrationLocation.message}`,
                        });
                        setModalConfirm({show: false});
                        registrationLocationsStore.fetchRegistrationLocations();
                      }
                    });

                  break;
                }
                case 'versionUpgrade': {
                  registrationLocationsStore.updateRegistrationLocations({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActiveFrom: new Date(),
                  });
                  setValue('locationCode', modalConfirm.data.locationCode);
                  setValue('locationName', modalConfirm.data.locationName);
                  setValue('lab', modalConfirm.data.lab);
                  setValue('status', modalConfirm.data.status);
                  setValue('environment', modalConfirm.data.environment);

                  break;
                }
                case 'duplicate': {
                  registrationLocationsStore.updateRegistrationLocations({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActiveFrom: new Date(),
                  });
                  setHideAddSection(!hideAddSection);
                  setValue('locationCode', modalConfirm.data.locationCode);
                  setValue('locationName', modalConfirm.data.locationName);
                  setValue('lab', modalConfirm.data.lab);
                  setValue('status', modalConfirm.data.status);
                  setValue('environment', modalConfirm.data.environment);
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

export default RegistrationLocation;
