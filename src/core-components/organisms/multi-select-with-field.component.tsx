/* eslint-disable  */
import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
interface MultiSelectWithFieldProps {
  displayField: string;
  options: Array<any>;
  selectedItems?: Array<any>;
  hasError?: boolean;
  onSelect: (item: any) => any;
}

export const MultiSelectWithField = ({
  displayField = '',
  options = [],
  selectedItems = [],
  hasError = false,
  onSelect,
}: MultiSelectWithFieldProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Array<any>>([]);
  const [isListOpen, setIsListOpen] = useState(false);

  const useOutsideAlerter = ref => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && isListOpen) {
          setIsListOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, isListOpen]);
  };

  useEffect(() => {
    setSelectedOptions(selectedItems);
  }, [selectedItems]);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <>
      <div
        className={`flex dark:bg-boxdark dark:text-white flex-col w-full rounded-md border-2 ${
          hasError ? 'border-red  ' : 'border-gray-300'
        }`}
        ref={wrapperRef}
      >
        <span
          className='p-2 mt-1 shadow-sm'
          onClick={() => {
            setIsListOpen(!isListOpen);
          }}
        >
          {selectedOptions?.length > 0
            ? `${selectedOptions?.length} Items`
            : 'Select'}
        </span>
        <div className={`flex mx-2 ${isListOpen ? `show` : `hidden`}`}>
          {options
            ? options?.length > 0 && (
                <ul>
                  {options?.map((item: string, index) => (
                    <li key={index} className='flex items-center text-center'>
                      <input
                        className='bg-black'
                        type='checkbox'
                        checked={
                          !_.isEmpty(
                            selectedOptions?.find(
                              e => e[displayField] == item[displayField],
                            ),
                          )
                            ? true
                            : false
                        }
                        onChange={() => {
                          if (
                            !_.isEmpty(
                              selectedOptions?.find(
                                e => e[displayField] == item[displayField],
                              ),
                            )
                          ) {
                            setSelectedOptions(
                              selectedOptions?.filter(
                                e => e[displayField] != item[displayField],
                              ),
                            );
                          } else {
                            if (selectedOptions?.length > 0) {
                              setSelectedOptions(
                                selectedOptions?.concat([item]),
                              );
                            } else {
                              setSelectedOptions([item]);
                            }
                          }
                        }}
                        onBlur={() => {
                          if (!isListOpen) onSelect(selectedOptions);
                        }}
                      />{' '}
                      <label className='ml-3 mt-2 pt-1 dark:text-white'>
                        {' '}
                        {item[displayField]}
                      </label>
                    </li>
                  ))}
                </ul>
              )
            : null}
        </div>
      </div>
    </>
  );
};
