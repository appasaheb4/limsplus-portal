import React, {useState, useMemo, useEffect} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  ModalConfirm,
  List,
  Svg,
  ModalImportFile,
  Icons,
} from '@/library/components';
import * as XLSX from 'xlsx';
import {Styles} from '@/config';
import {TransmittedMessageList} from '../components';
import {useForm} from 'react-hook-form';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';

const TransmittedMessage = observer(() => {
  const {loginStore, transmittedMessageStore, routerStore} = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>();
  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>

      <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
        <TransmittedMessageList
          data={transmittedMessageStore.transmittedMessageList || []}
          totalSize={transmittedMessageStore.transmittedMessageListCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
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
          isEditModify={false}
          onPageSizeChange={(page, limit) => {
            transmittedMessageStore.transmittedMessageService.listTransmittedMessage(
              page,
              limit,
            );
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            transmittedMessageStore.transmittedMessageService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {mode: 'filter', type, filter, page, limit};
          }}
        />
        <ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === 'delete') {
              transmittedMessageStore.transmittedMessageService
                .delete({input: {id: modalConfirm.id}})
                .then(res => {
                  setModalConfirm({show: false});
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
          onClose={() => setModalConfirm({show: false})}
        />
      </div>
    </>
  );
});

export default TransmittedMessage;
