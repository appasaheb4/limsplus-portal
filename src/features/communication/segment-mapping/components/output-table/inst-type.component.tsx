import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';

interface InstTypeListProps {
  type: string;
  dataFlow: string;
  onSelect: (item: string) => void;
}

export const InstTypeList = observer(
  ({type, dataFlow, onSelect}: InstTypeListProps) => {
    const {interfaceManagerStore} = useStores();
    const [arrInstType, setArrInstType] = useState([]);

    useEffect(() => {
      interfaceManagerStore.interfaceManagerService
        .findByFields({
          input: {
            filter: {
              interfaceType: dataFlow,
            },
          },
        })
        .then(res => {
          if (res.findByFieldsInterfaceManager.success) {
            console.log({data: res.findByFieldsInterfaceManager.data});

            setArrInstType(res.findByFieldsInterfaceManager.data);
          }
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        {type == 'instType' ? (
          <select
            name='equipmentType'
            className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
            onChange={e => {
              const instType = e.target.value;
              onSelect(instType);
            }}
          >
            <option selected>Select</option>
            {arrInstType?.map((item: any, index: number) => (
              <option key={item.instrumentType} value={item.instrumentType}>
                {item.instrumentType}
              </option>
            ))}
          </select>
        ) : (
          <select
            name='data_type'
            className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
            onChange={e => {
              const protocol = e.target.value;
              onSelect(protocol);
            }}
          >
            <option selected>Select</option>
            {arrInstType.map((item: any, index: number) => (
              <option key={item.protocol} value={item.protocol}>
                {item.protocol}
              </option>
            ))}
          </select>
        )}
      </>
    );
  },
);
