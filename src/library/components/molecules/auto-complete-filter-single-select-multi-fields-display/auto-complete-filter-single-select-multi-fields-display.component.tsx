/* eslint-disable  */
import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { Spinner } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Icons } from '../..';

interface AutoCompleteFilterSingleSelectMultiFieldsDisplayProps {
  loader?: boolean;
  disable?: boolean;
  displayValue?: string;
  placeholder?: string;
  data: any;
  hasError?: boolean;
  className?: string;
  posstion?: string;
  keyboard?: string;
  onFilter?: (item: any) => void;
  onSelect?: (item: any) => any;
  onBlur?: (item: any) => any;
}

export const AutoCompleteFilterSingleSelectMultiFieldsDisplay = ({
  disable = false,
  loader = false,
  displayValue = '',
  placeholder = 'Search...',
  data,
  hasError = false,
  className,
  posstion = 'absolute',
  keyboard = 'text',
  onFilter,
  onSelect,
  onBlur,
}: AutoCompleteFilterSingleSelectMultiFieldsDisplayProps) => {
  const [value, setValue] = useState<string>(displayValue);
  const [options, setOptions] = useState<any[]>(data.list);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<number>();

  const useOutsideAlerter = ref => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && isListOpen) {
          setIsListOpen(false);
          //setValue('');
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, isListOpen]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    setOptions(data.list);
  }, [data]);

  // pv in save record showing exits data so we need remove this condition
  // useEffect(() => {
  //   if (!_.isEmpty(displayValue)) setValue(displayValue);
  // }, [displayValue]);

  useEffect(() => {
    setValue(displayValue);
  }, [displayValue]);

  const onChange = e => {
    const search = e.target.value?.toUpperCase();
    setValue(search);
    setFilterValue(search);
    onFilter && onFilter(search);
  };

  const onKeyUp = e => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 8) {
      const search = e.target.value;
      onFilter && onFilter(search);
    }
  };

  const onKeyDown = e => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (options.length > 0) {
        const selectedItem = options.find(item => item.labId === Number(value));
        if (selectedItem) {
          // setValue(
          //   data.displayKey.map(key => `${selectedItem[key]}`).join(' - '),
          // );
          setIsListOpen(false);
          onSelect && onSelect(selectedItem);
        }
      }
    }
  };

  return (
    <>
      <div ref={wrapperRef} className='w-full relative'>
        <div
          className={`flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2 ${
            hasError ? 'border-red' : 'border-gray-300'
          } rounded-md dark:text-black`}
        >
          <input
            placeholder={placeholder}
            type={keyboard}
            value={value || ''}
            className={`${className} w-full focus:outline-none bg-none dark:text-black`}
            onKeyUp={onKeyUp}
            onChange={onChange}
            onClick={() => setIsListOpen(true)}
            disabled={disable}
            onMouseDown={() => setValue('')}
            onBlur={e => onBlur && onBlur(e)}
            onKeyDown={onKeyDown}
          />
          {loader && <Spinner animation='border' className='mr-2 h-4 w-4' />}
          {isListOpen ? (
            <Icons.IconFa.FaChevronUp />
          ) : (
            <Icons.IconFa.FaChevronDown />
          )}
        </div>

        {options && isListOpen ? (
          options.length > 0 ? (
            <div
              className={`mt-1 absolute  w-full bg-gray-100 p-2 rounded-sm `}
              style={{
                zIndex: 500,
              }}
            >
              <ul>
                <PerfectScrollbar>
                  <div
                    style={{
                      height: 'auto',
                      maxHeight: '350px',
                    }}
                  >
                    {options?.map((item, index) => (
                      <li
                        key={index}
                        className='text-gray-400 flex items-center'
                        onClick={() => {
                          setValue(
                            data.displayKey
                              .map(key => {
                                if (!_.isEmpty(item[key]?.toString()))
                                  return `${item[key]?.toString()}`;
                                else return '#';
                              })
                              .join(' - ')
                              ?.replaceAll('- #', ''),
                          );
                          setIsListOpen(false);
                          onSelect && onSelect(item);
                        }}
                      >
                        {' '}
                        <label
                          className='ml-2 mt-1 text-black'
                          style={{
                            textOverflow: 'ellipsis',
                            minWidth: 0,
                            overflow: 'hidden',
                            maxWidth: '334px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {data.displayKey
                            .map(key => {
                              if (!_.isEmpty(item[key]?.toString()))
                                return `${item[key]?.toString()}`;
                              else return '#';
                            })
                            .join(' - ')
                            ?.replaceAll('- #', '')}
                        </label>
                      </li>
                    ))}
                  </div>
                </PerfectScrollbar>
              </ul>
            </div>
          ) : (
            <div
              className={`flex mt-1 absolute  w-full bg-gray-100 p-2 rounded-sm justify-center items-center`}
              style={{
                zIndex: 500,
              }}
            >
              <span>Records not found</span>
            </div>
          )
        ) : null}
      </div>
    </>
  );
};
