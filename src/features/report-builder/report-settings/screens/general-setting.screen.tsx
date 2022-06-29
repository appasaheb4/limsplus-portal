import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
} from '@/library/components';
import {GeneralSettingsList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';

import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';

import {GeneralSettingHoc} from '../hoc';

export const GeneralSettings = GeneralSettingHoc(
  observer(() => {
    const {loading, routerStore, reportSettingStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      setError,
      clearErrors,
    } = useForm();

    setValue('environment', reportSettingStore.generalSetting?.environment);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(true);
    const [isExistsTempCode, setIsExistsTempCode] = useState<boolean>(false);

    const onSubmitBanner = () => {
      console.log({isExistsTempCode});
      if (isExistsTempCode)
        return Toast.warning({
          message: '😔 Already exists temp code. Please enter diff.',
        });
      reportSettingStore.generalSettingService
        .addGeneralSetting({input: {...reportSettingStore.generalSetting}})
        .then(res => {
          if (res.createGeneralSetting.success) {
            Toast.success({
              message: `😊 ${res.createGeneralSetting.message}`,
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
            'p-2 rounded-lg shadow-xl ' + (isInputView ? 'shown' : 'shown')
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
                        label='Temp Code'
                        placeholder='Temp code'
                        hasError={errors.tempCode}
                        value={reportSettingStore.generalSetting?.tempCode}
                        onChange={tempCode => {
                          onChange(tempCode);
                          reportSettingStore.updateGeneralSetting({
                            ...reportSettingStore.generalSetting,
                            tempCode,
                          });
                        }}
                        onBlur={tempCode => {
                          reportSettingStore.generalSettingService
                            .findByFields({
                              input: {
                                filter: {
                                  tempCode,
                                },
                              },
                            })
                            .then(res => {
                              if (res.findByFieldsGeneralSetting.success) {
                                setError('tempCode', {type: 'onBlur'});
                                Toast.warning({
                                  message:
                                    '😔 Already exists temp code. Please enter diff.',
                                });
                                return setIsExistsTempCode(true);
                              } else {
                                clearErrors('tempCode');
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
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Report Section'
                        data={{
                          list: reportSettingStore.reportSectionList,
                          displayKey: ['section'],
                        }}
                        hasError={errors.reportSection}
                        onFilter={(value: string) => {
                          if (_.isEmpty(value)) {
                            console.log('empty');
                            reportSettingStore.updateReportSectionList(
                              reportSettingStore.reportSectionListCopy,
                            );
                          } else {
                            reportSettingStore.updateReportSectionList(
                              reportSettingStore.reportSectionListCopy.filter(
                                item =>
                                  item.section
                                    .toString()
                                    .toLowerCase()
                                    .includes(value.toLowerCase()),
                              ),
                            );
                          }
                        }}
                        onSelect={item => {
                          onChange(item.section);
                          reportSettingStore.updateGeneralSetting({
                            ...reportSettingStore.generalSetting,
                            reportSection: {
                              id: item._id,
                              section: item.section,
                            },
                          });
                          reportSettingStore.updateReportSectionList(
                            reportSettingStore.reportSectionListCopy,
                          );
                        }}
                      />
                    )}
                    name='reportSection'
                    rules={{required: true}}
                    defaultValue={reportSettingStore.reportSectionList}
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Section Setting'
                        data={{
                          list: reportSettingStore.sectionSettingList,
                          displayKey: ['tempCode', 'sectionSetting'],
                        }}
                        hasError={errors.sectionSetting}
                        onFilter={(value: string) => {
                          reportSettingStore.sectionSettingService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ['tempCode', 'sectionSetting'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            },
                          );
                        }}
                        onSelect={item => {
                          onChange(item._id);
                          reportSettingStore.updateGeneralSetting({
                            ...reportSettingStore.generalSetting,
                            sectionSetting: {
                              id: item._id,
                              tempCode: item.tempCode,
                              sectionSetting: item.sectionSetting,
                            },
                          });
                          reportSettingStore.updateSectionSettingList(
                            reportSettingStore.sectionSettingListCopy,
                          );
                        }}
                      />
                    )}
                    name='sectionSetting'
                    rules={{required: true}}
                    defaultValue={reportSettingStore.sectionSettingList}
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Page Setting'
                        data={{
                          list: reportSettingStore.pageSettingList,
                          displayKey: ['tempCode'],
                        }}
                        hasError={errors.pageSetting}
                        onFilter={(value: string) => {
                          reportSettingStore.pageSettingService.filterByFields({
                            input: {
                              filter: {
                                fields: ['tempCode'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item._id);
                          reportSettingStore.updateGeneralSetting({
                            ...reportSettingStore.generalSetting,
                            pageSetting: {
                              id: item._id,
                              tempCode: item.tempCode,
                            },
                          });
                          reportSettingStore.updatePageSettingList(
                            reportSettingStore.pageSettingListCopy,
                          );
                        }}
                      />
                    )}
                    name='pageSetting'
                    rules={{required: true}}
                    defaultValue={reportSettingStore.pageSettingList}
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Input
                        label='Version'
                        placeholder='Version'
                        hasError={errors.version}
                        value={reportSettingStore.generalSetting?.version}
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
                          value={reportSettingStore.generalSetting?.environment}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.environment
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const environment = e.target.value;
                            onChange(environment);
                            reportSettingStore.updateGeneralSetting({
                              ...reportSettingStore.generalSetting,
                              environment,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'GENERAL SETTING-ENVIRONMENT',
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
          <GeneralSettingsList
            data={reportSettingStore.generalSettingList || []}
            totalSize={reportSettingStore.generalSettingListCount}
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
                reportSettingStore.generalSettingService
                  .deleteGeneralSetting({
                    input: {id: modalConfirm.id},
                  })
                  .then((res: any) => {
                    if (res.removeGeneralSetting.success) {
                      Toast.success({
                        message: `😊 ${res.removeGeneralSetting.message}`,
                      });
                      setModalConfirm({show: false});
                      reportSettingStore.generalSettingService.listGeneralSetting();
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
