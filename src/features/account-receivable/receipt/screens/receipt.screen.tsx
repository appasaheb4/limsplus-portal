import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import dayjs from 'dayjs';
import {
  ModalConfirm,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Toast,
} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import {ReceiptList, PdfReceipt, PdfTransactionLineTable} from '../components';
import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

import {
  PdfHeading,
  PdfRegular,
  PdfMedium,
  PdfPageNumber,
  PdfHeader,
  PdfSubHeader,
  PdfView,
  PdfBorderView,
  PdfFooterView,
  PdfGrid,
  PdfSmall,
  PdfImage,
} from '@components';

const Receipt = observer(() => {
  const {receiptStore, routerStore, loginStore} = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [modalConfirm, setModalConfirm] = useState<any>();

  useEffect(() => {
    receiptStore.receiptService
      .generatePaymentReceipt({input: {headerId: 189}})
      .then(res => {
        console.log({res});
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerGridSpace = 120;
  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <PdfReceipt
        pageSize='A4'
        height={window.outerHeight}
        children={
          <>
            <PdfView mt={20}>
              <PdfImage style={{width: 150, height: 40}} />

              <PdfView mh={0} p={0}>
                <PdfView mt={4} mh={0} p={0} flexDirection='row'>
                  <PdfSmall style={{width: headerGridSpace}}>
                    {'Regd. Office:'}
                  </PdfSmall>
                  <PdfSmall> {`${'Pune'}`} </PdfSmall>
                </PdfView>
                <PdfView mh={0} p={0} flexDirection='row'>
                  <PdfSmall style={{width: headerGridSpace}}>
                    {'Customer Care:'}
                  </PdfSmall>
                  <PdfSmall> {`${'91-11-664253244'}`} </PdfSmall>
                </PdfView>
                <PdfView mh={0} p={0} flexDirection='row'>
                  <PdfSmall style={{width: headerGridSpace}}>
                    {'Email:'}
                  </PdfSmall>
                  <PdfSmall> {`${'customer.care@limsplus.com'}`} </PdfSmall>
                </PdfView>
                <PdfView mh={0} p={0} flexDirection='row'>
                  <PdfSmall style={{width: headerGridSpace}}>
                    {'Registration Location:'}
                  </PdfSmall>
                  <PdfSmall>
                    {`${'In publishing and graphic design, Lorem ipsum is a placeholder'}`}
                  </PdfSmall>
                </PdfView>
                <PdfView mh={0} p={0} flexDirection='row'>
                  <PdfSmall style={{width: headerGridSpace}}>
                    {'Phone:'}
                  </PdfSmall>
                  <PdfSmall> {`${'0123456789 / 1234567890'}`} </PdfSmall>
                </PdfView>
                <PdfView mh={0} p={0} flexDirection='row'>
                  <PdfSmall style={{width: headerGridSpace}}>{'Web:'}</PdfSmall>
                  <PdfSmall> {`${'www.limsplus.com'}`} </PdfSmall>
                </PdfView>
              </PdfView>

              <PdfView>
                <PdfRegular textAlign='right' fontFamily='Times-Bold'>
                  87698798
                </PdfRegular>
                <PdfRegular
                  textAlign='center'
                  fontSize={10}
                  fontFamily='Times-Bold'
                >
                  Bill of Supply/Cash Receipt
                </PdfRegular>
                <PdfSmall
                  textAlign='center'
                  fontFamily='Times-Italic'
                  style={{textDecoration: 'underline'}}
                >
                  Please bring this receipt for report collections
                </PdfSmall>
              </PdfView>

              <PdfBorderView mh={0} mv={0} bw={1}>
                <PdfView
                  mh={0}
                  p={0}
                  flexDirection='row'
                  style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    marginBottom: 4,
                    paddingBottom: 4,
                  }}
                >
                  <PdfGrid cols={2} bg='transparent'>
                    <PdfSmall>{`Invoice No: ${'8769879'}`}</PdfSmall>
                    <PdfSmall>{'Patient Name: '}</PdfSmall>
                    <PdfSmall>{'Lab ID:'}</PdfSmall>
                    <PdfSmall>{'Patient ID: '}</PdfSmall>
                    <PdfSmall>{'Age & Sex: '}</PdfSmall>
                    <PdfSmall>{'Contact Number: '}</PdfSmall>
                  </PdfGrid>
                  <PdfGrid cols={2} bg='transparent'>
                    <PdfSmall>{`GST No: ${'8769879'}`}</PdfSmall>
                    <PdfSmall>{'Lab Code / CC Code: '}</PdfSmall>
                    <PdfSmall>{'Date & Time:'}</PdfSmall>
                    <PdfSmall>{'Mode of Payment: '}</PdfSmall>
                    <PdfSmall>{'SAC Code: '}</PdfSmall>
                    <PdfSmall>{'CIN No: '}</PdfSmall>
                  </PdfGrid>
                </PdfView>
                <PdfView mh={0} p={0} flexDirection='row'>
                  <PdfGrid cols={2} bg='transparent'>
                    <PdfSmall>{`Patient Employee Code: ${'8769879'}`}</PdfSmall>
                    <PdfSmall>{'Card No: '}</PdfSmall>
                  </PdfGrid>
                  <PdfGrid cols={2} bg='transparent'>
                    <PdfSmall>{`Reference Doctor: ${'4'}`}</PdfSmall>
                    <PdfSmall>{'Corporate Code: '}</PdfSmall>
                  </PdfGrid>
                </PdfView>
                <PdfView mh={0} p={0} mt={4}>
                  <PdfTransactionLineTable data={[]} />
                  <PdfView mh={0} p={0} mt={2} style={{}} alignItems='flex-end'>
                    <PdfSmall>Total: 876</PdfSmall>
                    <PdfSmall>Misc Charges: 10</PdfSmall>
                    <PdfSmall>Other Charges: 20</PdfSmall>
                    <PdfSmall>Paid Amount: 87987</PdfSmall>
                    <PdfSmall fontFamily='Times-Bold'>Balance: 87987</PdfSmall>
                  </PdfView>
                  <PdfSmall>
                    Amount Paid in Words: One Thousand One Hundred and Forty
                    Five Only
                  </PdfSmall>
                </PdfView>
              </PdfBorderView>
              <PdfSmall>
                This is a computer generated receipt and does not require
                signature/stamp
              </PdfSmall>
              <PdfSmall fontFamily='Times-Bold' style={{marginTop: 4}}>
                {`*Final Report Delivery Date: ${dayjs(new Date()).format(
                  'YYYY-MM-DD',
                )}. *Report Collection Time: 6:00 AM to 7:30 PM`}
              </PdfSmall>

              <PdfBorderView mh={0} mv={4} bw={1}>
                <PdfSmall>
                  * In publishing and graphic design, Lorem ipsum is a
                  placeholder text commonly used to demonstrate the visual form
                  of a document or a typeface without relying on meaningful
                  content. Lorem ipsum may be used as a placeholder before final
                  copy is available.
                </PdfSmall>
              </PdfBorderView>
            </PdfView>
          </>
        }
      />
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
            console.log({item});
          }}
        />
      </div>
    </>
  );
});

export default Receipt;
