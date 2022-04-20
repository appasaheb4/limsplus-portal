/* eslint-disable */
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const EnvironmentSettingsHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {loginStore, environmentStore, routerStore} = useStores();
    useEffect(() => {
      environmentStore.updateEnvironmentSettings({
        ...environmentStore.environmentSettings,
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT SETTING - ENVIRONMENT',
        ),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        environmentStore.updateEnvironmentSettings({
          ...environmentStore.environmentSettings,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
