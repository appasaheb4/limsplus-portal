import React, {useState, useEffect} from 'react';
// import { Spinner } from "react-bootstrap"
import {observer} from 'mobx-react';
import {AutoCompleteFilterSingleSelect} from '@/library/components';
import {useStores} from '@/stores';

interface AutoCompleteProps {
  selected: any;
  onUpdate: (item: any) => void;
}

export const AutoCompleteFilterSingleSelectVariable = observer(
  ({selected, onUpdate}: AutoCompleteProps) => {
    const {loading, environmentStore} = useStores();
    const [defaultData, setDefaultData] = useState(selected);
    const [data, setData] = useState<any>(selected);
    useEffect(() => {
      environmentStore.updateEnvironmentSettings({
        ...environmentStore.environmentSettings,
        variable: data?.environmentVariable,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, selected]);
    return (
      <>
        <div className='flex flex-row gap-2 w-full'>
          <AutoCompleteFilterSingleSelect
            loader={loading}
            placeholder='Search by variable'
            data={{
              list: environmentStore.environmentVariableList.filter(
                item => item.documentType === 'environmentVariable',
              ),
              displayKey: 'environmentVariable',
            }}
            onFilter={(value: string) => {
              environmentStore.EnvironmentService.filter(
                {
                  input: {
                    type: 'filter',
                    filter: {
                      environmentVariable: value,
                      documentType: 'environmentVariable',
                    },
                    page: 0,
                    limit: 10,
                  },
                },
                'environmentVariable',
              );
            }}
            onSelect={item => {
              environmentStore.updatePermision({
                ...environmentStore.permission,
                allLabs: item.allLabs || false,
                allUsers: item.allUsers || false,
                allDepartment: item.allDepartment || false,
              });
              setData({
                ...data,
                item,
              });
              onUpdate({variable: item});
              environmentStore.updateEnvVariableList(
                environmentStore.environmentVariableListCopy,
              );
            }}
          />
        </div>
      </>
    );
  },
);
