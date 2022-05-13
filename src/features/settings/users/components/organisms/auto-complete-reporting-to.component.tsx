/* eslint-disable  */
import React, {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';

interface AutoCompleteReportingToProps {
  onSelect: (item: any) => void;
}

export const AutoCompleteReportingTo = observer(
  ({onSelect}: AutoCompleteReportingToProps) => {
    const {loading, userStore} = useStores();
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion='sticky'
          loader={loading}
          placeholder='Search by emp code or full name'
          data={{
            list: userStore.userList,
            displayKey: ['empCode', 'fullName'],
          }}
          // hasError={errors.reportingTo}
          onFilter={(value: string) => {
            userStore.UsersService.filterByFields({
              input: {
                filter: {
                  fields: ['empCode', 'fullName'],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            });
          }}
          onSelect={item => {
            onSelect && onSelect(item);
            userStore.updateUserList(userStore.userListCopy);
          }}
        />
      </>
    );
  },
);
