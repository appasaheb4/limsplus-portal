import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteDepartmentProps {
  lab?: string;
  onSelect: (item: any) => void;
}

export const AutoCompleteDepartment = observer(
  ({onSelect, lab}: AutoCompleteDepartmentProps) => {
    const {loading, departmentStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion='relative'
          loader={loading}
          placeholder='Search by code or name'
          data={{
            list: departmentStore?.listDepartment.filter(
              item => item.lab === lab,
            ),
            displayKey: ['code', 'name'],
          }}
          onFilter={(value: string) => {
            departmentStore.DepartmentService.filterByFields({
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
            departmentStore.updateDepartmentList(
              departmentStore.listDepartmentCopy,
            );
          }}
        />
      </>
    );
  },
);
