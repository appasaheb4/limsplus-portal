import React, { useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Toast, MainPageHeading } from '@/library/components';
import { useForm } from 'react-hook-form';
import { RouterFlow } from '@/flows';
import { ReceiptList } from '../components';
import { ModalReceiptShare } from '../../components';
import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const Receipt = observer(() => {
  const { receiptStore, routerStore, loginStore } = useStores();
  const [receiptPath, setReceiptPath] = useState<string>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [modalPaymentReceipt, setModalPaymentReceipt] = useState<any>();
  const [receiptDetails, setReceiptDetails] = useState<any>();

  const sendSMS = details => {
    receiptStore.receiptService
      .sendSMS({
        input: {
          filter: { ...details },
        },
      } as any)
      .then(res => {
        if (res.sendMessageService.success) {
          Toast.success({
            message: '😊 SMS send successfully',
          });
        }
      });
  };

  return (
    <>
      <MainPageHeading
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />
      {/*  */}
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        <ReceiptList
          data={receiptStore.receiptList || []}
          totalSize={receiptStore.receiptListCount}
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
          onPageSizeChange={(page, limit) => {
            // bannerStore.fetchListBanner(page, limit);
          }}
          onFilter={(type, filter, page, limit) => {
            // bannerStore.BannerService.filter({
            //   input: {type, filter, page, limit},
            // });
          }}
          onReport={item => {
            receiptStore.receiptService
              .generatePaymentReceipt({ input: { headerId: item?.headerId } })
              .then(async res => {
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
        />
      </div>
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
                  message: '😌 Patient mobile number not found!',
                });
              else
                sendSMS({
                  mobileNo: [
                    modalPaymentReceipt.data?.patientDetails?.mobileNo,
                  ],
                  sender: '',
                  message: `Your payment receipt link: ${receiptPath}`,
                });
            } else window.open(type + receiptPath, '_blank');
          }
        }}
      />
    </>
  );
});

export default Receipt;
