import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';

export const InstResultMappingHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, segmentMappingStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect(() => {
    //   segmentMappingStore.updateSegmentMapping({
    //     ...segmentMappingStore.segmentMapping,
    //     environment: getDefaultLookupItem(
    //       routerStore.lookupItems,
    //       'ENVIRONMENT',
    //     ),
    //   });
    //   if (loginStore.login && loginStore.login.role !== 'ADMINISTRATOR') {
    //     segmentMappingStore.updateSegmentMapping({
    //       ...segmentMappingStore.segmentMapping,
    //       environment: loginStore.login.environment,
    //     });
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
