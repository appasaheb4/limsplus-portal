/* eslint-disable */
import React, {useEffect, useState} from 'react';
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

export const TargetsTable = observer(({}) => {
  const {loading, salesTeamStore, routerStore} = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    clearErrors,
  } = useForm();

  const [displayTargetSale, setDisplayTargetSale] = useState(false);

  return (
    <div className="flex flex-row gap-2 items-center overflow-auto">
      <Table striped bordered>
        <thead>
          <tr className="p-0 text-xs">
            <th className="text-white" style={{minWidth: 150}}>
              FY-Year
            </th>
            <th className="text-white" style={{minWidth: 150}}>
              Sr No
            </th>
            <th className="text-white" style={{minWidth: 150}}>
              Month
            </th>
            <th className="text-white" style={{minWidth: 100}}>
              Targeted Sale
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {salesTeamStore?.salesTeam?.targets?.map((item, index) => (
            <tr>
              <td>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <select
                      value={item.fyYear}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                      onChange={e => {
                        const fyYear = e.target.value;
                        onChange(fyYear);
                        salesTeamStore.updateSalesTeam({
                          ...salesTeamStore.salesTeam,
                          targets: [
                            {fyYear, month: 'APR'},
                            {fyYear, month: 'MAY'},
                            {fyYear, month: 'JUN'},
                            {fyYear, month: 'JUL'},
                            {fyYear, month: 'AUG'},
                            {fyYear, month: 'SEP'},
                            {fyYear, month: 'OCT'},
                            {fyYear, month: 'NOV'},
                            {fyYear, month: 'DEC'},
                            {fyYear, month: 'JAN'},
                            {fyYear, month: 'FEB'},
                            {fyYear, month: 'MAR'},
                          ],
                        });
                      }}
                    >
                      <option selected>{'Select'} </option>
                      {lookupItems(routerStore.lookupItems, 'FY_YEAR').map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ),
                      )}
                    </select>
                  )}
                  name="priceGroup"
                  rules={{required: true}}
                  defaultValue=""
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
                        label=""
                        type="number"
                        placeholder={item.targetSale}
                        className={`leading-4 p-2 h-10 focus:outline-none focus:ring block w-10 shadow-sm sm:text-base border-2  rounded-md`}
                        hasError={errors.targetSale}
                        onChange={targetSale => {
                          onChange(targetSale);
                          const targets = salesTeamStore.salesTeam?.targets;
                          targets[index] = {
                            ...targets[index],
                            targetSale: parseFloat(targetSale),
                          };
                          salesTeamStore.updateSalesTeam({
                            ...salesTeamStore.salesTeam,
                            targets,
                          });
                        }}
                      />
                    )}
                    name="targetSale"
                    rules={{required: false}}
                    defaultValue={item.fyYear}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});
