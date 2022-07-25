import React, {useEffect, useState} from 'react';
import {Table} from 'reactstrap';
import dayjs from 'dayjs';
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
import {RouterFlow} from '@/flows';

export const PriceListTable = observer(() => {
  const {loading, corporateClientsStore, priceListStore} = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    clearErrors,
  } = useForm();

  const addItem = () => {
    const priceList = corporateClientsStore.corporateClients?.priceList;
    priceList.push({
      id: corporateClientsStore.corporateClients?.priceList.length + 1,
      maxDis: 0,
    });
    corporateClientsStore.updateCorporateClients({
      ...corporateClientsStore.corporateClients,
      priceList,
    });
  };

  const removeItem = (index: number) => {
    const firstArr =
      corporateClientsStore.corporateClients?.priceList?.slice(0, index) || [];
    const secondArr =
      corporateClientsStore.corporateClients?.priceList?.slice(index + 1) || [];
    const finalArray = [...firstArr, ...secondArr];
    corporateClientsStore.updateCorporateClients({
      ...corporateClientsStore.corporateClients,
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
          {corporateClientsStore.corporateClients?.priceList?.map(
            (item, index) => (
              <tr>
                <td>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by priceGroup or description'
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
                        onSelect={item => {
                          console.log({item});
                          onChange(item.priceGroup);
                          const priceList =
                            corporateClientsStore.corporateClients?.priceList;
                          if (
                            _.findIndex(priceList, o => {
                              return _.isMatch(o, {
                                priceGroup: item.priceGroup,
                                priceList:
                                  item.priceGroup !== 'CSP001'
                                    ? item.priceGroup
                                    : corporateClientsStore.corporateClients
                                        ?.invoiceAc,
                              });
                            }) >= 0
                          ) {
                            removeItem(index);
                            Toast.warning({
                              message: '😔 Already exists same record found!',
                            });
                          } else {
                            priceList[index] = {
                              ...priceList[index],
                              priceGroup: item.priceGroup,
                              priceList:
                                item.priceGroup !== 'CSP001'
                                  ? item.priceGroup
                                  : corporateClientsStore.corporateClients
                                      ?.invoiceAc,
                              description: item.description,
                            };
                            corporateClientsStore.updateCorporateClients({
                              ...corporateClientsStore.corporateClients,
                              priceList,
                            });
                          }
                          priceListStore.updatePriceListRecords(
                            priceListStore.listPriceListCopy,
                          );
                        }}
                      />
                    )}
                    name='priceGroup'
                    rules={{required: true}}
                    defaultValue={priceListStore.listPriceList}
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by invoiceAc or name'
                        data={{
                          list: corporateClientsStore?.listCorporateClients,
                          displayKey: ['invoiceAc', 'corporateName'],
                        }}
                        displayValue={item?.priceList}
                        // disable={item?.priceGroup !== "CSP001" ? true : false}
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
                          const priceList =
                            corporateClientsStore.corporateClients?.priceList;
                          priceList[index] = {
                            ...priceList[index],
                            priceList: item.invoiceAc,
                            description: item.corporateName,
                          };
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            priceList,
                          });
                          corporateClientsStore.updateCorporateClientsList(
                            corporateClientsStore.listCorporateClientsCopy,
                          );
                        }}
                      />
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
                          const priceList =
                            corporateClientsStore.corporateClients?.priceList;
                          priceList[index] = {
                            ...priceList[index],
                            priority: Number.parseInt(priority),
                          };
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            priceList,
                          });
                        }}
                      />
                    )}
                    name='priority'
                    rules={{required: true}}
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
                          const priceList =
                            corporateClientsStore.corporateClients?.priceList;
                          priceList[index] = {
                            ...priceList[index],
                            maxDis: Number.parseFloat(maxDis),
                          };
                          corporateClientsStore.updateCorporateClients({
                            ...corporateClientsStore.corporateClients,
                            priceList,
                          });
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
        {corporateClientsStore.corporateClients?.priceList?.length === 0 && (
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
