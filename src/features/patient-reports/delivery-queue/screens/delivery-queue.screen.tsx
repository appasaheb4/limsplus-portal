import React, {useState, useCallback} from 'react';
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
import {ReportDeliveryList, OrderDeliveredList} from '../components';
import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const DeliveryQueue = observer(() => {
  const {
    loading,
    deliveryQueueStore,
    routerStore,
    administrativeDivisions,
    doctorsStore,
    loginStore,
  } = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [modalConfirm, setModalConfirm] = useState<any>();

  // const debounce = _.debounce((type, filter, page, limit) => {
  //   deliveryQueueStore.deliveryQueueService.filter({
  //     input: {type, filter, page, limit},
  //   });
  // }, 1000);

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        <span className='font-bold text-lg underline'>Report Delivery</span>
        <ReportDeliveryList
          data={deliveryQueueStore.reportDeliveryList || []}
          totalSize={deliveryQueueStore.reportDeliveryListCount}
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
            deliveryQueueStore.deliveryQueueService.filter({
              input: {type, filter, page, limit},
            });
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
              .getMedicalReportDetails({
                input: {
                  filter: {
                    labId,
                  },
                },
              })
              .then(res => {
                if (res.getMedicalReportDetailsForDeliveryQueue.success) {
                  console.log({res});
                } else {
                  Toast.error({
                    message: `😞 ${res.getMedicalReportDetailsForDeliveryQueue.message}`,
                  });
                }
              });
          }}
        />
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
      </div>
    </>
  );
});

export default DeliveryQueue;
