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
                <ul className='flex flex-col gap-1 p-2'>
                  {options?.map((item: string, index) => (
                    <li key={index} className='flex items-center'>
                      <input
                        className='flex bg-black'
                        type='checkbox'
                        id={`checkbox-${Date.now()}`}
                        checked={
                          !_.isEmpty(
                            selectedOptions?.find(
                              e =>
                                e[displayField]?.toUpperCase() ==
                                item[displayField]?.toUpperCase(),
                            ),
                          )
                            ? true
                            : false
                        }
                        onChange={() => {
                          if (
                            !_.isEmpty(
                              selectedOptions?.find(
                                e =>
                                  e[displayField]?.toUpperCase() ==
                                  item[displayField]?.toUpperCase(),
                              ),
                            )
                          ) {
                            setSelectedOptions(
                              selectedOptions?.filter(
                                e =>
                                  e[displayField]?.toUpperCase() !=
                                  item[displayField]?.toUpperCase(),
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
                      <span className='flex ml-2  dark:text-white text-center'>
                        {item[displayField]}
                      </span>
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
