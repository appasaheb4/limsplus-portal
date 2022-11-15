import React, {useState, useEffect, useRef} from 'react';
import {observer} from 'mobx-react';
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from '@/library/components';
import {useStores} from '@/stores';

interface AutoCompleteProps {
  selected: any[];
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterMutiSelectCorporateClient = observer(
  ({selected, onSelect}: AutoCompleteProps) => {
    const {loading, departmentStore, userStore, corporateClientsStore} =
      useStores();
    const [value, setValue] = useState<string>('');
    const [options, setOptions] = useState<any[]>();
    const [originalOptions, setOriginalOptions] = useState<any[]>();
    const [isListOpen, setIsListOpen] = useState<boolean>(false);

    useEffect(() => {
      userStore.updateSelectedItems({
        ...userStore.selectedItems,
        corporateClient: selected,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

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
        <div ref={wrapperRef} className='w-full relative'>
          <AutoCompleteFilterMutiSelectMultiFieldsDisplay
            loader={loading}
            placeholder='Search by code or name'
            data={{
              list: [
                {
                  _id: 'selectAll',
                  corporateCode: '*',
                  corporateName: '*',
                },
              ].concat(corporateClientsStore.listCorporateClients as any),
              selected: userStore.selectedItems?.corporateClient,
              displayKey: ['corporateCode', 'corporateName'],
            }}
            hasError={false}
            onUpdate={item => {
              const corporateClient = userStore.selectedItems?.corporateClient;
              onSelect({corporateClient});
              corporateClientsStore.updateCorporateClientsList(
                corporateClientsStore.listCorporateClientsCopy,
              );
            }}
            onFilter={(value: string) => {
              corporateClientsStore.corporateClientsService.filterByFields({
                input: {
                  filter: {
                    fields: ['corporateCode', 'corporateName'],
                    srText: value,
                  },
                  page: 0,
                  limit: 10,
                },
              });
            }}
            onSelect={item => {
              let corporateClient = userStore.selectedItems?.corporateClient;
              if (
                item.corporateCode === '*' ||
                corporateClient?.some(e => e.corporateCode === '*')
              ) {
                if (
                  !item.selected ||
                  corporateClient?.some(e => e.corporateCode === '*')
                ) {
                  corporateClient = [];
                  corporateClient.push(item);
                } else {
                  corporateClient = corporateClient.filter(items => {
                    return items._id !== item._id;
                  });
                }
              } else {
                if (!item.selected) {
                  if (corporateClient && corporateClient.length > 0) {
                    corporateClient.push(item);
                  } else corporateClient = [item];
                } else {
                  corporateClient = corporateClient.filter(items => {
                    return items._id !== item._id;
                  });
                }
              }
              userStore.updateSelectedItems({
                ...userStore.selectedItems,
                corporateClient,
              });
            }}
          />
        </div>
      </>
    );
  },
);
