import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const InterfaceManagerHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, interfaceManagerStore, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      interfaceManagerStore.updateInterfaceManager({
        ...interfaceManagerStore.interfaceManager,
        interfaceType: getDefaultLookupItem(
          routerStore.lookupItems,
          'INTERFACE_TYPE',
        ),
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        interfaceManagerStore.updateInterfaceManager({
          ...interfaceManagerStore.interfaceManager,
          environment: loginStore.login.environment,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
