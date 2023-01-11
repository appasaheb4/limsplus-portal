import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

export const TransmittedMessageHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    return <Component {...props} />;
  });
};
