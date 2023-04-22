import React, {useState} from 'react';
import {Table} from 'reactstrap';
import {Icons, Buttons} from '@/library/components';
import {lookupItems, getDefaultLookupItem, lookupValue} from '@/library/utils';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {useForm, Controller} from 'react-hook-form';

interface CommonInputTableProps {
  data?: any;
}

export const CommonInputTable = observer(({data}: CommonInputTableProps) => {
  const {routerStore, segmentMappingStore, interfaceManagerStore} = useStores();
  const [arrInstType, setArrInstType] = useState([]);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({mode: 'all'});
  const [input, setInput] = useState<any>({
    instType: '',
    dataFlow: '',
    protocol: '',
  });

  const addItem = () => {
    reset();
    const segmentMapping = segmentMappingStore.segmentMapping;
    segmentMapping?.push({
      index: segmentMapping?.length + 1,
      instType: input.instType,
      dataFlow: input.dataFlow,
      protocol: input.protocol,
      segments: getDefaultLookupItem(routerStore.lookupItems, 'SEGMENT'),
      segmentRequired: true,
      elementRequired: false,
      repeatDelimiter: false,
      requiredForLims: false,
      fieldType: getDefaultLookupItem(routerStore.lookupItems, 'FIELD_TYPE'),
      environment: getDefaultLookupItem(routerStore.lookupItems, 'ENVIRONMENT'),
    });
    segmentMappingStore.updateSegmentMapping(segmentMapping);
  };

  const getInstTypeList = (dataFlow: string) => {
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
          setArrInstType(res.findByFieldsInterfaceManager.data);
        }
      });
  };

  return (
    <div className='flex flex-row gap-2 items-center overflow-auto'>
      <Table striped bordered>
        <thead>
          <tr className='p-0 text-xs'>
            <th className='text-white' style={{minWidth: 200}}>
              Data Flow
            </th>
            <th
              className='text-white sticky left-0 z-10'
              style={{minWidth: 200}}
            >
              Inst Type
            </th>
            <th className='text-white' style={{minWidth: 200}}>
              Protocol
            </th>
          </tr>
        </thead>
        <tbody className='text-xs'>
          <tr>
            <td>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <select
                    value={value}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.dataFlow ? 'border-red  ' : 'border-gray-300'
                    } rounded-md`}
                    onChange={e => {
                      const dataFlow = e.target.value as string;
                      onChange(dataFlow);
                      setInput({
                        ...input,
                        dataFlow,
                      });
                      getInstTypeList(dataFlow);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(routerStore.lookupItems, 'DATA__FLOW').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                )}
                name='dataFlow'
                rules={{required: true}}
                defaultValue={routerStore.lookupItems}
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <select
                    value={value}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.instType ? 'border-red  ' : 'border-gray-300'
                    } rounded-md`}
                    onChange={e => {
                      const instType = e.target.value as string;
                      onChange(instType);
                      setInput({
                        ...input,
                        instType,
                      });
                    }}
                  >
                    <option selected>Select</option>
                    {arrInstType?.map((item: any, index: number) => (
                      <option key={index} value={item?.instrumentType}>
                        {item?.instrumentType}
                      </option>
                    ))}
                  </select>
                )}
                name='instType'
                rules={{required: true}}
                defaultValue={arrInstType}
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <select
                    value={value || 'Selected'}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.protocol ? 'border-red  ' : 'border-gray-300'
                    } rounded-md`}
                    onChange={e => {
                      const protocol = e.target.value as string;
                      onChange(protocol);
                      setInput({
                        ...input,
                        protocol,
                      });
                    }}
                  >
                    <option selected>Select</option>
                    {_.uniqBy(arrInstType, 'protocol')?.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.protocol}>
                          {item?.protocol}
                        </option>
                      ),
                    )}
                  </select>
                )}
                name='protocol'
                rules={{required: true}}
                defaultValue=''
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <Buttons.Button
        size='medium'
        type='solid'
        onClick={handleSubmit(addItem)}
      >
        <Icons.EvaIcon icon='plus-circle-outline' />
        {'Add'}
      </Buttons.Button>
    </div>
  );
});
