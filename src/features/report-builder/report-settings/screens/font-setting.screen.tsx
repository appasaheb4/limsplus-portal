import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';

import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
} from '@/library/components';
import {FontSettingsList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';
import {invertHex} from '@utils';

import {FontSettingHoc} from '../hoc';

import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';

export const FontSetting = FontSettingHoc(
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

    console.log({bgColor: invertHex(reportSettingStore.fontSetting.fontColor)});

    setValue('environment', reportSettingStore.fontSetting?.environment);
    setValue('fontName', reportSettingStore.fontSetting?.fontName);
    setValue('fontCase', reportSettingStore.fontSetting?.fontCase);

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(true);
    const [isExistsId, setIsExistsId] = useState<boolean>(false);

    const onSubmitBanner = () => {
      if (isExistsId)
        return Toast.warning({
          message: '😔 Already exists id. Please enter diff.',
        });
      reportSettingStore.fontSettingService
        .addFontSetting({input: {...reportSettingStore.fontSetting}})
        .then(res => {
          if (res.createFontSetting.success) {
            Toast.success({
              message: `😊 ${res.createFontSetting.message}`,
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
                        label='Font Id'
                        placeholder='Font Id'
                        hasError={errors.fontId}
                        value={reportSettingStore.fontSetting?.fontId}
                        onChange={fontId => {
                          onChange(fontId);
                          reportSettingStore.updateFontSetting({
                            ...reportSettingStore.fontSetting,
                            fontId,
                          });
                        }}
                        onBlur={fontId => {
                          reportSettingStore.fontSettingService
                            .findByFields({
                              input: {
                                filter: {
                                  fontId,
                                },
                              },
                            })
                            .then(res => {
                              if (res.findByFieldsFontSetting.success) {
                                setError('fontId', {type: 'onBlur'});
                                Toast.warning({
                                  message:
                                    '😔 Already exists font id. Please enter diff.',
                                });
                                return setIsExistsId(true);
                              } else {
                                clearErrors('fontId');
                                return setIsExistsId(false);
                              }
                            });
                        }}
                      />
                    )}
                    name='fontId'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Font Name'
                        hasError={errors.fontName}
                      >
                        <select
                          value={reportSettingStore.fontSetting?.fontName}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.fontName
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const fontName = e.target.value;
                            onChange(fontName);
                            reportSettingStore.updateFontSetting({
                              ...reportSettingStore.fontSetting,
                              fontName,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'FONT SETTING-FONT_NAME',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='fontName'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Input
                        label='Font Size'
                        placeholder='Font Size'
                        hasError={errors.fontSize}
                        value={reportSettingStore.fontSetting?.fontSize}
                        onChange={fontSize => {
                          onChange(fontSize);
                          reportSettingStore.updateFontSetting({
                            ...reportSettingStore.fontSetting,
                            fontSize: Number.parseFloat(fontSize),
                          });
                        }}
                      />
                    )}
                    name='fontSize'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <div className='flex flex-row gap-4 items-center justify-around'>
                        <Form.Input
                          label='Font hex color'
                          placeholder='Like #000000'
                          hasError={errors.fontColor}
                          value={reportSettingStore.fontSetting?.fontColor}
                          onChange={fontColor => {
                            onChange(fontColor);
                            reportSettingStore.updateFontSetting({
                              ...reportSettingStore.fontSetting,
                              fontColor,
                            });
                          }}
                        />
                        <div
                          className='h-8 w-8 mt-4 rounded-md'
                          style={{
                            backgroundColor:
                              reportSettingStore.fontSetting.fontColor,
                            borderWidth: 0.6,
                            borderColor: '#000000',
                          }}
                        />
                      </div>
                    )}
                    name='fontColor'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <div className='flex flex-row gap-4 items-center justify-around'>
                        <Form.Input
                          label='Background hex color'
                          placeholder='Like #000000'
                          hasError={errors.fontBackground}
                          value={reportSettingStore.fontSetting?.fontBackground}
                          onChange={fontBackground => {
                            onChange(fontBackground);
                            reportSettingStore.updateFontSetting({
                              ...reportSettingStore.fontSetting,
                              fontBackground,
                            });
                          }}
                        />
                        <div
                          className='h-8 w-8 mt-4 rounded-md'
                          style={{
                            backgroundColor:
                              reportSettingStore.fontSetting.fontBackground,
                            borderWidth: 0.6,
                            borderColor: '#000000',
                          }}
                        />
                      </div>
                    )}
                    name='fontBackground'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Font Case'
                        hasError={errors.fontCase}
                      >
                        <select
                          value={reportSettingStore.fontSetting?.fontCase}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.fontCase
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const fontCase = e.target.value;
                            onChange(fontCase);
                            reportSettingStore.updateFontSetting({
                              ...reportSettingStore.fontSetting,
                              fontCase,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'FONT SETTING-FONT_CASE',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='fontCase'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Form.MultilineInput
                    label='Font CSS'
                    style={{color: '#ffffff', backgroundColor: '#000000'}}
                    placeholder='css'
                    value={reportSettingStore.fontSetting?.fontCss}
                    onChange={fontCss => {
                      reportSettingStore.updateFontSetting({
                        ...reportSettingStore.fontSetting,
                        fontCss,
                      });
                    }}
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.Input
                        label='Version'
                        placeholder='Version'
                        hasError={errors.version}
                        value={reportSettingStore.fontSetting?.version}
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
                          value={reportSettingStore.fontSetting?.environment}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.environment
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const environment = e.target.value;
                            onChange(environment);
                            reportSettingStore.updateFontSetting({
                              ...reportSettingStore.fontSetting,
                              environment,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'FONT SETTING-ENVIRONMENT',
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
          <FontSettingsList
            data={reportSettingStore.fontSettingList || []}
            totalSize={reportSettingStore.fontSettingListCount}
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
                reportSettingStore.fontSettingService
                  .deleteFontSetting({
                    input: {id: modalConfirm.id},
                  })
                  .then((res: any) => {
                    if (res.removeFontSetting.success) {
                      Toast.success({
                        message: `😊 ${res.removeFontSetting.message}`,
                      });
                      setModalConfirm({show: false});
                      reportSettingStore.fontSettingService.listFontSetting();
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
