import React, {useState, useMemo, useEffect} from 'react';
import {observer} from 'mobx-react';
import dayjs from 'dayjs';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  AutoCompleteFilterSingleSelect,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  PanelMasterList,
  AutoCompleteFilterSingleSelectReportTemplate,
} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {AutoCompleteFilterSingleSelectDepartment} from '../components';
import {MasterPanelHoc} from '../hoc';
import {useStores} from '@/stores';
import {FormHelper} from '@/helper';
import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetMasterPanel} from '../startup';
import * as XLSX from 'xlsx';
import _ from 'lodash';

const MasterPanel = MasterPanelHoc(
  observer(() => {
    const {
      loginStore,
      departmentStore,
      labStore,
      masterPanelStore,
      methodsStore,
      deliveryScheduleStore,
      routerStore,
      loading,
      libraryStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isInputView, setIsInputView] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);

    useEffect(() => {
      // Default value initialization
      setValue('status', masterPanelStore.masterPanel?.status);
      setValue('rLab', loginStore.login?.lab);
      setValue('pLab', loginStore.login?.lab);
      setValue('environment', masterPanelStore.masterPanel?.environment);
      setValue('serviceType', masterPanelStore.masterPanel?.serviceType);
      setValue(
        'validationLevel',
        masterPanelStore.masterPanel?.validationLevel,
      );
      setValue('processing', masterPanelStore.masterPanel?.processing);
      setValue('category', masterPanelStore.masterPanel?.category);
      setValue('panelType', masterPanelStore.masterPanel?.panelType);
      setValue('sexAction', masterPanelStore.masterPanel?.sexAction);
      setValue('ageAction', masterPanelStore.masterPanel?.ageAction);
      setValue('sex', masterPanelStore.masterPanel?.sex);
      setValue('bill', masterPanelStore.masterPanel?.bill);
      setValue('dateExpire', masterPanelStore.masterPanel?.dateExpire);
      setValue('dateActive', masterPanelStore.masterPanel?.dateActive);
      setValue('dateCreation', masterPanelStore.masterPanel?.dateCreation);
      setValue('version', masterPanelStore.masterPanel?.version);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [masterPanelStore.masterPanel]);

    const onSubmitMasterPanel = () => {
      if (!masterPanelStore.checkExitsLabEnvCode) {
        if (
          !masterPanelStore.masterPanel?.existsVersionId &&
          !masterPanelStore.masterPanel?.existsRecordId
        ) {
          masterPanelStore.masterPanelService
            .addPanelMaster({
              input: isImport
                ? {isImport, arrImportRecords}
                : {
                    isImport,
                    ...masterPanelStore.masterPanel,
                    enteredBy: loginStore.login.userId,
                  },
            })
            .then(res => {
              if (res.createPanelMaster.success) {
                Toast.success({
                  message: `😊 ${res.createPanelMaster.message}`,
                });
                setIsInputView(true);
                reset();
                resetMasterPanel();
                setArrImportRecords([]);
              }
            });
        } else if (
          masterPanelStore.masterPanel?.existsVersionId &&
          !masterPanelStore.masterPanel?.existsRecordId
        ) {
          masterPanelStore.masterPanelService
            .versionUpgradePanelMaster({
              input: {
                ...masterPanelStore.masterPanel,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.versionUpgradePanelMaster.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradePanelMaster.message}`,
                });
              }
            });
        } else if (
          !masterPanelStore.masterPanel?.existsVersionId &&
          masterPanelStore.masterPanel?.existsRecordId
        ) {
          masterPanelStore.masterPanelService
            .duplicatePanelMaster({
              input: {
                ...masterPanelStore.masterPanel,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then(res => {
              if (res.duplicatePanelMaster.success) {
                Toast.success({
                  message: `😊 ${res.duplicatePanelMaster.message}`,
                });
              }
            });
        }
      } else {
        Toast.warning({
          message: '😔 Please enter diff code',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <PanelMasterList
          data={masterPanelStore.listMasterPanel || []}
          totalSize={masterPanelStore.listMasterPanelCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            labList: loginStore.login?.labList,
            listLabs: labStore.listLabs,
            listDepartment: departmentStore.listDepartment,
            listDeliverySchedule: deliveryScheduleStore.listDeliverySchedule,
            listMethods: methodsStore.listMethods,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Edit/Modify',
          )}
          // isEditModify={false}
          onDelete={selectedItem => setModalConfirm(selectedItem)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'Delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Delete selected items!',
            });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'Update',
              data: {value, dataField, id},
              title: 'Are you sure?',
              body: 'Update record!',
            });
          }}
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateFileds',
              data: {fileds, id},
              title: 'Are you sure?',
              body: 'Update records!',
            });
          }}
          onVersionUpgrade={item => {
            setModalConfirm({
              show: true,
              type: 'versionUpgrade',
              data: item,
              title: 'Are you version upgrade?',
              body: 'Version upgrade this record',
            });
          }}
          onDuplicate={item => {
            setModalConfirm({
              show: true,
              type: 'duplicate',
              data: item,
              title: 'Are you duplicate?',
              body: 'Duplicate this record',
            });
          }}
          onPageSizeChange={(page, limit) => {
            masterPanelStore.fetchPanelMaster(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            masterPanelStore.masterPanelService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {mode: 'filter', type, page, limit, filter};
          }}
          onApproval={async records => {
            const isExists = await checkExistsRecords(records, 1);
            if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'Update',
                data: {value: 'A', dataField: 'status', id: records._id},
                title: 'Are you sure?',
                body: 'Update deginisation!',
              });
            }
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [masterPanelStore.listMasterPanel],
    );

    const handleFileUpload = (file: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt: any) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type: 'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {raw: true});
        const list = data.map((item: any) => {
          return {
            rLab: item?.RLab,
            pLab: item.PLab,
            department: item.Department,
            serviceType: item['Service Type'],
            panelCode: item['Panel Code'],
            panelName: item['Panel Name'],
            description: item.Description,
            shortName: item['Short Name'],
            panelMethodCode: item['Panel Method Code'],
            panelMethodName: item['Panel Method Name'],
            method: item.Method === 'Yes' ? true : false,
            price: item.Price,
            bill: item.Bill === 'Yes' ? true : false,
            schedule: item.Schedule,
            validationLevel: item['Validation Level'],
            reportGroup: item['Report Group'],
            reportOrder: item['Report Order'],
            processing: item.Processing,
            workflow: item.Workflow,
            category: item.Category,
            panelType: item['Panel Type'],
            autoRelease: item['Auto Release'] === 'Yes' ? true : false,
            holdOOS: item['Hold OOS'] === 'Yes' ? true : false,
            confidential: item.Confidential === 'Yes' ? true : false,
            urgent: item.Urgent === 'Yes' ? true : false,
            repitation: item.Repitation === 'Yes' ? true : false,
            printLabel: item['Print Label'] === 'Yes' ? true : false,
            cumulative: item.Cumulative === 'Yes' ? true : false,
            sexAction: item['Sex Action'],
            sex: item.Sex,
            ageAction: item['Age Action'],
            loAge: item['Lo Age'],
            hiAge: item['Hi Age'],
            actionMessage: item['Action Message'],
            ageSexAction: item['Age/Sex Action'] === 'Yes' ? true : false,
            pageBreak: item['Page Break'] === 'Yes' ? true : false,
            reportTemplate: item['Report Template'],
            reportTemplateOrder: item['Report Template Order'],
            labelInstruction: item['Label Instruction'],
            specalInstructions: item['Specal Instructions'],
            interpretation: item.Interpretation,
            internalComments: item['Internal Comments'],
            externalComments: item['External Comments'],
            panelBottomMarker: '',
            panelRightMarker: item['Panel Right Marker'],
            externalPanelCode: item['External Panel Code'],
            enteredBy: loginStore.login?.userId,
            dateCreation: new Date(),
            dateActive: new Date(),
            dateExpire: new Date(
              dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
            ),
            version: item.Version,
            environment: item.Environment,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields = masterPanelStore.masterPanel,
      length = 0,
    ) => {
      return masterPanelStore.masterPanelService
        .findByFields({
          input: {
            filter: {
              ..._.pick(fields, [
                'rLab',
                'pLab',
                'department',
                'serviceType',
                'panelCode',
                'panelName',
                'schedule',
                'status',
                'environment',
              ]),
            },
          },
        })
        .then(res => {
          if (
            res.findByFieldsPanelMaster?.success &&
            res.findByFieldsPanelMaster?.data?.length > length
          ) {
            //setIsExistsRecord(true);
            Toast.error({
              message: '😔 Already some record exists.',
            });
            return true;
          } else return false;
        });
    };

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          'Add',
        ) && (
          <Buttons.ButtonCircleAddRemove
            show={isInputView}
            onClick={() => setIsInputView(!isInputView)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (isInputView ? 'hidden' : 'shown')
            }
          >
            <ManualImportTabs
              isImport={isImport}
              onClick={flag => {
                setIsImport(flag);
              }}
            />
            {!isImport ? (
              <>
                <Grid cols={3}>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='RLab'
                          hasError={!!errors.rLab}
                        >
                          <select
                            value={value}
                            disabled={
                              loginStore.login &&
                              loginStore.login.role !== 'SYSADMIN'
                                ? true
                                : false
                            }
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.rLab ? 'border-red' : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const rLab = e.target.value as string;
                              onChange(rLab);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                rLab,
                              });
                              if (
                                !masterPanelStore.masterPanel?.existsVersionId
                              ) {
                                masterPanelStore.masterPanelService
                                  .checkExitsLabEnvCode({
                                    input: {
                                      code: masterPanelStore.masterPanel
                                        ?.panelMethodCode,
                                      env: masterPanelStore.masterPanel
                                        ?.environment,
                                      lab: rLab,
                                    },
                                  })
                                  .then(res => {
                                    if (
                                      res.checkPanelMasterExistsRecord.success
                                    ) {
                                      masterPanelStore.updateExistsLabEnvCode(
                                        true,
                                      );
                                      Toast.error({
                                        message: `😔 ${res.checkPanelMasterExistsRecord.message}`,
                                      });
                                    } else
                                      masterPanelStore.updateExistsLabEnvCode(
                                        false,
                                      );
                                  });
                              }
                            }}
                          >
                            <option selected>Select</option>
                            {loginStore.login?.labList &&
                              loginStore.login?.labList.map(
                                (item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {item.name}
                                  </option>
                                ),
                              )}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='rLab'
                      rules={{required: true}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='PLab'
                          hasError={!!errors.pLab}
                        >
                          <AutoCompleteFilterSingleSelect
                            loader={loading}
                            placeholder='Search by name'
                            // disable={
                            //   loginStore.login &&
                            //   loginStore.login.role !== 'SYSADMIN'
                            //     ? true
                            //     : false
                            // }
                            data={{
                              list:
                                loginStore.login.role !== 'SYSADMIN'
                                  ? loginStore.login.labList
                                  : labStore.listLabs,
                              displayKey: 'name',
                              findKey: 'name',
                            }}
                            displayValue={value}
                            hasError={!!errors.name}
                            onFilter={(value: string) => {
                              labStore.LabService.filter({
                                input: {
                                  type: 'filter',
                                  filter: {
                                    name: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              });
                            }}
                            onSelect={item => {
                              onChange(item.name);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                pLab: item.code,
                              });
                              labStore.updateLabList(labStore.listLabsCopy);
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='pLab'
                      rules={{required: true}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Department'
                          hasError={!!errors.department}
                        >
                          <AutoCompleteFilterSingleSelectDepartment
                            lab={masterPanelStore.masterPanel?.pLab}
                            hasError={!!errors.department}
                            onSelect={item => {
                              onChange(item.name);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                department: item.code,
                                reportGroup: Number.parseFloat(
                                  item?.reportOrder,
                                ),
                              });
                              departmentStore.updateDepartmentList(
                                departmentStore.listDepartmentCopy,
                              );
                              masterPanelStore.findSectionListByDeptCode(
                                item.code,
                              );
                              setValue(
                                'reportGroup',
                                Number.parseFloat(item?.reportOrder),
                              );
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='department'
                      rules={{required: true}}
                      defaultValue=''
                    />

                    {masterPanelStore.sectionListByDeptCode && (
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.InputWrapper
                            label='Section'
                            hasError={!!errors.section}
                          >
                            <AutoCompleteFilterSingleSelect
                              loader={loading}
                              data={{
                                list: masterPanelStore.sectionListByDeptCode,
                                displayKey: 'name',
                                findKey: 'name',
                              }}
                              hasError={!!errors.name}
                              onFilter={(value: string) => {
                                masterPanelStore.masterPanelService.filter({
                                  input: {
                                    type: 'filter',
                                    filter: {
                                      name: value,
                                    },
                                    page: 0,
                                    limit: 10,
                                  },
                                });
                              }}
                              displayValue={value}
                              onSelect={item => {
                                onChange(item.name);
                                masterPanelStore.updateMasterPanel({
                                  ...masterPanelStore.masterPanel,
                                  section: item.name,
                                });
                              }}
                            />
                          </Form.InputWrapper>
                        )}
                        name='section'
                        rules={{required: false}}
                        defaultValue=''
                      />
                    )}

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Service Type'
                          hasError={!!errors.serviceType}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.serviceType
                                ? 'border-red'
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const serviceType = e.target.value as string;
                              onChange(serviceType);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                serviceType,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'SERVICE_TYPE',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='serviceType'
                      rules={{required: true}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Panel Code'
                          placeholder={
                            errors.panelCode
                              ? 'Please Enter Panel  Code'
                              : 'Panel  Code'
                          }
                          hasError={!!errors.panelCode}
                          value={value}
                          onChange={panelCode => {
                            onChange(panelCode);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              panelCode: panelCode.toUpperCase(),
                            });
                          }}
                          onBlur={panelCode => {
                            masterPanelStore.masterPanelService
                              .findByFields({input: {filter: {panelCode}}})
                              .then((res: any) => {
                                if (res.findByFieldsPanelMaster.success) {
                                  masterPanelStore.updateMasterPanel({
                                    ...masterPanelStore.masterPanel,
                                    panelName:
                                      res.findByFieldsPanelMaster.data?.length >
                                      0
                                        ? res.findByFieldsPanelMaster.data[0]
                                            ?.panelName
                                        : undefined,
                                  });
                                  masterPanelStore.updateMasterPanelActivity({
                                    ...masterPanelStore.masterPanelActivity,
                                    disablePanelName: true,
                                  });
                                } else {
                                  masterPanelStore.updateMasterPanel({
                                    ...masterPanelStore.masterPanel,
                                    panelName: '',
                                  });
                                  masterPanelStore.updateMasterPanelActivity({
                                    ...masterPanelStore.masterPanelActivity,
                                    disablePanelName: false,
                                  });
                                }
                              });
                          }}
                        />
                      )}
                      name='panelCode'
                      rules={{required: true}}
                      defaultValue=''
                    />
                    {masterPanelStore.checkExitsLabEnvCode && (
                      <span className='text-red-600 font-medium relative'>
                        Code already exits. Please use other code.
                      </span>
                    )}

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Panel Name'
                          placeholder={
                            errors.panelName
                              ? 'Please Enter Panel  Name'
                              : 'Panel  Name'
                          }
                          hasError={!!errors.panelName}
                          disabled={
                            masterPanelStore.masterPanelActivity
                              ?.disablePanelName
                          }
                          value={value}
                          onChange={panelName => {
                            onChange(panelName);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              panelName: panelName.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='panelName'
                      rules={{required: true}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.MultilineInput
                          rows={3}
                          label='Description'
                          placeholder={
                            errors.description
                              ? 'Please Enter Description'
                              : 'Description'
                          }
                          hasError={!!errors.description}
                          value={value}
                          onChange={description => {
                            onChange(description);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              description,
                            });
                          }}
                        />
                      )}
                      name='description'
                      rules={{required: false}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Panel Method'
                          hasError={!!errors.panelMethod}
                        >
                          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                            loader={loading}
                            placeholder='Search by code or name'
                            data={{
                              list: methodsStore.listMethods,
                              displayKey: ['methodsCode', 'methodsName'],
                            }}
                            displayValue={value}
                            disable={!masterPanelStore.masterPanel?.method}
                            hasError={!!errors.panelMethod}
                            onFilter={(value: string) => {
                              methodsStore.methodsService.filterByFields({
                                input: {
                                  filter: {
                                    fields: ['methodsCode', 'methodsName'],
                                    srText: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              });
                            }}
                            onSelect={item => {
                              onChange(item.methodsCode);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                panelMethodCode: item.methodsCode,
                                panelMethodName: item.methodsName,
                              });
                              methodsStore.updateMethodsList(
                                methodsStore.listMethodsCopy,
                              );
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='panelMethod'
                      rules={{
                        required: masterPanelStore.masterPanel?.method
                          ? true
                          : false,
                      }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Short Name'
                          placeholder={
                            errors.shortName
                              ? 'Please Enter ShortName'
                              : 'Short Name'
                          }
                          hasError={!!errors.shortName}
                          value={value}
                          onChange={shortName => {
                            onChange(shortName);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              shortName,
                            });
                          }}
                        />
                      )}
                      name='shortName'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Price'
                          placeholder={
                            errors.price ? 'Please Enter Price' : 'Price'
                          }
                          type='number'
                          hasError={!!errors.price}
                          value={value}
                          onChange={price => {
                            onChange(price);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              price: Number.parseFloat(price),
                            });
                          }}
                        />
                      )}
                      name='price'
                      rules={{required: false}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Schedule'
                          hasError={!!errors.schedule}
                        >
                          <AutoCompleteFilterSingleSelect
                            loader={loading}
                            placeholder='Search by code'
                            data={{
                              list: deliveryScheduleStore.listDeliverySchedule,
                              displayKey: 'schCode',
                              findKey: 'schCode',
                            }}
                            hasError={!!errors.schedule}
                            onFilter={(value: string) => {
                              deliveryScheduleStore.deliveryScheduleService.filter(
                                {
                                  input: {
                                    type: 'filter',
                                    filter: {
                                      schCode: value,
                                    },
                                    page: 0,
                                    limit: 10,
                                  },
                                },
                              );
                            }}
                            displayValue={value}
                            onSelect={item => {
                              onChange(item.schCode);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                schedule: item.schCode,
                              });
                              deliveryScheduleStore.updateDeliveryScheduleList(
                                deliveryScheduleStore.listDeliveryScheduleCopy,
                              );
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='schedule'
                      rules={{required: true}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Validation Level'
                          hasError={!!errors.validationLevel}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.validationLevel
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const validationLevel: any = e.target.value;
                              onChange(validationLevel);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                validationLevel:
                                  Number.parseInt(validationLevel),
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                              (item: any, index: number) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ),
                            )}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='validationLevel'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Report Groups'
                          placeholder={
                            errors.reportGroup
                              ? 'Please Enter ReportGroup'
                              : 'Report Groups'
                          }
                          hasError={!!errors.reportGroup}
                          value={value}
                          disabled={true}
                          onChange={reportGroup => {
                            onChange(reportGroup);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              reportGroup: reportGroup.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='reportGroup'
                      rules={{required: false}}
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
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              reportOrder: Number.parseInt(reportOrder),
                            });
                          }}
                        />
                      )}
                      name='reportOrder'
                      rules={{required: false}}
                      defaultValue=''
                    />

                    <Grid cols={5}>
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Bill'
                            id='modeBill'
                            hasError={!!errors.bill}
                            value={value}
                            onChange={bill => {
                              onChange(bill);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                bill,
                              });
                            }}
                          />
                        )}
                        name='bill'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Auto Release'
                            id='modeAutoRelease'
                            hasError={!!errors.autoRelease}
                            value={value}
                            onChange={autoRelease => {
                              onChange(autoRelease);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                autoRelease,
                              });
                            }}
                          />
                        )}
                        name='autoRelease'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Hold OOS'
                            id='modeHoldOOS'
                            hasError={!!errors.holdOOS}
                            value={value}
                            onChange={holdOOS => {
                              onChange(holdOOS);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                holdOOS,
                              });
                            }}
                          />
                        )}
                        name='holdOOS'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Confidential'
                            hasError={!!errors.confidential}
                            value={value}
                            onChange={confidential => {
                              onChange(confidential);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                confidential,
                              });
                            }}
                          />
                        )}
                        name='confidential'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Urgent'
                            style={{marginLeft: 5}}
                            hasError={!!errors.urgent}
                            value={value}
                            onChange={urgent => {
                              onChange(urgent);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                urgent,
                              });
                            }}
                          />
                        )}
                        name='urgent'
                        rules={{required: false}}
                        defaultValue=''
                      />
                    </Grid>
                  </List>

                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Processing'
                          hasError={!!errors.processing}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.processing
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const processing = e.target.value as string;
                              onChange(processing);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                processing,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'PROCESSING',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='processing'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Workflow'
                          placeholder={
                            errors.workflow
                              ? 'Please Enter Workflow'
                              : 'Workflow'
                          }
                          hasError={!!errors.workflow}
                          value={value}
                          onChange={workflow => {
                            onChange(workflow);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              workflow,
                            });
                          }}
                        />
                      )}
                      name='workflow'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Category'
                          hasError={!!errors.category}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.category
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const category = e.target.value as string;
                              onChange(category);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                category,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'CATEGORY',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='category'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Panel Type'
                          hasError={!!errors.panelType}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.panelType
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const panelType = e.target.value as string;
                              onChange(panelType);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                panelType,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'PANEL_TYPE',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='panelType'
                      rules={{required: false}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Sex Action'
                          hasError={!!errors.sexAction}
                        >
                          <select
                            value={value}
                            disabled={
                              !masterPanelStore.masterPanel?.ageSexAction
                            }
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.sexAction
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const sexAction = e.target.value as string;
                              onChange(sexAction);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                sexAction,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'SEX_ACTION',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='sexAction'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper label='Sex' hasError={!!errors.sex}>
                          <select
                            value={value}
                            disabled={
                              !masterPanelStore.masterPanel?.ageSexAction
                            }
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.sex ? 'border-red  ' : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const sex = e.target.value as string;
                              onChange(sex);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                sex,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(routerStore.lookupItems, 'SEX').map(
                              (item: any, index: number) => (
                                <option key={index} value={item.code}>
                                  {lookupValue(item)}
                                </option>
                              ),
                            )}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='sex'
                      rules={{required: false}}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Age Action'
                          hasError={!!errors.ageAction}
                        >
                          <select
                            value={value}
                            disabled={
                              !masterPanelStore.masterPanel?.ageSexAction
                            }
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.ageAction
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const ageAction = e.target.value as string;
                              onChange(ageAction);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                ageAction,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'AGE_ACTION',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='ageAction'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Lo Age'
                          disabled={!masterPanelStore.masterPanel?.ageSexAction}
                          placeholder={
                            errors.loAge ? 'Please Enter LoAge' : 'Lo Age'
                          }
                          hasError={!!errors.loAge}
                          value={value}
                          onChange={loAge => {
                            const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/);
                            if (regex.test(loAge)) {
                              onChange(loAge);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                loAge: loAge.toUpperCase(),
                              });
                            } else {
                              Toast.warning({
                                message:
                                  '😔 Only > and < sign and numbers should be allowed',
                              });
                            }
                          }}
                        />
                      )}
                      name='loAge'
                      rules={{
                        required:
                          masterPanelStore.masterPanel?.ageSexAction &&
                          masterPanelStore.masterPanel?.ageAction !== 'N' &&
                          !masterPanelStore.masterPanel?.hiAge
                            ? true
                            : false,
                        pattern: /^[0-9<>=\\-`.+,/"]*$/,
                        validate: value => FormHelper.isNumberAvailable(value),
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Hi Age'
                          disabled={!masterPanelStore.masterPanel?.ageSexAction}
                          placeholder={
                            errors.hiAge ? 'Please Enter HiAge' : 'Hi Age'
                          }
                          hasError={!!errors.hiAge}
                          value={value}
                          onChange={hiAge => {
                            const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/);
                            if (regex.test(hiAge)) {
                              onChange(hiAge);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                hiAge: hiAge.toUpperCase(),
                              });
                            } else {
                              Toast.warning({
                                message:
                                  '😔 Only > and < sign and numbers should be allowed',
                              });
                            }
                          }}
                        />
                      )}
                      name='hiAge'
                      rules={{
                        required: false,
                        pattern: /^[0-9<>=\\-`.+,/"]*$/,
                        validate: value => FormHelper.isNumberAvailable(value),
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Action Message'
                          disabled={!masterPanelStore.masterPanel?.ageSexAction}
                          placeholder={
                            errors.actionMessage
                              ? 'Please Enter action message'
                              : 'Action Message'
                          }
                          hasError={!!errors.actionMessage}
                          value={value}
                          onChange={actionMessage => {
                            onChange(actionMessage);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              actionMessage,
                            });
                          }}
                        />
                      )}
                      name='actionMessage'
                      rules={{
                        required:
                          masterPanelStore.masterPanel?.sexAction !== 'N' ||
                          masterPanelStore.masterPanel?.ageAction !== 'N'
                            ? true
                            : false,
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Report Template'
                          hasError={!!errors.reportTemplate}
                        >
                          <AutoCompleteFilterSingleSelectReportTemplate
                            onSelect={item => {
                              onChange(item?.reportTemplate);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                reportTemplate: item?.reportTemplate,
                                reportTemplateOrder: item?.reportOrder,
                              });
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='reportTemplate'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.MultilineInput
                          rows={2}
                          label='Internal Comments'
                          placeholder='Internal Comments'
                          hasError={!!errors.internalComments}
                          value={value}
                          onChange={internalComments => {
                            onChange(internalComments);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              internalComments,
                            });
                          }}
                        />
                      )}
                      name='internalComments'
                      rules={{
                        required: false,
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.MultilineInput
                          rows={2}
                          label='External Comments'
                          placeholder='External Comments'
                          hasError={!!errors.externalComments}
                          value={value}
                          onChange={externalComments => {
                            onChange(externalComments);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              externalComments,
                            });
                          }}
                        />
                      )}
                      name='externalComments'
                      rules={{
                        required: false,
                      }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Panel Bottom Marker'
                          hasError={!!errors.panelBottomMarker}
                        >
                          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                            loader={loading}
                            placeholder='Search by code or details'
                            data={{
                              list: libraryStore.listLibrary,
                              displayKey: ['code', 'details'],
                            }}
                            displayValue={value}
                            hasError={!!errors.panelBottomMarker}
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
                              onChange(item.details);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                panelBottomMarker: {
                                  code: item?.code,
                                  details: item?.details,
                                },
                              });
                              libraryStore.updateLibraryList(
                                libraryStore.listLibraryCopy,
                              );
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='panelBottomMarker'
                      rules={{
                        required: false,
                      }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.MultilineInput
                          rows={2}
                          label='Panel Right Marker'
                          placeholder='Panel Right Marker'
                          hasError={!!errors.panelRightMarker}
                          value={value}
                          onChange={panelRightMarker => {
                            onChange(panelRightMarker);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              panelRightMarker,
                            });
                          }}
                        />
                      )}
                      name='panelRightMarker'
                      rules={{
                        required: false,
                      }}
                      defaultValue=''
                    />

                    <Grid cols={5}>
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Page Break'
                            hasError={!!errors.pageBreak}
                            value={value}
                            onChange={pageBreak => {
                              onChange(pageBreak);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                pageBreak,
                              });
                            }}
                          />
                        )}
                        name='pageBreak'
                        rules={{required: false}}
                        defaultValue=''
                      />

                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Age/Sex Action'
                            hasError={!!errors.ageSexAction}
                            value={value}
                            onChange={ageSexAction => {
                              onChange(ageSexAction);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                ageSexAction,
                                hiAge: !ageSexAction
                                  ? ''
                                  : masterPanelStore.masterPanel?.hiAge,
                                loAge: !ageSexAction
                                  ? ''
                                  : masterPanelStore.masterPanel?.loAge,
                              });
                            }}
                          />
                        )}
                        name='ageSexAction'
                        rules={{required: false}}
                        defaultValue=''
                      />

                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Repetition'
                            hasError={!!errors.repitation}
                            value={value}
                            onChange={repitation => {
                              onChange(repitation);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                repitation,
                              });
                            }}
                          />
                        )}
                        name='repitation'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Print Label'
                            hasError={!!errors.printLabel}
                            value={value}
                            onChange={printLabel => {
                              onChange(printLabel);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                printLabel,
                              });
                            }}
                          />
                        )}
                        name=' printLabel'
                        rules={{required: false}}
                        defaultValue=''
                      />
                    </Grid>
                  </List>
                  <List direction='col' space={4} justify='stretch' fill>
                    {/* <Form.Input
                label="Tube Groups"
                placeholder="Tube Groups"
                value={masterPanelStore.masterPanel?.tubeGroup}
                onChange={(tubeGroup) => {
                  masterPanelStore.updateMasterPanel({
                    ...masterPanelStore.masterPanel,
                    tubeGroup,
                  })
                }}
              /> */}

                    {/* <Form.InputWrapper label="Sample Type">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleType = e.target.value as string
                    masterPanelStore.updateMasterPanel({
                      ...masterPanelStore.masterPanel,
                      sampleType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Sample Type 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Form.InputWrapper> */}
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Label Instruction'
                          placeholder={
                            errors.labelInstruction
                              ? 'Please Enter LabelInstruction'
                              : 'Label Instruction'
                          }
                          hasError={!!errors.labelInstruction}
                          value={value}
                          onChange={labelInstruction => {
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              labelInstruction: labelInstruction.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='labelInstruction'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Special Instructions'
                          placeholder={
                            errors.specalInstructions
                              ? 'Please Enter SpecalInstructions'
                              : 'Special Instruction'
                          }
                          hasError={!!errors.specalInstructions}
                          value={value}
                          onChange={specalInstructions => {
                            onChange(specalInstructions);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              specalInstructions:
                                specalInstructions.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='specalInstructions'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='External Panel Code'
                          placeholder='External Panel Code'
                          hasError={!!errors.externalPanelCode}
                          value={value}
                          onChange={externalPanelCode => {
                            onChange(externalPanelCode);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              externalPanelCode,
                            });
                          }}
                        />
                      )}
                      name='externalPanelCode'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Status'
                          hasError={!!errors.status}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.status ? 'border-red  ' : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const status = e.target.value as string;
                              onChange(status);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                status,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(routerStore.lookupItems, 'STATUS').map(
                              (item: any, index: number) => (
                                <option key={index} value={item.code}>
                                  {lookupValue(item)}
                                </option>
                              ),
                            )}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='status'
                      rules={{required: true}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Entered By'
                          placeholder={
                            errors.userId ? 'Please Enter UserID' : 'Entered By'
                          }
                          hasError={!!errors.userId}
                          value={loginStore.login?.userId}
                          disabled={true}
                          // onChange={(analyteCode) => {
                          //   masterAnalyteStore.updateMasterAnalyte({
                          //     ...masterAnalyteStore.masterAnalyte,
                          //     analyteCode,
                          //   })
                          // }}
                        />
                      )}
                      name='userId'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputDateTime
                          label='Date Creation'
                          placeholder={
                            errors.dateCreation
                              ? 'Please Enter DateCreation'
                              : 'Date Creation'
                          }
                          value={value}
                          disabled={true}
                        />
                      )}
                      name='dateCreation'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputDateTime
                          label='Date Active'
                          hasError={!!errors.dateActive}
                          placeholder={
                            errors.dateActive
                              ? 'Please Enter dateActive'
                              : 'Date Active'
                          }
                          value={value}
                          disabled={true}
                        />
                      )}
                      name='dateActive'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputDateTime
                          label='Date Expire'
                          placeholder={
                            errors.dateExpire
                              ? 'Please Enter dateActiveTo'
                              : 'Date Expire'
                          }
                          value={value}
                          onChange={dateExpire => {
                            onChange(dateExpire);
                            masterPanelStore.updateMasterPanel({
                              ...masterPanelStore.masterPanel,
                              dateExpire,
                            });
                          }}
                        />
                      )}
                      name='dateExpire'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.Input
                          label='Version'
                          hasError={!!errors.version}
                          placeholder={
                            errors.version ? 'Please Enter Version' : 'Version'
                          }
                          value={value}
                          disabled={true}
                        />
                      )}
                      name='version'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper label='Interpretation'>
                          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                            loader={loading}
                            placeholder='Search by code'
                            hasError={!!errors.interpretation}
                            data={{
                              list: libraryStore.listLibrary.filter(
                                item => item.libraryType === 'I',
                              ),
                              displayKey: ['code'],
                            }}
                            displayValue={value}
                            onFilter={(value: string) => {
                              libraryStore.libraryService.filterByFields({
                                input: {
                                  filter: {
                                    fields: ['code'],
                                    srText: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              });
                            }}
                            onSelect={item => {
                              onChange(item.code);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                interpretation: item.code,
                              });
                              libraryStore.updateLibraryList(
                                libraryStore.listLibraryCopy,
                              );
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='interpretation'
                      rules={{required: false}}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Form.InputWrapper
                          label='Environment'
                          hasError={!!errors.environment}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.environment
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            disabled={
                              loginStore.login &&
                              loginStore.login.role !== 'SYSADMIN'
                                ? true
                                : false
                            }
                            onChange={e => {
                              const environment = e.target.value as string;
                              onChange(environment);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                environment,
                              });
                              if (
                                !masterPanelStore.masterPanel?.existsVersionId
                              ) {
                                masterPanelStore.masterPanelService
                                  .checkExitsLabEnvCode({
                                    input: {
                                      code: masterPanelStore.masterPanel
                                        ?.panelMethodCode,
                                      env: environment,
                                      lab: masterPanelStore.masterPanel?.rLab,
                                    },
                                  })
                                  .then(res => {
                                    if (
                                      res.checkPanelMasterExistsRecord.success
                                    ) {
                                      masterPanelStore.updateExistsLabEnvCode(
                                        true,
                                      );
                                      Toast.error({
                                        message: `😔 ${res.checkPanelMasterExistsRecord.message}`,
                                      });
                                    } else
                                      masterPanelStore.updateExistsLabEnvCode(
                                        false,
                                      );
                                  });
                              }
                            }}
                          >
                            <option selected>
                              {loginStore.login &&
                              loginStore.login.role !== 'SYSADMIN'
                                ? 'Select'
                                : masterPanelStore.masterPanel?.environment ||
                                  'Select'}
                            </option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'ENVIRONMENT',
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
                    <Grid cols={3}>
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Cumulative'
                            hasError={!!errors.cumulative}
                            value={value}
                            onChange={cumulative => {
                              onChange(cumulative);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                cumulative,
                              });
                            }}
                          />
                        )}
                        name='cumulative'
                        rules={{required: false}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <Form.Toggle
                            label='Method'
                            hasError={!!errors.method}
                            value={value}
                            onChange={method => {
                              onChange(method);
                              masterPanelStore.updateMasterPanel({
                                ...masterPanelStore.masterPanel,
                                method,
                              });
                            }}
                          />
                        )}
                        name='method'
                        rules={{required: false}}
                        defaultValue=''
                      />
                    </Grid>
                  </List>
                </Grid>
              </>
            ) : (
              <>
                {arrImportRecords?.length > 0 ? (
                  <StaticInputTable data={arrImportRecords} />
                ) : (
                  <ImportFile
                    onClick={file => {
                      handleFileUpload(file[0]);
                    }}
                  />
                )}
              </>
            )}
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitMasterPanel)}
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
            {tableView}
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              switch (action) {
                case 'Delete': {
                  masterPanelStore.masterPanelService
                    .deletePanelMaster({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      setModalConfirm({show: false});
                      if (res.removePanelMaster.success) {
                        Toast.success({
                          message: `😊 ${res.removePanelMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          masterPanelStore.fetchPanelMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          masterPanelStore.masterPanelService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else masterPanelStore.fetchPanelMaster();
                      }
                    });
                  break;
                }
                case 'Update': {
                  masterPanelStore.masterPanelService
                    .updateFileds({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      setModalConfirm({show: false});
                      if (res.updatePanelMaster.success) {
                        Toast.success({
                          message: `😊 ${res.updatePanelMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          masterPanelStore.fetchPanelMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          masterPanelStore.masterPanelService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else masterPanelStore.fetchPanelMaster();
                      }
                    });
                  break;
                }
                case 'UpdateFileds': {
                  masterPanelStore.masterPanelService
                    .updateFileds({
                      input: {
                        ...modalConfirm.data.fileds,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      setModalConfirm({show: false});
                      if (res.updatePanelMaster.success) {
                        Toast.success({
                          message: `😊 ${res.updatePanelMaster.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          masterPanelStore.fetchPanelMaster(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        if (global?.filter?.mode == 'filter')
                          masterPanelStore.masterPanelService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else masterPanelStore.fetchPanelMaster();
                      }
                    });
                  break;
                }
                case 'versionUpgrade': {
                  masterPanelStore.updateMasterPanel({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                  });
                  setValue('rLab', modalConfirm.data.rLab);
                  setValue('pLab', modalConfirm.data.pLab);
                  setValue('panelCode', modalConfirm.data.panelCode);
                  setValue('panelName', modalConfirm.data.panelName);
                  setValue('department', modalConfirm.data.department);
                  setValue('serviceType', modalConfirm.data.serviceType);
                  setValue('status', modalConfirm.data.status);
                  setValue('environment', modalConfirm.data.environment);
                  setModalConfirm({show: false});
                  break;
                }
                case 'duplicate': {
                  masterPanelStore.updateMasterPanel({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: 1,
                    dateActive: new Date(),
                    dateCreation: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
                    ),
                  });
                  setIsInputView(!isInputView);
                  setValue('rLab', modalConfirm.data.rLab);
                  setValue('pLab', modalConfirm.data.pLab);
                  setValue('panelCode', modalConfirm.data.panelCode);
                  setValue('panelName', modalConfirm.data.panelName);
                  setValue('department', modalConfirm.data.department);
                  setValue('serviceType', modalConfirm.data.serviceType);
                  setValue('status', modalConfirm.data.status);
                  setValue('environment', modalConfirm.data.environment);
                  setModalConfirm({show: false});
                  break;
                }
              }
            }}
            onClose={() => {
              setModalConfirm({show: false});
            }}
          />
        </div>
      </>
    );
  }),
);

export default MasterPanel;
