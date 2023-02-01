import React, {useState} from 'react';
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
  Icons,
  ModalConfirm,
} from '@/library/components';
import {AdminstrativeDivList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {AdministrativeDivisionsHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';

export const AdministrativeDivisions = AdministrativeDivisionsHoc(
  observer(() => {
    const {loginStore, administrativeDivisions, routerStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();
    setValue(
      'environment',
      administrativeDivisions.administrativeDiv?.environment,
    );

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddSection, setHideAddSection] = useState<boolean>(true);

    const onSubmitAdministrativeDivision = () => {
      if (administrativeDivisions.administrativeDiv) {
        if (!administrativeDivisions.administrativeDiv.postalCode)
          return Toast.warning({
            message: '😔 Please enter postal code!',
          });
        administrativeDivisions.administrativeDivisionsService
          .addAdministrativeDivisions({
            input: {...administrativeDivisions.administrativeDiv},
          })
          .then(res => {
            if (res.createAdministrativeDivision.success) {
              Toast.success({
                message: `😊 ${res.createAdministrativeDivision.message}`,
              });
            }
          });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        Toast.warning({
          message: '😔 Please enter all information!',
        });
      }
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
        <div className=' mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddSection ? 'hidden' : 'shown')
            }
          >
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Country'
                      placeholder={
                        errors.country ? 'Please Enter Country ' : 'Country'
                      }
                      hasError={!!errors.country}
                      value={administrativeDivisions.administrativeDiv?.country}
                      onChange={country => {
                        onChange(country);
                        administrativeDivisions.updateAdministrativeDiv({
                          ...administrativeDivisions.administrativeDiv,
                          country: country.toUpperCase(),
                        });
                      }}
                    />
                  )}
                  name='country'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Form.InputWrapper label='State' hasError={!!errors.state}>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Input
                        placeholder={
                          errors.state ? 'Please Enter state' : 'State'
                        }
                        hasError={!!errors.state}
                        value={
                          administrativeDivisions.administrativeDiv?.state || ''
                        }
                        onChange={state => {
                          onChange(state);
                          administrativeDivisions.updateAdministrativeDiv({
                            ...administrativeDivisions.administrativeDiv,
                            state: state.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='state'
                    rules={{required: true}}
                    defaultValue=''
                  />
                </Form.InputWrapper>

                <Form.InputWrapper
                  label='District'
                  hasError={!!errors.district}
                >
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Input
                        placeholder={
                          errors.district ? 'Please Enter District' : 'District'
                        }
                        hasError={!!errors.district}
                        value={
                          administrativeDivisions.administrativeDiv?.district ||
                          ''
                        }
                        onChange={district => {
                          onChange(district);
                          administrativeDivisions.updateAdministrativeDiv({
                            ...administrativeDivisions.administrativeDiv,
                            district: district.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='district'
                    rules={{required: true}}
                    defaultValue=''
                  />
                </Form.InputWrapper>

                <Form.InputWrapper label='City'>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Input
                        hasError={!!errors.city}
                        placeholder={
                          !!errors.city ? 'Please Enter City' : 'City'
                        }
                        value={
                          administrativeDivisions.administrativeDiv?.city || ''
                        }
                        onChange={city => {
                          onChange(city);
                          administrativeDivisions.updateAdministrativeDiv({
                            ...administrativeDivisions.administrativeDiv,
                            city: city.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='city'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Form.InputWrapper>

                <Form.InputWrapper label='Area'>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Input
                        placeholder={
                          !!errors.area ? 'Please Enter Area' : 'Area'
                        }
                        hasError={!!errors.area}
                        value={
                          administrativeDivisions.administrativeDiv?.area || ''
                        }
                        onChange={area => {
                          onChange(area);
                          administrativeDivisions.updateAdministrativeDiv({
                            ...administrativeDivisions.administrativeDiv,
                            area: area.toUpperCase(),
                          });
                        }}
                      />
                    )}
                    name='area'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </Form.InputWrapper>
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Form.InputWrapper label='Postal Code'>
                  <div className='flex flex-row'>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Input
                          type='number'
                          placeholder={
                            errors.postalCode
                              ? 'Please Enter PostalCode'
                              : 'PostalCode'
                          }
                          hasError={!!errors.postalCode}
                          value={
                            administrativeDivisions.localState?.postalCode || ''
                          }
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
                      rules={{required: false}}
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
                                const finalArray = [...firstArr, ...secondArr];
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

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='SBU' hasError={!!errors.sbu}>
                      <select
                        value={administrativeDivisions.administrativeDiv?.sbu}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.sbu ? 'border-red-500  ' : 'border-gray-300'
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
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='ZONE' hasError={!!errors.zone}>
                      <select
                        value={administrativeDivisions.administrativeDiv?.zone}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.zone ? 'border-red-500  ' : 'border-gray-300'
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
                  rules={{required: false}}
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
                          administrativeDivisions.administrativeDiv?.environment
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
                  rules={{required: true}}
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
              onPageSizeChange={(page, limit) => {
                administrativeDivisions.fetchAdministrativeDiv(page, limit);
                global.filter = {mode: 'pagination', page, limit};
              }}
              onFilter={(type, filter, page, limit) => {
                administrativeDivisions.administrativeDivisionsService.filter({
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
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              const {mode, type, filter, page, limit} = global.filter;
              switch (action) {
                case 'Delete': {
                  administrativeDivisions.administrativeDivisionsService
                    .deleteAdministrativeDivisions({
                      input: {id: modalConfirm.id},
                    })
                    .then((res: any) => {
                      setModalConfirm({show: false});
                      if (res.removeAdministrativeDivision.success) {
                        Toast.success({
                          message: `😊 ${res.removeAdministrativeDivision.message}`,
                        });
                        if (mode == 'pagination') {
                          administrativeDivisions.fetchAdministrativeDiv(
                            page,
                            limit,
                          );
                        } else if (mode == 'filter') {
                          administrativeDivisions.administrativeDivisionsService.filter(
                            {
                              input: {type, filter, page, limit},
                            },
                          );
                        } else administrativeDivisions.fetchAdministrativeDiv();
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
                      setModalConfirm({show: false});
                      if (res.updateAdministrativeDivision.success) {
                        Toast.success({
                          message: `😊 ${res.updateAdministrativeDivision.message}`,
                        });
                        if (mode == 'pagination')
                          administrativeDivisions.fetchAdministrativeDiv();
                        else if (mode == 'filter')
                          administrativeDivisions.administrativeDivisionsService.filter(
                            {
                              input: {type, filter, page, limit},
                            },
                          );
                        else administrativeDivisions.fetchAdministrativeDiv();
                      }
                    });
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
export default AdministrativeDivisions;
