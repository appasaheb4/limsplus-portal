/* eslint-disable */
import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  ModalConfirm,
  MainPageHeading,
} from '@/library/components';
import { FilterInputTable, GeneralResultEntryList } from '../components';

import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';

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
                      testCode:
                        generalResultEntryStore.filterGeneralResEntry?.testCode,
                      finishResult: 'P',
                    },
                  );
                  setTableReload(!tableReload);
                }
              });
          }}
          onFilterFinishResult={async finishResult => {
            if (finishResult === '') {
              generalResultEntryStore.updateFilterGeneralResEntry({
                ...generalResultEntryStore.filterGeneralResEntry,
                pLab: '',
                departement: '',
                testStatus: '',
                resultStatus: '',
                testCode: '',
                analyteCode: '',
                labId: '',
                finishResult: '',
              });
              patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                {
                  pLab: loginStore.login?.lab,
                  testCode:
                    generalResultEntryStore.filterGeneralResEntry?.testCode,
                  finishResult: 'P',
                },
              );
            } else
              generalResultEntryStore.updateFilterGeneralResEntry({
                ...generalResultEntryStore.filterGeneralResEntry,
                finishResult,
              });
            const input = _.pickBy(
              {
                ...generalResultEntryStore.filterGeneralResEntry,
                finishResult,
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              function (value, key) {
                return !(value === undefined || value === null || value === '');
              },
            );
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
          }}
          onTestStatusFilter={item => {
            generalResultEntryStore.updateFilterGeneralResEntry({
              ...generalResultEntryStore.filterGeneralResEntry,
              testStatus: item,
            });
            const input = _.pickBy(
              {
                ...generalResultEntryStore.filterGeneralResEntry,
                testStatus: item,
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              function (value, key) {
                return !(value === undefined || value === null || value === '');
              },
            );
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
          }}
        />
      </>
    ),
    [patientResultStore.patientResultListNotAutoUpdate, tableReload],
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
        },
      })
      .then(res => {
        if (res.updatePatientResult.success) {
          Toast.success({
            message: `😊 ${res.updatePatientResult.message}`,
            timer: 2000,
          });
          // if (!generalResultEntryStore.filterGeneralResEntry)
          //   patientResultStore.patientResultService.listPatientResult({
          //     pLab: loginStore.login?.lab,
          //     finishResult: 'P',
          //   });
          // else
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
                  // if (!generalResultEntryStore.filterGeneralResEntry)
                  //   patientResultStore.patientResultService.listPatientResult({
                  //     pLab: loginStore.login?.lab,
                  //     finishResult: 'P',
                  //   });
                  // else
                  patientResultStore.patientResultService.patientListForGeneralResultEntry(
                    {
                      input: {
                        filter: {
                          ...generalResultEntryStore.filterGeneralResEntry,
                          // panelStatus: 'P',
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
