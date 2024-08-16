import React, { useEffect } from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import {
  AutoCompleteFilterMultiSelectSelectedTopDisplay,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
} from '@/library/components';

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
    const { loading, departmentStore, userStore } = useStores();

    useEffect(() => {
      (async () => {
        if (selectedItems?.length > 0) {
          const itemSelected: Array<any> = [];
          await userStore.UsersService.getUserByMatchUserId({
            input: { filter: { userId: selectedItems } },
          }).then(res => {
            if (res.getUserByMatchUserId?.success) {
              res.getUserByMatchUserId?.data.filter(item => {
                itemSelected.push(item);
              });
            } else {
              console.log(res.getUserByMatchUserId?.message);
            }
          });
          departmentStore.updateSelectedItems({
            ...departmentStore.selectedItems,
            authorizedSignatory: _.uniqBy(
              itemSelected.map(item => ({
                ...item,
                selected: true,
              })),
              'userId',
            ),
          });
        }
      })();
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItems, userStore.userList]);

    return (
      <AutoCompleteFilterMultiSelectSelectedTopDisplay
        loader={loading}
        placeholder='Search by userId or name...'
        data={{
          list: userStore.userList,
          selected: departmentStore.selectedItems?.authorizedSignatory,
          displayKey: ['userId', 'fullName'],
        }}
        dynamicCheck={'userId'}
        hasError={hasError}
        onUpdate={item => {
          const authorizedSignatory =
            departmentStore.selectedItems?.authorizedSignatory;
          onSelect(_.union(_.map(authorizedSignatory, 'userId')));
          // userStore.updateUserList(userStore.userListCopy);
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
            departmentStore.selectedItems?.authorizedSignatory || [];
          if (!item.selected) {
            if (
              !authorizedSignatory.some(
                existingItem => existingItem.userId === item.userId,
              )
            ) {
              authorizedSignatory.push(item);
            }
          } else {
            authorizedSignatory = authorizedSignatory.filter(existingItem => {
              return existingItem.userId !== item.userId;
            });
          }
          departmentStore.updateSelectedItems({
            ...departmentStore.selectedItems,
            authorizedSignatory: _.uniqBy(authorizedSignatory, 'userId'),
          });
        }}
      />
    );
  },
);
