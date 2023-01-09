import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from '@/library/components';
import {useStores} from '@/stores';

interface EndOfPageComponentsProps {
  onSelect: (item: any) => void;
}

export const EndOfPageComponents = observer(
  ({onSelect}: EndOfPageComponentsProps) => {
    const {loading, routerStore, reportSettingStore, libraryStore} =
      useStores();
    return (
      <div>
        <AutoCompleteFilterMutiSelectMultiFieldsDisplay
          loader={loading}
          placeholder='Search by code or details'
          data={{
            list: libraryStore.listLibrary,
            selected:
              reportSettingStore.selectedItemTemplatePatientResult?.endOfPage,
            displayKey: ['code', 'details'],
          }}
          onUpdate={item => {
            const endOfPage =
              reportSettingStore.selectedItemTemplatePatientResult?.endOfPage;
            onSelect &&
              onSelect(
                _.map(endOfPage, o => _.pick(o, ['_id', 'code', 'details'])),
              );
            libraryStore.updateLibraryList(libraryStore.listLibraryCopy);
          }}
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
            let endOfPage =
              reportSettingStore.selectedItemTemplatePatientResult?.endOfPage;
            if (!item.selected) {
              if (endOfPage && endOfPage.length > 0) {
                endOfPage.push(item);
              } else endOfPage = [item];
            } else {
              endOfPage = endOfPage.filter(items => {
                return items._id !== item._id;
              });
            }
            reportSettingStore.updateSelectedItemTemplatePatientResult({
              ...reportSettingStore.selectedItemTemplatePatientResult,
              endOfPage,
            });
          }}
        />
      </div>
    );
  },
);
