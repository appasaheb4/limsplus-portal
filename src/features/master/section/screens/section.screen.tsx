import React, {useState, useMemo, useEffect} from 'react';
import {observer} from 'mobx-react';
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
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';

import {SectionList} from '../components';
import {AutoCompleteFilterSingleSelectDepartment} from '../components';
import {SectionHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {FormHelper} from '@/helper';
import {resetSection} from '../startup';
import * as XLSX from 'xlsx';
import _ from 'lodash';
const Section = SectionHoc(
  observer(() => {
    const {loginStore, sectionStore, departmentStore, routerStore} =
      useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddSection, setHideAddSection] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    useEffect(() => {
      setValue('environment', sectionStore.section?.environment);
      setValue('status', sectionStore.section?.status);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionStore.section]);

    const onSubmitSection = () => {
      if (!sectionStore.checkExitsEnvCode) {
        sectionStore.sectionService
          .addSection({
            input: isImport
              ? {isImport, arrImportRecords}
              : {isImport, ...sectionStore.section},
          })
          .then(res => {
            if (res.createSection.success) {
              Toast.success({
                message: `😊 ${res.createSection.message}`,
              });
              setHideAddSection(true);
              reset();
              resetSection();
            } else {
              Toast.error({
                message: '😔 Please try again',
              });
            }
          });
      } else {
        Toast.error({
          message: '😔 Please enter diff code',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <SectionList
          data={sectionStore.listSection || []}
          totalSize={sectionStore.listSectionCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listDepartment: departmentStore.listDepartment,
          }}
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
              body: 'Update Section!',
            });
          }}
          onPageSizeChange={(page, limit) => {
            sectionStore.fetchSections(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            sectionStore.sectionService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {
              mode: 'filter',
              type,
              filter,
              page,
              limit,
            };
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
      [sectionStore.listSection],
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
            departmentCode: item['Department Code'],
            code: item.Code,
            name: item.Name,
            shortName: item['Short Name'],
            sectionInCharge: item['Section In Charge'],
            mobileNo: item['Mobie No'],
            contactNo: item['Contact No'],
            fyiLine: item['Fyi Line'],
            workLine: item['Work Line'],
            environment: item?.Environment,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };
    const checkExistsRecords = async (
      fields = sectionStore.section,
      length = 0,
    ) => {
      //Pass required Field in Array
      return sectionStore.sectionService
        .findSectionListByDeptCode({
          input: {
            filter: {
              ..._.pick(fields, [
                'departmentCode',
                'code',
                'name',
                'status',
                'environment',
              ]),
            },
          },
        })
        .then(res => {
          if (
            res.findSectionListByDeptCode?.success &&
            res.findSectionListByDeptCode.data?.length > length
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
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddSection}
            onClick={() => setHideAddSection(!hideAddSection)}
          />
        )}
        <div className=' mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddSection ? 'hidden' : 'shown')
            }
          >
            <ManualImportTabs
              isImport={isImport}
              onClick={flag => {
                setIsImport(flag);
              }}
            />
            {!isImport ? (
              <Grid cols={2}>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper
                        label='Department Code'
                        hasError={!!errors.departmentCode}
                      >
                        <AutoCompleteFilterSingleSelectDepartment
                          displayValue={value}
                          onSelect={item => {
                            onChange(item.name);
                            sectionStore.updateSection({
                              ...sectionStore.section,
                              departmentCode: item.code,
                            });
                            departmentStore.updateDepartmentList(
                              departmentStore.listDepartmentCopy,
                            );
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='departmentCode'
                    rules={{required: true}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Code'
                        id='code'
                        hasError={!!errors.code}
                        placeholder={
                          !!errors.code ? 'Please Enter Code' : 'Code'
                        }
                        value={value}
                        onChange={code => {
                          onChange(code);
                          sectionStore.updateSection({
                            ...sectionStore.section,
                            code: code.toUpperCase(),
                          });
                        }}
                        onBlur={code => {
                          sectionStore.sectionService
                            .checkExitsEnvCode({
                              input: {
                                code,
                                env: sectionStore.section?.environment,
                              },
                            })
                            .then(res => {
                              if (res.checkSectionExistsRecord.success) {
                                sectionStore.setExitsEnvCode(true);
                                Toast.error({
                                  message: `😔 ${res.checkSectionExistsRecord.message}`,
                                });
                              } else sectionStore.setExitsEnvCode(false);
                            });
                        }}
                      />
                    )}
                    name='code'
                    rules={{required: true}}
                    defaultValue=''
                  />
                  {sectionStore.checkExitsEnvCode && (
                    <span className='text-red-600 font-medium relative'>
                      Code already exits. Please use other code.
                    </span>
                  )}
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Name'
                        hasError={!!errors.name}
                        placeholder={
                          !!errors.name ? 'Please Enter Name' : 'Name'
                        }
                        value={value}
                        onChange={name => {
                          onChange(name);
                          sectionStore.updateSection({
                            ...sectionStore.section,
                            name,
                          });
                        }}
                      />
                    )}
                    name='name'
                    rules={{required: true}}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Short Name'
                        placeholder={
                          errors.shortName
                            ? 'Please Enter shortName'
                            : 'Short Name'
                        }
                        hasError={!!errors.shortName}
                        value={value}
                        onChange={shortName => {
                          onChange(shortName);
                          sectionStore.updateSection({
                            ...sectionStore.section,
                            shortName: shortName.toUpperCase(),
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
                        label='Section In Charge'
                        placeholder={
                          errors.sectionInCharge
                            ? 'Please Enter sectionInCharge'
                            : 'Section In Charge'
                        }
                        hasError={!!errors.sectionInCharge}
                        value={value}
                        onChange={sectionInCharge => {
                          onChange(sectionInCharge);
                          sectionStore.updateSection({
                            ...sectionStore.section,
                            sectionInCharge,
                          });
                        }}
                      />
                    )}
                    name='sectionInCharge'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        type='number'
                        label='Mobile No'
                        placeholder={
                          errors.mobieNo
                            ? 'Please Enter mobile no'
                            : 'Mobile No'
                        }
                        pattern={FormHelper.patterns.mobileNo}
                        value={value}
                        hasError={!!errors.mobieNo}
                        onChange={mobileNo => {
                          onChange(mobileNo);
                          sectionStore.updateSection({
                            ...sectionStore.section,
                            mobileNo,
                          });
                        }}
                      />
                    )}
                    name='mobieNo'
                    rules={{
                      required: false,
                      pattern: FormHelper.patterns.mobileNo,
                    }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        type='number'
                        label='Contact No'
                        placeholder={
                          errors.contactNo
                            ? 'Please Enter contactNo'
                            : 'Contact No'
                        }
                        hasError={!!errors.contactNo}
                        pattern={FormHelper.patterns.mobileNo}
                        value={value}
                        onChange={contactNo => {
                          onChange(contactNo);
                          sectionStore.updateSection({
                            ...sectionStore.section,
                            contactNo,
                          });
                        }}
                      />
                    )}
                    name='contactNo'
                    rules={{
                      required: false,
                      pattern: FormHelper.patterns.mobileNo,
                    }}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.MultilineInput
                        rows={3}
                        label='FYI line'
                        placeholder={
                          errors.fyiLine ? 'Please Enter fyiLine' : 'FYI line'
                        }
                        value={value}
                        onChange={fyiLine => {
                          onChange(fyiLine);
                          sectionStore.updateSection({
                            ...sectionStore.section,
                            fyiLine,
                          });
                        }}
                      />
                    )}
                    name='fyiLine'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.MultilineInput
                        rows={3}
                        label='Work line'
                        placeholder={
                          errors.workLine
                            ? 'Please Enter workLine'
                            : 'Work line'
                        }
                        hasError={!!errors.workLine}
                        value={value}
                        onChange={workLine => {
                          onChange(workLine);
                          sectionStore.updateSection({
                            ...sectionStore.section,
                            workLine,
                          });
                        }}
                      />
                    )}
                    name='workLine'
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
                            const status = e.target.value;
                            onChange(status);
                            sectionStore.updateSection({
                              ...sectionStore.section,
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
                      <Form.InputWrapper label='Environment'>
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
                            const environment = e.target.value;
                            onChange(environment);
                            sectionStore.updateSection({
                              ...sectionStore.section,
                              environment,
                            });
                            sectionStore.sectionService
                              .checkExitsEnvCode({
                                input: {
                                  code: sectionStore.section?.code,
                                  env: environment,
                                },
                              })
                              .then(res => {
                                if (res.checkSectionExistsRecord.success) {
                                  sectionStore.setExitsEnvCode(true);
                                  Toast.error({
                                    message: `😔 ${res.checkSectionExistsRecord.message}`,
                                  });
                                } else sectionStore.setExitsEnvCode(false);
                              });
                          }}
                        >
                          <option selected>
                            {loginStore.login &&
                            loginStore.login.role !== 'SYSADMIN'
                              ? 'Select'
                              : sectionStore.section?.environment || 'Select'}
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
                </List>
              </Grid>
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
                onClick={handleSubmit(onSubmitSection)}
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
                  sectionStore.sectionService
                    .deleteSection({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeSection.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.removeSection.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          sectionStore.fetchSections(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          sectionStore.sectionService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else sectionStore.fetchSections();
                      }
                    });
                  break;
                }
                case 'Update': {
                  sectionStore.sectionService
                    .updateSingleFiled({
                      input: {
                        _id: modalConfirm.data.id,
                        [modalConfirm.data.dataField]: modalConfirm.data.value,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateSection.success) {
                        setModalConfirm({show: false});
                        Toast.success({
                          message: `😊 ${res.updateSection.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          sectionStore.fetchSections(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          sectionStore.sectionService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else sectionStore.fetchSections();
                      }
                    });
                  break;
                }
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />
        </div>
      </>
    );
  }),
);

export default Section;
