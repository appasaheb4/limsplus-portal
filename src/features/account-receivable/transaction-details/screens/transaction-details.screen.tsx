import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {
  ModalConfirm,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Toast,
} from '@/library/components';
import {useForm} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {TransactionHeaderList, TransactionLineList} from '../components';
import {ModalReceiptShare} from '../../components';
import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const TransactionDetails = observer(() => {
  const {
    loading,
    transactionDetailsStore,
    routerStore,
    loginStore,
    receiptStore,
  } = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [modalConfirm, setModalConfirm] = useState<any>();
  const [modalPaymentReceipt, setModalPaymentReceipt] = useState<any>();
  const [receiptPath, setReceiptPath] = useState<string>();

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <div className='p-1 rounded-lg shadow-xl overflow-auto'>
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
          onReport={item => {
            receiptStore.receiptService
              .generatePaymentReceipt({input: {headerId: item?.headerId}})
              .then(res => {
                if (res.generatePaymentReceipt?.success)
                  setModalPaymentReceipt({
                    show: true,
                    data: res.generatePaymentReceipt?.receiptData,
                  });
                else
                  Toast.error({
                    message: `😔 ${res.generatePaymentReceipt.message}`,
                  });
              });
          }}
        />
      </div>
      <div className='p-1 rounded-lg shadow-xl overflow-auto'>
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
        <ModalReceiptShare
          {...modalPaymentReceipt}
          onClose={() => {
            setModalPaymentReceipt({show: false});
          }}
          onReceiptUpload={(file, type) => {
            if (!receiptPath) {
              receiptStore.receiptService
                .paymentReceiptUpload({input: {file}})
                .then(res => {
                  if (res.paymentReceiptUpload.success) {
                    setReceiptPath(res.paymentReceiptUpload?.receiptPath);
                    window.open(
                      `${type} ${res.paymentReceiptUpload?.receiptPath}`,
                      '_blank',
                    );
                  }
                });
            } else {
              window.open(type + receiptPath, '_blank');
            }
          }}
        />
      </div>
    </>
  );
});

export default TransactionDetails;
