import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';
import { eventEmitter } from '@/core-utils';

export const PatientVisitHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {
      loginStore,
      patientVisitStore,
      routerStore,
      registrationLocationsStore,
      appStore,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useStores();

    const fetchDefaultDetails = () => {
      const deliveryMode = [
        {
          code: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT VISIT - DELIVERY_MODE',
          ),
          selected: true,
        },
      ];
      patientVisitStore.updatePatientVisit({
        ...patientVisitStore.patientVisit,
        deliveryMode,
        rLab: loginStore.login.lab,
        reportPriority: getDefaultLookupItem(
          routerStore.lookupItems,
          'PATIENT VISIT - REPORT_PRIORITY',
        ),
        status: getDefaultLookupItem(
          routerStore.lookupItems,
          'PATIENT VISIT - STATUS',
        ),
        extraData: {
          ...patientVisitStore.patientVisit.extraData,
          enteredBy: loginStore.login.userId,
          accountType: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT VISIT - ACCOUNT_TYPE',
          ),

          methodCollection: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT VISIT - METHOD_COLLECTION',
          ),
          approvalStatus: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT VISIT - APPROVAL_STATUS',
          ),
          reportStatus: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT VISIT - REPORT_STATUS',
          ),
          loginInterface:
            loginStore.login.systemInfo?.device !== 'Desktop' ? 'M' : 'D',
          registrationInterface: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT VISIT - REGISTRATION_INTERFACE',
          ),
          billingMethod: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT VISIT - BILLING_METHOD',
          ),
          archieve: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT VISIT - ARCHIVED',
          ),
        },
      });
      registrationLocationsStore.updateSelectedItems({
        ...registrationLocationsStore.selectedItems,
        deliveryMode,
      });

      if (loginStore.login && loginStore.login.role !== 'ADMINISTRATOR') {
        patientVisitStore.updatePatientVisit({
          ...patientVisitStore.patientVisit,
          extraData: {
            ...patientVisitStore.patientVisit.extraData,
            environment: loginStore.login.environment,
          },
        });
      }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      fetchDefaultDetails();
      eventEmitter.on('pvReload', data => {
        fetchDefaultDetails();
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems, appStore.environmentValues]);

    return <Component {...props} />;
  });
};
