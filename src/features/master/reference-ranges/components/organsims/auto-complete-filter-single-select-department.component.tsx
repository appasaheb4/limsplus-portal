import React, { useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteDepartmentProps {
  departmentCode?: string;
  analyteDepartments?: string[];
  onSelect: (item: any) => void;
}

export const AutoCompleteDepartment = observer(
  ({
    onSelect,
    analyteDepartments,
    departmentCode,
  }: AutoCompleteDepartmentProps) => {
    const {loading, departmentStore} = useStores();
    useEffect(() => {
      departmentStore.DepartmentService.filter({
        input: {
          type: 'filter',
          filter: {
            code: departmentCode,
          },
          page: 0,
          limit: 10,
        },
      });
    }, [departmentCode, departmentStore.DepartmentService]);
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion='relative'
          loader={loading}
          placeholder='Search by code or name'
          data={{
            list: departmentStore.listDepartment.filter(item =>
              analyteDepartments?.includes(item.code),
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
            console.log({item});
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
