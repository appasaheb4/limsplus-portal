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
import { TatMasterList } from '../components';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { TatMasterHoc } from '../hoc';
import { useStores } from '@/stores';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { resetLibrary } from '../startup';
import * as XLSX from 'xlsx';
import 'react-quill/dist/quill.snow.css';
import mammoth from 'mammoth';
import JoditEditor from 'jodit-react';
import { FaWordpressSimple } from 'react-icons/fa';
import { ModalDocxContentInput } from '@/core-components/molecules/modal/modal-docx-content.input.component';
import { AutoCompleteFilterSingleSelectMultiFieldsDisplay } from 'react-restyle-components';

export const TatMaster = TatMasterHoc(
  observer(() => {
    const {
      loginStore,
      labStore,
      departmentStore,
      masterPanelStore,
      lookupStore,
      routerStore,
      tatMasterStore,
      registrationLocationsStore,
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
      // Default value initialization
      setValue('rLab', tatMasterStore.tatMaster?.rLab);
      setValue('pLab', tatMasterStore.tatMaster?.pLab);
      setValue(
        'registrationLocation',
        tatMasterStore.tatMaster?.registrationLocation,
      );
      setValue('tatStartTime', tatMasterStore.tatMaster?.tatStartTime);
      setValue('tat', tatMasterStore.tatMaster?.tat);
      setValue('tatValue', tatMasterStore.tatMaster?.tatValue);
      setValue('units', tatMasterStore.tatMaster?.units);
      setValue('status', tatMasterStore.tatMaster?.status);
      setValue('enteredBy', tatMasterStore.tatMaster?.enteredBy);
      setValue('dateCreation', tatMasterStore.tatMaster?.dateCreation);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tatMasterStore.listTatMaster]);

    const onSubmitLibrary = async data => {};

    const handleFileChange = async (file: any) => {};

    const onUpdateSingleField = payload => {};

    const tableView = useMemo(
      () => (
        <TatMasterList
          data={tatMasterStore.listTatMaster || []}
          totalSize={tatMasterStore.listTatMasterCount}
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
      [tatMasterStore.tatMaster],
    );

    const checkExistsRecords = async (
      fields: any = tatMasterStore.tatMaster,
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
              <Grid cols={3}>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper label='RLab' hasError={!!errors.rLab}>
                        <select
                          value={value}
                          disabled={
                            isVersionUpgrade
                              ? true
                              : loginStore.login &&
                                loginStore.login.role !== 'ADMINISTRATOR'
                              ? true
                              : false
                          }
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.rLab ? 'border-red' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const rLab = e.target.value as string;
                            onChange(rLab);
                            tatMasterStore.updateTatMaster({
                              ...tatMasterStore.tatMaster,
                              rLab,
                            });
                          }}
                        >
                          <option>Select</option>
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
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper label='PLab' hasError={!!errors.pLab}>
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
                          displayValue={value}
                          data={{
                            list: labStore.listLabs?.filter(
                              item => item.status == 'A',
                            ),
                            displayKey: 'name',
                            findKey: 'name',
                          }}
                          hasError={!!errors.pLab}
                          onFilter={(value: string) => {
                            labStore.LabService.filter({
                              input: {
                                type: 'search',
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
                            tatMasterStore.updateTatMaster({
                              ...tatMasterStore.tatMaster,
                              pLab: item.code,
                            });
                            labStore.updateLabList(labStore.listLabsCopy);
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='pLab'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Registration Location'
                        hasError={!!errors.collectionCenter}
                      >
                        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          placeholder='Search by code or name'
                          data={{
                            list: registrationLocationsStore.listRegistrationLocations?.filter(
                              item => item.status == 'A',
                            ),
                            displayKey: ['locationCode', 'locationName'],
                          }}
                          displayValue={value}
                          hasError={!!errors.collectionCenter}
                          onFilter={(value: string) => {
                            registrationLocationsStore.registrationLocationsService.filterByFields(
                              {
                                input: {
                                  filter: {
                                    fields: ['locationCode', 'locationName'],
                                    srText: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              },
                            );
                          }}
                          onSelect={item => {
                            onChange(item.locationCode);
                            tatMasterStore.updateTatMaster({
                              ...tatMasterStore.tatMaster,
                              registrationLocation: item.locationCode,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='collectionCenter'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Tat Start Time'
                        placeholder={
                          errors.tatStartTime
                            ? 'Please Enter Tat Start Time'
                            : 'Tat Start Time'
                        }
                        hasError={!!errors.tatStartTime}
                        value={value}
                        onChange={tatStartTime => {
                          onChange(tatStartTime);
                          tatMasterStore.updateTatMaster({
                            ...tatMasterStore.tatMaster,
                            tatStartTime,
                          });
                        }}
                      />
                    )}
                    name='tatStartTime'
                    rules={{ required: true }}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Tat'
                        placeholder={errors.tat ? 'Please Enter Tat' : 'Tat'}
                        hasError={!!errors.tat}
                        value={value}
                        onChange={tat => {
                          onChange(tat);
                          tatMasterStore.updateTatMaster({
                            ...tatMasterStore.tatMaster,
                            tat,
                          });
                        }}
                      />
                    )}
                    name='tat'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        label='Tat Value'
                        placeholder={
                          errors.tatValue
                            ? 'Please Enter Tat Value'
                            : 'Tat Value'
                        }
                        hasError={!!errors.tatValue}
                        value={value}
                        onChange={tatValue => {
                          onChange(tatValue);
                          tatMasterStore.updateTatMaster({
                            ...tatMasterStore.tatMaster,
                            tatValue,
                          });
                        }}
                      />
                    )}
                    name='tatValue'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Units'
                        hasError={!!errors.parameter}
                      >
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.units ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const units = e.target.value;
                            onChange(units);
                            tatMasterStore.updateTatMaster({
                              ...tatMasterStore.tatMaster,
                              units,
                            });
                          }}
                        >
                          <option>Select</option>
                          {['Hours', 'Minutes'].map(
                            (item: any, index: number) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='units'
                    rules={{ required: false }}
                    defaultValue=''
                  />
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
                            tatMasterStore.updateTatMaster({
                              ...tatMasterStore.tatMaster,
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
                </List>
                <List direction='col' space={4} justify='stretch' fill>
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

export default TatMaster;
