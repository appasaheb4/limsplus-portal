import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import * as LibraryUtils from '@/library/utils';

export const MasterPackageHOC = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, masterPackageStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      masterPackageStore &&
        masterPackageStore.updateMasterPackage({
          ...masterPackageStore.masterPackage,
          lab: loginStore.login.lab,
          status: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            'STATUS',
          ),
          // environment: LibraryUtils.getDefaultLookupItem(
          //   routerStore.lookupItems,
          //   'ENVIRONMENT',
          // ),
          serviceType: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            'SERVICE_TYPE',
          ),
        });
      if (loginStore.login && loginStore.login.role !== 'ADMINISTRATOR') {
        masterPackageStore.updateMasterPackage({
          ...masterPackageStore.masterPackage,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, masterPackageStore, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
