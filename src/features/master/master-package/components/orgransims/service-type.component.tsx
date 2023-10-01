import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { lookupValue } from '@/library/utils';

interface ServiceTypeProps {
  value: string;
  isError: boolean;
  onUpdate: (details: any) => void;
}

const ServiceType = observer(
  ({ value, isError, onUpdate }: ServiceTypeProps) => {
    const {
      loginStore,
      masterPackageStore,
      labStore,
      masterPanelStore,
      routerStore,
      loading,
    } = useStores();

    const getServiceTypes = (fileds: any) => {
      if (fileds) {
        const finalArray = fileds.arrValue.filter(fileds => {
          if (fileds.code === 'K' || fileds.code === 'M') return fileds;
        });
        return finalArray;
      }
      return [];
    };
    return (
      <div>
        <select
          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
            isError ? 'border-red' : 'border-gray-300'
          } rounded-md`}
          onChange={e => {
            const serviceItem = JSON.parse(e.target.value);
            onUpdate(serviceItem);
          }}
        >
          <option selected>{value || 'Select'}</option>
          {routerStore.lookupItems.length > 0 &&
            getServiceTypes(
              routerStore.lookupItems.find(item => {
                return item.fieldName === 'SERVICE_TYPE';
              }),
            )?.map((item: any, index: number) => (
              <option key={index} value={JSON.stringify(item)}>
                {lookupValue(item)}
              </option>
            ))}
        </select>
      </div>
    );
  },
);

export default ServiceType;
