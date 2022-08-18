import React, {useEffect} from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteAuthorizedSignatoryProps {
  selectedItems?: Array<any>;
  onSelect: (item: any) => void;
  hasError?: boolean;
}

export const AutoCompleteAuthorizedSignatory = observer(
  ({
    selectedItems = [],
    hasError,
    onSelect,
  }: AutoCompleteAuthorizedSignatoryProps) => {
    const {loading, departmentStore, userStore} = useStores();

    useEffect(() => {
      if (selectedItems?.length > 0) {
        const itemSelected: Array<any> = [];
        selectedItems.filter(e => {
          itemSelected.push(userStore.userList.find(item => item.userId === e));
        });
        departmentStore.updateSelectedItems({
          ...departmentStore.selectedItems,
          authorizedSignatory: itemSelected.map(item => ({
            ...item,
            selected: true,
          })),
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItems]);

    return (
      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
        loader={loading}
        placeholder='Search by userId or name...'
        data={{
          list: userStore.userList,
          selected: departmentStore.selectedItems?.authorizedSignatory,
          displayKey: ['userId', 'fullName'],
        }}
        hasError={hasError}
        onUpdate={item => {
          const authorizedSignatory =
            departmentStore.selectedItems?.authorizedSignatory;
          onSelect(_.union(_.map(authorizedSignatory, 'userId')));
          userStore.updateUserList(userStore.userListCopy);
        }}
        onFilter={(value: string) => {
          userStore.UsersService.filterByFields({
            input: {
              filter: {
                fields: ['userId', 'fullName'],
                srText: value,
              },
              page: 0,
              limit: 10,
            },
          });
        }}
        onSelect={item => {
          let authorizedSignatory =
            departmentStore.selectedItems?.authorizedSignatory;
          if (!item.selected) {
            if (authorizedSignatory && authorizedSignatory?.length > 0) {
              authorizedSignatory.push(item);
            } else authorizedSignatory = [item];
          } else {
            authorizedSignatory = authorizedSignatory.filter(items => {
              return items._id !== item._id;
            });
          }
          departmentStore.updateSelectedItems({
            ...departmentStore.selectedItems,
            authorizedSignatory,
          });
        }}
      />
    );
  },
);
