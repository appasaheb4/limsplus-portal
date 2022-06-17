import React, {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteInterpretationProps {
  onSelect: (item: any) => void;
}

export const AutoCompleteInterpretation = observer(
  ({onSelect}: AutoCompleteInterpretationProps) => {
    const {loading, libraryStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          loader={loading}
          placeholder='Search by code'
          data={{
            list: libraryStore.listLibrary.filter(
              item => item.libraryType === 'I',
            ),
            displayKey: ['code'],
          }}
          onFilter={(value: string) => {
            libraryStore.libraryService.filterByFields({
              input: {
                filter: {
                  fields: ['code'],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          onSelect={item => {
            onSelect && onSelect(item.code);
            libraryStore.updateLibraryList(libraryStore.listLibraryCopy);
          }}
        />
      </>
    );
  },
);
