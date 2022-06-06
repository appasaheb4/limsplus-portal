import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const AdministrativeDivisionsHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, administrativeDivisions, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      administrativeDivisions.updateAdministrativeDiv({
        ...administrativeDivisions.administrativeDiv,
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
        zone: getDefaultLookupItem(routerStore.lookupItems, 'ZONE'),
        sbu: getDefaultLookupItem(routerStore.lookupItems, 'SBU'),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        administrativeDivisions.updateAdministrativeDiv({
          ...administrativeDivisions.administrativeDiv,
          environment: loginStore.login.environment,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
