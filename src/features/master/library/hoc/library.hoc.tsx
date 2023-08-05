import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const LibraryHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, libraryStore, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      libraryStore.updateLibrary({
        ...libraryStore.library,
        position: getDefaultLookupItem(routerStore.lookupItems, 'POSITION'),
        groups: getDefaultLookupItem(routerStore.lookupItems, 'GROUPS'),
        libraryType: getDefaultLookupItem(
          routerStore.lookupItems,
          'LIBRARY_TYPE',
        ),
        parameter: getDefaultLookupItem(routerStore.lookupItems, 'PARAMETER'),
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
        enteredBy: loginStore.login?.userId,
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
      });
      // if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
      //   libraryStore.updateLibrary({
      //     ...libraryStore.library,
      //     environment: loginStore.login.environment,
      //   });
      // }
    }, [libraryStore, loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
