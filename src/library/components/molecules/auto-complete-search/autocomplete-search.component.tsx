/* eslint-disable  */
import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { Icons } from '../..';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FaSearch } from 'react-icons/fa';
interface AutocompleteSearchProps {
  data?: any[];
  onChange?: (item: any, children: any) => void;
  hasError?: boolean;
  displayValue?: string;
  onClose?: () => void;
}

export const AutocompleteSearch = observer((props: AutocompleteSearchProps) => {
  //const [userRouter, setUserRouter] = useState<any>()
  const [value, setValue] = useState<string>(props.displayValue!);
  const [data, setData] = useState<any[]>();
  const [options, setOptions] = useState<any[]>();
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const listRef = useRef<any>(null);
  useEffect(() => {
    setHighlightedIndex(selectedIndex);
  }, [selectedIndex]);

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
        if (ref.current && !ref.current.contains(event.target) && isListOpen) {
          setIsListOpen(false);
          setValue('');
          setSelectedIndex(-1);
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
          options![Math.floor(nextIndex / 2)]?.children?.length === 0
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
          options![Math.floor(firstValidIndex / 2)]?.children?.length === 0
        ) {
          firstValidIndex++;
        }

        // If the current index is at the end of a top-level item, jump to the next top-level item
        if (
          prevIndex % 2 === 0 &&
          options![Math.floor(prevIndex / 2)]?.children?.length === 0
        ) {
          let nextTopLevelIndex = prevIndex + 1;
          while (
            nextTopLevelIndex < totalItems &&
            options![Math.floor(nextTopLevelIndex / 2)]?.children?.length === 0
          ) {
            nextTopLevelIndex++;
          }

          // If the next top-level index is within bounds, return it
          if (nextTopLevelIndex < totalItems) {
            return nextTopLevelIndex;
          }

          // If the next top-level index is out of bounds, loop back to the first valid index
          return firstValidIndex < totalItems ? firstValidIndex : 0;
        }

        return firstValidIndex < totalItems ? firstValidIndex : 0;
      });
    }
  };

  const calculateTotalIndex = (currentIndex, options) => {
    let totalIndex = 0;
    for (let i = 0; i < currentIndex; i++) {
      totalIndex += 1; // Count the top-level item
      const childrenCount = options[i]?.children?.length || 0;
      totalIndex += childrenCount; // Count the children of the top-level item
    }
    return totalIndex;
  };

  return (
    <>
      <div ref={wrapperRef} className='w-full relative'>
        <div
          className={`flex items-center leading-4 p-2 bg-white focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2  ${
            props.hasError ? 'border-red ' : 'border-gray-300'
          } rounded-3xl`}
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
                if (highlightedIndex !== null) {
                  let totalIndex = -1; // Start at -1 to account for the initial increment in the loop
                  let found = false;
                  let selectedOption, selectedChild;

                  for (let index = 0; index < options!.length; index++) {
                    const option = options![index];
                    const childrenLength = option.children?.length || 0;

                    if (
                      highlightedIndex > totalIndex &&
                      highlightedIndex <= totalIndex + 1 + childrenLength
                    ) {
                      selectedOption = option;
                      const selectedChildIndex =
                        highlightedIndex - totalIndex - 1;
                      selectedChild =
                        selectedOption?.children?.[selectedChildIndex];

                      found = true;
                      break;
                    }

                    totalIndex += 1 + childrenLength;
                  }

                  if (found && selectedOption && selectedChild) {
                    props.onChange &&
                      props.onChange(selectedOption, selectedChild);
                    setIsListOpen(false);
                    setValue(selectedChild.title);
                    setOptions([]);
                    setSelectedIndex(-1);
                  }
                }
              }
            }}
          />
          <div style={{ margin: '0px 15px 0px 1px' }}>
            <FaSearch size={20} />
          </div>
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
                      {options?.map((item, index) => {
                        const totalIndex = calculateTotalIndex(index, options);

                        return (
                          <React.Fragment key={index}>
                            <li className='text-gray-400'>{item.title}</li>
                            <ul className='ml-4'>
                              {item.children.map((children, childrenIndex) => {
                                const childIndex = totalIndex + childrenIndex;
                                const isHighlighted =
                                  highlightedIndex === childIndex;
                                const isItemSelected =
                                  selectedIndex === childIndex;

                                return (
                                  <li
                                    key={childrenIndex}
                                    className={`hover:bg-gray-200 focus:outline-none cursor-pointer ${
                                      isHighlighted
                                        ? `bg-gray-300 highlighted-${highlightedIndex}`
                                        : ''
                                    } ${
                                      isItemSelected
                                        ? `bg-gray-300 highlighted-${selectedIndex}`
                                        : ''
                                    }`}
                                    onMouseEnter={() =>
                                      setHighlightedIndex(childIndex)
                                    }
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
                                );
                              })}
                            </ul>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </PerfectScrollbar>
                </ul>
              </div>
            )
          : null}
      </div>
    </>
  );
});
