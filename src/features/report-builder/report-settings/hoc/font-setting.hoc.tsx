import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const FontSettingHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, reportSettingStore, routerStore} = useStores();

    console.log({env: routerStore.lookupItems});

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      reportSettingStore.updateFontSetting({
        ...reportSettingStore.fontSetting,
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'FONT SETTING-ENVIRONMENT',
        ),
        fontName: getDefaultLookupItem(
          routerStore.lookupItems,
          'FONT SETTING-FONT_NAME',
        ),
        fontCase: getDefaultLookupItem(
          routerStore.lookupItems,
          'FONT SETTING-FONT_CASE',
        ),
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
