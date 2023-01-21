import React, {useCallback, useEffect, useMemo} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {useStores} from '@/stores';
import {getDefaultLookupItem, uuidv4} from '@/library/utils';

export const PatientVisitHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {
      loginStore,
      patientVisitStore,
      routerStore,
      environmentStore,
      appStore,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useStores();
    let labId: any = Number.parseFloat(
      uuidv4(appStore.environmentValues?.LABID_LENGTH?.value || 4),
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMemo(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      labId = Number.parseFloat(
        uuidv4(appStore.environmentValues?.LABID_LENGTH?.value || 4),
      );
    }, [appStore.environmentValues?.LABID_AUTO_GENERATE]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      patientVisitStore.updatePatientVisit({
        ...patientVisitStore.patientVisit,
        rLab: loginStore.login.lab,
        reportPriority: getDefaultLookupItem(
          routerStore.lookupItems,
          'PATIENT VISIT - DELIVERY_TYPE',
        ),
        status: getDefaultLookupItem(
          routerStore.lookupItems,
          'PATIENT VISIT - STATUS',
        ),
        labId:
          appStore.environmentValues?.LABID_AUTO_GENERATE?.value.toLowerCase() !==
          'no'
            ? labId
            : '',
        extraData: {
          ...patientVisitStore.patientVisit.extraData,
          enteredBy: loginStore.login.userId,
          accountType: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT VISIT - ACCOUNT_TYPE',
          ),
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT VISIT - ENVIRONMENT',
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
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        patientVisitStore.updatePatientVisit({
          ...patientVisitStore.patientVisit,
          extraData: {
            ...patientVisitStore.patientVisit.extraData,
            environment: loginStore.login.environment,
          },
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems, appStore.environmentValues]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      // get Environment value
      //if (!_.isBoolean(appStore.environmentValues.LABID_AUTO_GENERATE.allLabs)) {
      environmentStore.EnvironmentService.findValue({
        input: {
          filter: {
            variable: ['LABID_AUTO_GENERATE', 'LABID_LENGTH'],
            lab: loginStore.login.lab,
          },
        },
      }).then(res => {
        if (!res.getEnviromentValue.success) return;
        appStore.updateEnvironmentValue({
          ...appStore.environmentValues,
          LABID_AUTO_GENERATE: {
            ...appStore.environmentValues?.LABID_AUTO_GENERATE,
            allLabs: res.getEnviromentValue.enviromentValues.find(
              item => item.variable === 'LABID_AUTO_GENERATE',
            ).data[0].allLabs,
            value: res.getEnviromentValue.enviromentValues.find(
              item => item.variable === 'LABID_AUTO_GENERATE',
            ).data[0].value,
          },
          LABID_LENGTH: {
            ...appStore.environmentValues?.LABID_LENGTH,
            allLabs: res.getEnviromentValue.enviromentValues.find(
              item => item.variable === 'LABID_LENGTH',
            ).data[0].allLabs,
            value: res.getEnviromentValue.enviromentValues.find(
              item => item.variable === 'LABID_LENGTH',
            ).data[0].value,
          },
        });
      });
      //}
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login]);
    return <Component {...props} />;
  });
};
