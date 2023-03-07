import React from 'react';
import {Form, Tooltip, Icons} from '@/library/components';
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
      {row?.resultType !== 'M' &&
        row?.resultType !== 'V' &&
        row?.resultType !== 'FR' && (
          <span>
            {row.result?.split('\n').map((str, index) => (
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
      {row?.resultType == 'FR' && !row.result && (
        <Form.InputFile
          label='File'
          placeholder={'File'}
          accept='application/pdf'
          onChange={e => {
            const file = e.target.files[0];
            if (file) {
              onSelect &&
                onSelect({
                  result: file,
                });
            }
          }}
        />
      )}
      {row?.resultType == 'FR' && row?.result && (
        <div className='flex'>
          <Tooltip tooltipText='Report'>
            <Icons.IconContext
              size='20'
              color='#000'
              onClick={() => {
                window.open(row?.result, '_black');
              }}
            >
              {Icons.getIconTag(Icons.IconBs.BsFilePdf)}
            </Icons.IconContext>
            <span>
              {typeof row?.result == 'string' &&
                row?.result
                  ?.split('/')
                  .pop()
                  .slice(11, row?.result?.split('/').pop()?.length)}
            </span>
          </Tooltip>
        </div>
      )}
    </div>
  );
});
