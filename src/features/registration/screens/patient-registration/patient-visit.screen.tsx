import React, {useState} from 'react';
import {observer} from 'mobx-react';
import dayjs from 'dayjs';
import {Table} from 'reactstrap';
import _ from 'lodash';
import {
  Toast,
  Heading,
  Form,
  List,
  Buttons,
  Grid,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
  AutoCompleteFilterSingleSelect,
  ModalConfirm,
  Svg,
} from '@/library/components';
import {calculateTimimg, lookupItems, lookupValue} from '@/library/utils';
import '@/library/assets/css/accordion.css';
import {
  AutoCompleteFilterSingleSelectPid,
  ExtraDataPatientVisitList,
  PatientVisitList,
} from '../../components';
import {useForm, Controller} from 'react-hook-form';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import {patientRegistrationHoc} from '../../hoc';
import hydrateStore from '@/library/modules/startup';

import {PatientVisitHoc} from '../../hoc';
import {useStores} from '@/stores';
import {toJS} from 'mobx';
import {RouterFlow} from '@/flows';
import {getAgeAndAgeUnit} from '../../utils';
import {FormHelper} from '@/helper';

interface PatientVisitProps {
  onModalConfirm?: (item: any) => void;
}

export const PatientVisit = PatientVisitHoc(
  observer((props: PatientVisitProps) => {
    const {
      loading,
      appStore,
      patientVisitStore,
      loginStore,
      routerStore,
      corporateClientsStore,
      registrationLocationsStore,
      doctorsStore,
      patientRegistrationStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      clearErrors,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideInputView, setHideInputView] = useState<boolean>(true);

    const onSubmitPatientVisit = async () => {
      if (
        !patientVisitStore.checkExistsVisitId &&
        !patientVisitStore.checkExistsLabId
      ) {
        patientVisitStore.patientVisitService
          .addPatientVisit({
            input: {
              ...patientVisitStore.patientVisit,
              documentType: 'patientVisit',
            },
          })
          .then(async res => {
            console.log({res});
            if (res.createPatientVisit.success) {
              patientRegistrationStore.updateDefaultValue({
                ...patientRegistrationStore.defaultValues,
                labId: res.createPatientVisit?.labId,
              });
              Toast.success({
                message: `😊 ${res.createPatientVisit.message}`,
              });
            }
            setTimeout(async () => {
              window.location.reload();
            }, 1000);
          });
      } else {
        Toast.warning({
          message: '😔 Please enter diff visitId or labId',
        });
      }
    };

    return (
      <>
        {patientVisitStore.patientVisit.patientName && (
          <Heading
            title={`${patientVisitStore.patientVisit.pId} - ${patientVisitStore.patientVisit.patientName}`}
          />
        )}
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemoveBottom
            style={{bottom: 140}}
            show={hideInputView}
            onClick={() => setHideInputView(!hideInputView)}
          />
        )}
        <div
          className={
            'p-2 rounded-lg shadow-xl ' + (hideInputView ? 'hidden' : 'shown')
          }
        >
          <div className='p-2 rounded-lg shadow-xl'>
            <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Visit Id'
                      placeholder={
                        errors.visitId ? 'Please Enter Visit ID' : 'Visit ID'
                      }
                      hasError={!!errors.visitId}
                      disabled={true}
                      value={patientVisitStore.patientVisit?.visitId}
                      onChange={visitId => {
                        onChange(visitId);
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          visitId,
                        });
                      }}
                    />
                  )}
                  name='visitId'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Lab Id'
                      placeholder={
                        errors.labId ? 'Please Enter Lab ID' : 'Lab ID'
                      }
                      hasError={!!errors.labId}
                      disabled={
                        appStore.environmentValues?.LABID_AUTO_GENERATE?.value.toLowerCase() !==
                        'no'
                      }
                      type='number'
                      value={patientVisitStore.patientVisit?.labId}
                      onChange={labId => {
                        onChange(labId);
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          labId: Number.parseFloat(labId),
                        });
                      }}
                      onBlur={labId => {
                        patientVisitStore.patientVisitService
                          .checkExistsRecord({
                            input: {
                              filter: {
                                labId: Number.parseFloat(labId),
                                documentType: 'patientVisit',
                              },
                            },
                          })
                          .then(res => {
                            if (res.checkExistsPatientVisitRecord.success) {
                              patientVisitStore.updateExistsLabId(true);
                              Toast.error({
                                message: `😔 ${res.checkExistsPatientVisitRecord.message}`,
                              });
                            } else patientVisitStore.updateExistsLabId(false);
                          });
                      }}
                    />
                  )}
                  name='labId'
                  rules={{
                    required:
                      appStore.environmentValues?.LABID_AUTO_GENERATE?.value.toLowerCase() !==
                      'no'
                        ? false
                        : true,
                    minLength:
                      appStore.environmentValues?.LABID_LENGTH?.value || 4,
                    maxLength:
                      appStore.environmentValues?.LABID_LENGTH?.value || 4,
                  }}
                  defaultValue=''
                />
                {appStore.environmentValues?.LABID_LENGTH?.value ? (
                  <span className='text-red-600 font-medium relative'>
                    {`Lab id must be ${appStore.environmentValues?.LABID_LENGTH?.value} digit`}
                  </span>
                ) : (
                  <span className='text-red-600 font-medium relative'>
                    Lab id must be 4 digit.
                  </span>
                )}

                {patientVisitStore.checkExistsLabId && (
                  <span className='text-red-600 font-medium relative'>
                    Lab Id already exits. Please use diff lab Id.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='PId' hasError={!!errors.pid}>
                      <AutoCompleteFilterSingleSelectPid
                        hasError={!!errors.pid}
                        onSelect={item => {
                          onChange(item.pId);
                          const resultAge = calculateTimimg(
                            Math.abs(
                              dayjs(item.birthDate).diff(new Date(), 'days'),
                            ),
                          );
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            pId: item.pId,
                            patientName: `${item.firstName} ${
                              item.middleName ? item.middleName : ''
                            } ${item.lastName}`,
                            age: getAgeAndAgeUnit(resultAge).age,
                            ageUnits: getAgeAndAgeUnit(resultAge).ageUnit,
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='pid'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Rlab' hasError={!!errors.rLab}>
                      <select
                        value={patientVisitStore.patientVisit?.rLab}
                        disabled={true}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.rLab ? 'border-red-500  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const rLab = JSON.parse(e.target.value) as any;
                          onChange(rLab);
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            rLab,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {loginStore.login?.labList &&
                          loginStore.login?.labList.map(
                            (item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {item.name}
                              </option>
                            ),
                          )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='rLab'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Visit Date'
                      placeholder={
                        errors.visitDate
                          ? 'Please Enter VisitDate'
                          : 'VisitDate'
                      }
                      hasError={!!errors.visitDate}
                      value={patientVisitStore.patientVisit.visitDate}
                      onChange={visitDate => {
                        onChange(visitDate);
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          visitDate,
                        });
                      }}
                    />
                  )}
                  name='visitDate'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Registration Date'
                      name='txtRegistrationDate'
                      placeholder={
                        errors.registrationDate
                          ? 'Please Enter RegistrationDate'
                          : 'RegistrationDate'
                      }
                      hasError={!!errors.registrationDate}
                      value={patientVisitStore.patientVisit?.registrationDate}
                      onChange={registrationDate => {
                        onChange(registrationDate);
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          registrationDate,
                        });
                      }}
                    />
                  )}
                  name='registrationDate'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Collection Date'
                      name='txtCollectionDate'
                      placeholder={
                        errors.collectionDate
                          ? 'Please Enter Collection Date'
                          : 'Collection Date'
                      }
                      hasError={!!errors.collectionDate}
                      value={patientVisitStore.patientVisit?.collectionDate}
                      onChange={collectionDate => {
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          collectionDate,
                        });
                      }}
                    />
                  )}
                  name='dateReceived'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputDateTime
                      label='Due Date'
                      name='txtDueDate'
                      placeholder={
                        errors.dueDate ? 'Please Enter Due Date' : 'Due Date'
                      }
                      disabled={true}
                      hasError={!!errors.dueDate}
                      value={patientVisitStore.patientVisit?.dueDate}
                      onChange={dueDate => {
                        onChange(dueDate);
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          dueDate,
                        });
                      }}
                    />
                  )}
                  name='dueDate'
                  rules={{required: false}}
                  defaultValue=''
                />
                {patientVisitStore.patientVisit && (
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Input
                        label='Age'
                        name='txtAge'
                        disabled={true}
                        placeholder={
                          errors.birthDate ? 'Please Enter Age' : 'Age'
                        }
                        hasError={!!errors.age}
                        type='number'
                        value={patientVisitStore.patientVisit?.age}
                        onChange={age => {
                          onChange(age);
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            age: Number.parseInt(age),
                          });
                        }}
                      />
                    )}
                    name='age'
                    rules={{required: false}}
                    defaultValue=''
                  />
                )}

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Age Units'
                      hasError={!!errors.ageUnits}
                    >
                      <select
                        disabled={true}
                        value={patientVisitStore.patientVisit?.ageUnits}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.ageUnits
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const ageUnits = e.target.value;
                          onChange(ageUnits);
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            ageUnits,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'PATIENT VISIT - AGE_UNITS',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='ageUnits'
                  rules={{required: false}}
                  defaultValue=''
                />
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                {registrationLocationsStore.listRegistrationLocations && (
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Collection Center'
                        hasError={!!errors.collectionCenter}
                      >
                        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          loader={loading}
                          placeholder='Search by code or name'
                          data={{
                            list: registrationLocationsStore.listRegistrationLocations,
                            displayKey: ['locationCode', 'locationName'],
                          }}
                          displayValue={
                            patientVisitStore.patientVisit?.collectionCenter
                              ? `${patientVisitStore.patientVisit?.collectionCenter} - ${patientVisitStore.patientVisit?.collectionCenterName}`
                              : ''
                          }
                          hasError={!!errors.collectionCenter}
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
                            onChange(item.locationCode);
                            patientVisitStore.updatePatientVisit({
                              ...patientVisitStore.patientVisit,
                              collectionCenter: item?.locationCode,
                              collectionCenterName: item?.locationName,
                              acClass: item?.acClass,
                              corporateCode: item?.corporateCode,
                              extraData: {
                                ...patientVisitStore.patientVisit.extraData,
                                methodCollection: item?.methodColn,
                                accountType: item?.accountType,
                                invoiceAc: item?.invoiceAc?.toString(),
                              },
                            });
                            if (item.corporateCode) {
                              setValue('corporateCode', item.corporateCode);
                              clearErrors('corporateCode');
                            }
                            if (item.acClass) {
                              setValue('acClass', item.acClass);
                              clearErrors('acClass');
                            }
                            registrationLocationsStore.updateRegistrationLocationsList(
                              registrationLocationsStore.listRegistrationLocationsCopy,
                            );
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='collectionCenter'
                    rules={{required: true}}
                    defaultValue=''
                  />
                )}
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Corporate Code'
                      hasError={!!errors.corporateCode}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by code or name'
                        displayValue={
                          patientVisitStore.patientVisit?.corporateCode &&
                          patientVisitStore.patientVisit?.corporateName
                            ? `${patientVisitStore.patientVisit?.corporateCode} - ${patientVisitStore.patientVisit?.corporateName}`
                            : patientVisitStore.patientVisit?.corporateCode
                            ? `${patientVisitStore.patientVisit?.corporateCode}`
                            : ''
                        }
                        data={{
                          list: corporateClientsStore.listCorporateClients,
                          displayKey: ['corporateCode', 'corporateName'],
                        }}
                        hasError={!!errors.corporateCode}
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
                          onChange(item.corporateCode);
                          console.log({item});

                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            corporateCode: item.corporateCode,
                            corporateName: item.corporateName,
                            acClass: item?.acClass,
                            extraData: {
                              ...patientVisitStore.patientVisit.extraData,
                              invoiceAc: item?.invoiceAc?.toString(),
                            },
                          });
                          corporateClientsStore.updateCorporateClientsList(
                            corporateClientsStore.listCorporateClientsCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='corporateCode'
                  rules={{required: true}}
                  defaultValue={patientVisitStore.patientVisit?.corporateCode}
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='AC Class'
                      hasError={!!errors.acClass}
                    >
                      <select
                        value={patientVisitStore.patientVisit?.acClass}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.acClass
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const acClass = e.target.value;
                          onChange(acClass);
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            acClass,
                          });
                        }}
                      >
                        <option selected>
                          {patientVisitStore.patientVisit?.acClass
                            ? `Selected: ${patientVisitStore.patientVisit?.acClass}`
                            : 'Select'}
                        </option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'PATIENT VISIT - AC_CLASS',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='acClass'
                  rules={{required: true}}
                  defaultValue={patientVisitStore.patientVisit?.acClass}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Misc Charges'
                      hasError={!!errors.acClass}
                    >
                      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Misc Charges'
                        data={{
                          list: lookupItems(
                            routerStore.lookupItems,
                            'PATIENT VISIT - MISC_CHARGES',
                          )?.map((item, index) => {
                            return {...item, _id: index.toString()};
                          }),
                          selected:
                            patientVisitStore.selectedItems?.miscCharges,
                          displayKey: ['code', 'value'],
                        }}
                        hasError={!!errors.miscCharges}
                        onUpdate={item => {
                          const miscCharges =
                            patientVisitStore.selectedItems?.miscCharges;
                          onChange(miscCharges);
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            miscCharges: _.map(miscCharges, o =>
                              _.pick(o, ['code', 'value']),
                            ),
                          });
                        }}
                        onSelect={item => {
                          let miscCharges: any =
                            patientVisitStore.selectedItems?.miscCharges;
                          if (!item.selected) {
                            if (miscCharges && miscCharges?.length > 0) {
                              miscCharges.push(item);
                            } else miscCharges = [item];
                          } else {
                            miscCharges = miscCharges.filter(items => {
                              return items._id !== item._id;
                            });
                          }
                          patientVisitStore.updateSelectedItems({
                            ...patientVisitStore.selectedItems,
                            miscCharges,
                          });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='miscCharges'
                  rules={{required: true}}
                  defaultValue={patientVisitStore.selectedItems?.miscCharges}
                />

                <Table striped bordered>
                  <thead>
                    <tr className='p-0 text-xs'>
                      <th className='text-white sticky left-0 z-10'>
                        MISC CHARGES
                      </th>
                      <th className='text-white'>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className='text-xs'>
                    {patientVisitStore.patientVisit?.miscCharges?.map(
                      (item, index) => (
                        <tr key={item.code}>
                          <td className='sticky left-0'>
                            {item?.value + ' - ' + item?.code}
                          </td>
                          <td className='sticky left-0'>
                            <Form.Input
                              style={{height: 30}}
                              label=''
                              type='number'
                              placeholder='Amount'
                              onChange={amount => {
                                const miscCharges =
                                  patientVisitStore.patientVisit?.miscCharges;
                                miscCharges[index] = Object.assign(item, {
                                  amount: Number.parseFloat(amount),
                                });
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  miscCharges,
                                });
                              }}
                            />
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </Table>
                {!patientVisitStore.patientVisit?.acClass ||
                patientVisitStore.patientVisit?.acClass == '0' ? (
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Discount Charges'
                        hasError={!!errors.discountCharges}
                      >
                        <div className='flex flex-row gap-2 '>
                          <select
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.discountCharges
                                ? 'border-red-500  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const discountCharges = e.target.value;
                              onChange(discountCharges);
                              patientVisitStore.updatePatientVisit({
                                ...patientVisitStore.patientVisit,
                                discountCharges: {
                                  ...patientVisitStore.patientVisit
                                    ?.discountCharges,
                                  code: discountCharges,
                                },
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'PATIENT VISIT - DISCOUNT_CHARGES',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                          <Form.Input
                            label=''
                            type='number'
                            placeholder='Amount'
                            className='-mt-1'
                            onChange={amount => {
                              patientVisitStore.updatePatientVisit({
                                ...patientVisitStore.patientVisit,
                                discountCharges: {
                                  ...patientVisitStore.patientVisit
                                    ?.discountCharges,
                                  amount,
                                },
                              });
                            }}
                          />
                        </div>
                      </Form.InputWrapper>
                    )}
                    name='discountCharges'
                    rules={{required: false}}
                    defaultValue={''}
                  />
                ) : null}

                {doctorsStore.listDoctors && (
                  <>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.InputWrapper
                          label='Doctor Id'
                          hasError={!!errors.doctorId}
                        >
                          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                            loader={loading}
                            placeholder='Search by code or name'
                            displayValue={
                              patientVisitStore.patientVisit.doctorId
                                ? `${patientVisitStore.patientVisit.doctorId} - ${patientVisitStore.patientVisit.doctorName}`
                                : ''
                            }
                            data={{
                              list: doctorsStore.listDoctors,
                              displayKey: ['doctorCode', 'doctorName'],
                            }}
                            hasError={!!errors.doctorId}
                            onFilter={(value: string) => {
                              doctorsStore.doctorsService.filterByFields({
                                input: {
                                  filter: {
                                    fields: ['doctorCode', 'doctorName'],
                                    srText: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              });
                            }}
                            onSelect={item => {
                              onChange(item.doctorCode);
                              patientVisitStore.updatePatientVisit({
                                ...patientVisitStore.patientVisit,
                                doctorId: item.doctorCode,
                                doctorName: item.doctorName,
                              });
                              doctorsStore.updateDoctorsList(
                                doctorsStore.listDoctorsCopy,
                              );
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='doctorId'
                      rules={{required: true}}
                      defaultValue=''
                    />
                  </>
                )}

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Report Type'
                      hasError={!!errors.reportType}
                    >
                      <select
                        value={patientVisitStore.patientVisit.reportType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.reportType
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const reportType = e.target.value as string;
                          onChange(reportType);
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            reportType,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'PATIENT VISIT - DELIVERY_TYPE',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='reportType'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Grid cols={4}>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='History'
                        id='toggleHistory'
                        hasError={!!errors.history}
                        value={patientVisitStore.patientVisit?.history}
                        onChange={history => {
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            history,
                          });
                        }}
                      />
                    )}
                    name='history'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Toggle
                        label='Hold Report'
                        id='toggleHistory'
                        hasError={!!errors.holdReport}
                        value={patientVisitStore.patientVisit?.holdReport}
                        onChange={holdReport => {
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            holdReport,
                          });
                        }}
                      />
                    )}
                    name='holdReport'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Grid>
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                {patientVisitStore.patientVisit && (
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Status'
                        hasError={!!errors.status}
                      >
                        <select
                          value={patientVisitStore.patientVisit?.status}
                          disabled={true}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.status
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const status = e.target.value;
                            onChange(status);
                            patientVisitStore.updatePatientVisit({
                              ...patientVisitStore.patientVisit,
                              status,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'PATIENT VISIT - STATUS',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='status'
                    rules={{required: false}}
                    defaultValue=''
                  />
                )}
              </List>
            </Grid>
          </div>
          <br />
          <div className='extra' style={{border: '1px solid yellow'}}>
            <Accordion allowZeroExpanded>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>EXTRA DATA</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <>
                    <Grid cols={3}>
                      <List direction='col' fill space={4} justify='stretch'>
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.Input
                              label='Additional Information'
                              name='txtAdditionalInformation'
                              placeholder={
                                errors.additionalInfo
                                  ? 'Please Enter AdditionalInformation'
                                  : 'AdditionalInformation'
                              }
                              hasError={!!errors.additionalInfo}
                              value={
                                patientVisitStore.patientVisit?.extraData
                                  ?.additionalInfo
                              }
                              onChange={additionalInfo => {
                                onChange(additionalInfo);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    additionalInfo,
                                  },
                                });
                              }}
                            />
                          )}
                          name='additionalInfo'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputWrapper
                              label='Invoice Ac'
                              hasError={!!errors.invoiceAc}
                            >
                              <AutoCompleteFilterSingleSelect
                                loader={loading}
                                placeholder='Search by code'
                                displayValue={
                                  patientVisitStore.patientVisit.extraData?.invoiceAc?.toString() ||
                                  ''
                                }
                                disable={true}
                                data={{
                                  list: corporateClientsStore.listCorporateClients,
                                  displayKey: 'invoiceAc',
                                }}
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
                                  onChange(item.invoice);
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        .extraData,
                                      invoiceAc: item.invoice?.toString(),
                                    },
                                  });
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
                            <Form.InputWrapper label='Billing Method'>
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.billingMethod
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.billingMethod
                                    ? 'border-red-500  '
                                    : 'border-gray-300'
                                } rounded-md`}
                                onChange={e => {
                                  const billingMethod = e.target.value;
                                  onChange(billingMethod);
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        .extraData,
                                      billingMethod,
                                    },
                                  });
                                }}
                              >
                                <option selected>Select</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT VISIT - BILLING_METHOD',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='billingMethod'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.Input
                              label='Bill Number'
                              name='txtBill Number'
                              placeholder={
                                errors.billNumber
                                  ? 'Please Enter Bill Number'
                                  : 'Bill Number'
                              }
                              hasError={!!errors.billNumber}
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.billNumber
                              }
                              onChange={billNumber => {
                                onChange(billNumber);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    billNumber,
                                  },
                                });
                              }}
                            />
                          )}
                          name='billNumber'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputWrapper label='Method Collection'>
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.methodCollection
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.methodCollection
                                    ? 'border-red-500  '
                                    : 'border-gray-300'
                                } rounded-md`}
                                onChange={e => {
                                  const methodCollection = e.target.value;
                                  onChange(methodCollection);
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        .extraData,
                                      methodCollection,
                                    },
                                  });
                                }}
                              >
                                <option selected>Select</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT VISIT - METHOD_COLLECTION',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='methodCollection'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.Input
                              label='Collection By'
                              placeholder='Collected By'
                              hasError={!!errors.collectedBy}
                              value={
                                patientVisitStore.patientVisit?.extraData
                                  ?.collectedBy
                              }
                              onChange={collectedBy => {
                                onChange(collectedBy);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    collectedBy,
                                  },
                                });
                              }}
                            />
                          )}
                          name='collectedBy'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputDateTime
                              label='Received Date'
                              name='txtReceivedDate'
                              disabled={true}
                              placeholder={
                                errors.receivedDate
                                  ? 'Please Enter Received Date'
                                  : 'Received Date'
                              }
                              hasError={!!errors.receivedDate}
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.receivedDate
                              }
                              onChange={receivedDate => {
                                onChange(receivedDate);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    receivedDate,
                                  },
                                });
                              }}
                            />
                          )}
                          name='receivedDate'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputDateTime
                              label='Result Date'
                              name='txtResultDate'
                              disabled={true}
                              placeholder={
                                errors.resultDate
                                  ? 'Please Enter Result Date'
                                  : 'Result Date'
                              }
                              hasError={!!errors.resultDate}
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.resultDate
                              }
                              onChange={resultDate => {
                                onChange(resultDate);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    resultDate,
                                  },
                                });
                              }}
                            />
                          )}
                          name='resultDate'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Grid cols={2}>
                          <Controller
                            control={control}
                            render={({field: {onChange}}) => (
                              <Form.Toggle
                                label='Urgent'
                                id='toggleUrgent'
                                hasError={!!errors.urgent}
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.urgent
                                }
                                onChange={urgent => {
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        .extraData,
                                      urgent,
                                    },
                                  });
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
                                label='Pending Data Entry'
                                id='togglePendingDataEntry'
                                hasError={!!errors.pendingDataEntry}
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.pendingDataEntry
                                }
                                onChange={pendingDataEntry => {
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        .extraData,
                                      pendingDataEntry,
                                    },
                                  });
                                }}
                              />
                            )}
                            name='pendingDataEntry'
                            rules={{required: false}}
                            defaultValue=''
                          />
                        </Grid>
                      </List>
                      <List direction='col' space={4} fill justify='stretch'>
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputDateTime
                              label='Approval Date'
                              disabled={true}
                              placeholder={
                                errors.approvalDate
                                  ? 'Please Enter Result Date'
                                  : 'Result Date'
                              }
                              hasError={!!errors.approvalDate}
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.approvalDate
                              }
                              onChange={approvalDate => {
                                onChange(approvalDate);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    approvalDate,
                                  },
                                });
                              }}
                            />
                          )}
                          name='approvalDate'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputWrapper label='Approval Status'>
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.approvalStatus
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.approvalStatus
                                    ? 'border-red-500  '
                                    : 'border-gray-300'
                                } rounded-md`}
                                onChange={e => {
                                  const approvalStatus = e.target.value;
                                  onChange(approvalStatus);
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        .extraData,
                                      approvalStatus,
                                    },
                                  });
                                }}
                              >
                                <option selected>Select</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT VISIT - APPROVAL_STATUS',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='approvalStatus'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputWrapper label='Report Status'>
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.reportStatus
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.reportStatus
                                    ? 'border-red-500  '
                                    : 'border-gray-300'
                                } rounded-md`}
                                onChange={e => {
                                  const reportStatus = e.target.value;
                                  onChange(reportStatus);
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        .extraData,
                                      reportStatus,
                                    },
                                  });
                                }}
                              >
                                <option selected>Select</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT VISIT - REPORT_STATUS',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='reportStatus'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputDateTime
                              label='Reported Date'
                              disabled={true}
                              placeholder={
                                errors.reportedDate
                                  ? 'Please Enter Reported Date'
                                  : 'Reported Date'
                              }
                              hasError={!!errors.reportedDate}
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.reportedDate
                              }
                              onChange={reportedDate => {
                                onChange(reportedDate);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    reportedDate,
                                  },
                                });
                              }}
                            />
                          )}
                          name='reportedDate'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
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
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.Input
                              label='Height (cm)'
                              type='number'
                              placeholder={
                                errors.height ? 'Please Enter Height' : 'Height'
                              }
                              hasError={!!errors.height}
                              value={
                                patientVisitStore.patientVisit.extraData?.height
                              }
                              onChange={height => {
                                onChange(height);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    height,
                                  },
                                });
                              }}
                            />
                          )}
                          rules={{
                            required: false,
                            validate: value => FormHelper.isValidHeight(value),
                          }}
                          name='height'
                          defaultValue='1'
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.Input
                              label='Weight (kg)'
                              name='txtWeight'
                              type='number'
                              placeholder={
                                errors.weight ? 'Please Enter Weight' : 'Weight'
                              }
                              hasError={!!errors.weight}
                              value={
                                patientVisitStore.patientVisit.extraData?.weight
                              }
                              onChange={weight => {
                                onChange(weight);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    weight,
                                  },
                                });
                              }}
                            />
                          )}
                          name='weight'
                          rules={{
                            required: false,
                            validate: value => FormHelper.isValidWeight(value),
                          }}
                          defaultValue='1'
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputWrapper label='Archieve'>
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.archieve
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.archieve
                                    ? 'border-red-500  '
                                    : 'border-gray-300'
                                } rounded-md`}
                                onChange={e => {
                                  const archieve = e.target.value;
                                  onChange(archieve);
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        .extraData,
                                      archieve,
                                    },
                                  });
                                }}
                              >
                                <option selected>Select</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT VISIT - ARCHIVED',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='archieve'
                          rules={{required: false}}
                          defaultValue=''
                        />
                      </List>
                      <List direction='col' justify='stretch' fill space={4}>
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputWrapper label='Login Interface'>
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.loginInterface
                                }
                                disabled={true}
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.loginInterface
                                    ? 'border-red-500  '
                                    : 'border-gray-300'
                                } rounded-md`}
                                onChange={e => {
                                  const loginInterface = e.target.value;
                                  onChange(loginInterface);
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        .extraData,
                                      loginInterface,
                                    },
                                  });
                                }}
                              >
                                <option selected>Select</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT VISIT - LOGIN_INTERFACE',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='loginInterface'
                          rules={{required: false}}
                          defaultValue=''
                        />

                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputWrapper label='Registration Interface'>
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.registrationInterface
                                }
                                disabled={true}
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.registrationInterface
                                    ? 'border-red-500 '
                                    : 'border-gray-300'
                                } rounded-md`}
                                onChange={e => {
                                  const registrationInterface = e.target.value;
                                  onChange(registrationInterface);
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        .extraData,
                                      registrationInterface,
                                    },
                                  });
                                }}
                              >
                                <option selected>Select</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT VISIT - REGISTRATION_INTERFACE',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='registrationInterface'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.Input
                              label='Submitted System'
                              name='txtSubmitted System'
                              disabled={true}
                              placeholder={
                                errors.submittedSystem
                                  ? 'Please Enter Submitted System'
                                  : 'Submitted System'
                              }
                              hasError={!!errors.submittedSystem}
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.submittedSystem
                              }
                              onChange={submittedSystem => {
                                onChange(submittedSystem);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    submittedSystem,
                                  },
                                });
                              }}
                            />
                          )}
                          name='submittedSystem'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.Input
                              label='Submitted On'
                              name='txtSubmittedOn'
                              disabled={true}
                              placeholder={
                                errors.submittedOn
                                  ? 'Please Enter Archieve'
                                  : 'Archieve'
                              }
                              hasError={!!errors.submittedOn}
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.submittedOn
                              }
                              onChange={submittedOn => {
                                onChange(submittedOn);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    submittedOn,
                                  },
                                });
                              }}
                            />
                          )}
                          name='submittedOn'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.Input
                              label='Balance'
                              name='txtBalance'
                              disabled={true}
                              placeholder={
                                errors.balance
                                  ? 'Please Enter Balance'
                                  : 'Balance'
                              }
                              hasError={!!errors.balance}
                              type='number'
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.balance
                              }
                              onChange={balance => {
                                onChange(balance);
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    balance,
                                  },
                                });
                              }}
                            />
                          )}
                          name='balance'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputWrapper label='Account Type'>
                              <select
                                value={
                                  patientVisitStore.patientVisit?.extraData
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
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        ?.extraData,
                                      accountType,
                                    },
                                  });
                                }}
                              >
                                <option selected>Select</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT VISIT - ACCOUNT_TYPE',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='accountType'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputWrapper label='Delivery Mode'>
                              <select
                                value={
                                  patientVisitStore.patientVisit?.extraData
                                    ?.deliveryMode
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.deliveryMode
                                    ? 'border-red-500  '
                                    : 'border-gray-300'
                                } rounded-md`}
                                onChange={e => {
                                  const deliveryMode = e.target.value;
                                  onChange(deliveryMode);
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        ?.extraData,
                                      deliveryMode,
                                    },
                                  });
                                }}
                              >
                                <option selected>Select</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT VISIT - DELIVERY_METHOD',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='deliveryMode'
                          rules={{required: false}}
                          defaultValue=''
                        />
                        <Controller
                          control={control}
                          render={({field: {onChange}}) => (
                            <Form.InputWrapper label='Environment'>
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.environment
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
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit
                                        .extraData,
                                      environment,
                                    },
                                  });
                                }}
                              >
                                <option selected>Select</option>
                                {lookupItems(
                                  routerStore.lookupItems,
                                  'PATIENT VISIT - ENVIRONMENT',
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {lookupValue(item)}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='environment'
                          rules={{required: false}}
                          defaultValue=''
                        />
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
              onClick={handleSubmit(onSubmitPatientVisit)}
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
          className='p-2 rounded-lg shadow-xl overflow-scroll'
          style={{overflowX: 'scroll'}}
        >
          <PatientVisitList
            data={patientVisitStore.listPatientVisit}
            totalSize={patientVisitStore.listPatientVisitCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
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
                type: 'delete',
                id: rows.filter(item => item._id).map(item => item._id),
                labId: rows.filter(item => item.labId).map(item => item.labId),
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
                body: 'Update recoard!',
              });
            }}
            onPageSizeChange={(page, limit) => {
              patientVisitStore.patientVisitService.listPatientVisit(
                {documentType: 'patientVisit'},
                page,
                limit,
              );
            }}
            onFilter={(type, filter, page, limit) => {
              patientVisitStore.patientVisitService.filter({
                input: {type, filter, page, limit},
              });
            }}
          />
        </div>
        <br />
        <div className='extra' style={{border: '1px solid yellow'}}>
          <Accordion allowZeroExpanded>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>EXTRA DATA TABLE</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <>
                  <div
                    className='p-2 rounded-lg shadow-xl overflow-scroll'
                    style={{overflowX: 'scroll'}}
                  >
                    <ExtraDataPatientVisitList
                      data={patientVisitStore.listPatientVisit}
                      totalSize={patientVisitStore.listPatientVisitCount}
                      extraData={{
                        lookupItems: routerStore.lookupItems,
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
                          type: 'delete',
                          id: rows,
                          title: 'Are you sure?',
                          body: 'Delete selected items!',
                        });
                      }}
                      onUpdateItem={(
                        value: any,
                        dataField: string,
                        id: string,
                      ) => {
                        setModalConfirm({
                          show: true,
                          type: 'update',
                          data: {value, dataField, id},
                          title: 'Are you sure?',
                          body: 'Update recoard!',
                        });
                      }}
                      onPageSizeChange={(page, limit) => {
                        patientVisitStore.patientVisitService.listPatientVisit(
                          {documentType: 'patientVisit'},
                          page,
                          limit,
                        );
                      }}
                      onFilter={(type, filter, page, limit) => {
                        patientVisitStore.patientVisitService.filter({
                          input: {type, filter, page, limit},
                        });
                      }}
                    />
                  </div>
                </>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
        <ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === 'delete') {
              console.log({modalConfirm});

              patientVisitStore.patientVisitService
                .deletePatientVisit({
                  input: {
                    id: modalConfirm.id,
                    labId: modalConfirm.labId,
                    __typename: undefined,
                  },
                })
                .then((res: any) => {
                  if (res.removePatientVisit.success) {
                    Toast.success({
                      message: `😊 ${res.removePatientVisit.message}`,
                    });
                    setModalConfirm({show: false});
                    // patientVisitStore.patientVisitService.listPatientVisit({
                    //   documentType: 'patientVisit',
                    // });
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }
                });
            } else if (type === 'update') {
              patientVisitStore.patientVisitService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updatePatientVisit.success) {
                    Toast.success({
                      message: `😊 ${res.updatePatientVisit.message}`,
                    });
                    setModalConfirm({show: false});
                    patientVisitStore.patientVisitService.listPatientVisit({
                      documentType: 'patientVisit',
                    });
                  }
                });
            }
          }}
          onClose={() => setModalConfirm({show: false})}
        />
      </>
    );
  }),
);
