import React, { useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Toast, MainPageHeading } from '@/library/components';
import { useForm } from 'react-hook-form';
import { RouterFlow } from '@/flows';
import { BillSummaryList, ModalViewBill } from '../components';
import { ButtonBorderAnimated } from '@/core-components';

import '@/library/assets/css/accordion.css';
import { useStores } from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const BillSummary = observer(() => {
  const { billSummaryStore, routerStore, loginStore } = useStores();

  const [modalViewBill, setModalViewBill] = useState<object>({});

  return (
    <>
      {/* <div className='flex items-center justify-center'>
        <ButtonBorderAnimated title='WIP' />
      </div> */}
      <MainPageHeading
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />
      {/*  */}
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        <BillSummaryList
          data={billSummaryStore.billSummaryList || []}
          totalSize={billSummaryStore.billSummaryListCount}
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
            billSummaryStore.billSummaryService.listBillSummary(page, limit);
          }}
          onFilter={(type, filter, page, limit) => {
            billSummaryStore.billSummaryService.filter({
              input: { type, filter, page, limit },
            });
          }}
          onReport={item => {
            // fetch billing list
            billSummaryStore.billSummaryService
              .getBillingList({
                input: {
                  filter: {
                    invoiceAc: item?.invoiceAc,
                    billingList: item?.billingList,
                  },
                },
              })
              .then(res => {
                if (!res.getBillingListBillSummary?.success)
                  return Toast.error({
                    message: `😔 ${res.getBillingListBillSummary.message}`,
                  });
                setModalViewBill({
                  show: true,
                  data: {
                    transactionHeader: item,
                    billingList: res.getBillingListBillSummary?.result,
                  },
                });
              });
            // receiptStore.receiptService
            //   .generatePaymentReceipt({ input: { headerId: item?.headerId } })
            //   .then(async res => {
            //     if (res.generatePaymentReceipt?.success) {
            //       // setModalPaymentReceipt({
            //       //   show: true,
            //       //   data: res.generatePaymentReceipt?.receiptData,
            //       // });
            //     } else
            //       Toast.error({
            //         message: `😔 ${res.generatePaymentReceipt.message}`,
            //       });
            //   });
          }}
        />
      </div>
      <ModalViewBill
        {...modalViewBill}
        onClick={() => {}}
        onClose={() => {
          setModalViewBill({ show: false });
        }}
      />
    </>
  );
});

export default BillSummary;
