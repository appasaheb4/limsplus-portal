import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const MasterPanelHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, masterPanelStore, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      masterPanelStore &&
        masterPanelStore.updateMasterPanel({
          ...masterPanelStore.masterPanel,
          rLab: loginStore.login.lab,
          status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            'ENVIRONMENT',
          ),
          serviceType: getDefaultLookupItem(
            routerStore.lookupItems,
            'SERVICE_TYPE',
          ),
          processing: getDefaultLookupItem(
            routerStore.lookupItems,
            'PROCESSING',
          ),
          category: getDefaultLookupItem(routerStore.lookupItems, 'CATEGORY'),
          sex: getDefaultLookupItem(routerStore.lookupItems, 'SEX'),
          panelType: getDefaultLookupItem(
            routerStore.lookupItems,
            'PANEL_TYPE',
          ),
          ageAction: getDefaultLookupItem(
            routerStore.lookupItems,
            'AGE_ACTION',
          ),
          sexAction: getDefaultLookupItem(
            routerStore.lookupItems,
            'SEX_ACTION',
          ),
        });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        masterPanelStore.updateMasterPanel({
          ...masterPanelStore.masterPanel,
          environment: loginStore.login.environment,
        });
      }
    }, [loginStore.login, masterPanelStore, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
