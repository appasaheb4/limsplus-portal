import React from 'react';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';

interface ReportBodyComponentsProps {
  onSelect: (item) => void;
}

export const ReportBodyComponents = observer(
  ({onSelect}: ReportBodyComponentsProps) => {
    const {loading, reportSettingStore} = useStores();
    return (
      <div>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          loader={loading}
          placeholder='Report Body'
          data={{
            list: reportSettingStore.reportBodyList,
            displayKey: ['reportCode', 'reportName'],
          }}
          onFilter={(value: string) => {
            // reportSettingStore.pageBrandingService.filterByFields({
            //   input: {
            //     filter: {
            //       fields: ['reportCode', 'reportName'],
            //       srText: value,
            //     },
            //     page: 0,
            //     limit: 10,
            //   },
            // });
          }}
          onSelect={item => {
            onSelect && onSelect(item);
          }}
        />
      </div>
    );
  },
);
