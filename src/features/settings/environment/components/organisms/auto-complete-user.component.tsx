import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';
import {
  Form,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
} from '@/library/components';
import {useStores} from '@/stores';

interface AutoCompleteProps {
  selected: any;
  onUpdate: (item: any) => void;
}

export const AutoCompleteUsers = observer(
  ({selected, onUpdate}: AutoCompleteProps) => {
    const {loading, userStore, environmentStore} = useStores();
    const [defaultData, setDefaultData] = useState(selected);
    const [data, setData] = useState<any>(selected);

    useEffect(() => {
      environmentStore.updateSelectedItems({
        ...environmentStore.selectedItems,
        users: data?.user,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, selected]);

    return (
      <>
        <div className='flex flex-row gap-2 w-full'>
          <Form.Toggle
            value={environmentStore.permission?.allUsers || false}
            disabled={!environmentStore.permission?.allUsers || false}
            onChange={allUsers => {
              if (!defaultData?.allUsers && allUsers) {
                onUpdate({allUsers});
              }
              setData({
                ...data,
                allUsers,
              });
            }}
          />

          <AutoCompleteFilterMutiSelectMultiFieldsDisplay
            loader={loading}
            disable={
              data?.allUsers
                ? data?.allUsers
                : environmentStore.permission?.allUsers || false
            }
            placeholder='Search by userId or name...'
            data={{
              list: userStore.userList,
              selected: environmentStore.selectedItems?.users,
              displayKey: ['userId', 'fullName'],
            }}
            onUpdate={item => {
              const items = environmentStore.selectedItems?.users;
              userStore.updateUserList(userStore.userListCopy);
              onUpdate({user: items});
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
              let users = environmentStore.selectedItems?.users;
              if (!item.selected) {
                if (users && users.length > 0) {
                  users.push(item);
                } else users = [item];
              } else {
                users = users.filter(items => {
                  return items._id !== item._id;
                });
              }
              environmentStore.updateSelectedItems({
                ...environmentStore.selectedItems,
                users,
              });
            }}
          />
        </div>
      </>
    );
  },
);
