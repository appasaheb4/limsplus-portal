import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';

export const TestPanelMappingHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, testPanelMappingStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      testPanelMappingStore &&
        testPanelMappingStore.updateTestPanelMapping({
          ...testPanelMappingStore.testPanelMapping,
          lab: loginStore.login.lab,
          status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
          // environment: getDefaultLookupItem(
          //   routerStore.lookupItems,
          //   'ENVIRONMENT',
          // ),
        });
      if (loginStore.login && loginStore.login.role !== 'ADMINISTRATOR') {
        testPanelMappingStore.updateTestPanelMapping({
          ...testPanelMappingStore.testPanelMapping,
          environment: loginStore.login.environment,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
