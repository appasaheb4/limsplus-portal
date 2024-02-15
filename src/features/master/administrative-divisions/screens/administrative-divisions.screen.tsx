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
  Icons,
  ModalConfirm,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  MainPageHeading,
} from '@/library/components';
import { AdminstrativeDivList } from '../components';
import { lookupItems, lookupValue } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import { AdministrativeDivisionsHoc } from '../hoc';
import { useStores } from '@/stores';
import { RouterFlow } from '@/flows';
import { resetBanner } from '../../banner/startup';
import * as XLSX from 'xlsx';
import _ from 'lodash';
import { toJS } from 'mobx';

export const AdministrativeDivisions = AdministrativeDivisionsHoc(
  observer(() => {
    const { loginStore, administrativeDivisions, routerStore } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();

    useEffect(() => {
      // Default value initialization
      // setValue(
      //   'environment',
      //   administrativeDivisions.administrativeDiv?.environment,
      // );
      setValue('status', administrativeDivisions.administrativeDiv?.status);
      setValue('sbu', administrativeDivisions.administrativeDiv?.sbu);
      setValue('zone', administrativeDivisions.administrativeDiv?.zone);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [administrativeDivisions?.administrativeDiv]);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isHideView, setIsHideView] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);

    const onSubmitAdministrativeDivision = () => {
      if (administrativeDivisions.administrativeDiv) {
        if (!administrativeDivisions.administrativeDiv.postalCode && !isImport)
          return Toast.warning({
            message: '😔 Please enter postal code!',
          });
        administrativeDivisions.administrativeDivisionsService
          .addAdministrativeDivisions({
            input: isImport
              ? { isImport, arrImportRecords }
              : { isImport, ...administrativeDivisions.administrativeDiv },
          })
          .then(res => {
            if (res.createAdministrativeDivision.success) {
              Toast.success({
                message: `😊 ${res.createAdministrativeDivision.message}`,
              });
              setIsHideView(true);
              reset();
              resetBanner();
              setArrImportRecords([]);
              setIsImport(false);
            }
          });
      } else {
        Toast.warning({
          message: '😔 Please enter all information!',
        });
      }
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
            postalCode: undefined,
            country: item?.Country,
            state: item?.State,
            district: item?.District,
            city: item?.City,
            area: item?.Area,
            sbu: item.SBU,
            zone: item.Zone,
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
      fields = administrativeDivisions.administrativeDiv,
      length = 0,
      status = 'A',
    ) => {
      const requiredFields = [
        'country',
        'state',
        'district',
        'environment',
        'status',
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
      //Pass required Field in Array
      return administrativeDivisions.administrativeDivisionsService
        .findByFields({
          input: {
            filter: {
              ..._.pick({ ...fields, status }, requiredFields),
            },
          },
        })
        .then(res => {
          if (
            res.findByFieldsAdministrativeDevision?.success &&
            res.findByFieldsAdministrativeDevision.data?.length > length
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
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemove
            show={isHideView}
            onClick={() => setIsHideView(!isHideView)}
          />
        )}
        <div className=' mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (isHideView ? 'hidden' : 'shown')
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
              <Grid cols={2}>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Country'
                        placeholder={
                          errors.country ? 'Please Enter Country ' : 'Country'
                        }
                        hasError={!!errors.country}
                        value={value}
                        onChange={countryValue => {
                          const country = countryValue.toUpperCase();
                          onChange(country);
                          administrativeDivisions.updateAdministrativeDiv({
                            ...administrativeDivisions.administrativeDiv,
                            country,
                          });
                        }}
                      />
                    )}
                    name='country'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Form.InputWrapper label='State' hasError={!!errors.state}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          placeholder={
                            errors.state ? 'Please Enter state' : 'State'
                          }
                          hasError={!!errors.state}
                          value={value}
                          onChange={stateValue => {
                            const state = stateValue.toUpperCase();
                            onChange(state);
                            administrativeDivisions.updateAdministrativeDiv({
                              ...administrativeDivisions.administrativeDiv,
                              state,
                            });
                          }}
                        />
                      )}
                      name='state'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                  </Form.InputWrapper>

                  <Form.InputWrapper
                    label='District'
                    hasError={!!errors.district}
                  >
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          placeholder={
                            errors.district
                              ? 'Please Enter District'
                              : 'District'
                          }
                          hasError={!!errors.district}
                          value={value}
                          onChange={districtValue => {
                            const district = districtValue.toUpperCase();
                            onChange(district);
                            administrativeDivisions.updateAdministrativeDiv({
                              ...administrativeDivisions.administrativeDiv,
                              district,
                            });
                          }}
                        />
                      )}
                      name='district'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                  </Form.InputWrapper>

                  <Form.InputWrapper label='City'>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          hasError={!!errors.city}
                          placeholder={
                            !!errors.city ? 'Please Enter City' : 'City'
                          }
                          value={value}
                          onChange={cityValue => {
                            const city = cityValue.toUpperCase();
                            onChange(city);
                            administrativeDivisions.updateAdministrativeDiv({
                              ...administrativeDivisions.administrativeDiv,
                              city,
                            });
                          }}
                        />
                      )}
                      name='city'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                  </Form.InputWrapper>

                  <Form.InputWrapper label='Area'>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          placeholder={
                            !!errors.area ? 'Please Enter Area' : 'Area'
                          }
                          hasError={!!errors.area}
                          value={value}
                          onChange={areaValue => {
                            const area = areaValue.toUpperCase();
                            onChange(area);
                            administrativeDivisions.updateAdministrativeDiv({
                              ...administrativeDivisions.administrativeDiv,
                              area,
                            });
                          }}
                        />
                      )}
                      name='area'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                  </Form.InputWrapper>
                  <Form.InputWrapper label='Postal Code'>
                    <div className='flex flex-row'>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Input
                            type='number'
                            placeholder={
                              errors.postalCode
                                ? 'Please Enter PostalCode'
                                : 'PostalCode'
                            }
                            hasError={!!errors.postalCode}
                            value={value}
                            onChange={postalCode => {
                              onChange(postalCode);
                              administrativeDivisions.updateLocalPostalCode({
                                ...administrativeDivisions.localState,
                                postalCode,
                              });
                            }}
                          />
                        )}
                        name='postalCode'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <div className='w-4 mt-2 ml-2'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          onClick={() => {
                            const postalCode =
                              administrativeDivisions.localState?.postalCode;
                            if (postalCode === undefined)
                              return alert('Please Enter PostalCode');
                            if (postalCode !== undefined) {
                              const arrState =
                                administrativeDivisions.administrativeDiv &&
                                administrativeDivisions.administrativeDiv
                                  .postalCode;
                              administrativeDivisions.updateAdministrativeDiv({
                                ...administrativeDivisions.administrativeDiv,
                                postalCode: arrState
                                  ? arrState.concat(postalCode)
                                  : [postalCode],
                              });
                              administrativeDivisions.updateLocalPostalCode({
                                ...administrativeDivisions.localState,
                                postalCode: '',
                              });
                            }
                          }}
                        >
                          <Icons.EvaIcon icon='plus-circle-outline' />
                          {'Add'}
                        </Buttons.Button>
                      </div>
                    </div>
                    <br />
                    <List space={2} direction='row' justify='center'>
                      <div>
                        {administrativeDivisions.administrativeDiv?.postalCode?.map(
                          (item, index) => (
                            <div className='mb-2' key={index}>
                              <Buttons.Button
                                size='medium'
                                type='solid'
                                icon={Svg.Remove}
                                onClick={() => {
                                  const firstArr =
                                    administrativeDivisions.administrativeDiv?.postalCode?.slice(
                                      0,
                                      index,
                                    ) || [];
                                  const secondArr =
                                    administrativeDivisions.administrativeDiv?.postalCode?.slice(
                                      index + 1,
                                    ) || [];
                                  const finalArray = [
                                    ...firstArr,
                                    ...secondArr,
                                  ];
                                  administrativeDivisions.updateAdministrativeDiv(
                                    {
                                      ...administrativeDivisions.administrativeDiv,
                                      postalCode: finalArray,
                                    },
                                  );
                                }}
                              >
                                {item}
                              </Buttons.Button>
                            </div>
                          ),
                        )}
                      </div>
                    </List>
                  </Form.InputWrapper>
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper label='SBU' hasError={!!errors.sbu}>
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.sbu ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const sbu = e.target.value;
                            onChange(sbu);
                            administrativeDivisions.updateAdministrativeDiv({
                              ...administrativeDivisions.administrativeDiv,
                              sbu,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(routerStore.lookupItems, 'SBU').map(
                            (item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='sbu'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper label='ZONE' hasError={!!errors.zone}>
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.zone ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const zone = e.target.value;
                            onChange(zone);
                            administrativeDivisions.updateAdministrativeDiv({
                              ...administrativeDivisions.administrativeDiv,
                              zone,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(routerStore.lookupItems, 'ZONE').map(
                            (item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='zone'
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
                          administrativeDivisions.updateAdministrativeDiv({
                            ...administrativeDivisions.administrativeDiv,
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
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.status ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const status = e.target.value;
                            onChange(status);
                            administrativeDivisions.updateAdministrativeDiv({
                              ...administrativeDivisions.administrativeDiv,
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
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  {/* <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Environment'
                        hasError={!!errors.environment}
                      >
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
                            administrativeDivisions.updateAdministrativeDiv({
                              ...administrativeDivisions.administrativeDiv,
                              environment,
                            });
                          }}
                        >
                          <option selected>
                            {loginStore.login &&
                            loginStore.login.role !== 'SYSADMIN'
                              ? 'Select'
                              : administrativeDivisions.administrativeDiv
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
                onClick={handleSubmit(onSubmitAdministrativeDivision)}
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
            <AdminstrativeDivList
              data={administrativeDivisions.listAdministrativeDiv || []}
              totalSize={administrativeDivisions.listAdministrativeDivCount}
              extraData={{
                lookupItems: routerStore.lookupItems,
                updateAdministrativeDiv:
                  administrativeDivisions.updateAdministrativeDiv,
                administrativeDiv: administrativeDivisions.administrativeDiv,
                updateLocalState: administrativeDivisions.updateLocalState,
                localState: administrativeDivisions.localState,
                updateLocalDistrict:
                  administrativeDivisions.updateLocalDistrict,
                updateLocalCity: administrativeDivisions.updateLocalCity,
                updateLocalArea: administrativeDivisions.updateLocalArea,
                updateLocalPostalCode:
                  administrativeDivisions.updateLocalPostalCode,
                updateLocalInput: administrativeDivisions.updateLocalInput,
                localInput: administrativeDivisions.localInput,
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
                administrativeDivisions.fetchAdministrativeDiv(page, limit);
                global.filter = { mode: 'pagination', page, limit };
              }}
              onFilter={(type, filter, page, limit) => {
                administrativeDivisions.administrativeDivisionsService.filter({
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
                const isExists = await checkExistsRecords(records);
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
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action: string) => {
              switch (action) {
                case 'Delete': {
                  administrativeDivisions.administrativeDivisionsService
                    .deleteAdministrativeDivisions({
                      input: { id: modalConfirm.id },
                    })
                    .then((res: any) => {
                      setModalConfirm({ show: false });
                      if (res.removeAdministrativeDivision.success) {
                        Toast.success({
                          message: `😊 ${res.removeAdministrativeDivision.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          administrativeDivisions.fetchAdministrativeDiv(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          administrativeDivisions.administrativeDivisionsService.filter(
                            {
                              input: {
                                type: global?.filter?.type,
                                filter: global?.filter?.filter,
                                page: global?.filter?.page,
                                limit: global?.filter?.limit,
                              },
                            },
                          );
                        else administrativeDivisions.fetchAdministrativeDiv();
                      }
                    });
                  break;
                }

                case 'Update': {
                  administrativeDivisions.administrativeDivisionsService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      setModalConfirm({ show: false });
                      if (res.updateAdministrativeDivision.success) {
                        Toast.success({
                          message: `😊 ${res.updateAdministrativeDivision.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          administrativeDivisions.fetchAdministrativeDiv(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          administrativeDivisions.administrativeDivisionsService.filter(
                            {
                              input: {
                                type: global?.filter?.type,
                                filter: global?.filter?.filter,
                                page: global?.filter?.page,
                                limit: global?.filter?.limit,
                              },
                            },
                          );
                        else administrativeDivisions.fetchAdministrativeDiv();
                      }
                    });
                  break;
                }
              }
            }}
            close={() => setModalConfirm({ show: false })}
          />
        </div>
      </>
    );
  }),
);
export default AdministrativeDivisions;
