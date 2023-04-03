import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompletePriceListProps {
  onSelect: (item: any) => void;
}

export const AutoCompletePriceList = observer(
  ({onSelect}: AutoCompletePriceListProps) => {
    const {loading, corporateClientsStore, priceListStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion='relative'
          loader={loading}
          placeholder='Search by code or name'
          data={{
            list: corporateClientsStore?.listCorporateClients,
            displayKey: ['invoiceAc', 'corporateName'],
          }}
          displayValue={priceListStore.priceList?.priceList?.toString()}
          onFilter={(value: string) => {
            corporateClientsStore.corporateClientsService.filterByFields({
              input: {
                filter: {
                  fields: ['invoiceAc', 'corporateName'],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          onSelect={item => {
            onSelect && onSelect(item);
            corporateClientsStore.updateCorporateClientsList(
              corporateClientsStore.listCorporateClientsCopy,
            );
          }}
        />
      </>
    );
  },
);
