import React from 'react';
import {observer} from 'mobx-react';

export const FileImportExportHoc = (Component: React.FC<any>) => {
  return observer((props: any): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return <Component {...props} />;
  });
};
