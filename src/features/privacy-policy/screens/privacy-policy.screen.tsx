import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Toast} from '@/library/components';
import {useStores} from '@/stores';
import Parser from 'html-react-parser';

const PrivacyPolicy = observer(() => {
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
        console.log({res});
        setContent(
          res?.librarysByCode?.data?.length > 0
            ? res.librarysByCode.data[0].details
            : '',
        );
      });
  });
  return <div>{content && Parser(content)}</div>;
});

export default PrivacyPolicy;
