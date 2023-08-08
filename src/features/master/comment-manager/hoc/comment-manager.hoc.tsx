import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {getDefaultLookupItem} from '@/library/utils';

export const CommentManagerHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loginStore, commentManagerStore, routerStore} = useStores();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      commentManagerStore.updateCommentManager({
        ...commentManagerStore.commentManager,
        status: getDefaultLookupItem(routerStore.lookupItems, 'STATUS'),
        enteredBy: loginStore.login?.userId,
        environment: getDefaultLookupItem(
          routerStore.lookupItems,
          'ENVIRONMENT',
        ),
      });
    }, [commentManagerStore, loginStore.login, routerStore.lookupItems]);
    return <Component {...props} />;
  });
};
