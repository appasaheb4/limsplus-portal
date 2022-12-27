import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  ModalConfirm,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Toast,
} from '@/library/components';
import {debounce} from '@/core-utils';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {
  ReportDeliveryList,
  OrderDeliveredList,
  ModalGenerateReports,
} from '../components';
import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';
import {toJS} from 'mobx';

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
  const [modalConfirm, setModalConfirm] = useState<any>();
  const [modalGenerateReports, setModalGenerateReports] = useState<any>();
  const [receiptPath, setReceiptPath] = useState<string>();

  const getDeliveryList = () => {
    const loginDetails = loginStore.login;
    if (loginDetails?.role == 'SYSADMIN') {
      deliveryQueueStore.deliveryQueueService.listDeliveryQueue();
      return;
    }
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
      Toast.warning({
        message:
          "😞 You don't have access permission for delivery queue. Please contact to admin",
      });
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
      console.log({item});
      return filterKeys.every(key => {
        console.log({key});
        if (!filters[key].length) return true;
        return filters[key].find(
          filter => getValue(filter) === getValue(item[key]),
        );
      });
    });
  };

  // userModule ="Corporate Portal"
  const reportDeliveryList = useMemo(
    () => (
      <ReportDeliveryList
        data={deliveryQueueStore.reportDeliveryList || []}
        totalSize={deliveryQueueStore.reportDeliveryListCount}
        isPagination={loginStore.login?.role == 'SYSADMIN' ? true : false}
        isDelete={RouterFlow.checkPermission(
          routerStore.userPermission,
          'Delete',
        )}
        isEditModify={RouterFlow.checkPermission(
          routerStore.userPermission,
          'Edit/Modify',
        )}
        onUpdate={selectedItem => setModalConfirm(selectedItem)}
        onPageSizeChange={(page, limit) => {
          deliveryQueueStore.deliveryQueueService.listDeliveryQueue(
            page,
            limit,
          );
        }}
        onFilter={(type, filter, page, limit) => {
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
        onClickRow={(item, index) => {
          deliveryQueueStore.updateOrderDeliveredList([item]);
        }}
        onUpdateDeliveryStatus={() => {
          setModalConfirm({
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
        onMedicalReport={labId => {
          deliveryQueueStore.deliveryQueueService
            .listPatientReports(labId)
            .then(res => {
              if (res.getPatientReports.success) {
                let patientResultList: any[] = [];
                res.getPatientReports.data?.patientResultList?.filter(item => {
                  if (item.reportTemplate) {
                    patientResultList.push({
                      ...res.getPatientReports.data,
                      patientResult: item,
                    });
                  }
                });
                const uniqByPatientResult = _.uniqBy(
                  res.getPatientReports.data?.patientResultList,
                  (item: any) => {
                    return item.reportTemplate;
                  },
                );
                const reportTemplateList: any[] = [];
                uniqByPatientResult.filter(item => {
                  reportTemplateList.push(item?.reportTemplate.split(' -')[0]);
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
                    .then(res => {
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

                      setModalGenerateReports({
                        show: true,
                        data: grouped,
                      });
                    });
                }
              } else {
                alert(res.getPatientReports.message);
              }
            });
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deliveryQueueStore.reportDeliveryList],
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
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            routerStore.userPermission,
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
              body: 'Update items!',
            });
          }}
          onPageSizeChange={(page, limit) => {
            // bannerStore.fetchListBanner(page, limit);
          }}
          onFilter={(type, filter, page, limit) => {
            // bannerStore.BannerService.filter({
            //   input: {type, filter, page, limit},
            // });
          }}
        />
        <ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type == 'cancel' || type == 'hold' || type == 'generatePdf') {
              deliveryQueueStore.deliveryQueueService
                .updateDeliveryQueue({
                  input: {
                    _id: modalConfirm.id,
                    visitId: modalConfirm?.visitId,
                    deliveryStatus:
                      type == 'cancel'
                        ? 'Cancel'
                        : type == 'hold'
                        ? 'Hold'
                        : 'Done',
                  },
                })
                .then(res => {
                  setModalConfirm({show: false});
                  if (res.updateDeliveryQueue.success) {
                    Toast.success({
                      message: `😊 ${res.updateDeliveryQueue.message}`,
                    });
                    deliveryQueueStore.deliveryQueueService.listDeliveryQueue();
                  }
                });
            } else {
              deliveryQueueStore.deliveryQueueService
                .updateDeliveryQueueByVisitIds({
                  input: {
                    filter: {
                      ids: modalConfirm?.ids,
                      visitId: modalConfirm?.visitId,
                      deliveryStatus: 'Done',
                    },
                  },
                })
                .then(res => {
                  setModalConfirm({show: false});
                  if (res.updateByVisitIdsDeliveryQueue.success) {
                    Toast.success({
                      message: `😊 ${res.updateByVisitIdsDeliveryQueue.message}`,
                    });
                    deliveryQueueStore.deliveryQueueService.listDeliveryQueue();
                  }
                });
            }
          }}
          onClose={() => {
            setModalConfirm({show: false});
          }}
        />

        <ModalGenerateReports
          {...modalGenerateReports}
          onClose={() => {
            setModalGenerateReports({show: false});
          }}
          onReceiptUpload={(file, type) => {
            // if (!receiptPath) {
            //   receiptStore.receiptService
            //     .paymentReceiptUpload({input: {file}})
            //     .then(res => {
            //       if (res.paymentReceiptUpload.success) {
            //         setReceiptPath(res.paymentReceiptUpload?.receiptPath);
            //         window.open(
            //           `${type} ${res.paymentReceiptUpload?.receiptPath}`,
            //           '_blank',
            //         );
            //       }
            //     });
            // } else {
            //   window.open(type + receiptPath, '_blank');
            // }
          }}
        />
      </div>
    </>
  );
});

export default DeliveryQueue;
