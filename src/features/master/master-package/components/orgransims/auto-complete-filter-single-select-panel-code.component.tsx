import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteFilterSingleSelectPanelCodeProps {
  lab?: string;
  serviceType?: string;
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterSingleSelectPanelCode = observer(
  ({
    onSelect,
    lab,
    serviceType,
  }: AutoCompleteFilterSingleSelectPanelCodeProps) => {
    const {loading, masterPanelStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion='relative'
          loader={loading}
          placeholder='Search by code or name'
          data={{
            list:
              masterPanelStore.listMasterPanel.filter(item => {
                return (
                  item.serviceType === (serviceType === 'K' ? 'N' : 'S') &&
                  item.pLab === lab
                );
              }) || [],
            displayKey: ['panelCode', 'panelName'],
          }}
          onFilter={(value: string) => {
            masterPanelStore.masterPanelService.filterByFields({
              input: {
                filter: {
                  fields: ['panelCode', 'panelName'],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          onSelect={item => {
            onSelect && onSelect(item);
            masterPanelStore.updatePanelMasterList(
              masterPanelStore.listMasterPanelCopy,
            );
          }}
        />
      </>
    );
  },
);
