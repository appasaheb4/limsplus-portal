import React, {useState} from 'react';
import {observer} from 'mobx-react';
import dayjs from 'dayjs';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  List,
  ModalImportFile,
  Icons,
  ModalConfirm,
} from '@/library/components';
import * as XLSX from 'xlsx';
import {Styles} from '@/config';
import {FileImportExportList} from '../components';
import {useForm} from 'react-hook-form';
import {useStores} from '@/stores';
import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {CommonFileImportExportInputTable} from '../components';

const FileImportExport = observer(() => {
  const {
    loginStore,
    clientRegistrationStore,
    segmentMappingStore,
    routerStore,
  } = useStores();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [modalImportFile, setModalImportFile] = useState({});
  const [hideAddSegmentMapping, setHideAddSegmentMapping] =
    useState<boolean>(true);
  const [modalConfirm, setModalConfirm] = useState<any>();

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
      const data = XLSX.utils.sheet_to_json(ws, {header: 1});
      const defaultHeader: string[] = [
        'Country Name',
        'Lab ID',
        'Registration Date',
        'Client Code',
        'Client Name',
        'Patient Name',
        'Age',
        'Age Units',
        'Sex',
        'Test Name',
        'Test Code',
        'Sample',
        'Due Date',
        'Report Date',
        'Status',
        'PDF Report',
      ];
      const headers: any = [];
      const object: any = [];
      let fileImaport: boolean = false;
      // eslint-disable-next-line unicorn/no-array-for-each
      data.forEach((item: any, index: number) => {
        if (index === 0) {
          headers.push(item);
          if (JSON.stringify(headers[0]) !== JSON.stringify(defaultHeader))
            return alert('Please select correct file. Match all fields!');
        } else {
          if (JSON.stringify(headers[0]) === JSON.stringify(defaultHeader)) {
            if (item?.length > 0) {
              object.push({
                countryName: item[0],
                labId: Number.parseInt(item[1]),
                registrationDate: item[2]
                  ? new Date(
                      dayjs(
                        item[2].match(' - ')
                          ? item[2].split(' - ')[0]
                          : item[2],
                      ).format('YYYY-MM-DD'),
                    )
                  : new Date(),
                clientCode: item[3],
                clientName: item[4],
                patientName: item[5],
                age: Number.parseInt(item[6]),
                ageUnits: item[7],
                sex: item[8],
                testName: item[9],
                testCode: item[10],
                sample: item[11],
                dueDate: item[12]
                  ? new Date(
                      dayjs(
                        item[12].match(' - ')
                          ? item[12].split(' - ')[0]
                          : item[12],
                      ).format('YYYY-MM-DD'),
                    )
                  : new Date(),
                reportDate: item[13]
                  ? new Date(
                      dayjs(
                        item[13].match(' - ')
                          ? item[13].split(' - ')[0]
                          : item[13],
                      ).format('YYYY-MM-DD'),
                    )
                  : new Date(),
                status: item[14] || 'Reported',
                pdfReport: item[15],
              });
            }
            fileImaport = true;
          }
        }
      });
      if (fileImaport && object.length > 0) {
        clientRegistrationStore.clientRegistrationService
          .import({input: {filter: {object}}})
          .then(res => {
            if (res.importFileImportExport.success) {
              Toast.success({
                message: `😊 ${res.importFileImportExport.message}`,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          });
      }
    });
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      {RouterFlow.checkPermission(toJS(routerStore.userPermission), 'Add') && (
        <Buttons.ButtonCircleAddRemove
          show={hideAddSegmentMapping}
          onClick={status => setHideAddSegmentMapping(!hideAddSegmentMapping)}
        />
      )}

      <div className=' mx-auto flex-wrap'>
        <div className={'p-2 rounded-lg shadow-xl shown'}>
          <CommonFileImportExportInputTable />
          <List direction='row' space={3} align='center'>
            <Buttons.Button
              size='medium'
              type='outline'
              onClick={() => {
                setModalImportFile({
                  show: true,
                  title: 'Import excel file!',
                });
              }}
            >
              <Icons.EvaIcon
                icon='arrowhead-down-outline'
                size='medium'
                color={Styles.COLORS.BLACK}
              />
              Import File
            </Buttons.Button>
          </List>
        </div>
      </div>

      <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
        <FileImportExportList
          data={clientRegistrationStore.clientRegistrationList || []}
          totalSize={clientRegistrationStore.clientRegistrationCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
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
              body: 'Update item!',
            });
          }}
          onUpdateFields={(fields: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'updateFields',
              data: {fields, id},
              title: 'Are you sure?',
              body: 'Update records',
            });
          }}
          onPdfFileUpload={(fields, id) => {
            clientRegistrationStore.clientRegistrationService
              .update({
                input: {
                  ...fields,
                  _id: id,
                },
              })
              .then((res: any) => {
                if (res.updateFileImportExport.success) {
                  clientRegistrationStore.clientRegistrationService.list();
                  Toast.success({
                    message: `😊 ${res.updateFileImportExport.message}`,
                  });
                }
              });
          }}
          onPageSizeChange={(page, limit) => {
            clientRegistrationStore.clientRegistrationService.list(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            clientRegistrationStore.clientRegistrationService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {mode: 'filter', type, filter, page, limit};
          }}
        />
      </div>
      <ModalImportFile
        accept='.csv,.xlsx,.xls'
        {...modalImportFile}
        click={(file: any) => {
          setModalImportFile({show: false});
          handleFileUpload(file);
        }}
        close={() => {
          setModalImportFile({show: false});
        }}
      />

      <ModalConfirm
        {...modalConfirm}
        click={(action?: string) => {
          setModalConfirm({show: false});
          switch (action) {
            case 'delete': {
              clientRegistrationStore.clientRegistrationService
                .delete({input: {id: modalConfirm.id}})
                .then(res => {
                  if (res.removeFileImportExport.success) {
                    Toast.success({
                      message: `😊 ${res.removeFileImportExport.message}`,
                    });
                    if (global?.filter?.mode == 'pagination')
                      clientRegistrationStore.clientRegistrationService.list(
                        global?.filter?.page,
                        global?.filter?.limit,
                      );
                    else if (global?.filter?.mode == 'filter')
                      clientRegistrationStore.clientRegistrationService.filter({
                        input: {
                          type: global?.filter?.type,
                          filter: global?.filter?.filter,
                          page: global?.filter?.page,
                          limit: global?.filter?.limit,
                        },
                      });
                    else
                      clientRegistrationStore.clientRegistrationService.list();
                  }
                });

              break;
            }
            case 'update': {
              clientRegistrationStore.clientRegistrationService
                .update({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateFileImportExport.success) {
                    Toast.success({
                      message: `😊 ${res.updateFileImportExport.message}`,
                    });
                    if (global?.filter?.mode == 'pagination')
                      clientRegistrationStore.clientRegistrationService.list(
                        global?.filter?.page,
                        global?.filter?.limit,
                      );
                    else if (global?.filter?.mode == 'filter')
                      clientRegistrationStore.clientRegistrationService.filter({
                        input: {
                          type: global?.filter?.type,
                          filter: global?.filter?.filter,
                          page: global?.filter?.page,
                          limit: global?.filter?.limit,
                        },
                      });
                    else
                      clientRegistrationStore.clientRegistrationService.list();
                  }
                });

              break;
            }
            case 'updateFields': {
              clientRegistrationStore.clientRegistrationService
                .update({
                  input: {
                    ...modalConfirm.data.fields,
                    _id: modalConfirm.data.id,
                  },
                })
                .then((res: any) => {
                  if (res.updateFileImportExport.success) {
                    Toast.success({
                      message: `😊 ${res.updateFileImportExport.message}`,
                    });
                    if (global?.filter?.mode == 'pagination')
                      clientRegistrationStore.clientRegistrationService.list(
                        global?.filter?.page,
                        global?.filter?.limit,
                      );
                    else if (global?.filter?.mode == 'filter')
                      clientRegistrationStore.clientRegistrationService.filter({
                        input: {
                          type: global?.filter?.type,
                          filter: global?.filter?.filter,
                          page: global?.filter?.page,
                          limit: global?.filter?.limit,
                        },
                      });
                    else
                      clientRegistrationStore.clientRegistrationService.list();
                  }
                });

              break;
            }
          }
        }}
        onClose={() => {
          setModalConfirm({show: false});
        }}
      />
    </>
  );
});

export default FileImportExport;
