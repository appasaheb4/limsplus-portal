import React, {useState} from 'react';
import {observer} from 'mobx-react';
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
  Form,
} from '@/library/components';
import * as XLSX from 'xlsx';
import {Styles} from '@/config';
import {FileImportExportList} from '../components';
import {useStores} from '@/stores';
import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {useForm, Controller} from 'react-hook-form';
import {lookupItems, lookupValue} from '@/library/utils';
import {PreviewImportTable} from '../components';

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
  const [segmentMappingList, setSegmentMappingList] = useState<any>([]);
  const [previewRecords, setPreviewRecords] = useState<Array<any>>([]);

  const getSegmentMappingList = (dataFlow: string) => {
    segmentMappingStore.segmentMappingService
      .findByFields({
        input: {
          filter: {
            dataFlow,
          },
        },
      })
      .then(res => {
        if (res.findByFieldsSegmentMapping.success) {
          setSegmentMappingList(res.findByFieldsSegmentMapping.data);
        }
      });
  };

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
      const segmentMappings = segmentMappingList?.map(item => {
        return {
          elementName: item.elementName,
          elementSequence: item.elementSequence,
        };
      });
      const list: any[] = [];
      data.map(item => {
        const record = {};
        for (const [key, value] of Object.entries(item as any)) {
          const segmentDetails = segmentMappings.find(
            item => item.elementName == key,
          );
          Object.assign(record, {
            [key]: value,
            elementSequence: segmentDetails?.elementSequence,
          });
          list.push();
        }
        list.push(record);
      });
      setPreviewRecords(list);
    });
    reader.readAsBinaryString(file);
  };

  const upload = async (data: any) => {
    console.log({data});
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

      <div
        className={
          'flex flex-col items-center justify-center p-2 rounded-lg shadow-xl'
        }
      >
        <List direction='col' space={3} align='center'>
          <Form.InputWrapper
            label='Transfer Type'
            hasError={!!errors.transferType}
          >
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <select
                  value={value}
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.transferType ? 'border-red  ' : 'border-gray-300'
                  } rounded-md`}
                  onChange={e => {
                    const transferType = e.target.value;
                    onChange(transferType);
                    getSegmentMappingList(transferType);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(routerStore.lookupItems, 'TRANSFER_TYPE')?.map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    ),
                  )}
                </select>
              )}
              name='transferType'
              rules={{required: true}}
              defaultValue=''
            />
          </Form.InputWrapper>
          <Buttons.Button
            size='medium'
            type='outline'
            onClick={() => {
              if (segmentMappingList?.length == 0)
                return alert('Please select transfer type');
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

          <Buttons.Button
            size='medium'
            type='solid'
            onClick={handleSubmit(upload)}
          >
            <Icons.EvaIcon icon='plus-circle-outline' />
            {'Upload'}
          </Buttons.Button>
        </List>
        {previewRecords?.length > 0 && (
          <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
            <PreviewImportTable data={previewRecords} />
          </div>
        )}
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
