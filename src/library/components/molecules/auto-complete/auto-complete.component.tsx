/* eslint-disable  */
import React, {useState, useEffect, useRef} from 'react';
import {Icons} from '../..';

interface AutoCompleteProps {
  hasError?: boolean;
  placeholder?: string;
  data?: {
    list?: any[];
    displayKey?: string[];
    findKey?: string[];
  };
  onUpdate?: (item: any) => void;
  onChange: (item: any) => void;
}

export const AutoComplete = (props: AutoCompleteProps) => {
  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<any[]>();
  const [originalOptions, setOriginalOptions] = useState<any[]>();
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const valueRef = useRef('');

  const useOutsideAlerter = ref => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && isListOpen) {
          if (originalOptions && options) {
            if (isListOpen) {
              props.onUpdate &&
                props.onUpdate(options.filter(item => item.selected === true));
            }
          }
          setIsListOpen(false);
          props.onChange(valueRef.current);
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
    if (props) {
      setOriginalOptions(props.data && props.data.list);
      setOptions(props.data && props.data.list);
    }
  }, [props]);

  const filter = (search, data) => {
    if (search) {
      const filterArray = data.filter(item => {
        const filed: any = props.data?.findKey?.filter(findKey => {
          const value = item[findKey];
          return value.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
        const value = item[filed[0]];
        console.log({value});
        if (value) {
          return value.toLowerCase().indexOf(search.toLowerCase()) > -1;
        } else {
          return;
        }
      });
      //console.log({ filterArray })
      setOptions(filterArray);
    } else {
      setOptions(originalOptions);
    }
  };

  const onChange = e => {
    const search = e.target.value;
    filter(search, options);
    setValue(search);
    valueRef.current = search;
  };

  const onKeyUp = e => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 8) {
      const search = e.target.value;
      filter(search, originalOptions);
    }
  };

  const onChangeItem = (item: any) => {
    if (props.data && props.data.displayKey) {
      setValue(item[props.data.displayKey && props.data?.displayKey[0]]);
      props.onChange(item[props.data.displayKey && props.data?.displayKey[0]]);
    }
    setIsListOpen(false);
    setOptions(options);
  };

  return (
    <>
      <div ref={wrapperRef}>
        <div
          className={`flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2 ${
            props.hasError ? 'border-red' : 'border-gray-300'
          } rounded-md`}
        >
          <input
            placeholder={props.placeholder || 'Search ...'}
            value={value}
            className='w-full focus:outline-none bg-none'
            onKeyUp={onKeyUp}
            onChange={onChange}
            onClick={() => setIsListOpen(true)}
          />
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
                  <div
                    className='overflow-y-auto'
                    style={{height: 'auto', maxHeight: '350px'}}
                  >
                    {options?.map((item, index) => (
                      <>
                        <li
                          key={index}
                          className='text-gray-400 flex items-center'
                          onClick={() => onChangeItem(item)}
                        >
                          <label className='ml-2 mt-1 text-black'>
                            {props.data?.displayKey
                              ?.map(findKey => item[findKey])
                              .join(' - ')}
                          </label>
                        </li>
                      </>
                    ))}
                  </div>
                </ul>
              </div>
            )
          : null}
      </div>
    </>
  );
};
