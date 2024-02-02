import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';

export const DocumentSettingHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, lookupStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      lookupStore &&
        lookupStore.updateLookup({
          ...lookupStore.lookup,
          status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
          // environment: getDefaultLookupItem(
          //   routerStore.lookupItems,
          //   'ENVIRONMENT',
          // ),
        });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        lookupStore.updateLookup({
          ...lookupStore.lookup,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, lookupStore, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
