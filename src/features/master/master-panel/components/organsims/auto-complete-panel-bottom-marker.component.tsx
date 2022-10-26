import React, {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompletePanelBottomMarkerProps {
  hasError?: boolean;
  onSelect: (item: any) => void;
}

export const AutoCompletePanelBottomMarker = observer(
  ({hasError, onSelect}: AutoCompletePanelBottomMarkerProps) => {
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
