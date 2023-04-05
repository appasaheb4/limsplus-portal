import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteFilterSingleSelectReportTemplateProps {
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterSingleSelectReportTemplate = observer(
  ({onSelect}: AutoCompleteFilterSingleSelectReportTemplateProps) => {
    const {loading, reportSettingStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          loader={loading}
          placeholder='Report Template'
          data={{
            list: reportSettingStore?.templatePatientResultList,
            displayKey: ['templateCode', 'templateTitle'],
          }}
          onFilter={(value: string) => {
            reportSettingStore.templatePatientResultService.filterByFields({
              input: {
                filter: {
                  fields: ['templateCode', 'templateTitle'],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          onSelect={element => {
            onSelect({
              reportTemplate: `${element.templateCode} - ${element.templateTitle}`,
              reportOrder: element?.reportOrder,
            });
            reportSettingStore.updatePageBrandingList(
              reportSettingStore.pageBrandingListCopy,
            );
          }}
        />
      </>
    );
  },
);
