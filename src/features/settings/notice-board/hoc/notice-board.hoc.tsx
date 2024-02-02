import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';

export const NoticeBoardHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginStore, noticeBoardStore, routerStore } = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        noticeBoardStore.updateNoticeBoard({
          ...noticeBoardStore.noticeBoard,
          lab: loginStore.login.lab,
        });
      }
      noticeBoardStore.updateNoticeBoard({
        ...noticeBoardStore.noticeBoard,
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
      });
      noticeBoardStore.fetchNoticeBoards();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, routerStore.lookupItems]);

    return <Component {...props} />;
  });
};
