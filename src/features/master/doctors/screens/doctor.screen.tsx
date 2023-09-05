import React, {useState, useMemo, useEffect} from 'react';
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
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
} from '@/library/components';
import {DoctorsList} from '../components';
import {AutoCompleteFilterDeliveryMode} from '@/core-components';
import {dayjs, lookupItems, lookupValue, toTitleCase} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {DoctorsHoc} from '../hoc';
import {useStores} from '@/stores';
import {FormHelper} from '@/helper';
import {RouterFlow} from '@/flows';
import {resetDoctor} from '../startup';
import * as XLSX from 'xlsx';

const Doctors = DoctorsHoc(
  observer(() => {
    const {
      loginStore,
      labStore,
      routerStore,
      doctorsStore,
      loading,
      administrativeDivisions,
      registrationLocationsStore,
      salesTeamStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();

    useEffect(() => {
      // Default value initialization
      setValue('status', doctorsStore.doctors?.status);
      setValue('environment', doctorsStore.doctors?.environment);
      setValue('title', doctorsStore.doctors?.title);
      setValue('doctorType', doctorsStore.doctors?.doctorType);
      setValue('speciality', doctorsStore.doctors?.speciality);
      setValue('category', doctorsStore.doctors?.category);
      setValue('postalCode', doctorsStore.doctors?.postalCode);
      setValue('country', doctorsStore.doctors?.country);
      setValue('state', doctorsStore.doctors?.state);
      setValue('district', doctorsStore.doctors?.district);
      setValue('city', doctorsStore.doctors?.city);
      setValue('area', doctorsStore.doctors?.area);
      setValue('reportPriority', doctorsStore.doctors?.reportPriority);
      setValue('dateCreation', doctorsStore.doctors?.dateCreation);
      setValue('dateExpire', doctorsStore.doctors?.dateExpire);
      setValue('version', doctorsStore.doctors?.version);
      setValue('dateActive', doctorsStore.doctors?.dateActive);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doctorsStore.doctors]);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddSection, setHideAddSection] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);

    const onSubmitDoctors = () => {
      if (!doctorsStore.checkExitsLabEnvCode) {
        if (
          !doctorsStore.doctors?.existsVersionId &&
          !doctorsStore.doctors?.existsRecordId
        ) {
          doctorsStore.doctorsService
            .addDoctors({
              input: isImport
                ? {isImport, arrImportRecords}
                : {
                    isImport,
                    ...doctorsStore.doctors,
                    enteredBy: loginStore.login.userId,
                  },
            })
            .then(res => {
              if (res.createDoctor.success) {
                Toast.success({
                  message: `😊 ${res.createDoctor.message}`,
                });
                setHideAddSection(true);
                reset();
                resetDoctor();
              }
            });
        } else if (
          doctorsStore.doctors?.existsVersionId &&
          !doctorsStore.doctors?.existsRecordId
        ) {
          doctorsStore.doctorsService
            .versionUpgradeDoctors({
              input: {
                ...doctorsStore.doctors,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.versionUpgradeDoctors.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradeDoctors.message}`,
                });
              }
            });
        } else if (
          !doctorsStore.doctors?.existsVersionId &&
          doctorsStore.doctors?.existsRecordId
        ) {
          doctorsStore.doctorsService
            .duplicateDoctors({
              input: {
                ...doctorsStore.doctors,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.duplicateDoctors.success) {
                Toast.success({
                  message: `😊 ${res.duplicateDoctors.message}`,
                });
              }
            });
        }
      } else {
        Toast.warning({
          message: '😔 Please enter diff code',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <DoctorsList
          data={doctorsStore.listDoctors || []}
          totalSize={doctorsStore.listDoctorsCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listLabs: labStore.listLabs,
            listAdministrativeDiv:
              administrativeDivisions.listAdministrativeDiv,
            labList: loginStore.login?.labList,
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
            doctorsStore.fetchDoctors(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            doctorsStore.doctorsService.filter({
              input: {type, filter, page, limit},
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
            const isExists = await checkExistsRecords(records);
            if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'Update',
                data: {value: 'A', dataField: 'status', id: records._id},
                title: 'Are you sure?',
                body: 'Update deginisation!',
              });
            }
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [doctorsStore.listDoctors],
    );
    const checkExistsRecords = async (
      fields = doctorsStore.doctors,
      length = 0,
      status = 'A',
    ) => {
      return doctorsStore.doctorsService
        .findByFields({
          input: {
            filter: {
              ..._.pick({...fields, status}, [
                'doctorCode',
                'doctorName',
                'status',
                'environment',
              ]),
            },
          },
        })
        .then(res => {
          if (
            res.findByFieldsDocter?.success &&
            res.findByFieldsDocter.data?.length > length
          ) {
            //setIsExistsRecord(true);
            Toast.error({
              message: '😔 Already some record exists.',
            });
            return true;
          } else return false;
        });
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
            title: item?.Title,
            doctorCode: item['Doctor Code'],
            doctorName: item['Doctor Name'],
            reportName: item['Report Name'],
            sex: item.Sex,
            doctorType: item['Doctor Type'],
            speciality: item.Speciality,
            category: item.Category,
            postalCode: item['Postal Code'],
            country: item?.Country,
            state: item?.State,
            district: item?.District,
            city: item?.City,
            area: item?.Area,
            sbu: item.SBU,
            zone: item.Zone,
            salesTerritoRy: item['Sales Territory'],
            telephone: item.Telephone,
            mobileNo: item['Mobile No'],
            email: item.Email,
            reportPriority: item['Report Priority'],
            deliveryMode: [],
            registrationLocation: item['Registration Location'],
            lab: item.Lab,
            info: item.Info,
            fyiLine: item['FYI Line'],
            workLine: item['Work Line'],
            confidential: item.Confidential === 'Yes' ? true : false,
            urgent: item.Urgent === 'Yes' ? true : false,
            reportFormat: item['Report Format'] === 'Yes' ? true : false,
            specificFormat: item['Specific Format'] === 'Yes' ? true : false,
            dateCreation: new Date(),
            dateActive: new Date(),
            dateExpire: new Date(
              dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD hh:mm:ss'),
            ),
            version: item.Version,
            enteredBy: loginStore.login.userId,
            openingTime: item['Opening Time'],
            closingTime: item['Closing Time'],
            environment: item?.Environment,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

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
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddSection ? 'hidden' : 'shown')
            }
          >
            <ManualImportTabs
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
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper
                        label='Title'
                        hasError={!!errors.title}
                      >
                        <select
                          // value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.title ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const title = e.target.value;
                            onChange(title);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              title,
                              reportName: `${title}. ${toTitleCase(
                                doctorsStore.doctors?.doctorName,
                              )}`,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(routerStore.lookupItems, 'TITLE').map(
                            (item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name=' title'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Doctor Code'
                        hasError={!!errors.doctorCode}
                        placeholder={
                          errors.doctorCode
                            ? 'Please Enter Code'
                            : 'Doctor Code'
                        }
                        value={value}
                        onChange={doctorCode => {
                          onChange(doctorCode);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            doctorCode: doctorCode.toUpperCase(),
                          });
                        }}
                        onBlur={code => {
                          if (!doctorsStore.doctors?.existsVersionId) {
                            doctorsStore.doctorsService
                              .checkExitsLabEnvCode({
                                input: {
                                  code,
                                  env: doctorsStore.doctors?.environment,
                                  lab: doctorsStore.doctors?.lab,
                                },
                              })
                              .then(res => {
                                if (res.checkDoctorsExistsRecord.success) {
                                  doctorsStore.updateExistsLabEnvCode(true);
                                  Toast.error({
                                    message: `😔 ${res.checkDoctorsExistsRecord.message}`,
                                  });
                                } else
                                  doctorsStore.updateExistsLabEnvCode(false);
                              });
                          }
                        }}
                      />
                    )}
                    name='doctorCode'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  {doctorsStore.checkExitsLabEnvCode && (
                    <span className='text-red-600 font-medium relative'>
                      Code already exits. Please use other code.
                    </span>
                  )}
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Doctor Name'
                        placeholder={
                          errors.doctorName
                            ? 'Please Enter Doctor Name'
                            : 'Doctor Name'
                        }
                        hasError={!!errors.doctorName}
                        value={value}
                        onChange={doctorName => {
                          onChange(doctorName);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            doctorName: doctorName.toUpperCase(),
                            reportName: `${
                              doctorsStore.doctors?.title
                            }. ${toTitleCase(doctorName)}`,
                          });
                        }}
                      />
                    )}
                    name='doctorName'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Report Name'
                        placeholder={
                          errors.reportName
                            ? 'Please Enter reportName'
                            : 'Report Name'
                        }
                        hasError={!!errors.reportName}
                        value={value}
                        onChange={reportName => {
                          onChange(reportName);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            reportName: reportName,
                          });
                          setValue('reportName', doctorsStore.doctors?.title);
                        }}
                      />
                    )}
                    name='reportName'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper label='Sex' hasError={!!errors.sex}>
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.sex ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const sex = e.target.value;
                            onChange(sex);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              sex,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {['Male', 'Female', 'Other'].map(
                            (item: any, index: number) => (
                              <option key={index} value={item}>
                                {`${item}`}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='sex'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper
                        label='Doctor Type'
                        hasError={!!errors.doctorType}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.doctorType
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const doctorType = e.target.value;
                            onChange(doctorType);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              doctorType,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'DOCTOR_TYPE',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='doctorType'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper
                        label='Speciality'
                        hasError={!!errors.speciality}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.speciality
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const speciality = e.target.value;
                            onChange(speciality);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              speciality,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'SPECIALITY',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='speciality'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
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
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
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
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
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
                          displayValue={value}
                          onFilter={(value: string) => {
                            if (value?.length == 6) {
                              labStore.LabService?.getAddressDetailsByPincode(
                                value,
                              );
                            }
                          }}
                          onSelect={item => {
                            onChange(item.Pincode);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              country: item?.Country?.toUpperCase(),
                              state: item?.State?.toUpperCase(),
                              district: item?.District?.toUpperCase(),
                              city: item?.Block?.toUpperCase(),
                              area: item?.Name?.toUpperCase(),
                              postalCode: Number.parseInt(item.Pincode),
                              zone: '',
                              sbu: '',
                            });
                            labStore.updateAddressDetails([]);
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='postalCode'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Country'
                        hasError={!!errors.country}
                        placeholder='Country'
                        value={value}
                        disabled={true}
                        onChange={country => {
                          onChange(country);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            country: country?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='country'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='State'
                        hasError={!!errors.state}
                        placeholder='State'
                        value={value}
                        disabled={true}
                        onChange={state => {
                          onChange(state);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            state: state?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='state'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='District'
                        hasError={!!errors.district}
                        placeholder='District'
                        value={value}
                        disabled={true}
                        onChange={district => {
                          onChange(district);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            district: district?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='district'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='City'
                        hasError={!!errors.city}
                        placeholder='City'
                        value={value}
                        disabled={true}
                        onChange={city => {
                          onChange(city);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            city: city?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='city'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Area'
                        hasError={!!errors.area}
                        placeholder='Area'
                        value={value}
                        disabled={true}
                        onChange={area => {
                          onChange(area);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            area: area?.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='area'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='SBU'
                        placeholder={!!errors.sbu ? 'Please Enter sbu' : 'SBU'}
                        hasError={!!errors.sbu}
                        value={value}
                        onChange={sbu => {
                          onChange(sbu);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
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
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Zone'
                        placeholder={
                          !!errors.zone ? 'Please Enter Zone' : 'Zone'
                        }
                        hasError={!!errors.zone}
                        value={value}
                        onChange={zone => {
                          onChange(zone);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
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
                    render={({field: {onChange, value}}) => (
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
                          displayValue={value}
                          onSelect={item => {
                            onChange(item.salesTerritory);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              salesTerritoRy: item.salesTerritory,
                            });
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
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Telephone'
                        placeholder={
                          errors.telephone
                            ? 'Please Enter telephone'
                            : 'Telephone'
                        }
                        type='number'
                        pattern={FormHelper.patterns.mobileNo}
                        hasError={!!errors.telephone}
                        value={value}
                        onChange={telephone => {
                          onChange(telephone);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
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
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Mobile No'
                        placeholder={
                          errors.mobileNo
                            ? 'Please Enter mobile no'
                            : 'Mobile No'
                        }
                        type='number'
                        pattern={FormHelper.patterns.mobileNo}
                        hasError={!!errors.mobileNo}
                        value={value}
                        onChange={mobileNo => {
                          console.log({mobileNo});
                          onChange(mobileNo);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
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
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Email'
                        placeholder={
                          errors.email ? 'Please Enter Email' : 'Email'
                        }
                        hasError={!!errors.email}
                        value={value}
                        onChange={email => {
                          onChange(email);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
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
                    render={({field: {onChange, value}}) => (
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
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
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
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper
                        label='Delivery Mode'
                        hasError={!!errors.deliveryMode}
                      >
                        <AutoCompleteFilterDeliveryMode
                          onSelect={deliveryMode => {
                            onChange(deliveryMode);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              deliveryMode,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='deliveryMode'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper
                        label='Registartion Location'
                        hasError={!!errors.registrationLocation}
                      >
                        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          loader={loading}
                          placeholder='Search by locationCode or locationName'
                          data={{
                            list: registrationLocationsStore.listRegistrationLocations,
                            displayKey: ['locationCode', 'locationName'],
                          }}
                          hasError={!!errors.registrationLocation}
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
                          displayValue={value}
                          onSelect={item => {
                            onChange(item.locationCode);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              registrationLocation: item.locationCode,
                            });
                            registrationLocationsStore.updateRegistrationLocationsList(
                              registrationLocationsStore.listRegistrationLocationsCopy,
                            );
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='registrationLocation'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper label='Lab' hasError={!!errors.lab}>
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.lab ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const lab = e.target.value;
                            console.log({lab});

                            onChange(lab);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              lab,
                            });
                            labStore.updateLabList(labStore.listLabsCopy);
                            if (!doctorsStore.doctors?.existsVersionId) {
                              doctorsStore.doctorsService
                                .checkExitsLabEnvCode({
                                  input: {
                                    code: doctorsStore.doctors?.doctorCode,
                                    env: doctorsStore.doctors?.environment,
                                    lab,
                                  },
                                })
                                .then(res => {
                                  if (res.checkDoctorsExistsRecord.success) {
                                    doctorsStore.updateExistsLabEnvCode(true);
                                    Toast.error({
                                      message: `😔 ${res.checkDoctorsExistsRecord.message}`,
                                    });
                                  } else
                                    doctorsStore.updateExistsLabEnvCode(false);
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
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Clock
                        label='Opening Time'
                        hasError={!!errors.openingTime}
                        value={value}
                        onChange={openingTime => {
                          onChange(openingTime);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
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
                    render={({field: {onChange, value}}) => (
                      <Form.Clock
                        label='Closing Time'
                        hasError={!!errors.closingTime}
                        value={value}
                        onChange={closingTime => {
                          onChange(closingTime);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            closingTime,
                          });
                        }}
                      />
                    )}
                    name='closingTime'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Info'
                        placeholder={
                          !!errors.info ? 'Please Enter info' : 'Info'
                        }
                        hasError={!!errors.info}
                        value={value}
                        onChange={info => {
                          onChange(info);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
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
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='FYI Line'
                        placeholder={
                          errors.fyiLine ? 'Please Enter fyiLine' : 'FYI Line'
                        }
                        hasError={!!errors.fyiLine}
                        value={value}
                        onChange={fyiLine => {
                          onChange(fyiLine);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
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
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Work Line'
                        placeholder={
                          errors.workLine
                            ? 'Please Enter workLine'
                            : 'Work Line'
                        }
                        hasError={!!errors.workLine}
                        value={value}
                        onChange={workLine => {
                          onChange(workLine);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
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
                    render={({field: {onChange, value}}) => (
                      <Form.InputDateTime
                        label='Date Creation'
                        placeholder={
                          errors.dateCreation
                            ? 'Please Enter dateCreation'
                            : 'DateCreation'
                        }
                        hasError={!!errors.dateCreation}
                        value={value}
                        disabled={true}
                      />
                    )}
                    name='dateCreation'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputDateTime
                        label='Date Active'
                        placeholder={
                          errors.dateActive
                            ? 'Please Enter DateActiveFrom'
                            : 'DateActiveFrom'
                        }
                        hasError={!!errors.dateActive}
                        value={value}
                        disabled={true}
                      />
                    )}
                    name='dateActive'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputDateTime
                        label='Date Expire'
                        placeholder={
                          errors.dateExpire
                            ? 'Please Enter DateActiveTo'
                            : 'DateActiveTo'
                        }
                        hasError={!!errors.dateExpire}
                        value={value}
                        onChange={dateExpire => {
                          onChange(dateExpire);
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            dateExpire,
                          });
                        }}
                      />
                    )}
                    name='dateExpire'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
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
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Entered By'
                        placeholder={
                          errors.userId ? 'Please Enter userId' : 'EnterEd By'
                        }
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
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
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
                    render={({field: {onChange, value}}) => (
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
                          disabled={
                            loginStore.login &&
                            loginStore.login.role !== 'SYSADMIN'
                              ? true
                              : false
                          }
                          onChange={e => {
                            const environment = e.target.value;
                            onChange(environment);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              environment,
                            });
                            if (!doctorsStore.doctors?.existsVersionId) {
                              doctorsStore.doctorsService
                                .checkExitsLabEnvCode({
                                  input: {
                                    code: doctorsStore.doctors?.doctorCode,
                                    env: environment,
                                    lab: doctorsStore.doctors?.lab,
                                  },
                                })
                                .then(res => {
                                  if (res.checkDoctorsExistsRecord.success) {
                                    doctorsStore.updateExistsLabEnvCode(true);
                                    Toast.error({
                                      message: `😔 ${res.checkDoctorsExistsRecord.message}`,
                                    });
                                  } else
                                    doctorsStore.updateExistsLabEnvCode(false);
                                });
                            }
                          }}
                        >
                          <option selected>
                            {loginStore.login &&
                            loginStore.login.role !== 'SYSADMIN'
                              ? 'Select'
                              : doctorsStore.doctors?.environment || 'Select'}
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
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='Confidential'
                          hasError={!!errors.confidential}
                          value={value}
                          onChange={confidential => {
                            onChange(confidential);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              confidential,
                            });
                          }}
                        />
                      )}
                      name='confidential'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='Urgent'
                          hasError={!!errors.urgent}
                          value={value}
                          onChange={urgent => {
                            onChange(urgent);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              urgent,
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
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='Report Format'
                          hasError={!!errors.reportFormat}
                          value={value}
                          onChange={reportFormat => {
                            onChange(reportFormat);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
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
                      render={({field: {onChange, value}}) => (
                        <Form.Toggle
                          label='Specific Format'
                          hasError={!!errors.specificFormat}
                          value={value}
                          onChange={specificFormat => {
                            onChange(specificFormat);
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
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
                onClick={handleSubmit(onSubmitDoctors)}
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
              switch (action) {
                case 'Delete': {
                  doctorsStore.doctorsService
                    .deleteDoctors({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeDoctor.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.removeDoctor.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          doctorsStore.fetchDoctors(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          doctorsStore.doctorsService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else doctorsStore.fetchDoctors();
                      }
                    });

                  break;
                }
                case 'Update': {
                  doctorsStore.doctorsService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateDoctor.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updateDoctor.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          doctorsStore.fetchDoctors(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          doctorsStore.doctorsService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else doctorsStore.fetchDoctors();
                      }
                    });

                  break;
                }
                case 'UpdateFileds': {
                  doctorsStore.doctorsService
                    .updateSingleFiled({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateDoctor.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updateDoctor.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          doctorsStore.fetchDoctors(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          doctorsStore.doctorsService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else doctorsStore.fetchDoctors();
                      }
                    });

                  break;
                }
                case 'versionUpgrade': {
                  doctorsStore.updateDoctors({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActive: new Date(),
                  });
                  setValue('doctorCode', modalConfirm.data.doctorCode);
                  setValue('doctorName', modalConfirm.data.doctorName);
                  setValue('lab', modalConfirm.data.lab);
                  setValue('status', modalConfirm.data.status);
                  setValue('environment', modalConfirm.data.environment);

                  break;
                }
                case 'duplicate': {
                  doctorsStore.updateDoctors({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateActive: new Date(),
                  });
                  setHideAddSection(!hideAddSection);
                  setValue('doctorCode', modalConfirm.data.doctorCode);
                  setValue('doctorName', modalConfirm.data.doctorName);
                  setValue('lab', modalConfirm.data.lab);
                  setValue('status', modalConfirm.data.status);
                  setValue('environment', modalConfirm.data.environment);

                  break;
                }
                // No default
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />
        </div>
      </>
    );
  }),
);

export default Doctors;
