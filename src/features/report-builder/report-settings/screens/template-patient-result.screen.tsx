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
import {TemplatePatientResultList} from '../components';
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
  const [isExistsRecord, setIsExistsRecord] = useState<boolean>(false);

  const onSave = () => {
    if (isExistsRecord)
      return Toast.error({
        message: '😔 Already exists records.',
      });
    reportSettingStore.templatePatientResultService
      .addTemplatePatientResult({
        input: {...reportSettingStore.templatePatientResult},
      })
      .then(res => {
        if (res.createTemplatePatientResult.success) {
          Toast.success({
            message: `😊 ${res.createTemplatePatientResult.message}`,
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
        return <h1>hi</h1>;
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
                        reportSettingStore.templatePatientResultService
                          .findByFields({
                            input: {
                              filter: {
                                reportTemplateType,
                              },
                            },
                          })
                          .then(res => {
                            if (res.findByFieldsTemplatePatientResult.success) {
                              setError('reportTemplateType', {type: 'onBlur'});
                              Toast.error({
                                message: '😔 Already exists record.',
                              });
                              return setIsExistsRecord(true);
                            } else {
                              clearErrors('reportTemplateType');
                              return setIsExistsRecord(false);
                            }
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
                rules={{required: true}}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.InputWrapper
                    label='Page Branding'
                    hasError={!!errors.pageBranding}
                  >
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      placeholder='Page Branding'
                      data={{
                        list: reportSettingStore.pageBrandingList,
                        displayKey: ['tempCode', 'brandingTitle'],
                      }}
                      hasError={!!errors.pageBranding}
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
                          pageBranding: {
                            _id: item?._id,
                            tempCode: item?.tempCode,
                            brandingTitle: item?.brandingTitle,
                          },
                        });
                      }}
                    />
                  </Form.InputWrapper>
                )}
                name='pageBranding'
                rules={{required: false}}
                defaultValue={reportSettingStore.templateSettingsList}
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
                        const endOfPage =
                          reportSettingStore.selectedItemTemplatePatientResult
                            ?.endOfPage;
                        onChange(endOfPage);
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          endOfPage: _.map(endOfPage, o =>
                            _.pick(o, ['_id', 'code', 'details']),
                          ),
                        });
                        libraryStore.updateLibraryList(
                          libraryStore.listLibraryCopy,
                        );
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
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Form.InputWrapper
                    label='End Of Report'
                    hasError={!!errors.endOfReport}
                  >
                    <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                      loader={loading}
                      placeholder='Search by code or details'
                      data={{
                        list: libraryStore.listLibrary,
                        selected:
                          reportSettingStore.selectedItemTemplatePatientResult
                            ?.endOfReport,
                        displayKey: ['code', 'details'],
                      }}
                      hasError={!!errors.endOfReport}
                      onUpdate={item => {
                        const endOfReport =
                          reportSettingStore.selectedItemTemplatePatientResult
                            ?.endOfReport;
                        onChange(endOfReport);
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          endOfReport: _.map(endOfReport, o =>
                            _.pick(o, ['_id', 'code', 'details']),
                          ),
                        });
                        libraryStore.updateLibraryList(
                          libraryStore.listLibraryCopy,
                        );
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
                        let endOfReport =
                          reportSettingStore.selectedItemTemplatePatientResult
                            ?.endOfReport;
                        if (!item.selected) {
                          if (endOfReport && endOfReport.length > 0) {
                            endOfReport.push(item);
                          } else endOfReport = [item];
                        } else {
                          endOfReport = endOfReport.filter(items => {
                            return items._id !== item._id;
                          });
                        }
                        reportSettingStore.updateSelectedItemTemplatePatientResult(
                          {
                            ...reportSettingStore.selectedItemTemplatePatientResult,
                            endOfReport,
                          },
                        );
                      }}
                    />
                  </Form.InputWrapper>
                )}
                name='endOfReport'
                rules={{required: false}}
                defaultValue={
                  libraryStore.listLibrary ||
                  reportSettingStore.selectedItemTemplatePatientResult
                    ?.endOfReport
                }
              />
            </List>
            <List direction='col' space={4} justify='stretch' fill>
              <div className='p-3 border border-gray-800 relative mt-2'>
                <h2 className='-mt-10 translate-y-1/2 p-1 w-fit bg-white mb-4'>
                  Department Header
                </h2>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      label='Name CSS'
                      className='text-sm'
                      style={{
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        fontSize: 12,
                      }}
                      placeholder={
                        "Like fontSize: 12,backgroundColor:'#000000'"
                      }
                      value={
                        reportSettingStore.templatePatientResult
                          .departmentHeader?.nameCSS
                      }
                      onChange={nameCSS => {
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          departmentHeader: {
                            ...reportSettingStore.templatePatientResult
                              ?.departmentHeader,
                            nameCSS,
                          },
                        });
                      }}
                    />
                  )}
                  name='departmentNameCSS'
                  rules={{required: false}}
                  defaultValue=''
                />
              </div>
              <div className='p-3 border border-gray-800 relative mt-2'>
                <h2 className='-mt-10 translate-y-1/2 p-1 w-fit bg-white mb-4'>
                  Panel Header
                </h2>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      label='Description CSS'
                      className='text-sm'
                      style={{
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        fontSize: 12,
                      }}
                      placeholder={
                        "Like fontSize: 12,backgroundColor:'#000000'"
                      }
                      value={
                        reportSettingStore.templatePatientResult.panelHeader
                          ?.descriptionCSS
                      }
                      onChange={descriptionCSS => {
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          panelHeader: {
                            ...reportSettingStore.templatePatientResult
                              ?.panelHeader,
                            descriptionCSS,
                          },
                        });
                      }}
                    />
                  )}
                  name='panelDescriptionCSS'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      label='Method Description CSS'
                      className='text-sm'
                      style={{
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        fontSize: 12,
                      }}
                      placeholder={
                        "Like fontSize: 12,backgroundColor:'#000000'"
                      }
                      value={
                        reportSettingStore.templatePatientResult.panelHeader
                          ?.methodDescriptionCSS
                      }
                      onChange={methodDescriptionCSS => {
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          panelHeader: {
                            ...reportSettingStore.templatePatientResult
                              ?.panelHeader,
                            methodDescriptionCSS,
                          },
                        });
                      }}
                    />
                  )}
                  name='panelMethodDescriptionCSS'
                  rules={{required: false}}
                  defaultValue=''
                />
              </div>

              <div className='p-3 border border-gray-800 relative mt-2'>
                <h2 className='-mt-10 translate-y-1/2 p-1 w-fit bg-white mb-4'>
                  Test Header
                </h2>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      label='Description CSS'
                      className='text-sm'
                      style={{
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        fontSize: 12,
                      }}
                      placeholder={
                        "Like fontSize: 12,backgroundColor:'#000000'"
                      }
                      value={
                        reportSettingStore.templatePatientResult?.testHeader
                          ?.descriptionCSS
                      }
                      onChange={descriptionCSS => {
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          testHeader: {
                            ...reportSettingStore.templatePatientResult
                              .testHeader,
                            descriptionCSS,
                          },
                        });
                      }}
                    />
                  )}
                  name='testDescriptionCSS'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      label='Method Description CSS'
                      className='text-sm'
                      style={{
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        fontSize: 12,
                      }}
                      placeholder={
                        "Like fontSize: 12,backgroundColor:'#000000'"
                      }
                      value={
                        reportSettingStore.templatePatientResult.testHeader
                          ?.methodDescriptionCSS
                      }
                      onChange={methodDescriptionCSS => {
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          testHeader: {
                            ...reportSettingStore.templatePatientResult
                              ?.testHeader,
                            methodDescriptionCSS,
                          },
                        });
                      }}
                    />
                  )}
                  name='testMethodDescriptionCSS'
                  rules={{required: false}}
                  defaultValue=''
                />
              </div>
            </List>

            <List direction='col' space={4} justify='stretch' fill>
              <div className='p-3 border border-gray-800 relative mt-2'>
                <h2 className='-mt-10 translate-y-1/2 p-1 w-fit bg-white mb-4'>
                  Patient Result List
                </h2>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      label='Fields Text CSS'
                      className='text-sm'
                      style={{
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        fontSize: 12,
                      }}
                      placeholder={
                        "Like fontSize: 12,backgroundColor:'#000000'"
                      }
                      value={
                        reportSettingStore.templatePatientResult
                          .patientResultList?.fieldsTextCSS
                      }
                      onChange={fieldsTextCSS => {
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          patientResultList: {
                            ...reportSettingStore.templatePatientResult
                              .patientResultList,
                            fieldsTextCSS,
                          },
                        });
                      }}
                    />
                  )}
                  name='prListFieldsTextCSS'
                  rules={{required: false}}
                  defaultValue=''
                />
              </div>
              <div className='p-3 border border-gray-800 relative mt-2'>
                <h2 className='-mt-10 translate-y-1/2 p-1 w-fit bg-white mb-4'>
                  Test Footer
                </h2>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      label='Interpretation CSS'
                      className='text-sm'
                      style={{
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        fontSize: 12,
                      }}
                      placeholder={
                        "Like fontSize: 12,backgroundColor:'#000000'"
                      }
                      value={
                        reportSettingStore.templatePatientResult.testFooter
                          ?.interpretationCSS
                      }
                      onChange={interpretationCSS => {
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          testFooter: {
                            ...reportSettingStore.templatePatientResult
                              .testFooter,
                            interpretationCSS,
                          },
                        });
                      }}
                    />
                  )}
                  name='testInterpretationCSS'
                  rules={{required: false}}
                  defaultValue=''
                />
              </div>
              <div className='p-3 border border-gray-800 relative mt-2'>
                <h2 className='-mt-10 translate-y-1/2 p-1 w-fit bg-white mb-4'>
                  Panel Footer
                </h2>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      label='Interpretation CSS'
                      className='text-sm'
                      style={{
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        fontSize: 12,
                      }}
                      placeholder={
                        "Like fontSize: 12,backgroundColor:'#000000'"
                      }
                      value={
                        reportSettingStore.templatePatientResult.panelFooter
                          ?.interpretationCSS
                      }
                      onChange={interpretationCSS => {
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          panelFooter: {
                            ...reportSettingStore.templatePatientResult
                              .panelFooter,
                            interpretationCSS,
                          },
                        });
                      }}
                    />
                  )}
                  name='panelInterpretationCSS'
                  rules={{required: false}}
                  defaultValue=''
                />
              </div>
              <div className='p-3 border border-gray-800 relative mt-2'>
                <h2 className='-mt-10 translate-y-1/2 p-1 w-fit bg-white mb-4'>
                  Department Footer
                </h2>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.MultilineInput
                      label='Image CSS'
                      className='text-sm'
                      style={{
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        fontSize: 12,
                      }}
                      placeholder={'Like width:150,height: 100'}
                      value={
                        reportSettingStore.templatePatientResult
                          .departmentFooter?.imageCSS
                      }
                      onChange={imageCSS => {
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          departmentFooter: {
                            ...reportSettingStore.templatePatientResult
                              ?.departmentFooter,
                            imageCSS,
                          },
                        });
                      }}
                    />
                  )}
                  name='departmentImageCSS'
                  rules={{required: false}}
                  defaultValue=''
                />
              </div>
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
        <TemplatePatientResultList
          data={reportSettingStore.templatePatientResultList}
          totalSize={reportSettingStore.templatePatientResultListCount}
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
              reportSettingStore.templatePatientResultService
                .removeTemplatePatientResult({
                  input: {id: modalConfirm.id},
                })
                .then((res: any) => {
                  if (res.removeTemplatePatientResult.success) {
                    Toast.success({
                      message: `😊 ${res.removeTemplatePatientResult.message}`,
                    });
                    setModalConfirm({show: false});
                    reportSettingStore.templatePatientResultService.listTemplatePatientResult();
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
