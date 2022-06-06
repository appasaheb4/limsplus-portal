import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const DataConversationHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, dataConversationStore, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      dataConversationStore.updateDataConversation({
        ...dataConversationStore.dataConversation,
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        dataConversationStore.updateDataConversation({
          ...dataConversationStore.dataConversation,
          environment: loginStore.login.environment,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
