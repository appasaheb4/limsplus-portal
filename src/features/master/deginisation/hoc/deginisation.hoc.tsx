import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const DeginisationHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, deginisationStore, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      deginisationStore &&
        deginisationStore.updateDescription({
          ...deginisationStore.deginisation,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            'ENVIRONMENT',
          ),
        });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        deginisationStore.updateDescription({
          ...deginisationStore.deginisation,
          environment: loginStore.login.environment,
        });
      }
    }, [deginisationStore, loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
