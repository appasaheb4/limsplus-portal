import React, {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
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
            list: reportSettingStore?.pageBrandingList,
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
          onSelect={element => {
            onSelect(`${element.tempCode} - ${element.brandingTitle}`);
            reportSettingStore.updatePageBrandingList(
              reportSettingStore.pageBrandingListCopy,
            );
          }}
        />
      </>
    );
  },
);
