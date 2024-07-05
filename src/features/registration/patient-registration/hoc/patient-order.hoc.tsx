import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { eventEmitter } from '@/core-utils';

export const PatientOrderHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, patientOrderStore, routerStore } = useStores();

    const fetchDefaultDetails = () => {
      patientOrderStore.updatePatientOrder({
        ...patientOrderStore.patientOrder,
        enteredBy: loginStore.login.userId,
      });
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      fetchDefaultDetails();
      eventEmitter.on('poReload', data => {
        fetchDefaultDetails();
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
