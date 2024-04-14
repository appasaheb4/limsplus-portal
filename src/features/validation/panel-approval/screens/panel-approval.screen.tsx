import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Toast, MainPageHeading } from '@/library/components';
import { useForm } from 'react-hook-form';
import { RouterFlow } from '@/flows';
import {
  PanelApprovalList,
  PatientDemographicsList,
  ModalRecall,
} from '../components';
import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const PanelApproval = observer(() => {
  const { panelApprovalStore, routerStore, loginStore, patientResultStore } =
    useStores();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [data, setData] = useState<Array<any>>([]);
  const [receiptPath, setReceiptPath] = useState<string>();
  const [expandItem, setExpandItem] = useState<any>([]);
  const [tableReload, setTableReload] = useState<boolean>(false);
  const [selectId, setSelectId] = useState('');
  const [filterRecord, setFilterRecord] = useState<string>('');
  const [modalRecall, setModalRecall] = useState<{
    visible: boolean;
    data?: Array<any>;
  }>({
    visible: false,
    data: [],
  });

  useEffect(() => {
    const uniqueList = _.groupBy(
      panelApprovalStore.panelApprovalList,
      item => `${item.labId}-${item.panelCode}`,
    );
    if (uniqueList)
      setData(Object.keys(uniqueList).map(key => [key, uniqueList[key]]));
  }, [panelApprovalStore.panelApprovalList]);

  const updateRecords = payload => {
    const { type, data } = payload;
    switch (type) {
      case 'update': {
        panelApprovalStore.panelApprovalService
          .update({
            input: {
              ...data.fields,
              _id: data.id,
            },
          })
          .then((res: any) => {
            if (res.updatePanelApproval.success) {
              Toast.success({
                message: `😊 ${res.updatePanelApproval.message}`,
              });
              panelApprovalStore.panelApprovalService.listPanelApproval({});
              setTableReload(!tableReload);
            }
          });
        break;
      }
      case 'updateMany': {
        panelApprovalStore.panelApprovalService
          .update({
            input: {
              updateMany: {
                fields: data.rows,
                type: data.type,
              },
            },
          })
          .then((res: any) => {
            if (res.updatePanelApproval.success) {
              Toast.success({
                message: `😊 ${res.updatePanelApproval.message}`,
              });
              panelApprovalStore.panelApprovalService.listPanelApproval({});
              setTableReload(!tableReload);
            }
          });
        break;
      }
      case 'updateByIds': {
        panelApprovalStore.panelApprovalService
          .updateByIds({
            input: {
              ...data.fields,
              ids: data.ids,
            },
          })
          .then((res: any) => {
            if (res.updateByIdsPanelApproval.success) {
              Toast.success({
                message: `😊 ${res.updateByIdsPanelApproval.message}`,
              });
              panelApprovalStore.panelApprovalService.listPanelApproval({});
            }
          });
        break;
      }
    }
  };

  const updateResultRecords = (payload, id, patientResultId) => {
    panelApprovalStore.panelApprovalService
      .update({
        input: {
          result: payload?.result,
          _id: id,
        },
      })
      .then((res: any) => {
        if (res.updatePanelApproval.success) {
          patientResultStore.patientResultService
            .updateSingleFiled({
              input: {
                result: payload?.result,
                resultType: payload?.resultType,
                file: payload?.file,
                labId: payload?.labId,
                analyteCode: payload?.analyteCode,
                analyteName: payload?.analyteName,
                testStatus: payload?.testStatus,
                rangeType: payload?.rangeType,
                critical: payload?.critical,
                abnFlag: payload?.abnFlag,
                refRangesList: payload?.refRangesList,
                testCode: payload?.testCode,
                testName: payload?.testName,
                panelCode: payload?.panelCode,
                resultDate: payload?.resultDate,
                reportPriority: payload?.reportPriority,
                deliveryMode: payload?.deliveryMode,
                units: payload?.units,
                conclusion: payload?.conclusion,
                loNor: payload?.loNor,
                hiNor: payload?.hiNor,
                resultStatus: payload?.resultStatus,
                panelStatus: payload?.panelStatus,
                enteredBy: loginStore.login?.userId,
                _id: patientResultId,
                __v: undefined,
                flagUpdate: undefined,
              },
            })
            .then(res => {
              if (res.updatePatientResult.success) {
                Toast.success({
                  message: `😊 ${res.updatePatientResult.message}`,
                  timer: 2000,
                });
                panelApprovalStore.panelApprovalService.listPanelApproval({});
              }
            });
        }
      });
    setTableReload(!tableReload);
  };

  const panelApprovalTable = useMemo(
    () => (
      <PanelApprovalList
        data={data || []}
        totalSize={panelApprovalStore.panelApprovalListCount}
        selectedId={selectId}
        filterRecord={filterRecord}
        isView={RouterFlow.checkPermission(routerStore.userPermission, 'View')}
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
        isApproval={RouterFlow.checkPermission(
          routerStore.userPermission,
          'Approval',
        )}
        onSelectedRow={(rows, type) => {
          updateRecords({
            show: true,
            type: 'updateMany',
            data: { rows, type },
            title: 'Are you sure?',
            body: 'Update items!',
          });
        }}
        onUpdateFields={(fields: any, ids: string[]) => {
          updateRecords({
            show: true,
            type: 'updateByIds',
            data: { fields, ids },
            title: 'Are you sure?',
            body: 'Update items!',
          });
        }}
        onUpdateResult={(fields: any, id: string, patientResultId: string) => {
          updateResultRecords(fields, id, patientResultId);
        }}
        onExpand={items => {
          if (typeof items == 'object') {
            setSelectId(items?._id);
            setExpandItem([items]);
          } else {
            setExpandItem([]);
          }
        }}
        onPageSizeChange={(page, limit) => {
          panelApprovalStore.panelApprovalService.listPanelApproval({
            page,
            limit,
          });
        }}
        onFilter={(type, filter, page, limit) => {
          panelApprovalStore.panelApprovalService.filter({
            input: { type, filter, page, limit },
          });
        }}
        onRecheck={async (id: string, patientResultId: string) => {
          await patientResultStore.patientResultService
            .updateStatus({
              input: {
                filter: {
                  id,
                  patientResultId,
                  mode: 'reCheck',
                  approvalStatus: 'ReCheck',
                  isResultUpdate: false,
                },
              },
            })
            .then(res => {
              Toast.success({
                message: `😊 ${res.updateStatusPatientResult.message}`,
              });
              panelApprovalStore.panelApprovalService?.listPanelApproval({});
            });
        }}
        onRetest={async (id: string, patientResultId: string) => {
          await patientResultStore.patientResultService
            .updateStatus({
              input: {
                filter: {
                  id,
                  patientResultId,
                  mode: 'reTest',
                  approvalStatus: 'ReTest',
                  isResultUpdate: false,
                },
              },
            })
            .then(res => {
              Toast.success({
                message: `😊 ${res.updateStatusPatientResult.message}`,
              });
              panelApprovalStore.panelApprovalService?.listPanelApproval({});
            });
        }}
        onFilterRecord={async status => {
          if (status == 'ReCall') {
            let data = [];
            await panelApprovalStore.panelApprovalService
              .reCallList({ input: { filter: { type: 'fetch' } } })
              .then(res => {
                if (res.reCallPanelApproval?.success) {
                  data = res.reCallPanelApproval?.data;
                } else {
                  Toast.warning({
                    message: '😊 Delivery status pending not found',
                  });
                }
              });
            setModalRecall({ visible: true, data });
          } else if (status == 'All') {
            panelApprovalStore.panelApprovalService.listPanelApproval({
              isNotEqualToApproved: true,
            });
          } else {
            panelApprovalStore.panelApprovalService.find({
              input: { filter: { approvalStatus: status } },
            });
          }
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, tableReload, selectId, filterRecord],
  );

  return (
    <>
      <MainPageHeading
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        {panelApprovalTable}
        <span className='text-red hidden'>
          Note: Report Priority= Daily single-single update.
        </span>
      </div>
      {expandItem?.length > 0 && (
        <>
          <div className='p-1 rounded-lg shadow-xl overflow-auto mt-4'>
            <span className='font-bold text-lg underline'>
              Patient Demographics
            </span>
            <PatientDemographicsList
              data={expandItem || []}
              totalSize={expandItem.length}
            />
          </div>
        </>
      )}
      <ModalRecall
        {...modalRecall}
        onRecall={async (item: any) => {
          await panelApprovalStore.panelApprovalService
            .reCallList({ input: { filter: { ...item, type: 'update' } } })
            .then(res => {
              if (res.reCallPanelApproval?.success) {
                Toast.success({
                  message: `😊 ${res.reCallPanelApproval.message}`,
                });
                panelApprovalStore.panelApprovalService.listPanelApproval({
                  validationLevel: loginStore.login?.validationLevel,
                });
                setModalRecall({
                  ...modalRecall,
                  data: modalRecall.data?.filter(e => e._id != item?._id),
                });
              }
            });
        }}
        onClose={() => {
          setModalRecall({ visible: false });
        }}
      />
    </>
  );
});

export default PanelApproval;
