/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const SalesTeamHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {loginStore, salesTeamStore, routerStore} = useStores();
    useEffect(() => {
      salesTeamStore.updateSalesTeam({
        ...salesTeamStore.salesTeam,
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        salesTeamStore.updateSalesTeam({
          ...salesTeamStore.salesTeam,
          environment: loginStore.login.environment,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
