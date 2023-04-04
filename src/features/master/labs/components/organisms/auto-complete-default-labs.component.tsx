import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteDefaultLabProps {
  onSelect: (item: any) => void;
}

export const AutoCompleteDefaultLab = observer(
  ({onSelect}: AutoCompleteDefaultLabProps) => {
    const {loading, labStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion='sticky'
          loader={loading}
          placeholder='Search by code or name'
          data={{
            list: labStore?.listLabs.filter(item => item.labType === 'R'),
            displayKey: ['code', 'name'],
          }}
          onFilter={(value: string) => {
            labStore.LabService.filterByFields({
              input: {
                filter: {
                  fields: ['code', 'name'],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          onSelect={item => {
            onSelect && onSelect(item.code);
            labStore.updateLabList(labStore.listLabsCopy);
          }}
        />
      </>
    );
  },
);
