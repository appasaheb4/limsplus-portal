/* eslint-disable */
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const DeginisationHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {loginStore, departmentStore, routerStore} = useStores();
    useEffect(() => {
      departmentStore &&
        departmentStore.updateDepartment({
          ...departmentStore.department,
          lab: loginStore.login.lab,
          status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            'ENVIRONMENT',
          ),
        });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        departmentStore.updateDepartment({
          ...departmentStore.department,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
