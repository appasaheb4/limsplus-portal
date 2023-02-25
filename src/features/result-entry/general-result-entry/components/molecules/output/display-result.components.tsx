import React from 'react';
import {Form} from '@/library/components';
import {observer} from 'mobx-react';
import {FormHelper} from '@/helper';

interface DisplayResultProps {
  row: any;
  onSelect?: (item) => void;
}

export const DisplayResult = observer(({row, onSelect}: DisplayResultProps) => {
  return (
    <div className='relative w-full'>
      {row?.resultType === 'M' && row?.resultType !== 'V' && row.result && (
        <>
          <ul>
            {JSON.parse(row.result)?.map((item: any, index: number) => (
              <li key={index}>{item?.code}</li>
            ))}
          </ul>
        </>
      )}
      {row?.resultType !== 'M' && row?.resultType !== 'V' && (
        <span>
          {row.result.split('\n').map((str, index) => (
            <p key={index}>{str}</p>
          ))}
        </span>
      )}
      {row?.resultType == 'V' && (
        <Form.Input
          label=''
          type='text'
          placeholder={row?.result || 'Result'}
          maxLength={50}
          pattern={FormHelper.patterns.decimalPatterm}
          className={
            'w-full leading-4 p-2 h-10 focus:outline-none focus:ring block shadow-sm sm:text-base border-2  rounded-md'
          }
          onBlur={result => {
            if (result) {
              onSelect &&
                onSelect({
                  result: Number.parseFloat(result).toFixed(row?.picture || 0),
                  numeric: result,
                });
            }
          }}
        />
      )}
    </div>
  );
});
