import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';

export const DoctorsHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, doctorsStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      doctorsStore.updateDoctors({
        ...doctorsStore.doctors,
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
        // environment: getDefaultLookupItem(
        //   routerStore.lookupItems,
        //   'ENVIRONMENT',
        // ),
        title: getDefaultLookupItem(routerStore.lookupItems, 'TITLE'),
        speciality: getDefaultLookupItem(routerStore.lookupItems, 'SPECIALITY'),
        salesTerritoRy: getDefaultLookupItem(
          routerStore.lookupItems,
          'SPECIALITY',
        ),
        reportPriority: getDefaultLookupItem(
          routerStore.lookupItems,
          'REPORT_PRIORITY',
        ),
        registrationLocation: getDefaultLookupItem(
          routerStore.lookupItems,
          'STATUS',
        ),
        category: getDefaultLookupItem(routerStore.lookupItems, 'CATEGORY'),
        doctorType: getDefaultLookupItem(
          routerStore.lookupItems,
          'DOCTOR_TYPE',
        ),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          environment: loginStore.login.environment,
        });
      }
    }, [doctorsStore, loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
