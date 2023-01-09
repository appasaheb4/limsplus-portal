import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from '@/library/components';
import {useStores} from '@/stores';

interface EndOfReportComponentsProps {
  onSelect: (item) => void;
}

export const EndOfReportComponents = observer(
  ({onSelect}: EndOfReportComponentsProps) => {
    const {loading, reportSettingStore, libraryStore} = useStores();
    return (
      <div>
        <AutoCompleteFilterMutiSelectMultiFieldsDisplay
          loader={loading}
          placeholder='Search by code or details'
          data={{
            list: libraryStore.listLibrary,
            selected:
              reportSettingStore.selectedItemTemplatePatientResult?.endOfReport,
            displayKey: ['code', 'details'],
          }}
          onUpdate={item => {
            const endOfReport =
              reportSettingStore.selectedItemTemplatePatientResult?.endOfReport;
            onSelect &&
              onSelect(
                _.map(endOfReport, o => _.pick(o, ['_id', 'code', 'details'])),
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
            let endOfReport =
              reportSettingStore.selectedItemTemplatePatientResult?.endOfReport;
            if (!item.selected) {
              if (endOfReport && endOfReport.length > 0) {
                endOfReport.push(item);
              } else endOfReport = [item];
            } else {
              endOfReport = endOfReport.filter(items => {
                return items._id !== item._id;
              });
            }
            reportSettingStore.updateSelectedItemTemplatePatientResult({
              ...reportSettingStore.selectedItemTemplatePatientResult,
              endOfReport,
            });
          }}
        />
      </div>
    );
  },
);
