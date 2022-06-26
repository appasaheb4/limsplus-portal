import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const PageSettingHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, reportSettingStore, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      reportSettingStore.updatePageSetting({
        ...reportSettingStore.pageSetting,
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'PAGE SETTING-ENVIRONMENT',
        ),
        pageSize: getDefaultLookupItem(
          routerStore.lookupItems,
          'PAGE SETTING-PAPER_SIZE',
        ),
        topMargin: getDefaultLookupItem(
          routerStore.lookupItems,
          'PAGE SETTING-TOP_MARGIN',
        ),
        bottomMargin: getDefaultLookupItem(
          routerStore.lookupItems,
          'PAGE SETTING-BOTTOM MARGIN',
        ),
        leftMargin: getDefaultLookupItem(
          routerStore.lookupItems,
          'PAGE SETTING-LEFT_MARGIN',
        ),
        rightMargin: getDefaultLookupItem(
          routerStore.lookupItems,
          'PAGE SETTING-RIGHT_MARGIN',
        ),
        headerSize: getDefaultLookupItem(
          routerStore.lookupItems,
          'PAGE SETTING-HEADER_SIZE',
        ),
        footerSize: getDefaultLookupItem(
          routerStore.lookupItems,
          'PAGE SETTING-FOOTER_SIZE',
        ),
        pageOrientation: getDefaultLookupItem(
          routerStore.lookupItems,
          'PAGE SETTING-PAGE_ORIENTATION',
        ),
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
