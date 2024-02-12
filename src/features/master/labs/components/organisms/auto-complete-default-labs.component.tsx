import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { AutoCompleteFilterSingleSelectMultiFieldsDisplay } from '@/library/components';

interface AutoCompleteDefaultLabProps {
  onSelect: (item: any) => void;
}

export const AutoCompleteDefaultLab = observer(
  ({ onSelect }: AutoCompleteDefaultLabProps) => {
    const { loading, labStore } = useStores();
    const [list, setList] = useState<Array<any>>([]);

    useEffect(() => {
      // setList(labStore?.listLabs.filter(item => item.labType === 'R')); // vikram mention remove this condition
      setList(labStore?.listLabs);
    }, [labStore.listLabs]);
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion='sticky'
          loader={loading}
          placeholder='Search by code or name'
          data={{
            list,
            displayKey: ['code', 'name'],
          }}
          onFilter={(value: string) => {
            labStore.LabService.filterByFields(
              {
                input: {
                  filter: {
                    fields: ['code', 'name'],
                    srText: value,
                  },
                  page: 0,
                  limit: 10,
                },
              },
              false,
            ).then(res => {
              if (res.filterByFieldsLab.success) {
                setList(res.filterByFieldsLab.data);
              }
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
