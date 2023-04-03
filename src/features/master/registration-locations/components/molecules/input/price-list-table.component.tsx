import React, {useEffect, useState} from 'react';
import {Table} from 'reactstrap';
import {
  Icons,
  Buttons,
  Form,
} from '@/library/components';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {useForm, Controller} from 'react-hook-form';
import {RouterFlow} from '@/flows';
import { lookupValue} from '@/library/utils';

export const PriceListTable = observer(() => {
  const {
    loading,
    registrationLocationsStore,
    corporateClientsStore,
    priceListStore,
  } = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    clearErrors,
  } = useForm();

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
    const priceList =
      registrationLocationsStore.registrationLocations?.priceList;
    priceList.push({
      id:
        registrationLocationsStore.registrationLocations?.priceList.length + 1,
      maxDis: 0,
    });
    registrationLocationsStore.updateRegistrationLocations({
      ...registrationLocationsStore.registrationLocations,
      priceList,
    });
  };

  const removeItem = (index: number) => {
    const firstArr =
      registrationLocationsStore.registrationLocations?.priceList?.slice(
        0,
        index,
      ) || [];
    const secondArr =
      registrationLocationsStore.registrationLocations?.priceList?.slice(
        index + 1,
      ) || [];
    const finalArray = [...firstArr, ...secondArr];
    registrationLocationsStore.updateRegistrationLocations({
      ...registrationLocationsStore.registrationLocations,
      priceList: finalArray,
    });
  };

  return (
    <div className='flex flex-row gap-2 items-center overflow-auto'>
      <Table striped bordered>
        <thead>
          <tr className='p-0 text-xs'>
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
            <th className='text-white sticky right-0 z-10'>Action</th>
          </tr>
        </thead>
        <tbody className='text-xs'>
          {registrationLocationsStore?.registrationLocations?.priceList?.map(
            (item, index) => (
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
                          const priceList =
                            registrationLocationsStore.registrationLocations
                              ?.priceList;
                          priceList[index] = {
                            ...priceList[index],
                            priceGroup: priceGroup,
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
                    defaultValue={priceListStore.listPriceList}
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
                          const priceList =
                            registrationLocationsStore.registrationLocations
                              ?.priceList;
                          priceList[index] = {
                            ...priceList[index],
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
                    defaultValue={corporateClientsStore.listCorporateClients}
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
                          const priceList =
                            registrationLocationsStore.registrationLocations
                              ?.priceList;
                          priceList[index] = {
                            ...priceList[index],
                            priority: Number.parseInt(priority),
                          };
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              priceList,
                            },
                          );
                        }}
                      />
                    )}
                    name='priority'
                    rules={{required: true}}
                    defaultValue={item?.priority}
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
                          const priceList =
                            registrationLocationsStore.registrationLocations
                              ?.priceList;
                          priceList[index] = {
                            ...priceList[index],
                            maxDis: Number.parseFloat(maxDis),
                          };
                          registrationLocationsStore.updateRegistrationLocations(
                            {
                              ...registrationLocationsStore.registrationLocations,
                              priceList,
                            },
                          );
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
                      <Icons.EvaIcon icon='minus-circle-outline' color='#fff' />
                    </Buttons.Button>
                    <Buttons.Button
                      size='small'
                      type='outline'
                      onClick={handleSubmit(addItem)}
                    >
                      <Icons.EvaIcon icon='plus-circle-outline' color='#fff' />
                    </Buttons.Button>
                  </div>
                </td>
              </tr>
            ),
          )}
        </tbody>
        {registrationLocationsStore.registrationLocations?.priceList?.length ===
          0 && (
          <Buttons.Button
            size='small'
            type='outline'
            onClick={handleSubmit(addItem)}
          >
            <Icons.EvaIcon icon='plus-circle-outline' color='#000' />
          </Buttons.Button>
        )}
      </Table>
    </div>
  );
});
