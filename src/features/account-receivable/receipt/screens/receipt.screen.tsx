import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {PDFDownloadLink} from '@react-pdf/renderer';

import {
  ModalConfirm,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Toast,
} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {ReceiptList, PdfReceipt} from '../components';
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
  const [modalConfirm, setModalConfirm] = useState<any>();
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

  const downloadPdf = () => {
    return (
      <PDFDownloadLink
        document={<PdfReceipt data={receiptDetails} />}
        fileName='Receipt.pdf'
      >
        {({blob, url, loading, error}) =>
          loading ? 'Loading document...' : <button>Download Pdf</button>
        }
      </PDFDownloadLink>
    );
  };

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
          onReport={item => {
            receiptStore.receiptService
              .generatePaymentReceipt({input: {headerId: item?.headerId}})
              .then(res => {
                if (res.generatePaymentReceipt?.success)
                  setReceiptDetails(res.generatePaymentReceipt?.receiptData);
                else
                  Toast.error({
                    message: `😔 ${res.generatePaymentReceipt.message}`,
                  });
              })
              .finally(() => {
                downloadPdf();
              });
          }}
        />
      </div>
    </>
  );
});

export default Receipt;
