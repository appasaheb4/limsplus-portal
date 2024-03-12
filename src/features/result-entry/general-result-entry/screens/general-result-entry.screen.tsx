/* eslint-disable */
import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Toast, ModalConfirm, MainPageHeading } from '@/library/components';
import {
  FilterInputTable,
  GeneralResultEntryList,
  ModalPatientDemographics,
} from '../components';
import { RouterFlow } from '@/flows';
import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const GeneralResultEntry = observer(() => {
  const {
    loginStore,
    routerStore,
    patientResultStore,
    generalResultEntryStore,
  } = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>();
  const [tableReload, setTableReload] = useState<boolean>(false);
  const [selectId, setSelectId] = useState('');
  const [modalPatientDemographics, setModalPatientDemographics] = useState<any>(
    { show: false },
  );

  const tableView = useMemo(
    () => (
      <>
        <GeneralResultEntryList
          data={
            patientResultStore.patientResultListNotAutoUpdate?.map(
              (item, index) => {
                return { ...item, index: index + 1 };
              },
            ) || []
          }
          totalSize={patientResultStore.patientResultListNotAutoUpdateCount}
          selectedId={selectId}
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
          onUpdateValue={(item, id) => {
            const updated =
              patientResultStore.patientResultListNotAutoUpdate?.map(
                (e: any) => {
                  if (e._id === id)
                    return {
                      ...e,
                      ...item,
                      flagUpdate: true,
                      refRangesList: e.refRangesList?.map(item => {
                        return {
                          ...item,
                          updateDate: new Date(),
                        };
                      }),
                    };
                  else return e;
                },
              );
            patientResultStore.updatePatientResultNotAutoUpdate(updated);
          }}
          onSaveFields={async (updatedRecords, id, type) => {
            if (type == 'directSave') {
              updateRecords(id, updatedRecords);
            } else {
              setModalConfirm({
                show: true,
                type: 'save',
                id: id,
                data: updatedRecords,
                title: 'Are you sure?',
                body: `Do you want to update this record?`,
              });
            }
          }}
          onUpdateFields={(fields, id) => {
            setModalConfirm({
              show: true,
              type: 'updateFields',
              id: id,
              data: fields,
              title: 'Are you sure?',
              body: `Do you want to update this record?`,
            });
          }}
          onPageSizeChange={(page, limit) => {
            patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
              page,
              limit,
            );
          }}
          onFinishResult={async ids => {
            await patientResultStore.patientResultService
              .updateFinishResultStatus({
                input: { filter: { ids, fields: { finishResult: 'D' } } },
              })
              .then(res => {
                if (res.updateFinishResultFieldsByIdsPatientResult?.success) {
                  Toast.success({
                    message: `😊 ${res.updateFinishResultFieldsByIdsPatientResult.message}`,
                  });
                  patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                    {
                      pLab: loginStore.login?.lab,
                      // testCode:
                      //   generalResultEntryStore.filterGeneralResEntry?.testCode,
                      finishResult: 'P',
                    },
                  );
                  setTableReload(!tableReload);
                }
              });
          }}
          onFilterFinishResult={async finishResult => {
            if (finishResult === '') {
              patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                {
                  pLab: generalResultEntryStore.filterGeneralResEntry?.pLab,
                },
              );
            } else {
              const input = _.pickBy({
                ...generalResultEntryStore.filterGeneralResEntry,
                finishResult,
              });
              patientResultStore.patientResultService.patientListForGeneralResultEntry(
                {
                  input: {
                    filter: {
                      ...input,
                    },
                    page: 0,
                    limit: 10,
                  },
                },
              );
            }
          }}
          onTestStatusFilter={testStatus => {
            const input = _.pickBy({
              ...generalResultEntryStore.filterGeneralResEntry,
              testStatus,
            });
            if (testStatus != '') {
              patientResultStore.patientResultService.patientListForGeneralResultEntry(
                {
                  input: {
                    filter: {
                      ...input,
                    },
                    page: 0,
                    limit: 10,
                  },
                },
              );
              patientResultStore.filterDistinctPatientResult(
                patientResultStore.distinctPatientResultCopy,
              );
            } else {
              patientResultStore.patientResultService.findNotEqualToResult({
                input: {
                  filter: {
                    ...input,
                    testStatus: undefined,
                    notEqualToKey: 'testStatus',
                    notEqualToValue: 'P',
                  },
                  page: 0,
                  limit: 10,
                },
              });
            }
            // generalResultEntryStore.updateFilterGeneralResEntry({
            //   ...generalResultEntryStore.filterGeneralResEntry,
            //   testStatus: item,
            // });
          }}
          onExpand={items => {
            setSelectId(items._id);
            if (_.isEmpty(items._id)) {
              setModalPatientDemographics({ show: false });
            } else {
              setModalPatientDemographics({
                show: true,
                data: [items],
              });
            }
          }}
        />
      </>
    ),
    [patientResultStore.patientResultListNotAutoUpdate, tableReload, selectId],
  );

  const updateRecords = (id, data) => {
    patientResultStore.patientResultService
      .updateSingleFiled({
        input: {
          ...data,
          enteredBy: loginStore.login?.userId,
          resultDate: new Date(),
          _id: id,
          __v: undefined,
          flagUpdate: undefined,
          testReportOrder: undefined,
          analyteReportOrder: undefined,
          selectedId: undefined,
        },
      })
      .then(res => {
        if (res.updatePatientResult.success) {
          Toast.success({
            message: `😊 ${res.updatePatientResult.message}`,
            timer: 2000,
          });
          patientResultStore.patientResultService.patientListForGeneralResultEntry(
            {
              input: {
                filter: {
                  pLab: generalResultEntryStore.filterGeneralResEntry?.pLab,
                  finishResult: 'P',
                },
                page: 0,
                limit: 10,
              },
            },
          );
        }
      });
    setTableReload(!tableReload);
  };

  return (
    <>
      <MainPageHeading
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />
      <div className='mx-auto flex-wrap'>
        <FilterInputTable />
      </div>
      <div className='p-2 rounded-lg shadow-xl overflow-auto'>{tableView}</div>
      <ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          setModalConfirm({ show: false });
          if (type === 'save') {
            updateRecords(modalConfirm.id, modalConfirm.data);
          }
          if (type == 'updateFields') {
            patientResultStore.patientResultService
              .updateByFields({
                input: {
                  fields: modalConfirm.data,
                  condition: { _id: modalConfirm.id },
                },
              })
              .then(res => {
                if (res.updateByFieldsPatientResult.success) {
                  Toast.success({
                    message: `😊 ${res.updateByFieldsPatientResult.message}`,
                    timer: 2000,
                  });
                  patientResultStore.patientResultService.patientListForGeneralResultEntry(
                    {
                      input: {
                        filter: {
                          ...generalResultEntryStore.filterGeneralResEntry,
                          finishResult: 'P',
                        },
                        page: 0,
                        limit: 10,
                      },
                    },
                  );
                }
              });
          }
        }}
        onClose={() => {
          setModalConfirm({ show: false });
        }}
      />
      <ModalPatientDemographics
        {...modalPatientDemographics}
        onClose={() => {
          setSelectId('');
          setModalPatientDemographics({ show: false });
        }}
      />
    </>
  );
});

export default GeneralResultEntry;
