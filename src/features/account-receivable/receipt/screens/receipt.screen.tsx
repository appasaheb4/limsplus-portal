import React, {useEffect, useState} from 'react';
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
import {ReceiptList} from '../components';
import {ModalReceiptShare} from '../../components';
import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';
import axios from 'axios';

const Receipt = observer(() => {
  const {receiptStore, routerStore, loginStore} = useStores();
  const [receiptPath, setReceiptPath] = useState<string>();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [modalPaymentReceipt, setModalPaymentReceipt] = useState<any>();
  const [receiptDetails, setReceiptDetails] = useState<any>();

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
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
            'Edit/Modify',
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
              .generatePaymentReceipt({input: {headerId: item?.headerId}})
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
    </>
  );
});

export default Receipt;
