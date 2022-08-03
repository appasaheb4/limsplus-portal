import React, {useState} from 'react';
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
import {GeneralSettingsList} from '../../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';
import {PDFViewer} from '@react-pdf/renderer';
import {PdfTemplateSetting} from './pdf/pdf-template-setting';

import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';

export const TemplateSettings = observer(() => {
  const {loading, routerStore, reportSettingStore} = useStores();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const [modalConfirm, setModalConfirm] = useState<any>();
  const [isInputView, setIsInputView] = useState<boolean>(false);
  const [isExistsTempCode, setIsExistsTempCode] = useState<boolean>(false);

  const onSave = () => {
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
                      label='Template Code'
                      placeholder='Template code'
                      hasError={!!errors.tempCode}
                      value={reportSettingStore.templateSettings?.tempCode}
                      onChange={tempCode => {
                        onChange(tempCode);
                        reportSettingStore.updateTemplateSettings({
                          ...reportSettingStore.templateSettings,
                          tempCode,
                        });
                      }}
                      // onBlur={tempCode => {
                      //   reportSettingStore.generalSettingService
                      //     .findByFields({
                      //       input: {
                      //         filter: {
                      //           tempCode,
                      //         },
                      //       },
                      //     })
                      //     .then(res => {
                      //       if (res.findByFieldsGeneralSetting.success) {
                      //         setError('tempCode', {type: 'onBlur'});
                      //         Toast.warning({
                      //           message:
                      //             '😔 Already exists temp code. Please enter diff.',
                      //         });
                      //         return setIsExistsTempCode(true);
                      //       } else {
                      //         clearErrors('tempCode');
                      //         return setIsExistsTempCode(false);
                      //       }
                      //     });
                      // }}
                    />
                  )}
                  name='tempCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Template Name'
                      placeholder='Template Name'
                      hasError={!!errors.tempName}
                      value={reportSettingStore.templateSettings?.tempName}
                      onChange={tempName => {
                        onChange(tempName);
                        reportSettingStore.updateTemplateSettings({
                          ...reportSettingStore.templateSettings,
                          tempName,
                        });
                      }}
                      // onBlur={tempCode => {
                      //   reportSettingStore.generalSettingService
                      //     .findByFields({
                      //       input: {
                      //         filter: {
                      //           tempCode,
                      //         },
                      //       },
                      //     })
                      //     .then(res => {
                      //       if (res.findByFieldsGeneralSetting.success) {
                      //         setError('tempCode', {type: 'onBlur'});
                      //         Toast.warning({
                      //           message:
                      //             '😔 Already exists temp code. Please enter diff.',
                      //         });
                      //         return setIsExistsTempCode(true);
                      //       } else {
                      //         clearErrors('tempCode');
                      //         return setIsExistsTempCode(false);
                      //       }
                      //     });
                      // }}
                    />
                  )}
                  name='tempName'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Toggle
                      label='Show tool bar'
                      hasError={!!errors.isToolBar}
                      value={reportSettingStore.templateSettings?.isToolbar}
                      onChange={isToolbar => {
                        onChange(isToolbar);
                        reportSettingStore.updateTemplateSettings({
                          ...reportSettingStore.templateSettings,
                          isToolbar,
                        });
                      }}
                    />
                  )}
                  name='isToolBar'
                  rules={{required: false}}
                  defaultValue=''
                />
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Page Size'
                      hasError={!!errors.pageSize}
                    >
                      <select
                        value={reportSettingStore.templateSettings?.pageSize}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.pageSize
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const pageSize = e.target.value;
                          onChange(pageSize);
                          reportSettingStore.updateTemplateSettings({
                            ...reportSettingStore.templateSettings,
                            pageSize,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {[
                          '4A0',
                          '2A0',
                          'A0',
                          'A1',
                          'A2',
                          'A3',
                          'A4',
                          'A5',
                          'A6',
                          'A7',
                          'A8',
                          'A9',
                          'A10',
                          'B0',
                          'B1',
                          'B2',
                          'B3',
                          'B4',
                          'B5',
                          'B6',
                          'B7',
                          'B8',
                          'B9',
                          'B10',
                          'C0',
                          'C1',
                          'C2',
                          'C3',
                          'C4',
                          'C5',
                          'C6',
                          'C7',
                          'C8',
                          'C9',
                          'C10',
                          'RA0',
                          'RA1',
                          'RA2',
                          'RA3',
                          'RA4',
                          'SRA0',
                          'SRA1',
                          'SRA2',
                          'SRA3',
                          'SRA4',
                          'EXECUTIVE',
                          'FOLIO',
                          'LEGAL',
                          'LETTER',
                          'TABLOID',
                          'ID1',
                        ].map((item: any, index: number) => (
                          <option key={index} value={item}>
                            {item}
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
                    <Form.MultilineInput
                      label='Main Box CSS'
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
                      placeholder={
                        "Like fontSize: 12,backgroundColor:'#000000'"
                      }
                      value={reportSettingStore.templateSettings?.mainBoxCSS}
                      onChange={mainBoxCSS => {
                        reportSettingStore.updateTemplateSettings({
                          ...reportSettingStore.templateSettings,
                          mainBoxCSS,
                        });
                      }}
                    />
                  )}
                  name='mainBoxCSS'
                  rules={{required: false}}
                  defaultValue=''
                />
                <a
                  href='https://dev.azure.com/limsplus0644/_git/limsplus-portal?path=/react-styling-cheat-sheet.md&_a=preview'
                  target='_blank'
                  className='text-red underline'
                  rel='noreferrer'
                >
                  Note: Check more properties
                </a>
              </List>
            </Grid>
          </List>
          <List direction='col' space={4} justify='stretch' fill>
            {reportSettingStore.templateSettings?.isToolbar ? (
              <PDFViewer
                style={{width: '100%', height: 300}}
                showToolbar={reportSettingStore.templateSettings?.isToolbar}
              >
                <PdfTemplateSetting
                  mainBoxCSS={reportSettingStore.templateSettings?.mainBoxCSS}
                  pageSize={reportSettingStore.templateSettings?.pageSize}
                />
              </PDFViewer>
            ) : (
              <div>
                <PDFViewer
                  style={{width: '100%', height: 300}}
                  showToolbar={reportSettingStore.templateSettings?.isToolbar}
                >
                  <PdfTemplateSetting
                    mainBoxCSS={reportSettingStore.templateSettings?.mainBoxCSS}
                    pageSize={reportSettingStore.templateSettings?.pageSize}
                  />
                </PDFViewer>
              </div>
            )}
          </List>
        </Grid>
        <br />
        <List direction='row' space={3} align='center'>
          <Buttons.Button
            size='medium'
            type='solid'
            icon={Svg.Save}
            onClick={handleSubmit(onSave)}
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
});
