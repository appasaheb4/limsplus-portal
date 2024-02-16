import React, { useState, useEffect, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { AutoCompleteFilterSingleSelectMultiFieldsDisplay } from '@/library/components';

interface AutoCompleteFilterSingleSelectLabsProps {
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterSingleSelectLabs = observer(
  ({ onSelect }: AutoCompleteFilterSingleSelectLabsProps) => {
    const { loading, labStore } = useStores();
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
      setOptions(labStore.listLabs);
    }, [labStore.listLabs]);

    return (
      <>
        <div ref={wrapperRef}>
          <div
            className={
              'flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2  rounded-md'
            }
          >
            <AutoCompleteFilterSingleSelectMultiFieldsDisplay
              loader={loading}
              posstion='sticky'
              placeholder='Search by code or name'
              data={{
                list: _.uniqBy(labStore.listLabs, 'code'),
                displayKey: ['code', 'name'],
              }}
              onFilter={(value: string) => {
                labStore.LabService.filter({
                  input: {
                    type: 'filter',
                    filter: {
                      name: value,
                    },
                    page: 0,
                    limit: 10,
                  },
                });
              }}
              onSelect={item => {
                onSelect(item);
                labStore.updateLabList(labStore.listLabsCopy);
              }}
            />
          </div>
        </div>
      </>
    );
  },
);
