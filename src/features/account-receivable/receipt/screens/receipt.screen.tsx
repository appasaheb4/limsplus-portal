import React, { useState } from 'react';
import { observer } from 'mobx-react';

import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Toast,
} from '@/library/components';
import { useForm } from 'react-hook-form';
import { RouterFlow } from '@/flows';
import { ReceiptList } from '../components';
import { ModalReceiptShare } from '../../components';
import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';
import MainPageHeadingComponents from '@/library/components/atoms/header/main.page.heading.components';

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

  return (
    <>
      <MainPageHeadingComponents
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />
      {/*  */}
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        <ReceiptList
          data={receiptStore.receiptList || []}
          totalSize={receiptStore.receiptListCount}
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Update',
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
                  console.log({
                    labLogo:
                      res.generatePaymentReceipt?.receiptData?.headerDetails
                        ?.labLogo,
                  });
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
    </>
  );
});

export default Receipt;
