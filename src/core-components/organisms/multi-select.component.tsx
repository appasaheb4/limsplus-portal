/* eslint-disable  */
import React, { useState, useEffect, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import { Icons } from '@/library/components';

interface MultiSelectProps {
  options: Array<string>;
  hasError?: boolean;
  onSelect: (item: any) => any;
}

export const MultiSelect = ({
  options = [],
  hasError = false,
  onSelect,
}: MultiSelectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);

  return (
    <>
      <div>
        {options
          ? options?.length > 0 && (
              <div className='mt-1 absolute bg-gray-100 p-2 rounded-sm z-50'>
                <ul>
                  {options?.map((item: string, index) => (
                    <>
                      <li
                        key={index}
                        className='text-gray-400 flex items-center'
                      >
                        <input
                          type='checkbox'
                          checked={selectedOptions.includes(item)}
                          onChange={() => {
                            if (selectedOptions?.length == 0)
                              setSelectedOptions([item]);
                            else
                              setSelectedOptions(
                                selectedOptions.concat([item]),
                              );
                          }}
                          onBlur={() => {
                            onSelect(selectedOptions);
                          }}
                        />{' '}
                        <label className='ml-2 mt-1 text-black'> {item}</label>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            )
          : null}
      </div>
    </>
  );
};
