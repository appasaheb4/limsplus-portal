import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import {
  Form,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
} from '@/library/components';

interface AutoCompleteCompanyListProps {
  onSelect: (code: string) => void;
  isLabel?: boolean;
  hasError?: boolean;
}

export const AutoCompleteCompanyList = observer(
  ({ hasError, isLabel = true, onSelect }: AutoCompleteCompanyListProps) => {
    const [list, setList] = useState([]);
    const { loading, companyStore } = useStores();

    useEffect(() => {
      (async () => {
        companyStore.companyService.list().then(res => {
          if (res.companies.success) setList(res.companies.data);
        });
      })();
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Form.InputWrapper
        label={isLabel ? 'Company Code' : ''}
        hasError={hasError}
      >
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          loader={loading}
          placeholder='Search by code or name...'
          data={{
            list: _.uniqBy(list, (data: any) => {
              return data.code;
            }),
            displayKey: ['code', 'name'],
          }}
          hasError={hasError}
          onFilter={(value: string) => {
            companyStore.companyService
              .filterByFields({
                input: {
                  filter: {
                    fields: ['code', 'name'],
                    srText: value,
                  },
                  page: 0,
                  limit: 10,
                },
              })
              .then(res => {
                if (res.filterByFieldsCompany.success)
                  setList(res.filterByFieldsCompany.data);
                else setList([]);
              });
          }}
          onSelect={item => {
            onSelect(item.code);
          }}
        />
      </Form.InputWrapper>
    );
  },
);
