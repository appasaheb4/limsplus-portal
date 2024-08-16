import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { ModalConfirm, Toast, MainPageHeading } from '@/library/components';
import { useForm } from 'react-hook-form';
import { RouterFlow } from '@/flows';
import { ButtonBorderAnimated } from '@/core-components';
import { TransactionHeaderList, TransactionLineList } from '../components';
import { ModalReceiptShare } from '../../components';
import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const TransactionDetails = observer(() => {
  const {
    transactionDetailsStore,
    routerStore,
    loginStore,
    receiptStore,
    billSummaryStore,
  } = useStores();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [selectId, setSelectId] = useState<string>('');
  const [modalConfirm, setModalConfirm] = useState<any>();
  const [modalPaymentReceipt, setModalPaymentReceipt] = useState<any>();
  const [receiptPath, setReceiptPath] = useState<string>();

  const transactionHeaderTable = useMemo(
    () => (
      <TransactionHeaderList
        data={transactionDetailsStore.transactionHeaderList || []}
        totalSize={transactionDetailsStore.transactionHeaderListCount}
        isView={RouterFlow.checkPermission(routerStore.userPermission, 'View')}
        isDelete={RouterFlow.checkPermission(
          routerStore.userPermission,
          'Delete',
        )}
        selectId={selectId}
        isUpdate={RouterFlow.checkPermission(
          routerStore.userPermission,
          'Update',
        )}
        isExport={RouterFlow.checkPermission(
          routerStore.userPermission,
          'Export',
        )}
        onUpdate={selectedItem => setModalConfirm(selectedItem)}
        onSelectedRow={rows => {
          setModalConfirm({
            show: true,
            type: 'delete',
            id: rows,
            title: 'Are you sure?',
            body: 'Do you want to delete selected record?',
          });
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          setModalConfirm({
            show: true,
            type: 'update',
            data: { value, dataField, id },
            title: 'Are you sure?',
            body: 'Update items!',
          });
        }}
        onPageSizeChange={(page, limit) => {
          transactionDetailsStore.transactionDetailsService.listTransactionHeader(
            page,
            limit,
          );
        }}
        onFilter={(type, filter, page, limit) => {
          transactionDetailsStore.transactionDetailsService.filter({
            input: { type, filter, page, limit },
          });
        }}
        onExpand={async item => {
          setSelectId(item?._id);
          if (typeof item == 'object') {
            transactionDetailsStore.transactionDetailsService.findByFieldsTransactionLine(
              {
                input: {
                  filter: {
                    headerId: item?.headerId,
                  },
                },
              },
            );
          } else {
            transactionDetailsStore.updateTransactionListList([]);
          }
        }}
        onReport={item => {
          receiptStore.receiptService
            .generatePaymentReceipt({ input: { headerId: item?.headerId } })
            .then(res => {
              if (res.generatePaymentReceipt?.success) {
                setModalPaymentReceipt({
                  show: true,
                  data: res.generatePaymentReceipt?.receiptData,
                });
              } else
                Toast.error({
                  message: `😔 ${res.generatePaymentReceipt.message}`,
                });
            });
        }}
        onGenerateBill={async () => {
          await billSummaryStore.billSummaryService
            .generateBill({ input: {} })
            .then(res => {
              if (res.generateBillSummary?.success) {
                Toast.success({
                  message: `${res.generateBillSummary.message}`,
                });
              } else {
                Toast.error({
                  message: res.generateBillSummary?.message,
                });
              }
            });
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactionDetailsStore.transactionHeaderList, selectId],
  );

  const sendSMS = details => {
    receiptStore.receiptService.sendSMS({
      input: {
        filter: { ...details },
      },
    } as any);
  };

  return (
    <>
      {/* <div className='flex items-center justify-center'>
        <ButtonBorderAnimated title='WIP' />
      </div> */}
      <MainPageHeading
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />
      <div className='p-1 rounded-lg shadow-xl overflow-auto'>
        <span className='font-bold text-lg underline'>Transaction Header</span>
        {transactionHeaderTable}
      </div>
      {transactionDetailsStore.transactionListList.length > 0 && (
        <>
          <div className='p-1 rounded-lg shadow-xl overflow-auto'>
            <span className='font-bold text-lg underline'>
              Transaction Line
            </span>
            <TransactionLineList
              data={transactionDetailsStore.transactionListList || []}
              totalSize={transactionDetailsStore.transactionListListCount}
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
              onDelete={selectedItem => setModalConfirm(selectedItem)}
              onSelectedRow={rows => {
                setModalConfirm({
                  show: true,
                  type: 'delete',
                  id: rows,
                  title: 'Are you sure?',
                  body: 'Do you want to delete selected record?',
                });
              }}
              onUpdateItem={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'update',
                  data: { value, dataField, id },
                  title: 'Are you sure?',
                  body: 'Do you want to update this record?',
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
          </div>
        </>
      )}
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
        close={() => {
          setModalConfirm({ show: false });
        }}
      />
      <ModalReceiptShare
        {...modalPaymentReceipt}
        onClose={() => {
          setModalPaymentReceipt({ show: false });
        }}
        onReceiptUpload={(file, type) => {
          if (!receiptPath) {
            receiptStore.receiptService
              .paymentReceiptUpload({ input: { file } })
              .then(res => {
                if (res.paymentReceiptUpload.success) {
                  const path = res.paymentReceiptUpload?.receiptPath;
                  if (type == 'sms') {
                    if (
                      _.isEmpty(
                        modalPaymentReceipt.data?.patientDetails?.mobileNo,
                      )
                    )
                      Toast.error({
                        message: '😊 Patient mobile number not found!',
                      });
                    else
                      sendSMS({
                        mobileNo: [
                          modalPaymentReceipt.data?.patientDetails?.mobileNo,
                        ],
                        sender: '',
                        message: `Your payment receipt link: ${path}`,
                      });
                  } else if (type == 'copyLink') {
                    window.navigator.clipboard.writeText(path);
                    Toast.success({
                      message: 'File path coped',
                    });
                  } else {
                    window.open(`${type} ${path}`, '_blank');
                  }
                  setReceiptPath(path);
                }
              });
          } else {
            if (type == 'sms') {
              if (_.isEmpty(modalPaymentReceipt.data?.patientDetails?.mobileNo))
                Toast.error({
                  message: '😊 Patient mobile number not found!',
                });
              else
                sendSMS({
                  mobileNo: [
                    modalPaymentReceipt.data?.patientDetails?.mobileNo,
                  ],
                  sender: '',
                  message: `Your payment receipt link: ${receiptPath}`,
                });
            } else if (type == 'copyLink') {
              window.navigator.clipboard.writeText(receiptPath);
              Toast.success({
                message: 'File path coped',
              });
            } else window.open(type + receiptPath, '_blank');
          }
        }}
      />
    </>
  );
});

export default TransactionDetails;
