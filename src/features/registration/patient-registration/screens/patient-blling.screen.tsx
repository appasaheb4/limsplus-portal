import { PaymentList } from '@/features/account-receivable/payment/components';
import { ReceiptList } from '@/features/account-receivable/receipt/components';
import { RouterFlow } from '@/flows';
import { useStores } from '@/stores';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

export const PatientBilling = observer(() => {
  const { paymentStore, routerStore, receiptStore } = useStores();

  useEffect(() => {
    paymentStore.paymentService.listPayment();
    receiptStore.receiptService.listReceipt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paymentTable = useMemo(
    () => (
      <PaymentList
        data={paymentStore.paymentList || []}
        totalSize={paymentStore.paymentListCount}
        extraData={
          {
            //   lookupItems: routerStore.lookupItems,
          }
        }
        isView={RouterFlow.checkPermission(routerStore.userPermission, 'View')}
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
        onDelete={selectedItem => {}}
        onSelectedRow={rows => {
          //   setModalConfirm({
          //     show: true,
          //     type: 'Delete',
          //     id: rows,
          //     title: 'Are you sure?',
          //     body: 'Do you want to delete selected record?',
          //   });
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          //   setModalConfirm({
          //     show: true,
          //     type: 'Update',
          //     data: { value, dataField, id },
          //     title: 'Are you sure?',
          //     body: 'Update deginisation!',
          //   });
        }}
        onPageSizeChange={(page, limit) => {
          // deginisationStore.fetchListDeginisation(page, limit);
        }}
        onFilter={(type, filter, page, limit) => {
          // deginisationStore.DeginisationService.filter({
          //   input: {type, filter, page, limit},
          // });
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentStore.paymentList],
  );

  const receiptTable = useMemo(
    () => (
      <ReceiptList
        data={receiptStore.receiptList || []}
        totalSize={receiptStore.receiptListCount}
        isView={RouterFlow.checkPermission(routerStore.userPermission, 'View')}
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
          //   receiptStore.receiptService
          //     .generatePaymentReceipt({ input: { headerId: item?.headerId } })
          //     .then(async res => {
          //       if (res.generatePaymentReceipt?.success) {
          //         console.log({
          //           labLogo:
          //             res.generatePaymentReceipt?.receiptData?.headerDetails
          //               ?.labLogo,
          //         });
          //         setModalPaymentReceipt({
          //           show: true,
          //           data: res.generatePaymentReceipt?.receiptData,
          //         });
          //       } else
          //         Toast.error({
          //           message: `😔 ${res.generatePaymentReceipt.message}`,
          //         });
          //     });
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [receiptStore.receiptList],
  );
  return (
    <>
      <div className='extra'>
        <Accordion allowZeroExpanded>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Payment</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <>
                <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
                  {paymentTable}
                </div>
              </>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <hr />
      <div className='extra' style={{ marginTop: '10px' }}>
        <Accordion allowZeroExpanded>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Receipt</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <>
                <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
                  {receiptTable}
                </div>
              </>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
});
