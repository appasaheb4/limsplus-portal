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
import {
  PageSettingsList,
  PageBrandingHeader,
  PageBrandingSubHeader,
  PageBrandingFooter,
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
  const [isInputView, setIsInputView] = useState<boolean>(false);
  const [isExistsTempCode, setIsExistsTempCode] = useState<boolean>(false);

  const onSave = () => {
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

  const getTemplate = (tempCode: string) => {
    switch (tempCode) {
      case 'TEMP0001':
        return <PdfTemp0001 data={reportSettingStore.pageBranding} />;
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
    return accordionItem;
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
                      tempCode: item.tempCode,
                      templateSettings: item,
                    });
                  }}
                />
              )}
              name='tempCode'
              rules={{required: true}}
              defaultValue={reportSettingStore.templateSettingsList}
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
                    expanded={item.title === 'Header'}
                  >
                    {item.title === 'Header' && <PageBrandingHeader />}
                    {item.title === 'Sub Header' && <PageBrandingSubHeader />}
                    {item.title === 'Footer' && <PageBrandingFooter />}
                  </AccordionItem>
                );
              })}
            </Accordion>
          </List>
          <List direction='col' space={4} justify='stretch' fill>
            {getTemplate(reportSettingStore.pageBranding?.tempCode)}
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
        <PageSettingsList
          data={[]}
          totalSize={0}
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
          }
        }}
        onClose={() => setModalConfirm({show: false})}
      />
    </>
  );
});
