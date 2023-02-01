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
import {LabList, PriceListTable} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {LabHoc} from '../hoc';
import {useStores} from '@/stores';
import {FormHelper} from '@/helper';
import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';

const Lab = LabHoc(
  observer(() => {
    const {
      labStore,
      salesTeamStore,
      routerStore,
      administrativeDivisions,
      loading,
      loginStore,
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();

    setValue('environment', labStore.labs?.environment);
    setValue('status', labStore.labs?.status);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);

    const onSubmitLab = () => {
      if (!labStore.checkExitsEnvCode) {
        if (
          labStore.labs?.priceList?.filter(item => {
            return (
              // eslint-disable-next-line no-prototype-builtins
              item.hasOwnProperty('priceGroup') &&
              // eslint-disable-next-line no-prototype-builtins
              item.hasOwnProperty('priority')
            );
          }).length > 0
        ) {
          labStore.LabService.addLab({input: {...labStore.labs}}).then(res => {
            if (res.createLab.success) {
              Toast.success({
                message: `😊 ${res.createLab.message}`,
              });
            }
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          return Toast.warning({
            message: '😔 Price list min 1 record required.',
          });
        }
      } else {
        Toast.warning({
          message: '😔 Please enter diff code and environment',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <LabList
          data={labStore.listLabs || []}
          totalSize={labStore.listLabsCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listAdministrativeDiv:
              administrativeDivisions.listAdministrativeDiv,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
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
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateFileds',
              data: {fileds, id},
              title: 'Are you sure?',
              body: 'Update records!',
            });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'Update',
              data: {value, dataField, id},
              title: 'Are you sure?',
              body: 'Update lab!',
            });
          }}
          onUpdateFields={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateFileds',
              data: {fileds, id},
              title: 'Are you sure?',
              body: 'Update records!',
            });
          }}
          onUpdateImage={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateImage',
              data: {value, dataField, id},
              title: 'Are you sure?',
              body: 'Update lab!',
            });
          }}
          onPageSizeChange={(page, limit) => {
            labStore.fetchListLab(page, limit);
            global.filter = {
              mode: 'pagination',
              page,
              limit,
            };
          }}
          onFilter={(type, filter, page, limit) => {
            labStore.LabService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {
              mode: 'filter',
              filter,
              type,
              page,
              limit,
            };
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [labStore.listLabs],
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
            show={hideAddLab}
            onClick={() => setHideAddLab(!hideAddLab)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddLab ? 'hidden' : 'shown')
            }
          >
            <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Code'
                      id='code'
                      hasError={!!errors.code}
                      placeholder={errors.code ? 'Please Enter Code' : 'Code'}
                      value={labStore.labs?.code}
                      onChange={code => {
                        onChange(code);
                        labStore.updateLabs({
                          ...labStore.labs,
                          code: code.toUpperCase(),
                        });
                      }}
                      onBlur={code => {
                        if (code)
                          labStore.LabService.checkExitsEnvCode({
                            input: {
                              code,
                              env: labStore.labs?.environment,
                            },
                          }).then(res => {
                            if (res.checkLabExitsEnvCode.success) {
                              labStore.setExitsEnvCode(true);
                              Toast.error({
                                message: `😔 ${res.checkLabExitsEnvCode.message}`,
                              });
                            } else labStore.setExitsEnvCode(false);
                          });
                      }}
                    />
                  )}
                  name='code'
                  rules={{required: true}}
                  defaultValue=''
                />
                {labStore.checkExitsEnvCode && (
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
                      hasError={!!errors.name}
                      placeholder={errors.name ? 'Please Enter Name' : 'Name'}
                      value={labStore.labs?.name}
                      onChange={name => {
                        onChange(name);
                        labStore.updateLabs({
                          ...labStore.labs,
                          name: name.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='name'
                  rules={{required: true}}
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
                          list: labStore?.addressDetails,
                          displayKey: [
                            'Name',
                            'Block',
                            'District',
                            'State',
                            'Country',
                            'Pincode',
                          ],
                        }}
                        displayValue={labStore.labs?.postalCode}
                        hasError={!!errors.postalCode}
                        onFilter={(value: string) => {
                          if (value?.length == 6) {
                            labStore.LabService?.getAddressDetailsByPincode(
                              value,
                            );
                          }
                        }}
                        onSelect={item => {
                          onChange(item.Pincode);
                          labStore.updateLabs({
                            ...labStore.labs,
                            country: item?.Country?.toUpperCase(),
                            state: item?.State?.toUpperCase(),
                            district: item?.District?.toUpperCase(),
                            city: item?.Block?.toUpperCase(),
                            area: item?.Name?.toUpperCase(),
                            postalCode: item.Pincode,
                          });
                          labStore.updateAddressDetails([]);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='postalCode'
                  rules={{required: false}}
                  defaultValue={labStore.labs.area}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Country'
                      hasError={!!errors.country}
                      placeholder='Country'
                      value={labStore.labs?.country}
                      //disabled={true}
                      onChange={country => {
                        onChange(country);
                        labStore.updateLabs({
                          ...labStore.labs,
                          country: country?.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='country'
                  rules={{required: false}}
                  defaultValue={labStore.labs}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='State'
                      hasError={!!errors.state}
                      placeholder='State'
                      value={labStore.labs?.state}
                      //disabled={true}
                      onChange={state => {
                        onChange(state);
                        labStore.updateLabs({
                          ...labStore.labs,
                          state: state?.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='state'
                  rules={{required: false}}
                  defaultValue={labStore.labs}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='District'
                      hasError={!!errors.district}
                      placeholder='District'
                      value={labStore.labs?.district}
                      //disabled={true}
                      onChange={district => {
                        onChange(district);
                        labStore.updateLabs({
                          ...labStore.labs,
                          district: district?.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='district'
                  rules={{required: false}}
                  defaultValue={labStore.labs}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='City'
                      hasError={!!errors.city}
                      placeholder='City'
                      value={labStore.labs?.city}
                      //disabled={true}
                      onChange={city => {
                        onChange(city);
                        labStore.updateLabs({
                          ...labStore.labs,
                          city: city?.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='city'
                  rules={{required: false}}
                  defaultValue={labStore.labs}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Area'
                      hasError={!!errors.area}
                      placeholder='Area'
                      value={labStore.labs?.area}
                      //disabled={true}
                      onChange={area => {
                        onChange(area);
                        labStore.updateLabs({
                          ...labStore.labs,
                          area: area?.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='area'
                  rules={{required: false}}
                  defaultValue={labStore.labs}
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
                      value={labStore.labs?.address}
                      onChange={address => {
                        onChange(address);
                        labStore.updateLabs({
                          ...labStore.labs,
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
                    <Form.InputWrapper
                      label='Sales Territory'
                      hasError={!!errors.salesTerritory}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.salesTerritory
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const salesTerritory = e.target.value;
                          onChange(salesTerritory);
                          labStore.updateLabs({
                            ...labStore.labs,
                            salesTerritory,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {salesTeamStore.listSalesTeam &&
                          _.union(
                            _.map(
                              salesTeamStore.listSalesTeam,
                              'salesTerritory',
                            ),
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='salesTerritory'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Lab Licence'
                      placeholder={
                        errors.labLicence
                          ? 'Please Enter labLicence'
                          : 'Lab Licence'
                      }
                      hasError={!!errors.labLicence}
                      value={labStore.labs?.labLicence}
                      onChange={labLicence => {
                        onChange(labLicence);
                        labStore.updateLabs({
                          ...labStore.labs,
                          labLicence,
                        });
                      }}
                    />
                  )}
                  name='labLicence'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Director'
                      placeholder={
                        errors.director ? 'Please Enter director' : 'Director'
                      }
                      hasError={!!errors.director}
                      value={labStore.labs?.director}
                      onChange={director => {
                        onChange(director);
                        labStore.updateLabs({
                          ...labStore.labs,
                          director,
                        });
                      }}
                    />
                  )}
                  name='director'
                  rules={{required: false}}
                  defaultValue=''
                />
                {/* <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Delivery Type'
                      hasError={!!errors.deliveryType}
                    >
                      <select
                        value={labStore.labs?.deliveryType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.deliveryType
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const deliveryType = e.target.value;
                          onChange(deliveryType);
                          labStore.updateLabs({
                            ...labStore.labs,
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
                  name='deliveryType'
                  rules={{required: false}}
                  defaultValue=''
                /> */}
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Physician'
                      placeholder={
                        errors.physician
                          ? 'Please Enter physician'
                          : 'Physician'
                      }
                      hasError={!!errors.physician}
                      value={labStore.labs?.physician}
                      onChange={physician => {
                        onChange(physician);
                        labStore.updateLabs({
                          ...labStore.labs,
                          physician,
                        });
                      }}
                    />
                  )}
                  name='physician'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      type='number'
                      label='Mobile Number'
                      placeholder={
                        errors.mobileNo
                          ? 'Please Enter mobileNo'
                          : 'Mobile Number'
                      }
                      pattern={FormHelper.patterns.mobileNo}
                      hasError={!!errors.mobileNo}
                      value={labStore.labs?.mobileNo}
                      onChange={mobileNo => {
                        onChange(mobileNo);
                        labStore.updateLabs({
                          ...labStore.labs,
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
                      type='number'
                      label='Contact Number'
                      placeholder={
                        errors.contactNo
                          ? 'Please Enter contactNo'
                          : 'Contact Number'
                      }
                      pattern={FormHelper.patterns.mobileNo}
                      hasError={!!errors.contactNo}
                      value={labStore.labs?.contactNo}
                      onChange={contactNo => {
                        onChange(contactNo);
                        labStore.updateLabs({
                          ...labStore.labs,
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
                    <Form.InputWrapper
                      label='Speciality'
                      hasError={!!errors.speciality}
                    >
                      <select
                        value={labStore.labs?.speciality}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.speciality
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const speciality = e.target.value;
                          onChange(speciality);
                          labStore.updateLabs({
                            ...labStore.labs,
                            speciality,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'SPECIALITY').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='speciality'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Lab type'
                      hasError={!!errors.labType}
                    >
                      <select
                        value={labStore.labs?.labType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.labType
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const labType = e.target.value;
                          onChange(labType);
                          labStore.updateLabs({
                            ...labStore.labs,
                            labType,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'LAB_TYPE').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='labType'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Default Lab'
                      hasError={!!errors.defaultLab}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        data={{
                          list: labStore?.listLabs.filter(
                            item => item.labType === 'R',
                          ),
                          displayKey: ['code', 'name'],
                        }}
                        hasError={!!errors.defaultLab}
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
                          onChange(item.code);
                          labStore.updateLabs({
                            ...labStore.labs,
                            defaultLab: item.code,
                          });
                          labStore.updateLabList(labStore.listLabsCopy);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='defaultLab'
                  rules={{required: true}}
                  defaultValue={labStore.listLabs}
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Clock
                      label='Opening Time'
                      hasError={!!errors.openingTime}
                      value={labStore.labs?.openingTime}
                      onChange={openingTime => {
                        onChange(openingTime);
                        labStore.updateLabs({
                          ...labStore.labs,
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
                      value={labStore.labs?.closingTime}
                      onChange={closingTime => {
                        onChange(closingTime);
                        labStore.updateLabs({
                          ...labStore.labs,
                          closingTime,
                        });
                      }}
                    />
                  )}
                  name='closingTime'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Email'
                      placeholder={
                        errors.email ? 'Please Enter Email' : 'Email'
                      }
                      hasError={!!errors.email}
                      value={labStore.labs?.email}
                      onChange={email => {
                        onChange(email);
                        labStore.updateLabs({
                          ...labStore.labs,
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
                    <Form.Input
                      label='Web'
                      placeholder='Web'
                      hasError={!!errors.email}
                      value={labStore.labs?.web}
                      onChange={web => {
                        onChange(web);
                        labStore.updateLabs({
                          ...labStore.labs,
                          web,
                        });
                      }}
                    />
                  )}
                  name='web'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Registered Office'
                      placeholder='Registered Office'
                      hasError={!!errors.registeredOffice}
                      value={labStore.labs?.registeredOffice}
                      onChange={registeredOffice => {
                        onChange(registeredOffice);
                        labStore.updateLabs({
                          ...labStore.labs,
                          registeredOffice,
                        });
                      }}
                    />
                  )}
                  name='registeredOffice'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Grid cols={4}>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Report Format'
                        hasError={!!errors.reportFormat}
                        value={labStore.labs?.reportFormat}
                        onChange={reportFormat => {
                          onChange(reportFormat);
                          labStore.updateLabs({
                            ...labStore.labs,
                            reportFormat,
                          });
                        }}
                      />
                    )}
                    name='reportFormat'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Print Label'
                        hasError={!!errors.printLable}
                        value={labStore.labs?.printLable}
                        onChange={printLable => {
                          onChange(printLable);
                          labStore.updateLabs({
                            ...labStore.labs,
                            printLable,
                          });
                        }}
                      />
                    )}
                    name='printLable'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Abn Flag'
                        hasError={!!errors.abnFlag}
                        value={labStore.labs?.abnFlag}
                        onChange={abnFlag => {
                          onChange(abnFlag);
                          labStore.updateLabs({
                            ...labStore.labs,
                            abnFlag,
                          });
                        }}
                      />
                    )}
                    name='abnFlag'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Critical'
                        hasError={!!errors.critical}
                        value={labStore.labs?.critical}
                        onChange={critical => {
                          onChange(critical);
                          labStore.updateLabs({
                            ...labStore.labs,
                            critical,
                          });
                        }}
                      />
                    )}
                    name='critical'
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
                      label='Customer Care'
                      placeholder='Customer Care'
                      hasError={!!errors.customerCare}
                      value={labStore.labs?.customerCare}
                      onChange={customerCare => {
                        onChange(customerCare);
                        labStore.updateLabs({
                          ...labStore.labs,
                          customerCare,
                        });
                      }}
                    />
                  )}
                  name='customerCare'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Corporate Office'
                      placeholder='Corporate Office'
                      hasError={!!errors.corporateOffice}
                      value={labStore.labs?.corporateOffice}
                      onChange={corporateOffice => {
                        onChange(corporateOffice);
                        labStore.updateLabs({
                          ...labStore.labs,
                          corporateOffice,
                        });
                      }}
                    />
                  )}
                  name='corporateOffice'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='GST'
                      placeholder='GST'
                      hasError={!!errors.gst}
                      value={labStore.labs?.gst}
                      onChange={gst => {
                        onChange(gst);
                        labStore.updateLabs({
                          ...labStore.labs,
                          gst,
                        });
                      }}
                    />
                  )}
                  name='gst'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Sac Code'
                      placeholder='Sac Code'
                      hasError={!!errors.sacCode}
                      value={labStore.labs?.sacCode}
                      onChange={sacCode => {
                        onChange(sacCode);
                        labStore.updateLabs({
                          ...labStore.labs,
                          sacCode,
                        });
                      }}
                    />
                  )}
                  name='sacCode'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='CIN No'
                      placeholder='CIN No'
                      hasError={!!errors.cinNo}
                      value={labStore.labs?.cinNo}
                      onChange={cinNo => {
                        onChange(cinNo);
                        labStore.updateLabs({
                          ...labStore.labs,
                          cinNo,
                        });
                      }}
                    />
                  )}
                  name='cinNo'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputFile
                      label='Lab logo'
                      placeholder={
                        errors.labLog ? 'Please Enter labLog' : 'LabLog'
                      }
                      hasError={!!errors.labLog}
                      onChange={e => {
                        const labLog = e.target.files[0];
                        onChange(labLog);
                        labStore.updateLabs({
                          ...labStore.labs,
                          labLog,
                        });
                      }}
                    />
                  )}
                  name='labLog'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      rows={2}
                      label='FYI line'
                      placeholder={
                        errors.fyiLine ? 'Please Enter fyiLine' : 'FYI Line'
                      }
                      hasError={!!errors.fyiLine}
                      value={labStore.labs?.fyiLine}
                      onChange={fyiLine => {
                        onChange(fyiLine);
                        labStore.updateLabs({
                          ...labStore.labs,
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
                        errors.workLine ? 'Please Enter workLine' : 'WorkLine'
                      }
                      hasError={!!errors.workLine}
                      value={labStore.labs?.workLine}
                      onChange={workLine => {
                        onChange(workLine);
                        labStore.updateLabs({
                          ...labStore.labs,
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
                        value={labStore.labs.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? 'border-red-500  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const status = e.target.value;
                          onChange(status);
                          labStore.updateLabs({
                            ...labStore.labs,
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
                    <Form.InputWrapper
                      label='Environment'
                      hasError={!!errors.environment}
                    >
                      <select
                        value={labStore.labs?.environment}
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
                          labStore.updateLabs({
                            ...labStore.labs,
                            environment,
                          });
                          labStore.LabService.checkExitsEnvCode({
                            input: {
                              code: labStore.labs?.code,
                              env: environment,
                            },
                          }).then(res => {
                            if (res.checkLabExitsEnvCode.success) {
                              labStore.setExitsEnvCode(true);
                              Toast.error({
                                message: `😔 ${res.checkLabExitsEnvCode.message}`,
                              });
                            } else labStore.setExitsEnvCode(false);
                          });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : labStore.labs?.environment || 'Select'}
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
                        label='Auto Release'
                        hasError={!!errors.autoRelease}
                        value={labStore.labs?.autoRelease}
                        onChange={autoRelease => {
                          onChange(autoRelease);
                          labStore.updateLabs({
                            ...labStore.labs,
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
                        label='Require Reveiving in Lab'
                        hasError={!!errors.requireReceveInLab}
                        value={labStore.labs?.requireReceveInLab}
                        onChange={requireReceveInLab => {
                          onChange(requireReceveInLab);
                          labStore.updateLabs({
                            ...labStore.labs,
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
                        value={labStore.labs?.requireScainIn}
                        onChange={requireScainIn => {
                          onChange(requireScainIn);
                          labStore.updateLabs({
                            ...labStore.labs,
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
                        value={labStore.labs?.routingDept}
                        onChange={routingDept => {
                          onChange(routingDept);
                          labStore.updateLabs({
                            ...labStore.labs,
                            routingDept,
                          });
                        }}
                      />
                    )}
                    name='routingDept'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Specific Format'
                        hasError={!!errors.specificFormat}
                        value={labStore.labs?.specificFormat}
                        onChange={specificFormat => {
                          onChange(specificFormat);
                          labStore.updateLabs({
                            ...labStore.labs,
                            specificFormat,
                          });
                        }}
                      />
                    )}
                    name='specificFormat'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>
            </Grid>
            <List direction='row' space={3} align='center'>
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
            </List>
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitLab)}
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
            click={(action?: string) => {
              const {mode, type, page, filter, limit} = global.filter;
              switch (action) {
                case 'Delete': {
                  labStore.LabService.deleteLab({
                    input: {id: modalConfirm.id},
                  }).then((res: any) => {
                    if (res.removeLab.success) {
                      setModalConfirm({show: false});
                      Toast.success({
                        message: `😊 ${res.removeLab.message}`,
                      });
                      if (mode == 'pagination')
                        labStore.fetchListLab(page, limit);
                      else if (mode == 'filter')
                        labStore.LabService.filter({
                          input: {type, filter, page, limit},
                        });
                      else labStore.fetchListLab();
                    }
                  });

                  break;
                }
                case 'Update': {
                  labStore.LabService.updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  }).then((res: any) => {
                    if (res.updateLab.success) {
                      setModalConfirm({show: false});
                      Toast.success({
                        message: `😊 ${res.updateLab.message}`,
                      });
                      if (mode == 'pagination')
                        labStore.fetchListLab(page, limit);
                      else if (mode == 'filter')
                        labStore.LabService.filter({
                          input: {type, filter, page, limit},
                        });
                      else labStore.fetchListLab();
                    }
                  });

                  break;
                }
                case 'UpdateFileds': {
                  labStore.LabService.updateSingleFiled({
                    input: {
                      ...modalConfirm.data.fileds,
                      _id: modalConfirm.data.id,
                    },
                  }).then((res: any) => {
                    setModalConfirm({show: false});
                    if (res.updateLab.success) {
                      Toast.success({
                        message: `😊 ${res.updateLab.message}`,
                      });
                      if (mode == 'pagination')
                        labStore.fetchListLab(page, limit);
                      else if (mode == 'filter')
                        labStore.LabService.filter({
                          input: {type, filter, page, limit},
                        });
                      else labStore.fetchListLab();
                    }
                  });

                  break;
                }
                default: {
                  labStore.LabService.updateLabImages({
                    input: {
                      _id: modalConfirm.data.id,
                      labLog: modalConfirm.data.value,
                    },
                  }).then((res: any) => {
                    if (res.updateLabImages.success) {
                      setModalConfirm({show: false});
                      Toast.success({
                        message: `😊 ${res.updateLabImages.message}`,
                      });
                      if (mode == 'pagination')
                        labStore.fetchListLab(page, limit);
                      else if (mode == 'filter')
                        labStore.LabService.filter({
                          input: {type, filter, page, limit},
                        });
                      else labStore.fetchListLab();
                    }
                  });
                }
              }
            }}
            onClose={() => {
              setModalConfirm({show: false});
            }}
          />
        </div>
      </>
    );
  }),
);

export default Lab;
