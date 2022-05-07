/* eslint-disable  */
import React, {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompletePriceListProps {
  priceGroup?: string;
  onSelect: (item: any) => void;
}

export const AutoCompletePriceList = observer(
  ({onSelect, priceGroup}: AutoCompletePriceListProps) => {
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
          disable={priceGroup !== 'CSP001' ? true : false}
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
            console.log({item});
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
