import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteSalesTerritoryProps {
  onSelect: (item: any) => void;
}

export const AutoCompleteSalesTerritory = observer(
  ({onSelect}: AutoCompleteSalesTerritoryProps) => {
    const {loading, salesTeamStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          loader={loading}
          posstion='sticky'
          placeholder='Search by sales territory'
          data={{
            list: _.uniqBy(salesTeamStore.listSalesTeam, 'salesTerritory'),
            displayKey: ['salesTerritory'],
          }}
          onFilter={(value: string) => {
            salesTeamStore.salesTeamService.filterByFields({
              input: {
                filter: {
                  fields: ['salesTerritory'],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          onSelect={item => {
            onSelect && onSelect(item.salesTerritory);
            salesTeamStore.updateSalesTeamList(
              salesTeamStore.listSalesTeamCopy,
            );
          }}
        />
      </>
    );
  },
);
