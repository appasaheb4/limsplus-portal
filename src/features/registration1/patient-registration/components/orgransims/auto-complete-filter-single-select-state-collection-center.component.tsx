import React, {useState, useEffect, useRef} from 'react';
import {Spinner} from 'react-bootstrap';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {Icons} from '@/library/components';

interface AutoCompleteFilterSingleSelectCollectionCenterProps {
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterSingleSelectCollectionCenter = observer(
  ({onSelect}: AutoCompleteFilterSingleSelectCollectionCenterProps) => {
    const {loading, registrationLocationsStore} = useStores();
    const [value, setValue] = useState<string>('');
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [ref, isListOpen]);
    };

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    useEffect(() => {
      setOptions(registrationLocationsStore.listRegistrationLocations);
    }, [registrationLocationsStore.listRegistrationLocations]);

    const onFilter = (value: string) => {
      registrationLocationsStore.registrationLocationsService.filter({
        input: {
          type: 'filter',
          filter: {
            locationCode: value,
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
        <div ref={wrapperRef}>
          <div
            className={
              'flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2  rounded-md'
            }
          >
            <input
              placeholder='Search By Location Code ....'
              value={!isListOpen ? value : value}
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
                <div className='mt-1  bg-gray-100 p-2 rounded-sm z-50'>
                  <ul>
                    {options?.map((item, index) => (
                      <>
                        <li
                          key={index}
                          className='text-gray-400 flex items-center'
                          onClick={() => {
                            setValue(item.locationCode);
                            setIsListOpen(false);
                            registrationLocationsStore.updateRegistrationLocationsList(
                              registrationLocationsStore.listRegistrationLocationsCopy,
                            );
                            onSelect(item);
                          }}
                        >
                          {' '}
                          <label className='ml-2 mt-1 text-black'>
                            {' '}
                            {item.locationCode}
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
