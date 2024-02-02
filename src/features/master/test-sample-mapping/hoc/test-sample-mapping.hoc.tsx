import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';

export const TestSampleMappingHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, testSampleMappingStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      testSampleMappingStore.updateSampleType({
        ...testSampleMappingStore.testSampleMapping,
        repentionUnits: getDefaultLookupItem(
          routerStore.lookupItems,
          'RETENTION_UNITS',
        ),
        minDrawVolUnit: getDefaultLookupItem(
          routerStore.lookupItems,
          'MIN_DRAW_VOL_UNIT',
        ),
        minTestVolUnit: getDefaultLookupItem(
          routerStore.lookupItems,
          'MIN_TEST_VOL_UNIT',
        ),
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
        // environment: getDefaultLookupItem(
        //   routerStore.lookupItems,
        //   'ENVIRONMENT',
        // ),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        testSampleMappingStore.updateSampleType({
          ...testSampleMappingStore.testSampleMapping,
          environment: loginStore.login.environment,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
