import React, {useState, useEffect, useRef} from 'react';
import {Spinner} from 'react-bootstrap';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteFilterSingleSelectPostalCodeProps {
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterSingleSelectPostalCode = observer(
  ({onSelect}: AutoCompleteFilterSingleSelectPostalCodeProps) => {
    const {loading, labStore} = useStores();
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

    return (
      <>
        <div ref={wrapperRef}>
          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
            loader={loading}
            data={{
              list: labStore?.addressDetails,
              displayKey: [
                'Name',
                'Block',
                'District',
                'State',
                'Country',
                'Pincode',
              ],
            }}
            displayValue={labStore.labs?.postalCode}
            onFilter={(value: string) => {
              if (value?.length == 6) {
                labStore.LabService?.getAddressDetailsByPincode(value);
              }
            }}
            onSelect={item => {
              onSelect &&
                onSelect({
                  country: item?.Country?.toUpperCase(),
                  state: item?.State?.toUpperCase(),
                  district: item?.District?.toUpperCase(),
                  city: item?.Block?.toUpperCase(),
                  area: item?.Name?.toUpperCase(),
                  postcode: item.Pincode,
                });
              labStore.updateAddressDetails([]);
            }}
          />
        </div>
      </>
    );
  },
);
