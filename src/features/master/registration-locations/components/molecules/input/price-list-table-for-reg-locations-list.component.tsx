import React, {useEffect, useState, useRef} from 'react';
import {Table} from 'reactstrap';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Icons,
  Buttons,
  Form,
  Toast,
} from '@/library/components';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {useForm, Controller} from 'react-hook-form';
import {IconContext} from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import {RouterFlow} from '@/flows';
import {lookupItems, lookupValue} from '@/library/utils';

interface PriceListTableForRegLocationsListProps {
  data?: any;
  invoiceAc: string | undefined;
  onUpdate?: (item: any) => void;
}

export const PriceListTableForRegLocationsList = observer(
  ({data, invoiceAc, onUpdate}: PriceListTableForRegLocationsListProps) => {
    const {loading, corporateClientsStore, priceListStore} = useStores();

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      clearErrors,
    } = useForm();
    const priceList = useRef(data);
    const [reload, setReload] = useState(false);
    const [displayPriceList, setDisplayPriceList] = useState('');

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
      priceList.current.push({
        id: priceList.current.length + 1,
        maxDis: 0,
      });
    };

    const removeItem = (index: number) => {
      const firstArr = priceList.current?.slice(0, index) || [];
      const secondArr = priceList.current?.slice(index + 1) || [];
      const finalArray = [...firstArr, ...secondArr];
      priceList.current = finalArray;
      setReload(!reload);
    };

    return (
      <div className='flex flex-col gap-2 items-center overflow-auto'>
        <Table striped bordered>
          <thead>
            <tr className='p-0 text-xs z-0'>
              <th className='text-white' style={{minWidth: 150}}>
                Price Group
              </th>
              <th className='text-white' style={{minWidth: 150}}>
                Price List
              </th>
              <th className='text-white' style={{minWidth: 150}}>
                Description
              </th>
              <th className='text-white' style={{minWidth: 100}}>
                Priority
              </th>
              <th className='text-white' style={{minWidth: 100}}>
                Max Dis%
              </th>
              <th className='text-white sticky right-0  flex flex-row gap-2'>
                Action
                <Buttons.ButtonIcon
                  icon={
                    <IconContext.Provider value={{color: '#ffffff'}}>
                      <BsFillArrowUpCircleFill />
                    </IconContext.Provider>
                  }
                  title=''
                  onClick={() => {
                    setDisplayPriceList('');
                  }}
                />
                <Buttons.ButtonIcon
                  icon={
                    <IconContext.Provider value={{color: '#ffffff'}}>
                      <BsFillArrowDownCircleFill />
                    </IconContext.Provider>
                  }
                  title=''
                  onClick={() => {
                    setDisplayPriceList('display');
                  }}
                />
              </th>
            </tr>
          </thead>
          {displayPriceList && (
            <tbody className='text-xs'>
              {priceList.current?.map((item, index) => (
                <tr>
                  <td>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <select
                          value={item?.priceGroup}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.priceGroup
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const priceGroup = e.target.value as string;
                            onChange(priceGroup);
                            priceList.current[index] = {
                              ...priceList.current[index],
                              priceGroup,
                              priceList: '',
                              description: '',
                            };
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
                      rules={{required: false}}
                      defaultValue=''
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <select
                          value={item?.priceList || ''}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.priceList
                              ? 'border-red-500  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const priceItem = JSON.parse(e.target.value);
                            onChange(priceItem.code);
                            priceList.current[index] = {
                              ...priceList.current[index],
                              priceList: priceItem?.code,
                              description: priceItem?.value,
                            };
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
                      rules={{required: false}}
                      defaultValue=''
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
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
                      rules={{required: false}}
                      defaultValue=''
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
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
                            priceList.current[index] = {
                              ...priceList.current[index],
                              priority: Number.parseInt(priority),
                            };
                          }}
                        />
                      )}
                      name='priority'
                      rules={{required: false}}
                      defaultValue=''
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
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
                            priceList.current[index] = {
                              ...priceList.current[index],
                              maxDis: Number.parseFloat(maxDis),
                            };
                          }}
                        />
                      )}
                      name='maxDis'
                      rules={{required: false}}
                      defaultValue=''
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
          {priceList.current?.length === 0 && (
            <Buttons.Button
              size='small'
              type='outline'
              onClick={handleSubmit(addItem)}
            >
              <Icons.EvaIcon icon='plus-circle-outline' color='#000' />
            </Buttons.Button>
          )}
        </Table>
        {displayPriceList && (
          <Buttons.Button
            size='small'
            type='solid'
            onClick={() => onUpdate && onUpdate(priceList.current)}
          >
            Update
          </Buttons.Button>
        )}
      </div>
    );
  },
);
