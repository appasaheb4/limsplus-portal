import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const ReferenceRangesHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, refernceRangesStore, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      refernceRangesStore.updateReferenceRanges({
        ...refernceRangesStore.referenceRanges,
        species: getDefaultLookupItem(routerStore.lookupItems, 'SPECIES'),
        rangeSetOn: getDefaultLookupItem(
          routerStore.lookupItems,
          'RANGE_SET_ON',
        ),
      });
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        refernceRangesStore.updateReferenceRanges({
          ...refernceRangesStore.referenceRanges,
          lab: loginStore.login.lab,
        });
      }
    }, [loginStore.login, refernceRangesStore, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
