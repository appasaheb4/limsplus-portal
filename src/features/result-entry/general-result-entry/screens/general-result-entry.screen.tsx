/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Toast, ModalConfirm, MainPageHeading } from '@/library/components';
import { FilterInputTable, GeneralResultEntryList } from '../components';
import { RouterFlow } from '@/flows';
import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

export type tabs = 'Pending' | 'Done';

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
  const [tabSelected, setTabSelected] = useState<tabs>('Pending');
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
          tabSelected={tabSelected}
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
          onResultUpdateBatch={updatedRecords => {
            resultUpdateBatch(updatedRecords);
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
          onFinishResult={async ids => {
            await patientResultStore.patientResultService
              .updateFinishResultStatus({
                input: {
                  filter: {
                    ids,
                    fields: { finishResult: 'D', isResultUpdate: true },
                  },
                },
              })
              .then(res => {
                if (res.updateFinishResultFieldsByIdsPatientResult?.success) {
                  Toast.success({
                    message: `😊 ${res.updateFinishResultFieldsByIdsPatientResult.message}`,
                  });
                  patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                    {
                      ...generalResultEntryStore.filterGeneralResEntry,
                      finishResult: 'P',
                      panelStatus: 'P',
                      testStatus: 'P',
                    },
                  );
                  setTableReload(!tableReload);
                }
              });
          }}
          onFilterFinishResult={async finishResult => {
            if (finishResult === '') {
              patientResultStore.patientResultService.listPatientResultNotFinished(
                {
                  ...generalResultEntryStore.filterGeneralResEntry,
                  isAll: true,
                },
              );
            } else if (finishResult === 'D') {
              patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                {
                  pLab: generalResultEntryStore.filterGeneralResEntry.pLab,
                  finishResult: { $nin: ['D', 'RC', 'RT'] },
                  panelStatus: { $ne: 'P' },
                  testStatus: { $ne: 'P' },
                  resultStatus: { $ne: 'P' },
                },
              );
            } else if (finishResult == 'P') {
              patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                {
                  pLab: generalResultEntryStore.filterGeneralResEntry.pLab,
                  finishResult: 'P',
                  panelStatus: 'P',
                  testStatus: 'P',
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
            generalResultEntryStore.updateFilterGeneralResEntry({
              ...generalResultEntryStore.filterGeneralResEntry,
            });
          }}
          onTestStatusFilter={testStatus => {
            const input = _.pickBy({
              ...generalResultEntryStore.filterGeneralResEntry,
              testStatus,
            });
            patientResultStore.patientResultService.filterPatientResultListGRETestStatus(
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
            generalResultEntryStore.updateFilterGeneralResEntry({
              ...generalResultEntryStore.filterGeneralResEntry,
            });
          }}
          onExpand={items => {
            setSelectId(items?._id);
            if (_.isEmpty(items?._id)) {
              setModalPatientDemographics({ show: false });
            } else {
              setModalPatientDemographics({
                show: true,
                data: [items],
              });
            }
          }}
          onTableReload={() => {
            setTableReload(!tableReload);
          }}
          selectedRowData={modalPatientDemographics?.data}
          onPageSizeChange={(page, limit) => {
            patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
              page,
              limit,
            );
          }}
          onTabSelected={(tab: tabs) => {
            setTabSelected(tab);
          }}
          // isInputScreenHide={isInputScreenHide}
          // setIsInputScreenHide={setIsInputScreenHide}
        />
      </>
    ),
    [patientResultStore.patientResultListNotAutoUpdate, tableReload, selectId],
  );

  useEffect(() => {
    let input: object = {};
    if (tabSelected == 'Pending') {
      input = {
        pLab: loginStore?.login?.lab,
        finishResult: 'P',
        panelStatus: 'P',
        testStatus: 'P',
      };
    } else {
      input = {
        pLab: loginStore?.login?.lab,
        finishResult: { $nin: ['D', 'RC', 'RT'] },
        panelStatus: { $ne: 'P' },
        testStatus: { $ne: 'P' },
        resultStatus: { $ne: 'P' },
      };
    }
    patientResultStore.patientResultService
      .getPatientResultDistinct({
        input: {
          filter: {
            ...input,
          },
        },
      })
      .then(res => {});
  }, [tabSelected]);

  const resultUpdateBatch = payload => {
    patientResultStore.patientResultService
      .updateBatchRecords({
        input: { payload },
      })
      .then(res => {
        if (res.updateBatchRecordsPatientResult.success) {
          Toast.success({
            message: `😊 ${res.updateBatchRecordsPatientResult.message}`,
            timer: 2000,
          });
          patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
            {
              ...generalResultEntryStore.filterGeneralResEntry,
              finishResult: 'P',
              panelStatus: 'P',
              testStatus: 'P',
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
        <FilterInputTable
          data={patientResultStore.distinctPatientResult}
          onFilter={(filter, filterType) => {
            generalResultEntryStore.updateFilterGeneralResEntry({
              ...generalResultEntryStore.filterGeneralResEntry,
              ...filter,
            });
            let input: object = {};
            if (tabSelected == 'Pending') {
              input = {
                ...generalResultEntryStore.filterGeneralResEntry,
                ...filter,
                filterType,
                finishResult: 'P',
                panelStatus: 'P',
                testStatus: 'P',
              };
            } else {
              input = {
                ...generalResultEntryStore.filterGeneralResEntry,
                ...filter,
                filterType,
                finishResult: { $nin: ['D', 'RC', 'RT'] },
                panelStatus: { $ne: 'P' },
                testStatus: { $ne: 'P' },
                resultStatus: { $ne: 'P' },
              };
            }
            patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
              {
                ...input,
              },
            );
          }}
        />
      </div>

      <div className='p-2 rounded-lg shadow-xl'>{tableView}</div>
      <ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          setModalConfirm({ show: false });
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
    </>
  );
});

export default GeneralResultEntry;
