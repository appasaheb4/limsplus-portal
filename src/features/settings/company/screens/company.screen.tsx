import React, { useState, useEffect } from 'react';
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
} from '@/library/components';
import { BannerList } from '../components';
import { lookupItems, lookupValue } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import { RouterFlow } from '@/flows';

import { CompanyHoc } from '../hoc';
import { useStores } from '@/stores';

const Company = CompanyHoc(
  observer(() => {
    const { loginStore, routerStore, companyStore } = useStores();
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
      setValue('environment', companyStore.company?.environment);
      setValue('status', companyStore.company?.status);
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
            // resetBanner();
            setArrImportRecords([]);
            setIsImport(false);
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
            show={!isHideView}
            onClick={() => setIsHideView(!isHideView)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (!isHideView ? 'hidden' : 'shown')
            }
          >
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
                        onChange(code);
                        companyStore.updateCompany({
                          ...companyStore.company,
                          code,
                        });
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
                        onChange(name);
                        companyStore.updateCompany({
                          ...companyStore.company,
                          name,
                        });
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
                    <Form.Input
                      label='Module'
                      placeholder={
                        errors.module ? 'Please Enter module' : 'Module'
                      }
                      hasError={!!errors.module}
                      value={value}
                      onChange={module => {
                        onChange(module);
                        companyStore.updateCompany({
                          ...companyStore.company,
                          module,
                        });
                      }}
                    />
                  )}
                  name='module'
                  rules={{ required: false }}
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
                        onChange(admin);
                        companyStore.updateCompany({
                          ...companyStore.company,
                          admin,
                        });
                      }}
                    />
                  )}
                  name='admin'
                  rules={{ required: false }}
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
                  rules={{ required: false }}
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
                          postalCode,
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
                      label='Web'
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
                      label='Web Portal'
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
                  rules={{ required: false }}
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
                        errors.workLine ? 'Please enter work line' : 'Work Line'
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
                    <Form.InputWrapper label='Environment'>
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
                          companyStore.updateCompany({
                            ...companyStore.company,
                            environment,
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
                  // resetBanner();
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <div className='p-2 rounded-lg shadow-xl overflow-auto'>
            <BannerList
              data={companyStore.companyList || []}
              totlaSize={companyStore.companyListCount}
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
                      if (res.removeBanner.success) {
                        Toast.success({
                          message: `😊 ${res.removeBanner.message}`,
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
                  companyStore.companyService
                    .update({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      setModalConfirm({ show: false });
                      if (res.updateBanner.success) {
                        Toast.success({
                          message: `😊 ${res.updateBanner.message}`,
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
