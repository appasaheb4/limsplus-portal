/* eslint-disable */
import React, {useEffect, useRef, useState} from 'react';
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
import {lookupItems, lookupValue} from '@/library/utils';
import {IconContext} from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
interface TargetTableForSalesTeamProps {
  data?: any;
  onUpdate?: (item: any) => void;
}
export const TargetTableForSalesTeam = observer(
  ({data, onUpdate}: TargetTableForSalesTeamProps) => {
    const {loading, salesTeamStore, routerStore} = useStores();

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      clearErrors,
    } = useForm();
    const targetSaleTable = useRef(data);
    const addItem = () => {
      targetSaleTable.current.push({
        id: targetSaleTable.current.length + 1,
      });
    };

    const [displayTargetSale, setDisplayTargetSale] = useState(false);
    const [displayTargetTable, setDisplayTargetTable] = useState('');
    return (
      <div className='flex flex-col gap-2 items-center overflow-auto'>
        <Table striped bordered>
          <thead>
            <tr className='p-0 text-xs'>
              <th className='text-white' style={{minWidth: 150}}>
                FY-Year
              </th>
              <th className='text-white' style={{minWidth: 150}}>
                Sr No
              </th>
              <th className='text-white' style={{minWidth: 150}}>
                Month
              </th>
              <th
                className='text-white sticky right-0 flex flex-row gap-2'
                style={{minWidth: 170}}
              >
                Targeted Sale
                <Buttons.ButtonIcon
                  icon={
                    <IconContext.Provider value={{color: '#ffffff'}}>
                      <BsFillArrowUpCircleFill />
                    </IconContext.Provider>
                  }
                  title=''
                  onClick={() => {
                    setDisplayTargetTable('');
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
                    setDisplayTargetTable('display');
                  }}
                />
              </th>
            </tr>
          </thead>
          {displayTargetTable && (
            <tbody className='text-xs'>
              {targetSaleTable.current?.map((item, index) => (
                <tr>
                  <td>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        // <select
                        //   value={item.fyYear}
                        //   className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                        //   onChange={e => {
                        //     const fyYear = e.target.value;
                        //     onChange(fyYear);
                        //     salesTeamStore.updateSalesTeam({
                        //       ...salesTeamStore.salesTeam,
                        //       targets: [
                        //         {fyYear, month: 'APR'},
                        //         {fyYear, month: 'MAY'},
                        //         {fyYear, month: 'JUN'},
                        //         {fyYear, month: 'JUL'},
                        //         {fyYear, month: 'AUG'},
                        //         {fyYear, month: 'SEP'},
                        //         {fyYear, month: 'OCT'},
                        //         {fyYear, month: 'NOV'},
                        //         {fyYear, month: 'DEC'},
                        //         {fyYear, month: 'JAN'},
                        //         {fyYear, month: 'FEB'},
                        //         {fyYear, month: 'MAR'},
                        //       ],
                        //     });
                        //   }}
                        // >
                        //   <option selected>{'Select'} </option>
                        //   {lookupItems(routerStore.lookupItems, 'FY_YEAR').map(
                        //     (item: any, index: number) => (
                        //       <option key={index} value={item.code}>
                        //         {lookupValue(item)}
                        //       </option>
                        //     ),
                        //   )}
                        // </select>
                        <Form.Input disabled={true} value={`${item.fyYear}`} />
                      )}
                      name='priceGroup'
                      rules={{required: true}}
                      defaultValue=''
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{item.month}</td>
                  <td
                    onMouseEnter={() => {
                      setDisplayTargetSale(true);
                    }}
                    onMouseLeave={() => {
                      setDisplayTargetSale(false);
                    }}
                    style={{width: 150}}
                  >
                    {!displayTargetSale && (
                      <span
                        className={`leading-4 p-2 h-11 focus:outline-none focus:ring block w-30 shadow-sm sm:text-base border-2 rounded-md`}
                      >
                        {item.targetSale}
                      </span>
                    )}
                    {displayTargetSale && (
                      <Controller
                        control={control}
                        render={({field: {onChange}}) => (
                          <Form.Input
                            label=''
                            type='number'
                            placeholder={item.targetSale}
                            className={`leading-4 p-2 h-10 focus:outline-none focus:ring block w-10 shadow-sm sm:text-base border-2  rounded-md`}
                            hasError={errors.targetSale}
                            onChange={targetSale => {
                              onChange(targetSale);
                              // const targets = salesTeamStore.salesTeam?.targets;
                              targetSaleTable.current[index] = {
                                ...targetSaleTable.current[index],
                                targetSale: parseFloat(targetSale),
                              };
                              // salesTeamStore.updateSalesTeam({
                              //   ...salesTeamStore.salesTeam,
                              //   targets,
                              // });
                            }}
                          />
                        )}
                        name='targetSale'
                        rules={{required: false}}
                        defaultValue={item.fyYear}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
        {displayTargetTable && (
          <Buttons.Button
            size='small'
            type='solid'
            onClick={() => onUpdate && onUpdate(targetSaleTable.current)}
          >
            Update
          </Buttons.Button>
        )}
      </div>
    );
  },
);
