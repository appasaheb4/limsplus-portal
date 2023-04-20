import React, {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from '@/library/components';
import {useStores} from '@/stores';

interface AutoCompleteFilterMultiSelectPanelListProps {
  disable: boolean;
  selected: any[];
  onSelect: (item: any) => void;
}

export const AutoCompleteFilterMultiSelectPanelList = observer(
  ({
    disable,
    selected,
    onSelect,
  }: AutoCompleteFilterMultiSelectPanelListProps) => {
    const {loginStore, masterPanelStore, corporateClientsStore} = useStores();
    const [isListOpen, setIsListOpen] = useState<boolean>(false);

    const useOutsideAlerter = ref => {
      useEffect(() => {
        function handleClickOutside(event) {
          if (
            ref.current &&
            !ref.current.contains(event.target) &&
            isListOpen
          ) {
            setIsListOpen(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [ref, isListOpen]);
    };
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    useEffect(() => {
      corporateClientsStore.updateSelectedItems({
        ...corporateClientsStore.selectedItems,
        panelList: selected,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
      <>
        <div ref={wrapperRef} className='w-full relative'>
          <AutoCompleteFilterMutiSelectMultiFieldsDisplay
            loader={false}
            placeholder='Search by code'
            disable={!disable}
            data={{
              list: masterPanelStore.listMasterPanel?.slice(0, 10) || [],
              selected: corporateClientsStore.selectedItems?.panelList,
              displayKey: ['panelCode', 'panelName'],
            }}
            onUpdate={item => {
              const panelList = corporateClientsStore.selectedItems?.panelList;
              onSelect(
                _.map(panelList, o =>
                  _.pick(o, ['_id', 'panelCode', 'panelName']),
                ),
              );
            }}
            onFilter={(value: string) => {
              masterPanelStore.masterPanelService.filterByFieldsSpecificPLab({
                input: {
                  filter: {
                    lab: loginStore.login?.lab,
                    fields: ['panelCode', 'panelName'],
                    srText: value,
                  },
                  page: 0,
                  limit: 10,
                },
              });
            }}
            onSelect={item => {
              let panelList = corporateClientsStore.selectedItems?.panelList;
              if (!item.selected) {
                if (panelList && panelList.length > 0) {
                  panelList.push(item);
                } else panelList = [item];
              } else {
                panelList = panelList?.filter(items => {
                  return items._id !== item._id;
                });
              }
              corporateClientsStore.updateSelectedItems({
                ...corporateClientsStore.selectedItems,
                panelList,
              });
            }}
          />
        </div>
      </>
    );
  },
);
