import React from 'react';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';

interface InstTypeProps {
  hasError?: boolean;
  onSelect: (items) => void;
}

export const InstType = observer(({hasError, onSelect}: InstTypeProps) => {
  const {loading, interfaceManagerStore} = useStores();
  return (
    <div>
      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
        loader={loading}
        placeholder='Search by inst type'
        hasError={hasError}
        data={{
          list: interfaceManagerStore.listInterfaceManager,
          displayKey: ['instrumentType'],
        }}
        onFilter={(value: string) => {
          interfaceManagerStore.interfaceManagerService.filterByFields({
            input: {
              filter: {
                fields: ['instrumentType'],
                srText: value,
              },
              page: 0,
              limit: 10,
            },
          });
        }}
        onSelect={item => {
          onSelect(item.instrumentType);
          interfaceManagerStore.updateInterfaceManagerList(
            interfaceManagerStore.listInterfaceManagerCopy,
          );
        }}
      />
    </div>
  );
});
