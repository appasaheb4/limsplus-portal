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
  PdfMedium,
  ModalView,
  ModalViewProps,
} from '@/library/components';
import {
  PageBrandingList,
  PageBrandingHeader,
  PageBrandingSubHeader,
  PageBrandingFooter,
  PageNumber,
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

export const PageBranding = observer(() => {
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
  const [modalView, setModalView] = useState<ModalViewProps>();
  const [isInputView, setIsInputView] = useState<boolean>(true);
  const [isExistsTempCode, setIsExistsTempCode] = useState<boolean>(false);

  const onSave = () => {
    if (isExistsTempCode)
      return Toast.error({
        message: '😔 Already exists temp code. Please select diff.',
      });
    reportSettingStore.pageBrandingService
      .addPageBranding({
        input: {
          ...reportSettingStore.pageBranding,
          header: {
            ...reportSettingStore.pageBranding?.header,
          },
        },
      })
      .then(res => {
        if (res.createPageBranding.success) {
          Toast.success({
            message: `😊 ${res.createPageBranding.message}`,
          });
        }
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  const getTemplate = (tempCode: string, data: any) => {
    switch (tempCode) {
      case 'TEMP0001':
        return <PdfPBTemp0001 data={data} />;
      default:
        return (
          <div className='justify-center items-center'>
            <h4 className='text-center text-red'>
              Template not found. Please select correct temp code. 🚨
            </h4>
          </div>
        );
        break;
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
      <div
        className={
          ' rounded-lg shadow-xl ' + (isInputView ? 'hidden' : 'shown')
        }
      >
        <Grid cols={2}>
          <List direction='col' space={4} justify='stretch' fill>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                  loader={loading}
                  placeholder='Temp Code'
                  data={{
                    list: reportSettingStore.templateSettingsList,
                    displayKey: ['tempCode', 'tempName'],
                  }}
                  hasError={!!errors.tempCode}
                  onFilter={(value: string) => {
                    // reportSettingStore.updateReportSectionList(
                    //   reportSettingStore.reportSectionListCopy.filter(item =>
                    //     item.section
                    //       .toString()
                    //       .toLowerCase()
                    //       .includes(value.toLowerCase()),
                    //   ),
                    // );
                  }}
                  onSelect={item => {
                    onChange(item.tempCode);
                    reportSettingStore.updatePageBranding({
                      ...reportSettingStore.pageBranding,
                      templateSettings: {
                        _id: item._id,
                        tempCode: item.tempCode,
                        tempName: item.tempName,
                      },
                      tempCode: item.tempCode,
                    });
                    reportSettingStore.pageBrandingService
                      .findByFields({
                        input: {
                          filter: {
                            tempCode: item.tempCode,
                            brandingTitle:
                              reportSettingStore.pageBranding?.brandingTitle ||
                              '',
                          },
                        },
                      })
                      .then(res => {
                        console.log({res});
                        if (res.findByFieldsPageBranding.success) {
                          setError('tempCode', {type: 'onBlur'});
                          setError('brandingTitle', {type: 'onBlur'});
                          Toast.error({
                            message:
                              '😔 Already exists temp code. Please select diff.',
                          });
                          return setIsExistsTempCode(true);
                        } else {
                          clearErrors('tempCode');
                          clearErrors('brandingTitle');
                          return setIsExistsTempCode(false);
                        }
                      });
                  }}
                />
              )}
              name='tempCode'
              rules={{required: true}}
              defaultValue={reportSettingStore.templateSettingsList}
            />
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Form.Input
                  label='Branding Title'
                  placeholder='Branding Title'
                  hasError={!!errors.brandingTitle}
                  value={reportSettingStore.pageBranding?.brandingTitle?.toUpperCase()}
                  onChange={brandingTitle => {
                    onChange(brandingTitle);
                    reportSettingStore.updatePageBranding({
                      ...reportSettingStore.pageBranding,
                      brandingTitle: brandingTitle?.toUpperCase(),
                    });
                  }}
                  onBlur={brandingTitle => {
                    reportSettingStore.pageBrandingService
                      .findByFields({
                        input: {
                          filter: {
                            tempCode:
                              reportSettingStore.pageBranding?.tempCode || '',
                            brandingTitle: brandingTitle?.toUpperCase(),
                          },
                        },
                      })
                      .then(res => {
                        if (res.findByFieldsPageBranding.success) {
                          setError('tempCode', {type: 'onBlur'});
                          setError('brandingTitle', {type: 'onBlur'});
                          Toast.error({
                            message:
                              '😔 Already exists temp code. Please select diff.',
                          });
                          return setIsExistsTempCode(true);
                        } else {
                          clearErrors('tempCode');
                          clearErrors('brandingTitle');
                          return setIsExistsTempCode(false);
                        }
                      });
                  }}
                />
              )}
              name='brandingTitle'
              rules={{required: true}}
              defaultValue=''
            />

            <Grid cols={4}>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Toggle
                    label='Header Visible'
                    hasError={!!errors.headerVisible}
                    value={reportSettingStore.pageBranding?.isHeader}
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
                render={({field: {onChange}}) => (
                  <Form.Toggle
                    label='Sub Header Visible'
                    hasError={!!errors.subHeaderVisible}
                    value={reportSettingStore.pageBranding?.isSubHeader}
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
                render={({field: {onChange}}) => (
                  <Form.Toggle
                    label='Footer Visible'
                    hasError={!!errors.footerVisible}
                    value={reportSettingStore.pageBranding?.isFooter}
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
                render={({field: {onChange}}) => (
                  <Form.Toggle
                    label='Page Number'
                    hasError={!!errors.pageNumber}
                    value={reportSettingStore.pageBranding?.isPdfPageNumber}
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
              {getAccordionItem(reportSettingStore?.pageBranding).map(item => {
                return (
                  <AccordionItem
                    title={`${item.title}`}
                    // expanded={item.title === 'Header'}
                  >
                    {item.title === 'Header' && <PageBrandingHeader />}
                    {item.title === 'Sub Header' && <PageBrandingSubHeader />}
                    {item.title === 'Footer' && <PageBrandingFooter />}
                    {item.title === 'Page Number' && <PageNumber />}
                  </AccordionItem>
                );
              })}
            </Accordion>
          </List>
          <List direction='col' space={4} justify='stretch' fill>
            {getTemplate(
              reportSettingStore.pageBranding?.tempCode,
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
      <div className=' rounded-lg shadow-xl overflow-auto'>
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
            setModalView({
              visible: true,
              children: <>{getTemplate(item.tempCode, item)}</>,
            });
          }}
        />
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
