import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from '@/library/components';
import {lookupItems} from '@/library/utils';

interface AutoCompleteFilterDeliveryModeProps {
  lookupField?: string;
  selectedItems?: any;
  hasError?: boolean;
  onSelect: (items: any) => void;
}

export const AutoCompleteFilterDeliveryMode = observer(
  ({
    lookupField = 'DELIVERY_METHOD',
    selectedItems = [],
    hasError = false,
    onSelect,
  }: AutoCompleteFilterDeliveryModeProps) => {
    const {registrationLocationsStore, routerStore, loading} = useStores();

    return (
      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
        loader={loading}
        placeholder='Search by code or name'
        hasError={hasError}
        data={{
          list: lookupItems(routerStore.lookupItems, lookupField) || [],
          selected:
            registrationLocationsStore.selectedItems?.deliveryMode ||
            selectedItems,
          displayKey: ['code', 'value'],
        }}
        uniqueField='code'
        onUpdate={item => {
          const deliveryMode =
            registrationLocationsStore.selectedItems?.deliveryMode;
          onSelect(deliveryMode);
        }}
        onSelect={item => {
          let deliveryMode =
            registrationLocationsStore.selectedItems?.deliveryMode;
          if (!item.selected) {
            if (deliveryMode && deliveryMode.length > 0) {
              deliveryMode.push(item);
            } else deliveryMode = [item];
          } else {
            deliveryMode = deliveryMode.filter(items => {
              return items.code !== item.code;
            });
          }
          registrationLocationsStore.updateSelectedItems({
            ...registrationLocationsStore.selectedItems,
            deliveryMode,
          });
        }}
      />
    );
  },
);
