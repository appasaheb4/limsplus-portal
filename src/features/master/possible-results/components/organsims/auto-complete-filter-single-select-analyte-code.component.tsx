import React, {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {Spinner} from 'react-bootstrap';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {Icons} from '@/library/components';

interface AutoCompleteFilterSingleSelectAnalyteCodeProps {
  hasError?: boolean;
  displayValue?: string;
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterSingleSelectAnalyteCode = observer(
  ({
    hasError,
    displayValue,
    onSelect,
  }: AutoCompleteFilterSingleSelectAnalyteCodeProps) => {
    const {loading, masterAnalyteStore} = useStores();
    const [value, setValue] = useState<string | undefined>(displayValue || '');
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

    const getAnalyteList = () => {
      masterAnalyteStore.masterAnalyteService
        .findByFields({input: {filter: {resultType: 'D'}}})
        .then(res => {
          if (!res.findByFieldsAnalyteMaster.success)
            return alert(res.findByFieldsAnalyteMaster.message);
          setOptions(
            _.uniqBy(res.findByFieldsAnalyteMaster.data, 'analyteCode'),
          );
        });
    };

    useEffect(() => {
      setValue(displayValue);
    }, [displayValue]);

    useEffect(() => {
      getAnalyteList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFilter = (value: string) => {
      masterAnalyteStore.masterAnalyteService
        .filter({
          input: {
            type: 'filter',
            filter: {
              analyteCode: value,
              resultType: 'D',
            },
            page: 0,
            limit: 10,
          },
        })
        .then(res => {
          console.log({res});
          if (!res.filterAnalyteMaster.success) return getAnalyteList();
          setOptions(_.uniqBy(res.filterAnalyteMaster.data, 'analyteCode'));
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
              hasError ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          >
            <input
              placeholder='Search by analyate code'
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
                <div className='mt-1 absolute bg-gray-100 p-2 rounded-sm z-50'>
                  <ul>
                    {options?.map((item, index) => (
                      <>
                        <li
                          key={index}
                          className='text-gray-400 flex items-center'
                          onClick={() => {
                            setValue(item.analyteCode);
                            setIsListOpen(false);
                            masterAnalyteStore.updateMasterAnalyteList(
                              masterAnalyteStore.listMasterAnalyteCopy,
                            );
                            onSelect(item);
                          }}
                        >
                          {' '}
                          <label className='ml-2 mt-1 text-black'>
                            {' '}
                            {item.analyteCode} - {item.analyteName}
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
