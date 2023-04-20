/* eslint-disable  */
import React, {useState, useEffect, useRef} from 'react';
import {observer} from 'mobx-react';
import {Icons} from '../..';
import PerfectScrollbar from 'react-perfect-scrollbar';

interface AutocompleteGroupByProps {
  data?: any[];
  onChange?: (item: any, children: any) => void;
  hasError?: boolean;
  displayValue?: string;
  onClose?: () => void;
}

export const AutocompleteGroupBy = observer(
  (props: AutocompleteGroupByProps) => {
    //const [userRouter, setUserRouter] = useState<any>()
    const [value, setValue] = useState<string>(props.displayValue!);
    const [data, setData] = useState<any[]>();
    const [options, setOptions] = useState<any[]>();
    const [isListOpen, setIsListOpen] = useState<boolean>(false);

    const useOutsideAlerter = ref => {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (
            ref.current &&
            !ref.current.contains(event.target) &&
            isListOpen
          ) {
            setIsListOpen(false);
            setValue('');
          }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [ref, isListOpen]);
    };

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    useEffect(() => {
      setValue(props.displayValue!);
    }, [props.displayValue]);

    useEffect(() => {
      setData(props.data);
      setOptions(props.data);
    }, [props]);

    const uniqByKeepFirst = (a, key) => {
      const seen = new Set();
      return a.filter(item => {
        const k = key(item);
        return seen.has(k) ? false : seen.add(k);
      });
    };

    const filter = (search, data) => {
      if (search !== '') {
        let filterArray: any[] = [];
        data.filter(item => {
          item.children.filter(children => {
            const childrenItem =
              children.title &&
              children.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
            if (childrenItem) {
              const isSameArray = filterArray.filter((filterItem, index) => {
                if (filterItem.name === item.name) {
                  const newChildren =
                    filterArray[index].children.concat(children);
                  filterArray[index] = {
                    ...filterArray[index],
                    children: newChildren,
                  };
                }
              });
              if (isSameArray.length < 1) {
                filterArray.push({...item, children: [children]});
              }
              const uniqueChars = uniqByKeepFirst(filterArray, it => it.name);
              filterArray = uniqueChars;
            }
          });
        });
        setOptions(filterArray);
      } else {
        setOptions(data);
      }
    };

    const onChange = e => {
      const search = e.target.value;
      setValue(search);
      filter(search, data);
    };

    const onKeyUp = e => {
      const charCode = e.which ? e.which : e.keyCode;
      if (charCode === 8) {
        const search = e.target.value;
        filter(search, data);
      }
    };

    return (
      <>
        <div ref={wrapperRef} className='w-full relative'>
          <div
            className={`flex items-center leading-4 p-2 bg-white focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2  ${
              props.hasError ? 'border-red ' : 'border-gray-300'
            } rounded-md`}
          >
            <input
              placeholder='Search...'
              value={!isListOpen ? value : value}
              className='w-full focus:outline-none'
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
                <div className='mt-1 absolute z-50 border-gray-500 rounded-md bg-gray-200'>
                  <ul className='p-2 rounded-sm'>
                    <PerfectScrollbar>
                      <div
                        className=''
                        style={{height: 'auto', maxHeight: '350px'}}
                      >
                        {options?.map((item, index) => (
                          <>
                            <li key={index} className='text-gray-400'>
                              {item.title}
                            </li>
                            <ul className='ml-4'>
                              {item.children.map((children, childrenIndex) => (
                                <li
                                  key={childrenIndex}
                                  className='hover:bg-gray-200 focus:outline-none cursor-pointer'
                                  onClick={async () => {
                                    props.onChange &&
                                      props.onChange(item, children);
                                    setIsListOpen(false);
                                    setValue(children.title);
                                    setOptions([]);
                                  }}
                                >
                                  {children.title}
                                </li>
                              ))}
                            </ul>
                          </>
                        ))}
                      </div>
                    </PerfectScrollbar>
                  </ul>
                </div>
              )
            : null}
        </div>
      </>
    );
  },
);
