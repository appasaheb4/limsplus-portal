/* eslint-disable */
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const SectionHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {loginStore, sectionStore, routerStore} = useStores();
    useEffect(() => {
      sectionStore &&
        sectionStore.updateSection({
          ...sectionStore.section,
          status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            'ENVIRONMENT',
          ),
        });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        sectionStore.updateSection({
          ...sectionStore.section,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
