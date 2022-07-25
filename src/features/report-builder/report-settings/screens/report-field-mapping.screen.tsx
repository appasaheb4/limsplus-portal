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
import {ReportFieldMappingList} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {useStores} from '@/stores';

import 'react-accessible-accordion/dist/fancy-example.css';
import '@/library/assets/css/accordion.css';

import {patientRegistrationOptions} from '@features/registration/screens/patient-registration/patient-registration.screen';

import {dashboardRouter as dashboardRoutes} from '@/routes';
let router = dashboardRoutes;

// master
import {Banner} from '@features/master/banner/models';
import {Labs} from '@features/master/labs/models';
import {Deginisation} from '@features/master/deginisation/models';
import {Department} from '@features/master/department/models';
import {MasterAnalyte} from '@features/master/master-analyte/models';
import {TestAnalyteMapping} from '@features/master/test-analyte-mapping/models';
import {MasterPanel} from '@features/master/master-panel/models';
import {TestPanelMapping} from '@features/master/test-panel-mapping/models';
import {MasterPackage} from '@features/master/master-package/models';
import {TestMaster} from '@features/master/test-master/models';
import {Lookup} from '@features/master/lookup/models';
import {Section} from '@features/master/section/models';
import {SampleContainer} from '@features/master/sample-container/models';
import {SampleType} from '@features/master/sample-type/models';
import {TestSampleMapping} from '@features/master/test-sample-mapping/models';
import {Methods} from '@features/master/methods/models';
import {Doctors} from '@features/master/doctors/models';
import {RegistrationLocations} from '@features/master/registration-locations/models';
import {CorporateClients} from '@features/master/corporate-clients/models';
import {DeliverySchedule} from '@features/master/delivery-schedule/models';
import {AdministrativeDivisions} from '@features/master/administrative-divisions/models';
import {SalesTeam} from '@features/master/sales-team/models';
import {PossibleResults} from '@features/master/possible-results/models';
import {Library} from '@features/master/library/models';
import {PriceList} from '@features/master/price-list/models';
import {ReferenceRanges} from '@features/master/reference-ranges/models';
// communication
import {InterfaceManager} from '@features/communication/interface-manager/models';
import {DataConversation} from '@features/communication/data-conversation/models';
import {HostCommunication} from '@features/communication/host-communication/models';
import {SegmentMapping} from '@features/communication/segment-mapping/models';
// Setting
import {Role} from '@features/settings/roles/models';
import {Users} from '@features/settings/users/models';
import {LoginActivity} from '@features/settings/login-activity/models';
import {Role as RoleMapping} from '@features/settings/mapping/role/models';
import {ShortcutMenu} from '@features/settings/shortcut-menu/models';
import {EnvironmentSettings} from '@features/settings/environment/models';
import {NoticeBoard} from '@features/settings/notice-board/models';
// Registration
import {
  PatientManger,
  PatientVisit,
  PatientOrder,
  PatientResult,
  PatientSample,
  PatientTest,
} from '@features/registration/models';

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
  const [subTitleList, setSubTitleList] = useState<Array<any>>([]);
  const [document, setDocument] = useState<object>({});

  useEffect(() => {
    router = router.filter((item: any) => {
      if (
        item.name !== 'Dashboard' &&
        item.name !== 'Patient Reports' &&
        item.name !== 'Report Builder' &&
        item.name !== 'Communication'
      ) {
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
      // master
      case 'Banner':
        setFieldsName(Object.keys(new Banner({})));
        break;
      case 'Lab':
        setFieldsName(Object.keys(new Labs({})));
        break;
      case 'Deginisation':
        setFieldsName(Object.keys(new Deginisation({})));
        break;
      case 'Department':
        setFieldsName(Object.keys(new Department({})));
        break;
      case 'Analyte Master':
        setFieldsName(Object.keys(new MasterAnalyte({})));
        break;
      case 'Test Analyte Mapping':
        setFieldsName(Object.keys(new TestAnalyteMapping({})));
        break;
      case 'Panel Master':
        setFieldsName(Object.keys(new MasterPanel({})));
        break;
      case 'Test Panel Mapping':
        setFieldsName(Object.keys(new TestPanelMapping({})));
        break;
      case 'Package Master':
        setFieldsName(Object.keys(new MasterPackage({})));
        break;
      case 'Test Master':
        setFieldsName(Object.keys(new TestMaster({})));
        break;
      case 'Lookup':
        setFieldsName(Object.keys(new Lookup({})));
        break;
      case 'Section':
        setFieldsName(Object.keys(new Section({})));
        break;
      case 'Sample Container':
        setFieldsName(Object.keys(new SampleContainer({})));
        break;
      case 'Sample Type':
        setFieldsName(Object.keys(new SampleType({})));
        break;
      case 'Test Sample Mapping':
        setFieldsName(Object.keys(new TestSampleMapping({})));
        break;
      case 'Methods':
        setFieldsName(Object.keys(new Methods({})));
        break;
      case 'Doctors':
        setFieldsName(Object.keys(new Doctors({})));
        break;
      case 'Registartion Locations':
        setFieldsName(Object.keys(new RegistrationLocations({})));
        break;
      case 'Corporate Clients':
        setFieldsName(Object.keys(new CorporateClients({})));
        break;
      case 'Delivery Schedule':
        setFieldsName(Object.keys(new DeliverySchedule({})));
        break;
      case 'Administrative Divisions':
        setFieldsName(Object.keys(new AdministrativeDivisions({})));
        break;
      case 'Sales Team':
        setFieldsName(Object.keys(new SalesTeam({})));
        break;
      case 'Possible Results':
        setFieldsName(Object.keys(new PossibleResults({})));
        break;
      case 'Library':
        setFieldsName(Object.keys(new Library({})));
        break;
      case 'PriceList':
        setFieldsName(Object.keys(new PriceList({})));
        break;
      case 'ReferenceRanges':
        setFieldsName(Object.keys(new ReferenceRanges({})));
        break;
      // communication
      case 'Interface Manager':
        setFieldsName(Object.keys(new InterfaceManager({})));
        break;
      case 'Conversation Mapping':
        setFieldsName(Object.keys(new DataConversation({})));
        break;
      case 'Host Communication':
        setFieldsName(Object.keys(new HostCommunication({})));
        break;
      case 'Data Segment Mapping':
        setFieldsName(Object.keys(new SegmentMapping({})));
        break;
      //Setting
      case 'Role':
        setFieldsName(Object.keys(new Role({})));
        break;
      case 'User':
        setFieldsName(Object.keys(new Users({})));
        break;
      case 'Login Activity':
        setFieldsName(Object.keys(new LoginActivity({})));
        break;
      case 'Role Mapping':
        setFieldsName(Object.keys(new RoleMapping({})));
        break;
      case 'Shortcut Menu':
        setFieldsName(Object.keys(new ShortcutMenu({})));
        break;
      case 'Environment':
        setFieldsName(Object.keys(new EnvironmentSettings({})));
        break;
      case 'Notice Boards':
        setFieldsName(Object.keys(new NoticeBoard({})));
        break;
      // Registration
      case 'PATIENT MANAGER':
        setFieldsName(Object.keys(new PatientManger({})));
        break;
      case 'PATIENT VISIT':
        setFieldsName(Object.keys(new PatientVisit({})));
        break;
      case 'PATIENT ORDER':
        setFieldsName(Object.keys(new PatientOrder({})));
        break;
      case 'PATIENT TEST':
        setFieldsName(Object.keys(new PatientTest({})));
        break;
      case 'PATIENT RESULT':
        setFieldsName(Object.keys(new PatientResult({})));
        break;
      case 'PATIENT SAMPLE':
        setFieldsName(Object.keys(new PatientSample({})));
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
    if (isExistsTempCode)
      return Toast.warning({
        message: '😔 Already exists temp code. Please enter diff.',
      });
    reportSettingStore.reportFieldMappingService
      .addReportFieldMapping({
        input: {...reportSettingStore.reportFieldMapping},
      })
      .then(res => {
        if (res.createReportFieldMapping.success) {
          Toast.success({
            message: `😊 ${res.createReportFieldMapping.message}`,
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
                      hasError={!!errors.tempCode}
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
                      hasError={!!errors.section}
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
                      hasError={!!errors.tableName}
                      label='Table Name'
                    >
                      <AutocompleteGroupBy
                        hasError={!!errors.tableName}
                        data={router}
                        onChange={async (item: any, children: any) => {
                          const documentName = {
                            name: item.name,
                            title: item.title,
                            path: item.path,
                            children,
                          };
                          if (
                            documentName.children?.name ===
                            'Patient Registration'
                          ) {
                            setSubTitleList(patientRegistrationOptions);
                          } else {
                            getFieldName(documentName.children?.name);
                            onChange(documentName);
                            reportSettingStore.updateReportFieldMapping({
                              ...reportSettingStore.reportFieldMapping,
                              tableName: Object.assign(documentName, {
                                subTableName: documentName.children?.name,
                              }),
                            });
                            setSubTitleList([]);
                          }
                          setDocument(documentName);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='tableName'
                  rules={{required: true}}
                  defaultValue=''
                />
                {subTitleList.length > 0 && (
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        hasError={!!errors.subTableName}
                        label='Sub Table Name'
                      >
                        <select
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.subTableName
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const subTableName = e.target.value;
                            onChange(subTableName);
                            getFieldName(subTableName);
                            reportSettingStore.updateReportFieldMapping({
                              ...reportSettingStore.reportFieldMapping,
                              tableName: Object.assign(document, {
                                subTableName,
                              }),
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {subTitleList?.map((item: any, index: number) => (
                            <option key={index} value={item.title}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='subTableName'
                    rules={{required: false}}
                    defaultValue={router}
                  />
                )}
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='Field Name'
                      hasError={!!errors.fieldName}
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
                      label='Start From Line'
                      placeholder='Start From Line'
                      hasError={!!errors.startFromLine}
                      value={
                        reportSettingStore.reportFieldMapping?.startFromLine
                      }
                      onChange={startFromLine => {
                        onChange(startFromLine);
                        reportSettingStore.updateReportFieldMapping({
                          ...reportSettingStore.reportFieldMapping,
                          startFromLine: Number.parseFloat(startFromLine),
                        });
                      }}
                    />
                  )}
                  name='startFromLine'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Start From Column'
                      placeholder='Start From Column'
                      hasError={!!errors.startFromColumn}
                      value={
                        reportSettingStore.reportFieldMapping?.startFromColumn
                      }
                      onChange={startFromColumn => {
                        onChange(startFromColumn);
                        reportSettingStore.updateReportFieldMapping({
                          ...reportSettingStore.reportFieldMapping,
                          startFromColumn: Number.parseFloat(startFromColumn),
                        });
                      }}
                    />
                  )}
                  name='startFromColumn'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Field Length'
                      placeholder='Field Length'
                      hasError={!!errors.fieldLength}
                      value={reportSettingStore.reportFieldMapping?.fieldLength}
                      onChange={fieldLength => {
                        onChange(fieldLength);
                        reportSettingStore.updateReportFieldMapping({
                          ...reportSettingStore.reportFieldMapping,
                          fieldLength: Number.parseFloat(fieldLength),
                        });
                      }}
                    />
                  )}
                  name='startFromColumn'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      placeholder='Font Id'
                      data={{
                        list: reportSettingStore.fontSettingList,
                        displayKey: ['fontId', 'fontName'],
                      }}
                      hasError={!!errors.fontId}
                      onFilter={(value: string) => {
                        reportSettingStore.fontSettingService.filterByFields({
                          input: {
                            filter: {
                              fields: ['fontId', 'fontName'],
                              srText: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        });
                      }}
                      onSelect={item => {
                        onChange(item._id);
                        reportSettingStore.updateReportFieldMapping({
                          ...reportSettingStore.reportFieldMapping,
                          fontId: {
                            id: item._id,
                            fontId: item.fontId,
                            fontName: item.fontName,
                          },
                        });
                        reportSettingStore.updateFontSettingList(
                          reportSettingStore.fontSettingListCopy,
                        );
                      }}
                    />
                  )}
                  name='fontId'
                  rules={{required: true}}
                  defaultValue={reportSettingStore.fontSettingList}
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
        <ReportFieldMappingList
          data={reportSettingStore.reportFieldMappingList || []}
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
              reportSettingStore.reportFieldMappingService
                .deleteReportFieldMapping({
                  input: {id: modalConfirm.id},
                })
                .then((res: any) => {
                  if (res.removeReportFieldMapping.success) {
                    Toast.success({
                      message: `😊 ${res.removeReportFieldMapping.message}`,
                    });
                    setModalConfirm({show: false});
                    reportSettingStore.reportFieldMappingService.listReportFieldMapping();
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
