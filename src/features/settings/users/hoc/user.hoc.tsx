import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';

export const UsersHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, userStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      userStore.updateUser({
        ...userStore.user,
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
        userGroup: getDefaultLookupItem(routerStore.lookupItems, 'USER_GROUP'),
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
