import React, {useState, useEffect, useMemo} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  ModalConfirm,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Toast,
} from '@/library/components';
import {useForm} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {
  ReportDeliveryList,
  OrderDeliveredList,
  ModalGenerateReports,
} from '../components';
import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const DeliveryQueue = observer(() => {
  const {
    loading,
    deliveryQueueStore,
    routerStore,
    loginStore,
    receiptStore,
    reportSettingStore,
  } = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

  //const [modalConfirm, setModalConfirm] = useState<any>();
  const [modalGenerateReports, setModalGenerateReports] = useState<any>();
  const [selectId, setSelectId] = useState('');

  const getDeliveryList = () => {
    const loginDetails = loginStore.login;
    // if (loginDetails?.role == 'SYSADMIN') {
    //   deliveryQueueStore.deliveryQueueService.listDeliveryQueue();
    //   return;
    // }
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
      // Toast.warning({
      //   message:
      //     "😞 You don't have access permission for delivery queue. Please contact to admin",
      // });
    }
  };

  useEffect(() => {
    getDeliveryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValue = value =>
    typeof value === 'string' ? value.toUpperCase() : value;

  const filterPlainArray = (array, filters) => {
    const filterKeys = Object.keys(filters);
    // console.log({filterKeys});
    return array.filter(item => {
      return filterKeys.every(key => {
        console.log({key});
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

  const updateRecords = (payload: any) => {
    const {type, id, visitId, ids} = payload;
    if (type == 'cancel' || type == 'hold' || type == 'done') {
      deliveryQueueStore.deliveryQueueService
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
      deliveryQueueStore.deliveryQueueService
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
        isDelete={RouterFlow.checkPermission(
          routerStore.userPermission,
          'Delete',
        )}
        isEditModify={RouterFlow.checkPermission(
          routerStore.userPermission,
          'Edit/Modify',
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
              input: {type, filter, page, limit},
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
          updateRecords({
            type: 'updateAllDeliveryStatus',
            ids: deliveryQueueStore.reportDeliveryList?.map(item => item._id),
            visitId: deliveryQueueStore.reportDeliveryList?.map(
              item => item.visitId,
            ),
            show: true,
            title: 'Are you sure?',
            body: 'All generate pdf status update',
          });
        }}
        onReport={async item => {
          const result = await getOrderDeliveredList(item);
          console.log({result});

          deliveryQueueStore.deliveryQueueService
            .listPatientReports(result[0]?.labId)
            .then(res => {
              // console.log({res});

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
                        return Object.assign(item, {reportSettings});
                      });

                      const grouped = _.groupBy(
                        patientResultList,
                        item => item.patientResult.reportTemplate,
                      );
                      console.log({grouped});

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
          global.filter = {mode: 'pagination', pageNo, limit: 100};
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deliveryQueueStore.reportDeliveryList, selectId],
  );

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        <span className='font-bold text-lg underline'>Report Delivery</span>
        {reportDeliveryList}
      </div>
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        <span className='font-bold text-lg underline'>Order Delivered</span>
        <OrderDeliveredList
          data={deliveryQueueStore.orderDeliveredList || []}
          totalSize={deliveryQueueStore.orderDeliveredListCount}
        />

        <ModalGenerateReports
          {...modalGenerateReports}
          onClose={() => {
            setModalGenerateReports({show: false});
          }}
        />
      </div>
    </>
  );
});

export default DeliveryQueue;
