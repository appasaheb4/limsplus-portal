import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem, getDefaultLookupItems } from '@/library/utils';

export const RegistrationLocationHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, registrationLocationsStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      registrationLocationsStore.updateRegistrationLocations({
        ...registrationLocationsStore.registrationLocations,
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
        // environment: getDefaultLookupItem(
        //   routerStore.lookupItems,
        //   'ENVIRONMENT',
        // ),
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
        reportPriority: getDefaultLookupItem(
          routerStore.lookupItems,
          'REPORT_PRIORITY',
        ),
        category: getDefaultLookupItem(routerStore.lookupItems, 'CATEGORY'),
        customerGroup: getDefaultLookupItem(
          routerStore.lookupItems,
          'CUSTOMER_GROUP',
        ),
        deliveryMode: getDefaultLookupItems(
          routerStore.lookupItems,
          'DELIVERY_METHOD',
        ),
      });
      registrationLocationsStore.updateSelectedItems({
        ...registrationLocationsStore.selectedItems,
        deliveryMode: getDefaultLookupItems(
          routerStore.lookupItems,
          'DELIVERY_METHOD',
        ),
      });
      if (loginStore.login && loginStore.login.role !== 'ADMINISTRATOR') {
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, registrationLocationsStore, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
