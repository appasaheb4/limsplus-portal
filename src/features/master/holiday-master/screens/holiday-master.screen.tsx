import React, { useState, useMemo, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  MainPageHeading,
  ModalImportFile,
  Tooltip,
  AutoCompleteFilterSingleSelect,
} from '@/library/components';
import { lookupItems, lookupValue } from '@/library/utils';
import { HolidayMasterList } from '../components';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { HolidayMasterHoc } from '../hoc';
import { useStores } from '@/stores';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import * as XLSX from 'xlsx';
import 'react-quill/dist/quill.snow.css';
import { ModalDocxContentInput } from '@/core-components/molecules/modal/modal-docx-content.input.component';

export const HolidayMaster = HolidayMasterHoc(
  observer(() => {
    const {
      loginStore,
      labStore,
      lookupStore,
      routerStore,
      holidayMasterStore,
    } = useStores();
    const editor = useRef<any>();
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);
    const [departmentList, setDepartmentList] = useState([]);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);
    const [modalDetail, setModalDetail] = useState<any>();
    const [isExistsRecord, setIsExistsRecord] = useState(false);
    const [modalDocxContent, setModalDocxContent] = useState<any>();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm({ mode: 'all' });

    useEffect(() => {
      // Default value initialization\
      setValue('code', holidayMasterStore.holidayMaster.code);
      setValue('lab', holidayMasterStore.holidayMaster.lab);
      setValue('holidayOn', holidayMasterStore.holidayMaster.holidayOn);
      setValue('date', holidayMasterStore.holidayMaster.date);
      setValue('enteredBy', holidayMasterStore.holidayMaster.enteredBy);
      setValue('dateCreation', holidayMasterStore.holidayMaster.dateCreation);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [holidayMasterStore.holidayMaster]);

    const onSubmitLibrary = async data => {};

    const handleFileChange = async (file: any) => {};

    const onUpdateSingleField = payload => {};

    const tableView = useMemo(
      () => (
        <HolidayMasterList
          data={holidayMasterStore.listHolidayMaster || []}
          totalSize={holidayMasterStore.listHolidayMasterCount}
          extraData={{}}
          isView={RouterFlow.checkPermission(
            routerStore.userPermission,
            'View',
          )}
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          isUpdate={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Update',
          )}
          isExport={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Export',
          )}
          isVersionUpgrade={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Version Upgrade',
          )}
          isDuplicate={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Duplicate',
          )}
          onDelete={selectedItem => setModalConfirm(selectedItem)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'Delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Do you want to delete selected record?',
            });
          }}
          onUpdateItem={(fields: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'Update',
              data: { fields, id },
              title: 'Are you sure?',
              body: 'Update item!',
            });
          }}
          onVersionUpgrade={item => {
            setModalConfirm({
              show: true,
              type: 'versionUpgrade',
              data: item,
              title: 'Are you sure?',
              body: 'Do you want to upgrade version for this record?',
            });
          }}
          onDuplicate={item => {
            setModalConfirm({
              show: true,
              type: 'duplicate',
              data: item,
              title: 'Are you sure?',
              body: 'Do you want to duplicate this record?',
            });
          }}
          onPageSizeChange={(page, limit) => {
            // libraryStore.fetchLibrary(page, limit);
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            // libraryStore.libraryService.filter({
            //   input: { type, filter, page, limit },
            // });
            // global.filter = {
            //   mode: 'filter',
            //   type,
            //   filter,
            //   page,
            //   limit,
            // };
          }}
          onApproval={async records => {
            // const isExists = await checkExistsRecords({
            //   ...records,
            //   status: 'A',
            // });
            // if (!isExists) {
            //   setModalConfirm({
            //     show: true,
            //     type: 'Update',
            //     data: { fields: { status: 'A' }, id: records._id },
            //     title: 'Are you sure?',
            //     body: 'Do you want to update this record?',
            //   });
            // }
          }}
          onSingleDirectUpdateField={(value, dataField, id) => {
            onUpdateSingleField({
              _id: id,
              [dataField]: value,
            });
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [holidayMasterStore.listHolidayMaster],
    );

    const checkExistsRecords = async (
      fields: any = holidayMasterStore.listHolidayMaster,
      isSingleCheck = false,
    ) => {};

    const handleFileUpload = (file: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt: any) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { raw: true });
        const list = data.map((item: any) => {
          return {
            // code: item?.Code,
            // libraryCode: item['Library Code'],
            // description: item.Description,
            // lab: item.Lab,
            // department: item.Department,
            // position: item.Position,
            // groups: item.Groups,
            // libraryType: item['Library Type'],
            // parameter: item.Parameter,
            // editable: item.Editable == 'Yes' ? true : false,
            // details: item.Details,
            // enteredBy: loginStore.login.userId,
            // dateCreation: new Date(),
            // dateActive: new Date(),
            // dateExpire: new Date(
            //   dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD hh:mm:ss'),
            // ),
            // versions: item.Versions,
            // environment: item?.Environment,
            // companyCode: item['Company Code'],
            // status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };
    return (
      <>
        <MainPageHeading
          title={routerStore.selectedComponents?.title || ''}
          store={loginStore}
        />

        <div
          className='flex justify-end'
          style={{
            position: 'fixed',
            right: '30px',
            top: '135px',
            zIndex: 9999,
          }}
        >
          {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
            <Buttons.ButtonCircleAddRemoveBottom
              show={hideAddLab}
              onClick={() => setHideAddLab(!hideAddLab)}
            />
          )}
        </div>
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddLab ? 'hidden' : 'shown')
            }
          >
            <div className='flex flex-row justify-between items-center'>
              <ManualImportTabs
                isImportDisable={
                  !RouterFlow.checkPermission(
                    toJS(routerStore.userPermission),
                    'Import',
                  )
                }
                isImport={isImport}
                onClick={flag => {
                  setIsImport(flag);
                }}
              />
            </div>

            {!isImport ? (
              <Grid cols={2}>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Code'
                        id='code'
                        hasError={!!errors.code}
                        placeholder={errors.code ? 'Please Enter Code' : 'Code'}
                        value={value}
                        onChange={code => {
                          onChange(code);
                          holidayMasterStore.updateHolidayMaster({
                            ...holidayMasterStore.holidayMaster,
                            code,
                          });
                        }}
                      />
                    )}
                    name='code'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper label='Lab' hasError={!!errors.lab}>
                        <AutoCompleteFilterSingleSelect
                          placeholder='Search by name'
                          disable={
                            isVersionUpgrade
                              ? true
                              : loginStore.login &&
                                loginStore.login.role !== 'ADMINISTRATOR'
                              ? true
                              : false
                          }
                          data={{
                            list: labStore.listLabs?.filter(
                              item => item.status == 'A',
                            ),
                            displayKey: 'name',
                            findKey: 'name',
                          }}
                          displayValue={holidayMasterStore.holidayMaster?.lab}
                          hasError={!!errors.lab}
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
                            holidayMasterStore.updateHolidayMaster({
                              ...holidayMasterStore.holidayMaster,
                              lab: item.code,
                            });
                            labStore.updateLabList(labStore.listLabsCopy);
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='lab'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Holiday On'
                        placeholder={
                          errors.holidayOn
                            ? 'Please Enter Holiday On'
                            : 'Holiday On'
                        }
                        hasError={!!errors.holidayOn}
                        value={value}
                        onChange={holidayOn => {
                          onChange(holidayOn);
                          holidayMasterStore.updateHolidayMaster({
                            ...holidayMasterStore.holidayMaster,
                            holidayOn,
                          });
                        }}
                      />
                    )}
                    name='holidayOn'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputDateTime
                        label='Date'
                        placeholder={errors.date ? 'Please Enter Date' : 'Date'}
                        hasError={!!errors.date}
                        value={value}
                        onChange={date => {
                          onChange(date);
                          holidayMasterStore.updateHolidayMaster({
                            ...holidayMasterStore.holidayMaster,
                            date,
                          });
                        }}
                      />
                    )}
                    name='date'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
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
                            holidayMasterStore.updateHolidayMaster({
                              ...holidayMasterStore.holidayMaster,
                              status,
                            });
                          }}
                        >
                          <option>Select</option>
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
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { value } }) => (
                      <Form.Input
                        label='Enter By'
                        disabled
                        hasError={!!errors.enteredBy}
                        value={value}
                      />
                    )}
                    name='enteredBy'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { value } }) => (
                      <Form.Input
                        label='Date Creation'
                        disabled
                        value={
                          value
                            ? dayjs(value)
                                ?.format('DD-MM-YYYY HH:mm:ss')
                                .toString()
                            : ''
                        }
                      />
                    )}
                    name='dateCreation'
                    rules={{ required: false }}
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
                onClick={handleSubmit(onSubmitLibrary)}
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
          <ModalImportFile
            accept='.docx'
            {...modalDetail}
            click={(file: any) => {
              setModalDetail({ show: false });
              handleFileChange(file);
            }}
            close={() => {
              setModalDetail({ show: false });
            }}
          />
          <ModalDocxContentInput
            visible={modalDocxContent?.visible}
            onClose={() => {
              setModalDocxContent({ visible: false });
            }}
          />
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              setModalConfirm({ show: false });
              switch (action) {
                case 'Delete': {
                  break;
                }
                case 'Update': {
                  onUpdateSingleField({
                    ...modalConfirm.data.fields,
                    _id: modalConfirm.data.id,
                  });
                  break;
                }
                case 'versionUpgrade': {
                  break;
                }
                case 'duplicate': {
                  break;
                }
              }
            }}
            onClose={() => {
              setModalConfirm({ show: false });
            }}
          />
        </div>
      </>
    );
  }),
);

export default HolidayMaster;
