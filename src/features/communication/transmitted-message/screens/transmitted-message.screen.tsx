import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  ModalConfirm,
  MainPageHeading,
} from '@/library/components';
import { TransmittedMessageList } from '../components';
import { useStores } from '@/stores';

import MainPageHeadingComponents from '@/library/components/atoms/header/main-page-heading.components';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';

const TransmittedMessage = observer(() => {
  const { loginStore, transmittedMessageStore, routerStore } = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>();
  return (
    <>
      <MainPageHeading
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />

      <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
        <TransmittedMessageList
          data={transmittedMessageStore.transmittedMessageList || []}
          totalSize={transmittedMessageStore.transmittedMessageListCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
          }}
          isView={RouterFlow.checkPermission(
            routerStore.userPermission,
            'View',
          )}
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          // isUpdate={RouterFlow.checkPermission(
          //   routerStore.userPermission,
          //   'Update',
          // )}
          isUpdate={false}
          isExport={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Export',
          )}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Do you want to delete selected record?',
            });
          }}
          onPageSizeChange={(page, limit) => {
            transmittedMessageStore.transmittedMessageService.listTransmittedMessage(
              page,
              limit,
            );
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            transmittedMessageStore.transmittedMessageService.filter({
              input: { type, filter, page, limit },
            });
            global.filter = { mode: 'filter', type, filter, page, limit };
          }}
        />
        <ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === 'delete') {
              transmittedMessageStore.transmittedMessageService
                .delete({ input: { id: modalConfirm.id } })
                .then(res => {
                  setModalConfirm({ show: false });
                  if (res.removeTransmittedMessage.success) {
                    transmittedMessageStore.transmittedMessageService.listTransmittedMessage();
                    Toast.success({
                      message: `😊 ${res.removeTransmittedMessage.message}`,
                    });
                    if (global?.filter?.mode == 'pagination')
                      transmittedMessageStore.transmittedMessageService.listTransmittedMessage(
                        global?.filter?.page,
                        global?.filter?.limit,
                      );
                    else if (global?.filter?.mode == 'filter')
                      transmittedMessageStore.transmittedMessageService.filter({
                        input: {
                          type: global?.filter?.type,
                          filter: global?.filter?.filter,
                          page: global?.filter?.page,
                          limit: global?.filter?.limit,
                        },
                      });
                    else
                      transmittedMessageStore.transmittedMessageService.listTransmittedMessage();
                  }
                });
            }
          }}
          close={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  );
});

export default TransmittedMessage;
