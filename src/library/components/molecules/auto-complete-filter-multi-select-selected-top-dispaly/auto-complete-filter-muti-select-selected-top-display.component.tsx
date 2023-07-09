/* eslint-disable  */
import React, {useState, useEffect, useRef} from 'react';
import {Spinner} from 'react-bootstrap';
import _ from 'lodash';
import {Icons} from '../..';

interface AutoCompleteFilterMultiSelectSelectedTopDisplayProps {
  uniqueField?: string;
  loader?: boolean;
  placeholder?: string;
  data: any;
  hasError?: boolean;
  disable?: boolean;
  isUpperCase?: boolean;
  name?: string;
  onFilter?: (value: string) => void;
  onUpdate: (item: any) => void;
  onSelect: (item: any, isSelectedRemove?: boolean) => any;
  onBlur?: (e: any) => void;
}

export const AutoCompleteFilterMultiSelectSelectedTopDisplay = ({
  uniqueField = '_id',
  loader = false,
  placeholder = 'Search...',
  data,
  hasError = false,
  disable = false,
  isUpperCase = false,
  name,
  onFilter,
  onUpdate,
  onSelect,
  onBlur,
}: AutoCompleteFilterMultiSelectSelectedTopDisplayProps) => {
  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<any[]>();
  const [originalOptions, setOriginalOptions] = useState<any[]>();
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const useOutsideAlerter = ref => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && isListOpen) {
          if (originalOptions && options) {
            if (isListOpen) {
              onUpdate && onUpdate(data.selected);
            }
          }
          setIsListOpen(false);
          setValue('');
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
  let count = 0;
  const getSelectedItem = (selectedItem: any[], list: any[]) => {
    if (count === 0) {
      const finalList = list.filter((item, index) => {
        item.selected = false;
        selectedItem && selectedItem.length > 0
          ? selectedItem.find((sItem, index) => {
              if (sItem[uniqueField] === item[uniqueField]) {
                item.selected = true;
              }
            })
          : (item.selected = false);
        count++;
        return item;
      });
      list = finalList;
    }
    return list;
  };

  useEffect(() => {
    setOriginalOptions(getSelectedItem(data.selected, data.list));
    setOptions(getSelectedItem(data.selected, data.list));
  }, [data, data.selected]);

  const onChange = e => {
    const search = e.target.value;
    setValue(search);
    onFilter && onFilter(search);
  };

  const onKeyUp = e => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 8) {
      const search = e.target.value;
      onFilter && onFilter(search);
    }
  };

  return (
    <>
      <div ref={wrapperRef} className='w-full relative'>
        <div
          className={`flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2 ${
            hasError ? 'border-red' : 'border-gray-300'
          } rounded-md`}
        >
          <input
            placeholder={placeholder}
            disabled={disable}
            name={name}
            value={
              !isListOpen
                ? `${(data.selected && data.selected.length) || 0} Items`
                : isUpperCase
                ? value?.toUpperCase()
                : value
            }
            className={`w-full focus:outline-none bg-none`}
            onKeyUp={onKeyUp}
            onChange={onChange}
            onClick={() => setIsListOpen(true)}
            onBlur={e => onBlur && onBlur(e)}
          />
          {loader && <Spinner animation='border' className='mr-2 h-4 w-4' />}
          {isListOpen ? (
            <Icons.IconFa.FaChevronUp />
          ) : (
            <Icons.IconFa.FaChevronDown />
          )}
        </div>

        {options && isListOpen
          ? options?.length > 0 && (
              <div
                className='mt-1  absolute bg-gray-100 p-2 rounded-sm z-500'
                style={{zIndex: 80}}
              >
                <span>Selected</span>
                <ul>
                  {data.selected?.map((item, index) => (
                    <>
                      <li
                        key={index}
                        className='text-gray-400 flex items-center'
                      >
                        <input
                          type='checkbox'
                          checked={true}
                          onChange={() =>
                            onSelect({...item, selected: true}, true)
                          }
                        />{' '}
                        <label className='ml-2 mt-1 text-black'>
                          {data.displayKey
                            .map(
                              key =>
                                `${item[key]}
                              `,
                            )
                            .join(' - ')}
                        </label>
                      </li>
                    </>
                  ))}
                </ul>

                <span>Un-Selected</span>
                <hr />
                <ul>
                  {options?.map((item, index) => (
                    <>
                      {_.some(data.selected, {panelCode: item?.panelCode}) ==
                        false && (
                        <li
                          key={index}
                          className='text-gray-400 flex items-center'
                        >
                          <input
                            type='checkbox'
                            checked={item.selected}
                            onChange={() => onSelect(item)}
                          />{' '}
                          <label className='ml-2 mt-1 text-black'>
                            {data.displayKey
                              .map(
                                key =>
                                  `${item[key]}
                                          `,
                              )
                              .join(' - ')}
                          </label>
                        </li>
                      )}
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
