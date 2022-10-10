import React, {useState} from 'react';
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
import {ReceiptList, PdfReceipt} from '../components';
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
                <PdfRegular textAlign='right' fontWeight={600}>
                  87698798
                </PdfRegular>
              </PdfView>
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
