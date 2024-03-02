import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { AutoCompleteFilterSingleSelectMultiFieldsDisplay } from '@/library/components';

interface AutoCompleteScheduleNameProps {
  onSelect: (item: any) => void;
}

export const AutoCompleteScheduleName = observer(
  ({ onSelect }: AutoCompleteScheduleNameProps) => {
    const { loading, deliveryScheduleStore } = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          loader={loading}
          placeholder='Search by code'
          data={{
            list: deliveryScheduleStore.listDeliverySchedule,
            displayKey: ['schCode', 'schName'],
          }}
          // hasError={!!errors.schedule}
          onFilter={(value: string) => {
            deliveryScheduleStore.deliveryScheduleService.filter({
              input: {
                type: 'filter',
                filter: {
                  schCode: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          // displayValue={value}
          onSelect={item => {
            onSelect && onSelect(item.schCode);
            deliveryScheduleStore.updateDeliveryScheduleList(
              deliveryScheduleStore.listDeliveryScheduleCopy,
            );
          }}
        />
      </>
    );
  },
);
