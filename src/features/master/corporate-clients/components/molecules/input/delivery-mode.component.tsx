import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { AutoCompleteFilterMutiSelectMultiFieldsDisplay } from '@/library/components';
import { lookupItems } from '@/library/utils';

interface DeliveryModeProps {
  lookupField?: string;
  selectedItems?: any;
  hasError?: boolean;
  onSelect: (items: any) => void;
}

export const DeliveryMode = observer(
  ({
    lookupField = 'DELIVERY_METHOD',
    selectedItems = [],
    hasError = false,
    onSelect,
  }: DeliveryModeProps) => {
    const { corporateClientsStore, routerStore, loading } = useStores();
    return (
      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
        loader={loading}
        placeholder='Search by code or name'
        hasError={hasError}
        data={{
          list: lookupItems(routerStore.lookupItems, lookupField) || [],
          selected:
            corporateClientsStore.selectedItems?.deliveryMode || selectedItems,
          displayKey: ['code', 'value'],
        }}
        uniqueField='code'
        onUpdate={item => {
          const deliveryMode =
            corporateClientsStore.selectedItems?.deliveryMode;
          onSelect(deliveryMode);
        }}
        onSelect={item => {
          let deliveryMode = corporateClientsStore.selectedItems?.deliveryMode;
          if (!item.selected) {
            if (deliveryMode && deliveryMode.length > 0) {
              deliveryMode.push(item);
            } else deliveryMode = [item];
          } else {
            deliveryMode = deliveryMode.filter(items => {
              return items.code !== item.code;
            });
          }
          corporateClientsStore.updateSelectedItems({
            ...corporateClientsStore.selectedItems,
            deliveryMode,
          });
        }}
      />
    );
  },
);
