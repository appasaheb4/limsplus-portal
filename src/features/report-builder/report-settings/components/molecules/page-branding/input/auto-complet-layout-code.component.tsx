import React from 'react';
import {observer} from 'mobx-react';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';
import {useStores} from '@/stores';

interface AutoCompleteLayoutCodeProps {
  hasError?: boolean;
  displayValue?: string;
  onSelect: (item) => void;
}

export const AutoCompleteLayoutCode = observer(
  ({hasError = false, onSelect, displayValue}: AutoCompleteLayoutCodeProps) => {
    const {loading, routerStore, reportSettingStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          loader={loading}
          placeholder='Layout Code'
          hasError={hasError}
          displayValue={displayValue}
          data={{
            list: reportSettingStore.pageLayoutList,
            displayKey: ['tempCode', 'tempName'],
          }}
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
