/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
export const PatientRegistrationHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    const {loginStore, patientManagerStore, routerStore, environmentStore} =
      useStores();

    const getPatientRegRecords = (type: string, value: string) => {
      patientManagerStore.patientManagerService.getFilterOptionList({
        input: {
          filter: {
            type,
            [type]: value,
          },
        },
      });
      patientManagerStore.patientManagerService.getPatientRegRecords({
        input: {
          filter: {type, [type]: value},
        },
      });
    };
    return <Component {...props} />;
  });
};
