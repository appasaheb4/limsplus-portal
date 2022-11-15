import React, {useState, useEffect, useRef} from 'react';
import {Spinner} from 'react-bootstrap';
import {observer} from 'mobx-react';
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from '@/library/components';
import {useStores} from '@/stores';

interface AutoCompleteProps {
  selected: any[];
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterMutiSelectRegistrationLocation = observer(
  ({selected, onSelect}: AutoCompleteProps) => {
    const {loading, departmentStore, userStore, registrationLocationsStore} =
      useStores();
    const [value, setValue] = useState<string>('');
    const [options, setOptions] = useState<any[]>();
    const [originalOptions, setOriginalOptions] = useState<any[]>();
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
      userStore.updateSelectedItems({
        ...userStore.selectedItems,
        registrationLocation: selected,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
      <>
        <div ref={wrapperRef} className='w-full relative'>
          <AutoCompleteFilterMutiSelectMultiFieldsDisplay
            loader={loading}
            placeholder='Search by code or name'
            data={{
              list: [
                {
                  _id: 'selectAll',
                  locationCode: '*',
                  locationName: '*',
                },
              ].concat(
                registrationLocationsStore.listRegistrationLocations as any,
              ),
              selected: userStore.selectedItems?.registrationLocation,
              displayKey: ['locationCode', 'locationName'],
            }}
            hasError={false}
            onUpdate={item => {
              const registrationLocation =
                userStore.selectedItems?.registrationLocation;
              onSelect({registrationLocation});
              registrationLocationsStore.updateRegistrationLocationsList(
                registrationLocationsStore.listRegistrationLocationsCopy,
              );
            }}
            onFilter={(value: string) => {
              registrationLocationsStore.registrationLocationsService.filterByFields(
                {
                  input: {
                    filter: {
                      fields: ['locationCode', 'locationName'],
                      srText: value,
                    },
                    page: 0,
                    limit: 10,
                  },
                },
              );
            }}
            onSelect={item => {
              let registrationLocation =
                userStore.selectedItems?.registrationLocation;
              if (
                item.locationCode === '*' ||
                registrationLocation?.some(e => e.locationCode === '*')
              ) {
                if (
                  !item.selected ||
                  registrationLocation?.some(e => e.locationCode === '*')
                ) {
                  registrationLocation = [];
                  registrationLocation.push(item);
                } else {
                  registrationLocation = registrationLocation.filter(items => {
                    return items._id !== item._id;
                  });
                }
              } else {
                if (!item.selected) {
                  if (registrationLocation && registrationLocation.length > 0) {
                    registrationLocation.push(item);
                  } else registrationLocation = [item];
                } else {
                  registrationLocation = registrationLocation.filter(items => {
                    return items._id !== item._id;
                  });
                }
              }
              userStore.updateSelectedItems({
                ...userStore.selectedItems,
                registrationLocation,
              });
            }}
          />
        </div>
      </>
    );
  },
);
