/* eslint-disable  */
import React, {useState, useEffect, useRef} from 'react';
import {Spinner} from 'react-bootstrap';
import {Icons} from '../..';

interface AutoCompleteFilterMutiSelectProps {
  loader?: boolean;
  placeholder?: string;
  data: any;
  hasError?: boolean;
  onFilter: (value: string) => void;
  onUpdate: (item: any) => void;
  onSelect: (item: any) => any;
}

export const AutoCompleteFilterMutiSelect = ({
  loader = false,
  placeholder = 'Search...',
  data,
  hasError = false,
  onFilter,
  onUpdate,
  onSelect,
}: AutoCompleteFilterMutiSelectProps) => {
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
  const getSelectedItem = (
    selectedItem: any[],
    list: any[],
    findKey: string,
  ) => {
    if (count === 0) {
      const finalList = list.filter((item, index) => {
        item.selected = false;
        selectedItem && selectedItem.length > 0
          ? selectedItem.find((sItem, index) => {
              if (sItem._id === item._id) {
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
    setOriginalOptions(getSelectedItem(data.selected, data.list, data.findKey));
    setOptions(getSelectedItem(data.selected, data.list, data.findKey));
    //console.log('renader');
  }, [data, data.selected]);

  const onChange = e => {
    const search = e.target.value;
    setValue(search);
    onFilter(search);
  };

  const onKeyUp = e => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 8) {
      const search = e.target.value;
      onFilter(search);
    }
  };

  return (
    <>
      <div ref={wrapperRef}>
        <div
          className={`flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2 ${
            hasError ? 'border-red' : 'border-gray-300'
          } rounded-md`}
        >
          <input
            placeholder={placeholder}
            value={
              !isListOpen
                ? `${(data.selected && data.selected.length) || 0} Items`
                : value
            }
            className={`w-full focus:outline-none bg-none`}
            onKeyUp={onKeyUp}
            onChange={onChange}
            onClick={() => setIsListOpen(true)}
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
              <div className='mt-1 absolute bg-gray-100 p-2 rounded-sm z-50'>
                <ul>
                  {options?.map((item, index) => (
                    <>
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
                          {' '}
                          {item[data.displayKey]}
                        </label>
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
