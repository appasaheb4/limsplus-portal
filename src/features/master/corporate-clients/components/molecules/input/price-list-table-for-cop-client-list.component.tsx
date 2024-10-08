import React, { useState, useRef } from 'react';
import { Table } from 'reactstrap';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Icons,
  Buttons,
  Form,
  Toast,
} from '@/library/components';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { IconContext } from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';

interface PriceListTableForCopClientListProps {
  data?: any;
  invoiceAc?: string;
  onUpdate?: (item: any) => void;
}

export const PriceListTableForCopClientList = observer(
  ({ data, invoiceAc, onUpdate }: PriceListTableForCopClientListProps) => {
    const { loading, corporateClientsStore, priceListStore } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      clearErrors,
    } = useForm();
    const refBtnUpdate = useRef<any>();
    const priceList = useRef(data);
    const [reload, setReload] = useState(false);
    const [displayPriceList, setDisplayPriceList] = useState('');

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
                    setDisplayPriceList('');
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
                    setDisplayPriceList('display');
                  }}
                />
              </th>
            </tr>
          </thead>
          {displayPriceList && (
            <tbody className='text-xs'>
              {priceList.current?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          posstion='sticky'
                          loader={loading}
                          placeholder='Search by priceGroup or description'
                          displayValue={item?.priceGroup}
                          data={{
                            list: _.unionBy(
                              priceListStore?.listPriceList,
                              'priceGroup',
                            ),
                            displayKey: ['priceGroup', 'description'],
                          }}
                          hasError={!!errors.priceGroup}
                          onFilter={(value: string) => {
                            priceListStore.priceListService.filterByFields({
                              input: {
                                filter: {
                                  fields: ['priceGroup', 'description'],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            });
                          }}
                          onSelect={element => {
                            onChange(element.priceGroup);
                            if (
                              _.findIndex(priceList.current, (o: any) => {
                                return _.isMatch(o, {
                                  priceGroup: element.priceGroup,
                                  priceList:
                                    element.priceGroup !== 'CSP001'
                                      ? element.priceGroup
                                      : invoiceAc,
                                });
                              }) >= 0
                            ) {
                              removeItem(index);
                              Toast.warning({
                                message: '😔 Already exists same record found!',
                              });
                            } else {
                              priceList.current[index] = {
                                ...priceList.current[index],
                                priceGroup: element.priceGroup,
                                priceList:
                                  element.priceGroup !== 'CSP001'
                                    ? element.priceGroup
                                    : invoiceAc,
                                description: element.description,
                              };
                              setReload(!reload);
                            }
                            priceListStore.updatePriceListRecords(
                              priceListStore.listPriceListCopy,
                            );
                          }}
                        />
                      )}
                      name='priceGroup'
                      rules={{ required: false }}
                      defaultValue={item.priceGroup}
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          loader={loading}
                          posstion='relative'
                          placeholder='Search by invoiceAc or name'
                          data={{
                            list: corporateClientsStore?.listCorporateClients,
                            displayKey: ['invoiceAc', 'corporateName'],
                          }}
                          displayValue={item?.priceList}
                          //disable={item?.priceGroup !== "CSP001" ? true : false}
                          disable={true}
                          hasError={!!errors.priceList}
                          onFilter={(value: string) => {
                            corporateClientsStore.corporateClientsService.filterByFields(
                              {
                                input: {
                                  filter: {
                                    fields: ['invoiceAc', 'corporateName'],
                                    srText: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              },
                            );
                          }}
                          onSelect={item => {
                            onChange(item.invoiceAc);
                            priceList.current[index] = {
                              ...priceList.current[index],
                              priceList: item.invoiceAc,
                              description: item.corporateName,
                            };
                            // data = {
                            //   ...data,
                            //   priceList,
                            // }
                            corporateClientsStore.updateCorporateClientsList(
                              corporateClientsStore.listCorporateClientsCopy,
                            );
                          }}
                        />
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
                            priceList.current[index] = {
                              ...priceList.current[index],
                              priority,
                            };
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
                            priceList.current[index] = {
                              ...priceList.current[index],
                              maxDis,
                            };
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
          )}
          {priceList.current?.length === 0 && (
            <Buttons.Button
              size='small'
              type='outline'
              onClick={handleSubmit(addItem)}
            >
              <Icons.EvaIcon icon='plus-circle-outline' color='#000000' />
            </Buttons.Button>
          )}
        </Table>
        {displayPriceList && (
          <Buttons.Button
            size='small'
            type='solid'
            id='btnUpdate'
            innerRef={refBtnUpdate}
            onClick={() => onUpdate && onUpdate(priceList.current)}
          >
            Update
          </Buttons.Button>
        )}
      </div>
    );
  },
);
