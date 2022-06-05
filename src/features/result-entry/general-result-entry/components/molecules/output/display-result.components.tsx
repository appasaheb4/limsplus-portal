import React from 'react';
import {Buttons} from '@/library/components';
import {observer} from 'mobx-react';

interface DisplayResultProps {
  row: any;
}

export const DisplayResult = observer(({row}: DisplayResultProps) => {
  return (
    <div className='relative w-full'>
      {row?.resultType === 'M' && row.result && (
        <>
          <ul>
            {JSON.parse(row.result)?.map((item: any, index: number) => (
              <li key={index}>{item?.code}</li>
            ))}
          </ul>
        </>
      )}
      {row?.resultType !== 'M' && (
        <span>
          {row.result.split('\n').map((str, index) => (
            <p key={index}>{str}</p>
          ))}
        </span>
      )}
    </div>
  );
});
