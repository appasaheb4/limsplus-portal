import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteAnalyteBottomMarkerProps {
  hasError?: boolean;
  onSelect: (item: any) => void;
}

export const AutoCompleteAnalyteBottomMarker = observer(
  ({hasError, onSelect}: AutoCompleteAnalyteBottomMarkerProps) => {
    const {loading, libraryStore} = useStores();
    return (
      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
        loader={loading}
        placeholder='Search by code or details'
        data={{
          list: libraryStore.listLibrary,
          displayKey: ['code', 'details'],
        }}
        hasError={hasError}
        onFilter={(value: string) => {
          libraryStore.libraryService.filterByFields({
            input: {
              filter: {
                fields: ['code', 'details'],
                srText: value,
              },
              page: 0,
              limit: 10,
            },
          });
        }}
        onSelect={item => {
          onSelect({
            code: item?.code,
            details: item?.details,
          });
          libraryStore.updateLibraryList(libraryStore.listLibraryCopy);
        }}
      />
    );
  },
);
