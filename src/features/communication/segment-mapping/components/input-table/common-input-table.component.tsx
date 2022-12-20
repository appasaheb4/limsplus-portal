import React, {useEffect, useState} from 'react';
import {Table} from 'reactstrap';
import dayjs from 'dayjs';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Icons,
  Buttons,
} from '@/library/components';
import {lookupItems, getDefaultLookupItem, lookupValue} from '@/library/utils';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {useForm, Controller} from 'react-hook-form';

interface CommonInputTableProps {
  data?: any;
}

export const CommonInputTable = observer(({data}: CommonInputTableProps) => {
  const {interfaceManagerStore, routerStore, segmentMappingStore} = useStores();
  const [arrInstType, setArrInstType] = useState([]);
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    clearErrors,
    setError,
  } = useForm({mode: 'all'});
  const [input, setInput] = useState<any>({
    instType: '',
    dataFlow: '',
    protocol: '',
  });

  useEffect(() => {
    interfaceManagerStore.interfaceManagerService
      .findByFields({
        input: {
          filter: {
            interfaceType: 'INSTRUMENT',
          },
        },
      })
      .then(res => {
        if (res.findByFieldsInterfaceManager.success) {
          setArrInstType(res.findByFieldsInterfaceManager.data);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addItem = () => {
    const segmentMapping = segmentMappingStore.segmentMapping;
    segmentMapping?.push({
      instType: input.instType,
      dataFlow: input.dataFlow,
      protocol: input.protocol,
      index: segmentMapping?.length + 1,
      segmentRequired: false,
    });
    segmentMappingStore.updateSegmentMapping(segmentMapping);
  };

  return (
    <div className='flex flex-row gap-2 items-center'>
      <Table striped bordered>
        <thead>
          <tr className='p-0 text-xs'>
            <th className='text-white sticky left-0 z-10'>Equipment Type</th>
            <th className='text-white'>Data Flow</th>
            <th className='text-white'>Protocol</th>
          </tr>
        </thead>
        <tbody className='text-xs'>
          <tr>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.instType ? 'border-red-500  ' : 'border-gray-300'
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
                render={({field: {onChange}}) => (
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.dataFlow ? 'border-red-500  ' : 'border-gray-300'
                    } rounded-md`}
                    onChange={e => {
                      const dataFlow = e.target.value as string;
                      onChange(dataFlow);
                      setInput({
                        ...input,
                        dataFlow,
                      });
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
                defaultValue=''
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.protocol ? 'border-red-500  ' : 'border-gray-300'
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
                    {arrInstType?.map((item: any, index: number) => (
                      <option key={index} value={item.communicationProtocol}>
                        {item?.communicationProtocol}
                      </option>
                    ))}
                  </select>
                )}
                name='protocol'
                rules={{required: true}}
                defaultValue={arrInstType}
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
