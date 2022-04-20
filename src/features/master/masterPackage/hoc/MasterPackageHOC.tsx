/* eslint-disable */
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import * as LibraryUtils from '@/library/utils';

export const MasterPackageHOC = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {loginStore, masterPackageStore, routerStore} = useStores();
    useEffect(() => {
      masterPackageStore &&
        masterPackageStore.updateMasterPackage({
          ...masterPackageStore.masterPackage,
          lab: loginStore.login.lab,
          status: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            'STATUS',
          ),
          environment: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            'ENVIRONMENT',
          ),
          serviceType: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            'SERVICE_TYPE',
          ),
        });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        masterPackageStore.updateMasterPackage({
          ...masterPackageStore.masterPackage,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
