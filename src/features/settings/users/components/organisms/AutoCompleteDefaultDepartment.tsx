/* eslint-disable  */
import React, {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteDefaultDepartmentProps {
  onSelect: (item: any) => void;
}

export const AutoCompleteDefaultDepartment = observer(
  ({onSelect}: AutoCompleteDefaultDepartmentProps) => {
    const {loading, departmentStore, labStore, userStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion="relative"
          loader={loading}
          placeholder="Search by code or name"
          data={{
            list: departmentStore.listDepartment,
            displayKey: ['code', 'name'],
          }}
          // hasError={errors.defaultDepartment}
          onFilter={(value: string) => {
            departmentStore.DepartmentService.filter({
              input: {
                type: 'filter',
                filter: {
                  name: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          onSelect={item => {
            onSelect && onSelect(item);
            const department: any = departmentStore.listDepartment.filter(
              e => e.code == item.code,
            );
            // setValue('department', department);
            userStore.updateUser({
              ...userStore.user,
              department,
            });
            userStore.updateSelectedItems({
              ...userStore.selectedItems,
              department,
            });
            labStore.updateLabList(labStore.listLabsCopy);
          }}
        />
      </>
    );
  },
);
