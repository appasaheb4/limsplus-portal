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
          isDelete={false}
          isEditModify={false}
          onPageSizeChange={(page, limit) => {
            transmittedMessageStore.transmittedMessageService.listTransmittedMessage(
              page,
              limit,
            );
          }}
          onFilter={(type, filter, page, limit) => {
            // transmittedMessageStore.transmittedMessageService.filter({
            //   input: {type, filter, page, limit},
            // });
          }}
        />
      </div>
    </>
  );
});

export default TransmittedMessage;
