import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';

export const NoticeBoardHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, noticeBoardStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (loginStore.login && loginStore.login.role !== 'SYSADMIN') {
        noticeBoardStore.updateNoticeBoard({
          ...noticeBoardStore.noticeBoard,
          lab: loginStore.login.lab,
        });
      }
      noticeBoardStore.fetchNoticeBoards();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login]);

    return <Component {...props} />;
  });
};
