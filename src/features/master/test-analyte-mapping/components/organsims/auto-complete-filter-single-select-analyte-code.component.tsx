import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteFilterSingleSelectAnalyteCodeProps {
  lab?: string;
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterSingleSelectAnalyteCode = observer(
  ({onSelect, lab}: AutoCompleteFilterSingleSelectAnalyteCodeProps) => {
    const {loading, masterAnalyteStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion='relative'
          loader={loading}
          placeholder='Search by code or name'
          data={{
            list:
              _.uniqBy(
                masterAnalyteStore.listMasterAnalyte.filter(
                  item => item.lab === lab,
                ),
                v => [v.analyteName, v.analyteCode, v.lab].join(','),
              ) || [],
            displayKey: ['analyteCode', 'analyteName'],
          }}
          onFilter={(value: string) => {
            masterAnalyteStore.masterAnalyteService.filterByFields({
              input: {
                filter: {
                  fields: ['analyteCode', 'analyteName'],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          onSelect={item => {
            onSelect && onSelect(item);
            masterAnalyteStore.updateMasterAnalyteList(
              masterAnalyteStore.listMasterAnalyteCopy,
            );
          }}
        />
      </>
    );
  },
);
