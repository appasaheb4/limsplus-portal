import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';
import {dashboardRouter as dashboardRoutes} from '@/routes';
import * as LibraryUtils from '@/library/utils';
let router = dashboardRoutes;
export const PossibleResultHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, possibleResultsStore, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      router = router.filter((item: any) => {
        if (item.name !== 'Dashboard') {
          item.toggle = false;
          item.title = item.name;
          item = item.children.filter(childernItem => {
            childernItem.title = childernItem.name;
            childernItem.toggle = false;
            return childernItem;
          });
          return item;
        }
      });
      possibleResultsStore.updatePossibleResults({
        ...possibleResultsStore.possibleResults,
        status: LibraryUtils.getDefaultLookupItem(
          routerStore.lookupItems,
          'STATUS',
        ),
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        possibleResultsStore.updatePossibleResults({
          ...possibleResultsStore.possibleResults,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, possibleResultsStore, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
