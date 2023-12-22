import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
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
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
} from '@/library/components';
import { CompanyList } from '../components';
import { lookupItems, lookupValue } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import * as XLSX from 'xlsx';
import { RouterFlow } from '@/flows';
import { resetCompany } from '../startup';
import { MultiSelect } from '@/core-components';

import { CompanyHoc } from '../hoc';
import { useStores } from '@/stores';

const Company = CompanyHoc(
  observer(() => {
    const {
      loginStore,
      routerStore,
      companyStore,
      labStore,
      interfaceManagerStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();
    useEffect(() => {
      // Default value initialization
      setValue('dateExpire', companyStore.company?.dateExpire);
      setValue('dateActive', companyStore.company?.dateActive);
      setValue('dateCreation', companyStore.company?.dateCreation);
      setValue('allowedUser', companyStore.company?.allowedUser);
      setValue('supportPlan', companyStore.company?.supportPlan);
      setValue('status', companyStore.company?.status);
      setValue('environment', companyStore.company?.environment);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyStore.company]);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isHideView, setIsHideView] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);

    const onSubmit = async () => {
      await companyStore.companyService
        .add({
          input: isImport
            ? { isImport, arrImportRecords }
            : { isImport, ...companyStore.company },
        })
        .then(res => {
          if (res.createCompany.success) {
            Toast.success({
              message: `😊 ${res.createCompany.message}`,
            });
            setIsHideView(true);
            reset();
            resetCompany();
            setArrImportRecords([]);
            setIsImport(false);
          }
        });
    };

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
            code: item.Code?.toUpperCase(),
            name: item.Name?.toUpperCase(),
            description: item.Description,
            module: item.Module,
            admin: item.Admin,
            postalCode: Number.parseInt(item['Postal Code']),
            country: item.Country,
            state: item.State,
            district: item.District,
            city: item.City,
            area: item.Area,
            address: item.Address,
            mobileNo: item['Mobile No'],
            contactNo: item['Contact No'],
            email: item.Email,
            web: item.Web,
            webPortal: item['Web Portal'],
            registeredOffice: item['Registered Office'],
            corporateOffice: item['Corporate Office'],
            customerCare: item['Customer Care'],
            gst: item.GST,
            sacCode: item['SAC Code'],
            cinNo: item['CIN No'],
            fyiLine: item['FYI Line'],
            workLine: item['Work Line'],
            environment: item?.Environment,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = companyStore.company,
      length = 0,
      status = 'A',
    ) => {
      const requiredFields = ['code', 'name', 'status', 'environment'];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields, status }[item])) return item;
      });
      if (isEmpty && length == 0) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      return companyStore.companyService
        .findByFields({
          input: {
            filter: {
              ..._.pick({ ...fields, status }, requiredFields),
            },
          },
        })
        .then(res => {
          if (
            res.findByFieldsCompany?.success &&
            res.findByFieldsCompany?.data?.length > length
          ) {
            //setIsExistsRecord(true);
            Toast.error({
              message: '😔 Already some record exists.',
            });
            return true;
          } else return false;
        });
    };

    const onUpdateSingleField = payload => {
      companyStore.companyService
        .update({
          input: {
            ...payload,
          },
        })
        .then((res: any) => {
          setModalConfirm({ show: false });
          if (res.updateCompany.success) {
            Toast.success({
              message: `😊 ${res.updateCompany.message}`,
            });
            if (global?.filter?.mode == 'pagination')
              companyStore.companyService.list(
                global?.filter?.page,
                global?.filter?.limit,
              );
            else if (global?.filter?.mode == 'filter')
              companyStore.companyService.filter({
                input: {
                  type: global?.filter?.type,
                  filter: global?.filter?.filter,
                  page: global?.filter?.page,
                  limit: global?.filter?.limit,
                },
              });
            else companyStore.companyService.list();
          }
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
            show={isHideView}
            onClick={() => setIsHideView(!isHideView)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (isHideView ? 'hidden' : 'shown')
            }
          >
            <ManualImportTabs
              isImport={isImport}
              isImportDisable={true}
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
                        label='Code'
                        placeholder={errors.code ? 'Please Enter code' : 'Code'}
                        hasError={!!errors.code}
                        value={value}
                        onChange={code => {
                          onChange(code?.toUpperCase());
                          companyStore.updateCompany({
                            ...companyStore.company,
                            code: code?.toUpperCase(),
                          });
                        }}
                        onBlur={async code => {
                          if (code) {
                            await checkExistsRecords(
                              {
                                ...companyStore.company,
                                code: code?.toUpperCase(),
                              },
                              1,
                            );
                          }
                        }}
                      />
                    )}
                    name='code'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Name'
                        placeholder={errors.name ? 'Please Enter name' : 'Name'}
                        hasError={!!errors.name}
                        value={value}
                        onChange={name => {
                          onChange(name?.toUpperCase());
                          companyStore.updateCompany({
                            ...companyStore.company,
                            name: name?.toUpperCase(),
                          });
                        }}
                        onBlur={async name => {
                          if (name) {
                            await checkExistsRecords(
                              {
                                ...companyStore.company,
                                name: name?.toUpperCase(),
                              },
                              1,
                            );
                          }
                        }}
                      />
                    )}
                    name='name'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.MultilineInput
                        rows={3}
                        label='Description'
                        placeholder='Description'
                        value={value}
                        hasError={!!errors.description}
                        onBlur={description => {
                          onChange(description);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            description,
                          });
                        }}
                      />
                    )}
                    name='description'
                    rules={{ required: false }}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Module'
                        hasError={!!errors.module}
                      >
                        <MultiSelect
                          hasError={!!errors.module}
                          options={lookupItems(
                            routerStore.lookupItems,
                            'MODULE',
                          ).map(item => item.code)}
                          onSelect={module => {
                            onChange(module);
                            companyStore.updateCompany({
                              ...companyStore.company,
                              module,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='module'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Lab'
                        placeholder={errors.lab ? 'Please Enter lab' : 'Lab'}
                        hasError={!!errors.lab}
                        value={value}
                        onChange={lab => {
                          onChange(lab?.toUpperCase());
                          companyStore.updateCompany({
                            ...companyStore.company,
                            lab: lab?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='lab'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  {/* <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper label='Allowed Lab'>
                        <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                          loader={false}
                          placeholder='Search by code'
                          data={{
                            list: labStore.listLabs || [],
                            selected:
                              companyStore.selectedItems?.allowedLab || [],
                            displayKey: ['code', 'name'],
                          }}
                          hasError={!!errors.allowedLab}
                          onUpdate={item => {
                            const allowedLab =
                              companyStore.selectedItems?.allowedLab;
                            companyStore.updateCompany({
                              ...companyStore.company,
                              allowedLab,
                            });
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
                            let allowedLab =
                              companyStore.selectedItems?.allowedLab;
                            if (!item.selected) {
                              if (allowedLab && allowedLab?.length > 0) {
                                allowedLab?.push(item);
                              } else allowedLab = [item];
                            } else {
                              allowedLab = allowedLab?.filter(items => {
                                return items._id !== item._id;
                              });
                            }
                            companyStore.updateSelectedItems({
                              ...companyStore.selectedItems,
                              allowedLab,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='allowedLab'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper label='Allowed Instrument'>
                        <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                          loader={false}
                          placeholder='Search by code'
                          data={{
                            list:
                              interfaceManagerStore.listInterfaceManager || [],
                            selected:
                              companyStore.selectedItems?.allowedInstrument ||
                              [],
                            displayKey: ['instrumentName'],
                          }}
                          hasError={!!errors.allowedInstrument}
                          onUpdate={item => {
                            const allowedInstrument =
                              companyStore.selectedItems?.allowedInstrument;
                            companyStore.updateCompany({
                              ...companyStore.company,
                              allowedInstrument,
                            });
                          }}
                          onFilter={(value: string) => {
                            labStore.LabService.filterByFields({
                              input: {
                                filter: {
                                  fields: ['instrumentName'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            });
                          }}
                          onSelect={item => {
                            onChange(new Date());
                            let allowedInstrument =
                              companyStore.selectedItems?.allowedInstrument;
                            if (!item.selected) {
                              if (
                                allowedInstrument &&
                                allowedInstrument?.length > 0
                              ) {
                                allowedInstrument?.push(item);
                              } else allowedInstrument = [item];
                            } else {
                              allowedInstrument = allowedInstrument?.filter(
                                items => {
                                  return items._id !== item._id;
                                },
                              );
                            }
                            companyStore.updateSelectedItems({
                              ...companyStore.selectedItems,
                              allowedInstrument,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='allowedInstrument'
                    rules={{ required: false }}
                    defaultValue=''
                  /> */}
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Department'
                        placeholder={
                          errors.department
                            ? 'Please Enter department'
                            : 'Department'
                        }
                        hasError={!!errors.department}
                        value={value}
                        onChange={department => {
                          onChange(department?.toUpperCase());
                          companyStore.updateCompany({
                            ...companyStore.company,
                            department: department?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='department'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Allowed User'
                        type='number'
                        placeholder={
                          errors.allowedUser
                            ? 'Please Enter allowedUser'
                            : 'Allowed User'
                        }
                        hasError={!!errors.allowedUser}
                        value={value?.toString()}
                        onChange={allowedUser => {
                          onChange(allowedUser);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            allowedUser: Number.parseInt(allowedUser),
                          });
                        }}
                      />
                    )}
                    name='allowedUser'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Admin'
                        placeholder={
                          errors.admin ? 'Please Enter admin' : 'Admin'
                        }
                        hasError={!!errors.admin}
                        value={value}
                        onChange={admin => {
                          onChange(admin?.toUpperCase());
                          companyStore.updateCompany({
                            ...companyStore.company,
                            admin: admin?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='admin'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputPassword
                        label='Password'
                        placeholder={
                          errors.password ? 'Please Enter password' : 'Password'
                        }
                        hasError={!!errors.password}
                        value={value}
                        onChange={password => {
                          onChange(password);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            password,
                          });
                        }}
                      />
                    )}
                    name='password'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Postal Code'
                        type='number'
                        placeholder={
                          errors.postalCode
                            ? 'Please Enter postal code'
                            : 'Postal Code'
                        }
                        hasError={!!errors.postalCode}
                        value={value}
                        onChange={postalCode => {
                          onChange(postalCode);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            postalCode: Number.parseInt(postalCode),
                          });
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
                        placeholder={
                          errors.country ? 'Please Enter country' : 'Country'
                        }
                        hasError={!!errors.country}
                        value={value}
                        onChange={country => {
                          onChange(country);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            country,
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
                        placeholder={
                          errors.state ? 'Please Enter state' : 'State'
                        }
                        hasError={!!errors.state}
                        value={value}
                        onChange={state => {
                          onChange(state);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            state,
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
                        placeholder={
                          errors.district ? 'Please Enter state' : 'State'
                        }
                        hasError={!!errors.district}
                        value={value}
                        onChange={district => {
                          onChange(district);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            district,
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
                        placeholder={errors.city ? 'Please Enter city' : 'City'}
                        hasError={!!errors.city}
                        value={value}
                        onChange={city => {
                          onChange(city);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            city,
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
                        placeholder={errors.area ? 'Please Enter area' : 'Area'}
                        hasError={!!errors.area}
                        value={value}
                        onChange={area => {
                          onChange(area);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            area,
                          });
                        }}
                      />
                    )}
                    name='area'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.MultilineInput
                        rows={3}
                        label='Address'
                        placeholder='Address'
                        value={value}
                        hasError={!!errors.address}
                        onBlur={address => {
                          onChange(address);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            address,
                          });
                        }}
                      />
                    )}
                    name='address'
                    rules={{ required: false }}
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Mobile No'
                        placeholder={
                          errors.mobileNo
                            ? 'Please Enter mobile number'
                            : 'Mobile No'
                        }
                        hasError={!!errors.mobileNo}
                        value={value}
                        onChange={mobileNo => {
                          onChange(mobileNo);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            mobileNo,
                          });
                        }}
                      />
                    )}
                    name='mobileNo'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Contact No'
                        placeholder={
                          errors.contactNo
                            ? 'Please Enter contact number'
                            : 'Contact No'
                        }
                        hasError={!!errors.contactNo}
                        value={value}
                        onChange={contactNo => {
                          onChange(contactNo);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            contactNo,
                          });
                        }}
                      />
                    )}
                    name='contactNo'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Email'
                        type='email'
                        placeholder={
                          errors.email ? 'Please Enter email' : 'Email'
                        }
                        hasError={!!errors.email}
                        value={value}
                        onChange={email => {
                          onChange(email);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            email,
                          });
                        }}
                      />
                    )}
                    name='email'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Web Link'
                        placeholder={errors.web ? 'Please enter web' : 'Web'}
                        hasError={!!errors.web}
                        value={value}
                        onChange={web => {
                          onChange(web);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            web,
                          });
                        }}
                      />
                    )}
                    name='web'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Web Portal Link'
                        placeholder={
                          errors.webPortal
                            ? 'Please enter web portal'
                            : 'Web Portal'
                        }
                        hasError={!!errors.webPortal}
                        value={value}
                        onChange={webPortal => {
                          onChange(webPortal);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            webPortal,
                          });
                        }}
                      />
                    )}
                    name='webPortal'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.MultilineInput
                        rows={3}
                        label='Registered Office'
                        placeholder='Registered Office'
                        value={value}
                        hasError={!!errors.registeredOffice}
                        onBlur={registeredOffice => {
                          onChange(registeredOffice);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            registeredOffice,
                          });
                        }}
                      />
                    )}
                    name='registeredOffice'
                    rules={{ required: false }}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.MultilineInput
                        rows={3}
                        label='Corporate Office'
                        placeholder='Corporate Office'
                        value={value}
                        hasError={!!errors.corporateOffice}
                        onBlur={corporateOffice => {
                          onChange(corporateOffice);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            corporateOffice,
                          });
                        }}
                      />
                    )}
                    name='corporateOffice'
                    rules={{ required: false }}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Customer Care'
                        placeholder={
                          errors.customerCare
                            ? 'Please enter customer care'
                            : 'Customer Care'
                        }
                        hasError={!!errors.customerCare}
                        value={value}
                        onChange={customerCare => {
                          onChange(customerCare);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            customerCare,
                          });
                        }}
                      />
                    )}
                    name='customerCare'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='GST'
                        placeholder={errors.gst ? 'Please enter gst' : 'GST'}
                        hasError={!!errors.gst}
                        value={value}
                        onChange={gst => {
                          onChange(gst);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            gst,
                          });
                        }}
                      />
                    )}
                    name='gst'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='SAC Code'
                        placeholder={
                          errors.sacCode ? 'Please enter sac code' : 'SAC Code'
                        }
                        hasError={!!errors.sacCode}
                        value={value}
                        onChange={sacCode => {
                          onChange(sacCode);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            sacCode,
                          });
                        }}
                      />
                    )}
                    name='sacCode'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='CIN No'
                        placeholder={
                          errors.cinNo ? 'Please enter cin no' : 'CIN No'
                        }
                        hasError={!!errors.cinNo}
                        value={value}
                        onChange={cinNo => {
                          onChange(cinNo);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            cinNo,
                          });
                        }}
                      />
                    )}
                    name='cinNo'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputFile
                        label='Company Logo'
                        placeholder={
                          errors.companyLogo
                            ? 'Please insert company logo'
                            : 'Company Logo'
                        }
                        value={value ? value?.companyLogo : ''}
                        hasError={!!errors.companyLogo}
                        onChange={e => {
                          const companyLogo = e.target.files[0];
                          onChange(companyLogo);
                          companyStore.updateCompany({
                            ...companyStore.company,
                            companyLogo,
                          });
                        }}
                      />
                    )}
                    name='companyLogo'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.MultilineInput
                        rows={3}
                        label='FYI Line'
                        placeholder={
                          errors.fyiLine ? 'Please enter FYI line' : 'FYI Line'
                        }
                        hasError={!!errors.fyiLine}
                        value={value}
                        onChange={fyiLine => {
                          onChange(fyiLine);
                          companyStore.updateCompany({
                            ...companyStore.company,
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
                        rows={3}
                        label='Work Line'
                        placeholder={
                          errors.workLine
                            ? 'Please enter work line'
                            : 'Work Line'
                        }
                        hasError={!!errors.workLine}
                        value={value}
                        onChange={workLine => {
                          onChange(workLine);
                          companyStore.updateCompany({
                            ...companyStore.company,
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
                    render={({ field: { value } }) => (
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
                    render={({ field: { value } }) => (
                      <Form.InputDateTime
                        label='Date Active'
                        placeholder={'Date Active'}
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
                        label='Date Expire'
                        placeholder={
                          errors.dateExpire
                            ? 'Please Enter schedule'
                            : 'Date Expire'
                        }
                        hasError={!!errors.dateExpire}
                        value={value}
                        onChange={dateExpire => {
                          onChange(dateExpire);
                          companyStore.updateCompany({
                            ...companyStore.company,
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
                        placeholder='Version'
                        value={companyStore.company.version}
                        disabled
                      />
                    )}
                    name='version'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Support Plan'
                        hasError={!!errors.supportPlan}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.supportPlan
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const supportPlan = e.target.value;
                            onChange(supportPlan);
                            companyStore.updateCompany({
                              ...companyStore.company,
                              supportPlan,
                            });
                          }}
                        >
                          <option selected>{value || 'Select'}</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'SUPPORT_PLAN',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='supportPlan'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
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
                            companyStore.updateCompany({
                              ...companyStore.company,
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
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Environment'
                        hasError={!!errors.environment}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.environment
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const environment = e.target.value;
                            onChange(environment);
                            companyStore.updateCompany({
                              ...companyStore.company,
                              environment: [environment],
                            });
                          }}
                        >
                          <option selected>Select</option>
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
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size='medium'
                type='outline'
                icon={Svg.Remove}
                onClick={() => {
                  reset();
                  resetCompany();
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <div className='p-2 rounded-lg shadow-xl overflow-auto'>
            <CompanyList
              data={companyStore.companyList || []}
              totalSize={companyStore.companyListCount}
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
                  data: { value, dataField, id },
                  title: 'Are you sure?',
                  body: 'Update banner!',
                });
              }}
              onUpdateImage={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'UpdateImage',
                  data: { value, dataField, id },
                  title: 'Are you sure?',
                  body: 'Update banner!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                companyStore.companyService.list(page, limit);
                global.filter = { mode: 'pagination', page, limit };
              }}
              onFilter={(type, filter, page, limit) => {
                companyStore.companyService.filter({
                  input: { type, filter, page, limit },
                });
                global.filter = {
                  mode: 'filter',
                  type,
                  filter,
                  page,
                  limit,
                };
              }}
              onApproval={async records => {
                setModalConfirm({
                  show: true,
                  type: 'Update',
                  data: { value: 'A', dataField: 'status', id: records._id },
                  title: 'Are you sure?',
                  body: 'Update deginisation!',
                });
              }}
              onSingleDirectUpdateField={(value, dataField, id) => {
                onUpdateSingleField({
                  _id: id,
                  [dataField]: value,
                });
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action: string) => {
              switch (action) {
                case 'Delete': {
                  companyStore.companyService
                    .delete({
                      input: { id: modalConfirm.id },
                    })
                    .then((res: any) => {
                      setModalConfirm({ show: false });
                      if (res.removeCompany.success) {
                        Toast.success({
                          message: `😊 ${res.removeCompany.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          companyStore.companyService.list(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          companyStore.companyService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else companyStore.companyService.list();
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

                case 'UpdateImage': {
                  companyStore.companyService
                    .update({
                      input: {
                        _id: modalConfirm.data.id,
                        file: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      setModalConfirm({ show: false });
                      if (res.updateBannerImage.success) {
                        Toast.success({
                          message: `😊 ${res.updateBannerImage.message}`,
                        });
                        setTimeout(() => {
                          companyStore.companyService.list();
                        }, 2000);
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

export default Company;
