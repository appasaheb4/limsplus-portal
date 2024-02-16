import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Toast, Buttons, ModalConfirm, ImportFile } from '@/library/components';
import * as XLSX from 'xlsx';
import { FileImportExportList } from '../components';
import { useStores } from '@/stores';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { useForm } from 'react-hook-form';
import { PreviewImportTable } from '../components';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

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
    formState: { errors },
    setValue,
  } = useForm();
  const [isInputView, setInputView] = useState<boolean>(false);
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
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { raw: true });
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
      .create({ input: { ...importFromFileStore.fileImportExport } })
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
            <ImportFile
              accepts={['.csv', '.xlsx', '.xls']}
              onClick={file => {
                handleFileUpload(file[0]);
              }}
            />
          </div>
        )}

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
        {importFromFileStore.fileImportExportList?.length > 0 ? (
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
                .filterByFields({ input: { filter } })
                .then(res => {
                  console.log(res);
                });
            }}
            onClearFilter={() => {
              importFromFileStore.fileImportExportService.listFileImportExport();
            }}
            onSend={records => {
              const list = records.filter(n => n);
              const objDate: any = {
                birthDate: dayjs(),
                collectionDate: dayjs(),
              };
              list.map(item => {
                Object.entries(item).map((e: any) => {
                  if (e[1].field?.toLowerCase() == 'birthdate') {
                    Object.assign(objDate, { birthDate: e[1].value });
                  }
                  if (e[1].field?.toLowerCase() == 'collection date')
                    Object.assign(objDate, { collectionDate: e[1].value });
                });
              });
              if (
                !_.isEmpty(objDate.birthDate) &&
                objDate.birthDate?.split('-').length - 1 < 2
              ) {
                return Toast.error({
                  message: '😌 Please enter correctly birthrate',
                });
              }
              const date1 = dayjs(
                dayjs(objDate.birthDate, 'DD-MM-YYYY').toDate(),
              );
              const date2 = dayjs(
                dayjs(objDate.collectionDate, 'DD-MM-YYYY').toDate(),
              );
              const diffDay = date1.diff(date2, 'day');
              // console.log({ diffDay });
              if (diffDay > 0) {
                return Toast.error({
                  message:
                    '😌 Please enter correctly birthrate and collection date',
                });
              }
              patientManagerStore.patientManagerService
                .createPatientManagerByFileImportExport({
                  input: {
                    filter: list?.map(e => {
                      return { ...e, enteredBy: loginStore.login?.userId };
                    }),
                  },
                })
                .then(res => {
                  console.log({ res });
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
        ) : (
          <div className='flex justify-center'>
            <span className='font-bold text-lg'>
              Records not founds.Please add records ➕
            </span>
          </div>
        )}
      </div>
      <ModalConfirm
        {...modalConfirm}
        click={(action?: string) => {
          setModalConfirm({ show: false });
          switch (action) {
            case 'delete': {
              importFromFileStore.fileImportExportService
                .delete({ input: { id: modalConfirm.id } })
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
          setModalConfirm({ show: false });
        }}
      />
    </>
  );
});
