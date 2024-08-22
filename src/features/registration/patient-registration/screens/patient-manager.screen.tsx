import React, { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Buttons,
  List,
  Grid,
  Svg,
  Toast,
  ModalConfirm,
  Form,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Icons,
} from '@/library/components';
import dayjs from 'dayjs';
import { lookupItems, lookupValue } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import { PatientMangerList, ExtraDataPatientManagerList } from '../components';
import { FormHelper } from '@/helper';
import { PatientManagerHoc } from '../hoc';

import { useStores } from '@/stores';
import { toJS } from 'mobx';
import { RouterFlow } from '@/flows';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';
import {
  getAgeByAgeObject,
  getDiffByDate,
  dateAvailableUnits,
} from '@/core-utils';
import { getFilterField } from '../utils';
import { resetPatientManager } from '../startup';

export const PatientManager = PatientManagerHoc(
  observer(() => {
    const {
      loading,
      loginStore,
      patientManagerStore,
      routerStore,
      administrativeDivisions,
      doctorsStore,
      labStore,
      patientRegistrationStore,
      environmentStore,
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
      clearErrors,
      setError,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideInputView, setHideInputView] = useState<boolean>(true);
    const [isPMMobileNoRequired, setIsPMMobileNoRequired] =
      useState<boolean>(true);

    useEffect(() => {
      // Default value initialization
      setValue('birthDate', patientManagerStore.patientManger.birthDate);
      setValue('species', patientManagerStore.patientManger.species);
      setValue('pId', patientManagerStore.patientManger?.pId);
      setValue('txtMobileNo', patientManagerStore.patientManger?.mobileNo);
      setValue(
        'isPatientMobileNo',
        patientManagerStore.patientManger?.isPatientMobileNo,
      );
      setValue('sex', patientManagerStore.patientManger?.sex);
      setValue(
        'postalCode',
        patientManagerStore.patientManger?.extraData?.postcode,
      );
      setValue(
        'country',
        patientManagerStore.patientManger?.extraData?.country,
      );
      setValue('state', patientManagerStore.patientManger?.extraData?.state);
      setValue(
        'district',
        patientManagerStore.patientManger?.extraData?.district,
      );
      setValue('city', patientManagerStore.patientManger?.extraData?.city);
      setValue('area', patientManagerStore.patientManger?.extraData?.area);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientManagerStore.patientManger]);

    const onSubmitPatientManager = () => {
      try {
        if (!patientManagerStore.checkExistsPatient) {
          patientManagerStore.patientManagerService
            .addPatientManager({
              input: {
                ...patientManagerStore.patientManger,
                documentType: 'patientManager',
                breed:
                  patientManagerStore.patientManger?.breed === null
                    ? undefined
                    : patientManagerStore.patientManger?.breed,
                middleName:
                  patientManagerStore.patientManger?.middleName === ''
                    ? undefined
                    : patientManagerStore.patientManger?.middleName,
              },
            })
            .then(res => {
              if (res.createPatientManager?.success) {
                const { result } = res.createPatientManager;
                Toast.success({
                  message: `😊 ${res.createPatientManager.message}`,
                });
                setHideInputView(true);
                reset();
                resetPatientManager();
                setTimeout(async () => {
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
                    pId: result?.pId?.toString(),
                    accordionExpandItem: 'PATIENT VISIT',
                    isPVPIdLock: true,
                    isPatientFormOpen: true,
                  });
                  await patientRegistrationStore.getPatientRegRecords(
                    'pId',
                    result?.pId?.toString(),
                  );
                }, 1000);
              } else {
                Toast.error({
                  message: `😔 ${res.createPatientManager.message}`,
                });
              }
            });
        } else {
          Toast.warning({
            message: '😔 Please enter unique details',
          });
        }
      } catch (error) {
        console.log({ error });
      }
    };

    const extraTable = useMemo(
      () => (
        <ExtraDataPatientManagerList
          data={patientManagerStore.listPatientManger}
          totalSize={patientManagerStore.listPatientMangerCount}
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
            'Update',
          )}
          onDelete={selectedItem => setModalConfirm(selectedItem)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Delete selected records!',
            });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'update',
              data: { value, dataField, id },
              title: 'Are you sure?',
              body: 'Do you want to update this record?',
            });
          }}
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'updateFileds',
              data: { fileds, id },
              title: 'Are you sure?',
              body: 'Do you want to update this record?',
            });
          }}
          onPageSizeChange={(page, limit) => {
            patientManagerStore.patientManagerService.listPatientManager(
              { documentType: 'patientManager' },
              page,
              limit,
            );
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            patientManagerStore.patientManagerService.filter({
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
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [patientManagerStore.listPatientManger],
    );

    const onUpdateField = field => {
      patientManagerStore.patientManagerService
        .updateSingleFiled({
          input: {
            ...field,
          },
        })
        .then((res: any) => {
          if (res.updatePatientManager.success) {
            Toast.success({
              message: `😊 ${res.updatePatientManager.message}`,
            });
            for (const [key, value] of Object.entries(
              patientRegistrationStore.defaultValues,
            )) {
              if (!_.isEmpty(value)) {
                patientRegistrationStore.getPatientRegRecords(key, value);
              }
              break;
            }
          }
        });
    };

    // fetch environment variable
    useEffect(() => {
      environmentStore.EnvironmentService.findByFields({
        input: {
          filter: { variable: 'IS_PM_MOBILE_NO_REQUIRED' },
        },
      }).then(res => {
        if (res.findByFieldsEnviroment?.success) {
          setIsPMMobileNoRequired(
            res.findByFieldsEnviroment?.data[0]?.value?.toLowerCase() == 'yes'
              ? true
              : false,
          );
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkExistsRecords = async (
      fields: any = patientManagerStore.patientManger,
      isSingleCheck = false,
    ) => {
      const requiredFields = isPMMobileNoRequired
        ? ['mobileNo', 'birthDate']
        : ['birthDate'];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields }[item])) return item;
      });
      if (isEmpty && !isSingleCheck) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      return patientManagerStore.patientManagerService
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
          if (res.findByFieldsLabs?.success) {
            patientManagerStore.updateExistsPatient(true);
            Toast.error({
              message: '😔 Already some record exists.',
            });
            return true;
          } else {
            patientManagerStore.updateExistsPatient(false);
            return false;
          }
        });
    };

    return (
      <>
        <div
          className='flex justify-end'
          style={{ position: 'absolute', right: '42px', top: '10px' }}
        >
          {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
            <Buttons.ButtonCircleAddRemoveBottom
              show={hideInputView}
              onClick={() => {
                window.scroll({
                  top: 250,
                  behavior: 'smooth',
                });
                setHideInputView(!hideInputView);
              }}
            />
          )}
        </div>
        <div
          className={
            'p-1 rounded-lg shadow-xl ' + (hideInputView ? 'hidden' : 'shown')
          }
        >
          <div className='p-2 rounded-lg shadow-xl'>
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                <div className='flex flex-row gap-4'>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Toggle
                        label='Patient Mobile Number'
                        hasError={!!errors.isPatientMobileNo}
                        value={value}
                        onChange={isPatientMobileNo => {
                          onChange(isPatientMobileNo);
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            isPatientMobileNo,
                          });
                        }}
                      />
                    )}
                    name='isPatientMobileNo'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Mobile No'
                        placeholder={
                          errors.txtMobileNo
                            ? 'Please Enter MobileNo'
                            : 'Mobile No'
                        }
                        hasError={!!errors.txtMobileNo}
                        type='number'
                        className='w-full'
                        pattern={FormHelper.patterns.mobileNo}
                        value={value}
                        onChange={mobileNo => {
                          onChange(mobileNo);
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            mobileNo,
                            extraData: {
                              ...patientManagerStore.patientManger?.extraData,
                              whatsappNumber: mobileNo,
                            },
                          });
                        }}
                        onBlur={mobileNo => {
                          if (mobileNo) {
                            checkExistsRecords(
                              {
                                firstName:
                                  patientManagerStore.patientManger?.firstName,
                                lastName:
                                  patientManagerStore.patientManger?.lastName,
                                mobileNo,
                                birthDate:
                                  patientManagerStore.patientManger?.birthDate,
                              },
                              true,
                            );
                          }
                        }}
                      />
                    )}
                    name='txtMobileNo'
                    rules={{
                      required: isPMMobileNoRequired,
                      pattern: FormHelper.patterns.mobileNo,
                    }}
                    defaultValue=''
                  />
                </div>

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className='flex flex-row gap-11 items-center'>
                      <Form.Toggle
                        label='Birthdate Availabe'
                        value={
                          patientManagerStore.patientManger?.isBirthdateAvailabe
                        }
                        onChange={isBirthdateAvailabe => {
                          //onChange(isBirthdateAvailabe);
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            isBirthdateAvailabe,
                          });
                        }}
                      />
                      {patientManagerStore.patientManger
                        .isBirthdateAvailabe && (
                        <Form.DatePicker
                          label='Birthdate'
                          placeholder={
                            errors.birthDate
                              ? 'Please Enter BirthDate'
                              : 'BirthDate'
                          }
                          use12Hours={false}
                          hasError={!!errors.birthDate}
                          value={value}
                          maxDate={new Date()}
                          onChange={birthDate => {
                            const selectedBirthDate = new Date(birthDate);
                            const currentDate = new Date();
                            if (selectedBirthDate < currentDate) {
                              onChange(birthDate);
                              if (
                                dayjs(new Date()).diff(
                                  dayjs(birthDate),
                                  'year',
                                ) < 150
                              ) {
                                setValue(
                                  'age',
                                  getAgeByAgeObject(getDiffByDate(birthDate))
                                    ?.age,
                                );
                                if (
                                  dayjs(new Date()).diff(
                                    dayjs(birthDate),
                                    'hour',
                                  ) > 0
                                ) {
                                  patientManagerStore.updatePatientManager({
                                    ...patientManagerStore.patientManger,
                                    birthDate,
                                    isBirthdateAvailabe: true,
                                    age:
                                      getAgeByAgeObject(
                                        getDiffByDate(birthDate),
                                      ).age || 0,
                                    ageUnit: getAgeByAgeObject(
                                      getDiffByDate(birthDate),
                                    ).ageUnit,
                                  });
                                  checkExistsRecords(
                                    {
                                      firstName:
                                        patientManagerStore.patientManger
                                          ?.firstName,
                                      lastName:
                                        patientManagerStore.patientManger
                                          ?.lastName,
                                      mobileNo:
                                        patientManagerStore.patientManger
                                          ?.mobileNo,
                                      birthDate,
                                    },
                                    true,
                                  );
                                }
                              }
                            } else {
                              Toast.error({
                                message:
                                  'Birthdate should not be  greater then Current Date',
                              });
                            }
                          }}
                        />
                      )}
                    </div>
                  )}
                  name='birthDate'
                  rules={{
                    required:
                      patientManagerStore.patientManger?.isBirthdateAvailabe,
                  }}
                  defaultValue=''
                />
                {!patientManagerStore.patientManger.isBirthdateAvailabe && (
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className='flex flex-row items-center  gap-4'>
                        <Form.Input
                          label='Age'
                          placeholder={'Age'}
                          hasError={!!errors.age}
                          type='number'
                          value={value}
                          onChange={age => {
                            onChange(age);
                            setValue(
                              'birthDate',
                              new Date(dayjs().add(-age, 'years').format()),
                            );
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              age: Number.parseInt(age),
                              isBirthdateAvailabe: false,
                              birthDate: new Date(
                                dayjs().add(
                                  -age,
                                  dateAvailableUnits(
                                    patientManagerStore.patientManger?.ageUnit,
                                  ),
                                ) as any,
                              ),
                            });
                          }}
                        />
                        <Form.InputWrapper label='Age Units'>
                          <select
                            className={
                              'leading-4 p-2 h-11 focus:outline-none focus:ring block w-20 shadow-sm sm:text-base border-2 border-gray-300 rounded-md'
                            }
                            value={patientManagerStore.patientManger?.ageUnit}
                            onChange={e => {
                              const ageUnit = e.target.value as any;
                              patientManagerStore.updatePatientManager({
                                ...patientManagerStore.patientManger,
                                ageUnit,
                                //isBirthdateAvailabe: false,
                                birthDate: new Date(
                                  dayjs().add(
                                    -patientManagerStore.patientManger?.age,
                                    dateAvailableUnits(ageUnit),
                                  ) as any,
                                ),
                              });
                            }}
                          >
                            <option>Select</option>
                            {[
                              { title: 'year', value: 'Y' },
                              { title: 'month', value: 'M' },
                              { title: 'week', value: 'W' },
                              { title: 'day', value: 'D' },
                              { title: 'hour', value: 'H' },
                            ].map((item: any, index: number) => (
                              <option key={index} value={item.value}>
                                {item.value}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      </div>
                    )}
                    name='age'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                )}

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.InputWrapper label='Title' hasError={!!errors.title}>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.title ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const title = e.target.value;
                          const sex = lookupItems(
                            routerStore.lookupItems,
                            'PATIENT MANAGER - SEX_BY_TITLE',
                          )
                            .find(item => item.code === title)
                            ?.value?.split('-')[0];
                          onChange(title);
                          if (sex) {
                            setValue('sex', sex);
                            clearErrors('sex');
                          }
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            title,
                            sex,
                          });
                        }}
                      >
                        <option>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'PATIENT MANAGER - TITLE',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='title'
                  rules={{ required: true }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='First Name'
                      name='txtFirstName'
                      placeholder={
                        errors.firstName
                          ? 'Please Enter FirstName'
                          : 'First Name'
                      }
                      hasError={!!errors.firstName}
                      value={value}
                      onChange={firstNameValue => {
                        const firstName = firstNameValue?.toUpperCase();
                        onChange(firstName);
                        patientManagerStore.updatePatientManager({
                          ...patientManagerStore.patientManger,
                          firstName,
                        });
                        if (!_.isEmpty(firstName)) clearErrors('lastName');
                        if (
                          _.isEmpty(firstName) &&
                          _.isEmpty(patientManagerStore.patientManger.lastName)
                        ) {
                          setError('firstName', { type: 'onBlur' });
                          setError('lastName', { type: 'onBlur' });
                        }
                      }}
                      onBlur={inFirstName => {
                        const names = inFirstName.split(' ');
                        let firstName = inFirstName;
                        let lastName =
                          patientManagerStore.patientManger?.lastName;
                        if (names?.length > 0 && names?.length == 2) {
                          firstName = names[0]?.toUpperCase();
                          onChange(firstName);
                          lastName = names[1]?.toUpperCase();
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            firstName: names[0]?.toUpperCase(),
                            lastName: names[1]?.toUpperCase(),
                          });
                          setValue('lastName', lastName);
                        }
                        if (names?.length > 0 && names?.length == 3) {
                          firstName = names[0]?.toUpperCase();
                          onChange(firstName);
                          lastName = names[2]?.toUpperCase();
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            firstName: names[0]?.toUpperCase(),
                            middleName: names[1]?.toUpperCase(),
                            lastName: names[2]?.toUpperCase(),
                          });
                          setValue('lastName', lastName);
                          setValue('middleName', names[1]?.toUpperCase());
                        }
                        if (inFirstName) {
                          checkExistsRecords(
                            {
                              firstName,
                              lastName,
                              mobileNo:
                                patientManagerStore.patientManger?.mobileNo,
                              birthDate:
                                patientManagerStore.patientManger?.birthDate,
                            },
                            true,
                          );
                        }
                      }}
                    />
                  )}
                  name='firstName'
                  rules={{
                    required:
                      _.isEmpty(patientManagerStore.patientManger?.firstName) &&
                      _.isEmpty(patientManagerStore.patientManger.lastName)
                        ? true
                        : !_.isEmpty(
                            patientManagerStore.patientManger?.firstName,
                          ) ||
                          !_.isEmpty(patientManagerStore.patientManger.lastName)
                        ? false
                        : true,
                  }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Middle Name'
                      placeholder={
                        errors.middleName
                          ? 'Please Enter MiddleName'
                          : 'Middle Name'
                      }
                      hasError={!!errors.middleName}
                      value={value}
                      onChange={middleNameValue => {
                        const middleName = middleNameValue?.toUpperCase();
                        onChange(middleName);
                        patientManagerStore.updatePatientManager({
                          ...patientManagerStore.patientManger,
                          middleName,
                        });
                      }}
                    />
                  )}
                  name='middleName'
                  rules={{ required: false }}
                  defaultValue=''
                />
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Last Name'
                      placeholder={
                        errors.lastName ? 'Please Enter LastName' : 'Last Name'
                      }
                      hasError={!!errors.lastName}
                      value={value}
                      onChange={lastNameValue => {
                        const lastName = lastNameValue?.toUpperCase();
                        onChange(lastName);
                        patientManagerStore.updatePatientManager({
                          ...patientManagerStore.patientManger,
                          lastName,
                        });
                        if (!_.isEmpty(lastName)) clearErrors('firstName');
                        if (
                          _.isEmpty(
                            patientManagerStore.patientManger?.firstName,
                          ) &&
                          _.isEmpty(lastName)
                        ) {
                          setError('firstName', { type: 'onBlur' });
                          setError('lastName', { type: 'onBlur' });
                        }
                      }}
                      onBlur={lastName => {
                        if (lastName) {
                          checkExistsRecords(
                            {
                              firstName:
                                patientManagerStore.patientManger?.firstName,
                              lastName,
                              mobileNo:
                                patientManagerStore.patientManger?.mobileNo,
                              birthDate:
                                patientManagerStore.patientManger?.birthDate,
                            },
                            true,
                          );
                        }
                      }}
                    />
                  )}
                  name='lastName'
                  rules={{
                    required:
                      _.isEmpty(patientManagerStore.patientManger?.firstName) &&
                      _.isEmpty(patientManagerStore.patientManger.lastName)
                        ? true
                        : !_.isEmpty(
                            patientManagerStore.patientManger?.firstName,
                          ) ||
                          !_.isEmpty(patientManagerStore.patientManger.lastName)
                        ? false
                        : true,
                  }}
                  defaultValue=''
                />
                {patientManagerStore.checkExistsPatient && (
                  <span className='text-red-600 font-medium relative'>
                    Patient already exits. Please use other patient details.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.InputWrapper label='Sex' hasError={!!errors.sex}>
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.sex ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        value={value}
                        onChange={e => {
                          const sex = e.target.value;
                          onChange(sex);
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            sex,
                          });
                        }}
                      >
                        <option>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'PATIENT MANAGER - SEX',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='sex'
                  rules={{ required: true }}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.Input
                      label='Email'
                      name='txtEmail'
                      placeholder={
                        errors.email ? 'Please Enter Email' : 'Email'
                      }
                      hasError={!!errors.email}
                      type='mail'
                      value={value}
                      onChange={email => {
                        onChange(email);
                        patientManagerStore.updatePatientManager({
                          ...patientManagerStore.patientManger,
                          extraData: {
                            ...patientManagerStore.patientManger?.extraData,
                            email,
                          },
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
                    <Form.InputWrapper
                      label='Species'
                      hasError={!!errors.species}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.species ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const species = e.target.value as string;
                          onChange(species);
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            species,
                            breed: species === 'H' ? null : undefined,
                          });
                        }}
                      >
                        <option>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'PATIENT MANAGER - SPECIES',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='species'
                  rules={{ required: true }}
                  defaultValue=''
                />
                {patientManagerStore.patientManger.breed !== null && (
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Breed'
                        placeholder={
                          errors.breed ? 'Please Enter Breed' : 'Breed'
                        }
                        hasError={!!errors.breed}
                        value={value}
                        onChange={breed => {
                          onChange(breed);
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            breed,
                          });
                        }}
                      />
                    )}
                    name='breed'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                )}
                {doctorsStore.listDoctors && (
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Usual Doctor'
                        hasError={!!errors.usualDoctor}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.usualDoctor
                              ? 'border-red'
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const usualDoctor = e.target.value;
                            onChange(usualDoctor);
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              usualDoctor,
                            });
                          }}
                        >
                          <option>Select</option>
                          {doctorsStore.listDoctors.map(
                            (item: any, index: number) => (
                              <option key={index} value={item.doctorCode}>
                                {`${item.doctorName} - ${item.doctorCode}`}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='usualDoctor'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                )}

                {patientManagerStore.patientManger?.history && (
                  <>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.MultilineInput
                          rows={2}
                          label='Diagnosis'
                          placeholder='Diagnosis'
                          hasError={!!errors.diagnosis}
                          value={value}
                          onChange={diagnosis => {
                            onChange(diagnosis);
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              diagnosis,
                            });
                          }}
                        />
                      )}
                      name='diagnosis'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper label='Disease'>
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.disease
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const disease = e.target.value;
                              onChange(disease);
                              patientManagerStore.updatePatientManager({
                                ...patientManagerStore.patientManger,
                                disease,
                              });
                            }}
                          >
                            <option>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'PATIENT MANAGER - DISEASE',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='disease'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                  </>
                )}
                {patientManagerStore.patientManger?.isAddress && (
                  <>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Postal Code'
                          id='postalCode'
                          hasError={!!errors.postalCode}
                        >
                          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
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
                            // displayValue={value ?? ''}
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
                              patientManagerStore.updatePatientManager({
                                ...patientManagerStore.patientManger,
                                extraData: {
                                  ...patientManagerStore.patientManger
                                    ?.extraData,
                                  country: item?.Country?.toUpperCase(),
                                  state: item?.State?.toUpperCase(),
                                  district: item?.District?.toUpperCase(),
                                  city: item?.Block?.toUpperCase(),
                                  area: item?.Name?.toUpperCase(),
                                  postcode: item.Pincode,
                                },
                              });
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='postalCode'
                      rules={{ required: false }}
                      defaultValue={patientManagerStore.patientManger}
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Country'
                          hasError={!!errors.country}
                          placeholder='Country'
                          value={value}
                          //disabled={true}
                          onChange={country => {
                            onChange(country);
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                country,
                              },
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
                          //disabled={true}
                          onChange={state => {
                            onChange(state);
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                state,
                              },
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
                          //disabled={true}
                          onChange={district => {
                            onChange(district);
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                district,
                              },
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
                          //disabled={true}
                          onChange={city => {
                            onChange(city);
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                city,
                              },
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
                          //disabled={true}
                          onChange={area => {
                            onChange(area);
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                area,
                              },
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
                          rows={2}
                          label='Address'
                          placeholder={
                            errors.address ? 'Please Enter Address' : 'Address'
                          }
                          hasError={!!errors.address}
                          value={value}
                          onChange={address => {
                            onChange(address);
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                address,
                              },
                            });
                          }}
                        />
                      )}
                      name='address'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                  </>
                )}
                <Grid cols={4}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Toggle
                        label='History'
                        hasError={!!errors.history}
                        value={value}
                        onChange={history => {
                          onChange(history);
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            history,
                          });
                        }}
                      />
                    )}
                    name='history'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Toggle
                        label='VIP'
                        hasError={!!errors.isVIP}
                        value={value}
                        onChange={isVIP => {
                          onChange(isVIP);
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            isVIP,
                          });
                        }}
                      />
                    )}
                    name='isVIP'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Toggle
                        label='Address'
                        hasError={!!errors.isAddress}
                        value={value}
                        onChange={isAddress => {
                          onChange(isAddress);
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            isAddress,
                          });
                        }}
                      />
                    )}
                    name='isAddress'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Toggle
                        label='Copy To Doctor'
                        hasError={!!errors.isCopyDoctor}
                        value={value}
                        onChange={isCopyDoctor => {
                          onChange(isCopyDoctor);
                          patientManagerStore.updatePatientManager({
                            ...patientManagerStore.patientManger,
                            isCopyDoctor,
                          });
                        }}
                      />
                    )}
                    name='isCopyDoctor'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                </Grid>
                {patientManagerStore.patientManger.isCopyDoctor && (
                  <>
                    <Form.InputWrapper label='Report To Mobile Number'>
                      <Grid cols={3}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Form.Input
                              placeholder='Name'
                              value={patientManagerStore.reportToMobiles?.name}
                              onChange={name => {
                                onChange(name);
                                patientManagerStore.updateReportToMobileFields({
                                  ...patientManagerStore.reportToMobiles,
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
                                patientManagerStore.reportToMobiles?.mobileNo
                              }
                              onChange={mobileNo => {
                                onChange(mobileNo);
                                patientManagerStore.updateReportToMobileFields({
                                  ...patientManagerStore.reportToMobiles,
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
                                patientManagerStore.reportToMobiles?.name;
                              const mobileNo =
                                patientManagerStore.reportToMobiles?.mobileNo;
                              let reportToMobiles =
                                patientManagerStore.patientManger
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
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  reportToMobiles,
                                });
                                patientManagerStore.updateReportToMobileFields({
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
                          {patientManagerStore.patientManger?.reportToMobiles?.map(
                            (item, index) => (
                              <div className='mb-2' key={index}>
                                <Buttons.Button
                                  size='medium'
                                  type='solid'
                                  icon={Svg.Remove}
                                  onClick={() => {
                                    const firstArr =
                                      patientManagerStore.patientManger?.reportToMobiles?.slice(
                                        0,
                                        index,
                                      ) || [];
                                    const secondArr =
                                      patientManagerStore.patientManger?.reportToMobiles?.slice(
                                        index + 1,
                                      ) || [];
                                    const finalArray = [
                                      ...firstArr,
                                      ...secondArr,
                                    ];
                                    patientManagerStore.updatePatientManager({
                                      ...patientManagerStore.patientManger,
                                      reportToMobiles: finalArray,
                                    });
                                  }}
                                >
                                  {`${item.name} - ${item.mobileNo}`}
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
                              value={patientManagerStore.reportToEmails?.name}
                              onChange={name => {
                                onChange(name);
                                patientManagerStore.updateReportToEmailFields({
                                  ...patientManagerStore.reportToEmails,
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
                              value={patientManagerStore.reportToEmails?.email}
                              onChange={email => {
                                onChange(email);
                                patientManagerStore.updateReportToEmailFields({
                                  ...patientManagerStore.reportToEmails,
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
                                patientManagerStore.reportToEmails?.name;
                              const email =
                                patientManagerStore.reportToEmails?.email;
                              let reportToEmails =
                                patientManagerStore.patientManger
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
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  reportToEmails,
                                });
                                patientManagerStore.updateReportToEmailFields({
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
                          {patientManagerStore.patientManger?.reportToEmails?.map(
                            (item, index) => (
                              <div className='mb-2' key={index}>
                                <Buttons.Button
                                  size='medium'
                                  type='solid'
                                  icon={Svg.Remove}
                                  onClick={() => {
                                    const firstArr =
                                      patientManagerStore.patientManger?.reportToEmails?.slice(
                                        0,
                                        index,
                                      ) || [];
                                    const secondArr =
                                      patientManagerStore.patientManger?.reportToEmails?.slice(
                                        index + 1,
                                      ) || [];
                                    const finalArray = [
                                      ...firstArr,
                                      ...secondArr,
                                    ];
                                    patientManagerStore.updatePatientManager({
                                      ...patientManagerStore.patientManger,
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
                  </>
                )}
              </List>
            </Grid>
          </div>
          <br />

          <div className='extra' style={{ border: '1px solid yellow' }}>
            <Accordion allowZeroExpanded>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>EXTRA DATA</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <>
                    <Grid cols={2}>
                      <List direction='col' space={4} justify='stretch' fill>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Form.Input
                              label='WhatsApp Number'
                              name='txtWhatsappNumber'
                              placeholder={
                                errors.whatsappNumber
                                  ? 'Please Enter WhatsappNumber'
                                  : 'WhatsAppNumber'
                              }
                              type='number'
                              pattern={FormHelper.patterns.mobileNo}
                              hasError={!!errors.whatsappNumber}
                              value={value}
                              onChange={whatsappNumber => {
                                onChange(whatsappNumber);
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  extraData: {
                                    ...patientManagerStore.patientManger
                                      ?.extraData,
                                    whatsappNumber,
                                  },
                                });
                              }}
                            />
                          )}
                          name='whatsappNumber'
                          rules={{
                            required: false,
                            pattern: FormHelper.patterns.mobileNo,
                          }}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Form.InputFile
                              label='Photograph'
                              placeholder='File'
                              onChange={e => {
                                const photograph = e.target.files[0];
                                onChange(photograph);
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  extraData: {
                                    ...patientManagerStore.patientManger
                                      ?.extraData,
                                    photograph,
                                  },
                                });
                              }}
                            />
                          )}
                          name='photograph'
                          rules={{ required: false }}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <Form.InputFile
                              label='Signature'
                              placeholder='File'
                              onChange={e => {
                                const signature = e.target.files[0];
                                onChange(signature);
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  extraData: {
                                    ...patientManagerStore.patientManger
                                      ?.extraData,
                                    signature,
                                  },
                                });
                              }}
                            />
                          )}
                          name='signature'
                          rules={{ required: false }}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Form.InputWrapper label='Blood Group'>
                              <select
                                value={value}
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.bloodGroup
                                    ? 'border-red  '
                                    : 'border-gray-300'
                                } rounded-md`}
                                onChange={e => {
                                  const bloodGroup = e.target.value;
                                  onChange(bloodGroup);
                                  patientManagerStore.updatePatientManager({
                                    ...patientManagerStore.patientManger,
                                    extraData: {
                                      ...patientManagerStore.patientManger
                                        ?.extraData,
                                      bloodGroup,
                                    },
                                  });
                                }}
                              >
                                <option>{'Select'}</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT VISIT - BLOOD_GROUP',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='bloodGroup'
                          rules={{ required: false }}
                          defaultValue=''
                        />
                      </List>
                      <List direction='col' space={4} justify='stretch' fill>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Form.Input
                              label='Follow Up'
                              placeholder={
                                errors.followUp
                                  ? 'Please Enter FollowUp'
                                  : 'FollowUp'
                              }
                              hasError={!!errors.followUp}
                              value={value}
                              onChange={followUp => {
                                onChange(followUp);
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  extraData: {
                                    ...patientManagerStore.patientManger
                                      ?.extraData,
                                    followUp,
                                  },
                                });
                              }}
                            />
                          )}
                          name='followUp'
                          rules={{ required: false }}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Form.Input
                              label='Comments'
                              placeholder={
                                errors.comments
                                  ? 'Please Enter FollowUp'
                                  : 'FollowUp'
                              }
                              hasError={!!errors.comments}
                              value={value}
                              onChange={comments => {
                                onChange(comments);
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  extraData: {
                                    ...patientManagerStore.patientManger
                                      ?.extraData,
                                    comments,
                                  },
                                });
                              }}
                            />
                          )}
                          name='comments'
                          rules={{ required: false }}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Form.Input
                              label='FyiLine'
                              placeholder={
                                errors.fyiLine
                                  ? 'Please Enter FyiLine'
                                  : 'Fyiline'
                              }
                              hasError={!!errors.fyiLine}
                              value={value}
                              onChange={fyiLine => {
                                onChange(fyiLine);
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  extraData: {
                                    ...patientManagerStore.patientManger
                                      ?.extraData,
                                    fyiLine,
                                  },
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
                              label='Balance'
                              placeholder={
                                errors.balance
                                  ? 'Please Enter Balance'
                                  : 'Balance'
                              }
                              hasError={!!errors.balance}
                              value={value}
                              onChange={balance => {
                                onChange(balance);
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  extraData: {
                                    ...patientManagerStore.patientManger
                                      ?.extraData,
                                    balance,
                                  },
                                });
                              }}
                            />
                          )}
                          name='balance'
                          rules={{ required: false }}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Form.Input
                              label='External Pid'
                              placeholder='External Pid'
                              hasError={!!errors.externalPid}
                              value={value}
                              onChange={externalPid => {
                                onChange(externalPid);
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  extraData: {
                                    ...patientManagerStore.patientManger
                                      ?.extraData,
                                    externalPid,
                                  },
                                });
                              }}
                            />
                          )}
                          name='externalPid'
                          rules={{ required: false }}
                          defaultValue=''
                        />

                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <Form.Input
                              label='Entered By'
                              placeholder={
                                errors.enteredBy
                                  ? 'Please Enter Entered By'
                                  : 'Entered By'
                              }
                              hasError={!!errors.enteredBy}
                              value={loginStore.login?.userId}
                              disabled={true}
                            />
                          )}
                          name='enteredBy'
                          rules={{ required: false }}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Form.InputWrapper label='Status'>
                              <select
                                value={value}
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.status
                                    ? 'border-red  '
                                    : 'border-gray-300'
                                } rounded-md`}
                                onChange={e => {
                                  const status = e.target.value;
                                  onChange(status);
                                  patientManagerStore.updatePatientManager({
                                    ...patientManagerStore.patientManger,
                                    extraData: {
                                      ...patientManagerStore.patientManger
                                        ?.extraData,
                                      status,
                                    },
                                  });
                                }}
                              >
                                <option>Select</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT MANAGER - STATUS',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='status'
                          rules={{ required: false }}
                          defaultValue=''
                        />

                        <Grid cols={4}>
                          <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Form.Toggle
                                label='Is Mobile WhatsApp'
                                hasError={!!errors.isMobileAndWhatsApp}
                                value={value}
                                onChange={isMobileAndWhatsApp => {
                                  onChange(isMobileAndWhatsApp);
                                  patientManagerStore.updatePatientManager({
                                    ...patientManagerStore.patientManger,
                                    extraData: {
                                      ...patientManagerStore.patientManger
                                        ?.extraData,
                                      isMobileAndWhatsApp,
                                      whatsappNumber: isMobileAndWhatsApp
                                        ? patientManagerStore.patientManger
                                            .mobileNo
                                        : '',
                                    },
                                  });
                                }}
                              />
                            )}
                            name='isMobileAndWhatsApp'
                            rules={{ required: false }}
                            defaultValue=''
                          />

                          <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Form.Toggle
                                label='Confidental'
                                hasError={!!errors.confidental}
                                value={value}
                                onChange={confidental => {
                                  onChange(confidental);
                                  patientManagerStore.updatePatientManager({
                                    ...patientManagerStore.patientManger,
                                    extraData: {
                                      ...patientManagerStore.patientManger
                                        ?.extraData,
                                      confidental,
                                    },
                                  });
                                }}
                              />
                            )}
                            name='confidental'
                            rules={{ required: false }}
                            defaultValue=''
                          />
                          <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Form.Toggle
                                label='Permanent'
                                hasError={!!errors.permanent}
                                value={value}
                                onChange={permanent => {
                                  onChange(permanent);
                                  patientManagerStore.updatePatientManager({
                                    ...patientManagerStore.patientManger,
                                    extraData: {
                                      ...patientManagerStore.patientManger
                                        ?.extraData,
                                      permanent,
                                    },
                                  });
                                }}
                              />
                            )}
                            name='permanent'
                            rules={{ required: false }}
                            defaultValue=''
                          />
                        </Grid>
                      </List>
                    </Grid>
                  </>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>

          <br />
          <List direction='row' space={3} align='center'>
            <Buttons.Button
              size='medium'
              type='solid'
              icon={Svg.Save}
              onClick={handleSubmit(onSubmitPatientManager)}
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
        <div
          className='p-1 rounded-lg shadow-xl overflow-scroll'
          style={{ overflowX: 'scroll' }}
        >
          <PatientMangerList
            data={patientManagerStore.listPatientManger}
            totalSize={patientManagerStore.listPatientMangerCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
              listAdministrativeDiv:
                administrativeDivisions.listAdministrativeDiv,
              confidential: loginStore.login?.confidential || false,
              listDoctors: doctorsStore.listDoctors,
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
                type: 'delete',
                id: rows,
                title: 'Are you sure?',
                body: 'Do you want to delete this record?',
              });
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: 'update',
                data: { value, dataField, id },
                title: 'Are you sure?',
                body: 'Do you want to update this record?',
              });
            }}
            onUpdateFileds={(fileds: any, id: string) => {
              setModalConfirm({
                show: true,
                type: 'updateFileds',
                data: { fileds, id },
                title: 'Are you sure?',
                body: 'Do you want to update this record?',
              });
            }}
            onPageSizeChange={(page, limit) => {
              patientManagerStore.patientManagerService.listPatientManager(
                { documentType: 'patientManager' },
                page,
                limit,
              );
              global.filter = { mode: 'pagination', page, limit };
            }}
            onFilter={(type, filter, page, limit) => {
              patientManagerStore.patientManagerService.filter({
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
            onDirectUpdateField={(id, field) => {
              onUpdateField({
                _id: id,
                ...field,
              });
            }}
            hideInputView={hideInputView}
            setHideInputView={setHideInputView}
            disabled={
              getFilterField(patientRegistrationStore?.defaultValues)?.key ==
                'labId' ||
              getFilterField(patientRegistrationStore?.defaultValues)?.key ==
                'pId'
                ? true
                : false
            }
          />
        </div>
        <hr />
        <br />
        <div className='extra' style={{ border: '1px solid yellow' }}>
          <Accordion allowZeroExpanded>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>EXTRA DATA TABLE</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <>
                  <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
                    {extraTable}
                  </div>
                </>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
        <ModalConfirm
          {...modalConfirm}
          click={(action?: string) => {
            setModalConfirm({ show: false });
            switch (action) {
              case 'delete': {
                patientManagerStore.patientManagerService
                  .deletePatientManager({ input: { id: modalConfirm.id } })
                  .then((res: any) => {
                    if (res.removePatientManager.success) {
                      Toast.success({
                        message: `😊 ${res.removePatientManager.message}`,
                      });
                      for (const [key, value] of Object.entries(
                        patientRegistrationStore.defaultValues,
                      )) {
                        if (typeof value === 'string' && !_.isEmpty(value)) {
                          patientRegistrationStore.getPatientRegRecords(
                            key,
                            value,
                            'delete',
                          );
                          break;
                        }
                      }
                    }
                  });
                break;
              }
              case 'updateFileds': {
                onUpdateField({
                  _id: modalConfirm.data.id,
                  [modalConfirm.data.dataField]: modalConfirm.data.value,
                });
                break;
              }
              case 'update': {
                patientManagerStore.patientManagerService
                  .updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  })
                  .then((res: any) => {
                    if (res.updatePatientManager.success) {
                      Toast.success({
                        message: `😊 ${res.updatePatientManager.message}`,
                      });
                      for (const [key, value] of Object.entries(
                        patientRegistrationStore.defaultValues,
                      )) {
                        if (typeof value === 'string' && !_.isEmpty(value)) {
                          patientRegistrationStore.getPatientRegRecords(
                            key,
                            value,
                          );
                          break;
                        }
                      }
                    }
                  });

                break;
              }
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </>
    );
  }),
);
