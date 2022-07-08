import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';

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
import {SectionSettingsList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';

import {SectionSettingHoc} from '../hoc';

import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';

export const SectionSettings = SectionSettingHoc(
  observer(() => {
    const {routerStore, reportSettingStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      setError,
      clearErrors,
    } = useForm();

    setValue('environment', reportSettingStore.sectionSetting?.environment);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(true);
    const [isExistsTempCode, setIsExistsTempCode] = useState<boolean>(false);

    const onSubmitBanner = () => {
      console.log({isExistsTempCode});

      if (isExistsTempCode)
        return Toast.warning({
          message: '😔 Already exists temp code. Please enter diff.',
        });
      reportSettingStore.sectionSettingService
        .addSectionSetting({input: {...reportSettingStore.sectionSetting}})
        .then(res => {
          if (res.createSectionSetting.success) {
            Toast.success({
              message: `😊 ${res.createSectionSetting.message}`,
            });
          }
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    };

    return (
      <>
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemoveBottom
            style={{bottom: 140}}
            show={isInputView}
            onClick={() => setIsInputView(!isInputView)}
          />
        )}

        <div
          className={
            'p-2 rounded-lg shadow-xl ' + (isInputView ? 'hidden' : 'shown')
          }
        >
          <Grid cols={2}>
            <List direction='col' space={4} justify='stretch' fill>
              <Grid cols={2}>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Input
                        label='Section Id'
                        placeholder='Section Id'
                        hasError={errors.tempCode}
                        value={reportSettingStore.sectionSetting?.tempCode}
                        onChange={tempCode => {
                          onChange(tempCode);
                          reportSettingStore.updateSectionSetting({
                            ...reportSettingStore.sectionSetting,
                            tempCode,
                          });
                        }}
                        onBlur={tempCode => {
                          reportSettingStore.sectionSettingService
                            .findByFields({
                              input: {
                                filter: {
                                  tempCode,
                                  sectionSetting:
                                    reportSettingStore.sectionSetting
                                      ?.sectionSetting || '',
                                },
                              },
                            })
                            .then(res => {
                              console.log({res});

                              if (res.findByFieldsSectionSetting.success) {
                                setError('tempCode', {type: 'onBlur'});
                                setError('sectionSetting', {type: 'onBlur'});
                                Toast.warning({
                                  message:
                                    '😔 Already exists temp code. Please enter diff.',
                                });
                                return setIsExistsTempCode(true);
                              } else {
                                clearErrors('tempCode');
                                clearErrors('sectionSetting');
                                return setIsExistsTempCode(false);
                              }
                            });
                        }}
                      />
                    )}
                    name='tempCode'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Section Setting'
                        hasError={errors.sectionSetting}
                      >
                        <select
                          value={
                            reportSettingStore.sectionSetting?.sectionSetting
                          }
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.sectionSetting
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const sectionSetting = e.target.value;
                            onChange(sectionSetting);
                            reportSettingStore.updateSectionSetting({
                              ...reportSettingStore.sectionSetting,
                              sectionSetting,
                            });
                            reportSettingStore.sectionSettingService
                              .findByFields({
                                input: {
                                  filter: {
                                    tempCode:
                                      reportSettingStore.sectionSetting
                                        ?.tempCode || '',
                                    sectionSetting,
                                  },
                                },
                              })
                              .then(res => {
                                if (res.findByFieldsSectionSetting.success) {
                                  setError('tempCode', {type: 'onBlur'});
                                  setError('sectionSetting', {type: 'onBlur'});
                                  Toast.warning({
                                    message:
                                      '😔 Already exists temp code. Please enter diff.',
                                  });
                                  return setIsExistsTempCode(true);
                                } else {
                                  clearErrors('tempCode');
                                  clearErrors('sectionSetting');
                                  return setIsExistsTempCode(false);
                                }
                              });
                          }}
                        >
                          <option selected>Select</option>
                          {reportSettingStore.reportSectionList.map(
                            (item: any, index: number) => (
                              <option key={index} value={item.section}>
                                {item.section}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='sectionSetting'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  <Form.MultilineInput
                    label='Section CSS'
                    style={{color: '#ffffff', backgroundColor: '#000000'}}
                    placeholder='Style'
                    value={reportSettingStore.sectionSetting?.sectionCSS}
                    onChange={sectionCSS => {
                      reportSettingStore.updateSectionSetting({
                        ...reportSettingStore.sectionSetting,
                        sectionCSS,
                      });
                    }}
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Input
                        label='Order'
                        placeholder='Order'
                        type='number'
                        hasError={errors.order}
                        value={reportSettingStore.sectionSetting?.order}
                        onChange={order => {
                          onChange(order);
                          reportSettingStore.updateSectionSetting({
                            ...reportSettingStore.sectionSetting,
                            order: Number.parseFloat(order),
                          });
                        }}
                      />
                    )}
                    name='order'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Grid cols={4}>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Toggle
                          label='Section Required'
                          hasError={errors.sectionRequired}
                          value={
                            reportSettingStore.sectionSetting?.sectionRequired
                          }
                          onChange={sectionRequired => {
                            onChange(sectionRequired);
                            reportSettingStore.updateSectionSetting({
                              ...reportSettingStore.sectionSetting,
                              sectionRequired,
                            });
                          }}
                        />
                      )}
                      name='sectionRequired'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Toggle
                          label='Section Grid'
                          hasError={errors.sectionGrid}
                          value={reportSettingStore.sectionSetting?.sectionGrid}
                          onChange={sectionGrid => {
                            onChange(sectionGrid);
                            reportSettingStore.updateSectionSetting({
                              ...reportSettingStore.sectionSetting,
                              sectionGrid,
                            });
                          }}
                        />
                      )}
                      name='sectionGrid'
                      rules={{required: false}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Toggle
                          label='Line Grid'
                          hasError={errors.lineGrid}
                          value={reportSettingStore.sectionSetting?.lineGrid}
                          onChange={lineGrid => {
                            onChange(lineGrid);
                            reportSettingStore.updateSectionSetting({
                              ...reportSettingStore.sectionSetting,
                              lineGrid,
                            });
                          }}
                        />
                      )}
                      name='lineGrid'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Toggle
                          label='Column Grid'
                          hasError={errors.columnGrid}
                          value={reportSettingStore.sectionSetting?.columnGrid}
                          onChange={columnGrid => {
                            onChange(columnGrid);
                            reportSettingStore.updateSectionSetting({
                              ...reportSettingStore.sectionSetting,
                              columnGrid,
                            });
                          }}
                        />
                      )}
                      name='columnGrid'
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
                        label='Version'
                        placeholder='Version'
                        hasError={errors.version}
                        value={reportSettingStore.sectionSetting?.version}
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
                      <Form.InputWrapper
                        label='Environment'
                        hasError={errors.environment}
                      >
                        <select
                          value={reportSettingStore.sectionSetting?.environment}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.environment
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const environment = e.target.value;
                            onChange(environment);
                            reportSettingStore.updateSectionSetting({
                              ...reportSettingStore.sectionSetting,
                              environment,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'SECTION SETTING-ENVIRONMENT',
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
            </List>
          </Grid>
          <br />
          <List direction='row' space={3} align='center'>
            <Buttons.Button
              size='medium'
              type='solid'
              icon={Svg.Save}
              onClick={handleSubmit(onSubmitBanner)}
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
          <SectionSettingsList
            data={reportSettingStore.sectionSettingList || []}
            totalSize={reportSettingStore.sectionSettingListCount}
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
                type: 'delete',
                id: rows,
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
                body: 'Update banner!',
              });
            }}
            onPageSizeChange={(page, limit) => {
              // bannerStore.fetchListBanner(page, limit);
            }}
            onFilter={(type, filter, page, limit) => {
              // bannerStore.BannerService.filter({
              //   input: {type, filter, page, limit},
              // });
            }}
          />
        </div>
        <ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            switch (type) {
              case 'delete': {
                reportSettingStore.sectionSettingService
                  .deleteSectionSetting({
                    input: {id: modalConfirm.id},
                  })
                  .then((res: any) => {
                    if (res.removeSectionSetting.success) {
                      Toast.success({
                        message: `😊 ${res.removeSectionSetting.message}`,
                      });
                      setModalConfirm({show: false});
                      reportSettingStore.sectionSettingService.listSectionSetting();
                    }
                  });
                break;
              }

              // case 'update': {
              //   bannerStore.BannerService.updateSingleFiled({
              //     input: {
              //       _id: modalConfirm.data.id,
              //       [modalConfirm.data.dataField]: modalConfirm.data.value,
              //     },
              //   }).then((res: any) => {
              //     if (res.updateBanner.success) {
              //       Toast.success({
              //         message: `😊 ${res.updateBanner.message}`,
              //       });
              //       setModalConfirm({show: false});
              //       bannerStore.fetchListBanner();
              //     }
              //   });
              //   break;
              // }
            }
          }}
          onClose={() => setModalConfirm({show: false})}
        />
      </>
    );
  }),
);
