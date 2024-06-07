import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { Icons, Buttons, Form, Toast } from '@/library/components';
import { lookupValue } from '@/library/utils';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { useForm, Controller } from 'react-hook-form';
import { toJS } from 'mobx';

interface PriceListTableProps {
  priceGroup: any;
  priceList: any;
}

export const PriceListTable = observer(
  ({ priceGroup, priceList }: PriceListTableProps) => {
    const { labStore } = useStores();

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      clearErrors,
      reset,
    } = useForm({ mode: 'all' });

    const [priceGroupItems, setPriceGroupItems] = useState<any>();
    const [priceListItems, setPriceListItems] = useState<any>();

    useEffect(() => {
      setPriceGroupItems(priceGroup);
      setPriceListItems(priceList);
    }, [priceGroup, priceList]);

    useEffect(() => {
      if (labStore.labs.priceList?.length > 0)
        labStore.labs.priceList.map((item, index) => {
          setValue(`priceGroup_${index}`, item.priceGroup);
          setValue(`priceList_${index}`, item.priceList);
          setValue(`priority_${index}`, item.priority);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labStore.labs.priceList]);

    const getPriceList = (priceList, priceGroup) => {
      const list = priceList?.filter(item => {
        if (item.code.slice(0, 3) === priceGroup) {
          return item;
        }
      });
      return list || [];
    };

    const addItem = () => {
      const priceList = labStore.labs?.priceList;
      priceList.push({
        id: labStore.labs?.priceList.length + 1,
        maxDis: 0,
      });
      labStore.updateLabs({
        ...labStore.labs,
        priceList,
      });
    };

    const removeItem = (index: number) => {
      const firstArr = labStore.labs?.priceList?.slice(0, index) || [];
      const secondArr = labStore.labs?.priceList?.slice(index + 1) || [];
      const finalArray = [...firstArr, ...secondArr];
      labStore.updateLabs({
        ...labStore.labs,
        priceList: finalArray,
      });
    };

    return (
      <div className='flex flex-row gap-2 items-center overflow-auto'>
        <Table striped bordered>
          <thead>
            <tr className='p-0 text-xs'>
              <th className='text-white' style={{ minWidth: 150 }}>
                Price Group
              </th>
              <th className='text-white' style={{ minWidth: 150 }}>
                Price List
              </th>
              <th className='text-white' style={{ minWidth: 150 }}>
                Description
              </th>
              <th className='text-white' style={{ minWidth: 100 }}>
                Priority
              </th>
              <th className='text-white' style={{ minWidth: 100 }}>
                Max Dis%
              </th>
              <th className='text-white sticky right-0 z-10'>Action</th>
            </tr>
          </thead>
          <tbody className='text-xs'>
            {labStore?.labs?.priceList?.map((item, index) => (
              <tr key={item.id || index}>
                <td>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <select
                        value={item.priceGroup}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors[`priceGroup_${index}`]
                            ? 'border-red'
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const priceGroup = e.target.value as string;
                          onChange(priceGroup);
                          const priceList = labStore.labs?.priceList;
                          priceList[index] = {
                            ...priceList[index],
                            priceGroup: priceGroup,
                            priceList: '',
                            description: '',
                          };
                          labStore.updateLabs({
                            ...labStore.labs,
                            priceList,
                          });
                        }}
                      >
                        <option>{item.priceGroup || 'Select'}</option>
                        {priceGroupItems?.map((e: any) => (
                          <option key={e.code} value={e.code}>
                            {lookupValue(e)}
                          </option>
                        ))}
                      </select>
                    )}
                    name={`priceGroup_${index}`}
                    rules={{ required: true }}
                    defaultValue={item.priceGroup}
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <select
                        value={item?.priceList || ''}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors[`priceList_${index}`]
                            ? 'border-red'
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const priceItem = JSON.parse(e.target.value);
                          const priceList = labStore.labs?.priceList;
                          if (
                            toJS(priceList)?.filter(
                              dup =>
                                dup.priceGroup === item.priceGroup &&
                                dup.priceList === priceItem.code,
                            )?.length > 0
                          )
                            return Toast.error({
                              message:
                                '😔 Price list is duplicate record found.',
                            });
                          onChange(priceItem.code);
                          priceList[index] = {
                            ...priceList[index],
                            priceList: priceItem?.code,
                            description: priceItem?.value,
                          };
                          labStore.updateLabs({
                            ...labStore.labs,
                            priceList,
                          });
                        }}
                      >
                        <option>{item.priceList || 'Select'}</option>
                        {getPriceList(priceListItems, item?.priceGroup)?.map(
                          (priceItem: any) => (
                            <option
                              key={priceItem.code}
                              value={JSON.stringify(priceItem)}
                            >
                              {lookupValue(priceItem)}
                            </option>
                          ),
                        )}
                      </select>
                    )}
                    name={`priceList_${index}`}
                    rules={{ required: true }}
                    defaultValue={item.priceList}
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.MultilineInput
                        rows={2}
                        label=''
                        disabled={true}
                        placeholder={
                          errors[`description_${index}`]
                            ? 'Please Enter description'
                            : 'Description'
                        }
                        hasError={!!errors.description}
                        value={item?.description || ''}
                        onChange={description => {
                          onChange(description);
                        }}
                      />
                    )}
                    name={`description_${index}`}
                    rules={{ required: false }}
                    defaultValue=''
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Input
                        label=''
                        value={item?.priority}
                        type='number'
                        placeholder='Priority'
                        className={
                          'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                        }
                        hasError={!!errors[`priority_${index}`]}
                        onChange={priority => {
                          onChange(priority);
                          const priceList = labStore.labs?.priceList;
                          priceList[index] = {
                            ...priceList[index],
                            priority: Number.parseInt(priority),
                          };
                          labStore.updateLabs({
                            ...labStore.labs,
                            priceList,
                          });
                        }}
                      />
                    )}
                    name={`priority_${index}`}
                    rules={{ required: true }}
                    defaultValue={item.priority}
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Input
                        label=''
                        type='number'
                        placeholder={item?.maxDis?.toString()}
                        className={
                          'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                        }
                        hasError={!!errors[`maxDis_${index}`]}
                        onChange={maxDis => {
                          onChange(maxDis);
                          const priceList = labStore.labs?.priceList;
                          priceList[index] = {
                            ...priceList[index],
                            maxDis: Number.parseFloat(maxDis),
                          };
                          labStore.updateLabs({
                            ...labStore.labs,
                            priceList,
                          });
                        }}
                      />
                    )}
                    name={`maxDis_${index}`}
                    rules={{ required: false }}
                    defaultValue={item.maxDis}
                  />
                </td>
                <td className='sticky right-0 z-10 bg-gray-500'>
                  <div className='flex flex-col gap-1'>
                    <Buttons.Button
                      size='small'
                      type='outline'
                      onClick={() => {
                        removeItem(index);
                      }}
                    >
                      <Icons.EvaIcon
                        icon='minus-circle-outline'
                        color='#ffffff'
                      />
                    </Buttons.Button>
                    <Buttons.Button
                      size='small'
                      type='outline'
                      onClick={handleSubmit(addItem)}
                    >
                      <Icons.EvaIcon
                        icon='plus-circle-outline'
                        color='#ffffff'
                      />
                    </Buttons.Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {labStore.labs?.priceList?.length === 0 && (
            <Buttons.Button
              size='small'
              type='outline'
              onClick={handleSubmit(addItem)}
            >
              <Icons.EvaIcon icon='plus-circle-outline' color='#000000' />
            </Buttons.Button>
          )}
        </Table>
      </div>
    );
  },
);
