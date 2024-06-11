/* eslint-disable  */
import React, { useState, useEffect, useRef } from 'react';
interface MultiSelectProps {
  options: Array<string>;
  selectedItems?: Array<string>;
  hasError?: boolean;
  onSelect: (item: any) => any;
}

export const MultiSelect = ({
  options = [],
  selectedItems = [],
  hasError = false,
  onSelect,
}: MultiSelectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);
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
          {selectedOptions?.length > 0 ? selectedOptions?.join(',') : 'Select'}
        </span>
        <div className={`flex mx-2 ${isListOpen ? `show` : `hidden`}`}>
          {options
            ? options?.length > 0 && (
                <ul>
                  {options?.map((item: string, index) => (
                    <>
                      <li key={index} className='flex items-center text-center'>
                        <input
                          className='bg-black'
                          type='checkbox'
                          checked={selectedOptions?.includes(item)}
                          onChange={() => {
                            if (selectedOptions?.includes(item)) {
                              setSelectedOptions(
                                selectedOptions?.filter(e => e != item),
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
                          {item}
                        </label>
                      </li>
                    </>
                  ))}
                </ul>
              )
            : null}
        </div>
      </div>
    </>
  );
};
