import React, { useState, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Toast,
} from '@/library/components';
import { useForm } from 'react-hook-form';
import { RouterFlow } from '@/flows';
import {
  ReportDeliveryList,
  OrderDeliveredList,
  ModalGenerateReports,
} from '../components';
import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';
import MainPageHeadingComponents from '@/library/components/atoms/header/main.page.heading.components';

const DeliveryQueue = observer(() => {
  const { deliveryQueueStore, routerStore, loginStore, reportSettingStore } =
    useStores();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [modalGenerateReports, setModalGenerateReports] = useState<any>();
  const [selectId, setSelectId] = useState('');
  const [reloadTable, setReloadTable] = useState<boolean>(false);
  const [holdRecord, setHoldRecord] = useState<string>('');

  const getDeliveryList = () => {
    const loginDetails = loginStore.login;
    if (loginDetails?.role == 'CORPORATE_PORTAL') {
      deliveryQueueStore.deliveryQueueService
        .findByFields({
          input: {
            filter: {
              clientCode: loginDetails.lab,
            },
          },
        })
        .then(res => {
          if (res.findByFieldsDeliveryQueue.success) {
            deliveryQueueStore.updateReportDeliveryList({
              deliveryQueues: {
                data: res.findByFieldsDeliveryQueue?.data,
                paginatorInfo: {
                  count: res.findByFieldsDeliveryQueue?.data?.length,
                },
              },
            });
          }
        });
      return;
    } else {
      deliveryQueueStore.deliveryQueueService.listDeliveryQueue();
      return;
    }
  };

  useEffect(() => {
    getDeliveryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValue = value =>
    typeof value === 'string' ? value?.toUpperCase() : value;

  const filterPlainArray = (array, filters) => {
    const filterKeys = Object.keys(filters);
    // console.log({filterKeys});
    return array.filter(item => {
      return filterKeys.every(key => {
        console.log({ key });
        if (!filters[key].length) return true;
        return filters[key].find(
          filter => getValue(filter) === getValue(item[key]),
        );
      });
    });
  };

  const getReportDeliveryList = arr => {
    const list: any = [];
    const grouped = _.groupBy(arr, 'reportPriority');
    if (grouped?.Progressive) {
      const allProgressive: any = grouped?.Progressive;
      const result = _.map(
        _.groupBy(allProgressive, function (item) {
          return item.labId && item.panelCode;
        }),
        g => _.maxBy(g, 'deliveryId'),
      );
      list.push(...result);
    }
    if (grouped['All Together']) {
      const arrAllTogather: any = grouped['All Together'];
      const result = _.map(_.groupBy(arrAllTogather, 'labId'), g =>
        _.maxBy(g, 'deliveryId'),
      );
      list.push(...result);
    }
    if (grouped['One Today']) {
      const arrOneToday: any = grouped['One Today'];
      const result: any = _.map(
        _.groupBy(arrOneToday, function (item) {
          return item.labId && item.approvalDate;
        }),
      );
      result?.filter(item => {
        if (item?.find(o => o?.reportType == 'Final')) {
          list.push(item?.find(o => o?.reportType == 'Final'));
        } else {
          list.push(
            ..._.map(
              _.groupBy(item, function (o) {
                return o.labId && o.approvalDate;
              }),
              g => _.maxBy(g, 'deliveryId'),
            ),
          );
        }
      });
    }
    if (grouped.Daily) {
      const arrDaily: any = grouped.Daily;
      const result: any = _.map(
        _.groupBy(arrDaily, function (item) {
          return item.labId && item.approvalDate;
        }),
      );
      result?.filter(item => {
        if (item?.find(o => o?.reportType == 'Final')) {
          list.push(item?.find(o => o?.reportType == 'Final'));
        } else {
          list.push(
            ..._.map(
              _.groupBy(item, function (o) {
                return o.labId && o.approvalDate;
              }),
              g => _.maxBy(g, 'deliveryId'),
            ),
          );
        }
      });
    }
    return list;
  };

  const getOrderDeliveredList = async (item: any) =>
    new Promise<any>((resolve, reject) => {
      let filter: any = {};
      if (item.reportPriority == 'Progressive') {
        filter = {
          labId: item.labId,
          panelCode: item.panelCode,
        };
      } else if (
        (item.reportPriority == 'One Today' ||
          item.reportPriority == 'Daily') &&
        item.reportType == 'Interim'
      ) {
        filter = {
          labId: item.labId,
          reportType: 'Interim',
          approvalDate: item?.approvalDate,
        };
      } else {
        filter = {
          labId: item.labId,
        };
      }
      deliveryQueueStore.deliveryQueueService
        .findByFields({
          input: {
            filter,
          },
        })
        .then(res => {
          if (res.findByFieldsDeliveryQueue.success) {
            let data = res.findByFieldsDeliveryQueue.data;
            data = _.unionBy(data, (o: any) => {
              return o.patientResultId;
            });
            data = _.orderBy(data, 'deliveryId', 'desc');
            resolve(data);
          }
        });
    });

  const updateRecords = async (payload: any) => {
    const { type, id, visitId, ids } = payload;
    if (type == 'cancel' || type == 'hold' || type == 'done') {
      await deliveryQueueStore.deliveryQueueService
        .updateDeliveryQueue({
          input: {
            _id: id,
            visitId: visitId,
            deliveryStatus:
              type == 'cancel' ? 'Cancel' : type == 'hold' ? 'Hold' : 'Done',
          },
        })
        .then(res => {
          if (res.updateDeliveryQueue.success) {
            Toast.success({
              message: `😊 ${res.updateDeliveryQueue.message}`,
            });
          }
        });
    } else {
      await deliveryQueueStore.deliveryQueueService
        .updateDeliveryQueueByVisitIds({
          input: {
            filter: {
              ids: ids,
              visitId: visitId,
              deliveryStatus: 'Done',
            },
          },
        })
        .then(res => {
          if (res.updateByVisitIdsDeliveryQueue.success) {
            Toast.success({
              message: `😊 ${res.updateByVisitIdsDeliveryQueue.message}`,
            });
          }
        });
    }
    if (global?.filter?.mode == 'pagination') {
      deliveryQueueStore.deliveryQueueService.listDeliveryQueue(
        global?.filter?.pageNo,
        100,
      );
    } else if (global?.filter?.mode == 'filter') {
      deliveryQueueStore.deliveryQueueService.filter({
        input: {
          type: global?.filter?.type,
          filter: global?.filter?.filter,
          page: global?.filter?.page,
          limit: global?.filter?.limit,
        },
      });
    } else {
      deliveryQueueStore.deliveryQueueService.listDeliveryQueue();
    }
    setReloadTable(!reloadTable);
  };

  const reportDeliveryList = useMemo(
    () => (
      <ReportDeliveryList
        data={
          getReportDeliveryList(deliveryQueueStore.reportDeliveryList) || []
        }
        totalSize={
          getReportDeliveryList(deliveryQueueStore.reportDeliveryList)?.length
        }
        isPagination={loginStore.login?.role == 'SYSADMIN' ? true : false}
        selectedId={selectId}
        holdRecord={holdRecord}
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
        isGenerateReport={RouterFlow.checkPermission(
          routerStore.userPermission,
          'Generate Report',
        )}
        isHold={RouterFlow.checkPermission(routerStore.userPermission, 'Hold')}
        isCancel={RouterFlow.checkPermission(
          routerStore.userPermission,
          'Cancel',
        )}
        isReport={RouterFlow.checkPermission(
          routerStore.userPermission,
          'Report',
        )}
        onUpdate={selectedItem => updateRecords(selectedItem)}
        onFilter={(type, filter, page, limit) => {
          global.filter = {
            mode: 'filter',
            type,
            filter,
            page,
            limit,
          };
          if (loginStore.login?.role == 'SYSADMIN') {
            deliveryQueueStore.deliveryQueueService.filter({
              input: { type, filter, page, limit },
            });
          } else {
            if (type == 'filter') {
              console.log({
                list: filterPlainArray(
                  deliveryQueueStore.reportDeliveryListCopy,
                  filter,
                ),
              });
            } else {
              if (filter.srText == '') {
                return deliveryQueueStore.updateReportDeliveryList(
                  deliveryQueueStore.reportDeliveryListCopy,
                );
              }
              const list = deliveryQueueStore.reportDeliveryListCopy;
              const data = list?.filter(res => {
                return JSON.stringify(res)
                  .toLocaleLowerCase()
                  .match(filter.srText?.toLocaleLowerCase());
              });
              deliveryQueueStore.updateReportDeliveryList(data);
            }
          }
        }}
        onExpand={async item => {
          setSelectId(item._id);
          if (typeof item == 'object') {
            getOrderDeliveredList(item).then(result => {
              deliveryQueueStore.updateOrderDeliveredList(result);
            });
          } else {
            deliveryQueueStore.updateOrderDeliveredList([]);
          }
        }}
        onUpdateDeliveryStatus={() => {
          const pendingItems = deliveryQueueStore.reportDeliveryList?.filter(
            item => item.deliveryStatus === 'Pending',
          );
          const ids = pendingItems?.map(item => item._id);
          const visitIds = pendingItems?.map(item => item.visitId);
          updateRecords({
            type: 'updateAllDeliveryStatus',
            ids: ids,
            visitId: visitIds,
            show: true,
            title: 'Are you sure?',
            body: 'All generate pdf status update',
          });
        }}
        onReport={async item => {
          const result = await getOrderDeliveredList(item);
          deliveryQueueStore.deliveryQueueService
            .listPatientReports(result[0]?.labId)
            .then(res => {
              if (res.getPatientReports.success) {
                let patientResultList: any[] = [];
                result?.filter(item => {
                  if (item?.reportTemplate) {
                    patientResultList.push({
                      ...res.getPatientReports.data,
                      patientResult: item,
                    });
                  }
                });
                const uniqByPatientResult = _.uniqBy(result, (item: any) => {
                  return item?.reportTemplate;
                });

                const reportTemplateList: any[] = [];
                uniqByPatientResult.filter(item => {
                  reportTemplateList.push(item?.reportTemplate?.split(' -')[0]);
                });

                if (reportTemplateList?.length > 0) {
                  reportSettingStore.templatePatientResultService
                    .getTempPatientResultListByTempCodes({
                      input: {
                        filter: {
                          reportTemplateList,
                        },
                      },
                    })
                    .then(async res => {
                      patientResultList = patientResultList.filter(item => {
                        const reportSettings =
                          res.getTempPatientResultListByTempCodes.list.find(
                            e =>
                              e.templateCode ==
                              item.patientResult.reportTemplate.split(' -')[0],
                          );
                        return Object.assign(item, { reportSettings });
                      });

                      const grouped = _.groupBy(
                        patientResultList,
                        item => item.patientResult.reportTemplate,
                      );

                      if (_.isEmpty(grouped)) {
                        return Toast.error({
                          message: '😌 Report template not found.',
                        });
                      } else {
                        setModalGenerateReports({
                          show: true,
                          data: grouped,
                          templateDetails:
                            res.getTempPatientResultListByTempCodes.list,
                        });
                      }
                    });
                }
              } else {
                alert(res.getPatientReports.message);
              }
            });
        }}
        onPagination={(type: string) => {
          let pageNo = deliveryQueueStore.orderDeliveryPageNo;
          if (type == 'next')
            pageNo = deliveryQueueStore.orderDeliveryPageNo + 1;
          else pageNo == 0 ? (pageNo = 0) : (pageNo = pageNo - 1);
          deliveryQueueStore.deliveryQueueService.listDeliveryQueue(
            pageNo,
            100,
          );
          deliveryQueueStore.updateOrderDeliveryPageNo(pageNo);
          global.filter = { mode: 'pagination', pageNo, limit: 100 };
        }}
        setHoldRecord={(item: string) => {
          setHoldRecord(item);
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deliveryQueueStore.reportDeliveryList, selectId, reloadTable, holdRecord],
  );
  console.log(holdRecord, 'hold');
  return (
    <>
      <MainPageHeadingComponents
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        <span className='font-bold text-lg underline'>Report Delivery</span>
        {reportDeliveryList}
      </div>

      {deliveryQueueStore.orderDeliveredList?.length > 0 && (
        <div className='p-3 rounded-lg shadow-xl overflow-auto'>
          <span className='font-bold text-lg underline'>Order Delivered</span>
          <OrderDeliveredList
            data={deliveryQueueStore.orderDeliveredList || []}
            totalSize={deliveryQueueStore.orderDeliveredListCount}
          />
        </div>
      )}

      <ModalGenerateReports
        {...modalGenerateReports}
        onClose={() => {
          setModalGenerateReports({ show: false });
        }}
      />
    </>
  );
});

export default DeliveryQueue;
