/* eslint-disable */
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const TestAnalyteMappingHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {loginStore, testAnalyteMappingStore, routerStore} = useStores();
    useEffect(() => {
      testAnalyteMappingStore.updateTestAnalyteMapping({
        ...testAnalyteMappingStore.testAnalyteMapping,
        lab: loginStore.login.lab,
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        testAnalyteMappingStore.updateTestAnalyteMapping({
          ...testAnalyteMappingStore.testAnalyteMapping,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
