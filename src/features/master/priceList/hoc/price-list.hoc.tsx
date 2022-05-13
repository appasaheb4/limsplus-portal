/* eslint-disable */
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const PriceListHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {loginStore, priceListStore, routerStore} = useStores();
    useEffect(() => {
      priceListStore.updatePriceList({
        ...priceListStore.priceList,
        priceGroup: getDefaultLookupItem(
          routerStore.lookupItems,
          'PRICE_GROUP',
        ),
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
      });

      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        priceListStore.updatePriceList({
          ...priceListStore.priceList,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
