import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';

export const PatientManagerHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const { loginStore, patientManagerStore, routerStore, environmentStore } =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      patientManagerStore.updatePatientManager({
        ...patientManagerStore.patientManger,
        species: getDefaultLookupItem(
          routerStore.lookupItems,
          'PATIENT MANAGER - SPECIES',
        ),
        breed:
          getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT MANAGER - SPECIES',
          ) === 'H'
            ? null
            : undefined,
        extraData: {
          ...patientManagerStore.patientManger?.extraData,
          bloodGroup: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT VISIT - BLOOD_GROUP',
          ),
          enteredBy: loginStore.login.userId,
          status: getDefaultLookupItem(
            routerStore.lookupItems,
            'PATIENT MANAGER - STATUS',
          ),
        },
      });
      if (!patientManagerStore.patientManger.extraData?.country) {
        // DEFAULT_COUNTRY
        environmentStore.EnvironmentService.filterByFields({
          input: {
            filter: {
              fields: ['variable'],
              srText: 'DEFAULT_COUNTRY',
            },
            page: 0,
            limit: 10,
          },
        }).then(res => {
          patientManagerStore.updatePatientManager({
            ...patientManagerStore.patientManger,
            extraData: {
              ...patientManagerStore.patientManger.extraData,
              country: res.filterByFieldsEnviroment.data[0]?.value,
            },
          });
        });
      }
      if (loginStore.login && loginStore.login.role !== 'ADMINISTRATOR') {
        patientManagerStore.updatePatientManager({
          ...patientManagerStore.patientManger,
          extraData: {
            ...patientManagerStore.patientManger?.extraData,
            environment: loginStore.login.environment,
          },
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
