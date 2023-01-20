import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from '@/library/components';
import {lookupItems} from '@/library/utils';

interface AutoCompleteFilterDeliveryModeProps {
  selectedItems?: any;
  onSelect: (items: any) => void;
}

export const AutoCompleteFilterDeliveryMode = observer(
  ({selectedItems = [], onSelect}: AutoCompleteFilterDeliveryModeProps) => {
    const {registrationLocationsStore, routerStore, loading} = useStores();
    return (
      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
        loader={loading}
        placeholder='Search by code or name'
        data={{
          list: lookupItems(routerStore.lookupItems, 'DELIVERY_METHOD') || [],
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
