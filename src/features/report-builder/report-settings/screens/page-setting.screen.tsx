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
import {PageSettingsList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';

import {PageSettingHoc} from '../hoc';

import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';

export const PageSetting = PageSettingHoc(
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

    setValue('environment', reportSettingStore.pageSetting?.environment);
    setValue('pageSize', reportSettingStore.pageSetting?.pageSize);
    setValue('topMargin', reportSettingStore.pageSetting?.topMargin);
    setValue('bottomMargin', reportSettingStore.pageSetting?.bottomMargin);
    setValue('leftMargin', reportSettingStore.pageSetting?.leftMargin);
    setValue('rightMargin', reportSettingStore.pageSetting?.rightMargin);
    setValue('headerSize', reportSettingStore.pageSetting?.headerSize);
    setValue('footerSize', reportSettingStore.pageSetting?.footerSize);
    setValue(
      'pageOrientation',
      reportSettingStore.pageSetting?.pageOrientation,
    );

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(true);
    const [isExistsTempCode, setIsExistsTempCode] = useState<boolean>(false);

    const onSubmitBanner = () => {
      if (isExistsTempCode)
        return Toast.warning({
          message: '😔 Already exists temp code. Please enter diff.',
        });
      reportSettingStore.pageSettingService
        .addPageSetting({input: {...reportSettingStore.pageSetting}})
        .then(res => {
          if (res.createPageSetting.success) {
            Toast.success({
              message: `😊 ${res.createPageSetting.message}`,
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
                        label='Temp Code'
                        placeholder='Temp code'
                        hasError={errors.tempCode}
                        value={reportSettingStore.pageSetting?.tempCode}
                        onChange={tempCode => {
                          onChange(tempCode);
                          reportSettingStore.updatePageSetting({
                            ...reportSettingStore.pageSetting,
                            tempCode,
                          });
                        }}
                        onBlur={tempCode => {
                          reportSettingStore.pageSettingService
                            .findByFields({
                              input: {
                                filter: {
                                  tempCode,
                                },
                              },
                            })
                            .then(res => {
                              if (res.findByFieldsPageSetting.success) {
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
                      <Form.InputWrapper
                        label='Page Size'
                        hasError={errors.pageSize}
                      >
                        <select
                          value={reportSettingStore.pageSetting?.pageSize}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.pageSize
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const pageSize = e.target.value;
                            onChange(pageSize);
                            reportSettingStore.updatePageSetting({
                              ...reportSettingStore.pageSetting,
                              pageSize,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'PAGE SETTING-PAPER_SIZE',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='pageSize'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Top Margin'
                        hasError={errors.topMargin}
                      >
                        <select
                          value={reportSettingStore.pageSetting?.topMargin}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.topMargin
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const topMargin = e.target.value;
                            onChange(topMargin);
                            reportSettingStore.updatePageSetting({
                              ...reportSettingStore.pageSetting,
                              topMargin,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'PAGE SETTING-TOP_MARGIN',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='topMargin'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Bottom Margin'
                        hasError={errors.bottomMargin}
                      >
                        <select
                          value={reportSettingStore.pageSetting?.bottomMargin}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.bottomMargin
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const bottomMargin = e.target.value;
                            onChange(bottomMargin);
                            reportSettingStore.updatePageSetting({
                              ...reportSettingStore.pageSetting,
                              bottomMargin,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'PAGE SETTING-BOTTOM MARGIN',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='bottomMargin'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Left Margin'
                        hasError={errors.leftMargin}
                      >
                        <select
                          value={reportSettingStore.pageSetting?.leftMargin}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.leftMargin
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const leftMargin = e.target.value;
                            onChange(leftMargin);
                            reportSettingStore.updatePageSetting({
                              ...reportSettingStore.pageSetting,
                              leftMargin,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'PAGE SETTING-LEFT_MARGIN',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='leftMargin'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Right Margin'
                        hasError={errors.rightMargin}
                      >
                        <select
                          value={reportSettingStore.pageSetting?.rightMargin}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.rightMargin
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const rightMargin = e.target.value;
                            onChange(rightMargin);
                            reportSettingStore.updatePageSetting({
                              ...reportSettingStore.pageSetting,
                              rightMargin,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'PAGE SETTING-RIGHT_MARGIN',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='rightMargin'
                    rules={{required: false}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Header Size'
                        hasError={errors.headerSize}
                      >
                        <select
                          value={reportSettingStore.pageSetting?.headerSize}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.headerSize
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const headerSize = e.target.value;
                            onChange(headerSize);
                            reportSettingStore.updatePageSetting({
                              ...reportSettingStore.pageSetting,
                              headerSize,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'PAGE SETTING-HEADER_SIZE',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='headerSize'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Footer Size'
                        hasError={errors.footerSize}
                      >
                        <select
                          value={reportSettingStore.pageSetting?.footerSize}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.footerSize
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const footerSize = e.target.value;
                            onChange(footerSize);
                            reportSettingStore.updatePageSetting({
                              ...reportSettingStore.pageSetting,
                              footerSize,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'PAGE SETTING-FOOTER_SIZE',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='footerSize'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Page Orientation'
                        hasError={errors.pageOrientation}
                      >
                        <select
                          value={
                            reportSettingStore.pageSetting?.pageOrientation
                          }
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.pageOrientation
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const pageOrientation = e.target.value;
                            onChange(pageOrientation);
                            reportSettingStore.updatePageSetting({
                              ...reportSettingStore.pageSetting,
                              pageOrientation,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'PAGE SETTING-PAGE_ORIENTATION',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='pageOrientation'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputFile
                        label='Background Image'
                        placeholder='Please select image'
                        hasError={errors.image}
                        onChange={e => {
                          const backgroundImage = e.target.files[0];
                          onChange(backgroundImage);
                          reportSettingStore.updatePageSetting({
                            ...reportSettingStore.pageSetting,
                            backgroundImage,
                          });
                        }}
                      />
                    )}
                    name='image'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Input
                        label='Version'
                        placeholder='Version'
                        hasError={errors.version}
                        value={reportSettingStore.pageSetting?.version}
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
                          value={reportSettingStore.pageSetting?.environment}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.environment
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const environment = e.target.value;
                            onChange(environment);
                            reportSettingStore.updatePageSetting({
                              ...reportSettingStore.pageSetting,
                              environment,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'PAGE SETTING-ENVIRONMENT',
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
          <PageSettingsList
            data={reportSettingStore.pageSettingList || []}
            totalSize={reportSettingStore.pageSettingListCount}
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
                reportSettingStore.pageSettingService
                  .deletePageSetting({
                    input: {id: modalConfirm.id},
                  })
                  .then((res: any) => {
                    if (res.removePageSetting.success) {
                      Toast.success({
                        message: `😊 ${res.removePageSetting.message}`,
                      });
                      setModalConfirm({show: false});
                      reportSettingStore.pageSettingService.listPageSetting();
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
