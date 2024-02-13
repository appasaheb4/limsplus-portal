import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { AutoCompleteFilterMutiSelectMultiFieldsDisplay } from '@/library/components';
import { useStores } from '@/stores';

interface AutoCompleteProps {
  selected: any[];
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterMultiSelectDoctors = observer(
  ({ selected, onSelect }: AutoCompleteProps) => {
    const { loading, userStore, doctorsStore } = useStores();
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
        doctors: selected,
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
                  doctorCode: '*',
                  doctorName: '*',
                },
              ].concat(doctorsStore.listDoctors as any),
              selected: userStore.selectedItems?.doctors,
              displayKey: ['doctorCode', 'doctorName'],
            }}
            hasError={false}
            onUpdate={item => {
              const doctors = userStore.selectedItems?.doctors;
              onSelect({ doctors });
              doctorsStore.updateDoctorsList(doctorsStore.listDoctorsCopy);
            }}
            onFilter={(value: string) => {
              doctorsStore.doctorsService.filterByFields({
                input: {
                  filter: {
                    fields: ['doctorCode', 'doctorName'],
                    srText: value,
                  },
                  page: 0,
                  limit: 10,
                },
              });
            }}
            onSelect={item => {
              let doctors = userStore.selectedItems?.doctors;
              if (
                item.doctorCode === '*' ||
                doctors?.some(e => e.locationCode === '*')
              ) {
                if (
                  !item.selected ||
                  doctors?.some(e => e.locationCode === '*')
                ) {
                  doctors = [];
                  doctors.push(item);
                } else {
                  doctors = doctors.filter(items => {
                    return items._id !== item._id;
                  });
                }
              } else {
                if (!item.selected) {
                  if (doctors && doctors.length > 0) {
                    doctors.push(item);
                  } else doctors = [item];
                } else {
                  doctors = doctors.filter(items => {
                    return items._id !== item._id;
                  });
                }
              }
              userStore.updateSelectedItems({
                ...userStore.selectedItems,
                doctors,
              });
            }}
          />
        </div>
      </>
    );
  },
);
