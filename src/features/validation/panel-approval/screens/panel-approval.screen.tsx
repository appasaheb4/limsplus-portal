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
import {
  PendingPanelApprovalList,
  ResultList,
  PatientDemographicsList,
} from '../components';
import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const PanelApproval = observer(() => {
  const {
    loading,
    panelApprovalStore,
    transactionDetailsStore,
    routerStore,
    loginStore,
    receiptStore,
  } = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [modalConfirm, setModalConfirm] = useState<any>();
  const [receiptPath, setReceiptPath] = useState<string>();
  const [expandItem, setExpandItem] = useState<any>([]);

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <div className='p-3 rounded-lg shadow-xl overflow-auto'>
        <span className='font-bold text-lg underline'>Result</span>
        <ResultList
          data={panelApprovalStore.panelApprovalList || []}
          totalSize={panelApprovalStore.panelApprovalListCount}
          selectedId={
            expandItem?.map(item => {
              return item._id;
            })[0]
          }
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Edit/Modify',
          )}
          onSelectedRow={(rows, type) => {
            setModalConfirm({
              show: true,
              type: 'updateMany',
              data: {rows, type},
              title: 'Are you sure?',
              body: 'Update items!',
            });
          }}
          onUpdateFields={(fields: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'update',
              data: {fields, id},
              title: 'Are you sure?',
              body: 'Update items!',
            });
          }}
          onExpand={items => {
            if (typeof items == 'object') setExpandItem([items]);
            else setExpandItem([]);
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
        <span className='text-red'>
          Note: Report Priority= Daily single-single update.
        </span>
      </div>

      {expandItem?.length > 0 && (
        <>
          <div className='p-1 rounded-lg shadow-xl overflow-auto mt-4'>
            <span className='font-bold text-lg underline'>
              Pending Panel Approval
            </span>
            <PendingPanelApprovalList
              data={expandItem || []}
              totalSize={expandItem.length}
            />
            <span className='font-bold text-lg underline'>
              Patient Demographics
            </span>
            <PatientDemographicsList
              data={expandItem || []}
              totalSize={expandItem.length}
            />
          </div>
        </>
      )}

      <ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          setModalConfirm({show: false});
          switch (type) {
            case 'update': {
              panelApprovalStore.panelApprovalService
                .update({
                  input: {
                    ...modalConfirm.data.fields,
                    _id: modalConfirm.data.id,
                  },
                })
                .then((res: any) => {
                  if (res.updatePanelApproval.success) {
                    Toast.success({
                      message: `😊 ${res.updatePanelApproval.message}`,
                    });
                    panelApprovalStore.panelApprovalService.listPanelApproval();
                  }
                });
              break;
            }
            case 'updateMany': {
              panelApprovalStore.panelApprovalService
                .update({
                  input: {
                    updateMany: {
                      fields: modalConfirm.data.rows,
                      type: modalConfirm.data.type,
                    },
                  },
                })
                .then((res: any) => {
                  if (res.updatePanelApproval.success) {
                    Toast.success({
                      message: `😊 ${res.updatePanelApproval.message}`,
                    });
                    panelApprovalStore.panelApprovalService.listPanelApproval();
                  }
                });
              break;
            }
          }
        }}
        onClose={() => {
          setModalConfirm({show: false});
        }}
      />
    </>
  );
});

export default PanelApproval;
