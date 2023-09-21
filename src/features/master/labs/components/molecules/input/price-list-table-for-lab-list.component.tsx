import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { Icons, Buttons, Form } from '@/library/components';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { useForm, Controller } from 'react-hook-form';
import { RouterFlow } from '@/flows';
import { IconContext } from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import { lookupValue } from '@/library/utils';

interface PriceListTableForLabListProps {
  data?: any;
  onUpdate?: (item: any) => void;
}

export const PriceListTableForLabList = observer(
  ({ data = [], onUpdate }: PriceListTableForLabListProps) => {
    const { loading, corporateClientsStore, priceListStore } = useStores();

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      clearErrors,
    } = useForm();
    const [priceList, setPriceList] = useState(data);
    const [reload, setReload] = useState(false);
    const [displayPriceList, setDisplayPriceList] = useState(
      data?.length == 0 ? false : true,
    );

    const [priceGroupItems, setPriceGroupItems] = useState<any>();
    const [priceListItems, setPriceListItems] = useState<any>();

    const getPriceList = (priceList, priceGroup) => {
      const list = priceList?.filter(item => {
        if (item.code.slice(0, 3) === priceGroup) {
          return item;
        }
      });
      return list || [];
    };

    useEffect(() => {
      (async function () {
        try {
          await RouterFlow.getLookupValuesByPathNField(
            '/collection/price-list',
            'PRICE_GROUP',
          ).then(async res => {
            if (res?.length > 0) {
              setPriceGroupItems(res.filter(item => item.code !== 'CSP'));
              await RouterFlow.getLookupValuesByPathNField(
                '/collection/price-list',
                'PRICE_LIST',
              ).then(items => {
                if (items?.length > 0) {
                  setPriceListItems(items);
                }
              });
            }
          });
        } catch (e) {
          console.error(e);
        }
      })();
    }, []);

    const addItem = () => {
      priceList.push({
        id: priceList.length + 1,
        maxDis: 0,
      });
      setPriceList(JSON.parse(JSON.stringify(priceList)));
      setDisplayPriceList(true);
    };

    const removeItem = (index: number) => {
      const firstArr = priceList?.slice(0, index) || [];
      const secondArr = priceList?.slice(index + 1) || [];
      const finalArray = [...firstArr, ...secondArr];
      setPriceList(finalArray);
      setReload(!reload);
    };

    return (
      <div className='flex flex-col gap-2 items-center overflow-auto'>
        <Table striped bordered>
          <thead>
            <tr className='p-0 text-xs z-0'>
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
              <th className='text-white sticky right-0 flex flex-row gap-2'>
                Action
                <Buttons.ButtonIcon
                  icon={
                    <IconContext.Provider value={{ color: '#ffffff' }}>
                      <BsFillArrowUpCircleFill />
                    </IconContext.Provider>
                  }
                  title=''
                  onClick={() => {
                    setDisplayPriceList(false);
                  }}
                />
                <Buttons.ButtonIcon
                  icon={
                    <IconContext.Provider value={{ color: '#ffffff' }}>
                      <BsFillArrowDownCircleFill />
                    </IconContext.Provider>
                  }
                  title=''
                  onClick={() => {
                    setDisplayPriceList(true);
                  }}
                />
              </th>
            </tr>
          </thead>
          {displayPriceList && (
            <tbody className='text-xs'>
              {priceList?.map((item, index) => (
                <tr>
                  <td>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <select
                          value={item?.priceGroup}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.priceGroup
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const priceGroup = e.target.value as string;
                            onChange(priceGroup);
                            priceList[index] = {
                              ...priceList[index],
                              priceGroup: priceGroup,
                              priceList: '',
                              description: '',
                            };
                            setPriceList(JSON.parse(JSON.stringify(priceList)));
                          }}
                        >
                          <option selected>Select</option>
                          {priceGroupItems?.map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      )}
                      name='priceGroup'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <select
                          value={item?.priceList || ''}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.priceList
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const priceItem = JSON.parse(e.target.value);
                            onChange(priceItem.code);
                            priceList[index] = {
                              ...priceList[index],
                              priceList: priceItem?.code,
                              description: priceItem?.value,
                            };
                            setPriceList(JSON.parse(JSON.stringify(priceList)));
                          }}
                        >
                          <option selected>{item.priceList || 'Select'}</option>
                          {getPriceList(priceListItems, item?.priceGroup)?.map(
                            (item: any, index: number) => (
                              <option key={index} value={JSON.stringify(item)}>
                                {lookupValue(item)}
                              </option>
                            ),
                          )}
                        </select>
                      )}
                      name='priceList'
                      rules={{ required: false }}
                      defaultValue=''
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
                            errors.description
                              ? 'Please Enter description'
                              : 'Description'
                          }
                          hasError={!!errors.description}
                          value={item?.description}
                          onChange={description => {
                            onChange(description);
                          }}
                        />
                      )}
                      name='description'
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
                            'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                          }
                          hasError={!!errors.priority}
                          onChange={priority => {
                            onChange(priority);
                            priceList[index] = {
                              ...priceList[index],
                              priority: Number.parseInt(priority),
                            };
                            setPriceList(JSON.parse(JSON.stringify(priceList)));
                          }}
                        />
                      )}
                      name='priority'
                      rules={{ required: false }}
                      defaultValue={item?.priority}
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
                            'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                          }
                          hasError={!!errors.maxDis}
                          onChange={maxDis => {
                            onChange(maxDis);
                            priceList[index] = {
                              ...priceList[index],
                              maxDis,
                            };
                            setPriceList(JSON.parse(JSON.stringify(priceList)));
                          }}
                        />
                      )}
                      name='maxDis'
                      rules={{ required: false }}
                      defaultValue={item?.maxDis}
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
                          color='#fff'
                        />
                      </Buttons.Button>
                      <Buttons.Button
                        size='small'
                        type='outline'
                        onClick={handleSubmit(addItem)}
                      >
                        <Icons.EvaIcon
                          icon='plus-circle-outline'
                          color='#fff'
                        />
                      </Buttons.Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}

          <Buttons.Button
            size='small'
            type='outline'
            onClick={handleSubmit(addItem)}
          >
            <Icons.EvaIcon icon='plus-circle-outline' color='#000' />
          </Buttons.Button>
        </Table>
        {displayPriceList && (
          <Buttons.Button
            size='small'
            type='solid'
            onClick={() => onUpdate && onUpdate(priceList)}
          >
            Update
          </Buttons.Button>
        )}
      </div>
    );
  },
);
