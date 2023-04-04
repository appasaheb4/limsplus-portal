import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteFilterSingleSelectTestNameProps {
  lab?: string;
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterSingleSelectTestName = observer(
  ({onSelect, lab}: AutoCompleteFilterSingleSelectTestNameProps) => {
    const {loading, testMasterStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion='relative'
          loader={loading}
          placeholder='Search by code or name'
          data={{
            list:
              testMasterStore.listTestMaster.filter(
                item => item.pLab === lab,
              ) || [],
            displayKey: ['testCode', 'testName'],
          }}
          onFilter={(value: string) => {
            testMasterStore.testMasterService.filterByFields({
              input: {
                filter: {
                  fields: ['testCode', 'testName'],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          onSelect={item => {
            onSelect && onSelect(item);
            testMasterStore.updateTestMasterList(
              testMasterStore.listTestMasterCopy,
            );
          }}
        />
      </>
    );
  },
);
