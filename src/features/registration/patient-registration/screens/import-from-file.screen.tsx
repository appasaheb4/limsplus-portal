import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {
  Toast,
  Buttons,
  ModalConfirm,
  Form,
  ImportFile,
} from '@/library/components';
import * as XLSX from 'xlsx';
import {FileImportExportList} from '../components';
import {useStores} from '@/stores';
import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {useForm, Controller} from 'react-hook-form';
import {lookupItems, lookupValue} from '@/library/utils';
import {PreviewImportTable} from '../components';

export const FileImportExport = observer(() => {
  const {
    loginStore,
    clientRegistrationStore,
    segmentMappingStore,
    routerStore,
    importFromFileStore,
    patientManagerStore,
  } = useStores();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [isInputView, setInputView] = useState<boolean>(false);
  const [modalImportFile, setModalImportFile] = useState({});

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

  useEffect(() => {
    setValue('transferType', importFromFileStore.fileImportExport.transferType);
    getSegmentMappingList(importFromFileStore.fileImportExport.transferType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importFromFileStore.fileImportExport]);

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
        }
        list.push(record);
      });
      setPreviewRecords(list);
    });
    reader.readAsBinaryString(file);
  };

  const onUpload = () => {
    importFromFileStore.fileImportExportService
      .create({input: {...importFromFileStore.fileImportExport}})
      .then(res => {
        if (res.createFileImportExport.success) {
          Toast.success({
            message: `😊 ${res.createFileImportExport.message}`,
          });
          setInputView(false);
          setPreviewRecords([]);
          importFromFileStore.fileImportExportService.listFileImportExport(
            importFromFileStore.defaultValue.transferType,
          );
        }
      });
  };

  return (
    <>
      <div
        className={
          'flex flex-col items-center justify-center p-2 rounded-lg shadow-xl gap-2 ' +
          (isInputView ? 'shown' : 'hidden')
        }
      >
        {previewRecords?.length == 0 && (
          <div className='flex flex-col items-center gap-2 mb-4'>
            <div className='flex flex-wrap'>
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
                        importFromFileStore.updateFileImpExport({
                          ...importFromFileStore.fileImportExport,
                          transferType,
                        });
                        if (isInputView) getSegmentMappingList(transferType);
                        importFromFileStore.fileImportExportService.listFileImportExport(
                          transferType,
                        );
                        importFromFileStore.updateDefaultValue({
                          ...importFromFileStore.defaultValue,
                          transferType,
                        });
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
                        'TRANSFER_TYPE',
                      )?.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  )}
                  name='transferType'
                  rules={{required: true}}
                  defaultValue=''
                />
              </Form.InputWrapper>
            </div>

            <ImportFile
              accepts={['.csv', '.xlsx', '.xls']}
              onClick={file => {
                console.log({file});
                handleFileUpload(file[0]);
              }}
            />
          </div>
        )}
        {/* <List direction='col' space={3} align='center'>
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
            Save
          </Buttons.Button>
        </List> */}
        {previewRecords?.length > 0 && (
          <div className='w-full'>
            <PreviewImportTable
              arrData={previewRecords}
              onUpload={records => {
                importFromFileStore.updateFileImpExport({
                  ...importFromFileStore.fileImportExport,
                  records,
                });
                onUpload();
              }}
            />
          </div>
        )}
      </div>

      {RouterFlow.checkPermission(toJS(routerStore.userPermission), 'Add') && (
        <Buttons.ButtonCircleAddRemove
          show={!isInputView}
          onClick={status => setInputView(!isInputView)}
        />
      )}

      <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
        <FileImportExportList
          data={importFromFileStore.fileImportExportList || []}
          totalSize={{
            ...importFromFileStore.defaultValue,
            count: importFromFileStore.fileImportExportListCount,
          }}
          onPagination={type => {
            let page = importFromFileStore.defaultValue.page;
            if (type == 'next') {
              page = page + 1;
            } else {
              page = page - 1;
            }
            importFromFileStore.updateDefaultValue({
              ...importFromFileStore.defaultValue,
              page,
            });
            importFromFileStore.fileImportExportService.listFileImportExport(
              importFromFileStore.defaultValue.transferType,
              page,
            );
          }}
          onDelete={ids => {
            setModalConfirm({
              show: true,
              type: 'delete',
              id: ids,
              title: 'Are you delete records?',
              body: 'Record delete permanently',
            });
          }}
          onFilter={filter => {
            importFromFileStore.fileImportExportService
              .filterByFields({input: {filter}})
              .then(res => {
                console.log(res);
              });
          }}
          onClearFilter={() => {
            importFromFileStore.fileImportExportService.listFileImportExport();
          }}
          onSend={records => {
            const list = records.filter(n => n);
            patientManagerStore.patientManagerService
              .createPatientManagerByFileImportExport({
                input: {
                  filter: list?.map(e => {
                    return {...e, enteredBy: loginStore.login?.userId};
                  }),
                },
              })
              .then(res => {
                if (res.createByFileImportExportPatientManager.success) {
                  Toast.success({
                    message: `😊 ${res.createByFileImportExportPatientManager.message}`,
                  });
                  importFromFileStore.fileImportExportService.listFileImportExport();
                } else {
                  Toast.error({
                    message: `😌 ${res.createByFileImportExportPatientManager.message}`,
                  });
                }
              })
              .catch(error => {
                Toast.error({
                  message: '😌 Please enter correctly data like birthrate',
                });
              });
          }}
        />
      </div>
      <ModalConfirm
        {...modalConfirm}
        click={(action?: string) => {
          setModalConfirm({show: false});
          switch (action) {
            case 'delete': {
              importFromFileStore.fileImportExportService
                .delete({input: {id: modalConfirm.id}})
                .then(res => {
                  if (res.removeFileImportExport.success) {
                    Toast.success({
                      message: `😊 ${res.removeFileImportExport.message}`,
                    });
                    importFromFileStore.fileImportExportService.listFileImportExport(
                      importFromFileStore.defaultValue.transferType,
                    );
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
          }
        }}
        close={() => {
          setModalConfirm({show: false});
        }}
      />
    </>
  );
});
