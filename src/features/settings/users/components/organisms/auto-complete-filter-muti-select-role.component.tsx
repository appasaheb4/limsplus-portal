import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import {
  AutoCompleteFilterMultiSelectSelectedTopDisplay,
  Icons,
} from '@/library/components';
import { useStores } from '@/stores';
import _ from 'lodash';

interface AutoCompleteProps {
  selected: any[];
  onUpdate: (item: any) => void;
}

export const AutoCompleteFilterMutiSelectRoles = observer(
  ({ selected, onUpdate }: AutoCompleteProps) => {
    const { loading, userStore, roleStore } = useStores();
    const [value, setValue] = useState<string>('');
    const [options, setOptions] = useState<any[]>();
    const [originalOptions, setOriginalOptions] = useState<any[]>();
    const [isListOpen, setIsListOpen] = useState<boolean>(false);

    const useOutsideAlerter = ref => {
      useEffect(() => {
        function handleClickOutside(event) {
          if (
            ref.current &&
            !ref.current.contains(event.target) &&
            isListOpen
          ) {
            if (originalOptions && options && isListOpen) {
              roleStore.updateRoleList(roleStore.listRoleCopy);
              onUpdate && onUpdate(userStore.selectedItems?.roles);
            }
            setIsListOpen(false);
            setValue('');
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
    let count = 0;
    const getSelectedItem = (
      selectedItem: any[],
      list: any[],
      findKey: string,
    ) => {
      if (count === 0) {
        const finalList = list.filter((item, index) => {
          item.selected = false;
          selectedItem && selectedItem.length > 0
            ? selectedItem.find((sItem, index) => {
                if (sItem._id === item._id) {
                  item.selected = true;
                }
              })
            : (item.selected = false);
          count++;
          return item;
        });
        list = finalList;
      }
      return list?.filter(item => {
        if (item?.code == 'ONBOARDING') return;
        else return item;
      });
    };

    useEffect(() => {
      userStore.updateSelectedItems({
        ...userStore.selectedItems,
        roles: selected,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    useEffect(() => {
      setOriginalOptions(
        getSelectedItem(
          userStore.selectedItems?.roles,
          roleStore.listRole,
          'description',
        ),
      );
      setOptions(
        getSelectedItem(
          userStore.selectedItems?.roles,
          roleStore.listRole,
          'description',
        ),
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roleStore.listRole, userStore.selectedItems]);

    const onFilter = (value: string) => {
      roleStore.RoleService.filter({
        input: {
          filter: {
            type: 'search',
            ['description']: value,
          },
          page: 0,
          limit: 10,
        },
      });
    };

    const onSelect = item => {
      let roles = userStore.selectedItems?.roles;
      if (!item.selected) {
        if (roles && roles.length > 0) {
          roles.push({ ...item, selected: true });
        } else {
          roles = [{ ...item, selected: true }];
        }
      } else {
        roles = roles.filter(items => {
          return items._id !== item._id;
        });
      }
      userStore.updateSelectedItems({
        ...userStore.selectedItems,
        roles,
      });
    };

    const onChange = e => {
      const search = e.target.value;
      setValue(search);
      onFilter(search);
    };

    const onKeyUp = e => {
      const charCode = e.which ? e.which : e.keyCode;
      if (charCode === 8) {
        const search = e.target.value;
        onFilter(search);
      }
    };

    return (
      <>
        <div ref={wrapperRef} className='w-full relative'>
          <AutoCompleteFilterMultiSelectSelectedTopDisplay
            loader={loading}
            dynamicCheck={'code'}
            placeholder='Search by code or name'
            data={{
              list: roleStore.listRole,
              selected: userStore.selectedItems?.roles,
              displayKey: ['code', 'description'],
            }}
            onFilter={(value: string) => {
              roleStore.RoleService.filterByFields({
                input: {
                  filter: {
                    fields: ['code', 'description'],
                    srText: value,
                  },
                  page: 0,
                  limit: 10,
                },
              });
            }}
            // hasError={!!errors.role}
            onUpdate={item => {
              roleStore.updateRoleList(roleStore.listRoleCopy);
              onUpdate && onUpdate(userStore.selectedItems?.roles);
            }}
            onSelect={item => {
              onSelect(item);
            }}
          />
        </div>
      </>
    );
  },
);
