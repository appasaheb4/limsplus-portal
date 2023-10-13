import React, { useState, useEffect, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { Icons } from '@/library/components';

interface AutoCompleteFilterSingleSelectEmpolyeCodeProps {
  hasError?: boolean;
  displayValue?: string;
  disable?: boolean;
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterSingleSelectEmpolyeCode = observer(
  ({
    hasError,
    displayValue = '',
    disable = false,
    onSelect,
  }: AutoCompleteFilterSingleSelectEmpolyeCodeProps) => {
    const { loading, userStore } = useStores();
    const [value, setValue] = useState<string>(displayValue);
    const [options, setOptions] = useState<any[]>();
    const [isListOpen, setIsListOpen] = useState<boolean>(false);

    useEffect(() => {
      setValue(displayValue);
    }, [displayValue]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [ref, isListOpen]);
    };

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const loadUsers = () => {
      userStore.UsersService.findByFields({
        input: { filter: { userGroup: 'S' } },
      }).then(res => {
        if (!res.findByFieldsUser.success)
          return alert(res.findByFieldsUser.message);
        setOptions(res.findByFieldsUser.data);
      });
    };

    useEffect(() => {
      loadUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFilter = (value: string) => {
      userStore.UsersService.filter({
        input: {
          type: 'filter',
          filter: {
            empCode: value,
            userGroup: 'S',
          },
          page: 0,
          limit: 10,
        },
      }).then(res => {
        if (!res.filterUsers.success) return loadUsers();
        setOptions(res.filterUsers.data);
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
        <div ref={wrapperRef}>
          <div
            className={`flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2 ${
              hasError ? 'border-red' : 'border-gray-300'
            } rounded-md`}
          >
            <input
              placeholder='Search  by emp code'
              value={value}
              disabled={disable}
              className={'w-full focus:outline-none bg-none'}
              onKeyUp={onKeyUp}
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
                <div className='mt-1 absolute bg-gray-100 p-2 rounded-sm z-50'>
                  <ul>
                    {options?.map((item, index) => (
                      <>
                        <li
                          key={index}
                          className='text-gray-400 flex items-center'
                          onClick={() => {
                            setValue(item.empCode);
                            setIsListOpen(false);
                            userStore.updateUserList(userStore.userListCopy);
                            onSelect(item);
                          }}
                        >
                          {' '}
                          <label className='ml-2 mt-1 text-black'>
                            {' '}
                            {item.empCode} - {item.fullName}
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
