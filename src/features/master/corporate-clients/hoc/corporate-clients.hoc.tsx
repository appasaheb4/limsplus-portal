import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const CorporateClientsHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, corporateClientsStore, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      corporateClientsStore.updateCorporateClients({
        ...corporateClientsStore.corporateClients,
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
        salesTerritoRy: getDefaultLookupItem(
          routerStore.lookupItems,
          'SPECIALITY',
        ),
        deliveryMode: getDefaultLookupItem(
          routerStore.lookupItems,
          'DELIVERY_METHOD',
        ),
        reportType: getDefaultLookupItem(
          routerStore.lookupItems,
          'DELIVERY_TYPE',
        ),
        category: getDefaultLookupItem(routerStore.lookupItems, 'CATEGORY'),
        customerGroup: getDefaultLookupItem(
          routerStore.lookupItems,
          'CUSTOMER_GROUP',
        ),
        acClass: getDefaultLookupItem(routerStore.lookupItems, 'AC_CLASS'),
        acType: getDefaultLookupItem(routerStore.lookupItems, 'AC_TYPE'),
        billingOn: getDefaultLookupItem(routerStore.lookupItems, 'BILLING_ON'),
        billingFrequency: getDefaultLookupItem(
          routerStore.lookupItems,
          'BILLING_FREQUENCY',
        ),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        corporateClientsStore.updateCorporateClients({
          ...corporateClientsStore.corporateClients,
          environment: loginStore.login.environment,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
