import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { Icons } from '@/library/components';

interface AutoCompleteFilterSingleSelectDepartmentProps {
  hasError?: boolean;
  disable?: boolean;
  lab?: string;
  displayValue?: string;
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterSingleSelectDepartment = observer(
  ({
    hasError,
    lab,
    disable = false,
    displayValue = '',
    onSelect,
  }: AutoCompleteFilterSingleSelectDepartmentProps) => {
    const { loading, departmentStore } = useStores();
    const [value, setValue] = useState<string>(displayValue);
    const [options, setOptions] = useState<any[]>();
    const [isListOpen, setIsListOpen] = useState<boolean>(false);

    const useOutsideAlerter = ref => {
      useEffect(() => {
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
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [ref]);
    };

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    useEffect(() => {
      if (!_.isEmpty(displayValue)) setValue(displayValue);
    }, [displayValue]);

    useEffect(() => {
      setOptions(
        departmentStore.listDepartment.filter(item => item.lab === lab),
      );
    }, [departmentStore.listDepartment, lab]);

    const onFilter = (value: string) => {
      departmentStore.DepartmentService.filter({
        input: {
          type: 'filter',
          filter: {
            name: value,
          },
          page: 0,
          limit: 10,
        },
      });
    };

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
        <div ref={wrapperRef} className='w-full relative'>
          <div
            className={`flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2  ${
              hasError ? 'border-red' : 'border-gray-300'
            } rounded-md`}
          >
            <input
              placeholder='Search by department name'
              id={`search-${Date.now()}`}
              value={value}
              className={'w-full focus:outline-none bg-none'}
              onKeyUp={onKeyUp}
              disabled={disable}
              onChange={onChange}
              onClick={() => setIsListOpen(true)}
            />
            {loading && <Spinner animation='border' className='mr-2 h-4 w-4' />}
            {isListOpen ? (
              <Icons.IconFa.FaChevronUp />
            ) : (
              <Icons.IconFa.FaChevronDown />
            )}
          </div>

          {options && isListOpen
            ? options.length > 0 && (
                <div className='mt-1 absolute bg-gray-100 p-2 rounded-sm z-500'>
                  <ul>
                    {options?.map((item, index) => (
                      <>
                        <li
                          key={index}
                          className='text-gray-400 flex items-center'
                          onClick={() => {
                            setValue(item.name);
                            setIsListOpen(false);
                            departmentStore.updateDepartmentList(
                              departmentStore.listDepartmentCopy,
                            );
                            onSelect(item);
                          }}
                        >
                          {' '}
                          <label className='ml-2 mt-1 text-black'>
                            {' '}
                            {item.code} - {item.name}
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
  },
);
