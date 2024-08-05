import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';

export const TatMasterHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, tatMasterStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      tatMasterStore.updateTatMaster({
        ...tatMasterStore.tatMaster,
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
        enteredBy: loginStore.login?.userId,
      });
      // if (loginStore.login && loginStore.login.role !== 'ADMINISTRATOR') {
      //   libraryStore.updateLibrary({
      //     ...libraryStore.library,
      //     environment: loginStore.login.environment,
      //   });
      // }
    }, [tatMasterStore, loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
