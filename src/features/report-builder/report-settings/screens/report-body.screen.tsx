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
  ModalView,
  ModalViewProps,
} from '@/library/components';
import {Collapsible} from '@/core-components';
import {PDFViewer, Document} from '@react-pdf/renderer';
import {ReportBodyList, General, Panel, Test, Analyte} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';
import {PageBranding as PageBrandingModel} from '../models';

import {PdfPBTemp0001} from '@features/report-builder/report-template/components/molecules/pdf/page-branding/temp0001/temp0001.component';

const width = '100%';
const height = window.innerHeight / 1.3;

export const ReportBody = observer(() => {
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
        message: '😔 Already exists report code. Please select diff.',
      });
    reportSettingStore.reportBodyService
      .addReportBody({
        input: {
          ...reportSettingStore.reportBody,
        },
      })
      .then(res => {
        if (res.createReportBody.success) {
          Toast.success({
            message: `😊 ${res.createReportBody.message}`,
          });
        }
        setIsInputView(false);
        reportSettingStore.resetReportBody();
        reset();
      });
  };

  console.log({values: reportSettingStore.reportBody});

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

  return (
    <>
      {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
        <Buttons.ButtonCircleAddRemoveBottom
          style={{bottom: 50}}
          show={!isInputView}
          onClick={() => setIsInputView(!isInputView)}
        />
      )}
      <div
        className={
          'rounded-lg shadow-xl p-2 ' + (!isInputView ? 'hidden' : 'shown')
        }
      >
        <Grid cols={2}>
          <List direction='col' space={4} justify='stretch' fill>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                  loader={loading}
                  placeholder='Report Code'
                  data={{
                    list: reportSettingStore.pageBrandingList,
                    displayKey: ['tempCode', 'brandingTitle'],
                  }}
                  displayValue={value}
                  hasError={!!errors.reportCode}
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
                    reportSettingStore.updateReportBody({
                      ...reportSettingStore.reportBody,
                      reportCode: item.tempCode,
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
              name='reportCode'
              rules={{required: true}}
              defaultValue={reportSettingStore.pageBrandingList}
            />
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Form.Input
                  label='Report Name'
                  placeholder='Report Name'
                  hasError={!!errors.reportName}
                  value={value?.toUpperCase()}
                  onChange={reportName => {
                    onChange(reportName);
                    reportSettingStore.updateReportBody({
                      ...reportSettingStore.reportBody,
                      reportName: reportName?.toUpperCase(),
                    });
                  }}
                />
              )}
              name='reportName'
              rules={{required: true}}
              defaultValue=''
            />

            <div>
              <Collapsible label='General' children={<General />} />
              <Collapsible label='Panel' children={<Panel />} />
            </div>
          </List>
          <List direction='col' space={4} justify='stretch' fill>
            <div>
              <Collapsible label='Test' children={<Test />} />
              <Collapsible label='Analyte' children={<Analyte />} />
            </div>
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
      <div className='rounded-lg shadow-xl overflow-auto p-2'>
        <ReportBodyList
          data={reportSettingStore.reportBodyList}
          totalSize={reportSettingStore.reportBodyListCount}
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
      <ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          switch (type) {
            case 'delete': {
              reportSettingStore.reportBodyService
                .removeReportBody({
                  input: {id: modalConfirm.id},
                })
                .then((res: any) => {
                  if (res.removeReportBody.success) {
                    Toast.success({
                      message: `😊 ${res.removeReportBody.message}`,
                    });
                    setModalConfirm({show: false});
                    reportSettingStore.reportBodyService.listReportBody();
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
