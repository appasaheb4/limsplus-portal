import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';

export const EnvironmentSettingsHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, environmentStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      environmentStore.updateEnvironmentSettings({
        ...environmentStore.environmentSettings,
        status: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONEMENT SETTING - STATUS',
        ),
      });

      environmentStore.updatEnvironmentVariable({
        ...environmentStore.environmentVariable,
        status: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT VARIABLE - STATUS',
        ),
      });
      if (loginStore.login && loginStore.login.role !== 'ADMINISTRATOR') {
        environmentStore.updateEnvironmentSettings({
          ...environmentStore.environmentSettings,
          environment: loginStore.login.environment,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
