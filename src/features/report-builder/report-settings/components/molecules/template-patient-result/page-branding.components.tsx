import React from 'react';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';

interface PageBrandingComponentsProps {
  onSelect: (item) => void;
}

export const PageBrandingComponents = observer(
  ({onSelect}: PageBrandingComponentsProps) => {
    const {loading, reportSettingStore} = useStores();
    return (
      <div>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          loader={loading}
          placeholder='Page Branding'
          data={{
            list: reportSettingStore.pageBrandingList,
            displayKey: ['tempCode', 'brandingTitle'],
          }}
          onFilter={(value: string) => {
            reportSettingStore.pageBrandingService.filterByFields({
              input: {
                filter: {
                  fields: ['tempCode', 'brandingTitle'],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          onSelect={item => {
            onSelect && onSelect(item);
          }}
        />
      </div>
    );
  },
);
