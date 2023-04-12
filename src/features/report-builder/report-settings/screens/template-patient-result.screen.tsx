import React, {useState} from 'react';
import {observer} from 'mobx-react';
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
import {
  TemplatePatientResultList,
  ReportBodyComponents,
  EndOfPageComponents,
  EndOfReportComponents,
} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';

import '@/library/assets/css/accordion.css';

import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';
import {resetReportBody} from '../startup';
import {SelectedItemsTemplatePatientResult} from '../models/template-patient-result.model';

export const TemplatePatientResult = observer(() => {
  const {loading, routerStore, reportSettingStore, libraryStore} = useStores();
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
          setIsInputView(true);
          reset();
          resetReportBody();
          reportSettingStore.updateSelectedItemTemplatePatientResult(
            new SelectedItemsTemplatePatientResult({}),
          );
        }
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
          <Grid cols={2}>
            <List direction='col' space={4} justify='stretch' fill>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Form.InputWrapper
                    label='Report Template Type'
                    hasError={!!errors.reportTemplateType}
                  >
                    <select
                      value={value}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.reportTemplateType
                          ? 'border-red  '
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
                                templateCode:
                                  reportSettingStore.templatePatientResult
                                    ?.templateCode || '',
                                templateTitle:
                                  reportSettingStore.templatePatientResult
                                    ?.templateTitle || '',
                              },
                            },
                          })
                          .then(res => {
                            if (res.findByFieldsTemplatePatientResult.success) {
                              setError('reportTemplateType', {type: 'onBlur'});
                              setError('templateCode', {type: 'onBlur'});
                              setError('templateTitle', {type: 'onBlur'});
                              Toast.error({
                                message: '😔 Already exists record.',
                              });
                              return setIsExistsRecord(true);
                            } else {
                              clearErrors('reportTemplateType');
                              clearErrors('templateCode');
                              clearErrors('templateTitle');
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
                render={({field: {onChange, value}}) => (
                  <Form.InputWrapper
                    label='Report Body'
                    hasError={!!errors.reportBody}
                  >
                    <ReportBodyComponents
                      displayValue={value}
                      onSelect={item => {
                        onChange(item?.reportName);
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          reportBody: {
                            _id: item?._id,
                            reportCode: item?.reportCode,
                            reportName: item?.reportName,
                          },
                        });
                      }}
                    />
                  </Form.InputWrapper>
                )}
                name='reportBody'
                rules={{required: false}}
                defaultValue={reportSettingStore.reportBodyList}
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Form.Input
                    label='Template Code'
                    placeholder='Template Code'
                    hasError={!!errors.templateCode}
                    value={value?.toUpperCase()}
                    onChange={templateCode => {
                      onChange(templateCode);
                      reportSettingStore.updateTemplatePatientResult({
                        ...reportSettingStore.templatePatientResult,
                        templateCode: templateCode?.toUpperCase(),
                      });
                    }}
                    onBlur={templateCode => {
                      reportSettingStore.templatePatientResultService
                        .findByFields({
                          input: {
                            filter: {
                              reportTemplateType:
                                reportSettingStore.templatePatientResult
                                  ?.reportTemplateType || '',
                              templateCode,
                              templateTitle:
                                reportSettingStore.templatePatientResult
                                  ?.templateTitle || '',
                            },
                          },
                        })
                        .then(res => {
                          if (res.findByFieldsTemplatePatientResult.success) {
                            setError('reportTemplateType', {type: 'onBlur'});
                            setError('templateCode', {type: 'onBlur'});
                            setError('templateTitle', {type: 'onBlur'});
                            Toast.error({
                              message: '😔 Already exists record.',
                            });
                            return setIsExistsRecord(true);
                          } else {
                            clearErrors('reportTemplateType');
                            clearErrors('templateCode');
                            clearErrors('templateTitle');
                            return setIsExistsRecord(false);
                          }
                        });
                    }}
                  />
                )}
                name='templateCode'
                rules={{required: true}}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Form.Input
                    label='Template Title'
                    placeholder='Template Title'
                    hasError={!!errors.templateTitle}
                    value={value?.toUpperCase()}
                    onChange={templateTitle => {
                      onChange(templateTitle);
                      reportSettingStore.updateTemplatePatientResult({
                        ...reportSettingStore.templatePatientResult,
                        templateTitle: templateTitle?.toUpperCase(),
                      });
                    }}
                    onBlur={templateTitle => {
                      reportSettingStore.templatePatientResultService
                        .findByFields({
                          input: {
                            filter: {
                              reportTemplateType:
                                reportSettingStore.templatePatientResult
                                  ?.reportTemplateType || '',
                              templateCode:
                                reportSettingStore.templatePatientResult
                                  ?.templateCode || '',
                              templateTitle,
                            },
                          },
                        })
                        .then(res => {
                          if (res.findByFieldsTemplatePatientResult.success) {
                            setError('reportTemplateType', {type: 'onBlur'});
                            setError('templateCode', {type: 'onBlur'});
                            setError('templateTitle', {type: 'onBlur'});
                            Toast.error({
                              message: '😔 Already exists record.',
                            });
                            return setIsExistsRecord(true);
                          } else {
                            clearErrors('reportTemplateType');
                            clearErrors('templateCode');
                            clearErrors('templateTitle');
                            return setIsExistsRecord(false);
                          }
                        });
                    }}
                  />
                )}
                name='templateTitle'
                rules={{required: true}}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Form.Input
                    label='Report Order'
                    type='number'
                    placeholder={
                      errors.reportOrder
                        ? 'Please Enter ReportOrder'
                        : 'Report Order'
                    }
                    hasError={!!errors.reportOrder}
                    value={value}
                    onChange={reportOrder => {
                      onChange(reportOrder);
                      reportSettingStore.updateTemplatePatientResult({
                        ...reportSettingStore.templatePatientResult,
                        reportOrder: Number.parseInt(reportOrder),
                      });
                    }}
                  />
                )}
                name='reportOrder'
                rules={{required: false}}
                defaultValue=''
              />
            </List>

            <List direction='col' space={4} justify='stretch' fill>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Form.InputWrapper
                    label='End Of Page'
                    hasError={!!errors.endOfPage}
                  >
                    <EndOfPageComponents
                      onSelect={item => {
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          endOfPage: item,
                        });
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
                render={({field: {onChange, value}}) => (
                  <Form.InputWrapper
                    label='End Of Report'
                    hasError={!!errors.endOfReport}
                  >
                    <EndOfReportComponents
                      onSelect={item => {
                        reportSettingStore.updateTemplatePatientResult({
                          ...reportSettingStore.templatePatientResult,
                          endOfReport: item,
                        });
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
          </Grid>
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
              body: 'Update item!',
            });
          }}
          onPageSizeChange={(page, limit) => {
            reportSettingStore.templatePatientResultService.listTemplatePatientResult(
              page,
              limit,
            );
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
              reportSettingStore.templatePatientResultService
                .update({
                  input: {
                    ...modalConfirm.data.fields,
                    _id: modalConfirm.data.id,
                  },
                })
                .then((res: any) => {
                  setModalConfirm({show: false});
                  if (res.updateTemplatePatientResult.success) {
                    Toast.success({
                      message: `😊 ${res.updateTemplatePatientResult.message}`,
                    });
                    reportSettingStore.templatePatientResultService.listTemplatePatientResult();
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
