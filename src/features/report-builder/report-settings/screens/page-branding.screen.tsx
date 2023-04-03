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
  ModalView,
  ModalViewProps,
} from '@/library/components';
import {PDFViewer, Document} from '@react-pdf/renderer';
import {
  PageBrandingList,
  PageBrandingHeader,
  PageBrandingSubHeader,
  PageBrandingFooter,
  PageNumber,
  AutoCompleteLayoutCode,
} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';
import {PageBranding as PageBrandingModel} from '../models';

import {Accordion, AccordionItem} from 'react-sanfona';
import '@/library/assets/css/accordion.css';

import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';

import {PdfPBTemp0001} from '@features/report-builder/report-template/components/molecules/pdf/page-branding/temp0001/temp0001.component';
import {resetReportBody} from '../startup';
import {PageBranding as Model} from '../models/page-branding.model';
const width = '100%';
const height = window.innerHeight / 1.3;

export const PageBranding = observer(() => {
  const {loading, routerStore, reportSettingStore} = useStores();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm();

  const [modalConfirm, setModalConfirm] = useState<any>();
  const [modalView, setModalView] = useState<ModalViewProps>();
  const [isInputView, setIsInputView] = useState<boolean>(false);
  const [isExistsTempCode, setIsExistsTempCode] = useState<boolean>(false);

  const onSave = () => {
    if (isExistsTempCode)
      return Toast.error({
        message: '😔 Already exists branding code. Please select diff.',
      });
    reportSettingStore.pageBrandingService
      .addPageBranding({
        input: {
          ...reportSettingStore.pageBranding,
          header: {
            ...reportSettingStore.pageBranding?.header,
            backgroundImageBase64: undefined,
          },
          footer: {
            ...reportSettingStore.pageBranding?.footer,
            backgroundImageBase64: undefined,
          },
        },
      })
      .then(res => {
        if (res.createPageBranding.success) {
          Toast.success({
            message: `😊 ${res.createPageBranding.message}`,
          });
          setIsInputView(false);
          reset();
          resetReportBody();
          reportSettingStore.updatePageBranding({
            ...reportSettingStore.pageBranding,
            layoutCode: '',
          });
        }
      });
  };

  const getTemplate = (tempCode: string, data: any) => {
    if (tempCode)
      return (
        <PDFViewer
          style={{width, height}}
          showToolbar={reportSettingStore.pageLayout?.isToolbar}
        >
          <Document title='Page Branding'>
            <PdfPBTemp0001
              data={data}
              templateSettings={data?.templateSettings}
            />
          </Document>
        </PDFViewer>
      );
    else {
      return (
        <div className='justify-center items-center'>
          <h4 className='text-center text-red'>
            Template not found. Please select correct temp code. 🚨
          </h4>
        </div>
      );
    }
  };

  const getAccordionItem = (pageBranding: PageBrandingModel) => {
    const accordionItem: Array<any> = [];
    if (pageBranding.isHeader) accordionItem.push({title: 'Header'});
    if (pageBranding.isSubHeader) accordionItem.push({title: 'Sub Header'});
    if (pageBranding.isFooter) accordionItem.push({title: 'Footer'});
    if (pageBranding.isPdfPageNumber)
      accordionItem.push({title: 'Page Number'});
    return accordionItem;
  };

  return (
    <>
      {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
        <Buttons.ButtonCircleAddRemoveBottom
          style={{bottom: 50}}
          show={isInputView}
          onClick={() => setIsInputView(!isInputView)}
        />
      )}
      <div className='mx-auto flex-wrap'>
        <div className={'rounded-lg shadow-xl p-2 '}>
          <Grid cols={2}>
            <List direction='col' space={4} justify='stretch' fill>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <AutoCompleteLayoutCode
                    displayValue={value || ''}
                    hasError={!!errors.layoutCode}
                    onSelect={item => {
                      onChange(item.tempCode);
                      reportSettingStore.updatePageBranding({
                        ...reportSettingStore.pageBranding,
                        layoutCode: item.tempCode,
                      });
                    }}
                  />
                )}
                name='layoutCode'
                rules={{required: true}}
                defaultValue={reportSettingStore.pageLayoutList}
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Form.Input
                    label='Branding Code'
                    placeholder='Branding Code'
                    hasError={!!errors.brandingCode}
                    value={value?.toUpperCase()}
                    onChange={tempCode => {
                      onChange(tempCode);
                      reportSettingStore.updatePageBranding({
                        ...reportSettingStore.pageBranding,
                        tempCode: tempCode?.toUpperCase(),
                      });
                    }}
                    onBlur={tempCode => {
                      reportSettingStore.pageBrandingService
                        .findByFields({
                          input: {
                            filter: {
                              tempCode,
                            },
                          },
                        })
                        .then(res => {
                          if (res.findByFieldsPageBranding.success) {
                            setError('tempCode', {type: 'onBlur'});
                            Toast.error({
                              message:
                                '😔 Already exists temp code. Please select diff.',
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
                name='brandingCode'
                rules={{required: true}}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Form.Input
                    label='Branding Title'
                    placeholder='Branding Title'
                    hasError={!!errors.brandingTitle}
                    value={value?.toUpperCase()}
                    onChange={brandingTitle => {
                      onChange(brandingTitle);
                      reportSettingStore.updatePageBranding({
                        ...reportSettingStore.pageBranding,
                        brandingTitle: brandingTitle?.toUpperCase(),
                      });
                    }}
                    // onBlur={brandingTitle => {
                    //   reportSettingStore.pageBrandingService
                    //     .findByFields({
                    //       input: {
                    //         filter: {
                    //           tempCode:
                    //             reportSettingStore.pageBranding?.tempCode || '',
                    //           brandingTitle: brandingTitle?.toUpperCase(),
                    //         },
                    //       },
                    //     })
                    //     .then(res => {
                    //       if (res.findByFieldsPageBranding.success) {
                    //         setError('tempCode', {type: 'onBlur'});
                    //         setError('brandingTitle', {type: 'onBlur'});
                    //         Toast.error({
                    //           message:
                    //             '😔 Already exists temp code. Please select diff.',
                    //         });
                    //         return setIsExistsTempCode(true);
                    //       } else {
                    //         clearErrors('tempCode');
                    //         clearErrors('brandingTitle');
                    //         return setIsExistsTempCode(false);
                    //       }
                    //     });
                    // }}
                  />
                )}
                name='brandingTitle'
                rules={{required: true}}
                defaultValue=''
              />

              <Grid cols={4}>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Toggle
                      label='Header Visible'
                      hasError={!!errors.headerVisible}
                      value={value}
                      onChange={isHeader => {
                        onChange(isHeader);
                        reportSettingStore.updatePageBranding({
                          ...reportSettingStore.pageBranding,
                          isHeader,
                        });
                      }}
                    />
                  )}
                  name='headerVisible'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Toggle
                      label='Sub Header Visible'
                      hasError={!!errors.subHeaderVisible}
                      value={value}
                      onChange={isSubHeader => {
                        onChange(isSubHeader);
                        reportSettingStore.updatePageBranding({
                          ...reportSettingStore.pageBranding,
                          isSubHeader,
                        });
                      }}
                    />
                  )}
                  name='subHeaderVisible'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Toggle
                      label='Footer Visible'
                      hasError={!!errors.footerVisible}
                      value={value}
                      onChange={isFooter => {
                        onChange(isFooter);
                        reportSettingStore.updatePageBranding({
                          ...reportSettingStore.pageBranding,
                          isFooter,
                        });
                      }}
                    />
                  )}
                  name='footerVisible'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Toggle
                      label='Page Number'
                      hasError={!!errors.pageNumber}
                      value={value}
                      onChange={isPdfPageNumber => {
                        onChange(isPdfPageNumber);
                        reportSettingStore.updatePageBranding({
                          ...reportSettingStore.pageBranding,
                          isPdfPageNumber,
                        });
                      }}
                    />
                  )}
                  name='pageNumber'
                  rules={{required: false}}
                  defaultValue=''
                />
              </Grid>
              <Accordion>
                {getAccordionItem(reportSettingStore?.pageBranding).map(
                  item => {
                    return (
                      <AccordionItem
                        title={`${item.title}`}
                        expanded={item.title === 'Page Number'}
                      >
                        {item.title === 'Header' && <PageBrandingHeader />}
                        {item.title === 'Sub Header' && (
                          <PageBrandingSubHeader />
                        )}
                        {item.title === 'Footer' && <PageBrandingFooter />}
                        {item.title === 'Page Number' && <PageNumber />}
                      </AccordionItem>
                    );
                  },
                )}
              </Accordion>
            </List>
            <List direction='col' space={4} justify='stretch' fill>
              {getTemplate(
                reportSettingStore.pageBranding?.layoutCode,
                reportSettingStore.pageBranding,
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
        <div
          className='rounded-lg shadow-xl overflow-auto p-2'
          style={{overflowX: 'scroll'}}
        >
          <PageBrandingList
            data={reportSettingStore.pageBrandingList}
            totalSize={reportSettingStore.pageBrandingListCount}
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
            onUpdateItem={(fields: any, id: string) => {
              setModalConfirm({
                show: true,
                type: 'update',
                data: {fields, id},
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
            onPdfPreview={item => {
              reportSettingStore.pageLayoutService
                .findByFields({
                  input: {
                    filter: {
                      tempCode: item?.tempCode,
                    },
                  },
                })
                .then(res => {
                  if (res.findByFieldsTemplateSetting.success) {
                    setModalView({
                      visible: true,
                      children: (
                        <>
                          {getTemplate(item.tempCode, {
                            ...item,
                            templateSettings:
                              res.findByFieldsTemplateSetting.data[0],
                          })}
                        </>
                      ),
                    });
                  }
                });
            }}
          />
        </div>
      </div>
      <ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          switch (type) {
            case 'delete': {
              reportSettingStore.pageBrandingService
                .removePageBranding({
                  input: {id: modalConfirm.id},
                })
                .then((res: any) => {
                  if (res.removePageBranding.success) {
                    Toast.success({
                      message: `😊 ${res.removePageBranding.message}`,
                    });
                    setModalConfirm({show: false});
                    reportSettingStore.pageBrandingService.listPageBranding();
                  }
                });
              break;
            }
            case 'update': {
              reportSettingStore.pageBrandingService
                .update({
                  input: {
                    ...modalConfirm.data.fields,
                    _id: modalConfirm.data.id,
                  },
                })
                .then((res: any) => {
                  setModalConfirm({show: false});
                  if (res.updatePageBranding.success) {
                    Toast.success({
                      message: `😊 ${res.updatePageBranding.message}`,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  }
                });
              break;
            }
          }
        }}
        onClose={() => setModalConfirm({show: false})}
      />
      <ModalView
        {...modalView}
        onClose={() => setModalView({visible: false})}
      />
    </>
  );
});
