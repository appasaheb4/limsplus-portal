/* eslint-disable */
import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Toast, ModalConfirm, MainPageHeading } from '@/library/components';
import { FilterInputTable, GeneralResultEntryList } from '../components';
import { RouterFlow } from '@/flows';
import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';
import './ruler.css';

const GeneralResultEntry = observer(() => {
  const {
    loginStore,
    routerStore,
    patientResultStore,
    generalResultEntryStore,
    appStore,
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
              patientResultStore.patientResultService.listPatientResultNotFinished(
                {
                  ...generalResultEntryStore.filterGeneralResEntry,
                  isAll: false,
                },
              );
            } else if (finishResult == 'P') {
              patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                {
                  ...generalResultEntryStore.filterGeneralResEntry,
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

      <div className='ruler'>
        <ul className='ruler-x'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul className='ruler-y'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <form id='app' className='editor'>
          <fieldset>
            <legend>
              Tall Ticks <em>Numbers align with this</em>
            </legend>
            <label>
              <strong>Height</strong>
              <input
                type='range'
                name='--ruler2-h'
                min='3'
                max='100'
                value='20'
                data-suffix='px'
              />
            </label>
            <label>
              <strong>Border-width</strong>
              <input
                type='range'
                name='--ruler2-bdw'
                min='1'
                max='10'
                value='1'
                data-suffix='px'
              />
            </label>
            <label>
              <strong>Spacing</strong>
              <input
                type='range'
                name='--ruler2-space'
                min='1'
                max='200'
                value='50'
              />
            </label>
            <label>
              <strong>Color</strong>
              <input type='color' name='--ruler2-c' value='#BBBBBB' />
            </label>
          </fieldset>

          <fieldset>
            <legend>Low Ticks</legend>
            <label>
              <strong>Height</strong>
              <input
                type='range'
                name='--ruler1-h'
                min='3'
                max='100'
                value='8'
                data-suffix='px'
              />
            </label>
            <label>
              <strong>Border-width</strong>
              <input
                type='range'
                name='--ruler1-bdw'
                min='1'
                max='10'
                value='1'
                data-suffix='px'
              />
            </label>
            <label>
              <strong>Spacing</strong>
              <input
                type='range'
                name='--ruler1-space'
                min='1'
                max='100'
                value='5'
              />
            </label>
            <label>
              <strong>Color</strong>
              <input type='color' name='--ruler1-c' value='#BBBBBB' />
            </label>
          </fieldset>

          <fieldset>
            <legend>Other Options</legend>
            <label>
              <strong>Unit</strong>
              <select name='--ruler-unit'>
                <option value='1mm'>millimeter</option>
                <option value='1in'>inch</option>
                <option value='1px' selected>
                  pixel
                </option>
                <option value='1em'>em</option>
                <option value='1ch'>character</option>
                <option value='1rem'>rem</option>
                <option value='1vw'>viewport width</option>
                <option value='1vh'>viewport height</option>
              </select>
            </label>
            <label>
              <strong>Number Color</strong>
              <input type='color' name='--ruler-num-c' value='#888' />
            </label>
            <label>
              <strong>Show x-axis</strong>
              <input type='checkbox' name='--ruler-x' value='1' checked />
            </label>
            <label>
              <strong>Show y-axis</strong>
              <input type='checkbox' name='--ruler-y' value='1' checked />
            </label>
          </fieldset>
        </form>
      </div>

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
    </>
  );
});

export default GeneralResultEntry;
