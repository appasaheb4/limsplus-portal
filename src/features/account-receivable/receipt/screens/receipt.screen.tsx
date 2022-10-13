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
import {ReceiptList, ModalReceiptShare} from '../components';
import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const Receipt = observer(() => {
  const {receiptStore, routerStore, loginStore} = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [modalPaymentReceipt, setModalPaymentReceipt] = useState<any>();
  const [receiptDetails, setReceiptDetails] = useState<any>();

  // useEffect(() => {
  //   receiptStore.receiptService
  //     .generatePaymentReceipt({input: {headerId: 189}})
  //     .then(res => {
  //       if (res.generatePaymentReceipt?.success)
  //         setReceiptDetails(res.generatePaymentReceipt?.receiptData);
  //       else
  //         Toast.error({
  //           message: `😔 ${res.generatePaymentReceipt.message}`,
  //         });
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
      <ModalReceiptShare
        {...modalPaymentReceipt}
        onClose={() => {
          setModalPaymentReceipt({show: false});
        }}
      />
    </>
  );
});

export default Receipt;
