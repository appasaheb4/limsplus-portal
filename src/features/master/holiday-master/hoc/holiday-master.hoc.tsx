import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';

export const HolidayMasterHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, holidayMasterStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      holidayMasterStore.updateHolidayMaster({
        ...holidayMasterStore.holidayMaster,
        enteredBy: loginStore.login?.userId,
      });
      // if (loginStore.login && loginStore.login.role !== 'ADMINISTRATOR') {
      //   libraryStore.updateLibrary({
      //     ...libraryStore.library,
      //     environment: loginStore.login.environment,
      //   });
      // }
    }, [holidayMasterStore, loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
