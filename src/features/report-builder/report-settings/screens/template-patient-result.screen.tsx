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
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
  ModalView,
  ModalViewProps,
} from '@/library/components';
import {
  PageBrandingList,
  PageBrandingHeader,
  PageBrandingSubHeader,
  PageBrandingFooter,
  PageNumber,
  PdfTemp0001,
} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';
import {PageBranding as PageBrandingModel} from '../models';

import {Accordion, AccordionItem} from 'react-sanfona';
import '@/library/assets/css/accordion.css';

import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';

export const TemplatePatientResult = observer(() => {
  const {loading, routerStore, reportSettingStore, libraryStore} = useStores();
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
        return <PdfTemp0001 data={data} />;
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
          'p-2 rounded-lg shadow-xl ' + (isInputView ? 'shown' : 'hidden')
        }
      >
        <Grid cols={2}>
          <Grid cols={3}>
            <List direction='col' space={4} justify='stretch' fill>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.InputWrapper
                    label='Report Template Type'
                    hasError={!!errors.reportTemplateType}
                  >
                    <select
                      value={
                        reportSettingStore.templatePatientResult
                          ?.reportTemplateType
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.reportTemplateType
                          ? 'border-red-500  '
                          : 'border-gray-300'
                      } rounded-md`}
                      onChange={e => {
                        const reportTemplateType = e.target.value;
                        onChange(reportTemplateType);
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          reportTemplateType,
                        });
                      }}
                    >
                      <option selected>Select</option>
                      {['Lab Wise', 'Client Wise', 'Doctor Wise'].map(
                        (item: any, index: number) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ),
                      )}
                    </select>
                  </Form.InputWrapper>
                )}
                name='reportTemplateType'
                rules={{required: false}}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Template Code'
                    placeholder='Template Code'
                    hasError={!!errors.templateCode}
                    value={reportSettingStore.templatePatientResult?.templateCode?.toUpperCase()}
                    onChange={templateCode => {
                      onChange(templateCode);
                      reportSettingStore.updateTemplatePatientResult({
                        ...reportSettingStore.templatePatientResult,
                        templateCode: templateCode?.toUpperCase(),
                      });
                    }}
                    onBlur={templateCode => {
                      // reportSettingStore.pageBrandingService
                      //   .findByFields({
                      //     input: {
                      //       filter: {
                      //         tempCode:
                      //           reportSettingStore.pageBranding?.tempCode || '',
                      //         brandingTitle: brandingTitle?.toUpperCase(),
                      //       },
                      //     },
                      //   })
                      //   .then(res => {
                      //     if (res.findByFieldsPageBranding.success) {
                      //       setError('tempCode', {type: 'onBlur'});
                      //       setError('brandingTitle', {type: 'onBlur'});
                      //       Toast.error({
                      //         message:
                      //           '😔 Already exists temp code. Please select diff.',
                      //       });
                      //       return setIsExistsTempCode(true);
                      //     } else {
                      //       clearErrors('tempCode');
                      //       clearErrors('brandingTitle');
                      //       return setIsExistsTempCode(false);
                      //     }
                      //   });
                    }}
                  />
                )}
                name='templateCode'
                rules={{required: true}}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.Input
                    label='Template Title'
                    placeholder='Template Title'
                    hasError={!!errors.templateTitle}
                    value={reportSettingStore.templatePatientResult?.templateTitle?.toUpperCase()}
                    onChange={templateTitle => {
                      onChange(templateTitle);
                      reportSettingStore.updateTemplatePatientResult({
                        ...reportSettingStore.templatePatientResult,
                        templateTitle: templateTitle?.toUpperCase(),
                      });
                    }}
                    onBlur={templateTitle => {
                      // reportSettingStore.pageBrandingService
                      //   .findByFields({
                      //     input: {
                      //       filter: {
                      //         tempCode:
                      //           reportSettingStore.pageBranding?.tempCode || '',
                      //         brandingTitle: brandingTitle?.toUpperCase(),
                      //       },
                      //     },
                      //   })
                      //   .then(res => {
                      //     if (res.findByFieldsPageBranding.success) {
                      //       setError('tempCode', {type: 'onBlur'});
                      //       setError('brandingTitle', {type: 'onBlur'});
                      //       Toast.error({
                      //         message:
                      //           '😔 Already exists temp code. Please select diff.',
                      //       });
                      //       return setIsExistsTempCode(true);
                      //     } else {
                      //       clearErrors('tempCode');
                      //       clearErrors('brandingTitle');
                      //       return setIsExistsTempCode(false);
                      //     }
                      //   });
                    }}
                  />
                )}
                name='templateTitle'
                rules={{required: true}}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.InputWrapper label='Page Branding'>
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      placeholder='Page Branding'
                      data={{
                        list: reportSettingStore.pageBrandingList,
                        displayKey: ['tempCode', 'brandingTitle'],
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
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          pageBranding: item,
                        });
                        // reportSettingStore.pageBrandingService
                        //   .findByFields({
                        //     input: {
                        //       filter: {
                        //         tempCode: item.tempCode,
                        //         brandingTitle:
                        //           reportSettingStore.pageBranding?.brandingTitle ||
                        //           '',
                        //       },
                        //     },
                        //   })
                        //   .then(res => {
                        //     console.log({res});
                        //     if (res.findByFieldsPageBranding.success) {
                        //       setError('tempCode', {type: 'onBlur'});
                        //       setError('brandingTitle', {type: 'onBlur'});
                        //       Toast.error({
                        //         message:
                        //           '😔 Already exists temp code. Please select diff.',
                        //       });
                        //       return setIsExistsTempCode(true);
                        //     } else {
                        //       clearErrors('tempCode');
                        //       clearErrors('brandingTitle');
                        //       return setIsExistsTempCode(false);
                        //     }
                        //   });
                      }}
                    />
                  </Form.InputWrapper>
                )}
                name='tempCode'
                rules={{required: true}}
                defaultValue={reportSettingStore.templateSettingsList}
              />
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.InputWrapper
                    label='End Of Page'
                    hasError={!!errors.endOfPage}
                  >
                    <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                      loader={loading}
                      placeholder='Search by code or details'
                      data={{
                        list: libraryStore.listLibrary,
                        selected:
                          reportSettingStore.selectedItemTemplatePatientResult
                            ?.endOfPage,
                        displayKey: ['code', 'details'],
                      }}
                      hasError={!!errors.endOfPage}
                      onUpdate={item => {
                        // const items =
                        //   environmentStore.selectedItems?.department;
                        // onChange(items);
                        // environmentStore.updateEnvironmentSettings({
                        //   ...environmentStore.environmentSettings,
                        //   department: items,
                        // });
                        // departmentStore.updateDepartmentList(
                        //   departmentStore.listDepartmentCopy,
                        // );
                      }}
                      onFilter={(value: string) => {
                        libraryStore.libraryService.filterByFields({
                          input: {
                            filter: {
                              fields: ['code', 'details'],
                              srText: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        });
                      }}
                      onSelect={item => {
                        onChange(item);
                        let endOfPage =
                          reportSettingStore.selectedItemTemplatePatientResult
                            ?.endOfPage;
                        if (!item.selected) {
                          if (endOfPage && endOfPage.length > 0) {
                            endOfPage.push(item);
                          } else endOfPage = [item];
                        } else {
                          endOfPage = endOfPage.filter(items => {
                            return items._id !== item._id;
                          });
                        }
                        reportSettingStore.updateSelectedItemTemplatePatientResult(
                          {
                            ...reportSettingStore.selectedItemTemplatePatientResult,
                            endOfPage,
                          },
                        );
                      }}
                    />
                  </Form.InputWrapper>
                )}
                name='endOfPage'
                rules={{required: false}}
                defaultValue={
                  libraryStore.listLibrary ||
                  reportSettingStore.selectedItemTemplatePatientResult
                    ?.endOfPage
                }
              />
            </List>
          </Grid>
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
      <div className='p-2 rounded-lg shadow-xl overflow-auto'>
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
