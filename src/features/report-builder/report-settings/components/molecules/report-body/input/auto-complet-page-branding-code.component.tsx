import React from 'react';
import {observer} from 'mobx-react';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';
import {useStores} from '@/stores';

interface AutoCompletePageBrandingCodeProps {
  hasError?: boolean;
  onSelect: (item) => void;
}

export const AutoCompletePageBrandingCode = observer(
  ({hasError = false, onSelect}: AutoCompletePageBrandingCodeProps) => {
    const {loading, routerStore, reportSettingStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          loader={loading}
          placeholder='Page Branding Code'
          data={{
            list: reportSettingStore.pageBrandingList,
            displayKey: ['tempCode', 'brandingTitle'],
          }}
          hasError={hasError}
          onFilter={(value: string) => {
            // reportSettingStore.updateReportSectionList(
            //   reportSettingStore.reportSectionListCopy.filter(item =>
            //     item.section
            //       .toString()
            //       .toLowerCase()
            //       .includes(value.toLowerCase()),
            //   ),
            // );
          }}
          onSelect={item => {
            onSelect(item);
          }}
        />
      </>
    );
  },
);
