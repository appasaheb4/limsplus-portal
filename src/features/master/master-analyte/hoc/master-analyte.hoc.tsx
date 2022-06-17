import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const MasterAnalyteHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, masterAnalyteStore, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      masterAnalyteStore &&
        masterAnalyteStore.updateMasterAnalyte({
          ...masterAnalyteStore.masterAnalyte,
          lab: loginStore.login.lab,
          status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            'ENVIRONMENT',
          ),
          usage: getDefaultLookupItem(routerStore.lookupItems, 'USAGE'),
          units: getDefaultLookupItem(routerStore.lookupItems, 'UNITS'),
          analyteType: getDefaultLookupItem(
            routerStore.lookupItems,
            'ANALYTE_TYPE',
          ),
          resultType: getDefaultLookupItem(
            routerStore.lookupItems,
            'RESULT_TYPE',
          ),
        });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        masterAnalyteStore.updateMasterAnalyte({
          ...masterAnalyteStore.masterAnalyte,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, masterAnalyteStore, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
