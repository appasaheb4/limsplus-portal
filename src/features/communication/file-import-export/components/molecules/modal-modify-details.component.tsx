import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import dayjs from 'dayjs';
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

import {
  ModalTransition,
  Form,
  Header,
  PageHeading,
  Buttons,
  Icons,
} from '@/library/components';

interface ModalModifyDetailsProps {
  show: boolean;
  keys: string;
  itemIndex: number;
  keysIndex: number;
  onClose?: () => void;
  onUpdate: (value, keys, itemIndex, keysIndex, isUpdateAll) => void;
}

export const ModalModifyDetails = observer(
  ({
    show,
    keys,
    itemIndex,
    keysIndex,
    onClose,
    onUpdate,
  }: ModalModifyDetailsProps) => {
    const [inputFormat, setInputFormat] = useState('text');
    const [value, setValue] = useState<any>();
    const [isUpdateAll, setUpdateAll] = useState<boolean>(false);

    useEffect(() => {
      setInputFormat('text');
      setValue(null);
      setUpdateAll(false);
    }, [show]);

    return (
      <>
        <ModalTransition show={!!show} onClose={() => onClose && onClose()}>
          <Header>
            <PageHeading title={`Modify ${keys} Details`} />
          </Header>
          <div className='p-2'>
            <div className='flex flex-row gap-2'>
              <input
                checked={inputFormat == 'text' ? true : false}
                id='default-radio-1'
                type='radio'
                value='text'
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={() => {
                  setValue(null);
                  setInputFormat('text');
                }}
              />
              <label
                htmlFor='default-radio-1'
                className='text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Text
              </label>

              <input
                checked={inputFormat == 'radio' ? true : false}
                id='default-radio-2'
                type='radio'
                value='date'
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={() => {
                  setValue(null);
                  setInputFormat('radio');
                }}
              />
              <label
                htmlFor='default-radio-2'
                className='text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Date
              </label>
            </div>
            {inputFormat == 'text' ? (
              <Form.Input
                label={keys}
                placeholder='Enter value'
                value={value}
                onChange={value => {
                  setValue(value);
                }}
              />
            ) : (
              <Form.DatePicker
                label={keys}
                value={value ? dayjs(value, 'DD-MM-YYYY').toDate() : null}
                onFocusRemove={value => {
                  setValue(dayjs(value).format('DD-MM-YYYY'));
                }}
              />
            )}

            <div className='my-2 flex flex-row'>
              <input
                checked={isUpdateAll}
                type='checkbox'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={() => {
                  setUpdateAll(!isUpdateAll);
                }}
              />
              <label className='text-sm ml-2 font-medium text-gray-900 dark:text-gray-300'>
                {`Update all ${keys?.toLowerCase()}`}
              </label>
            </div>
            <div className='flex justify-center'>
              <Buttons.Button
                disabled={value ? false : true}
                size='medium'
                type='solid'
                onClick={() =>
                  onUpdate(value, keys, itemIndex, keysIndex, isUpdateAll)
                }
              >
                <Icons.EvaIcon icon='plus-circle-outline' />
                {'Upload'}
              </Buttons.Button>
            </div>
          </div>
        </ModalTransition>
      </>
    );
  },
);
