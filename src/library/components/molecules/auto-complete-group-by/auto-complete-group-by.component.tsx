/* eslint-disable  */
import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { Icons } from '../..';
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
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const listRef = useRef<any>(null);

    useEffect(() => {
      // Scroll the selected item into view when selectedIndex changes
      if (listRef.current && selectedIndex >= 0) {
        const selectedElement = listRef.current.querySelector(
          `.highlighted-${selectedIndex}`,
        );
        if (selectedElement) {
          selectedElement.scrollIntoView({
            behavior: 'auto',
            block: 'nearest',
          });
        }
      }
    }, [selectedIndex]);

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
                filterArray.push({ ...item, children: [children] });
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

      // Handle up arrow key
      if (charCode === 38) {
        e.preventDefault();
        setSelectedIndex(prevIndex =>
          prevIndex > 0 ? prevIndex - 1 : options!['children']!?.length * 2 - 1,
        );
      } else if (charCode === 40) {
        // Handle down arrow key
        e.preventDefault();
        setSelectedIndex(prevIndex => {
          const totalItems = options!.reduce(
            (count, option) => count + 1 + (option.children?.length || 0),
            0,
          );

          let nextIndex = prevIndex + 1;

          while (
            nextIndex < totalItems &&
            options![nextIndex]?.children?.length === 0
          ) {
            nextIndex++;
          }

          // If nextIndex is a valid index, return it
          if (nextIndex < totalItems) {
            return nextIndex;
          }

          // If nextIndex is out of bounds, loop back to the first valid index
          let firstValidIndex = 0;
          while (
            firstValidIndex < totalItems &&
            options![firstValidIndex]?.children?.length === 0
          ) {
            firstValidIndex++;
          }

          // If the current index is at the end of a top-level item, jump to the next top-level item
          if (
            prevIndex % 2 === 0 &&
            options![prevIndex / 2]?.children?.length === 0
          ) {
            let nextTopLevelIndex = prevIndex + 1;
            while (
              nextTopLevelIndex < totalItems &&
              options![nextTopLevelIndex]?.children?.length === 0
            ) {
              nextTopLevelIndex++;
            }
            return nextTopLevelIndex < totalItems ? nextTopLevelIndex : 0;
          }

          return firstValidIndex < totalItems ? firstValidIndex : 0;
        });
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
              onKeyDown={(e: any) => {
                if (e.key === 'Enter') {
                  e.preventDefault();

                  // Find the selected item and children
                  let selectedItem = null;
                  let selectedChildren = null;

                  if (selectedIndex !== -1 && options && options.length > 0) {
                    const indexInOptions = Math.floor(selectedIndex / 2);
                    const indexInChildren =
                      selectedIndex % 2 === 0
                        ? 0
                        : Math.floor(selectedIndex / 2);

                    selectedItem = options[indexInOptions];
                    selectedChildren =
                      selectedItem!['children'][indexInChildren];
                  }

                  // Call props.onChange with the selected item and children
                  if (props.onChange && selectedItem && selectedChildren) {
                    props.onChange(selectedItem, selectedChildren);
                  }

                  setIsListOpen(false);
                  setValue(selectedChildren!['title']); // Set the value to the selected children.title
                  setOptions([]);
                  setSelectedIndex(-1); // Reset selected index
                }
              }}
            />
            {isListOpen ? (
              <Icons.IconFa.FaChevronUp />
            ) : (
              <Icons.IconFa.FaChevronDown />
            )}
          </div>

          {options && isListOpen
            ? options.length > 0 && (
                <div
                  className='mt-1 absolute z-50 border-gray-500 rounded-md bg-gray-200 w-100'
                  ref={listRef}
                >
                  <ul className='p-2 rounded-sm'>
                    <PerfectScrollbar>
                      <div
                        className=''
                        style={{ height: 'auto', maxHeight: '350px' }}
                      >
                        {options?.map((item, index) => (
                          <React.Fragment key={index}>
                            <li className='text-gray-400'>{item.title}</li>
                            <ul className='ml-4'>
                              {item.children.map((children, childrenIndex) => (
                                <li
                                  key={childrenIndex}
                                  className={`hover:bg-gray-200 focus:outline-none cursor-pointer ${
                                    selectedIndex === index * 2 + childrenIndex
                                      ? `bg-gray-300 highlighted-${selectedIndex}`
                                      : ''
                                  }`}
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
                          </React.Fragment>
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
