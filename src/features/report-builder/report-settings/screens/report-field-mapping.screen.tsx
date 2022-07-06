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
  AutocompleteGroupBy,
} from '@/library/components';
import {GeneralSettingsList} from '../components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';

import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';

// model
import {Banner} from '@features/master/banner/models';
import {Labs} from '@features/master/labs/models';

import {dashboardRouter as dashboardRoutes} from '@/routes';
let router = dashboardRoutes;

export const ReportFieldMapping = observer(() => {
  const {loading, routerStore, reportSettingStore} = useStores();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
    clearErrors,
  } = useForm();
  const [fieldsName, setFieldsName] = useState<Array<any>>([]);

  useEffect(() => {
    router = router.filter((item: any) => {
      if (item.name !== 'Dashboard') {
        item.toggle = false;
        item.title = item.name;
        item = item.children.filter(childernItem => {
          childernItem.title = childernItem.name;
          childernItem.toggle = false;
          return childernItem;
        });
        return item;
      }
    });
  }, []);

  setValue('environment', reportSettingStore.generalSetting?.environment);

  const [modalConfirm, setModalConfirm] = useState<any>();
  const [isInputView, setIsInputView] = useState<boolean>(true);
  const [isExistsTempCode, setIsExistsTempCode] = useState<boolean>(false);

  const getFieldName = (tableName: string) => {
    switch (tableName) {
      case 'Banner':
        setFieldsName(Object.keys(new Banner({})));
        clearErrors('fieldName');
        break;
      case 'Lab':
        setFieldsName(Object.keys(new Labs({})));
        clearErrors('fieldName');
        break;

      default:
        setFieldsName([]);
        Toast.error({
          message: '😔 Not found model.',
        });
        setError('fieldName', {type: 'onBlur'});
        break;
    }
  };

  const onSubmitBanner = () => {
    console.log({isExistsTempCode});
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
          'p-2 rounded-lg shadow-xl ' + (isInputView ? 'shown' : 'shown')
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
                      hasError={errors.tempCode}
                      value={reportSettingStore.reportFieldMapping?.tempCode}
                      onChange={tempCode => {
                        onChange(tempCode);
                        reportSettingStore.updateReportFieldMapping({
                          ...reportSettingStore.reportFieldMapping,
                          tempCode,
                        });
                      }}
                      onBlur={tempCode => {
                        reportSettingStore.reportFieldMappingService
                          .findByFields({
                            input: {
                              filter: {
                                tempCode,
                              },
                            },
                          })
                          .then(res => {
                            if (res.findByFieldsReportFieldMapping.success) {
                              setError('tempCode', {type: 'onBlur'});
                              Toast.warning({
                                message:
                                  '😔 Already exists temp code. Please enter diff.',
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
                  name='tempCode'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      placeholder='Section'
                      data={{
                        list: reportSettingStore.sectionSettingList,
                        displayKey: ['tempCode', 'sectionSetting'],
                      }}
                      hasError={errors.section}
                      onFilter={(value: string) => {
                        reportSettingStore.sectionSettingService.filterByFields(
                          {
                            input: {
                              filter: {
                                fields: ['tempCode', 'sectionSetting'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          },
                        );
                      }}
                      onSelect={item => {
                        onChange(item._id);
                        reportSettingStore.updateReportFieldMapping({
                          ...reportSettingStore.reportFieldMapping,
                          section: {
                            id: item._id,
                            tempCode: item.tempCode,
                            sectionSetting: item.sectionSetting,
                          },
                        });
                        reportSettingStore.updateSectionSettingList(
                          reportSettingStore.sectionSettingListCopy,
                        );
                      }}
                    />
                  )}
                  name='section'
                  rules={{required: true}}
                  defaultValue={reportSettingStore.sectionSettingList}
                />

                <Form.MultilineInput
                  label='Section Style'
                  style={{color: '#ffffff', backgroundColor: '#000000'}}
                  placeholder='Style'
                  value={reportSettingStore.reportFieldMapping?.sectionStyle}
                  onChange={sectionStyle => {
                    reportSettingStore.updateReportFieldMapping({
                      ...reportSettingStore.reportFieldMapping,
                      sectionStyle,
                    });
                  }}
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      hasError={errors.tableName}
                      label='Table Name'
                    >
                      <AutocompleteGroupBy
                        hasError={errors.tableName}
                        data={router}
                        onChange={async (item: any, children: any) => {
                          const documentName = {
                            name: item.name,
                            title: item.title,
                            path: item.path,
                            children,
                          };
                          getFieldName(documentName.children?.name);
                          onChange(documentName);
                          // lookupStore.updateLookup({
                          //   ...lookupStore.lookup,
                          //   documentName,
                          // });
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='tableName'
                  rules={{required: true}}
                  defaultValue={router}
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Field Name'
                      hasError={errors.fieldName}
                    >
                      <select
                        value={reportSettingStore.reportFieldMapping?.fieldName}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.fieldName
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const fieldName = e.target.value;
                          onChange(fieldName);
                          reportSettingStore.updateReportFieldMapping({
                            ...reportSettingStore.reportFieldMapping,
                            fieldName,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {fieldsName?.map((item: any, index: number) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='fieldName'
                  rules={{required: true}}
                  defaultValue=''
                />
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Version'
                      placeholder='Version'
                      hasError={errors.version}
                      value={reportSettingStore.generalSetting?.version}
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
                        value={reportSettingStore.generalSetting?.environment}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const environment = e.target.value;
                          onChange(environment);
                          reportSettingStore.updateGeneralSetting({
                            ...reportSettingStore.generalSetting,
                            environment,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'GENERAL SETTING-ENVIRONMENT',
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
          }
        }}
        onClose={() => setModalConfirm({show: false})}
      />
    </>
  );
});
