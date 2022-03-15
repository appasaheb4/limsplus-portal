/* eslint-disable */
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';
import {dashboardRouter as dashboardRoutes} from '@/routes';
let router = dashboardRoutes;
export const PossibleResultHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {loginStore, possibleResultsStore, routerStore} = useStores();
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
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
