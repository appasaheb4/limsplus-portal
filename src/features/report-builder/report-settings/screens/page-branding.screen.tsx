import React, {useEffect, useState} from 'react';
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
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';

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
                    console.log({item});

                    onChange(item.tempCode);
                    // reportSettingStore.updateGeneralSetting({
                    //   ...reportSettingStore.generalSetting,
                    //   reportSection: {
                    //     id: item._id,
                    //     section: item.section,
                    //   },
                    // });
                    // reportSettingStore.updateReportSectionList(
                    //   reportSettingStore.reportSectionListCopy,
                    // );
                  }}
                />
              )}
              name='tempCode'
              rules={{required: true}}
              defaultValue={reportSettingStore.templateSettingsList}
            />
            <Accordion>
              {[
                {title: 'Header'},
                {title: 'Sub Header'},
                {title: 'Footer'},
              ].map(item => {
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
            <PdfTemp0001 data={reportSettingStore.pageBranding} />
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
