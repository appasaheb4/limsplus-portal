import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { Icons, Buttons, Form } from '@/library/components';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { useForm, Controller } from 'react-hook-form';
import { IconContext } from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';

interface PriceListTableForRegLocationsListProps {
  data?: any;
  rowStatus?: boolean;
  isAddRemoveItem?: boolean;
  invoiceAc: string | undefined;
  onUpdate?: (item: any) => void;
}

export const PriceListTableForRegLocationsList = observer(
  ({
    data = [],
    invoiceAc,
    isAddRemoveItem = true,
    onUpdate,
    rowStatus,
  }: PriceListTableForRegLocationsListProps) => {
    const { loading, corporateClientsStore, priceListStore } = useStores();

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      clearErrors,
    } = useForm();
    const [priceList, setPriceList] = useState<any>(data);
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

    // TODO: again again fetch data
    // useEffect(() => {
    //   (async function () {
    //     try {
    //       await RouterFlow.getLookupValuesByPathNField(
    //         '/collection/price-list',
    //         'PRICE_GROUP',
    //       ).then(async res => {
    //         if (res?.length > 0) {
    //           setPriceGroupItems(res.filter(item => item.code !== 'CSP'));
    //           await RouterFlow.getLookupValuesByPathNField(
    //             '/collection/price-list',
    //             'PRICE_LIST',
    //           ).then(items => {
    //             if (items?.length > 0) {
    //               setPriceListItems(items);
    //             }
    //           });
    //         }
    //       });
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   })();
    // }, []);

    const addItem = () => {
      priceList.push({
        id: priceList?.length + 1,
        maxDis: 0,
      });
      setPriceList(JSON.parse(JSON.stringify(priceList)));
      setDisplayPriceList(true);
    };

    const removeItem = (index: number) => {
      const firstArr = priceList?.slice(0, index) || [];
      const secondArr = priceList?.slice(index + 1) || [];
      const finalArray = [...firstArr, ...secondArr];
      setPriceList(JSON.parse(JSON.stringify(finalArray)));
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
              {isAddRemoveItem && (
                <th className='text-white sticky right-0  flex flex-row gap-2'>
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
              )}
            </tr>
          </thead>
          {displayPriceList && (
            <tbody className='text-xs'>
              {priceList?.map((item, index) => (
                <tr>
                  <td>
                    <Form.Input value={item.priceGroup} disabled={true} />
                  </td>
                  <td>
                    <Form.Input value={item.priceList} disabled={true} />
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
                          disabled={true}
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
                      defaultValue=''
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Form.Input
                          disabled={true}
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
                              maxDis: Number.parseFloat(maxDis),
                            };
                            setPriceList(JSON.parse(JSON.stringify(priceList)));
                          }}
                        />
                      )}
                      name='maxDis'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                  </td>

                  {!rowStatus && isAddRemoveItem && (
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
                  )}
                </tr>
              ))}
            </tbody>
          )}
          {/* {!rowStatus && (
            <Buttons.Button
              size='small'
              type='outline'
              onClick={handleSubmit(addItem)}
            >
              <Icons.EvaIcon icon='plus-circle-outline' color='#000000' />
            </Buttons.Button>
          )} */}
        </Table>
        {/* {displayPriceList && !rowStatus && (
          <Buttons.Button
            size='small'
            type='solid'
            onClick={() => onUpdate && onUpdate(priceList)}
          >
            Update
          </Buttons.Button>
        )} */}
      </div>
    );
  },
);
