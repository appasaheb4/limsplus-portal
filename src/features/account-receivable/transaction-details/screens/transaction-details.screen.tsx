import React, {useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  ModalConfirm,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Toast,
} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {TransactionHeaderList, TransactionLineList} from '../components';
import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const TransactionDetails = observer(() => {
  const {loading, transactionDetailsStore, routerStore, loginStore} =
    useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [modalConfirm, setModalConfirm] = useState<any>();

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        <span className='font-bold text-lg underline'>Transaction Header</span>
        <TransactionHeaderList
          data={transactionDetailsStore.transactionHeaderList || []}
          totalSize={transactionDetailsStore.transactionHeaderListCount}
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Edit/Modify',
          )}
          onUpdate={selectedItem => setModalConfirm(selectedItem)}
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
          onClickRow={(item, index) => {
            console.log({item});
            transactionDetailsStore.transactionDetailsService.findByFieldsTransactionLine(
              {
                input: {
                  filter: {
                    headerId: item?.headerId,
                  },
                },
              },
            );
            // deliveryQueueStore.updateOrderDeliveredList([item]);
          }}
        />
      </div>
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        <span className='font-bold text-lg underline'>Transaction Line</span>
        <TransactionLineList
          data={transactionDetailsStore.transactionListList || []}
          totalSize={transactionDetailsStore.transactionListListCount}
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
            // deliveryQueueStore.deliveryQueueService
            //   .updateDeliveryQueue({
            //     input: {
            //       _id: modalConfirm.id,
            //       deliveryStatus:
            //         type == 'cancel'
            //           ? 'Cancel'
            //           : type == 'hold'
            //           ? 'Hold'
            //           : 'Done',
            //     },
            //   })
            //   .then(res => {
            //     if (res.updateDeliveryQueue.success) {
            //       Toast.success({
            //         message: `😊 ${res.updateDeliveryQueue.message}`,
            //       });
            //       setModalConfirm({show: false});
            //       deliveryQueueStore.deliveryQueueService.listDeliveryQueue();
            //     }
            //   });
          }}
          onClose={() => {
            setModalConfirm({show: false});
          }}
        />
      </div>
    </>
  );
});

export default TransactionDetails;
