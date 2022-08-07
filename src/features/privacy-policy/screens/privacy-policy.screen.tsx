import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Toast} from '@/library/components';
import _ from 'lodash';
import {useStores} from '@/stores';
import Parser from 'html-react-parser';

export const PrivacyPolicy = observer(() => {
  const [content, setContent] = useState<any>();
  const {libraryStore} = useStores();
  useEffect(() => {
    libraryStore.libraryService
      .librarysByCode({input: {code: 'privacy-policy'}})
      .then((res: any) => {
        if (!res.librarysByCode.success)
          Toast.error({
            message: `😔 ${res.librarysByCode.message}`,
          });
        setContent(
          res?.librarysByCode?.data?.length > 0
            ? res.librarysByCode.data[0].details
            : null,
        );
      });
  });
  return <div>{content && Parser(content)}</div>;
});
