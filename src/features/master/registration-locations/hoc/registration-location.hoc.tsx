/* eslint-disable */
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const RegistrationLocationHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {loginStore, registrationLocationsStore, routerStore} = useStores();
    useEffect(() => {
      registrationLocationsStore.updateRegistrationLocations({
        ...registrationLocationsStore.registrationLocations,
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
        acClass: getDefaultLookupItem(routerStore.lookupItems, 'AC_CLASS'),
        accountType: getDefaultLookupItem(routerStore.lookupItems, 'AC_TYPE'),
        salesTerritoRy: getDefaultLookupItem(
          routerStore.lookupItems,
          'SPECIALITY',
        ),
        methodColn: getDefaultLookupItem(
          routerStore.lookupItems,
          'METHOD_COLN',
        ),
        deliveryMethod: getDefaultLookupItem(
          routerStore.lookupItems,
          'DELIVERY_METHOD',
        ),
        deliveryType: getDefaultLookupItem(
          routerStore.lookupItems,
          'DELIVERY_TYPE',
        ),
        category: getDefaultLookupItem(routerStore.lookupItems, 'CATEGORY'),
        customerGroup: getDefaultLookupItem(
          routerStore.lookupItems,
          'CUSTOMER_GROUP',
        ),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
